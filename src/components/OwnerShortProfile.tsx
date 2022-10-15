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

   // const { user }: any = useGetAllUsersQuery('usersList', {
   //    refetchOnFocus: true,
   //    refetchOnMountOrArgChange: true,
   //    selectFromResult: ({ data }) => ({
   //       user: data?.entities[postOwner?.user],
   //    }),
   // });

   // console.log('getting a user: =>', user);

   return (
      <div>
         <h1>Helo</h1>
      </div>
   );
};

export default OwnerShortProfile;
