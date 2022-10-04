import { Outlet } from 'react-router-dom';
import Header from '../Header';
import MobileHeader from '../MobileHeader';

const Layout = () => {
   return (
      <div className='h-screen bg-white opacity-95 dark:bg-black duration-500 ease-in '>
         <Header />
         <MobileHeader />
         <Outlet />
      </div>
   );
};

export default Layout;
