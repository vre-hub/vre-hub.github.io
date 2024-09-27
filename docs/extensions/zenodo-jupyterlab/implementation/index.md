# Full Documentation
This section is dedicated to a full documentation of both the frontend and backend components of the extension. This is intended as a guide for future developers.

## Folder Structure
Here is the basic folder structure of the major frontend and backend components of this extension. This documentation will be separated by frontend and backend components.

```
zenodo-jupyterlab-extension/
├── pyproject.toml
├── requirements.txt
├── setup.py
├── src/                        #frontend
│   ├── API/
│   │   ├── API_functions.tsx
│   │   ├── handler.tsx
│   ├── components/
│   │   ├── NavBar.tsx
│   │   ├── SearchPanel.tsx
│   │   ├── SideBarPanel.tsx
│   │   └── login.tsx
│   ├── icons/
│   │   ├── ZenodoBlueTitle.tsx
│   │   ├── z_icon.svg
│   │   ├── zenodo-black.svg
│   │   └── zenodo-blue.svg
│   ├── index.tsx
│   └── svg.d.tsx
├── zenodo_jupyterlab/ 
│   ├── __init__.py
│   ├── _version.py
│   ├── labextension/
│   │   ├── build_log.json
│   │   ├── package.json
│   │   └── static/
│   └── server/                 #backend
│       ├── __init__.py
│       ├── extension.py
│       ├── handlers.py
│       ├── search.py
│       ├── testConnection.py
│       └── tests/
│           ├── test_search.py
│           └── test_testConnection.py
```