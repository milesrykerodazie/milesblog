import { FaUserCheck, FaUserLock } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useGetAllUsersQuery } from '../redux/features/usersApiSlice';

const Users = ({ userId }: any) => {
   const { user }: any = useGetAllUsersQuery('usersList', {
      selectFromResult: ({ data }) => ({
         user: data?.entities[userId],
      }),
   });

   return (
      <div className='flex items-center'>
         <div className='flex items-center space-x-4 w-full'>
            <img
               src={
                  user?.profilePicture?.url
                     ? user?.profilePicture?.url
                     : 'https://demofree.sirv.com/nope-not-here.jpg'
               }
               alt='userDetail-img'
               className='w-10 h-10 lg:w-14 lg:h-14 rounded-full object-cover ring-2 ring-fuchsia-600'
            />
            <div className='flex flex-col md:flex-row md:items-center space-y-1 text-sm lg:text-base md:space-y-0 w-full'>
               <div className='flex-1'>
                  <label className='text-gray-800 dark:text-gray-200 duration-500 ease-in font-bold'>
                     FullName
                  </label>
                  <p className='text-gray-800 dark:text-gray-200 duration-500 ease-in'>
                     {user?.fullName}
                  </p>
               </div>

               <div className='flex-1'>
                  <label className='text-gray-800 dark:text-gray-200 duration-500 ease-in font-bold'>
                     Username
                  </label>
                  <p className='text-gray-800 dark:text-gray-200 duration-500 ease-in'>
                     {user?.username}
                  </p>
               </div>
               <div className='flex items-center space-x-2 flex-1'>
                  <label htmlFor='verified' className='label'>
                     Verified:
                  </label>
                  <p className='cursor-pointer'>
                     {user?.verified ? (
                        <MdVerified className='text-fuchsia-600 w-4 h-4 md:w-5 md:h-5' />
                     ) : (
                        <span className='text-gray-400'>Not Verified</span>
                     )}
                  </p>
               </div>
               <div className='flex items-center space-x-2 flex-1'>
                  <label htmlFor='active' className='label'>
                     Active
                  </label>
                  <p className=' cursor-pointer'>
                     {user?.active ? (
                        <span>
                           <FaUserCheck className='text-fuchsia-600 w-4 h-4 md:w-5 md:h-5' />
                        </span>
                     ) : (
                        <span>
                           <FaUserLock className='text-gray-600/60 w-4 h-4 md:w-5 md:h-5' />
                        </span>
                     )}
                  </p>
               </div>
            </div>
         </div>

         <div className=''>
            <Link to={`/edit-profile/${user?.username}`}>
               <button className='bg-fuchsia-600 hover:bg-gray-100 hover:text-fuchsia-600 px-3 rounded-sm py-1 duration-300 ease-in text-gray-100 text-sm'>
                  Edit
               </button>
            </Link>
         </div>
      </div>
   );
};

export default Users;
