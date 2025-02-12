/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: "#ceefce",
          100: "#9dde9d",
          200: "#85d685",
          300: "#6cce6c",
          400: "#54c654",
          500: "#3bbd3b",
          600: "#23b523",
          700: "#0aad0a",
          800: "#099c09",
          900: "#088a08",
          950: "#044504",
        },
      },
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
};
