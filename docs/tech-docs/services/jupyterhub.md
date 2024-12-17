# JupyterHub

The JupyterHub service is deployed on the VRE cluster using the upstream [Zero to JupyterHub](https://github.com/jupyterhub/zero-to-jupyterhub-k8s) (z2jh) `helm` charts. The cluster and the manifest are kept synchronised via `Flux`.

* The current version deployed on the CERN VRE is version [`3.3.7`](https://hub.jupyter.org/helm-chart/#jupyterhub).
* To check the deployed k8s manifests on the VRE, visit the  GitHub repository ([jhub deployment](https://github.com/vre-hub/vre/blob/main/infrastructure/cluster/flux/jhub/jhub-release.yaml)).

For general details on the deployment of JupyterHub, we refer the user to the official documentation of [Zero to JupyterHub with Kuberneter](https://z2jh.jupyter.org/en/stable/index.html).

## CERN VRE Customization

### CERN Resources

TBD: 
* Storage
* DB
* Network
* Ingress
* User Management

#### User Authentication and authorization

The VRE uses the ESCAPE Indico IAM [instance](https://iam-escape.cloud.cnaf.infn.it/) as Identity Provider (See also the [GitHub repository](https://github.com/indigo-iam/escape-docs)). Registration can be done via IAM credentials, EduGAIN or Google. We advise users to register using their institutional email.

To configure the hub and the Jupyterh authenticator with Indico IAM, please follow the instructions for OpenID connect - an identity layer on top of the OAuth 2.0 protocol.
* [z2jh A&A](https://z2jh.jupyter.org/en/stable/administrator/authentication.html#genericoauthenticator-openid-connect).
* [Generic OAuth JupyterHub Documentation](https://oauthenticator.readthedocs.io/en/latest/tutorials/provider-specific-setup/providers/generic.html#setup-for-an-openid-connect-oidc-based-identity-provider).

```yaml
values:
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

blablalba on token exchange

```yaml

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
                  print("EXCHANGE TOKEN")
                  print(response.json())
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
                  spawner.environment['EOS_ACCESS_TOKEN'] = auth_state['access_token']
          
          # set the above authenticator as the default
          c.JupyterHub.authenticator_class = RucioAuthenticator

          # enable authentication state
          c.GenericOAuthenticator.enable_auth_state = True
```
