# Reana cluster

Connect to the cluster by navigating [here](https://reana-vre.cern.ch/). You can use your X509 certificate to authenticate through IAM. 
Explore Reana on the software's [official documentation](https://docs.reana.io/). 

You can find other examples of differen workflow languages on the [official Reana documentation](https://docs.reana.io/advanced-usage/access-control/rucio/).

# Authentication with reana-client

The REANA client provides a command-line interface for authenticating with the REANA server. You can use the `reana-client auth` command which initiates an OAuth 2.0 device flow authentication:

```bash
$ reana-client auth
```

This command will provide you with a URL to visit and a code to enter, allowing you to authenticate through your browser. You can read more about OAuth2.0 and the device flow authentication in the [What is OAuth2.0 docs by auth0](https://auth0.com/intro-to-iam/what-is-oauth-2).

Example output:

```text
$ reana-client auth
Go to: https://iam-escape.cloud.cnaf.infn.it/device
Enter code: ******
Or open: https://iam-escape.cloud.cnaf.infn.it/device?user_code=******
Waiting for authorization...
```

:::warning[Important]
When using the `reana-client auth` command, please note that the VRE JupyterLab extension may not be automatically updated with your new authentication token. If you're using both the command-line client and the JupyterLab extension, you may need to restart your JupyterLab session for the extension to recognize your new authentication status.
:::

# Reana - Rucio integration

A functionality to directly upload files from a Rucio RSE to the Reana workspace has been implemented. In this way, users can immediately reproduce an analysis on Reana without having to first download files locally from Rucio and then upload them to the Reana workspace. 
In order to take advantage of this, follow [these](https://docs.reana.io/advanced-usage/access-control/rucio/) steps after having installed the [reana-client](https://docs.reana.io/getting-started/first-example/). 


- Execute from terminal:

```bash title="/src/components/HelloCodeTitle.js"
$ export REANA_SERVER_URL=https://reana-vre.cern.ch
$ export REANA_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxx
$ reana-client secrets-add --env VONAME=escape \
                           --env VOMSPROXY_FILE=x509up_u1000 \
                           --file /tmp/x509up_u1000 \
                           --env RUCIO_USERNAME=<your_rucio_username> \
                           --env RUCIO_RUCIO_HOST=https://vre-rucio.cern.ch \
                           --env RUCIO_AUTH_HOST=https://vre-rucio-auth.cern.ch
```

The VOMSPROXY_FILE is the temporary file that you need to generate after having split the x509 into `client.crt` and `client.key`. Execute: with the command:

```bash
$ voms-proxy-init --voms escape --cert /opt/rucio/etc/client.crt --key /opt/rucio/etc/client.key
```
and note where the proxy file gets saved, the default path should be `/tmp/x509up_u1000`. 

### Connect to a custom Rucio instance

The VRE Rucio instance is only one of the many instances existing around the world. In order to connect to a custom Rucio instance, you need an x509 certificate to use with the VOMS of your organisation. Once you have it, you can import it in the [jhub-vre.cern.ch](https://jhub-vre.cern.ch). You can then run the `voms-proxy-init` with any VO by first sourcing the CVMFS file:

```bash
$ source /cvmfs/grid.cern.ch/centos7-ui-160522/etc/profile.d/setup-c7-ui-example.sh 
```

Now, based on your VO organisation, run (for example, if you are part of ATLAS): 

```bash
$ voms-proxy-init --voms atlas --cert /opt/rucio/etc/client.crt --key /opt/rucio/etc/client.key
```
And then, the appropriate secrets for the `reana-client`:

```bash
$ reana-client secrets-add --env VONAME=atlas \
                           --env VOMSPROXY_FILE=x509up_u1000 \
                           --file /tmp/x509up_u1000 \
                           --env RUCIO_USERNAME=<your_rucio_username>
                           --env RUCIO_RUCIO_HOST=https://voatlasrucio-server-prod.cern.ch \
                           --env RUCIO_AUTH_HOST=https://voatlasrucio-auth-prod.cern.ch
```

# Dispatch the workflow

Move to the directory where you have your **reana.yaml** file, which should follow this template (with Rucio and ESCAPE VOMS set to true): 

```yaml
version: 0.6.0
workflow:
  type: serial
  specification:
    steps:
      - name: fetchdata
        voms_proxy: true
        rucio: true
        environment: 'ghcr.io/vre-hub/vre-rucio-client:v0.1.2-1-0487cc0'
        commands:
        - rucio get <SCOPE_NAME:FILE_NAME>
      - name: fitdata
        environment: <link_to_github_registry_or_dockerhub_image>
        commands:
        - <your_commands>
      - name: uploaddata
        voms_proxy: true
        rucio: true
        environment: 'ghcr.io/vre-hub/vre-rucio-client:v0.1.2-1-0487cc0'
        commands:
        - rucio upload --scope SCOPE_NAME --rse RSE_NAME <your_result_named_as_ProjectType.DataDescription.DataType>
```
WARNING: note that the `rucio get` command creates a directory named after the scope_name and places the files you are looking for inside it. 

- Execute:
```bash
$ reana-client create -w <name_of_your_workflow>
$ export REANA_WORKON=<name_of_your_workflow>
$ reana-client upload         
$ reana-client start      
$ reana-client status
```
5. Check the state of your workflow on https://reana-vre.cern.ch/.
