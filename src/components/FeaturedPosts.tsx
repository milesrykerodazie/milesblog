import { memo } from 'react';
import { useGetPostsQuery } from '../redux/features/postApiSlice';
import Post from './Post';

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

const FeaturedPosts = () => {
   const {
      data: postsData,
      isLoading,
      isSuccess,
      isError,
   } = useGetPostsQuery('postList', {
      pollingInterval: 120000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
   });

   const { role } = useAuth();

   const adminFilter = postsData?.ids.filter(
      (adminFeatured) =>
         (postsData as any)?.entities[adminFeatured].featured === true,
   );

   const filtered = postsData?.ids.filter(
      (filteredPost) =>
         (postsData as any)?.entities[filteredPost].suspended === false &&
         (postsData as any)?.entities[filteredPost].featured === true,
   );

   return (
      <div>
         {isLoading ? (
            <>
               <div className='bg-gray-300/20 h-48 mt-4 animate-pulse' />
               <div className='bg-gray-300/20 h-48 mt-4 animate-pulse' />
            </>
         ) : isError ? (
            <div>
               <p className='text-sm text-red-500 font-semibold pt-3 text-center'>
                  No Featured Posts
               </p>
            </div>
         ) : isSuccess ? (
            <>
               <h2 className='text-base text-gray-800 dark:text-white font-semibold duration-500 ease-in z-50 py-2 '>
                  Featured Post
               </h2>
               <div
                  className={` pb-3  ${
                     (adminFilter as any)?.length < 2 ||
                     (filtered as any)?.length < 2
                        ? 'h-auto overflow-y-hidden'
                        : 'h-[400px] overflow-y-scroll'
                  }`}
               >
                  {role && role === 'Admin' ? (
                     <div className='grid grid-cols-1 gap-y-2 px-1'>
                        {(adminFilter as any)?.map((postId: any) => (
                           <Post key={postId} postId={postId} featured />
                        ))}
                     </div>
                  ) : (
                     <div className='grid grid-cols-1 gap-y-2 px-1'>
                        {(filtered as any)?.map((postId: any) => (
                           <Post key={postId} postId={postId} featured />
                        ))}
                     </div>
                  )}
               </div>
            </>
         ) : null}
      </div>
   );
};

const memoizedFeaturedPosts = memo(FeaturedPosts);
export default memoizedFeaturedPosts;
