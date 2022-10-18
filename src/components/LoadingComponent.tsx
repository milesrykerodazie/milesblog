import React from 'react';
import { BiLoaderCircle } from 'react-icons/bi';

const LoadingComponent = () => {
   return (
      <div className='flex items-center justify-center h-screen space-x-1'>
         <p className='text-xl text-gray-600 dark:text-gray-400 tracking-wider animate-pulse duration-500 ease-in font-semibold'>
            Loading
         </p>
         <BiLoaderCircle className='w-14 h-14 text-gray-500 animate-spin' />
      </div>
   );
};

export default LoadingComponent;
