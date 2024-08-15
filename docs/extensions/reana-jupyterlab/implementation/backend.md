# Backend

The backend of Reana JupyterLab extension is a Jupyter Server extension that provides the necessary API endpoints to interact with the REANA server. The backend is responsible for handling the communication between the frontend and the REANA server.

## `__init__.py` {#init}
This file is the entry point of the Jupyter Server extension.

## `_version.py` {#version}
This file contains the version of the Jupyter Server extension.

## `const.py` {#const}
This file contains the constants used. In particular, it contains some parameters that are always used then making requests to the REANA server.

## `server.py` {#server}
This file contains the `_load_jupyter_server_extension` function that is used to load the Jupyter Server extension.

## Handlers {#handlers}
This folder contains the handlers for the API endpoints.

### `__init__.py` {#handlers-init}
This file loads the handlers for the API endpoints.

### `connection.py` {#connection}
This file contains the handlers for the connection API endpoints.

#### `class EnvVariablesHandler` {#env-variables}
This class is used to handle the API endpoint that manages the environment variables of the REANA server.

Methods:
* `get`: This method is used to get the environment variables of the REANA server, if present.
  * Returns:
    * `server`: The URL of the REANA server or `''` if it is not present in the environment variables.
    * `access_token`: The API key of the user or `''` if it is not present in the environment variables.


* `post`: This method is used to set the environment variables of the REANA server. It tests if they are valid by making a request to the REANA server to get the information of the user.

  *  Request body: 
     ```json
     {
       "REANA_SERVER_URL": <SERVER_URL>,
       "REANA_ACCESS_TOKEN": <API_KEY>
     }
  * Returns:
    * `status`: `success` if the environment variables are valid, `error` otherwise.
    * `message`: The message to be displayed in the frontend.

### `files.py` {#files}
This file contains the handlers for the file browser API endpoints.

#### `class FileBrowserHandler` {#file-browser}
This class is used to handle the API endpoint that manages the file browser.

Methods:
* `get`: This method is used to get the environment variables of the REANA server, if present.
  * Query parameters:
    * `path`: The path of the directory to be listed.
  * Returns:
    * `entries`: The list of files and directories in the specified directory. Each entry has a name, a type (`file` or `directory`), and a path.


### `handlers.py` {#handlers}
This file contains the handlers for the API endpoints used in the frontend part. It contains the `setup_handlers` function that is used to set up the handlers for the API endpoints.

### `workflows.py` {#workflows}
This file contains the handlers for the workflow API endpoints.

#### `class WorkflowsHandler` {#workflows-handler}
This class is used to handle the API endpoint that manages the workflows. It is used to get the workflows list.

Methods:
* `get`: This method is used to get the list of workflows.
  * Query parameters:
    * `page`: The page number of the list of workflows.
    * `search`: The search term to filter the workflows.
    * `sort`: Sort workflows by creation date (`asc`, `desc`).
    * `status`: Filter workflows by status.
   * Returns:
        * `items`: The list of workflows. Each workflow has an id, a name, a status, and a creation date.
        * `total`: The total number of workflows.

#### `class WorkflowLogsHandler` {#workflow-logs}
This class is used to handle the API endpoint that manages the logs of the workflows.

Methods:
* `get`: This method is used to get the logs of a workflow.
  * Query parameters:
    * `search`: The search term to filter the logs.

  * Returns:
    * `logs`: The engine and job logs of the workflow.

#### `class WorkflowWorkspaceHandler` {#workflow-workspace}
This class is used to handle the API endpoint that manages the workspace of the workflows.

Methods:
* `get`: This method is used to get the files in the workspace of a workflow.
  * Query parameters:
    * `workflow_id`: The id of the workflow.
  * Returns:
    * `files`: The list of files in the workspace. Each file has a name, the date it was last modified, and the size.
    * `totalFiles`: The total number of files in the workspace.

#### `class WorkflowSpecificationHandler` {#workflow-specification}
This class is used to handle the API endpoint that manages the specification of the workflows.

Methods:
* `get`: This method is used to get the specification of a workflow.
  * Query parameters:
    * `workflow_id`: The id of the workflow.
  * Returns:
    * `parameters`: The runtime parameters of the workflow.
    * `specification`: The specification of the workflow.

#### `class WorkspaceFilesHandler` {#workspace-files}
This class is used to download the files from the REANA workspace to the virtual environment.

Methods:
* `get`: This method is used to download the files from the workspace.
  * Query parameters:
    * `workflow_id`: The id of the workflow.
    * `path`: The path of the file to be downloaded.
  * Returns:
    * `status`: `success` if the file was downloaded successfully, `error` otherwise.
    * `message`: The message indicating the number of files downloaded.


#### `class WorkflowValidateHandler` {#workflow-validate}
This class is used to handle the API endpoint that validates a YAML file.

Methods:
* `post`: This method is used to validate a YAML file.
  * Request body:
    ```json
    {
      "path": <PATH_TO_YAML_FILE>
    }
    ```
  * Returns:
    * `status`: `success` if the validation was successful, `error` otherwise.
    * `message`: The output of the workflow validation.

#### `class WorkflowCreateHandler` {#workflow-create}
This class is used to handle the API endpoint that creates a new workflow.

Methods:
* `post`: This method is used to create a new workflow.
  * Request body:
    ```json
    {
      "name": <WORKFLOW_NAME>,
      "path": <PATH_TO_YAML_FILE>
    }
    ```
  * Returns:
    * `status`: `success` if the workflow was created successfully, `error` otherwise.
    * `message`: The output of the creation of the workflow.