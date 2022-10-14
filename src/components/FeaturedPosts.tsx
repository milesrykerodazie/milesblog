import { memo } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
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
      error,
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
         <h2 className='text-lg text-gray-800 dark:text-white font-semibold bg-white dark:bg-black z-50 py-2'>
            Featured Post
         </h2>
         {isLoading ? (
            <div className='flex items-center justify-center mt-24'>
               <BiLoaderCircle className='w-14 h-12 text-gray-500 animate-spin' />
            </div>
         ) : isError ? (
            <div>
               <p className='text-xl font-semibold'>
                  {(error as any)?.data?.message}
               </p>
            </div>
         ) : isSuccess ? (
            <div
               className={` py-4 ${
                  (adminFilter as any)?.length < 2 ||
                  (filtered as any)?.length < 2
                     ? 'h-auto overflow-y-hidden'
                     : 'h-[500px] overflow-y-scroll'
               }`}
            >
               {role && role === 'Admin' ? (
                  <div className='grid grid-cols-1 after:gap-3 px-1'>
                     {(adminFilter as any)?.map((postId: any) => (
                        <Post key={postId} postId={postId} featured />
                     ))}
                  </div>
               ) : (
                  <div className='grid grid-cols-1  gap-3 px-1'>
                     {(filtered as any)?.map((postId: any) => (
                        <Post key={postId} postId={postId} featured />
                     ))}
                  </div>
               )}
            </div>
         ) : null}
      </div>
   );
};

const memoizedFeaturedPosts = memo(FeaturedPosts);
export default memoizedFeaturedPosts;
