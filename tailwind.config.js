/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vilagos: "#db2d2a",
        sotet: "#2a2d33",
        standard: "#7ca9f2",
        premium: "#bf77f2",
        vip: "#e6b120",
        lila: "#6d0466",
      },
      fontFamily: {
        fancy: ['"Fascinate Inline"', 'cursive'],
        nicer: ['"Revalia"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}