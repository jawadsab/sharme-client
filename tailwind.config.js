module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
    colors: {
      mainBg:"#f8f9fa",
      primaryBg: "#fdfffc",
      secondaryBg1:"#ff5d8f",

      mainText:"#22223b",
      primaryText:"#fdfffc",
      secondaryText1:"#000000"

    },
    extend: {},
  },
  plugins: [],
};
