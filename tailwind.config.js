/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{html,js,jsx,ts,tsx}'],
  safelist: ['alert-info', 'alert-success', 'alert-error', 'alert-warning', 'alert-error'],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: 'winter',
        mytheme: {
          primary: '#66CC8A',
        },
      },
    ],
  },
};
