import React from 'react';
import Layout from '@theme/Layout';
import styles from './team.module.css';

// Add your summary by copy-pasting the code contained in the curly braces below. Adapt the text to your needs.
const teamMembers = [
  {
    name: 'Enrique Garcia',
    image: require('@site/static/img/team/enrique.jpg').default,
    email: 'enrique.garcia.garcia@cern.ch',
    linkedin: 'https://www.linkedin.com/in/garciagenrique/',
    github: 'https://github.com/garciagenrique',
    description: `Enrique is a CERN IT fellow working for EU-funded projects, from where the Virtual Research Environment project started. 
    He contributes to the Rucio jupyterlab extension, plugin used by the VRE analysis facility to access the ESCAPE data lake. 
    He holds a degree in Physics from Universidad Autonoma de Madrid, and a MSc in Astrophysics from Universidad Complutense de Madrid.`,
  },
  {
    name: 'Giovanni Guerrieri',
    image: require('@site/static/img/team/gio.jpg').default,
    email: 'giovanni.guerrieri@cern.ch',
    linkedin: 'https://www.linkedin.com/in/giovanniguerrieri',
    github: 'https://github.com/soap2g',
    gitlab: 'https://gitlab.cern.ch/gguerrie',
    description: `Giovanni Guerrieri is the Data Infrastructure for Open Science coordinator for the ESCAPE collaboration, where he also maintains the ESCAPE Virtual Research Environment. He holds a Ph.D. in Particle Physics from the ATLAS Experiment at CERN.
    At CERN, Giovanni works on large-scale data management, analysis facilities, and open data initiatives. He is also part of the CERN team contributing to the development of the EOSC Federation.`,
  },
];

const pastMembers = [
  {
    name: 'Xavier Espinal',
    image: require('@site/static/img/team/xavi.jpg').default,
    email: 'xavier.espinal@cern.ch',
    description: `Xavier obtained his PhD in Physics in Barcelona within the K2K long baseline neutrino experiment (Japan). 
    In 2005, Xavier joined PIC, the Spanish Tier-1 center for LHC computing, and the ATLAS experiment collaboration where has started his career in scientific computing. 
    Xavier held several roles in disributed operations, data processing and data management activities during the deployment and operation phase of the Worldwide LHC Computing Grid.
    He coordinated the ESCAPE Data Infrastructure for Open Science Work Package, which, among other outcomes, led to the implementation of the VRE.`
  },
  {
    name: 'Ruben Perez',
    image: require('@site/static/img/team/neutral.jpg').default,
    linkedin: 'https://www.linkedin.com/in/rubenperezmercado/',
    github: 'https://github.com/rubenperezm',
    description: `Ruben contributed to the VRE by developing the Reana Jupyterlab extension.`
  },
  {
    name: 'Michael Zengel',
    image: require('@site/static/img/team/neutral.jpg').default,
    linkedin: 'https://www.linkedin.com/in/michael-zengel-0003aa230/',
    github: 'https://github.com/mrzengel',
    description: `Michael is the main contributor to the Zenodo Jupyterlab extension.`
  },
  {
    name: 'Elena Gazzarrini',
    image: require('@site/static/img/team/elena.jpg').default,
    github: 'https://github.com/egazzarr/',
    linkedin: 'https://www.linkedin.com/in/egazzarrini/',
    description: `Elena holds a MSci degree in Physics from King's College London and is a Fellow in the 
              CERN IT department since 2021. Her work focuses on driving the EU-funded Virtual Research Environment project, a platform to facilitate Particle Physics and Astrophysics analyses. She deploys and maintains a K8s Rucio instance 
              for the project's data management framework, accessible by scientists form the Rucio jupyterlab 
              extension. Her contributions to the Rucio code were therefore mainly targeted at the jupyterlab extension, 
              along with enabling access to Rucio from, CERN's reproducible analysis platform.`,
  },
  {
    name: 'Domenic Gosein',
    image: require('@site/static/img/team/neutral.jpg').default,
    linkedin: 'https://www.linkedin.com/in/goseind/',
    github: 'https://github.com/goseind',
    description: `CERN technical student working on the VRE project. He holds a MSc in computer science at the Technische Hochschule of Mannheim.`    
  },
  {
    name: 'Alba Vendrell',
    image: require('@site/static/img/team/neutral.jpg').default,
    linkedin: 'https://www.linkedin.com/in/alba-v-0092471a0/',
    github: 'https://github.com/albavemo',
    description: `Alba Vendrell is a CERN fellow working on the VRE consolidation and evolution. Alba holds a MSc in computer science at the Universitat Autònoma de Barcelona.`
  },
  {
    name: 'Agisilaos Kounelis',
    image: require('@site/static/img/team/neutral.jpg').default,
    linkedin: 'https://www.linkedin.com/in/kounelisagis/',
    github: 'https://github.com/kounelisagis',
    description: `Agisilaos Kounelis is a CERN summer student working on the VRE project, integrating cloud file fetching and saving functionality.`
  },
  {
    name: 'Rizart Dona',
    image: require('@site/static/img/team/rizart.jpg').default,
    linkedin: 'https://www.linkedin.com/in/rizart-dona/',
    github: 'https://github.com/rizart',
    description: `Rizart Dona is a CERN fellow developing the first prototype of a Data Lake as a Service for the ESCAPE VRE. Rizart holds a MSc in computer science at the University of Athens.`
  },
  {
    name: 'Riccardo di Maria',
    image: require('@site/static/img/team/neutral.jpg').default,
    linkedin: 'https://www.linkedin.com/in/riccardo-di-maria-phd-6967a1160/',
    description: `Riccardo di Maria is a CERN fellow developing the first prototype of a Data Lake as a Service for the ESCAPE VRE. Riccardo holds a PhD in High Energy Physics at the Imperial College London.`
  },
  {
    name: 'Aris Fkiaras',
    image: require('@site/static/img/team/neutral.jpg').default,
    linkedin: 'https://www.linkedin.com/in/aris-fkiaras/',
    description: `Aris Fkiaras is a CERN fellow developing the first prototype of a Data Lake as a Service for the ESCAPE VRE. Aris holds a BSc in Computer Science at the Athens University of Economics and Business .`
  }
];

