import { Outlet } from 'react-router-dom';
import FeaturedPosts from '../FeaturedPosts';
import Header from '../Header';
import MobileHeader from '../MobileHeader';
import OwnerShortProfile from '../OwnerShortProfile';

const Layout = () => {
   return (
      <div className='h-screen bg-white opacity-95 dark:bg-black duration-500 ease-in '>
         <Header />
         <MobileHeader />
         <div className='lg:pt-[74px] pt-[40px] px-2 pb-5 lg:px-0 lg:max-w-[90%] lg:mx-auto flex space-x-3'>
            <div className='lg:w-[80%] w-full mt-3'>
               <Outlet />
            </div>
            <div className='w-[20%] sticky top-[74px] h-[calc(100vh-96px)] space-y-3 hidden lg:inline-block'>
               <FeaturedPosts />
               <OwnerShortProfile />
            </div>
         </div>
      </div>
   );
};

export default Layout;
