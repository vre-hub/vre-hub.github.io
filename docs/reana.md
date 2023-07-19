# Reana cluster

Connect to the cluster by navigating [here](https://reana.cern.ch/). You can use your X509 certificate to authenticate through IAM. 
Explore Reana on the software's [official documentation](https://docs.reana.io/). 

You can find other examples of differen workflow languages on the [official Reana documentation](https://docs.reana.io/advanced-usage/access-control/rucio/).



# Reana - Rucio integration

A functionality to directly upload files from a Rucio RSE to the Reana workspace has been implemented. In this way, users can immediately reproduce an analysis on Reana without having to first download files locally from Rucio and then upload them to the Reana workspace. 
In order to take advantage of this, follow [these](https://docs.reana.io/advanced-usage/access-control/rucio/) steps after having installed the [reana-client](https://docs.reana.io/getting-started/first-example/). 


- Execute from terminal:


```
$ export REANA_SERVER_URL=https://reana.cern.ch
$ export REANA_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxx
$ reana-client secrets-add --env VONAME=escape \
                           --env VOMSPROXY_FILE=x509up_u1000 \
                           --file /tmp/x509up_u1000 \
                           --env RUCIO_USERNAME=<your_rucio_username>
```
The VOMSPROXY_FILE is the temporary file that you need to generate after having split the x509 into `client.crt` and `client.key`. Execute: with the command:

```
$ voms-proxy-init --voms escape --cert /opt/rucio/etc/client.crt --key /opt/rucio/etc/client.key
```
and note where the proxy file gets saved, the default path should be `/tmp/x509up_u1000`. 

- Move to the directory where you have your **reana.yaml** file, which should follow this template (with Rucio and ESCAPE VOMS set to true): 

```
version: 0.6.0
workflow:
  type: serial
  specification:
    steps:
      - name: fetchdata
        voms_proxy: true
        rucio: true
        environment: 'projectescape/rucio-client'
        commands:
        - rucio get <SCOPE_NAME:FILE_NAME>
      - name: fitdata
        environment: <link_to_gitlab_registry_or_dockerhub_image>
        commands:
        - <your_commands>
      - name: uploaddata
        voms_proxy: true
        rucio: true
        environment: 'projectescape/rucio-client'
        commands:
        - rucio upload --scope SCOPE_NAME --rse RSE_NAME <your_result_named_as_ProjectType.DataDescription.DataType>
```
WARNING: note that the `rucio get` command creates a directory named after the scope_name and places the files you are looking for inside it. 

- Execute:
```
$ reana-client create -w <name_of_your_workflow>
$ export REANA_WORKON=<name_of_your_workflow>
$ reana-client upload         
$ reana-client start      
$ reana-client status
```
5. Check the state of your workflow on https://reana.cern.ch/. 
