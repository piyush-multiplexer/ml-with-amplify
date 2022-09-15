/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      primary: "#5b21b6",
      secondary: "#ede9fe",
      tertary: "#a78bfa",
      white: "#f5f5f5",
    },
  },
  plugins: [],
};
