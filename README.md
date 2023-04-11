# The Virtual Research Environment

The Virtual Research Environment is an analysis platform developed at CERN serving the needs of scientific communities involved in European Projects. Its scope is to facilitate the development of end-to-end physics workflows, providing researchers with access to an infrastructure and to the digital content necessary to produce and preserve a scientific result in compliance with FAIR principles. The platform's development is aimed at demonstrating how sciences spanning from High Energy Physics to Astrophysics could benefit from the usage of common technologies, initially born to satisfy CERN’s exabyte-scale data management needs. The Virtual Research Environment’s main components are (1) a federated distributed storage solution (the Data Lake), providing functionalities for data injection and replication through a Data Management framework (Rucio), (2) a computing cluster supplying the processing power to run full analyses with Reana, a re-analysis software, (3) a federated and reliable Authentication and Authorization layer and (4) an enhanced notebook interface with containerised environments to hide the infrastructure’s complexity from the user. The deployment of the Virtual Research Environment is open-source and modular, in order to make it easily reproducible by partner institutions; it is publicly accessible and kept up to date by taking advantage of state of the art IT-infrastructure technologies. 

## The Science Projects

Explore the description of the Science Projects on the dedicated [webpage](https://escape2020.pages.in2p3.fr/virtual-environment/home/). 

## Technical Implementation 

![image](VRE-diagram.png)

## User guide 

In progress. 

## Developer guide 

If you want to look at how we manage our K8s cluster and the remote storage eleements, navigate the wiki section of the **vre** repo. 

## Resources 
- [Jupyterhub cluster](https://nb-vre.cern.ch/)
- [IAM dashboard]()
- [Monitoring dashboard](https://monit-grafana.cern.ch/d/PJ65OqBVz/vre-rucio-events?orgId=51)
- [Reana cluster]()

## Contact

To contact the team, join the [Slack channel](https://eosc-escape.slack.com/archives/C03Q65M1U5V) or email us at *escape-cern-ops@cern.ch*. 
