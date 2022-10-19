import { Outlet } from 'react-router-dom';
import FeaturedPosts from '../FeaturedPosts';
import Header from '../Header';
import MobileHeader from '../MobileHeader';
import OwnerShortProfile from '../OwnerShortProfile';

const Layout = () => {
   //for authomatically getting post owner on login
   let userDetail: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      userDetail = JSON.parse(userName);
   }
   return (
      <div className='h-screen bg-white opacity-95 dark:bg-black duration-500 ease-in '>
         <Header />
         <MobileHeader />
         <div className='lg:pt-[89px] pt-[40px] px-2 pb-5 lg:px-0 lg:max-w-[90%] lg:mx-auto flex space-x-3'>
            <div className='lg:w-[85%] w-full mt-3'>
               <Outlet />
            </div>
            <div className='w-[15%] sticky top-[89px] h-[calc(100vh-120px)] space-y-3 hidden lg:inline-block'>
               <FeaturedPosts />
               {userDetail !== undefined && <OwnerShortProfile />}
            </div>
         </div>
      </div>
   );
};

export default Layout;
