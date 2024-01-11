import { getUserData, getConsolidatedList } from '../lib/fetchers';
// import WatchList from '../components/watchlist';
import CompareList from '../components/compareList';
import { Suspense } from 'react';
import Image from 'next/image';

async function Watchlist({ user }) {
  const filmList = await getConsolidatedList(user);

  // Wait for film list
  return (
    <ul className="container mt-6">
      {filmList.map((film) => (
        <li
          key={film.slug}
          className="mt-2"
        >
          <span>{film.title}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function Compare(query) {
  const user1 = await getUserData(query.searchParams.friend1);
  const user2 = await getUserData(query.searchParams.friend2);

  // Wait for users
  return (
    <div className="container grid grid-cols-1 lg:grid-cols-12 gap-1 lg:gap-6 mt-[-7rem] md:mt-[-4rem]">
      <div className="col-start-1 col-span-2 pr-3 border-r border-contessa-700 hidden lg:block">
        <div className="flex flex-col justify-start items-center mt-4">
          <Image
            src={user1.avatar}
            alt={user1.name}
            height={200}
            width={200}
            className="rounded-full"
          />
          <h3 className="font-display text-xl xl:text-2xl mt-4 overflow-hidden">
            {user1.name}
          </h3>
          <span className="font-serif font-bold text-3xl mt-4">
            {user1.filmCount}
          </span>
          <Suspense
            fallback={
              <div className="container mt-6">
                <span className="font-display text-highlight">
                  Fetching watchlist...
                </span>
              </div>
            }
          >
            <Watchlist
              user={user1}
              id="friend1"
            />
          </Suspense>
        </div>
      </div>
      <div className="col-start-1 md:col-start-3 md:col-end-11 mt-16 p-8 rounded-md shadow-shorter bg-contessa-50">
        <Suspense
          fallback={
            <div className="container mt-6 flex justify-center items-center">
              <h3 className="text-highlight mt-10 text-xl md:text-3xl">
                Comparing Watchlists...
              </h3>
            </div>
          }
        >
          <CompareList
            user1={user1}
            user2={user2}
          />
        </Suspense>
      </div>
      <div className="col-end-13 col-span-2 pl-3 border-l border-contessa-700 hidden lg:block">
        <div className="flex flex-col justify-start items-center mt-4">
          <Image
            src={user2.avatar}
            alt={user2.name}
            height={200}
            width={200}
            className="rounded-full"
          />
          <h3 className="font-display text-xl xl:text-2xl mt-4 overflow-hidden">
            {user2.name}
          </h3>
          <span className="font-serif font-bold text-3xl mt-4">
            {user2.filmCount}
          </span>
          <Suspense
            fallback={
              <div className="container mt-6">
                <span className="font-display text-highlight">
                  Fetching watchlist...
                </span>
              </div>
            }
          >
            <Watchlist
              user={user2}
              id="friend1"
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
