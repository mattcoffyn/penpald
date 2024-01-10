'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { searchUser } from './lib/searchUser';
import { getListsAndCompare } from './lib/fetchers';
import { Suspense, useEffect, useState } from 'react';

const initialState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="bg-tertiary border border-gray-300 px-5 py-3 rounded-lg font-sans font-bold uppercase mt-2 md:mt-8"
    >
      Search User
    </button>
  );
}
function ResetButton() {
  return (
    <button
      type="submit"
      className="bg-secondary border border-gray-300 px-5 py-3 rounded-lg font-sans italic mt-8 text-xs md:text-s"
    >
      Choose a different friend
    </button>
  );
}

function RandomButton({ disabled }) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="bg-tertiary border border-gray-200 px-5 py-3 rounded-lg font-sans font-bold uppercase mt-8 mx-2 disabled:bg-slate-100 disabled:text-slate-500"
    >
      Roll the dice!
    </button>
  );
}

export default function Home() {
  const [friend1, formAction] = useFormState(searchUser, initialState);
  const [friend2, formAction2] = useFormState(searchUser, initialState);

  return (
    <>
      <section className="flex flex-col items-center w-10/12 max-w-screen-2xl  p-10 rounded-md shadow-shorter bg-main">
        <h3 className="font-serif text-xl lg:text-2xl mb-4">
          Compare your{' '}
          <a
            href="https://letterboxd.com"
            className="font-display text-stroke"
          >
            letterboxd
          </a>{' '}
          watchlist with a friend&rsquo;s.
        </h3>
        <h3 className="font-serif text-xl lg:text-2xl">
          Find films you <span className="font-bold">both</span> want to watch.
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 container mt-8">
          <form
            action={formAction}
            className="container flex flex-col items-center justify-start mb-8 md:mb-4"
          >
            {!friend1.user ? (
              <>
                <div className="container flex flex-col items-center justify-start p-6 mb-4 relative">
                  <label
                    htmlFor="friend1"
                    className="font-display text-4xl mb-8"
                  >
                    Friend 1
                  </label>
                  <p className="text-red text-s italic absolute bottom-0">
                    {friend1.message}
                  </p>
                  <input
                    type="text"
                    id="friend1"
                    name="friend"
                    placeholder="Search username..."
                    className="border border-gray-600 p-2 mt-4 mb-2 text-xl rounded-md"
                    required
                  />
                </div>
                <SubmitButton />
              </>
            ) : (
              <div className="container flex flex-col items-center justify-start">
                <div className="container flex flex-col items-center justify-start border p-6">
                  <Suspense
                    fallback={
                      <h3 className="text-highlight mt-10 text-xl md:text-3xl">
                        Finding User...
                      </h3>
                    }
                  >
                    <h4 className="font-display text-4xl mb-4">
                      {friend1?.user}
                    </h4>
                    <Image
                      src={friend1?.avatar}
                      width={100}
                      height={100}
                      alt={friend1.user}
                      className="rounded-full"
                    />
                    <p className="mt-3">
                      Films in Watchlist:{' '}
                      <span className="font-display text-xl ml-2">
                        {friend1.count}
                      </span>
                    </p>
                    <ResetButton />
                  </Suspense>
                </div>
              </div>
            )}
          </form>

          <form
            action={formAction2}
            className="container flex flex-col items-center justify-start"
          >
            {!friend2.user ? (
              <>
                <div className="container flex flex-col items-center justify-start p-6 mb-4 relative">
                  <label
                    htmlFor="friend2"
                    className="font-display text-4xl mb-8"
                  >
                    Friend 2
                  </label>
                  <p className="text-red text-s italic absolute bottom-0">
                    {friend2.message}
                  </p>
                  <input
                    type="text"
                    id="friend2"
                    name="friend"
                    placeholder="Search username..."
                    className="border border-gray-600 p-2 mt-4 mb-2 text-xl rounded-md"
                    required
                  />
                </div>
                <SubmitButton />
              </>
            ) : (
              <div className="container flex flex-col items-center justify-start">
                <div className="container flex flex-col items-center justify-start border p-6">
                  <h4 className="font-display text-4xl mb-4">
                    {friend2?.user}
                  </h4>
                  <Image
                    src={friend2?.avatar}
                    width={100}
                    height={100}
                    alt={friend2.user}
                    className="rounded-full"
                  />
                  <p className="mt-3">
                    Films in Watchlist:{' '}
                    <span className="font-display text-xl ml-2">
                      {friend2.count}
                    </span>
                  </p>
                  <ResetButton />
                </div>
              </div>
            )}
          </form>
          <form className="container col-span-full flex flex-col items-center justify-center">
            <Link
              className={` border border-gray-200 px-5 py-3 rounded-lg font-sans font-bold uppercase  mt-8 mx-2 ${
                !friend1?.user || !friend2?.user
                  ? 'pointer-events-none bg-slate-100 text-slate-400'
                  : 'bg-tertiary text-stroke'
              }`}
              aria-disabled={!friend1?.user || !friend2?.user}
              tabIndex={!friend1?.user || !friend2?.user ? -1 : undefined}
              href={{
                pathname: '/compare',
                query: { friend1: friend1?.user, friend2: friend2?.user },
              }}
            >
              Show the Films
            </Link>
            {/* <RandomButton disabled={!friend1.user || !friend2.user} /> */}
          </form>
        </div>
      </section>
    </>
  );
}
