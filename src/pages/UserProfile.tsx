import { Link, useParams } from 'react-router-dom';
import { useGetAllUsersQuery } from '../redux/features/usersApiSlice';

const UserProfile = () => {
   const { id }: any = useParams();

   //getting the post owner details
   const { user }: any = useGetAllUsersQuery('usersList', {
      selectFromResult: ({ data }) => ({
         user: data?.entities[id],
      }),
   });

   //for authomatically getting post owner on login
   let userDetail: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      userDetail = JSON.parse(userName);
   }

   //for authomatically getting post owner on login
   let usernamelocal: any;
   const userLocal = localStorage.getItem('user');
   if (userLocal) {
      usernamelocal = JSON.parse(userLocal);
   }

   const authEdit =
      (usernamelocal && user?.username === userDetail?.user) ||
      usernamelocal?.role === 'Admin';

   //formatting date
   const dateJoined = new Date(user?.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
   });

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
               <p className='text-gray-800 dark:text-gray-200 text-sm lg:text-lg duration-500 ease-in'>
                  <span className='font-semibold'>Name:</span> {user?.fullName}
               </p>
               <span className='text-fuchsia-300 text-sm lg:text-lg'>|</span>
               <p className='text-fuchsia-500 text-sm lg:text-lg'>
                  Joined: {dateJoined}
               </p>
            </div>
            <p className='text-gray-800 dark:text-gray-200 text-sm lg:text-lg duration-500 ease-in'>
               <span className='font-semibold'>Contact:</span> {user?.email}
            </p>

            <p className='duration-500 ease-in text-gray-800 dark:text-gray-200 text-sm lg:text-lg'>
               <span className='font-semibold'>Bio:</span>{' '}
               {user?.userBio ? user?.userBio : 'No bio at the moment.'}
            </p>
         </div>
      </div>
   );
};

export default UserProfile;
