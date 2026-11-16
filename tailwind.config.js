/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Fraunces Variable", "Fraunces", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans Variable", "Plus Jakarta Sans", "system-ui", "sans-serif"]
      },
      colors: {
        forest: {
          950: "#0d1f17", 900: "#153124", 800: "#1e4634", 700: "#275c44", 600: "#327557", 500: "#42916c",
          200: "#c5e2d3", 100: "#e3f1ea", 50: "#f3f9f6"
        },
        parchment: {
          50: "#fcfaf5", 100: "#f6f1e6", 200: "#ebe2cf", 300: "#dccdb0", 700: "#6b5d48", 800: "#4a4031",
          900: "#2c251b", 950: "#1c1711"
        },
        amber: { 500: "#d97706", 600: "#b45309" }
      }
    }
  },
  plugins: []
};
