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
        pthin: ["RobotoSlab-Thin", "sans-serif"],
        pextralight: ["RobotoSlab-ExtraLight", "sans-serif"],
        plight: ["RobotoSlab-Light", "sans-serif"],
        pregular: ["RobotoSlab-Regular", "sans-serif"],
        pmedium: ["RobotoSlab-Medium", "sans-serif"],
        psemibold: ["RobotoSlab-SemiBold", "sans-serif"],
        pbold: ["RobotoSlab-Bold", "sans-serif"],
        pextrabold: ["RobotoSlab-ExtraBold", "sans-serif"],
        pblack: ["RobotoSlab-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
