import React, { useEffect, useRef, useState } from 'react';
import { AiFillDelete, AiFillEdit, AiFillLike } from 'react-icons/ai';
import { ImSpinner } from 'react-icons/im';
import { toast } from 'react-toastify';
import { format } from 'timeago.js';
import { useNavigate, useLocation } from 'react-router-dom';
import {
   useDeleteReplyMutation,
   useLikeReplyMutation,
   useUpdateReplyMutation,
} from '../redux/features/commentsApiSlice';

const customId = 'custom-id-yes';
const Replies = ({ reply }: any) => {
   //like reply
   const [likeReply, { data: likeData, isLoading, isSuccess, isError, error }] =
      useLikeReplyMutation();

   //update reply
   const [
      updateReply,
      {
         data: updateData,
         isLoading: isUpdateLoading,
         isSuccess: isUpdateSuccess,
         isError: isUpdateError,
         error: updateError,
      },
   ] = useUpdateReplyMutation();

   //delete reply
   const [
      deleteReply,
      {
         data: deleteData,
         isLoading: isDeleteLoading,
         isSuccess: isDeleteSuccess,
         isError: isDeleteError,
         error: deleteError,
      },
   ] = useDeleteReplyMutation();

   const [likes, setLikes] = useState(reply?.likes?.length);
   const [isLiked, setIsLiked] = useState(false);
   const [updateText, setUpdateText] = useState(reply?.reply);
   const [openEdit, setOpenEdit] = useState(false);
   const [openDelete, setOpenDelete] = useState(false);

   //text area ref
   const textAreaRef = useRef(null);
   const resizeTextArea = () => {
      if (textAreaRef?.current) {
         (textAreaRef as any).current.style.height = 'auto';
         (textAreaRef as any).current.style.height =
            (textAreaRef as any).current.scrollHeight + 'px';
      }
   };
   useEffect(resizeTextArea, [updateText]);

   //for authomatically getting post owner on login
   let user: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      user = JSON.parse(userName);
   }

   //checking if user has already liked a post
   useEffect(() => {
      setIsLiked(reply?.likes.includes(user?.username));
   }, [user?.username, reply?.likes]);

   const handleLike = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (user === undefined) {
         return toast.warn('Login to like post.', {
            toastId: customId,
         });
      }
      if (reply?._id) {
         await likeReply({ id: reply?.id, username: user?.username });
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
   }, [isUpdateSuccess, isDeleteSuccess]);

   const updateObject = {
      id: reply?.id,
      replyOwner: user?.username,
      reply: updateText,
   };

   const deleteObject = {
      id: reply?.id,
      commentId: reply?.commentId,
      replyOwner: user?.username,
   };

   //handle update
   const handleUpdate = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (updateText) {
         await updateReply(updateObject);
      }
   };

   //handle delete
   // const handleDelete = async (e: React.SyntheticEvent) => {
   //    await deleteReply(deleteObject);
   // };

   const handleDelete = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
         await deleteReply(deleteObject).unwrap();
      } catch (err) {
         console.error('Failed to delete the reply', err);
      }
   };

   return (
      <div>
         <div className='flex space-x-2'>
            <img
               src={
                  reply?.userImage
                     ? reply?.userImage
                     : 'https://demofree.sirv.com/nope-not-here.jpg'
               }
               alt='user-img'
               className='w-8 h-8 rounded-full object-cover ring-2 ring-fuchsia-600'
            />
            <div className='space-y-3 flex-1'>
               <div className='bg-gray-200 p-2 rounded-md flex justify-between relative dark:bg-gray-800 duration-500 ease-in'>
                  <div>
                     <p className='capitalize underline text-sm text-gray-600 dark:text-gray-400 duration-500 ease-in'>
                        {reply?.username}
                     </p>
                     <p className='text-sm text-gray-600 dark:text-gray-400 duration-500 ease-in'>
                        {reply?.reply}
                     </p>
                  </div>
                  <div className='flex flex-col space-y-2 px-2'>
                     <span className='text-xs text-gray-600 dark:text-gray-400 duration-500 ease-in'>
                        {format(reply?.createdAt)}
                     </span>
                     {user && user?.username === reply?.replyOwner && (
                        <div className='flex items-center space-x-3'>
                           <AiFillDelete
                              className='text-lg text-red-600 cursor-pointer'
                              onClick={() =>
                                 setOpenDelete((current) => !current)
                              }
                           />
                           <AiFillEdit
                              className='text-lg text-gray-700 cursor-pointer dark:text-gray-400  duration-500 ease-in'
                              onClick={() => setOpenEdit((current) => !current)}
                           />
                        </div>
                     )}
                  </div>
                  {openDelete && (
                     <div className='absolute top-2 left-1/2 flex space-x-2 items-center bg-white dark:bg-gray-800 px-2 py-1 rounded-sm shadow-md shadow-fuchsia-500 duration-500 ease-in'>
                        <p className='text-fuchsia-500 text-sm flex items-center duration-500 ease-in'>
                           {isDeleteLoading ? (
                              <span className='flex items-center'>
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
                        className='border border-gray-300 dark:border-gray-600 rounded-xl w-full px-2 py-3 outline-none focus:ring-1 focus:ring-fuchsia-400 dark:bg-black/90 text-gray-800 dark:text-gray-300 duration-500 ease-in placeholder:text-gray-400 dark:placeholder:text-gray-400/80 placeholder:text-sm overflow-hidden text-sm'
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
                              <p>Update reply</p>
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
                  {/* <span className='text-gray-800 dark:text-gray-300 duration-500 ease-in'>
                     |
                  </span>
                  <div className='flex items-center space-x-2 cursor-pointer text-gray-800 dark:text-gray-300 duration-500 ease-in'>
                     <p>Reply</p>
                     <p>{reply?.replies.length}</p>
                  </div> */}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Replies;
