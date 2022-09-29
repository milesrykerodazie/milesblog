import React, { useState, useEffect } from 'react';
import { BsLightbulbFill } from 'react-icons/bs';

export interface childrenProps {
   children?: React.ReactNode;
}

export default function ThemeProvider({ children }: childrenProps) {
   const [theme, setTheme] = useState('');

   useEffect(() => {
      const localStorageTheme = localStorage.getItem('theme');
      if (localStorageTheme) {
         setTheme(localStorageTheme);
      }
   }, []);

   useEffect(() => {
      localStorage.setItem('theme', theme);
   }, [theme]);

   return (
      <div id='theme-wrapper' className={`${theme}`}>
         {children}
         <button
            className='text-sm fixed bottom-4 right-2 lg:right-12 backdrop-filter backdrop-blur bg-black/90 dark:bg-white text-black/80 p-2 rounded-full shadow-md shadow-fuchsia-600 hover:brightness-105 duration-500 ease-in outline-none select-none'
            onClick={() => {
               theme === `light` ? setTheme(`dark`) : setTheme(`light`);
            }}
         >
            {theme === `light` ? (
               <BsLightbulbFill className='text-white' />
            ) : (
               <BsLightbulbFill className='text-black' />
            )}
         </button>
      </div>
   );
}

//if you want the theme to always be light on refresh
// useEffect(() => {
//     const localStorageTheme = localStorage.getItem('theme');
//     if (localStorageTheme) {
//       setTheme(localStorageTheme);
//     } else {
//       localStorage.setItem('theme', `light`);
//       setTheme(`light`);
//     }
//   }, []);
