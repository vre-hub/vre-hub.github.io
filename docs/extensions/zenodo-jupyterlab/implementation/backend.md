# Backend Documentation

## General Framework
The backend for this extension is built as a Jupyter Server Extension. The project entry points are specified with the `pyproject.toml` file in the root directory. These point to the `zenodo_jupyterlab.server` module, which contains the `extenion.py` and `__init__.py` files which run the function that sets up the API handlers defined within other files in that directory. This guide will go through each section, with explanation of functionality.

# Files in `zenodo_jupyterlab/server/`

## `extension.py` 
`_load_jupyter_server_extenion` is a basic function that calls on `setup_handlers` which is defined in `handlers.py` and passes the `server_app.web_app` object. This is automatically passed via the server extension points.

## `__init__.py` 
Defines the `_jupyter_server_extension_points` function that signals to the primary extension in `pyproject.toml` how to access the server extension and to build when it built.

## `handlers.py` 
This file generates the API endpoints for use by the frontend components. All handlers inherit from `jupyter_server.base.handlers.APIHandler` (except the XSRFTokenHandler inherits from JupyterHandler). For simplicity, parameters are placed within the function definitions here, though they are accessed via the `APIHandler.get_argument()` function because they are URI encoded in the API calls. In addition, return statements are defined plainly here, though they are actually returned via the `APIHandler.finish()` function.

### `class EnvHandler`
Interacts with environmental variables in the Jupyter instance. Exploits the `os` module.
#### `get(env_var: string)`
Simple function to return the value of a stored environmental variable. Returns a dict containing the variable name and value.
> **Returns:** `{env_var: *value*}`

#### `post(key: string, value: string)`
Simple function to set the value of an environmental variable. Returns a dict with the parameters.
> **Returns:** `{key, value}`

### `class XSRFTokenHandler`
Note: this inherits from JupyterHandler, not APIHandler.

#### `get(self: JupyterHandler)`
Accesses JupyterHandler.xsrf_token and returns it.
> **Returns:** `{'xsrfToken': xsrf_token}`

