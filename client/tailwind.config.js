/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    container: {
      center: true,
    },
    screens: {
      mobile: { max: '480px' },
    },
    backgroundImage: {
      'delete-img': "url('/src/images/delete-btn.svg')",
      'correct-img': "url('/src/images/pencil-btn.svg')",
    },
  },
  plugins: [],
});
