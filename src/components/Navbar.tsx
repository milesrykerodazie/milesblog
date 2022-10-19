import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../redux/app/store';
import { selectCurrentToken } from '../redux/features/auth/authSlice';
import { useLogoutMutation } from '../redux/features/authApiSlice';

const customId = 'custom-id-yes';

const Navbar = ({ user }: any) => {
   const [logout, { data: logoutData, isSuccess }] = useLogoutMutation();
   //getting the token from redux
   const token = useAppSelector(selectCurrentToken);
   //reference for useEffect cleanup
   const effectRan = useRef(false);

   const navigate = useNavigate();

   //for authomatically getting post owner on login
   let userDetail: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      userDetail = JSON.parse(userName);
   }

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
      // eslint-disable-next-line
   }, [isSuccess, logoutData?.message]);

   const canCreatePost = token && user?.verified;

   return (
      <nav className='space-x-2 flex items-center'>
         {userDetail?.role === 'Admin' && (
            <>
               <Link to='/admin/userslist'>
                  <p className='font-medium text-gray-900 dark:text-white duration-500 ease-in'>
                     Users List
                  </p>
               </Link>
               <p className='text-fuchsia-500 hidden lg:block'>|</p>
            </>
         )}
         {canCreatePost && (
            <>
               <Link to='/create-post'>
                  <p className='font-medium text-gray-900 dark:text-white duration-500 ease-in'>
                     Create Post
                  </p>
               </Link>
               <p className='text-fuchsia-500'>|</p>
            </>
         )}
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
