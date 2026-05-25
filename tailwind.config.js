/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f5f8ff",
        ink: "#eaf1ff",
        coral: "#9dbcf4",
        periwinkle: "#4d588f",
        parchment: "#0f1d38",
        navy: "#101a33",
        midnight: "#07111f",
        mist: "#d8e6ff",
        slateblue: "#6f83a8",
        panel: "#142340",
        line: "#2a3b62",
      },
      fontFamily: {
        display: ['"Archivo Black"', "sans-serif"],
        sans: ['"Space Grotesk"', "sans-serif"],
      },
      boxShadow: {
        premium: "0 28px 90px rgba(5, 13, 31, 0.45)",
        soft: "0 18px 55px rgba(5, 13, 31, 0.34)",
        glow: "0 0 34px rgba(77, 88, 143, 0.22)",
      },
    },
  },
  plugins: [],
};
