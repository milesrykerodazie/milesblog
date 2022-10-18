import React from 'react';
import { useParams } from 'react-router-dom';
import EditProfileForm from '../components/forms/EditProfileForm';
import { useGetAllUsersQuery } from '../redux/features/usersApiSlice';
import useTitle from '../hooks/useTitle';
import LoadingComponent from '../components/LoadingComponent';

const EditUserProfile = () => {
   const { id }: any = useParams();
   useTitle(id);

   //getting the post owner details
   const { user }: any = useGetAllUsersQuery('usersList', {
      selectFromResult: ({ data }) => ({
         user: data?.entities[id],
      }),
   });

   //put a loader
   if (!user) return <LoadingComponent />;

   const profileContent = <EditProfileForm user={user} />;

   return profileContent;
};

export default EditUserProfile;
