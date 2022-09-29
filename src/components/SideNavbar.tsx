import { MdClose } from 'react-icons/md';
import { MdDynamicFeed, MdVideoLabel, MdGroup, MdSchool } from 'react-icons/md';
import { AiFillWechat, AiFillBook } from 'react-icons/ai';
import {
   BsFillQuestionSquareFill,
   BsFillHandbagFill,
   BsFillCalendarEventFill,
} from 'react-icons/bs';
import { Dispatch, SetStateAction } from 'react';

export interface stateTyp {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
}

const SideNavbar = ({ open, setOpen }: stateTyp) => {
   const handleSidebarToggle = () => {
      setOpen((current) => !current);
   };
   return (
      <div
         className={
            open
               ? 'lg:hidden fixed left-0 top-0 w-full h-screen bg-blue-500/20 z-80 ease-in-out duration-700'
               : 'lg:hidden fixed -left-[100%] top-0 w-full h-screen bg-sm8/60 z-80 ease-in-out duration-900'
         }
         onClick={handleSidebarToggle}
      >
         <div
            className={
               open
                  ? 'fixed top-0 left-0 h-screen bg-gradient-to-r from-blue-300 via-blue-200 to-blue-50 shadow-xl shadow-blue-500 w-[70%]  md:w-[50%] ease-in duration-900 z-80 pt-3 px-3'
                  : 'fixed -left-[100%] top-0 ease-in duration-700 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-50 shadow-xl shadow-blue-500 w-[75%] md:w-[55%] h-screen z-80 pt-3 px-3'
            }
            onClick={(e) => e.stopPropagation()}
         >
            <div className='flex justify-end'>
               <div
                  onClick={handleSidebarToggle}
                  className='flex items-center justify-center rounded-full w-7 h-7 bg-white'
               >
                  <MdClose className='w-6 h-6 text-blue-500' />
               </div>
            </div>
         </div>
      </div>
   );
};

export default SideNavbar;

// className={`w-full bg-fuchsia-300 text-white py-2 rounded-md font-semibold tracking-wide uppercase flex items-center justify-center space-x-3 ${
//    !canSubmit && 'opacity-20 text-gray-400'
// }`}

// import React from 'react';

// const SideNavbar = () => {
//    return <div className='text-yellow-500'>SideNavbar</div>;
// };

// export default SideNavbar;
