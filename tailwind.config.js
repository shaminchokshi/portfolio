/** @format */

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    listStyleType: {
      square: "square",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
      55: "55px",
    },
    opacity: {
      20: "20%",
    },
    extend: {
      fontFamily: {
        Comfortaa: ["Comfortaa"],
        sans: ["DM Sans"],
      },
      colors: {
        black: {
          DEFAULT: "#090915",
        },
        yellow: {
          100: "#F1C34E",
        },
      },
      width: {
        550: "500px",
      },
      height: {
        550: "500px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
