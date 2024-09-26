# Frontend Usage Guide

## Searching 

The user has the ability to search both records and communities, which are collections of records. The actual search query ability is derived from [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html), just as the [Zenodo REST API](https://developers.zenodo.org/#rest-api) is.

The results are returned in pages of 25 results, with the ability to navigate the pages of results. This leverages the built-in `page` and `size` parameters present in the Zenodo REST API, which appear as `kwargs` in `eOSSR`, the python library on which all backend communication with Zenodo is based.

For searched records, the title, resource type, and date published are displayed in the table. For communities, only the title and date published are displayed. Both searches are returned and sorted by most recently updated.

*Note*: As each page is a new API call, if records are added that match the search parameters in between page calls, there is a possibility for repeating records, as they are pushed to later pages. Though, given the probable specificity of users' searches, this should not be an issue.

### Record Information
When a record is selected, more record information is displayed:
* Title of the record as a link to the Zenodo record entry on `zenodo.org`
* Author List, with institutions available upon hovering
* List of files as download links (WIP, currently install to local computer, but in future updates will install to the `$HOME` directory in the Jupyter instance)

This interface is meant to mimic the record entries on `zenodo.org`.

### Community Searching
Upon searching for a community, when clicked, the user will be able to search for specific records within that community, and a banner will display which community is being searched through above the results. Note: the community searching can be canceled by either pressing the `X` next to this community banner or searching for a new community.

### Potential Future Features
Depending on the usefulness of the feature in terms of the scope of this extension, advanced search settings might be added in future updates. These would mimic those on `zenodo.org`: restrict file type, resource type, access level, ...


## ZenodoAPI interactions {#zenodoAPI}
This section involves all actions that interact with the `eossr.api.zenodo.ZenodoAPI` module, which creates a connection to Zenodo with an API access token for continued use.

### Logging in
The user is able to either log in to the main [Zenodo](https://zenodo.org/) software or the [Sandbox Zenodo](https://sandbox.zenodo.org/) software (for testing) using their Personl Access Token. This token is created in the Zenodo User Settings > Applications > Personal Access Tokens. When the user logs in, the validity of their token in the chosen software is determined via a query of that user's deposits. If the token is invalid, this is displayed clearly below the access token field.

The entered access token and choice of whether or not to work within the main or sandbox software are saved as environmental variables within the Jupyter Session: `ZENODO_API_KEY` and `SANDBOX_ZENODO`, respectively. These variables will be accessible across the Jupyter Session, however they will not be reflected in any open terminals; new terminals/notebooks must be opened to reflect the change.

### Uploading A Record
The sandbox checkbox at the top of the Upload page is readonly and indicates whether of not the user logged in to the main software or the sandbox version. This is to inform the user of in which software their deposit will be made.

In order to continue, the user had to fill in the necessary information:
* Select at least one file to upload (the file browser initially shows the contents of the `$Home` directory in the Jupyter Session)
* Title
* Select a Resource Type
* Include at least one Creator's name
* Optional Information:
** DOI (otherwise generated automatically)
** Multiple Creators and include affiliations

Once the `Next` button is selected, a confirmation page is shown with all of the entered information. When `Confirm` is pressed, a deposit is made and the appropriate metadata is assigned. ***Note***: As is currently stands, only the title is able to be set via this mechanism, and the file upload has yet to be implemented.