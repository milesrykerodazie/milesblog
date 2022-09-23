/** @type {import('tailwindcss').Config} */
module.exports = {
   important: true,
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         backgroundImage: {
            'rg-image': "url('/src/images/blog-register.jpg')",
         },
      },
   },
   plugins: [],
};
