# CVMFS
:::warning
These instructions are highly CERN-dependent.<br/>
Please refer to the [Official CernVM-FS documentation](https://cvmfs.readthedocs.io/en/stable) for detailed instructions on how to start from scratch.
:::
## Setting up a Repository

At CERN, the repository and release manager creation are provided by the Storage and Data Management group, through the [CVMS Repository creation request](https://cern.service-now.com/service-portal?id=sc_cat_item&name=CVMS-repository&se=cvmfs).

Elsewhere, please follow the steps at [Creating a Repository (Stratum 0)](https://cvmfs.readthedocs.io/en/stable/cpt-repo.html).

A set of useful information to know before submitting the request (or autonomously creating a repository):
1. What is the quota for the repository and expected growth of the over time?
2. Does the repository need (periodical) garbage collection?
3. Should the visibility of the repository be restricted (e.g., due to licensed software)?
4. Should the repository be replicated on other Stratum 1 servers worldwide?

:::tip[Repository naming]
*The repository name resembles a DNS scheme, but it does not need to reflect any real server name. It is supposed to be a globally unique name that indicates where/who the publishing of content takes place. A repository name must only contain alphanumeric characters plus -, , or ., and it is limited to a length of 60 characters.*
:::

The release manager is usually a VM where operators can upload, modify and delete the content of the repository.

## Publishing content

As described [here](https://cvmfs.readthedocs.io/en/stable/cpt-repo.html#content-publishing), there are four main steps needed to publish content: 
1. Initiate the transation via `cvmfs_server transaction <repository name>`
2. Install content into `/cvmfs/<repository name>`
3. (optional) Create nested catalogs at proper locations
4. Finalise the transaction via `cvmfs_server publish <repository name>`

#### Install content

At startup, a CERN-hosted release manager will look like this:
```sh
* ********************************************************************
* Welcome to xxxxx.cern.ch, AlmaLinux release 9.5 (Teal Serval)
* Archive of news is available in /etc/motd-archive
* Reminder: you have agreed to the CERN
*   computing rules, in particular OC5. CERN implements
*   the measures necessary to ensure compliance.
*   https://cern.ch/ComputingRules
* Puppet environment: production, Roger state: build
* Foreman hostgroup: xxxxxxx
* #######################################################
The CVMFS Stratum 0 for repo xxxxxx.
Access is controlled via the e-group xxxxxxx.
Shared local unix user for account  xxxxxxx.

To become the shared user execute:
   sudo -i -u xxxxxxx
To start a transaction:
   cvmfs_server transaction sw.escape.eu
To publish a transaction
   cvmfs_server publish sw.escape.eu

* A cvmfs installation host.
* ********************************************************************
```

In order to publish content, it is necessary to switch to a dedicated user, as suggested: `sudo -i -u xxxxxxx`.

How to provide packages and proper versioning is left to the operators. 

:::danger[Pro Tip]
The VRE strategy for content publishing relies on the creation of a tarball containing the necessary software and versions, followed by a setup script to be executed at need. <br/>
More details can be found in the **[ESCAPE CVMFS GitHub Repository](https://github.com/vre-hub/escape-cvmfs)**.
:::