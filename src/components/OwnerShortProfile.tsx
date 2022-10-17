import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAllUsersQuery } from '../redux/features/usersApiSlice';
import { GrMail } from 'react-icons/gr';

const OwnerShortProfile = ({ sidebar }: any) => {
   //for authomatically getting post owner on login
   let userDetail: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      userDetail = JSON.parse(userName);
   }

   const { user }: any = useGetAllUsersQuery('usersList', {
      selectFromResult: ({ data }) => ({
         user: data?.entities[userDetail?.username],
      }),
   });

   //formatting date
   const dateJoined = new Date(user?.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
   });

   return (
      <div>
         <Link to={`/edit-profile/${user?.username}`}>
            <button className='bg-fuchsia-600 px-2 rounded-sm  text-gray-100 text-sm'>
               Edit
            </button>
         </Link>

         <div className='flex flex-col justify-center items-center py-2 space-y-4'>
            <img
               src={
                  user?.profilePicture?.url
                     ? user?.profilePicture?.url
                     : 'https://demofree.sirv.com/nope-not-here.jpg'
               }
               className='w-16 h-16 rounded-full object-cover ring-2 ring-fuchsia-600'
            />

            <div
               className={` text-sm duration-500 ease-in flex items-center space-x-1  ${
                  sidebar ? 'text-gray-200' : 'text-gray-800 dark:text-gray-200'
               }`}
            >
               <p className='font-semibold'>Name:</p>
               <p>{user?.fullName}</p>
            </div>

            <p
               className={` text-sm text-center ${
                  sidebar ? 'text-fuchsia-200' : 'text-fuchsia-500'
               }`}
            >
               Joined: {dateJoined}
            </p>

            <div
               className={` text-sm duration-500 ease-in flex items-center space-x-2 ${
                  sidebar ? 'text-gray-200' : 'text-gray-800 dark:text-gray-200'
               }`}
            >
               <GrMail
                  className={`w-4 h-4 
                     ${sidebar ? 'text-fuchsia-300 ' : 'text-fuchsia-500'}
                        
                  `}
               />
               <p>{user?.email}</p>
            </div>
            {!sidebar && (
               <div className='duration-500 ease-in text-gray-800 dark:text-gray-200 text-sm flex flex-col items-center justify-center'>
                  <label className='font-semibold'>Bio</label>

                  <p>
                     {user?.userBio ? user?.userBio : 'No bio at the moment.'}
                  </p>
               </div>
            )}
         </div>
      </div>
   );
};

export default OwnerShortProfile;
