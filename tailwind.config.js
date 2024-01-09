/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#faeee7',
        stroke: '#33272a',
        strokelight: 'rgba(51 39 42 0.7)',
        main: '#fffffe',
        highlight: '#ff8ba7',
        secondary: '#ffc6c7',
        tertiary: '#c3f0ca',
        extra: '#D44147',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        serif: [
          'var(--font-playfairdisplay)',
          ...defaultTheme.fontFamily.serif,
        ],
        display: [
          'var(--font-playfairdisplayitalic)',
          ...defaultTheme.fontFamily.serif,
        ],
        body: ['var(--font-alice)', ...defaultTheme.fontFamily.serif],
      },
      boxShadow: {
        better4:
          '0 1px 1px rgba(0,0,0,0.15), 0 2px 2px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.15);',
        shorter:
          '0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 6px 8px rgba(0,0,0,0.11), 0 8px 16px rgba(0,0,0,0.11);',
      },
    },
  },
  plugins: [],
};
