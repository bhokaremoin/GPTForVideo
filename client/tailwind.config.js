/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      'courier': ['Courier Prime', 'monospace'],
      'comic': ['Comic Neue', 'cursive'],
    },
    extend: {
      backgroundColor: {
        'dark-gray': 'rgb(49, 51, 57)',
        'light-gray': 'rgb(85,88,92)',
        
        // Add more custom colors as needed
      },
      colors:{
        'heading-color':'rgb(245,193,182)',
      }
    },
  },
  plugins: [],
}

