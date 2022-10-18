import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryPostsQuery } from '../redux/features/postApiSlice';
import Post from '../components/Post';

import useTitle from '../hooks/useTitle';

//get stuff from localeStorage
const useAuth = () => {
   let user: any;

   const userRole = localStorage.getItem('user');

   if (userRole) {
      user = JSON.parse(userRole);
   }

   if (user) {
      return {
         auth: true,
         role: user.role,
      };
   } else {
      return {
         auth: false,
         role: null,
      };
   }
};

const CategoryPosts = () => {
   const { id }: any = useParams();
   useTitle(id);
   const {
      data: postsData,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetCategoryPostsQuery(`${id}`, {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
   });

   const { role } = useAuth();

   const filtered = postsData?.ids.filter(
      (filteredPost) =>
         (postsData as any)?.entities[filteredPost].suspended === false,
   );

   return (
      <div>
         {isLoading ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
               <div className='bg-gray-300/20 h-48 mt-4 animate-pulse' />
               <div className='bg-gray-300/20 h-48 mt-4 animate-pulse' />
               <div className='bg-gray-300/20 h-48 mt-4 animate-pulse' />
            </div>
         ) : isError ? (
            <div className='flex items-center justify-center h-[calc(100vh-96px)]'>
               <p className='text-xl font-semibold text-gray-800 dark:text-gray-300'>
                  {(error as any)?.data?.message}
               </p>
            </div>
         ) : isSuccess ? (
            <div>
               {role && role === 'Admin' ? (
                  <>
                     {postsData && (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-1'>
                           {(postsData as any)?.ids?.map((postId: any) => (
                              <Post key={postId} postId={postId} />
                           ))}
                        </div>
                     )}
                  </>
               ) : (
                  <>
                     {filtered && (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-1'>
                           {(filtered as any)?.map((postId: any) => (
                              <Post key={postId} postId={postId} />
                           ))}
                        </div>
                     )}
                  </>
               )}
            </div>
         ) : null}
      </div>
   );
};

export default CategoryPosts;
