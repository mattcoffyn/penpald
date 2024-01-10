import * as cheerio from 'cheerio';

// Gets Film Posters from TMDB
async function getPosters(filmId) {
  const bearerToken = process.env.TMDB_API_READ_ACCESS_TOKEN;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
  };
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${filmId}?language=en-US`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
  const poster = await response.poster_path;
  return poster;
}

// Gets user data
async function getUserData(user) {
  const res = await fetch(`https://letterboxd.com/${user}/`);
  const htmlString = await res.text();
  const $ = cheerio.load(htmlString);
  // const name = user;
  const name = $('body').attr('data-owner');
  const avatar = $('.avatar img').attr('src');
  const filmCount = parseInt($('.watchlist-aside .all-link').text());
  const pageCount = Math.floor(filmCount / 28) + 1;

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return { name, avatar, filmCount, pageCount };
}

// Gets film details from individual pages
async function getFilmDetails(slug) {
  const res = await fetch(`https://letterboxd.com/film/${slug}/`);
  const htmlString = await res.text();
  const $ = cheerio.load(htmlString);
  const filmId = $('body').attr('data-tmdb-id');
  const releaseDate =
    $('#featured-film-header p .number').text() || 'No Release Date';
  const blurb = $('.review .truncate p').text();
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return { slug: slug, filmId: filmId, releaseDate: releaseDate, blurb: blurb };
}

// Fetches watchlist
async function getScrapedFilms(name, currentPage) {
  const res = await fetch(
    `https://letterboxd.com/${name}/watchlist/page/${currentPage}/`
  );
  const htmlString = await res.text();
  let $ = cheerio.load(htmlString);
  const searchContext = `.poster-list li`;
  const count = $(searchContext).length;
  let filmList = [];
  for (let i = 0; i < count; i++) {
    filmList.push({});
  }
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

// Consolidates User's watchlist if multiple pages
async function getConsolidatedList(user) {
  let filmList = [];
  for (let i = 0; i < user.pageCount; i++) {
    const currentPage = i + 1;
    const currentFilmList = await getScrapedFilms(user.name, currentPage);
    filmList.push(...currentFilmList);
  }
  return filmList;
}

// Compare watchlists and find matches
async function findMatches(user1, user2) {
  const list1 = await getConsolidatedList(user1);
  const list2 = await getConsolidatedList(user2);

  let matchList = [];
  list1.map((film) => {
    const match = list2.find((film2) => film2.slug == film.slug);
    if (match) {
      matchList.push(match);
    }
  });

  return matchList;
}

export {
  getUserData,
  findMatches,
  getConsolidatedList,
  getFilmDetails,
  getPosters,
};

// ******** Returned data breakdown ********

// ******** getConsolidatedList
// title
// slug

// ******** getFilmDetails
// filmId
// releaseDate
// blurb

// ******** getPosters
// poster (slug)
