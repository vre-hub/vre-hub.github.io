import styles from './LatestNews.module.css';

const newsItems = [
  {
    date: 'April 10th 2025',
    description: 'Xavier presents the VRE at the JENA Meeting',
    links: [{ text: 'event', url: 'https://indico.global/event/5574/' }, { text: 'slides', url: 'https://indico.global/event/5574/contributions/44169/' }],
    iconType: 'person-chalkboard',
  },
  {
    date: 'March 17th-18th 2025',
    description: 'The VRE start its journey into EOSC',
    links: [{ text: 'event', url: 'https://eosc.eu/news/2025/04/the-eosc-federations-build-up-phase-is-underway/' }],
    iconType: 'calendar-days',
  },
  {
    date: 'February 25th 2025',
    description: 'Giovanni presents the VRE as part of CERN\'s analysis platforms at the (Re)interpretation Forum',
    links: [{ text: 'event', url: 'https://indico.cern.ch/event/1466101/' }, { text: 'slides', url: 'https://indico.cern.ch/event/1466101/contributions/6363705/' }],
    iconType: 'person-chalkboard',
  },
  {
    date: 'October 19th-24th 2024',
    description: 'Enrique presents the VRE at CHEP 2024',
    links: [{ text: 'slides', url: 'https://indico.cern.ch/event/1338689/contributions/6010696/' }, { text: 'proceedings', url: 'https://arxiv.org/abs/2503.02483/' }],
    iconType: 'person-chalkboard',
  },
  {
    date: 'Data discovery, analysis and reproducibility in Virtual Research Environments ', // this is what I would see indented below its parent contribution. NOT IMPORTANT !
    description: 'Garcia-Garcia, E. Giovanni, G. et al.',
    links: [{ text: 'CHEP 2024 proceeding', url: 'https://arxiv.org/abs/2503.02483/' }],
    iconType: 'file',
  },
  {
    date: 'February 5th-6th 2024',
    description: 'The VRE is presented at the AstroORDAS workshop',
    links: [{ text: 'event', url: 'https://indico.global/event/9331/' }, { text: 'slides', url: 'https://indico.global/event/9331/contributions/90757/' }],
    iconType: 'person-chalkboard',
  },
  {
    date: 'May 8th-12th 2023',
    description: 'Elena gives a Plenary Talk at CHEP 2023 on the VRE',
    links: [{ text: 'event', url: 'https://indico.jlab.org/event/459/' }, { text: 'slides', url: 'https://indico.jlab.org/event/459/contributions/11671/' }],
    iconType: 'person-chalkboard',
  },
  {
    date: 'The Virtual Research Environment: A multi-science analysis platform',
    description: 'Gazzarrini, E., Garcia Garcia, E., Gosein, D., and Espinal, X. EPJ Web of Conferences 295, 08023 (2024)',
    links: [{ text: 'CHEP 2023 proceeding', url: 'https://doi.org/10.1051/epjconf/202429508023/' }],
    iconType: 'file',
  },
  {
    date: 'July 10th-13th 2023',
    description: 'The VRE is presented at the IHDEA Cloud Meeting',
    links: [{ text: 'event', url: 'https://indico.obspm.fr/event/1714/' }, { text: 'contribution', url: 'https://indico.obspm.fr/event/1714/contributions/1004/' }],
    iconType: 'person-chalkboard',
  },
  {
    date: 'March 3th 2023',
    description: 'The Virtual Research Enviroment is presentend on a CERN IT Technical Forum (ITTF) session',
    links: [{ text: 'Slides and recording', url: 'https://indico.cern.ch/event/1230107/' }],
    iconType: 'person-chalkboard'
  },
  {
    date: 'October 23th-28th 2022',
    description: 'Elena presents the VRE at the ACAT 2022 workshop',
    links: [{ text: 'event', url: 'https://indico.cern.ch/event/1106990/' }, { text: 'slides', url: 'https://indico.cern.ch/event/1106990/contributions/4991200/' }],
    iconType: 'person-chalkboard',
  },
  {
    date: 'The Virtual Research Environment: towards a comprehensive analysis platform',
    description: 'Gazzarrini, E., Garcia, E., Gosein, D., Vendrell Moya, A., Kounelis, A., and Espinal, X.',
    links: [{ text: 'ACAT 2022 proceeding', url: 'https://indico.cern.ch/event/1106990/papers/4991200/files/12795-The_VRE___ACAT22_Proceedings.pdf' }],
    iconType: 'file',
  },
  {
    date: 'October 25th-26th 2022',
    description: 'The VRE is presented at the ESCAPE for the Future meeting',
    links: [{ text: 'event', url: 'https://projectescape.eu/agenda-escape-future#overlay-context=' }, { text: 'slides', url: 'https://projectescape.eu/sites/default/files/1.EnriqueGarcia_VRE_ESCAPE-Bruxels_Nov2022_v2.pdf' }],
    iconType: 'person-chalkboard',
  }
  // Add more... (categories: newspaper, person-chalkboard, etc.)
];

export default function LatestNews() {
  return (
    <section className={styles.newsSection}>
      <div></div>
      <div className={styles.timeline}>
        {newsItems.map((item) => (
          <div className={styles.timelineItem} key={`${item.date}-${item.description}`}>
            <div className={styles.icon}>
              <i className={`fa-solid fa-${item.iconType}`} title={item.iconType}></i>
            </div>
            <div>
              <strong>{item.date}</strong>: {item.description}{' '}
              {item.links.map((link) => (
                <a key={link.url} href={link.url} className={styles.link} target="_blank" rel="noopener noreferrer">
                  [{link.text}]
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
