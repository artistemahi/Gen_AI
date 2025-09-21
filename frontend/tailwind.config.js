/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust based on your file structure
  ],
  theme: {
    extend: {
      fontFamily: {
        permanent: ["Permanent Marker", "cursive"],
      },
    },
  },
  plugins: [],
};
