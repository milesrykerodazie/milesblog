import { AiFillDelete, AiFillEdit, AiFillLike } from 'react-icons/ai';
import { FaComments } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import React, { memo, useEffect, useState, useRef } from 'react';
import {
   useDeletePostMutation,
   useLikePostMutation,
} from '../redux/features/postApiSlice';
import { toast } from 'react-toastify';
import { ImSpinner } from 'react-icons/im';
import Comments from './Comments';
import { usePostCommentMutation } from '../redux/features/commentsApiSlice';

const customId = 'custom-id-yes';

const DetailsDisplay = ({ post, comments }: any) => {
   //like post
   const [likePost, { data: likeData, isLoading, isSuccess, isError, error }] =
      useLikePostMutation();

   //delete post
   const [
      deletePost,
      {
         data: deleteData,
         isLoading: deleteLoading,
         isSuccess: deleteSuccess,
         isError: isDeleteError,
         error: deleteError,
      },
   ] = useDeletePostMutation();
   //comment on post
   const [
      postComment,
      {
         data: commentData,
         isLoading: commentLoading,
         isSuccess: commentSuccess,
         isError: isCommentError,
         error: commentError,
      },
   ] = usePostCommentMutation();

   //use navigation
   const navigate = useNavigate();
   //for getting the html form of the post
   function createMarkup() {
      return {
         __html: post?.post,
      };
   }

   //like states here
   const [likes, setLikes] = useState(post?.likes?.length);
   const [isLiked, setIsLiked] = useState(false);
   const [openDelete, setOpenDelete] = useState(false);
   const [commentText, setCommentText] = useState('');

   //text area ref
   const textAreaRef = useRef(null);
   const resizeTextArea = () => {
      if (textAreaRef?.current) {
         (textAreaRef as any).current.style.height = 'auto';
         (textAreaRef as any).current.style.height =
            (textAreaRef as any).current.scrollHeight + 'px';
      }
   };
   useEffect(resizeTextArea, [commentText]);

   //formatting date
   const dateCreated = new Date(post?.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
   });

   //for authomatically getting post owner on login
   let user: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      user = JSON.parse(userName);
   }

   console.log('user :', user);

   //checking if user has already liked a post
   useEffect(() => {
      setIsLiked(post?.likes.includes(user?.username));
   }, [user?.username, post?.likes]);

   const handleLike = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (user === undefined) {
         return toast.warn('Login to like post.', {
            toastId: customId,
         });
      }
      if (post?.postSlug) {
         await likePost({ id: post?.postSlug, username: user?.username });
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

   console.log('post details => ', post);

   //handle delete post
   const handleDelete = async (e: React.SyntheticEvent) => {
      await deletePost({
         id: post?._id,
         postOwner: JSON.stringify(post?.postOwner),
      });
   };

   //getting the delete data
   useEffect(() => {
      if (deleteSuccess) {
         toast.success(deleteData?.message, {
            toastId: customId,
         });
         navigate('/');
      }
      if (commentSuccess) {
         toast.success(commentData?.message, {
            toastId: customId,
         });
         setCommentText('');
      }
   }, [deleteSuccess, commentSuccess, navigate]);

   console.log('deleted post: =>', deleteData?.deletedPost);

   const commentObject = {
      postId: post?._id,
      commentOwner: user?.username,
      comment: commentText,
   };

   //comment on post
   const handleComment = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (commentText) {
         await postComment(commentObject);
      }
   };

   return (
      <div>
         <h1 className='text-center text-3xl font-bold capitalize py-2'>
            {post?.title}
         </h1>
         <div className='w-full mx-auto'>
            {post?.image.url && (
               <img
                  src={post?.image.url}
                  alt='post_img'
                  className='object-cover w-full md:h-[620px] h-[420px] rounded-md mb-4'
               />
            )}
         </div>
         <div className='w-[80%] mx-auto'>
            <div className='mb-4 flex flex-col md:flex-row md:items-center md:justify-between'>
               <div>
                  <div className='text-gray-800 dark:text-gray-300'>
                     post owner details
                  </div>
                  <div className='relative'>
                     <div className='flex items-center space-x-4 '>
                        <p className='text-sm text-gray-600'>{dateCreated}</p>
                        {user && user?.username === post?.postOwner && (
                           <div className='flex items-center space-x-3'>
                              <AiFillDelete
                                 className='text-lg text-red-600 cursor-pointer'
                                 onClick={() =>
                                    setOpenDelete((current) => !current)
                                 }
                              />
                              <Link to={`/admin/edit/${post?.postSlug}`}>
                                 <AiFillEdit className='text-lg text-gray-700 cursor-pointer' />
                              </Link>
                           </div>
                        )}
                     </div>
                     {openDelete && (
                        <div className='absolute top-6 flex space-x-2 items-center bg-white dark:bg-gray-800 px-2 py-1 rounded-sm shadow-md shadow-fuchsia-500'>
                           <p className='text-fuchsia-500 text-sm flex items-center duration-500 ease-in'>
                              {deleteLoading ? (
                                 <span className='flex items-baseline'>
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
                           <span className='text-gray-800 dark:text-gray-300 text-sm'>
                              /
                           </span>
                           <p
                              className='text-gray-800 dark:text-gray-300 text-sm cursor-pointer'
                              onClick={() =>
                                 setOpenDelete((current) => !current)
                              }
                           >
                              Cancel
                           </p>
                        </div>
                     )}
                  </div>
               </div>
               <div className='flex items-center space-x-10'>
                  <div className='flex items-center space-x-2'>
                     {/* work on the likes, change from id to username */}
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
                  <div>
                     <p className='text-lg font-semibold text-gray-700'>
                        Category:{' '}
                        <span className='capitalize'>{post?.category}</span>
                     </p>
                     <div className='flex space-x-2 items-center'>
                        <p>Tags:</p>
                        <p className='flex space-x-2'>
                           {post?.tags.map((tag: any, index: any) => (
                              <span
                                 key={index}
                                 className='capitalize text-sm text-gray-600'
                              >
                                 {tag}
                              </span>
                           ))}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            <hr className=' mb-5 border-gray-300 dark:border-gray-600' />
            <p
               dangerouslySetInnerHTML={createMarkup()}
               className='dark:text-white text-gray-800 text-justify lg:text-lg'
            />
            {/* comment section */}
            <div className='space-y-2'>
               <div className='flex items-center space-x-2'>
                  {/* work on the likes, change from id to username */}
                  <p className='text-gray-700 font-semibold'>Comments</p>
                  <FaComments className='w-6 h-6 text-gray-600' />
                  {post?.comments.length > 0 && (
                     <span>{post?.comments.length}</span>
                  )}
               </div>
               <div className=''>
                  {user !== undefined && (
                     <div>
                        {isCommentError && (
                           <p className='text-sm text-red-500'>
                              {(commentError as any)?.data?.message}
                           </p>
                        )}
                        <textarea
                           style={{ resize: 'none' }}
                           ref={textAreaRef}
                           rows={1}
                           value={commentText}
                           onChange={(e) => setCommentText(e.target.value)}
                           placeholder='your comment.....'
                           className='border border-gray-300 dark:border-gray-600 rounded-xl w-full px-2 py-3 outline-none focus:ring-1 focus:ring-fuchsia-400 dark:bg-black/90 text-gray-800 dark:text-gray-300 duration-500 ease-in placeholder:text-gray-400 dark:placeholder:text-gray-400/80 placeholder:text-xs overflow-hidden'
                        />
                        <div className='flex items-center justify-end'>
                           <button
                              disabled={!commentText}
                              className={`text-white bg-fuchsia-600 p-2 rounded-sm font-semibold ${
                                 commentText
                                    ? 'cursor-pointer'
                                    : 'cursor-not-allowed opacity-40'
                              }`}
                              onClick={handleComment}
                           >
                              {commentLoading ? (
                                 <p className='flex items-center'>
                                    Comenting...
                                    <ImSpinner className='w-6 h-6 text-slate-200 ml-2 animate-spin' />
                                 </p>
                              ) : (
                                 <p>Comment</p>
                              )}
                           </button>
                        </div>
                     </div>
                  )}

                  <div className='pt-3'>
                     {comments?.length > 0 ? (
                        <div>
                           {comments?.map((comment: any) => (
                              <div key={comment?.id}>
                                 <Comments
                                    key={comment?.id}
                                    comment={comment}
                                 />
                              </div>
                           ))}
                        </div>
                     ) : (
                        <p>No comments.</p>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
const memoizedDetailsDisplay = memo(DetailsDisplay);

export default memoizedDetailsDisplay;
