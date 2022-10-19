import React from 'react';
import { useGetPostsQuery } from '../redux/features/postApiSlice';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const Post = ({ postId, featured }: any) => {
   const { post }: any = useGetPostsQuery('postList', {
      selectFromResult: ({ data }) => ({
         post: data?.entities[postId],
      }),
   });

   //use navigation
   const navigate = useNavigate();

   //formatting date
   const dateCreated = new Date(post?.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
   });

   const postDetails = () => navigate(`/post/${postId}`);
   return (
      <div className='space-y-2'>
         <div
            className={` bg-white dark:bg-black shadow-md shadow-fuchsia-600 p-2 rounded-md space-y-2  duration-500 ${
               post?.suspended !== false ? 'opacity-30' : featured ? '' : 'mt-3'
            }`}
         >
            {post?.image.url && (
               <img
                  src={post?.image.url}
                  alt='post_img'
                  className={`object-cover w-full rounded-md ${
                     featured ? 'h-32' : 'lg:h-64 h-44'
                  }`}
               />
            )}

            <h2
               className={`dark:text-white text-gray-800 truncate font-bold capitalize ${
                  featured ? 'text-sm' : 'text-xl'
               }`}
            >
               {post?.title}
            </h2>

            <div className='flex items-center justify-between'>
               <p className='text-xs text-gray-500 dark:text-gray-300'>
                  {dateCreated}
               </p>
               {post?.suspended === false && (
                  <button
                     className={`bg-fuchsia-600 text-white text-sm  rounded-md font-semibold p-2 ${
                        featured ? 'text-xs' : 'text-sm'
                     }`}
                     onClick={postDetails}
                  >
                     Read More
                  </button>
               )}
            </div>
         </div>
      </div>
   );
};

const memoizedPost = memo(Post);

export default memoizedPost;
