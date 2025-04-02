---
id: /
slug: /
---

**🟩 Experiencing issues? Check the [service uptime status page](https://vre-hub.github.io/status) 🟩**

![Dynamic YAML Badge](https://img.shields.io/badge/dynamic/yaml?url=https%3A%2F%2Fraw.githubusercontent.com%2Fvre-hub%2Fvre%2Frefs%2Fheads%2Fmain%2Finfrastructure%2Fcluster%2Fflux%2Fjhub%2Fjhub-release.yaml&query=%24.spec.chart.spec.version&label=JupyterHub%20release&color=%23e66a2d)
![Dynamic YAML Badge](https://img.shields.io/badge/dynamic/yaml?url=https%3A%2F%2Fraw.githubusercontent.com%2Fvre-hub%2Fvre%2Frefs%2Fheads%2Fmain%2Finfrastructure%2Fcluster%2Fflux%2Freana%2Freana-release.yaml&query=%24.spec.chart.spec.version&label=Reana%20release&color=%23fd3337)
![Dynamic YAML Badge](https://img.shields.io/badge/dynamic/yaml?url=https%3A%2F%2Fraw.githubusercontent.com%2Fvre-hub%2Fvre%2Frefs%2Fheads%2Fmain%2Finfrastructure%2Fcluster%2Fflux%2Frucio%2Frucio-servers.yaml&query=%24.spec.values.image.tag&label=Rucio%20release&color=%23474986)
![Dynamic YAML Badge](https://img.shields.io/badge/dynamic/yaml?url=https%3A%2F%2Fraw.githubusercontent.com%2Fvre-hub%2Fvre%2Frefs%2Fheads%2Fmain%2Finfrastructure%2Fcluster%2Fflux%2Frucio%2Frucio-servers.yaml&query=%24.spec.chart.spec.version&label=Rucio%20helm%20charts)

# The Virtual Research Environment

Access the VRE platform at https://jhub-vre.cern.ch!

The Virtual Research Environment is an analysis platform developed at **CERN** serving the needs of scientific communities involved in European Projects. 
Its scope is to facilitate the development of **end-to-end physics workflows**, providing researchers with access to an **infrastructure** and to the digital content necessary to produce and preserve a scientific result in compliance with **FAIR** principles. 
The platform's development is aimed at demonstrating how sciences spanning from High Energy Physics to Astrophysics could benefit from the usage of common technologies, initially born to satisfy CERN’s **exabyte-scale data** management needs. 

The Virtual Research Environment’s main components are:

![image](../../static/img/vre-bubble.png)

1. A federated and reliable **Authentication and Authorization** layer 
2. A **federated distributed storage** solution (the ESCAPE Data Lake), providing functionalities for data injection and replication through a Data Management framework (Rucio) 
3. A **computing** cluster supplying the processing power to run full analyses with Reana, a re-analysis software
4. An enhanced **notebook interface** with containerised environments to hide the infrastructure’s complexity from the user. 

![image](../../static/img/VRE-diagram.png)

The deployment of the Virtual Research Environment is open-source and modular, in order to make it easily reproducible by partner institutions; it is publicly accessible and kept up to date by taking advantage of state of the art IT-infrastructure technologies.

The Science Projects which are using the VRE are described [here](https://escape2020.pages.in2p3.fr/virtual-environment/home/). 

If you are a scientist or a new user curious to use the above resources, please refer to the following documentation:  
1. **[AAI](/docs/auth)**
2. **[Rucio Data Lake](/docs/rucio)**
3. **[Reana cluster](/docs/reana)**
4. **[Notebook service](/docs/notebook)**

## Developers

If you want to deploy the VRE on your own infrastructure, or if you want to submit an issue to help us improve the platform, please follow the [developer documentation](https://vre-hub.github.io/docs/tech-docs/home#how-to-contribute). 
 
## Contact
To contact the CERN VRE team with questions, doubts, problems accessing the meetings Indico category or the monitoring dashboards, please join the **[Mattermost channel](https://mattermost.web.cern.ch/signup_user_complete/?id=zqaa9p5fqfd9bnnc64at4b5aye&md=link&sbr=su)**. For more formal requests, i.e. conferences, webinars and events presentations, please email us at *escape-cern-ops 'at' cern.ch*. 

## Join the community 
There are is a recurrent meetings open to all scientists/researchers/developers interested in the VRE. 

- The **VRE working-group monthly meetings** are intended for developers and system administrators who are supporting scientific infrastructures. They constitute an informal space to stimulate discussion and keep all the members up to date with the latest news and hot topics on the development and deployment of tools and services within the broad field of scientific analysis platforms. Join [here](https://indico.cern.ch/category/17065/). 

## Resources 
- Gazzarrini, E., Garcia, E., Gosein, D., Vendrell Moya, A., Kounelis, A., and Espinal, X., “The Virtual Research Environment: towards a comprehensive analysis platform”, <i>arXiv e-prints</i>, 2023. [doi:10.48550/arXiv.2305.10166](https://arxiv.org/abs/2305.10166).
- [plenary talk](https://indico.jlab.org/event/459/contributions/11671/) at *26th International Conference on Computing in High Energy & Nuclear Physics (CHEP2023)*
- [presentation](https://indico.cern.ch/event/1106990/contributions/4991200/) at *21st International Workshop on Advanced Computing and Analysis Techniques in Physics Research, Bari 2022*
- [presentation](https://projectescape.eu/sites/default/files/1.EnriqueGarcia_VRE_ESCAPE-Bruxels_Nov2022_v2.pdf) at *ESCAPE to the Future, Brussels 2022* 
