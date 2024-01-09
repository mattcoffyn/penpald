import { getUserData } from '../lib/userDataFetcher';
import { getConsolidatedList } from '../lib/watchlistFetcher';
import { CompareUserLists } from '../lib/compareUserLists';
import WatchList from '../components/watchlist';
import CompareList from '../components/compareList';

export default async function Compare() {
  const user1 = await getUserData('mattcoffyn');
  const user2 = await getUserData('dillhouse');
  const filmList1 = await getConsolidatedList(user1);
  const filmList2 = await getConsolidatedList(user2);
  const matchList = await CompareUserLists(filmList1, filmList2);
  console.log(matchList);
  return (
    <div>
      <WatchList
        user={user1}
        filmList={filmList1}
      />
      <CompareList matchList={matchList} />

      <WatchList
        user={user2}
        filmList={filmList2}
      />
    </div>
  );
}
