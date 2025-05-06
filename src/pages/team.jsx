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
    description: `Giovanni Guerrieri is a physicist managing the infrastructure and the development of the ATLAS Open Data project.
    He's part of the CERN-IT department, working on Distributed Data Management systems, Analysis Facilities, and Open Science. 
    He's also involved in various European initiatives, such as the ESCAPE Collaboration, the OSCARS project, and EOSC.
    He holds a PhD in particle physics from the University of Trieste.`,
  },
];

const pastMembers = [
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
    description: ``    
  },
  {
    name: 'Alba Vendrell',
    image: require('@site/static/img/team/neutral.jpg').default,
    linkedin: 'https://www.linkedin.com/in/alba-v-0092471a0/',
    github: 'https://github.com/albavemo',
    description: ``
  },
  {
    name: 'Agisilaos Kounelis',
    image: require('@site/static/img/team/neutral.jpg').default,
    linkedin: 'https://www.linkedin.com/in/kounelisagis/',
    github: 'https://github.com/kounelisagis',
    description: ``
  },
  {
    name: 'Rizart Dona',
    image: require('@site/static/img/team/rizart.jpg').default,
    linkedin: 'https://www.linkedin.com/in/rizart-dona/',
    github: 'https://github.com/rizart',
    description: ``
  },
  {
    name: 'Riccardo di Maria',
    image: require('@site/static/img/team/neutral.jpg').default,
    linkedin: 'https://www.linkedin.com/in/riccardo-di-maria-phd-6967a1160/',
    description: ``
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
