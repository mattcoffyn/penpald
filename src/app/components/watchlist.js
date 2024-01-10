import Image from 'next/image';
import { getConsolidatedList } from '../lib/fetchers';

async function userWatchlist({ user }) {}

async function Watchlist({ user }) {
  const filmList = await getConsolidatedList(user);
  return (
    <ul className="container mt-6">
      {filmList.map((film, i) => (
        <li
          key={i}
          className="mt-2"
        >
          <span>{film.title}</span>
        </li>
      ))}
    </ul>
  );
}
