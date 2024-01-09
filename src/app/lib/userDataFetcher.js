import * as cheerio from 'cheerio';

async function getUserData(user) {
  const res = await fetch(`https://letterboxd.com/${user}/`);
  const htmlString = await res.text();
  const $ = cheerio.load(htmlString);
  const name = $('body').attr('data-owner');
  const avatar = $('.avatar img').attr('src');
  const filmCount = parseInt($('.watchlist-aside .all-link').text());
  const pageCount = Math.floor(filmCount / 28) + 1;

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return { name, avatar, filmCount, pageCount };
}

export { getUserData };
