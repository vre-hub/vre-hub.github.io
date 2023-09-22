# Jupyterhub interface

This service provides the end-user with a Notebook ready-to-be-used and fully integrated with the ESCAPE Data Lake. The service is hosted [here](https://jhub-vre.cern.ch/). 

(The old notebook, which can be used in parallel, is hosted [here](https://escape-notebook.cern.ch/)). 

In some cases, it can happen that you land in the tree view. To change to the default lab view, change the URL to: `https://jhub-vre.cern.ch/user/<you-username>/lab`.
If the spawning fails, try to log out of the service and log in again. 

## Authentication
Authenticate to IAM. Once you log into the service for the first time, everything will be configured for the OpenID connect by default. You will be able to modify it later and make it persistent.
If you don't have an IAM account already, see the [authentication](docs/auth.md) section.
Contact the responsible of the service if you are still having troubles running your notebook using a new account.

<!-- ## DLaaS structure 

![DLaaS architechture](img/dlaas_diagram.png) -->

## Server Options
Select your server option based on your requirements by selecting the environment that suits you best. Each environment has been wrapped in a Docker image, some examples can be found [here](https://github.com/vre-hub/environments). If you want to stop the service and use a different one, go to 'File' in top left corner and select 'Hub control panel'; you can stop the server from there.

## Service Usage
Once you are inside the service, you will find 5 panels in the left part menu.

##### 1. File Browser

It enables you to work with the files and directories on your sistem. You can find more information in the [Jupyerlab documentation](https://jupyterlab.readthedocs.io/en/stable/user/files.html).

In case you want to **upload a file**, click on the 'Upload Files' button and choose the local files you want to upload into the notebook. The size is limited to 1 MB. This will upload your files during the session, but will NOT upload them on the Data Lake. 

To upload your files on the Data Lake and be protected by replication rules, right click on the folder or file and choose "Upload File(s) to Rucio". 
The 'Destination RSE' is the physical storage where your files will be uploaded, so try to choose one named after your institution. 
The 'Lifetime' refers to the time window during which the file will be available on the Data Lake, so if you always want a copy of it, leave it blank. 
The 'Scope' name is in the format _Experiment_Institute_Project_ (e.g. ATLAS_LAPP_SP, the EOSC-Future Science Project). You cannot create a new scope unless you are administrator. If you are, you can type in the terminal:


```console
rucio-admin scope add --account=<your_username> --scope <Experiment_Institute_Project>
rucio-admin scopes list
```

Alternatively, you could specify the most general `--account=root` tag, but you might not have the privileges to do so. 
Otherwise, contact the VRE team on the **[Slack channel](https://eosc-escape.slack.com/archives/C03Q65M1U5V)** to ask for the creation of a new scope that fits your needs. 
If you have multiple files that you would like to organise into a dataset, click on the 'Add files to a dataset' option, choose the correct scope name and a name for your data set. The data set name should identify what kind of data is inside, so please use this format: _ProjectType.DataDescription.DataType_ (DM.LeptonResonance.Data20015_10TeV, the ProjectType for EOSC-Future is either DM or EU). 

**There are two directories which allow you to store files in the DLaaS, and you should be aware of their memeory limitations.**

1. **/home/jovyan**: shared between all users, capacity of 800GB, it is never cleaned and should be only used to upload documents and certificates. 
2. **/eos/cern-eos-rse**: corresponds to the CERN-EOS RSE. This is the reason why when you 'make available' a file that you know is already in that RSE, the Jupyterlab will tell you it is immediately available (you do not have to *replicate* it from far-away storage, as it is already close to you!). **We therefore strongly recommend uploading on the `CERN-EOS` RSE the files that you know you will be using on the Jupyterhub.**
3. **/eos/scratch-space**: Scratch space on the CERN EOS, which can be used to store temporary files.

**It is always a better practice to upload large data files on the Data Lake directly from the terminal by using the rucio-client commands, as described in the [previous section](docs/rucio.md), in order not to fill up the communal space.**

When working in a notebook, in order to easily work with Data Lake files, expand the file you need on the rucio extension panel on the left part of the screen, click on 'add to notebook' under the blue eye icon and assign to it an arbitrary variable. In the jupyter notebook, type the variable in a shell, run it and check that Rucio automatically finds the file and outputs its specific storage location.  

##### 2. Running Terminals and Kernels
The Running panel in the left sidebar shows a list of all the kernels and terminals currently running across all notebooks, code consoles, and directories. Find more information in the [Jupyerlab documentation](https://jupyterlab.readthedocs.io/en/stable/user/running.html).

##### 3. Table of Contents
This makes it easy to see and navigate the structure of a document. A table of contents is auto-generated in the left sidebar when you have a notebook, markdown, latex or python files opened. The entries are clickable, and scroll the document to the heading in question. Find more information in the [Jupyerlab documentation](https://jupyterlab.readthedocs.io/en/stable/user/toc.html).

##### 4. Rucio extension
* **EXPLORE**:
Explore the Data Lake (files, datasets and containers). 
If you want to use a specific data set, you will need to make it available and add it to your notebook. To do so, click on the folder button to see all the available scopes, select the one that stores your data and complete the search with the absolute DID. The DID syntax has some search flexibility:
    - If you want to see all the files that are inside a specific scope your sintax will be ``` SCOPE:* ``` (Example: ```ATLAS_OD_EDU:*```).
    - If you want to see all the files that starts with a specific term in a specific scope your sintaxis will be ```SCOPE:TERM*``` (Example: ```ATLAS_OD_EDU:data*```).
    - If you want to see a specific file type the complete DID: ```SCOPE:NAME``` (Example: ```ATLAS_OD_EDU:data_B.GamGam.root```).

    If you want to know if there is a replication attached to that file, you need to click on the Availability button and you will be redirected to the [Rucio WebUI](https://vre-rucio-ui.cern.ch/). This availability button has some difererent states: Available, Not Available, Collection is empty, Something went wrong... If the state is Not Available you will need to make it Available. Once done you can add it to your notebook.

* **NOTEBOOK**:
    Here you will be able to see all the files you added to the notebook and are ready to be used.

* **CONFIGURATION**:
    There are multiple authentication methods, OpenID connect will be selected by default. Change the authentication method in case you want to use another one. You can select one of the following:
        - OpenID Connect
        - X.509 User Certificate
        - X.509 Proxy Certificate
        - Username & Password
    If you change the default OpenID connect token method, you will have to close the notebook and authenticate again for the full settings to take place. 

##### 5. Extension manager
You can use this panel in case you want to manage your extensions. This is an option you will mostly not need.
