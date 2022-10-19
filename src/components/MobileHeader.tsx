import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { RiCloseFill } from 'react-icons/ri';
import SideNavbar from './SideNavbar';
import { useGetAllUsersQuery } from '../redux/features/usersApiSlice';

const MobileHeader = () => {
   const [pageScroll, setPageScroll] = useState(false);

   //useEffect for page scroll
   useEffect(() => {
      const scrl = window.addEventListener('scroll', () =>
         setPageScroll(window.scrollY > 70),
      );
      return scrl;
   }, [pageScroll]);
   const [open, setOpen] = useState<boolean>(false);

   //for authomatically getting post owner on login
   let USER: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      USER = JSON.parse(userName);
   }

   const { user }: any = useGetAllUsersQuery('usersList', {
      selectFromResult: ({ data }) => ({
         user: data?.entities[USER?.username],
      }),
   });

   return (
      <nav>
         <div
            className={`bg-white dark:bg-black shadow-sm shadow-fuchsia-300 py-3 px-5 h-12 flex items-center justify-between lg:hidden fixed w-full z-50 ease-in duration-500 ${
               pageScroll && 'shadow-md shadow-fuchsia-700'
            }`}
         >
            <Link to='/'>
               <p className='text-black/80 font-extrabold font-kaushan text-base tracking-widest dark:text-white/90'>
                  <span className='text-fuchsia-500'>Miles</span>-Blog
               </p>
            </Link>
            {USER && (
               <div className='flex items-center space-x-1'>
                  <img
                     src={
                        user?.profilePicture?.url
                           ? user?.profilePicture?.url
                           : 'https://demofree.sirv.com/nope-not-here.jpg'
                     }
                     alt='userDetail-img'
                     className='w-6 h-6 rounded-full object-cover'
                  />
                  <p className='capitalize text-xs text-gray-800 dark:text-gray-200 duration-500 ease-in'>
                     {user?.username}
                  </p>
               </div>
            )}

            <div onClick={() => setOpen((current) => !current)}>
               {open ? (
                  <RiCloseFill className='w-8 h-8 text-gray-800 dark:text-gray-400' />
               ) : (
                  <BiMenu className='w-8 h-8 text-gray-800 dark:text-gray-400' />
               )}
            </div>
         </div>

         <SideNavbar open={open} setOpen={setOpen} />
      </nav>
   );
};

export default MobileHeader;
