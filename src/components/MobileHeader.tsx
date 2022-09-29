import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { RiCloseFill } from 'react-icons/ri';
import SideNavbar from './SideNavbar';

const MobileHeader = () => {
   const [open, setOpen] = useState<boolean>(false);
   return (
      <nav>
         <div className='py-3 h-12 flex items-center justify-between md:hidden'>
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
