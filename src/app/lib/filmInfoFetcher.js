import * as cheerio from 'cheerio';

async function getFilmDetails(slug) {
  const res = await fetch(`https://letterboxd.com/film/${slug}/`);
  const htmlString = await res.text();
  const $ = cheerio.load(htmlString);
  const title = $('.headline-1').text();
  const releaseDate = $('#featured-film-header p .number').text();
  const blurb = $('.review .truncate p').text();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return { title: title, releaseDate: releaseDate, blurb: blurb };
}

export { getFilmDetails };
