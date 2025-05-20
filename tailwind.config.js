/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./BarlowAILabs/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
  ],
  
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        "loop-scroll": "loop-scroll 50s linear infinite",
        'spin': 'spin 1s linear infinite',
        'none': 'none',
      },
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        'spin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
        'roboto': ["Roboto", "sans-serif"],
      },
    },
  },
  
  plugins: [
    require('flowbite/plugin'),
    require('flowbite-typography'),
  ],
};

