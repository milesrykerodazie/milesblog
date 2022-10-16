import React from 'react';
import { useGetAllUsersQuery } from '../redux/features/usersApiSlice';

const OwnerShortProfile = () => {
   // //for authomatically getting post owner on login
   let postOwner: any;
   const owner = localStorage.getItem('po');
   if (owner) {
      postOwner = JSON.parse(owner);
   }

   console.log('post owner: => ', postOwner?.user);

   const { user }: any = useGetAllUsersQuery('usersList', {
      selectFromResult: ({ data }) => ({
         user: data?.entities[postOwner?.user],
      }),
   });

   console.log('user from owner profile:=>', user);

   return <div>{postOwner && <h4>{user?.fullName}</h4>}</div>;
};

export default OwnerShortProfile;
