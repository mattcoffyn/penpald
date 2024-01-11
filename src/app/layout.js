import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';
import { NavigationEvents } from './components/navigationEvents';
import MainHeader from './components/mainHeader';
import localFont from 'next/font/local';

import './globals.css';

const playfairDisplay = localFont({
  src: './fonts/PlayfairDisplay-VariableFont_wght.ttf',
  display: 'swap',
  variable: '--font-playfairdisplay',
});

const playfairDisplayItalic = localFont({
  src: './fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf',
  display: 'swap',
  variable: '--font-playfairdisplayitalic',
});

const alice = localFont({
  src: './fonts/Alice-Regular.ttf',
  display: 'swap',
  variable: '--font-alice',
});

export const metadata = {
  title: 'penpald',
  description:
    'Compare letterboxd watchlists and find movies to watch together.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${playfairDisplayItalic.variable} ${alice.variable}`}
      >
        <main className="flex min-h-screen flex-col items-center p-2 pt-16 ">
          <MainHeader />

          {children}
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
