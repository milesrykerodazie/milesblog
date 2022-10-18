import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetAllUsersQuery } from '../redux/features/usersApiSlice';
import CategoryNav from './CategoryNav';
import Navbar from './Navbar';

const Header = () => {
   const [pageScroll, setPageScroll] = useState(false);

   //useEffect for page scroll
   useEffect(() => {
      const scrl = window.addEventListener('scroll', () =>
         setPageScroll(window.scrollY > 70),
      );
      return scrl;
   }, [pageScroll]);

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
      <header
         className={`bg-white dark:bg-black shadow-sm shadow-fuchsia-300 hidden px-10 py-3 lg:h-20 lg:block fixed w-full top-0 z-50 ease-in duration-500 space-y-2 ${
            pageScroll && 'shadow-md shadow-fuchsia-700'
         }`}
      >
         <div className='flex items-center justify-between'>
            <Link to='/'>
               <p className='text-black/80 font-extrabold font-kaushan text-2xl tracking-widest dark:text-white/90'>
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
                  <p className='capitalize text-sm'>{user?.username}</p>
               </div>
            )}
            <Navbar />
         </div>
         <CategoryNav />
      </header>
   );
};

export default Header;
