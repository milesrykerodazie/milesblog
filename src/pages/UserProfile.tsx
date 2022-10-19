import { Link, useParams, useNavigate } from 'react-router-dom';
import {
   useDeleteUserMutation,
   useGetAllUsersQuery,
} from '../redux/features/usersApiSlice';
import useTitle from '../hooks/useTitle';
import { ImSpinner } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLogoutMutation } from '../redux/features/authApiSlice';

const customId = 'custom-id-yes';

const UserProfile = () => {
   const { id }: any = useParams();
   useTitle(id);

   //getting the post owner details
   const { user }: any = useGetAllUsersQuery('usersList', {
      selectFromResult: ({ data }) => ({
         user: data?.entities[id],
      }),
   });

   const [logout] = useLogoutMutation();

   const [
      deleteUser,
      { data: deleteData, isSuccess, isLoading, isError, error },
   ] = useDeleteUserMutation();

   const navigate = useNavigate();

   //for authomatically getting post owner on login
   let userDetail: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      userDetail = JSON.parse(userName);
   }

   const authEdit =
      userDetail &&
      (user?.username === userDetail?.username || userDetail?.role === 'Admin');

   //formatting date
   const dateJoined = new Date(user?.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
   });

   const [openDelete, setOpenDelete] = useState(false);

   const handleDelete = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      setOpenDelete((current) => !current);
      if (user?._id) {
         // @ts-expect-error
         await logout();
         await deleteUser({ id: user?._id });
      }
   };

   useEffect(() => {
      if (isSuccess) {
         toast.success(deleteData?.message, {
            toastId: customId,
         });
         localStorage.removeItem('user');
         navigate('/');
      }
      // eslint-disable-next-line
   }, [isSuccess, deleteData?.message]);

   return (
      <div>
         {authEdit && (
            <div className='pt-5'>
               <Link to={`/edit-profile/${user?.username}`}>
                  <button className='bg-fuchsia-600 px-3 rounded-sm py-1 text-gray-100 text-sm'>
                     Edit
                  </button>
               </Link>
            </div>
         )}

         <div className='flex flex-col justify-center items-center py-5 space-y-4'>
            <img
               src={
                  user?.profilePicture?.url
                     ? user?.profilePicture?.url
                     : 'https://demofree.sirv.com/nope-not-here.jpg'
               }
               alt=''
               className='w-16 h-16 lg:w-24 lg:h-24 rounded-full object-cover ring-2 ring-fuchsia-600'
            />
            <div className='flex items-center space-x-3'>
               <p className='text-gray-800 dark:text-gray-200 text-sm lg:text-base duration-500 ease-in'>
                  <span className='font-semibold'>Name:</span> {user?.fullName}
               </p>
               <span className='text-fuchsia-300 text-sm lg:text-base'>|</span>
               <p className='text-fuchsia-500 text-sm lg:text-lbase'>
                  Joined: {dateJoined}
               </p>
            </div>
            <p className='text-gray-800 dark:text-gray-200 text-sm lg:text-base duration-500 ease-in'>
               <span className='font-semibold'>Contact:</span> {user?.email}
            </p>

            <p className='duration-500 ease-in text-gray-800 dark:text-gray-200 text-sm lg:text-base'>
               <span className='font-semibold'>Bio:</span>{' '}
               {user?.userBio ? user?.userBio : 'No bio at the moment.'}
            </p>
            {authEdit && (
               <button
                  type='submit'
                  className='w-1/2 bg-fuchsia-300 text-white py-2 rounded-md font-semibold tracking-wide uppercase flex items-center justify-center space-x-3'
                  onClick={() => setOpenDelete((current) => !current)}
               >
                  {isLoading ? (
                     <div className='flex items-center space-x-1'>
                        <p>
                           Deleting<span className='animate-pulse'>...</span>
                        </p>
                        <ImSpinner className='w-5 h-5 text-slate-200 animate-spin' />
                     </div>
                  ) : (
                     <p>Delete</p>
                  )}
               </button>
            )}
            {openDelete && (
               <div className='flex flex-col items-center text-xs lg:text-sm space-y-2'>
                  <p className='text-gray-800 dark:text-gray-200'>
                     Are you sure you want to leave Miles Blog Sample?
                  </p>
                  <div className='flex items-center space-x-3'>
                     <button
                        className='bg-red-500 text-white px-3 py-1 rounded-md font-semibold tracking-wide uppercase'
                        onClick={handleDelete}
                     >
                        Yes
                     </button>
                     <button
                        className='bg-fuchsia-300 text-white px-3 py-1 rounded-md font-semibold tracking-wide uppercase'
                        onClick={() => setOpenDelete((current) => !current)}
                     >
                        No
                     </button>
                  </div>
               </div>
            )}
            {isError && (
               <p className='text-sm text-red-500 tracking-wider'>
                  {(error as any)?.data?.message}
               </p>
            )}
         </div>
      </div>
   );
};

export default UserProfile;
