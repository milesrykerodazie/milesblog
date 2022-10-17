import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllUsersQuery } from '../redux/features/usersApiSlice';

const UserProfile = () => {
   const { id }: any = useParams();

   //getting the post owner details
   const { user }: any = useGetAllUsersQuery('usersList', {
      selectFromResult: ({ data }) => ({
         user: data?.entities[id],
      }),
   });

   console.log('user page: => ', user);

   //formatting date
   const dateJoined = new Date(user?.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
   });

   return (
      <div>
         <img
            src='https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'
            className='w-24 h-24 rounded-full object-cover ring-2 ring-fuchsia-600'
         />
         <div className='flex items-center space-x-3'>
            <p>Name: {user?.fullName}</p>
            <p>Joined: {dateJoined}</p>
         </div>
         <p>Contact: {user?.email}</p>
         {user?.userBio ? (
            <p>Bio: {user?.userBio}</p>
         ) : (
            <p>Bio: No bio at the moment.</p>
         )}
      </div>
   );
};

export default UserProfile;
