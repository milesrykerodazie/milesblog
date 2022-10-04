import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../redux/app/store';
import { selectCurrentToken } from '../redux/features/auth/authSlice';
import { useLogoutMutation } from '../redux/features/authApiSlice';

const customId = 'custom-id-yes';

const Navbar = () => {
   const [logout, { data: logoutData, isLoading, isSuccess, isError, error }] =
      useLogoutMutation();
   //getting the token from redux
   const token = useAppSelector(selectCurrentToken);
   //reference for useEffect cleanup
   const effectRan = useRef(false);

   const navigate = useNavigate();

   // @ts-expect-error
   useEffect(() => {
      if (
         effectRan.current === true ||
         process.env.NODE_ENV !== 'development'
      ) {
         if (isSuccess) {
            toast.success(logoutData?.message, {
               toastId: customId,
            });
            localStorage.removeItem('user');
            navigate('/');
         }
      }
      return () => (effectRan.current = true);
   }, [isSuccess, logoutData?.message]);

   return (
      <nav className='space-x-2 flex items-center'>
         <Link to='/about'>
            <p className='font-medium text-gray-900 dark:text-white duration-500 ease-in'>
               About Us
            </p>
         </Link>
         <p className='text-fuchsia-500'>|</p>
         <Link to='/contact'>
            <p className='font-medium dark:text-white text-gray-900'>
               Contact Us
            </p>
         </Link>
         {!token && (
            <>
               <p className='text-fuchsia-500'>|</p>
               <Link to='/auth'>
                  <p className='font-medium dark:text-white text-gray-900'>
                     Register
                  </p>
               </Link>
               <p className='text-fuchsia-500'>|</p>
               <Link to='/auth/login'>
                  <button className='font-medium dark:text-white text-gray-900'>
                     Login
                  </button>
               </Link>
            </>
         )}
         {token && (
            <nav className='space-x-2 flex items-center'>
               <p className='text-fuchsia-500'>|</p>
               <button
                  className='dark:text-white text-gray-900 font-bold hover:text-fuchsia-600 duration-300 ease-in'
                  onClick={logout}
               >
                  Logout
               </button>
            </nav>
         )}
      </nav>
   );
};

export default Navbar;
