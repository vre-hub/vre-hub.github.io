# Frontend Documentation

## General Framework 
The building of the of the frontend JupyterLab extension is handled entirely within `pyproject.toml` in the root directory, which was originally generated from the `copier` template. All of the frontend components were originally generated with `copier` template of a JupyterLab extension: [template](https://github.com/jupyterlab/extension-template). This extension is built with NodeJS >= 20 with node dependencies contained within `yarn.lock`.

# Files in `src/` 

## `index.tsx` 
This file creates the entire frontend extension as a widget and adds it to the running Jupyter Lab session.

### `class ZenodoWidget` 
Extends `@lumino/widgets/Widget`. 

This houses the entire extension. Given the nature of `@lumino/widgets/Widget`, this component is defined without `React`, though the `SideBarPanel` which is a sub-component that contains the all of the content of the widget is developed with `React` as are all futher sub-components.

#### `constructor(app: @jupyterlab/application/JupyterFrontEnd)`
Extends the super type's constructor, as well as defines the app associated with the widget as the passed app (notably, the one that is active). Three properties are also defined and initialized that describe which section (Login, Search, or Upload) are showing when the extension is initially loaded. Basic widget styling is added as well from the `/style/base.css` file, and an icon is added to the sidebar, imported as an svg string and interpreted as a `@jupyterlab/ui-components/LabIcon` object.

#### Properties
* `private root: react-dom/client/Root`
* `private app: JupyterFrontEnd`
* booleans mentioned in constructor

#### `onAfterAttach`
Creates the `root` component from the inherited `Widget.node` object. Also calls the `render` function defined below.

#### `onBeforeDetach`
Unmounts the `root` component.

#### Toggle functions
`toggleLogin`, `toggleUpload`, and `toggleSearch` control the state of the booleans mentioned in the constructor that define which component is visible within the `SideBarPanel` component. Once these have been toggled, the whole component is re-rendered.

#### `render`
Simply runs the root objects `.render` function, passing the imported `SideBarPanel` component with the `app` and booleans passed to that component. This serves to render the whole widget on command to reflect changes. Note: This is necessary because the `ZenodoWidget` class is an extension of the `Widget` class and is by definition not a `React` component, thus `useEffect()` cannot be used.

### `activate`
`activate(app: JupyterFrontEnd, palette: ICommandPalette, restorer: ILayoutRestorer | null)`

Function that defines how the widget is initialized and defines the app commands relating to the widget.

Commands added to the hosted Jupyter instance:
* "zenodo-jupyterlab: search": Toggles the search field
* "zenodo-jupyterlab: login": Toggles the login field
* "zenodo-jupyterlab: upload": Toggles the upload field
* "zenodo: open":
> * Creates new widget if widget is disposed
> * Defines widget tracker via `@jupyterlab/apputils/WidgetTracker`
> * Attaches widget to the Jupyter Lab Shell on the sidebar

Finally, the function executes the "zenodo:open" command.

### `plugin`
`plugin: JupyterFrontEndPlugin`

Defines the plugin in which the widget is housed and attaches the `activate` function defined above. Requires `@jupyterlab/apputils/ICommandPalette` and includes optional package `@jupyterlab/application/ILayoutRestorer`. This plugin is exported as the extension.

## API

### `API_functions.tsx` 
This file defines the functions that access the API endpoints set up in the backend. It does so via the `requestAPI` function defined in `handlers.tsx` below.

#### `getEnvVariable(varName: string)`
Makes a GET request to the `zenodo-jupyterlab/env` API endpoint with the encoded argument `env_var` and the value passed in the function call. Returns the response from the API endpoint.
> **Returns:** *data* or `console.error` message

#### `setEnvVariable(key: string, value: string)`
Makes a POST request to the `zenodo-jupyterlab/env` API endpoint with a stringified JSON object containing the key and value passed to the function. Returns nothing or `console.error` message.

#### `testZenodoConnection`
Makes a POST request to the `zenodo-jupyterlab/zenodo-api` API endpoint with a stringified JSON object: `{action: "check-connection"}`. This action component relays which `ZenodoAPI` action to take in the endpoint, which contains both logic for checking the connection and for uploading a deposit. Returns the response from the endpoint.
> **Returns:** *data* or `console.error` message

#### `depositUpload(payload: UploadPayload)`
Note: The UploadPayload type is simply a JSON dictionary with specified keys, imported rather than defined here for simplicity; its definition is housed in `/src/components/type.tsx`. \
Makes a POST request to the `zenodo-jupyterlab/zenodo-api` API endpoint with a stringified JSON object containing `payload`. Returns the response from the endpoint.
> **Returns:** *data* or `console.error` message

#### `searchRecords(search_field: string, page: number, kwargs: Record<string, any> = {})`
Note: The kwargs argument takes in a `Record` string, which is simply a flexible definition of a dictionary with the stated variable types for keys and values.\
Generates the URI encoded URL for the API endpoint by first appending `string_field` and `page` and then iterating through kwargs. Makes a GET request to `zenodo-jupyterlab/search-records` with these encoded arguments. Returns the response from the endpoint.
> **Returns:** *data* or `console.error` message

#### `searchCommunities(search_field: string, page: number)`
Makes a GET request to the 'zenodo-jupyterlab/search-communities` endpoint with `search_field` and `page` encoded. Returns the response from the endpoint.
> **Returns:** *data* or `console.error` message

#### `recordInformation(recordID: number)`
Makes a GET request to the `zenodo-jupyterlab/record-information` API endpoint with `recordID` encoded. Returns the response from the endpoint.
> **Returns:** *data* or `console.error` message

#### `getServerRootDir`
Makes a GET request to the `zenodo-jupyterlab/server-info` API endpoint. Returns the response from the endpoint.
> **Returns:** *data* or `console.error` message

#### `fetchSandboxStatus`
Makes a FETCH request to `zenodo-jupyterlab/env` API endpoint with `env_var` as `ZENODO_SANDBOX`.
> **Returns:** *value* or `console.error` message

### `handlers.tsx` 
This file defines a function for making API requests.

#### `class NetworkError extends Error`
Build errors completely identically to `Error`, but tags them as Network Errors (i.e. connection issues to backend API).

#### `class ResponseError extends Error`
Build errors completely identically to `Error`, but tags them as Response Errors (i.e. issues in the backend API).

#### `requestAPI(endPoint: string, init: RequestInit)`
Pulls the settings from the `@jupyterlab/services/ServerConnection.makeSettings()` to build the full request URL from the `settings.baseURL` and `endPoint`. Retrieves the CSRF token from the `getCsrfToken` function defined below, which is then passed as a header on the request to bypass authentication issues. Returns the response from the API endpoint or an error.
> **Returns:** *data* or `NetworkError` or `ResponseError`

#### `getCsrfToken`
Makes a FETCH request to the `zenodo-jupyterlab/xsrf_token` API endpoint, and returns the response.
> **Returns:** *xsrfToken* or Error

## Components

### `FileBrowser.tsx` 
Contains the component that displays the file browser in the Upload tab of the extension. Note: all styling is contained within `useStyles`, which is initialized via `react-jss.createUseStyles`.

#### `interface FileBrowserProps`
Defines a parameter of `onSelectFile` of type `OnSelectFile`, which is a customized function type that takes in a string and returns nothing, imported from `components/type.tsx`. This is created to pass the `OnSelectFile` function defined in `components/upload.tsx` to the file browser.

#### `const FileBrowser: React.FC<FileBrowserProps>`
File browser component

##### `useState` Properties
```
    const [entries, setEntries] = useState<FileEntry[]>([]);
    const [currentPath, setCurrentPath] = useState<string>('');
    const [rootPath, setRootPath] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedEntries, setSelectedEntries] = useState<Set<string>>(new Set());
    const [selectAll, setSelectAll] = useState<boolean>(false);
```

##### `useEffect`
Defines `fetchRootPath`, which sets `loading` to true and awaits `getServerRootDir`, defined in `API/API_functions`. Sets `rootPath` and `currentPath` to the returned path. Throws an error if any process fails.

##### `useEffect`
Defines `loadFiles` function, which makes a FETCH request to the `zenodo-jupyterlab/files` API endpoint with `currentPath` encoded. Sets `entries` to the list of entries returned from the API endpoint. Calls `loadFiles` upon changes to `currentPath`.

##### `handleClick(entry: FileEntry)`
Note: `FileEntry` is a specialized dictionary defined in `components/type.tsx`.\
If the selected entry was a directory, this function sets `currentPath` to the path of that entry.

##### `handleBreadcrumbClick(path: string)`
When a breadcrumb (shortbut path links displayed when in nested directories) is clicked, simply sets `currentPath` to that breadcrumb's path.

##### `breadcrumbs = useMemo()`
Executes on changes to `currentPath` or `rootPath`. Normalized the syntax of the paths, then iterate through each section of `currentPath` after `rootPath`. During this iteration, builds a list of `React.Fragments` which house the breadcrumbs for each nested directory, complete with click logic (`handleBreadcrumbClick`).
> **Returns:** `breadcrumbItems: list`

##### `handleSelectChange(path: string, isChecked: boolean)`
Compiles a list of all currently checked files within the browser, held in `selectedEntries`. This function also handles unchecking and removing of entries from this list. Also includes logic that toggles the "Select All" checkbox if the number of entries selected equals the length of the list.
> **Returns:** `newEntries`

##### `handleSelectFiles`
Iterates through `selectedEntries` and applies the argument function `onSelectFile` to each's full path. Then sets `selectedEntries` to an empty Set.

##### **Returns**
Returns the Filebrowser component, comprised of the breadcrumbs, the "Select All" checkbox, the list of files in the current directory (with a folder or file icon, title, size, and date modified), and a "Select" button, which triggers `handleSelectFiles`.

### `NavBar.tsx` 
Component that houses the navigation bar, below the Zenodo title icon in the widget. Note: all styling is contained within `useStyles`, which is initialized via `react-jss.createUseStyles`.

#### `interface NavBarProps`
Defines an `app` parameter of type `@jupyterlab/application/JupyterFrontEnd`. This done is order to use the commands defined in `index.tsx`.

#### `NavBar: React.FC<NavBarProps>`
The navigation bar component.

##### Click Handlers
All click handlers simply trigger the `app` command corresponding to that button's title. For instance, pressing the "Search" button trigger the `zenodo-jupyterlab: search` command.

##### **Returns**
Returns the NavBar component, complete with 3 buttons corresponding to the 3 panels available in the widget: "Login", "Search", and "Upload".

### `SearchPanel.tsx` 
This file houses the `SearchWidget` component, which contains all of the search logic and displays the results. Note: all styling is contained within `useStyles`, which is initialized via `react-jss.createUseStyles`.

#### `SearchWidget: React.FC`
Component housing all of the search related features.

##### `useState` Properties
```
    const [results, setResults] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedType, setSelectedType] = useState('records');
    const [lastSearchType, setLastSearchType] = useState('records');
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedRecordID, setSelectedRecordID] = useState<number | null>(null);
    const [recordInfo, setRecordInfo] = useState<any>({});
    const [recordLoading, setRecordLoading] = useState(false);
    const [resultsPage, setResultsPage] = useState(1);
    const [endPage, setEndPage] = useState(false);
    const [selectedCommunityTitle, setSelectedCommunityTitle] = useState<string | null>(null);
    const [selectedCommunityID, setSelectedCommunityID] = useState<string | null>(null);
    const [triggerSearch, setTriggerSearch] = useState(false);
```

##### `useEffect`
Upon changes in `triggerSearch` or `selectedCommunityID`, this runs `handleSearch`, passing the `resultsPage`, `selectedType`, and a dictionary of the form `{"communities": selectedCommunityID}` as arguments. Then sets `triggerSearch` to `false`.

##### `handleSearch(page: number, type: string, kwrgs: Record<string, any> = {})`
This function calls `searchRecords` or `searchCommunities`, both imported from `API/API_functions`, depending on `type`. Then, sets `results` to the returned data. Sets `lastSearchedType` to `type`, as well.

##### `handleCheckboxChange(type: string)`
Sets `selectedType` to whichever checkbox was selected.

##### `handleRecordRowClick(recordID: number)`
If the selected record is already selected, `selectedRecordID` is set to `null` and `recordInfo` is set to an empty dictionary. Otherwise, the function makes a call to `recordInformation`, imported from `API/API_functions.tsx` and sets `recordInfo` to what is returned.

##### `handleCommunityClick(communityID: string, communityTitle: string)`
Runs the following:
```
    setSelectedCommunityTitle(communityTitle);
    setSelectedCommunityID(communityID);
    setSelectedType('records');
    setResultsPage(1);
    setSearchTerm("");
    setTriggerSearch(true);
```

##### `handleNextPageClick`
Increments `resultsPage` and sets `triggerSearch` to true. If the `results` is not greater than 0, then it also sets `endPage` to true.

##### `handleLastPageClick`
Sets `endPage` to false, then decrements `resultsPage`, and triggers the search.

##### `handleSearchClick`
Sets `endPage` to false, sets `resultsPage` to 1, and triggers the search.

##### `handleClearCommunity`
Sets selected community related parameters to `null`, sets `resultsPage` to 1, and triggers the search.

##### `getFileNameFromUrl(url: string)`
Parses the passed url into a `URL` object. Strips "/content" from the paths. Then returns the last segment of the url.
> **Returns:** *fileName*

##### `cleanrUrl(url: string)`
Converts the link attached to the record to a usable download link by stripping the "/content" off of the end and removing "/api" from the path as well.
> **Returns:** *url*

##### **Returns**
Always renders a search bar, checkboxes for "records" or "communities" and a "Search" button. The rest is rendered conditionally:
* If `hasSearched` and `selectedType` is records, it displays a list of the returned records, specifically their title, date published, and resource type.
> * If a record has been selected, it displays that record's extra information.
> * If the user is searching within a community, the name is displayed above the list results.
* If `hasSearched` and `selectedType` is communities, it displays a list of the returned communities, specifically their title and date published.
* If `hasSearched` but `results.length !> 0`, it displays a screen saying there are no results returned.

The Next and Last page buttons are displayed below the results.

### `SideBarPanel.tsx` 
This is the main component of the extension. This houses every single element. Note: all styling is contained within `useStyles`, which is initialized via `react-jss.createUseStyles`.

#### `interface SideBarProps`
* `app: JupyterFrontEnd`
* `showLogin: boolean`
* `showSearch: boolean`
* `showUpload: boolean`

#### `SideBarPanel: React.FC<SideBarProps>`
Contains all rendered content of the extension.

##### **Returns**
Returns the Zenodo Title logo (`icons/ZenodoBlueTitle`) and the `NavBar` component, with the `app` passed as an argument. Conditionally renders either `Login`, `SearchWdiget`, or `Upload` depending on the values of the interface props.

### `confirmation.tsx` 
File containing the confirmation page component of the upload component. Note: all styling is contained within `useStyles`, which is initialized via `react-jss.createUseStyles`.

#### `interface` (Defined in line with component)
* `title: string`
* `resourceType: string`
* `creators: { name: string; affiliation: string }[]`
* `doi: string`
* `filePaths: string[]`
* `isSandbox: boolean`
* `description: string`
* `onEdit: () => void`
* `onConfirm: () => void`

#### `Confirmation: React.FC<Props>`
Component that is comprised of the users inputted information into the upload page along with a "Confirm" and "Edit" button.

##### **Returns**
Returns a panel with all of the users inputted information for the record in the upload page, before pressing "Next".

Note:
* If no `doi` is given, the confirmation page simply displays "automatic".
* If no `description` is given, the confirmation page displays "none given".
* The confirmation displays whether or not the deposit is being made to Zenodo or Zenodo Sandbox.
* The functions triggered by "Edit" and "Confirm" are passed as arguments to this component when rendered in `components/upload.tsx`.

### `login.tsx` 
This file contains the logic and design for the `Login` component of the extension. Note: all styling is contained within `useStyles`, which is initialized via `react-jss.createUseStyles`.

#### `Login: React.FC`
Component housing the login interface of the extension.

##### `useState` Properties
```
    const [APIKey, setAPIKey] = useState('');
    const [outputData, setOutputData] = useState<string | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSandbox, setIsSandbox] = useState(false);
```

##### `handleLogin: useCallback`
Function that relies on the setting of `APIKey` and `isSandbox`. Firstly, passes `isSandbox` to the `setEnvVariable` function from `API/API_functions.tsx`, which sets the env var `ZENODO_SANDBOX`. Then, the function uses `setEnvVariable` and `getEnvVariable` and verifies whether or not a key was given in the field. If not, it checks if there is one stored. If yes, then it stores the new key in the environment. Then, it executes `testAPIConnection`, which is defined below.

##### `handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>)`
Sets `isSandbox` corresponding to the state of the checkbox.

##### `testAPIConnection`
Executes `testZenodoConnection` from `API/API_functions.tsx`. Based on the response, sets `connectionStatus` to either a success or failure message.

##### **Returns**
Returns a field for entering the Zenodo access token, a checkbox indicating whether the user wishes to log in to the standard or sandbox platform, and a "Login" button. Conditionally renders messages indicating the success of storing variables in the environment and the validity of the access token in the chosen platform.

### `Upload.tsx` {#upload}
File containing all of the styling and logic for the `Upload` tab of the extension. Note: all styling is contained within `useStyles`, which is initialized via `react-jss.createUseStyles`.

#### `Upload: React.FC`
Component containing all of the upload-related content.

##### `useState` Properties
```
    const [title, setTitle] = useState('');
    const [resourceType, setResourceType] = useState('');
    const [creators, setCreators] = useState([{ name: '', affiliation: '' }]);
    const [doi, setDoi] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedFilePaths, setSelectedFilePaths] = useState<string[]>([]);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const [isSandbox, setIsSandbox] = useState(false);
    const [description, setDescription] = useState('');
    const [expandedFile, setExpandedFile] = useState<string | null>(null);
```

##### `useEffect`
Defines a `fetchSandboxStatus` function that makes a FETCH request to `zenodo-jupyterlab/env` with the encoded `env_var=ZENODO_SANDBOX`. Sets `isSandbox` depending on the returned value. This function is executed on loading on the component.

##### `handleFileClick(filePath: string)`
Sets `expandedFile` to either `null` or the new `filePath`, depending on whether or not the same was selected that was already expanded.

##### `handleFileRemove(filePath: string)`
Sets `selectedFilePaths` to the same list excluding the current `filePath`.

##### `handleFileSelect(filePath: string)`
Appends the selected `filePath` to the existing `selectedFilePaths`.

##### `handleTitleChange(event: React.ChangeEvent<HTMLInputElement>)`
Sets `title` to the form data.

##### `handleResourceTypeChange(event: React.ChangeEvent<HTMLInputElement>)`
Sets `resourceType` to the form data.

##### `handleDoiChange(event: React.ChangeEvent<HTMLInputElement>)`
Sets `doi` to the form data.

##### `handleCreatorChange(index: number, key: 'name' | 'affiliation', value: string)`
Creates a new Set based on `creators`, then changes the value of an entry based on `index` and `key`. Then, sets this new Set to `creators`.

##### `addCreators`
Appends a blank creator to the end of `creators`.

##### `handleSubmit`
Verifies whether or not all required information has been input; if not, generates an error message at the top of the page and exits the function. Otherwise, sets `confirmationVisible` to true.

##### `handleEdit`
This function hides the confirmation page (passed through to the `Confirmation` component).

##### `handleConfirm`
Generates a `FormData` object with the input data. Defines an `UploadPayload` object (specific dictionary defined in `components/type.tsx`). Calls `depositUpload`, defined in `API/API_functions`, and passes `payload`.

##### `fileName(filePath: string)`
> **Returns:** Last segment of `filePath`

##### **Returns**
If `confirmationVisible`, renders the `Confirmation` component with the following passed as arguments:
```
    title={title} 
    resourceType={resourceType} 
    creators={creators} 
    doi={doi} 
    filePaths={selectedFilePaths} 
    isSandbox = {isSandbox}
    description={description}
    onEdit={handleEdit} 
    onConfirm={handleConfirm}
```

If not, the Upload Panel is rendered, which contains fields for every editable part of the deposit, with red asterisks denoting the required fields. The `Filebrowser` is also rendered, having `handleFileSelect` passed as an argument. Further, a list of selected files is conditionally rendered based on whether or not there are currently files selected.