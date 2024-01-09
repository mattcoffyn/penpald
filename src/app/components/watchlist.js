import Image from 'next/image';
import { getConsolidatedList } from '../lib/watchlistFetcher';
import { getUserData } from '../lib/userDataFetcher';

import styles from '../styles/user.module.css';
const FilmItem = (title, id) => (
  <li key={id}>
    <span>{title}</span>
  </li>
);

export default async function Watchlist({ user, filmList }) {
  const films = filmList.map((film) => FilmItem(film.title, film.id));

  return (
    <div className={styles.container}>
      <Image
        src={user.avatar}
        alt={user.name}
        height={500}
        width={500}
      />
      <h3>{user.name}</h3>
      <span>{filmList.length}</span>
      <ul>{films}</ul>
    </div>
  );
}