const TeamPage = () => {
  return (
    <Layout title="Team" description="Meet the team behind the project.">
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>The ESCAPE VRE Team</h1>
          {teamMembers.map((person, idx) => (
            <div key={idx} className={styles.personCard}>
              {person.image && (
                <div className={styles.personImage}>
                  <img src={person.image} alt={`Picture of ${person.name}`} />
                </div>
              )}
              <div className={styles.personInfo}>
                <h2>
                  {person.name}
                  {person.email && (
                    <a href={`mailto:${person.email}`} className="fa fa-envelope" title="Email"></a>
                  )}
                  {person.linkedin && (
                    <a href={person.linkedin} className="fa-brands fa-linkedin" title="LinkedIn" target="_blank" rel="noreferrer"></a>
                  )}
                  {person.github && (
                    <a href={person.github} className="fa-brands fa-github" title="GitHub" target="_blank" rel="noreferrer"></a>
                  )}
                  {person.gitlab && (
                    <a href={person.gitlab} className="fa-brands fa-gitlab" title="GitLab@CERN" target="_blank" rel="noreferrer"></a>
                  )}
                </h2>
                <p>{person.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.container}>
          <h1 className={styles.title}>Former team members</h1>
          {pastMembers.map((person, idx) => (
            <div key={idx} className={styles.personCard}>
              {person.image && (
                <div className={styles.personImage}>
                  <img src={person.image} alt={`Picture of ${person.name}`} />
                </div>
              )}
              <div className={styles.personInfo}>
                <h2>
                  {person.name}
                  {person.email && (
                    <a href={`mailto:${person.email}`} className="fa fa-envelope" title="Email"></a>
                  )}
                  {person.linkedin && (
                    <a href={person.linkedin} className="fa-brands fa-linkedin" title="LinkedIn" target="_blank" rel="noreferrer"></a>
                  )}
                  {person.github && (
                    <a href={person.github} className="fa-brands fa-github" title="GitHub" target="_blank" rel="noreferrer"></a>
                  )}
                  {person.gitlab && (
                    <a href={person.gitlab} className="fa-brands fa-gitlab" title="GitLab@CERN" target="_blank" rel="noreferrer"></a>
                  )}
                </h2>
                <p>{person.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default TeamPage;
