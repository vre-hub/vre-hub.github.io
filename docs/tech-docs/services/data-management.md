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