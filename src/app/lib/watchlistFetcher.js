import * as cheerio from 'cheerio';
import { getUserData } from './userDataFetcher';

async function getScrapedFilms(name, currentPage) {
  const res = await fetch(
    `https://letterboxd.com/${name}/watchlist/page/${currentPage}/`
  );
  const htmlString = await res.text();
  const $ = cheerio.load(htmlString);
  const searchContext = `.poster-list li`;
  const count = $(searchContext).length;
  let filmList = [];

  for (let i = 0; i < count; i++) {
    filmList.push({});
  }

  $('.poster-list li').each(function (i, _elem) {
    filmList[i].id = i + 1;
  });
  $('.poster-list li div img').each(function (i, elem) {
    filmList[i].title = $(elem).attr('alt');
  });
  $('.poster-list li div').each(function (i, elem) {
    filmList[i].slug = $(elem).attr('data-film-slug');
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return filmList;
}

async function getConsolidatedList(user) {
  let filmList = [];
  for (let i = 0; i < user.pageCount; i++) {
    const currentPage = i + 1;
    const currentFilmList = await getScrapedFilms(user.name, currentPage);
    filmList.push(...currentFilmList);
  }

  return filmList;
}

export { getConsolidatedList };
