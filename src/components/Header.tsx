import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
            <Navbar />
         </div>
         <CategoryNav />
      </header>
   );
};

export default Header;
