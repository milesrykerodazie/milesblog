import { Outlet } from 'react-router-dom';
import Header from '../Header';
import MobileHeader from '../MobileHeader';

const Layout = () => {
   return (
      <div className='bg-white opacity-95 dark:bg-black h-screen duration-500 ease-in px-2 md:px-0'>
         <Header />
         <MobileHeader />
         <Outlet />
      </div>
   );
};

export default Layout;
