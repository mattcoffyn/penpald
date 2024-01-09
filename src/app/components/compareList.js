import Link from 'next/link';
import Film from './film';

export default async function CompareList(matchList) {
  const list = matchList.matchList;

  return (
    <div className="flex flex-col items-center justify-start">
      <h2 className="font-extrabold text-6xl md:text-7xl mb-8">
        Your Shared Watchlist
      </h2>
      <aside className="flex flex-col items-center justify-start mr-auto md:mr-0 ml-auto p-6 md:p-8 border-4 border-stroke rounded-lg">
        <h3 className="font-display text-3xl">No. of Movies</h3>
        <span className="font-bold text-4xl mdtext-6xl">{list.length}</span>
      </aside>

      {!list.length && (
        <h3 className="mt-10 text-xl md:text-3xl">
          You don&rsquo;t have any shared movies on your watchlists!{' '}
        </h3>
      )}

      {list.map((film, i) => {
        return (
          <Film
            key={i}
            title={film.title}
            releaseDate={film.releaseDate}
            blurb={film.blurb}
            filmId={film.filmId}
            url={film.url}
          />
        );
      })}

      <Link
        className={` bg-secondary border border-gray-200 px-5 py-3 rounded-lg mx-2 font-sans italic mt-8 text-xs md:text-s text-stroke `}
        href={{
          pathname: '/',
        }}
      >
        Pick a new friend
      </Link>
    </div>
  );
}
