import React, { memo, useEffect, useRef, useState } from 'react';
import { AiFillDelete, AiFillEdit, AiFillLike } from 'react-icons/ai';
import { ImSpinner } from 'react-icons/im';
import { toast } from 'react-toastify';
import { format } from 'timeago.js';
import {
   useDeleteCommentMutation,
   useGetCommentRepliesQuery,
   useLikeCommentMutation,
   useReplyCommentMutation,
   useUpdateCommentMutation,
} from '../redux/features/commentsApiSlice';
import { useGetAllUsersQuery } from '../redux/features/usersApiSlice';

import Replies from './Replies';

const customId = 'custom-id-yes';

const Comments = ({ comment }: any) => {
   //like comment
   const [likeComment] = useLikeCommentMutation();

   //reply comment
   const [
      replyComment,
      {
         data: replyData,
         isLoading: replyLoading,
         isSuccess: replySuccess,
         isError: isReplyError,
         error: replyError,
      },
   ] = useReplyCommentMutation();

   //update comment
   const [
      updateComment,
      {
         data: updateData,
         isLoading: isUpdateLoading,
         isSuccess: isUpdateSuccess,
         isError: isUpdateError,
         error: updateError,
      },
   ] = useUpdateCommentMutation();

   // delete comment
   const [
      deleteComment,
      {
         data: deleteData,
         isLoading: isDeleteLoading,
         isSuccess: isDeleteSuccess,
         isError: isDeleteError,
         error: deleteError,
      },
   ] = useDeleteCommentMutation();

   const { replies } = useGetCommentRepliesQuery(`${(comment as any)?.id}`, {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      selectFromResult: ({ data }) => ({
         replies: data?.ids.map((id) => data?.entities[id]),
      }),
   });

   //getting the post owner details
   const { user }: any = useGetAllUsersQuery('usersList', {
      selectFromResult: ({ data }) => ({
         user: data?.entities[comment?.commentOwner],
      }),
   });

   const [likes, setLikes] = useState(comment?.likes?.length);
   const [isLiked, setIsLiked] = useState(false);
   const [replyText, setReplyText] = useState('');
   const [updateText, setUpdateText] = useState(comment?.comment);
   const [openReply, setOpenReply] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [openDelete, setOpenDelete] = useState(false);
   const [openReplies, setOpenReplies] = useState(false);

   //text area ref
   const textAreaRef = useRef(null);
   const resizeTextArea = () => {
      if (textAreaRef?.current) {
         (textAreaRef as any).current.style.height = 'auto';
         (textAreaRef as any).current.style.height =
            (textAreaRef as any).current.scrollHeight + 'px';
      }
   };
   useEffect(resizeTextArea, [replyText, updateText]);

   //for authomatically getting post owner on login
   let userDetail: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      userDetail = JSON.parse(userName);
   }

   const authEdit =
      userDetail?.username === comment?.commentOwner ||
      userDetail?.role === 'Admin';

   //checking if user has already liked a post
   useEffect(() => {
      setIsLiked(comment?.likes.includes(userDetail?.username));
   }, [userDetail?.username, comment?.likes]);

   const handleLike = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (userDetail === undefined) {
         return toast.warn('Login to like post.', {
            toastId: customId,
         });
      }
      if (comment?._id) {
         await likeComment({ id: comment?.id, username: userDetail?.username });
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

   useEffect(() => {
      if (replySuccess) {
         toast.success(replyData?.message, {
            toastId: customId,
         });

         setReplyText('');
         setOpenReply(false);
      }
      if (isUpdateSuccess) {
         toast.success(updateData?.message, {
            toastId: customId,
         });
         setOpenEdit(false);
      }
      if (isDeleteSuccess) {
         toast.success(deleteData?.message, {
            toastId: customId,
         });
         setOpenDelete(false);
      }
   }, [
      replySuccess,
      isUpdateSuccess,
      isDeleteSuccess,
      deleteData?.message,
      replyData?.message,
      updateData?.message,
   ]);

   const updateObject = {
      id: comment?.id,
      commentOwner: userDetail?.username,
      comment: updateText,
   };
   const replyObject = {
      commentId: comment?.id,
      replyOwner: userDetail?.username,
      reply: replyText,
   };
   const deleteObject = {
      id: comment?.id,
      commentOwner: userDetail?.username,
   };

   //handle open reply
   const handleOpenReply = (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (userDetail === undefined) {
         return toast.warn('You are not authorized.', {
            toastId: customId,
         });
      }
      setOpenReply((current: any) => !current);
   };

   //handle reply comment
   const handleReply = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (userDetail === undefined) {
         return toast.warn('You are not authorized.', {
            toastId: customId,
         });
      }
      if (replyText) {
         await replyComment(replyObject);
      }
   };

   //handle update
   const handleUpdate = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (userDetail === undefined) {
         return toast.warn('You are not authorized.', {
            toastId: customId,
         });
      }
      if (updateText) {
         await updateComment(updateObject);
      }
   };

   //delete comment
   const handleDelete = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (userDetail === undefined) {
         return toast.warn('You are not authorized.', {
            toastId: customId,
         });
      }

      await deleteComment(deleteObject);
   };

   return (
      <div className=''>
         <div className='flex space-x-2'>
            <img
               src={
                  user?.profilePicture?.url
                     ? user?.profilePicture?.url
                     : 'https://demofree.sirv.com/nope-not-here.jpg'
               }
               alt='userDetail-img'
               className='w-8 h-8 rounded-full object-cover ring-2 ring-fuchsia-600'
            />
            <div className='space-y-3 flex-1'>
               <div className='bg-gray-200 dark:bg-gray-800 p-2 rounded-md flex justify-between relative duration-500 ease-in'>
                  {isDeleteError && (
                     <p className='text-red-500 text-sm'>
                        {(deleteError as any)?.data?.message}
                     </p>
                  )}
                  <div>
                     <p className='capitalize underline text-sm text-gray-600 dark:text-gray-400 duration-500 ease-in'>
                        {user?.username}
                     </p>
                     <p className='text-sm text-gray-600 dark:text-gray-400 duration-500 ease-in'>
                        {comment?.comment}
                     </p>
                  </div>
                  <div className='flex flex-col space-y-2 px-2'>
                     <span className='text-xs text-gray-600 dark:text-gray-400 duration-500 ease-in'>
                        {format(comment?.createdAt)}
                     </span>
                     {userDetail && authEdit && (
                        <div className='flex items-center space-x-3'>
                           <AiFillDelete
                              className='text-lg text-red-600 cursor-pointer'
                              onClick={() =>
                                 setOpenDelete((current) => !current)
                              }
                           />
                           <AiFillEdit
                              className='text-lg text-gray-600 dark:text-gray-400 cursor-pointer duration-500 ease-in'
                              onClick={() => setOpenEdit((current) => !current)}
                           />
                        </div>
                     )}
                  </div>
                  {openDelete && (
                     <div className='absolute top-5 right-2  flex space-x-2 items-center bg-white dark:bg-gray-800 px-2 py-1 rounded-sm shadow-md shadow-fuchsia-500 duration-500 ease-in'>
                        <p className='text-fuchsia-500 text-sm flex items-center duration-500 ease-in'>
                           {isDeleteLoading ? (
                              <span className='flex items-center '>
                                 Deleting...
                                 <ImSpinner className='ml-1 animate-spin' />
                              </span>
                           ) : (
                              <span
                                 onClick={handleDelete}
                                 className='cursor-pointer'
                              >
                                 Delete
                              </span>
                           )}
                        </p>
                        <span className='text-gray-800 dark:text-gray-300 text-sm duration-500 ease-in'>
                           /
                        </span>
                        <p
                           className='text-gray-800 dark:text-gray-300 text-sm cursor-pointer duration-500 ease-in'
                           onClick={() => setOpenDelete((current) => !current)}
                        >
                           Cancel
                        </p>
                     </div>
                  )}
               </div>
               {openEdit && (
                  <div className=''>
                     {isUpdateError && (
                        <p className='text-red-500 text-sm'>
                           {(updateError as any)?.data?.message}
                        </p>
                     )}
                     <textarea
                        style={{ resize: 'none' }}
                        ref={textAreaRef}
                        rows={1}
                        value={updateText}
                        onChange={(e) => setUpdateText(e.target.value)}
                        placeholder='your reply...'
                        className='border border-gray-300 dark:border-gray-600 rounded-xl w-full px-2 py-3 outline-none focus:ring-1 focus:ring-fuchsia-400 dark:bg-black/90 text-gray-800 dark:text-gray-300 duration-500 ease-in placeholder:text-gray-400 dark:placeholder:text-gray-400/80 placeholder:text-xs overflow-hidden text-sm'
                     />
                     <div className='flex items-center space-x-3'>
                        <button
                           disabled={!updateText}
                           className={`text-white bg-fuchsia-600 p-2 rounded-md text-sm font-semibold ${
                              updateText
                                 ? 'cursor-pointer'
                                 : 'cursor-not-allowed opacity-40'
                           }`}
                           onClick={handleUpdate}
                        >
                           {isUpdateLoading ? (
                              <p className='flex items-center'>
                                 Updating...
                                 <ImSpinner className='w-6 h-6 text-slate-200 ml-2 animate-spin' />
                              </p>
                           ) : (
                              <p>Update comment</p>
                           )}
                        </button>
                        <p
                           className='text-gray-800 dark:text-gray-200 text-sm cursor-pointer duration-500 ease-in'
                           onClick={() => setOpenEdit(false)}
                        >
                           cancel
                        </p>
                     </div>
                  </div>
               )}
               <div className='flex items-center justify-between'>
                  <div className='flex space-x-2 text-sm items-center'>
                     <div className='flex space-x-2 items-center'>
                        <p className='text-gray-800 dark:text-gray-300 duration-500 ease-in'>
                           Like
                        </p>
                        <div className='flex space-x-2 items-center'>
                           <p className='cursor-pointer' onClick={handleLike}>
                              {isLiked ? (
                                 <AiFillLike className='w-6 h-6 text-fuchsia-600' />
                              ) : (
                                 <AiFillLike className='w-6 h-6 text-gray-600 dark:text-gray-300 duration-500 ease-in' />
                              )}
                           </p>
                           {likes > 0 && (
                              <span className='text-gray-800 dark:text-gray-300 duration-500 ease-in'>
                                 {likes}
                              </span>
                           )}
                        </div>
                     </div>
                     <span className='text-gray-800 dark:text-gray-300 duration-500 ease-in'>
                        |
                     </span>
                     <div
                        className='flex items-center space-x-2 cursor-pointer text-gray-800 dark:text-gray-300 duration-500 ease-in'
                        onClick={handleOpenReply}
                     >
                        <p>Reply</p>
                        <p>{comment?.replies.length}</p>
                     </div>
                  </div>
                  {(replies as any)?.length > 0 && (
                     <p
                        className='text-sm text-fuchsia-600 cursor-pointer'
                        onClick={() => setOpenReplies((current) => !current)}
                     >
                        See replies
                     </p>
                  )}
               </div>
               {openReply && (
                  <div className=''>
                     {isReplyError && (
                        <p className='text-red-500 text-sm'>
                           {(replyError as any)?.data?.message}
                        </p>
                     )}
                     <textarea
                        style={{ resize: 'none' }}
                        ref={textAreaRef}
                        rows={1}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder='your reply...'
                        className='border border-gray-300 dark:border-gray-600 rounded-xl w-full px-2 py-3 outline-none focus:ring-1 focus:ring-fuchsia-400 dark:bg-black/90 text-gray-800 dark:text-gray-300 duration-500 ease-in placeholder:text-gray-400 dark:placeholder:text-gray-400/80 placeholder:text-sm overflow-hidden text-sm'
                     />
                     <button
                        disabled={!replyText}
                        className={`text-white bg-fuchsia-600 p-2 rounded-md text-sm font-semibold ${
                           replyText
                              ? 'cursor-pointer'
                              : 'cursor-not-allowed opacity-40'
                        }`}
                        onClick={handleReply}
                     >
                        {replyLoading ? (
                           <p className='flex items-center'>
                              Replying...
                              <ImSpinner className='w-6 h-6 text-slate-200 ml-2 animate-spin' />
                           </p>
                        ) : (
                           <p>Reply</p>
                        )}
                     </button>
                  </div>
               )}
               {openReplies && (
                  <div>
                     {(replies as any)?.length > 0 && (
                        <div>
                           {replies?.map((reply: any) => (
                              <div key={reply?.id}>
                                 <Replies reply={reply} />
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

const memoizedComments = memo(Comments);

export default memoizedComments;
