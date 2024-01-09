'use server';
import * as cheerio from 'cheerio';

export async function searchUser(prevState, formData) {
  const typedName = formData.get('friend');

  if (!typedName) {
    return {};
  }

  const res = await fetch(`https://letterboxd.com/${typedName}/`);
  const htmlString = await res.text();
  const $ = cheerio.load(htmlString);
  const username = $('body').attr('data-owner');
  const avatar = $('.avatar img').attr('src');

  if ($('body').attr('data-owner')) {
    return {
      message: 'Found them!',
      user: username,
      avatar: avatar,
    };
  } else {
    return { message: 'Could not find that user, try again!' };
  }
}
