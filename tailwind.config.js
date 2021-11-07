module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif']
    },
    extend: {
      colors: {
        'text': '#444444',
        'lightgray': '#F3F3F3',
        'gray': '#BABABA',
        'orange': '#F7981D',
        'footer': '#1E242C',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
