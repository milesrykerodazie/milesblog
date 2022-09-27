import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../redux/app/store';
import { selectCurrentToken } from '../redux/features/auth/authSlice';
import { useLogoutMutation } from '../redux/features/authApiSlice';
const customId = 'custom-id-yes';
const Home = () => {
   const [logout, { data: logoutData, isLoading, isSuccess, isError, error }] =
      useLogoutMutation();

   console.log('the data from logout : => ', logoutData);

   const token = useAppSelector(selectCurrentToken);
   console.log('the token response: => ', token);

   const effectRan = useRef(false);

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
         }
      }
      return () => (effectRan.current = true);
   }, [isSuccess]);

   return (
      <div className='p-3 space-x-4'>
         <h1 className='titleText'>Home</h1>
         <Link to='/register'>
            <button className='text-xl font-semibold text-gray-200 bg-slate-800 px-4 py-2 mt-3 rounded-md '>
               Register
            </button>
         </Link>
         <Link to='/login'>
            <button className='text-xl font-semibold text-gray-200 bg-slate-800 px-4 py-2 mt-3 rounded-md '>
               Login
            </button>
         </Link>
         {token && (
            <button
               className='text-xl font-semibold text-gray-200 bg-slate-800 px-4 py-2 mt-3 rounded-md '
               onClick={logout}
            >
               Logout
            </button>
         )}
      </div>
   );
};

export default Home;
