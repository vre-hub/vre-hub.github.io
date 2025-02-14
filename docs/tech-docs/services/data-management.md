# Rucio

![Dynamic YAML Badge](https://img.shields.io/badge/dynamic/yaml?url=https%3A%2F%2Fraw.githubusercontent.com%2Fvre-hub%2Fvre%2Frefs%2Fheads%2Fmain%2Finfrastructure%2Fcluster%2Fflux%2Frucio%2Frucio-servers.yaml&query=%24.spec.values.image.tag&label=Rucio%20release&color=%23474986)
![Dynamic YAML Badge](https://img.shields.io/badge/dynamic/yaml?url=https%3A%2F%2Fraw.githubusercontent.com%2Fvre-hub%2Fvre%2Frefs%2Fheads%2Fmain%2Finfrastructure%2Fcluster%2Fflux%2Frucio%2Frucio-servers.yaml&query=%24.spec.chart.spec.version&label=Rucio%20helm%20charts)

Rucio is an Open Source scientific Data Management sofware developed at CERN and used since more than 10 by various experiments and collaborations.  

Rucio is the backbone of the CERN VRE. The platform acts as a middleware to the ESCAPE Rucio instance, as well as for the rest of services. 

## CERN VRE Rucio deployment

All Rucio services are deployed on the VRE using the [upstream Helm charts](https://github.com/rucio/helm-charts).

* The current Rucio Helm chart version, and the Rucio version deployed on the cluster are shown on the badges at the beginning of this page.
* The Rucio manifests deployed on the cluster can be found on the VRE repository - [Rucio deployment](https://github.com/vre-hub/vre/tree/main/infrastructure/cluster/flux/rucio).

A detailed tutorial on how to deploy Rucio (the servers, the daemons and the UI services) on Kubernetes is described on the [k8s guide](https://rucio.cern.ch/documentation/operator/k8s_guide) of the official Rucio documentation. Please note that certain parts of this tutorial are CERN-specific. 

* The CERN VRE Rucio user documentation can be found on the top `Rucio` tab of this website or [here](../../rucio.md).
* For further and more detailed information, please visit the [official Rucio documentation](https://rucio.cern.ch/documentation/).

### Developers software environment

This section suggest a list of software packages that could be useful when dealing with rucio transfers between different data centers.
For normal user interactio please go to the [VRE rucio users section](../../rucio.md#1-manual-installation)

```bash
dnf install wget curl \
            voms-clients-java \
            gfal2* python3-gfal2 \
            xrootd-client\
            nordugrid-arc-client \
            nordugrid-arc-plugins-gfal \
            nordugrid-arc-plugins-globus \
            nordugrid-arc-plugins-s3 \
            nordugrid-arc-plugins-xrootd
```

### Interacting with the Rucio Data Base 

Generally, Rucio database (DB) upgrades are straigforward and should work out of the box when following [Rucio official DB documentation](https://rucio.github.io/documentation/operator/database/) or Rucio Major release notes. For instance, minor DB changes or updates will be applied when modifying the version of a chart.

#### Manual upgrade of the database schema

:::danger[User discretion advised]
Manual operations on the DB are dangerous. Please make sure you have a backup of your DB before continuing.
:::

The following actions can used when not being able to upgrade the DB automatically (see some errors and examples [below](#rucio-conveyor-daemons-and-db-errors-examples)).

1. Go to your dev environment and clone the rucio project.
2. Follow the [alembic tutorial](https://alembic.sqlalchemy.org/en/latest/tutorial.html#) and create a new `alembic.ini` file. 
```bash
git clone git@github.com:rucio/rucio.git
cd /rucio/lib/rucio/db/sqla
alembic init alembic
```
3. This command will create an `alembic.ini` file and an `alembic` subdirectory with the files and subdirectories described in the tutorial.
4. Edit the `alembic.ini` file adding the corresponding string to connect to the Rucio DB.
```bash
sqlalchemy.url = postgresql://rucio:PASSWORD@DBOD-CERN-URL.cern.ch:port/rucio
```
:::tip
Because we do not want to develop any new alembic version, modify the `alembic.ini` file and the `script_location` field to point the folder that contains the upstream rucio alembic revisions: `rucio/lib/rucio/db/sqla/migrate_repo/versions`
```bash
script_location = versions
```
:::
5. You can install the corresponding DB-client library to interact manually with it, or  alternatively (suggested for non experienced users), you can also use UI applications to operate (e.g: [DBeaver](https://dbeaver.io/) is free and open source).
```python
# Example for an alma9 OS and a postgres DB client
dnf install postgresql-server
psql -h <DB_URL> -U rucio -p <PORT>
```

The `rucio/db/sqla/migrate_repo/versions` folder contains all the upstream alembic revisions. Every revision file has a [common structure](https://alembic.sqlalchemy.org/en/latest/tutorial.html#create-a-migration-script): a header, the `revision` and `down_revision` alembic identifiers and the `upgrade()` and `downgrade()` python functions that modifies the DB.
```python
# Alembic revision identifiers
revision = '295289b5a800'
down_revision = 'a6eb23955c28'
```
When `grep`-ing for a specific reuvision, you will get two files as a result; the curret and the current plus DB revision.
```python
> grep -ri 'a6eb23955c28'
295289b5a800_processed_by_and__at_in_requests.py:down_revision = 'a6eb23955c28'
a6eb23955c28_state_idx_non_functional.py:revision = 'a6eb23955c28'
```
Therefore, we can easily find the rev+1 file revision by doing 
```python
> grep -ri 'a6eb23955c28' | grep "down_revision = 'a6eb23955c28'"
295289b5a800_processed_by_and__at_in_requests.py:down_revision = 'a6eb23955c28'
# and
> grep -ri 'a6eb23955c28' | grep "down_revision = 'a6eb23955c28'" | cut -d'_' -f1
295289b5a800
```

The following script can be used to find the order of the DB revisions starting from a `i-th` one.
```python
#!/bin/bash
export I_REVISION=$1
export NEXT_REV=$I_REVISION
while [[ -n $NEXT_REV ]]; do 
    echo $NEXT_REV
    NEXT_REV=$(grep -ri ${NEXT_REV} | grep "down_revision = '${NEXT_REV}'" | cut -d'_' -f1)
done
```

Once you discover the problematic revision's identifier, you can play around with the script to understand the revision order. In our case we have
```bash
fb28a95fe288 <-- revision v1.31.0
a6eb23955c28 <-- first rev v32.0.0
295289b5a800
27e3a68927fb <-- last rev of v32.0.0
4df2c5ddabc0
a08fa8de1545 <-- last rev of v34.6.0
b5493606bbf5
b0070f3695c8 
```
:::tip
By doing a `git checkout tags/X.Y.Z` on the rucio project and playing around with the script, you will be able associate alembic revisions with rucio tags.
:::
:::warning
Note that we do not guarantee that the order of these revisions is correct.
:::


Double check if the problematic revision has been applied or not to your DB. This can be done by checking the `upgrade()` functions and checking if these changes have been applied by inspecting the DB (using the command CLI or any DB UI tool).

Once you are sure of the revision you are in, you can force the alembic version on your DB. Connect to your DB, 
```bash
> psql -h <DB_URL> -U rucio -p <PORT>
```
add manually the `alembic_version`,
```psql
INSERT INTO alembic_version (version_num) VALUES ('140fef722e91') RETURNING alembic_version.version_num;
```
and and double check with alembic
```psql
> alembic current
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
140fef722e91
```
*Et voilà !*

From now forward, it was sufficient to apply the missing revisions until getting to the desired schema version.

```bash
> pwd
.../rucio/lib/rucio/db/sqla/migrate_repo/versions
> alembic upgrade fb28a95fe288
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade 140fef722e91 -> fb28a95fe288, add_replicas_rse_id_tombstone_idx
> alembic upgrade a6eb23955c28
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade fb28a95fe288 -> a6eb23955c28, state idx non functional
> alembic upgrade 295289b5a800
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade a6eb23955c28 -> 295289b5a800, processed_by and _at in requests
> alembic upgrade 27e3a68927fb
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade 295289b5a800 -> 27e3a68927fb, remove replicas_tombstone and replicas_rse_id indexes
> alembic upgrade 4df2c5ddabc0
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade 27e3a68927fb -> 4df2c5ddabc0, remove temporary dids
> alembic upgrade a08fa8de1545
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade 4df2c5ddabc0 -> a08fa8de1545, transfer_stats table
```

Gotten successfully to v34.6.0 !


##### Rucio conveyor daemons and DB errors examples

After a major VRE Rucio upgrade (v32.0.0 to v34.6.0) something went wrong with the DB update and we were getting the following error on the `conveyor` daemons.
```bash
2025-01-23 10:40:44,982    root    1    DEBUG       [1/2]: Switching to activity T0 Export   
2025-01-23 10:40:44,982    root    1    WARNING     [1/2]: multihop_rse_expression is not empty, but returned no RSEs
2025-01-23 10:40:44,990    root    1    CRITICAL    [1/2]: Exception
Traceback (most recent call last): 
  File "/usr/local/lib64/python3.9/site-packages/sqlalchemy/engine/base.py", line 1969, in _exec_single_context  
    self.dialect.do_execute(
  File "/usr/local/lib64/python3.9/site-packages/sqlalchemy/engine/default.py", line 922, in do_execute
    cursor.execute(statement, parameters)
psycopg2.errors.UndefinedColumn: column requests.last_processed_by does not exist 
LINE 4: ...ND transfer_hops.next_hop_request_id IS NULL AND (requests.l...  
                                                             ^ 
```

and when trying to upgrade the DB, nothing was happening

```bash
> alembic upgrade head --sql
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Generating static SQL
INFO  [alembic.runtime.migration] Will assume transactional DDL.
BEGIN;

DROP TABLE alembic_version;

COMMIT;

> echo $(alembic current | cut -d' ' -f1)
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.

```
