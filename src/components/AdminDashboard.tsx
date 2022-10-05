import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
   return (
      <div className='px-3 mt-2'>
         <Link to='/admin/create'>
            {' '}
            <button className='bg-black dark:bg-white text-fuchsia-600 px-3 py-2 font-bold'>
               Create Post
            </button>
         </Link>
      </div>
   );
};

export default AdminDashboard;
