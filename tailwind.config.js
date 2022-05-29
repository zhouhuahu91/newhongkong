const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [`Poppins`, ...defaultTheme.fontFamily.sans],
      },
      colors: {
        fb: "#3b5998",
        main: "#e76f51",
      },
    },
  },
  plugins: [],
};
