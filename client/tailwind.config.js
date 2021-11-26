module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      green: {
        DEFAULT: '#00A393'
      },
      turqoise: {
        DEFAULT: '#69FFF1'
      },
      white: {
        DEFAULT: '#FFFBFC'
      },
      grey: {
        DEFAULT: '#535353'
      },
      black: {
        DEFAULT: '#010400'
      }
    },
    extend: {
      backgroundOpacity: {
        '30': '0.3'
      },
      width: {
        '100': '400px',
        '110': '430px',
        '120': '450px',
        '130': '500px'
      }
    },
    screens: {
      'tablet': '272px',
      'xs': '440px',
      'sm': '650px',
      'md': '790px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1350px',
      '3xl': '1530px',
      '4xl': '1800px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
