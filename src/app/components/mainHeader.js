import Link from 'next/link';

export default async function MainHeader() {
  return (
    <div className="flex flex-col items-center container pb-16 border-b border-contessa-700 mb-16 w-full">
      <Link
        href={{
          pathname: '/',
        }}
      >
        <h1 className="font-display text-5xl md:text-9xl text-stroke">
          PENPALD
        </h1>
      </Link>
      <h2 className="font-body mt-4 text-md md:text-xl text-stroke/65 ">
        Just pick a ******* film already...
      </h2>
    </div>
  );
}
