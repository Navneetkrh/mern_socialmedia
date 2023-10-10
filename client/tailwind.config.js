/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
        colors: {
            'blackish': '#1e1e1e',
          'grayish': '#2E2F31',
          'greenish': '#9EBC87',
          'yellowish': '#F5DD5F',
          'reddish': '#A24545',
          'bluish': '#45A29E',
          'pinkish': '#A24599',
          'lbluish': '#C2D9E3',
        }
    },
  },
  plugins: [],
}

