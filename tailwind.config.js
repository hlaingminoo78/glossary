/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "8per": "8%",
        "10per": "10%",
        "15per": "15%",
        "67per": "67%",
        "62per": "62%",
      },
      colors: {
        primary: "#3354F8",
        secondary: "#2C2C2C",
      },
      fontFamily: {
        kantumruy: ["Kantumruy Pro", "sans-serif"],
        padauk: ["Padauk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
