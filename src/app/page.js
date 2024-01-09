'use client';
import Image from 'next/image';
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import MainHeader from './components/mainHeader';
import { searchUser } from './lib/searchUser';

const initialState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="bg-tertiary border border-gray-300 px-5 py-3 rounded-lg font-sans font-extrabold mt-8"
    >
      Search Letterboxd
    </button>
  );
}
function ResetButton() {
  return (
    <button
      type="submit"
      className="bg-secondary border border-gray-300 px-5 py-3 rounded-lg font-sans italic mt-8 text-s"
    >
      Choose a different friend
    </button>
  );
}
function CompareButton({ disabled }) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="bg-tertiary border border-gray-200 px-5 py-3 rounded-lg font-sans font-bold uppercase mt-8 disabled:bg-slate-100 disabled:text-slate-500"
    >
      Find us a film!
    </button>
  );
}

export default function Home() {
  const [friend1, formAction] = useFormState(searchUser, initialState);
  const [friend2, formAction2] = useFormState(searchUser, initialState);

  return (
    <>
      <MainHeader />
      <section className="flex flex-col items-center w-10/12 max-w-screen-2xl mt-16 p-8 rounded-md shadow-shorter bg-main">
        <h3 className="font-serif text-3xl mb-8">
          Compare your{' '}
          <a
            href="https://letterboxd.com"
            className="font-display text-stroke"
          >
            letterboxd
          </a>{' '}
          watchlist with a friend&rsquo;s.
        </h3>
        <h3 className="font-serif text-3xl">
          Find films you <span className="font-bold">both</span> want to watch.
        </h3>
        <div className="grid grid-cols-2 container mt-8">
          <form
            action={formAction}
            className="container flex flex-col items-center justify-start"
          >
            {!friend1.user ? (
              <>
                <div className="container flex flex-col items-center justify-start p-6 mb-4">
                  <label
                    htmlFor="friend1"
                    className="font-display text-4xl mb-8"
                  >
                    Friend 1
                  </label>
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
                  <h4 className="font-display text-4xl mb-4">
                    {friend1?.user}
                  </h4>
                  <Image
                    src={friend1?.avatar}
                    width={100}
                    height={100}
                    alt={friend1.user}
                  />
                </div>
                <ResetButton />
              </div>
            )}
          </form>

          <form
            action={formAction2}
            className="container flex flex-col items-center justify-start"
          >
            {!friend2.user ? (
              <>
                <div className="container flex flex-col items-center justify-start p-6 mb-4">
                  <label
                    htmlFor="friend2"
                    className="font-display text-4xl mb-8"
                  >
                    Friend 2
                  </label>
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
                  />
                </div>
                <ResetButton />
              </div>
            )}
          </form>
          <div className="container col-span-full flex items-center justify-center">
            <CompareButton disabled={!friend1.user || !friend2.user} />
          </div>
        </div>
      </section>
    </>
  );
}
