import Image from 'next/image';
import { EMPTY_MOVIE_URL, IMAGE_URL } from '../lib/config';
import Link from 'next/link';

async function getPosters(filmId) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2IzZDk5NTI0MGFjYzY2MmYxMDU5N2ZiM2Q1ZmNlMyIsInN1YiI6IjYyMDQzOGI3ZTJiY2E4MDA2YWUxNzI2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TkPpgUbdq2XaPJKWLQU1tgVXI2_WeJETl4hRIXIA2BY',
    },
  };
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${filmId}?language=en-US`,
    options
  )
    .then((response) => response.json())
    // .then((response) => console.log(response))
    .catch((err) => console.error(err));
  const poster = response.poster_path;

  return poster;
}

export default async function Film({
  title,
  releaseDate,
  blurb,
  filmId,
  url,
  id,
}) {
  const poster = await getPosters(filmId);
  const posterUrl = `${IMAGE_URL}${poster}`;
  console.log(url);
  return (
    <div
      key={id}
      className="w-full mt-8 p-6"
    >
      <div className="w-full flex flex-row justify-start items-start">
        <Image
          src={posterUrl}
          width="100"
          height="200"
          alt={title}
        />
        <div className="ml-4">
          <h2 className="font-display text-4xl mb-2">{title}</h2>
          <span className="font-bold text-2xl mb-2">{releaseDate}</span>
          <p className="text-lg hidden lg:block">{blurb}</p>
        </div>
      </div>
      <p className="text-lg md:text-2xl mt-2 md:mt-4 block lg:hidden">
        {blurb}
      </p>
    </div>
  );
}