### `class Search RecordHandler`
Handler designed to interact with `searchRecords` function defined in [`search.py`](#search).

#### `get(search_field: string, page: int, communities: string)`
Awaits response from `searchRecords` after passing all of the arguments and returns the list of corresponding records (max size: 25).
> **Returns:** `{'records': *response*}`

### `class SearchCommunityHandler`
Handler designed to interact with `searchCommunities` function defined in [`search.py`](#search).

#### `get(search_field: string, page: int)`
Awaits response from `searchCommunities` after passing all of the arguments and returns the list of corresponding communities (max size: 25).
> **Returns:** `{'communities': *response*}`

### `class RecordInfoHandler`
Handler designed to interact with `recordInformation` function defined in [`search.py`](#search).

#### `get(record-id: string)`
Awaits response from `recordInformation` after passing the `record-id` and returns the desired data.
> **Returns:** `{'data': *response*}`

### `class FileBrowserHandler`
Interacts with environmental information about the folder and files in the `$HOME` directory and child directories.

#### `get(path: string)
Pulls the Jupyter instance home directory from the `$HOME` environmental variable. Then appends the path passed to this to generate a relative path and verifies whether it exists (if not, returns an "error"). Exploits the `os.listdir` function to iterate through entries within the folder. Note: it explicitly ignores all entries that start with ".", though, in principle, these should be excluded by `listdir`. It then accumulates a list of directories of entry information:
```json
entry = {
    "name": file name,
    "type": directory or file,
    "path": relative path from home directory,
    "modified": isoformatted timestamp of last modification,
    "size": size
}
```
This information is all drawn from the returned data from `os.listdir`.
> **Returns:** `{'entries': *list of entry dictionaries*}`

### `class ZenodoAPIHandler`
Interacts with all functions that make calls to the `eossr.api.zenodo.ZenodoAPI` object. They are contained within this class to limit the need of generating new `ZenodoAPI` objects with each interaction.

#### `property zAPI`
Once logged in, this will hold a `ZenodoAPI` object initialized with the input access token and sandbox boolean. As long as they do not log in again, this object will remain for the lifetime of the Jupyter instance.

#### `post(form_data: json dictionary)`
Takes in a `form_data` JSON dictionary, that contains at least an `action` entry, which specifies which code to run.

##### `if action == 'check-connection'`
Verifies the validity of a Zenodo access token via the `checkZenodoConnection` function defined in [`testConnection.py`](#testConnection). If valid, sets `zAPI` to an initialized `ZenodoAPI` object. Returns the response from the called function.
> **Returns:** `{'status': *response*}`

##### `if action == 'upload'`
Interacts with the `upload` function defined in `upload.py`. If `zAPI` is not yet initialized, the function returns a status of "Please log in before attempting to upload." Otherwise, returns the response from the function.
> **Returns:** `{'status': *response*}`

### `class ServerInfoHandler`

#### `get`
Retrieves the home directory.
> **Returns:** `{'root_dir': *home directory*}`

### `setup_handlers`
`setup_handlers(web_app)`

Defines the API endpoints for access from the frontend. Builds the urls off of the "web_app" base path and "zenodo-jupyterlab". Thus all handlers are of the form: base_path + "zenodo-jupyterlab-*action*". This function then adds these endpoints to the web_app.

## `search.py` 
This files handles all search requests to Zenodo via the [`eOSSR`](https://gitlab.com/escape-ossr/eossr) library.

### `searchRecords`
`searchRecords(search_field: string, page: int, **kwargs)`

Calls the `eossr.api.zenodo.search_records` with the given arguments, as well as restricts the size of the response to 25 (i.e. passes `size = 25` as well). Parses the returned list of `eossr.api.zenodo.Record` objects and returns a list of the following kinds of dictionaries:
```json
record = {
    "id": Record ID,
    "title": Record title,
    "date": Date Published,
    "resource_type": Records resource type (from within the metadata)
}
```
If this call to `eOSSR` fails, the function simply returns `["failed"]`.
> **Returns:** [list of records]

### `searchCommunities`
`searchCommunities(search_field: string, page: int)`

Calls the `eossr.api.zenodo.search_communities` with the given arguments, as well as restricts the size of the response to 25 (i.e. passes `size = 25` as well). Parses the returned list of dictionaries and returns a list of the following kinds of dictionaries:
```json
community = {
    "id": Community ID,
    "title": Community title,
    "date": Date Published,
}
```
If this call to `eOSSR` fails, the function simply returns `["failed"]`.
> **Returns:** [list of communities]

### `recordInformation`
`recordInformation(recordID: string)`

Returns more specific information about a specified record via `eossr.api.zenodo.get_record`. Parses the returned data from this function and creates the following dictionary:
```json
record= {
    'authors': authors with affiliations as listed in the record,
    'filelist': the list of files (full download links) attached to record
}
```
Note: The existing information such as title and id are still held on the frontend in the tabular display, so no need to repass that information. Secondary note: if this call fails, this function returns `{"status": "failed"}`.
> **Returns:** *record*

## `testConnection.py` 
File devoted to validating Zenodo access tokens.

### `checkZenodoConnection`
Extracts the access token and sandbox boolean from the environmental variables `ZENODO_API_KEY` and `ZENODO_SANDBOX`, respectively. Parses the string value of the sandbox boolean into a Python boolean (stored as a string due to the mismatch is syntax between Typescript and Python booleans). Creates a `eossr.api.zenodo.ZenodoAPI` object with those extracted variables as arguments and stores it in `zAPI`. Then, uses the `eossr.api.zenodo.ZenodoAPI.query_user_deposits` function and extracts the status from this response, which indicates whether or not the access token is valid or if a connection can be made to the Zenodo REST API. If either stage fails, `zAPI` is initialized to `None` and the query status is set to 0.
> **Returns:** status code of the query, `zAPI`

## `upload.py` 
Devoted to generating and populating new Zenodo record deposits.

### `createDeposit`
`createDeposit(zAPI: eossr.api.zenodo.ZenodoAPI)`

Uses `eossr.api.zenodo.ZenodoAPI.create_new_deposit` to create an empty deposit. Note: whether or not this deposit exists on Zenodo or Zenodo Sandbox is entirely dependent on what option the user selected when logging in.
> **Returns:** ID of the newly created record

### `createMetadata`
`createMetadata(zAPI: eossr.api.zenodo.ZenodoAPI, recordID: int, form_data: FormData object)`

*Work in Progress*\
Extracts title from form_data and creates a JSON dict as follows:
```json
json_metadata = {
    "title": given title
}
```
Uses `eossr.api.zenodo.ZenodoAPI.set_deposit_metadata` to take in the recordID and the JSON data and add this metadata to the existing Zenodo object.
> **Returns:** *response*

### `upload`
`upload(zAPI: eossr.api.zenodo.ZenodoAPI, form_data: FormData object)`

Verifies if zAPI has been initialized; if not, returns `None`. Calls `createDeposit` and passes `zAPI` and captures returns record ID. Then uses this record ID, form_data, and the `zAPI` to call `createMetadata`.
> **Returns:** "Success" if *response* doesn't equal `None`