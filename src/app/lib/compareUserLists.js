import * as cheerio from 'cheerio';

async function CompareUserLists(list1, list2) {
  let matchList = [];
  list1.forEach(async (film) => {
    const match = list2.find((film2) => film2.slug == film.slug);
    if (match) {
      const slug = match.slug;
      const res = await fetch(`https://letterboxd.com/film/${slug}/`);
      const htmlString = await res.text();
      const $ = cheerio.load(htmlString);
      const title = $('.headline-1').text();
      const releaseDate = $('#featured-film-header p .number').text();
      const blurb = $('.review .truncate p').text();
      const filmId = $('body').attr('data-tmdb-id');
      const url = `https://letterboxd.com/film/${slug}/`;
      const deets = {
        title: title,
        releaseDate: releaseDate,
        blurb: blurb,
        filmId: filmId,
        url: url,
      };

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      matchList.push(deets);
    }
  });

  return matchList;
}

export { CompareUserLists };
