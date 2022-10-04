import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { RiCloseFill } from 'react-icons/ri';
import SideNavbar from './SideNavbar';

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
   return (
      <nav>
         <div
            className={`bg-white shadow-md shadow-fuchsia-200 py-3 px-5 h-12 flex items-center justify-between md:hidden fixed w-full z-50 ease-in duration-500 ${
               pageScroll && 'shadow-md shadow-fuchsia-700'
            }`}
         >
            <Link to='/'>
               <p className='text-black/80 font-extrabold font-kaushan text-xl tracking-widest dark:text-white/90'>
                  <span className='text-fuchsia-500'>Miles</span>-Blog
               </p>
            </Link>
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
