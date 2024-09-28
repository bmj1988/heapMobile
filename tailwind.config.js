/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#fcce00",
          100: "#ebc107",
          200: "#bf9f11",
        },
        white: {
          DEFAULT: "#ededeb",
        },
        mint: {
          DEFAULT: "#50bf88",
          100: "#189456"
        },
        coast: {
          DEFAULT: "#2d83c4"
        },
        flame: {
          DEFAULT: "#dbaf0d"
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        rsthin: ["RobotoSlab-Thin", "sans-serif"],
        rsextralight: ["RobotoSlab-ExtraLight", "sans-serif"],
        rslight: ["RobotoSlab-Light", "sans-serif"],
        rsregular: ["RobotoSlab-Regular", "sans-serif"],
        rsmedium: ["RobotoSlab-Medium", "sans-serif"],
        rssemibold: ["RobotoSlab-SemiBold", "sans-serif"],
        rsbold: ["RobotoSlab-Bold", "sans-serif"],
        rsextrabold: ["RobotoSlab-ExtraBold", "sans-serif"],
        rsblack: ["RobotoSlab-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
