const colors = require('tailwindcss/colors')

module.exports = {
  content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.violet,
        secondary: colors.blue,
        info: colors.cyan,
        success: colors.emerald,
        danger: colors.rose,
        warning: colors.amber,
        dark: colors.slate,
      },
      spacing: {
        0.25: '0.0625rem',
      },
      transitionProperty: {
        bg: 'background-color, border-color',
      },
      cursor: {
        grab: 'grab'
      }
    },
    container: {
        center: true,
    },
  },
  plugins: [],
}
