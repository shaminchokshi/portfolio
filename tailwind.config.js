/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#161616",
        bg2: "#0c0e11",
        ink: "#f3f1e9",
        inkdim: "#9a9b92",
        inkfaint: "#5c5e57",
        line: "rgba(243,241,233,0.10)",
        signal: "#d4ff45",
        signaldeep: "#a8d400",
        cyan: "#6ee7d8",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "serif"],
        body: ['"Hanken Grotesk"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
