import Image from 'next/image';

export default async function Film({
  title,
  releaseDate,
  blurb,
  filmId,

  id,
}) {
  // const poster = await getPosters(filmId);

  return (
    <div
      key={id}
      className="w-full mt-8 p-6"
    >
      <div className="w-full flex flex-row justify-start items-start">
        {/* <Image
          src={posterUrl}
          width="100"
          height="200"
          alt={title}
        /> */}
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
