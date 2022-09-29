import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header = () => {
   return (
      <header className='hidden px-10 py-3 h-16 lg:flex items-center justify-between'>
         <Link to='/'>
            <p className='text-black/80 font-extrabold font-kaushan text-2xl tracking-widest dark:text-white/90'>
               <span className='text-fuchsia-500'>Miles</span>-Blog
            </p>
         </Link>

         <Navbar />
      </header>
   );
};

export default Header;
