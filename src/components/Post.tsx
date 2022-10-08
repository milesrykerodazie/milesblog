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

   function createMarkup() {
      return {
         __html: post?.post,
      };
   }
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
            className={`mt-3 bg-white dark:bg-black shadow-md shadow-fuchsia-600 p-2 rounded-md space-y-2  duration-500 ${
               post?.suspended !== false ? 'opacity-30' : featured ? '' : ''
            }`}
         >
            {post?.image.url && (
               <img
                  src={post?.image.url}
                  alt='post_img'
                  className='object-cover w-full h-48 rounded-md'
               />
            )}

            <h2
               className={`dark:text-white text-gray-800 truncate text-lg font-bold capitalize ${
                  featured ? 'text-sm' : ''
               }`}
            >
               {post?.title}
            </h2>
            <p
               dangerouslySetInnerHTML={createMarkup()}
               className={`truncate-line-clamp dark:text-white text-gray-800 ${
                  featured ? 'text-sm' : ''
               }`}
            />
            <div className='flex items-center justify-between'>
               <p className='text-xs text-gray-500 dark:text-gray-300'>
                  {dateCreated}
               </p>
               <button
                  className='bg-fuchsia-600 text-white text-sm p-2 rounded-md font-semibold'
                  onClick={postDetails}
               >
                  Read More
               </button>
            </div>
         </div>
      </div>
   );
};

const memoizedPost = memo(Post);

export default memoizedPost;
