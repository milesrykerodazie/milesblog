import React, { useEffect, useState } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { format } from 'timeago.js';
import {
   useGetCommentRepliesQuery,
   useLikeCommentMutation,
} from '../redux/features/commentsApiSlice';

import Replies from './Replies';

const customId = 'custom-id-yes';

const Comments = ({ comment }: any) => {
   const { replies } = useGetCommentRepliesQuery(`${(comment as any)?.id}`, {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      selectFromResult: ({ data }) => ({
         replies: data?.ids.map((id) => data?.entities[id]),
      }),
   });

   //like comment
   const [
      likeComment,
      { data: likeData, isLoading, isSuccess, isError, error },
   ] = useLikeCommentMutation();

   const [likes, setLikes] = useState(comment?.likes?.length);
   const [isLiked, setIsLiked] = useState(false);

   //for authomatically getting post owner on login
   let user: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      user = JSON.parse(userName);
   }

   //checking if user has already liked a post
   useEffect(() => {
      setIsLiked(comment?.likes.includes(user?.username));
   }, [user?.username, comment?.likes]);

   const handleLike = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (user === undefined) {
         return toast.warn('Login to like post.', {
            toastId: customId,
         });
      }
      if (comment?._id) {
         await likeComment({ id: comment?.id, username: user?.username });
      }
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked((current: any) => !current);

      if (!isLiked) {
         toast.success('Liked', {
            toastId: customId,
         });
      } else {
         toast.success('Unliked', {
            toastId: customId,
         });
      }
   };

   return (
      <div className=''>
         <div className='flex space-x-2'>
            <img
               src={
                  comment?.userImage
                     ? comment?.userImage
                     : 'https://demofree.sirv.com/nope-not-here.jpg'
               }
               alt='user-img'
               className='w-8 h-8 rounded-full object-cover'
            />
            <div className='space-y-3 flex-1'>
               <div className='bg-gray-200 p-2 rounded-md flex justify-between'>
                  <div>
                     <p className='capitalize underline text-sm'>
                        {comment?.username}
                     </p>
                     <p className='text-sm'>{comment?.comment}</p>
                  </div>
                  <span className='text-xs'>{format(comment?.createdAt)}</span>
               </div>
               <div className='flex space-x-2 text-sm items-center'>
                  <div className='flex space-x-2 items-center'>
                     <p>Like</p>
                     <div className='flex space-x-2 items-center'>
                        <p className='cursor-pointer' onClick={handleLike}>
                           {isLiked ? (
                              <AiFillLike className='w-6 h-6 text-fuchsia-600' />
                           ) : (
                              <AiFillLike className='w-6 h-6 text-gray-600 dark:text-gray-300' />
                           )}
                        </p>
                        {likes > 0 && (
                           <span className='text-gray-800 dark:text-gray-300'>
                              {likes}
                           </span>
                        )}
                     </div>
                  </div>
                  <span>|</span>
                  <div className='flex items-center space-x-2'>
                     <p>Reply</p>
                     <p>{comment?.replies.length}</p>
                  </div>
               </div>
               <div>
                  {(replies as any)?.length > 0 && (
                     <div>
                        {replies?.map((reply: any) => (
                           <Replies key={reply?.id} reply={reply} />
                        ))}
                     </div>
                  )}
               </div>
               {/* <input
                  type='text'
                  aria-multiline
                  className='outline-none border p-2 w-full'
               /> */}
            </div>
         </div>
      </div>
   );
};

export default Comments;
