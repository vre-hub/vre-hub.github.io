# Frontend
The frontend of Reana JupyterLab extension is implemented as a JupyterLab plugin that provides a set of tools to interact with the REANA workflow management system from within JupyterLab. The frontend is implemented using TypeScript and React, and it consists of a set of components that are used to build the user interface of the extension.

## Components {#components}

### `Box.tsx` {#box}
This component is used in the workflows list to display the details of each workflow.

### `Button.tsx` {#button}
This component is used in several places in the UI to create buttons.

### `Dropdown.tsx` {#dropdown}
This component is used in the Job Logs tab to select the workflow step.

### `FileBrowser.tsx` {#file-browser}
This component is used to display the file browser in the _Create_ tab.

### `Header.tsx` {#header}
This component is used to display the header of the extension. This header contains the REANA logo.

### `HorizontalHeading.tsx` {#horizontal-heading}
This component is used to display the titles of the different sections of the extension.

### `InlineDropdown.tsx` {#inline-dropdown}
This component is used in the workflows list as part of the filters. In particular, is used for the status filter and for the order.

### `Loading.tsx` {#loading}
This component is used to display a loading spinner.

### `MenuBar.tsx` {#menu-bar}
This component is used to display the menu bar of the extension. It is used twice, once in the header and once in the workflows details.

### `Pagination.tsx` {#pagination}
This component is used to display the pagination in the workflows list and the workspace.

### `ReanaLogo.tsx` {#reana-logo}
This component is used to display the REANA logo.

### `Spinning.tsx` {#spinning}
This component is used to display a spinning icon.

### `TextField.tsx` {#text-field}
This component is used to display a text field. It is used in almost every screen of the extension.

### `TooltipIfTruncated.tsx` {#tooltip-if-truncated}
This component is used as a regular tooltip in the Job Logs section within the workflow details. If the text is too long, it will be truncated.

### `@Connection/ConnectionForm.tsx` {#connection-form}
This component is used to display the connection form in the _Connection_ tab. It has two text fields for the server URL and the access token, and a _Connect_ button to test the connection.

### `@Create/CreateForm.tsx` {#create-form}
This component is used to display the create form in the _Create_ tab. It has a text field for the workflow name, a file browser to select the workflow specification file, and two buttons: a _Valitate_ button to validate the YAML file and a _Create & Run_ button to create the workflow, upload the files and run it.

### `@Workflows/WorkflowDetails.tsx` {#workflow-details}
This component is used to display the details of a workflow. It contains a menu bar with several tabs:  _Job Logs_, _Engine Logs_, _Workspace_, and _Specification_.

### `@Workflows/WorkflowEngineLogs.tsx` {#workflow-engine-logs}
This component is used to display the engine logs of a workflow.

### `@Workflows/WorkflowJobLogs.tsx` {#workflow-job-logs}
This component is used to display the job logs of a workflow. It has a dropdown to select the workflow step. The details of the selected step are displayed in tooltips.

### `@Workflows/WorkflowOverview.tsx` {#workflow-overview}
This component is used to display the general information about the workflow. It appears in every tab of the workflow details. It containse the workflow name, the run number, the status, a date related to the status, and the number of steps. When the workflow is not in a final state, it also displays a refresh button.

### `@Workflows/WorkflowSpecification.tsx` {#workflow-specification}
This component is used to display the specification of the workflow. It shows the content of the YAML file that defines the workflow.

### `@Workflows/WorkflowWorkspaceFile.tsx` {#workflow-workspace-file}
This component is used to display the content of a file in the workspace of the workflow. It provides a search bar to filter by file name. The files are displayed in a table, containing the file name, the file size, and the last modified date (if the bar is wide enough). It also has a button to download the files. If no files are selected, the button will download all the files in the workspace. If files are selected, the button will download only the selected files.

### `@Workflows/WorkflowsFilters.tsx` {#workflows-filters}
This component is used to display the filters in the workflows list. It contains two dropdowns: one for the status and one for the order. It also contains a search bar to filter by workflow name, and a refresh button to update the list of workflows.

### `@Workflows/WorkflowsList.tsx` {#workflows-list}
This component is used to display the list of workflows.
The workflows are displayed in boxes, each containing the workflow name, the run number and the status. The boxes are paginated, and the user can navigate through the pages using the pagination component.

## Images {#images}

### `reana-icon.svg` {#reana-icon}
This image is used as the REANA logo in the header of the extension.

## Stores {#stores}

### `UIStore.ts` {#ui-store}
This store is used to manage the state of the UI. It contains the following properties:

* `authConfig`: The server URL and the access token.
* `hasConnection`: A boolean that indicates if the connection to the server has been established.
* `selectedWorkflow`: The details of the selected workflow.

## Utils {#utils}

### `ApiRequest.ts` {#api-request}
This utility is used to make API requests to the Jupyter server extension.

## Widgets {#widgets}

### `SidebarPanel.tsx` {#sidebar-panel}
This widget is used to display the sidebar panel in the extension. It contains the menu bar and the content of the selected tab. This is the main component of the extension.

## Miscellaneous {#miscellaneous}

### `const.ts` {#const}
This file contains the constants used in the extension.

### `index.tsx` {#index}
This file is the entry point of the extension. It renders the `SidebarPanel` component.

### `svg.d.tsx` {#svg}
This file contains the type definitions for SVG files.

### `types.ts` {#types}
This file contains the type definitions used in the extension.

### `utils.ts` {#utils-file}
This file contains utility functions used in the extension. In particular, it contains the functions to calculate the duration of a workflow.



