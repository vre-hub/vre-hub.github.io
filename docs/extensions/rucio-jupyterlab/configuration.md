# CERN VRE Rucio JupyterLab extension configuration

The Rucio JupyterLab extension is installed in most of the CERN VRE 
environments and allows any VRE user to access, explore and trigger 
replicas within the ESCAPE Data Lake content. 

## Extension configuration file

The configuration of the Rucio extension is done via a `.json` file, usually 
located in `$HOME/.jupyter/` and named `jupyter_server_config.json`. This file must be 
present before the Jupyter server session starts and can be added via Jupyter 
`before-notebook.d` hooks, or by running a script via the Docker `CMD` instruction.

Check the [upstream repository](https://github.com/rucio/jupyterlab-extension/blob/master/CONFIGURATION.md#configuration) 
documentation for further details about the compulsory and optional fields of 
the configuration file.

:::tip

You can also have a look to the VRE user environment [repository](https://github.com/vre-hub/environments) 
that shows various examples on how to add this configuration into Docker images.

:::


## Default Authentication - `OIDC` tokens

By default the extension is configured to use `OIDC` tokens as the default 
authentication type. 

Whenever a user logs into the VRE, the Jupyter hub exchanges an 
access token with the the ESCAPE Identity provider, allowing to automatically 
authenticate the user towards the ESCAPE Rucio instance (see below).

This way, the user does not need to re-authenticate when accessing the 
JupyterLab environment, and can start using the Rucio JupyterLab extension 
and/or interact with Rucio via the CLI.

:::tip

Check that the authentication was successful by opening a `Terminal` window and typing
```bash=
rucio whoami
```

:::

:::info

ESCAPE OIDC access tokens have been configured with a lifetime of 2 hours. 

If you think that your Jupyter session has been opened for more than 2h, or you 
cannot further access the Rucio instance, please close and restart your session 
by clicking on the `File` tab:

`File` > `Hub Control Panel` > `Stop My Server` > `Start My Server`.

:::

Below you can find a configuration file example:
```json
# cat .jupyter/jupyter_server_config.json 

{
  "RucioConfig": {
    "instances": [
      {
        "name": "vre-rucio.cern.ch",
        "display_name": "RUCIO - CERN VRE",
        "rucio_base_url": "https://vre-rucio.cern.ch",
        "rucio_auth_url": "https://vre-rucio-auth.cern.ch",
        "rucio_webui_url": "https://vre-rucio-ui.cern.ch",
        "rucio_ca_cert": "/certs/rucio_ca.pem",
        "site_name": "CERN",
        "voms_enabled": false,
        "destination_rse": "CERN-EOSPILOT",
        "rse_mount_path": "/eos/eulake",
        "path_begins_at": 5,
        "mode": "replica",
        "wildcard_enabled": true,
        "oidc_auth": "env",
        "oidc_env_name": "RUCIO_ACCESS_TOKEN"
      }
    ],
    "default_instance": "vre-rucio.cern.ch",
    "default_auth_type": "oidc"
  }
}
```

### Token exchange with Jupyter Hub

To automate the token exchange when a Jupyter session is spawned, you need  
to configure the k8s jupyter hub manifests. Find this documentation on the 
VRE [JupyterHub technical documentation](../../tech-docs/services/jupyterhub.md#oidc-token-exchange---rucio-jupyterlab-extension-configuration).


## Authentication via `x509` Proxy certificates 

The Rucio JupyterLab extension also allows `x509` certificates to authenticate to the ESCAPE Rucio instance. The first thing you will need to do is setup the proper access permission on the certificate and key, and then run the `voms-proxy-init` command to create a valid proxy.

```
chmod 644 ~/.globus/usercert.pem
chmod 400 ~/.globus/userkey.pem

voms-proxy-init --cert ~/.globus/usercert.pem --key ~/.globus/userkey.pem --voms escape -out <OUTPUT_FILENAME_AND_PATH> 
```
:::warning[INFO]
To run the `voms-proxy-init` command you must first upload your `userkey.pem` and `usercet.pem` to your Jupyter session.
You can upload these files using  the `Upload Files` icon on the File Browser tab of the JupyterLab session.
:::

To configure the extension to use `x509` Proxy certificates :

1. Access the VRE and open the Rucio JupyterLab tab.
2. Click on the settings icon (⚙️), on the right of the `Explore` and `Notebook` tabs.
3. Use the different dropdown menus to select the `Authentication` method and select the `X.509 Proxy Certificate`.
4. Chose the path to the proxy in the `Proxy file path` field. 
5. Add your Rucio account in the `Account` field.
6. Click on the `Save Settings`, change to the `Explore` tab and start using the extension.

![rucio-extension](../../../images/rucio_ext_x509config.png)

:::tip

You can click on the `Show Advance Setting` and `Purge Cache` to erase any saved configuration in case the extension shows the following message:
```bash=
Authentication error. Perhaps you set an invalid credential?
```

:::