# Rucio

Rucio is an Open Source scientific Data Management sofware developed at CERN and used since more than 10 by various experiments and collaborations.  

Rucio is the backbone of the CERN VRE. The platform acts as a middleware to the ESCAPE Rucio instance, as well as for the rest of services. 

All Rucio services are deployed using the [upstream Helm charts](https://github.com/rucio/helm-charts). Currently, the deployed version on the CERN VRE is `v34.6.0`.
* A detailed tutorial on how to deploy Rucio (the servers, the daemons and the UI services) on Kubernetes can be found [here](https://rucio.cern.ch/documentation/operator/k8s_guide), - please note that certain parts of this tutorial are CERN-specific. 
    - This guide tries to put toguether the personal expertise of the CERN VRE team and most of the documentation that can be found on line.
* The CERN VRE Rucio user documentation can be found on the top `Rucio` tab of this website or [here](../../rucio.md).
* For further and more detailed information, please visit the [official Rucio documentation](https://rucio.cern.ch/documentation/).