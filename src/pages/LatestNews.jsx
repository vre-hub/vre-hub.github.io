import styles from './LatestNews.module.css';

const newsItems = [
  {
    date: 'April 10th 2025',
    description: 'Xavier presents the VRE at the JENA Meeting',
    links: [{ text: 'event', url: 'https://indico.global/event/5574/' }, { text: 'slides', url: 'https://indico.global/event/5574/contributions/44169/' }],
    iconType: 'person-chalkboard',
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
    date: 'May 6th 2024',
    description: 'Gazzarrini, E., Garcia, E., Gosein, D., and Espinal, X., “The Virtual Research Environment: towards a comprehensive analysis platform”',
    links: [{ text: 'paper', url: 'https://arxiv.org/abs/2503.02483' }],
    iconType: 'newspaper',
  },
  // Add more... (categories: newspaper, person-chalkboard, etc.)
];

export default function LatestNews() {
  return (
    <section className={styles.newsSection}>
      <div></div>
      <div className={styles.timeline}>
        {newsItems.map((item, idx) => (
          <div className={styles.timelineItem} key={idx}>
            <div className={styles.icon}>
              <i className={`fa-solid fa-${item.iconType}`} title={item.iconType}></i>
            </div>
            <div>
              <strong>{item.date}</strong>: {item.description}{' '}
              {item.links.map((link, i) => (
                <a key={i} href={link.url} className={styles.link} target="_blank" rel="noopener noreferrer">
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
