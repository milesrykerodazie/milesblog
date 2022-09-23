import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
   return (
      <div className='p-3'>
         <h1 className='titleText'>Home</h1>
         <Link to='/register'>
            <button className='text-xl font-semibold text-gray-200 bg-slate-800 px-4 py-2 mt-3 rounded-md '>
               Register
            </button>
         </Link>
      </div>
   );
};

export default Home;
