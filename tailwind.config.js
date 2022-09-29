/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         backgroundImage: {
            'rg-image': "url('/src/images/blog-register.jpg')",
         },
         fontFamily: {
            kaushan: ['Kaushan Script,cursive'],
            merienda: ['Merienda,cursive'],
            zilla: ['Zilla Slab,serif'],
            garamond: ['Cormorant Garamond,serif'],
            gentium: ['Gentium Plus,serif'],
         },
         opacity: {
            70: '.70',
            80: '.80',
            85: '.85',
            90: '.90',
         },
         zIndex: {
            60: '60',
            70: '70',
            80: '80',
            90: '90',
            100: '100',
         },
         transitionDuration: {
            400: '400ms',
            600: '600ms',
            800: '800ms',
            900: '900ms',
            1100: '1100ms',
            1200: '1200ms',
            1300: '1300ms',
            1400: '1400ms',
            1500: '1500ms',
            1600: '1600ms',
            1700: '1700ms',
            1800: '1800ms',
            1900: '1900ms',
            2000: '2000ms',
         },
      },
   },
   plugins: [],
};
