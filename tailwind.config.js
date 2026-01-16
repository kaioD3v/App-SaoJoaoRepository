/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        "montserrat-bold": ["Montserrat-Bold"],
        "montserrat-extrabold": ["Montserrat-ExtraBold"],
        "montserrat-thin": ["Montserrat-Thin"],
      },
    },
  },
  plugins: [],
};
