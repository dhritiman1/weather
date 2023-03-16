module.exports = {
  content: ["./src/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "light-grey": "#E5EEE5",
        purple: "#7652C6",
      },
      backgroundImage: {
        mainbg: "url('/src/assets/bg.jpg')",
      },
      fontFamily: {
        montserrat: ["montserrat"],
      },
      width: {
        "9/10": "calc(100vw - 180px)",
        "9.5/10": "calc(100vw - 80px)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
