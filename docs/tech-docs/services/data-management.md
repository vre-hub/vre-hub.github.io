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

In general, Rucio database (DB) upgrades are straigforward and should work out of the box when following [Rucio official DB  documentation](https://rucio.github.io/documentation/operator/database/) or Rucio Major release notes. For instance, minor DB changes or updates will be applied when modifying the version of a chart.

#### Manual upgrade of the database schema

:::warning
Entering danger zone. Please own under your own risk the following documentation.
:::

##### How did we get here ?

After a major Rucio upgrade (v32.0.0 to v34.6.0) something went wrong with the DB update and we were getting the following error on the `conveyor` daemons.
```bash
| 2025-01-23 10:40:44,982    root    1    DEBUG    [1/2]: Switching to activity T0 Export   
│ 2025-01-23 10:40:44,982    root    1    WARNING    [1/2]: multihop_rse_expression is not empty, but returned no RSEs
│ 2025-01-23 10:40:44,990    root    1    CRITICAL    [1/2]: Exception
│ Traceback (most recent call last): 
│   File "/usr/local/lib64/python3.9/site-packages/sqlalchemy/engine/base.py", line 1969, in _exec_single_context  
│     self.dialect.do_execute(
│   File "/usr/local/lib64/python3.9/site-packages/sqlalchemy/engine/default.py", line 922, in do_execute
│     cursor.execute(statement, parameters)
│ psycopg2.errors.UndefinedColumn: column requests.last_processed_by does not exist 
│ LINE 4: ...ND transfer_hops.next_hop_request_id IS NULL AND (requests.l...  
│                                                              ^       
│                                                                                                                      
```

and when trying to upgrade the DB, nothing was happening

```bash
[root@servers-rucio-server-8498f47bf9-cbq9j etc]# alembic upgrade head --sql
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Generating static SQL
INFO  [alembic.runtime.migration] Will assume transactional DDL.
BEGIN;

DROP TABLE alembic_version;

COMMIT;

[root@servers-rucio-server-8498f47bf9-cbq9j etc]# echo $(alembic current | cut -d' ' -f1)
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.

[root@servers-rucio-server-8498f47bf9-cbq9j etc]#
```

There was no trace of an `alembic.ini` file nowhere within our pods/VMs and no idea in which version we were.

##### How to solve this ?

Trying not to diverge from Rucio practices as much as possible

1. Go to your dev environment / VM and clone the rucio project.
2. Follow the [alembic tutorial](https://alembic.sqlalchemy.org/en/latest/tutorial.html#) and create a new `alembic.ini` file. 
```bash
git clone git@github.com:rucio/rucio.git
cd /rucio/lib/rucio/db/sqla
alembic init alembic
```
3. This command will create a `migrate-repo` directory as well. 
4. Add to the `alembic.ini` file the corresponding string to connect to the Rucio DB.
```
sqlalchemy.url = postgresql://rucio:PASSWORD@DBOD-CERN-URL.cern.ch:port/rucio
```

Also, installing the package to interact with a psql DB will be useful
```bash
dnf install postgresql-server
psql -h dbod-vre.cern.ch -U rucio -p 6600
\d distances
```

At this point we spoke with an Rucio expert that pointed out that we were missing some table from a major DB migration around V32. We discovered that revision `295289b5a800` was not on our schema. But we did not know if previous revisions were applied too.

When `grep`-ing on the directory with all the rucio revisions we  realise that we are getting two files, as any revision points to the curret one plus the previous one.
```bash
grep -ri 'a6eb23955c28'
295289b5a800_processed_by_and__at_in_requests.py:down_revision = 'a6eb23955c28'
a6eb23955c28_state_idx_non_functional.py:revision = 'a6eb23955c28'
```
Therefore, we can easily find the rev+1 file revision by doing 
```bash
grep -ri 'a6eb23955c28' | grep "down_revision = 'a6eb23955c28'"
295289b5a800_processed_by_and__at_in_requests.py:down_revision = 'a6eb23955c28'
# and
> grep -ri 'a6eb23955c28' | grep "down_revision = 'a6eb23955c28'" | cut -d'_' -f1
295289b5a800
```

The following snippet can be used to find the order of the DB revisions starting from a `i-th` one.
```bash
export I_REVISION=$1
export NEXT_REV=$I_REVISION
while [[ -n $NEXT_REV ]]; do 
    echo $NEXT_REV
    NEXT_REV=$(grep -ri ${NEXT_REV} | grep "down_revision = '${NEXT_REV}'" | cut -d'_' -f1)
done
```
And by doing Obtaining `export I_REVISION=295289b5a800` and running the script we got
```
a6eb23955c28
295289b5a800
27e3a68927fb
4df2c5ddabc0
a08fa8de1545
b5493606bbf5
b0070f3695c8
```

By doing few `git checkout tags vX.Y.Z` and playing around wiht the output we got to

```bash
fb28a95fe288 <-- revision 1.31.0
a6eb23955c28 <-- v32.0.0
295289b5a800
27e3a68927fb <-- last of v32.0.0
4df2c5ddabc0
a08fa8de1545 <-- Last of 34.6.0
b5493606bbf5
b0070f3695c8 <-- rucio main on Jan '25
```

Now we just need to check which revisions are applied to our DB by checking if the table(s) modification(s) are applied.

To allow `alembic` interact with all the revisions, it needed to be aware of them.
```
cd rucio/lib/rucio/db/sqla/migrate_repo
cp versions/* alembic/versions
```

and now we can force the alembic version on our DB.
```psql
psql -h dbod-vre.cern.ch -U rucio -p 6600

INSERT INTO alembic_version (version_num) VALUES ('140fef722e91') RETURNING alembic_version.version_num;
```
and now when doing
```psql
alembic current
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
140fef722e91
```
voilà !

The rest was strightforwad, just applied the missing revisions until getting to the desired schema version.

```bash
> pwd
/root/software/rucio/lib/rucio/db/sqla/migrate_repo
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

Getting successfully to v34.6.0 !
