// import styles from '../styles/film.module.css';

export default function Film({ title, releaseDate, blurb, id }) {
  return (
    <div
      key={id}
      // className={styles.container}
    >
      <h2>{title}</h2>
      <span>{releaseDate}</span>
      <p>{blurb}</p>
    </div>
  );
}
