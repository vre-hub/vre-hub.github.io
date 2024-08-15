# Overview

Reana JupyterLab is composed of two main components: the frontend and the backend. The frontend is a JupyterLab extension that is written in TypeScript and React. The backend is a JupyterLab server extension that is written in Python. The frontend is responsible for the user interface and the backend is responsible for the server-side logic.

## Folder Structure
Here is the basic folder structure of the major frontend and backend components of this extension. This documentation will be separated by frontend and backend components.

```
reana-jupyterlab-extension/
├── pyproject.toml
├── requirements.txt
├── setup.py
├── src/
│   ├── components/
│   │   ├── Box.tsx
│   │   ├── Button.tsx
│   │   ├── Dropdown.tsx
│   │   ├── FileBrowser.tsx
│   │   ├── Header.tsx
│   │   ├── HorizontalHeading.tsx
│   │   ├── InlineDropdown.tsx
│   │   ├── Loading.tsx
│   │   ├── MenuBar.tsx
│   │   ├── Pagination.tsx
│   │   ├── ReanaLogo.tsx
│   │   ├── Spinning.tsx
│   │   ├── TextField.tsx
│   │   ├── TooltipIfTruncated.tsx
│   │   ├── @Connection/
│   │   │   └── ConnectionForm.tsx
│   │   ├── @Create/
│   │   │   └── CreateForm.tsx
│   │   └── @Workflows/
│   │       ├── WorkflowDetails.tsx
│   │       ├── WorkflowEngineLogs.tsx
│   │       ├── WorkflowJobLogs.tsx
│   │       ├── WorkflowOverview.tsx
│   │       ├── WorkflowSpecification.tsx
│   │       ├── WorkflowWorkspaceFile.tsx
│   │       ├── WorkflowsFilters.tsx
│   │       └── WorkflowsList.tsx
│   ├── images/
│   │   └── reana-icon.svg
│   ├── stores/
│   │   └── UIStore.ts   
│   ├── utils/
│   │   └── ApiRequest.ts     
│   ├── widgets/
│   │   └── SidebarPanel.tsx
│   ├── const.ts
│   ├── index.tsx
│   ├── svg.d.tsx
│   ├── types.ts
│   └── utils.ts
├── style/
│   ├── base.css
│   ├── index.css
│   └── index.js
└── reana_jupyterlab/ 
    ├── __init__.py
    ├── _version.py
    ├── const.py
    ├── server.py
    └── handlers/
        ├── __init__.py
        ├── connection.py
        ├── files.py
        ├── handlers.py
        └── workflows.py

```