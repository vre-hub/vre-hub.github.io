# JupyterHub

The JupyterHub service is deployed on the VRE cluster using the upstream [Zero to JupyterHub](https://github.com/jupyterhub/zero-to-jupyterhub-k8s) (z2jh) `helm` charts. The cluster and the manifest are kept synchronised via `Flux`.

* The current z2jh version deployed on the CERN VRE is [`v3.3.7`](https://hub.jupyter.org/helm-chart/#jupyterhub).
* To check the deployed k8s manifests on the VRE, visit the VRE GitHub repository ([jupyterhub deployment](https://github.com/vre-hub/vre/blob/main/infrastructure/cluster/flux/jhub/jhub-release.yaml)).

For general details on the deployment of JupyterHub, we refer the user to the official documentation of [Zero to JupyterHub with Kubernetes](https://z2jh.jupyter.org/en/stable/index.html).

## CERN VRE Customization

### User Authentication and Authorization

The VRE uses the ESCAPE Indico IAM [instance](https://iam-escape.cloud.cnaf.infn.it/) as Identity Provider (IdP). For further details, please go to the [AAI section](../services/aai.md) or visit the official ESCAPE IAM [documentation](https://indigo-iam.github.io/escape-docs/). 

To configure the jupyter hub with the ESCAPE IAM, you will need to:
  1. [Register a new client](https://indigo-iam.github.io/docs/v/current/user-guide/client-registration.html) on the ESCAPE IAM instance.  
  2. Configure the the Jupyter hub authenticator to use the previously registered client, that makes use of an OIDC based IdP.
      * [z2jh A&A](https://z2jh.jupyter.org/en/stable/administrator/authentication.html#genericoauthenticator-openid-connect).
      * [Generic OAuth JupyterHub Documentation](https://oauthenticator.readthedocs.io/en/latest/tutorials/provider-specific-setup/providers/generic.html#setup-for-an-openid-connect-oidc-based-identity-provider).

VRE `hub.config` configuration for the custom OAuth2 authenticator:
```yaml
values:
  hub:
    config:
      JupyterHub:
        authenticator_class: "generic-oauth"
      RucioAuthenticator:
        # client_id: "" # set through secret
        # client_secret: "" # set through secret
        authorize_url: https://iam-escape.cloud.cnaf.infn.it/authorize
        token_url: https://iam-escape.cloud.cnaf.infn.it/token
        userdata_url: https://iam-escape.cloud.cnaf.infn.it/userinfo
        username_key: preferred_username
        enable_auth_state: true
        allow_all: true
        scope:
          - openid
          - profile
          - email
  extraConfig:
    (...)
```

#### OIDC token exchange - Rucio JupyterLab extension configuration

The Rucio JupyterLab extension configuration documentation can be found on the JupyterLab Extensions [section](../../extensions/rucio-jupyterlab/configuration.md).

To use OIDC tokens as the authentication method for the extension, the Jupyter server (the user session) needs to exchange an access token with the IdP. To do so:
1. Enable the `token-exchange` grant type on the registered client (requires admin privileges).
2. Add the token exchange configuration on the jupyterhub deployment (see below).

VRE `hub.extraConfig` configuration for the OIDC token exchange:
```yaml
values:
  hub:
    extraConfig:
      token-exchange: |
        import pprint
        import os
        import warnings
        import requests
        from oauthenticator.generic import GenericOAuthenticator

        # custom authenticator to enable auth_state and get access token to set as env var for rucio extension
        class RucioAuthenticator(GenericOAuthenticator):
            def __init__(self, **kwargs):
                super().__init__(**kwargs)
                self.enable_auth_state = True

            def exchange_token(self, token):
                params = {
                    'client_id': self.client_id,
                    'client_secret': self.client_secret,
                    'grant_type': 'urn:ietf:params:oauth:grant-type:token-exchange',
                    'subject_token_type': 'urn:ietf:params:oauth:token-type:access_token',
                    'subject_token': token,
                    'scope': 'openid profile',
                    'audience': 'rucio'
                }
                response = requests.post(self.token_url, data=params)
                rucio_token = response.json()['access_token']

                return rucio_token
                
            async def pre_spawn_start(self, user, spawner):
                auth_state = await user.get_auth_state()
                #print("AUTH_state")
                #pprint.pprint(auth_state)
                if not auth_state:
                    # user has no auth state
                    return False
                
                # define token environment variable from auth_state
                spawner.environment['RUCIO_ACCESS_TOKEN'] = self.exchange_token(auth_state['access_token'])
        
        # set the above authenticator as the default
        c.JupyterHub.authenticator_class = RucioAuthenticator

        # enable authentication state
        c.GenericOAuthenticator.enable_auth_state = True
```

Finally, some extra environment variables can be set on the hub side to configure the Rucio extension:
:::tip
Check an example of how these variables are propagated from the hub to the user environmnet [here](https://github.com/vre-hub/environments/blob/d4d4892d9b2646dfe31ab176cdc23b50080f298a/vre-singleuser-py311/configure-vre.py#L27).
:::

VRE `singleuser.extraEnv` example:
```yaml
values:
  singleuser:
    extraEnv:
      RUCIO_MODE: "replica"
      RUCIO_WILDCARD_ENABLED: "1"
      RUCIO_BASE_URL: "https://vre-rucio.cern.ch"
      RUCIO_AUTH_URL: "https://vre-rucio-auth.cern.ch"
      RUCIO_WEBUI_URL: "https://vre-rucio-ui.cern.ch"
      RUCIO_DISPLAY_NAME: "RUCIO - CERN VRE"
      RUCIO_NAME: "vre-rucio.cern.ch"
      RUCIO_SITE_NAME: "CERN"
      RUCIO_OIDC_AUTH: "env"
      RUCIO_OIDC_ENV_NAME: "RUCIO_ACCESS_TOKEN"
      RUCIO_DEFAULT_AUTH_TYPE: "oidc"
      RUCIO_OAUTH_ID: "rucio"
      RUCIO_DEFAULT_INSTANCE: "vre-rucio.cern.ch"
      RUCIO_DESTINATION_RSE: "CERN-EOSPILOT"
      RUCIO_RSE_MOUNT_PATH: "/eos/eulake"
      RUCIO_PATH_BEGINS_AT: "5" # Substitute /eos/pilot/eulake/escape/data with /eos/eulake
      RUCIO_CA_CERT: "/certs/rucio_ca.pem"
```

:::tip[PRO TIP]

Because both the Rucio and Jupyter hub authentication use the same IdP, you could automate the creation of a `rucio.cfg` file at the start of an user session.

:::

CERN VRE example to automatically create a `rucio.cfg` file (`singleuser.lifecycleHooks.postStart` configuration):
```yaml
values:
  singleuser:
    lifecycleHooks:
      postStart:
        exec:
          command:
            - "sh"
            - "-c"
            - |
              mkdir -p /tmp;
              echo -n $RUCIO_ACCESS_TOKEN > /tmp/rucio_oauth.token;
              mkdir -p /opt/rucio/etc;
              echo "[client]" >> /opt/rucio/etc/rucio.cfg;
              echo "rucio_host = https://vre-rucio.cern.ch" >> /opt/rucio/etc/rucio.cfg;
              echo "auth_host = https://vre-rucio-auth.cern.ch" >> /opt/rucio/etc/rucio.cfg;
              echo "ca_cert = /certs/rucio_ca.pem" >> /opt/rucio/etc/rucio.cfg;
              echo "account = $JUPYTERHUB_USER" >> /opt/rucio/etc/rucio.cfg;
              echo "auth_type = oidc" >> /opt/rucio/etc/rucio.cfg;
              echo "oidc_audience = rucio" >> /opt/rucio/etc/rucio.cfg;
              echo "oidc_polling = true" >> /opt/rucio/etc/rucio.cfg;
              echo "oidc_issuer = escape" >> /opt/rucio/etc/rucio.cfg;
              echo "oidc_scope = openid profile offline_access" >> /opt/rucio/etc/rucio.cfg;
              echo "auth_token_file_path = /tmp/rucio_oauth.token" >> /opt/rucio/etc/rucio.cfg;
```

### Connection to CERN Resources

TBD: 
* Storage
* DB
* Network
* Ingress
* User Management
