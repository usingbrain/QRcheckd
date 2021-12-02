const fractionWidths = require('tailwindcss-fraction-widths');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      green: {
        light: '#89D6CE',
        DEFAULT: '#00A393',
        xlight: '#DBF9F6',
      },
      red: {
        DEFAULT: '#FF0000',
      },
      turqoise: {
        DEFAULT: '#69FFF1',
      },
      white: {
        DEFAULT: '#FFFFFF',
      },
      grey: {
        DEFAULT: '#535353',
      },
      black: {
        DEFAULT: '#000000',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        fira: ['Fira Sans', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      backgroundOpacity: {
        60: '0.6',
        30: '0.3',
        15: '0.15',
      },
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
      height: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
    },
    screens: {
      tablet: '272px',
      xs: '440px',
      sm: '650px',
      md: '790px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1350px',
      '3xl': '1530px',
      '4xl': '1800px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [fractionWidths(16), fractionWidths([2, 7])],
};
