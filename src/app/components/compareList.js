import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';

import { findMatches, getFilmDetails, getPosters } from '../lib/fetchers';
import { POSTER_URL, LETTERBOXD_FILM } from '../lib/config';

async function FilmDetails({ film, i }) {
  const details = await getFilmDetails(film.slug);
  const poster = await getPosters(details.filmId);

  return (
    <a
      target="_blank"
      href={`${LETTERBOXD_FILM}${film.slug}`}
      className=" text-stroke"
    >
      <div className="w-full mt-8 p-6">
        <div className="w-full flex flex-row justify-start items-start">
          <Image
            src={`${POSTER_URL}${poster}`}
            width={100}
            height={200}
            alt={film.title}
          />
          <div className="ml-4">
            <h2 className="font-display text-4xl mb-2">{film.title}</h2>
            <span className="font-bold text-2xl mb-2">
              {details.releaseDate}
            </span>
            <p className="text-lg hidden lg:block">{details.blurb}</p>
          </div>
        </div>
        <p className="text-lg md:text-2xl mt-2 md:mt-4 block lg:hidden">
          {details.blurb}
        </p>
      </div>
    </a>
  );
}

export default async function CompareList({ user1, user2 }) {
  const matchedList = await findMatches(user1, user2);

  return (
    <div className="flex flex-col items-center justify-start">
      <h2 className="font-extrabold text-6xl md:text-7xl mb-8">
        Your Shared Watchlist
      </h2>

      <aside className="flex flex-col items-center justify-start mr-auto md:mr-0 ml-auto p-6 md:p-8 border-4 border-stroke rounded-lg">
        <h3 className="font-display text-3xl">No. of Movies</h3>
        <span className="font-bold text-4xl mdtext-6xl">
          {matchedList.length}
        </span>
      </aside>

      {!matchedList.length && (
        <>
          <h3 className="mt-10 text-xl md:text-3xl">
            You don&rsquo;t have any shared movies on your watchlists!{' '}
          </h3>
          <h3 className="mt-10 text-xl md:text-3xl">
            Try refreshing the page. Sorry.
          </h3>
        </>
      )}

      <div className="container">
        <Suspense
          fallback={
            <div className="container flex justify-center items-center">
              <h3 className="text-highlight mt-10 text-xl md:text-3xl">
                Getting details...
              </h3>
            </div>
          }
        >
          {matchedList?.map((film, i) => {
            return (
              <FilmDetails
                film={film}
                key={i}
              />
            );
          })}
          <Link
            className={` bg-secondary border border-gray-200 px-5 py-3 rounded-lg mx-2 font-sans italic mt-10 text-xs md:text-s text-stroke `}
            href={{
              pathname: '/',
            }}
          >
            Pick a new friend
          </Link>
        </Suspense>
      </div>
    </div>
  );
}
