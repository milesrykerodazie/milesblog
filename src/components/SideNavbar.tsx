import { MdClose } from 'react-icons/md';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../redux/features/authApiSlice';
import { toast } from 'react-toastify';
import { useAppSelector } from '../redux/app/store';
import { selectCurrentToken } from '../redux/features/auth/authSlice';
import OwnerShortProfile from './OwnerShortProfile';
import { CATEGORIES } from '../config/configurations';

export interface stateType {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
}
const customId = 'custom-id-yes';
const SideNavbar = ({ open, setOpen }: stateType) => {
   const handleSidebarToggle = (e: React.SyntheticEvent) => {
      e.preventDefault();
      setOpen((current) => !current);
   };

   const [logout, { data: logoutData, isSuccess }] = useLogoutMutation();
   //getting the token from redux
   const token = useAppSelector(selectCurrentToken);

   //for authomatically getting post owner on login
   let userDetail: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      userDetail = JSON.parse(userName);
   }

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
            setOpen((current) => !current);
            navigate('/');
         }
      }
      return () => (effectRan.current = true);
      // eslint-disable-next-line
   }, [isSuccess, logoutData?.message]);

   return (
      <div
         className={
            open
               ? 'lg:hidden fixed left-0 top-0 w-full h-screen bg-gradient-to-r  from-black/60 to-fuchsia-700/40 dark:from-fuchsia-700/80 dark:to-black/10 z-80 ease-in-out duration-700'
               : 'lg:hidden fixed -left-[100%] top-0 w-full h-screen bg-gradient-to-r  from-black/70 to-fuchsia-500/30 dark:from-fuchsia-600/60 dark:to-black/10 z-80 ease-in-out duration-900'
         }
         onClick={handleSidebarToggle}
      >
         <div
            className={
               open
                  ? 'fixed top-0 left-0 h-screen  bg-black  shadow-xl shadow-fuchsia-800 dark:bg-fuchsia-700 dark:shadow-black w-[70%]  md:w-[50%] ease-in duration-900 z-80 pt-3 px-3'
                  : 'fixed -left-[100%] top-0 ease-in duration-700 bg-black/80 dark:bg-fuchsia-700/70 shadow-xl shadow-fuchsia-800 dark:shadow-black/70 w-[75%] md:w-[55%] h-screen z-80 pt-3 px-3'
            }
            onClick={(e) => e.stopPropagation()}
         >
            <div className='flex justify-end'>
               <div
                  onClick={handleSidebarToggle}
                  className='flex items-center justify-center rounded-full w-7 h-7 bg-fuchsia-700 dark:bg-black/90 '
               >
                  <MdClose className='w-6 h-6 dark:text-fuchsia-500 text-black/95' />
               </div>
            </div>
            <div className='text-gray-200 pb-4'>
               <div className='text-gray-200 space-y-2 pb-4'>
                  <h3 className='text-fuchsia-200 uppercase'>Categories</h3>
                  {CATEGORIES.map(({ id, value }) => (
                     <div key={id} className='duration-500 ease-in'>
                        <NavLink
                           to={`/category/${value}`}
                           onClick={() => setOpen((current) => !current)}
                           className={({ isActive }) =>
                              isActive
                                 ? 'font-semibold text-fuchsia-600 duration-500 ease-in capitalize text-sm'
                                 : 'font-semibold text-gray-300 duration-500 ease-in capitalize text-sm flex space-x-1 '
                           }
                        >
                           <span>{value}</span>
                        </NavLink>
                     </div>
                  ))}
               </div>
               <hr className='pt-3 border-gray-600 dark:border-gray-400' />
               {/* nav bar section */}
               <div className='flex flex-col space-y-2 pb-3 text-sm duration-500 ease-in'>
                  {userDetail?.role === 'Admin' && (
                     <>
                        <Link
                           to={`/admin/userslist`}
                           onClick={() => setOpen((current) => !current)}
                        >
                           <p className='font-medium duration-500 ease-in text-gray-300'>
                              Users List
                           </p>
                        </Link>
                     </>
                  )}
                  {token && (
                     <>
                        <Link
                           to={`/create-post`}
                           onClick={() => setOpen((current) => !current)}
                        >
                           <p className='font-medium duration-500 ease-in text-gray-300'>
                              Create Post
                           </p>
                        </Link>
                     </>
                  )}
                  <Link
                     to={`/about`}
                     onClick={() => setOpen((current) => !current)}
                  >
                     <p className='font-medium duration-500 ease-in text-gray-300'>
                        About Us
                     </p>
                  </Link>

                  <Link
                     to={`/contact`}
                     onClick={() => setOpen((current) => !current)}
                  >
                     <p className='font-medium duration-500 ease-in text-gray-300'>
                        Contact Us
                     </p>
                  </Link>
                  {!token && (
                     <>
                        <Link
                           to={`/auth`}
                           onClick={() => setOpen((current) => !current)}
                        >
                           <p className='font-medium duration-500 ease-in text-gray-300'>
                              Register
                           </p>
                        </Link>

                        <Link
                           to={`/auth/login`}
                           onClick={() => setOpen((current) => !current)}
                        >
                           <button className='font-medium duration-500 ease-in text-gray-300'>
                              Login
                           </button>
                        </Link>
                     </>
                  )}
               </div>
               <hr className='py-3 border-gray-600 dark:border-gray-400' />
               {token && (
                  <p
                     className='cursor-pointer text-center font-semibold tracking-wider'
                     onClick={logout}
                  >
                     Logout
                  </p>
               )}
            </div>
            {token && <OwnerShortProfile sidebar />}
         </div>
      </div>
   );
};

export default SideNavbar;
