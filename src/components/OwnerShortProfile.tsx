import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAllUsersQuery } from '../redux/features/usersApiSlice';
import { GrMail } from 'react-icons/gr';
import { MdVerified } from 'react-icons/md';
import { useResendVerificationMutation } from '../redux/features/authApiSlice';
import { toast } from 'react-toastify';
import { ImSpinner } from 'react-icons/im';

const customId = 'custom-id-yes';
const OwnerShortProfile = ({ sidebar }: any) => {
   //resend verifivation
   const [
      resendVerification,
      { data: verificationData, isLoading, isSuccess, isError, error },
   ] = useResendVerificationMutation();

   //use navigation
   const navigate = useNavigate();

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

   useEffect(() => {
      if (isSuccess) {
         toast.success(verificationData?.message, {
            toastId: customId,
         });
         navigate('/auth/verifyemail');
      }
      if (isError) {
         toast.error((error as any)?.data?.message, {
            toastId: customId,
         });
      }
      // eslint-disable-next-line
   }, [isSuccess, isError, verificationData?.message, error]);

   // resend verification method
   const handleVerification = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (user) {
         await resendVerification(user.username);
      }
   };

   return (
      <div>
         <div className='flex items-center justify-between'>
            <Link to={`/edit-profile/${user?.username}`}>
               <button className='bg-fuchsia-600 px-2 py-1 rounded-md  text-gray-100 text-sm'>
                  Edit
               </button>
            </Link>
            <Link to={`/author/${user?.username}`}>
               <button className='bg-fuchsia-600 px-2 py-1 rounded-md  text-gray-100 text-sm'>
                  Profile
               </button>
            </Link>
         </div>

         <div className='flex flex-col justify-center items-center py-2 space-y-4'>
            <img
               src={
                  user?.profilePicture?.url
                     ? user?.profilePicture?.url
                     : 'https://demofree.sirv.com/nope-not-here.jpg'
               }
               alt='user-pic'
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

                  <p className='text-justify truncate-line-clamp'>
                     {user?.userBio ? user?.userBio : 'No bio at the moment.'}
                  </p>
               </div>
            )}

            {user?.verified ? (
               <div className='flex items-center space-x-2 text-sm text-gray-800 dark:text-gray-200 duration-500 ease-in'>
                  <p
                     className={` text-xs lg:text-sm duration-500 ease-in flex items-center space-x-2 ${
                        sidebar
                           ? 'text-gray-200'
                           : 'text-gray-800 dark:text-gray-200'
                     }`}
                  >
                     Verified
                  </p>
                  <MdVerified className='text-fuchsia-600 dark:text-fuchsia-300 w-4 h-4 md:w-5 md:h-5 duration-500 ease-in' />
               </div>
            ) : (
               <div className='flex items-center space-x-2'>
                  <p
                     className={` text-xs lg:text-sm duration-500 ease-in flex items-center space-x-2 ${
                        sidebar
                           ? 'text-gray-200'
                           : 'text-gray-800 dark:text-gray-200'
                     }`}
                  >
                     Not Verified
                  </p>
                  <button
                     className='bg-fuchsia-600 px-2 py-1 rounded-sm  text-gray-100 text-xs lg:text-sm'
                     onClick={handleVerification}
                  >
                     {isLoading ? (
                        <p className='flex items-center'>
                           verifying...
                           <ImSpinner className='w-6 h-6 text-slate-200 ml-2 animate-spin' />
                        </p>
                     ) : (
                        <p>Verify</p>
                     )}
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

export default OwnerShortProfile;

// {user?.verified ? (

// ) : (
//    <span className=''>
//       Not Verified
//    </span>
// )}
