import { getUserData } from '../lib/userDataFetcher';
import { getConsolidatedList } from '../lib/watchlistFetcher';
import { CompareUserLists } from '../lib/compareUserLists';
import WatchList from '../components/watchlist';
import CompareList from '../components/compareList';

export default async function Compare(query) {
  const user1 = await getUserData(query.searchParams.friend1);
  const user2 = await getUserData(query.searchParams.friend2);
  const filmList1 = await getConsolidatedList(user1);
  const filmList2 = await getConsolidatedList(user2);
  const matchList = await CompareUserLists(filmList1, filmList2);

  return (
    <div className="container grid grid-cols-1 lg:grid-cols-12 gap-1 lg:gap-6 mt-[-7rem] md:mt-[-4rem]">
      <div className="col-start-1 col-span-2 pr-3 border-r border-gray-600 hidden lg:block">
        <WatchList
          user={user1}
          filmList={filmList1}
          id="friend1"
        />
      </div>
      <div className="col-start-1 md:col-start-3 md:col-end-11 mt-16 p-8 rounded-md shadow-shorter bg-main">
        <CompareList matchList={matchList} />
      </div>

      <div className="col-end-13 col-span-2 pl-3 border-l border-gray-600 hidden lg:block">
        <WatchList
          user={user2}
          filmList={filmList2}
          id="friend2"
        />
      </div>
    </div>
  );
}
