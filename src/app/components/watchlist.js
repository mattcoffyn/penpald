import Image from 'next/image';
import { getConsolidatedList } from '../lib/watchlistFetcher';
import { getUserData } from '../lib/userDataFetcher';

const FilmItem = (title, id) => (
  <li
    key={id}
    className="mt-2"
  >
    <span>{title}</span>
  </li>
);

export default async function Watchlist({ user, filmList }) {
  const films = filmList.map((film) => FilmItem(film.title, film.id));

  return (
    <div className="flex flex-col justify-start items-center mt-4">
      <Image
        src={user.avatar}
        alt={user.name}
        height={200}
        width={200}
        className="rounded-full"
      />
      <h3 className="font-display text-xl xl:text-2xl mt-4 overflow-hidden">
        {user.name}
      </h3>
      <span className="font-serif font-bold text-3xl mt-4">
        {filmList.length}
      </span>
      <ul className="container mt-6">{films}</ul>
    </div>
  );
}
