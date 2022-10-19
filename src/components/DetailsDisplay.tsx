import { AiFillDelete, AiFillEdit, AiFillLike } from 'react-icons/ai';
import { FaComments } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import React, { memo, useEffect, useState, useRef } from 'react';
import {
   useDeletePostMutation,
   useGetPostCommentsQuery,
   useLikePostMutation,
} from '../redux/features/postApiSlice';
import { toast } from 'react-toastify';
import { ImSpinner } from 'react-icons/im';
import Comments from './Comments';
import { usePostCommentMutation } from '../redux/features/commentsApiSlice';
import DOMPurify from 'dompurify';
import { useGetAllUsersQuery } from '../redux/features/usersApiSlice';

const customId = 'custom-id-yes';

const DetailsDisplay = ({ post, authUser }: any) => {
   //like post
   const [likePost] = useLikePostMutation();

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

   // getting the comments of this post
   const { comments } = useGetPostCommentsQuery(`${(post as any)?.id}`, {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      selectFromResult: ({ data }) => ({
         comments: data?.ids.map((id) => data?.entities[id]),
      }),
   });

   //getting the post owner details
   const { user }: any = useGetAllUsersQuery('usersList', {
      selectFromResult: ({ data }) => ({
         user: data?.entities[post?.postOwner],
      }),
   });

   //sending post owner to localStorage
   useEffect(() => {
      if (post?.postOwner) {
         localStorage.setItem('po', JSON.stringify({ user: post?.postOwner }));
      }
   }, [post?.postOwner]);

   const safePost = DOMPurify.sanitize(post?.post);

   //use navigation
   const navigate = useNavigate();
   //for getting the html form of the post
   function createMarkup() {
      return {
         __html: safePost,
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
   let username: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      username = JSON.parse(userName);
   }

   const authEdit =
      username?.username === post?.postOwner || username?.role === 'Admin';

   //checking if user has already liked a post
   useEffect(() => {
      setIsLiked(post?.likes.includes(username?.username));
   }, [username?.username, post?.likes]);

   const handleLike = async (e: React.SyntheticEvent) => {
      e.preventDefault();

      if (username === undefined) {
         return toast.warn('Login to like post.', {
            toastId: customId,
         });
      }
      if (post?.postSlug) {
         await likePost({ id: post?.postSlug, username: username?.username });
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
      if (isDeleteError) {
         toast.error((deleteError as any)?.data?.message, {
            toastId: customId,
         });
      }
   }, [
      deleteSuccess,
      commentSuccess,
      navigate,
      deleteData?.message,
      commentData?.message,
      deleteError,
      isDeleteError,
   ]);

   const commentObject = {
      postId: post?._id,
      commentOwner: username?.username,
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
         <h1 className='text-center text-xl lg:text-3xl font-bold capitalize py-2 text-gray-600 dark:text-gray-400'>
            {post?.title}
         </h1>
         <div className='w-full mx-auto'>
            {post?.image.url && (
               <img
                  src={post?.image.url}
                  alt='post_img'
                  className='object-cover w-full md:h-[500px] h-[300px] rounded-md mb-4'
               />
            )}
         </div>
         <div className='w-[90%] lg:w-[80%] mx-auto'>
            <div className='mb-4 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between'>
               <div>
                  <Link to={`/author/${post?.postOwner}`}>
                     <div className='flex items-center space-x-3'>
                        <img
                           src={
                              user?.profilePicture?.url
                                 ? user?.profilePicture?.url
                                 : 'https://demofree.sirv.com/nope-not-here.jpg'
                           }
                           alt=''
                           className='w-8 h-8 rounded-full object-cover ring-2 ring-fuchsia-600'
                        />

                        <p className='text-gray-800 dark:text-gray-300'>
                           {user?.fullName}
                        </p>
                     </div>
                  </Link>
                  <div className='relative'>
                     <div className='flex items-center justify-between space-x-4 '>
                        <p className='text-xs lg:text-sm text-gray-600'>
                           {dateCreated}
                        </p>

                        {username && authEdit && (
                           <div className='flex items-center space-x-3'>
                              <AiFillDelete
                                 className='text-sm lg:text-lg text-red-600 cursor-pointer'
                                 onClick={() =>
                                    setOpenDelete((current) => !current)
                                 }
                              />
                              <Link to={`/edit-post/${post?.postSlug}`}>
                                 <AiFillEdit className='text-sm lg:text-lg text-gray-700 cursor-pointer' />
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
               <div className='flex items-center justify-between space-x-10'>
                  <div className='flex space-x-2 items-center'>
                     <p className='cursor-pointer' onClick={handleLike}>
                        {isLiked ? (
                           <AiFillLike className='w-5 h-5 text-fuchsia-600' />
                        ) : (
                           <AiFillLike className='w-5 h-5 text-gray-600 dark:text-gray-300 duration-500 ease-in' />
                        )}
                     </p>

                     <span className='text-gray-800 dark:text-gray-300 duration-500 ease-in text-sm'>
                        {likes}
                     </span>
                  </div>
                  <div className='flex lg:flex-row lg:space-x-3 flex-col space-y-2 lg:space-y-0'>
                     <p className='text-sm lg:text-base font-semibold text-gray-700 dark:text-gray-400'>
                        Category:{' '}
                        <span className='capitalize text-sm lg:text-base'>
                           {post?.category}
                        </span>
                     </p>
                     <div className='flex space-x-2 items-center text-gray-700 dark:text-gray-400 text-sm lg:text-base -mt-1 lg:mt-0'>
                        <p>Tags:</p>
                        <p className='flex space-x-1 items-center'>
                           {post?.tags.map((tag: any, index: any) => (
                              <span key={index} className='capitalize text-sm '>
                                 {tag}
                              </span>
                           ))}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            <hr className=' mb-5 border-gray-300 dark:border-gray-600 duration-500 ease-in' />
            <p
               dangerouslySetInnerHTML={createMarkup()}
               className=' dark:text-white text-gray-800 text-justify pb-3 duration-500 ease-in'
            />
            {/* comment section */}
            <div className='space-y-2'>
               <div className='flex items-center space-x-2'>
                  {/* work on the likes, change from id to username */}
                  <p className='text-gray-700 font-semibold dark:text-gray-400 text-sm lg:text-base'>
                     Comments
                  </p>
                  <FaComments className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                  {post?.comments.length > 0 && (
                     <span className='text-gray-800 dark:text-gray-300 text-sm lg:text-base'>
                        {post?.comments.length}
                     </span>
                  )}
               </div>
               <div className=''>
                  {username !== undefined && (
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
                           placeholder={
                              authUser?.verified
                                 ? 'your comment...'
                                 : 'verify your mail to comment'
                           }
                           disabled={!authUser?.verified}
                           className='border border-gray-300 dark:border-gray-600 rounded-xl w-full px-2 py-3 outline-none focus:ring-1 focus:ring-fuchsia-400 dark:bg-black/90 text-gray-800 dark:text-gray-300 duration-500 ease-in placeholder:text-gray-400 dark:placeholder:text-gray-400/80 placeholder:text-sm overflow-hidden'
                        />
                        <div className='flex items-center justify-end'>
                           <button
                              disabled={!commentText}
                              className={`text-white bg-fuchsia-600 p-2 rounded-sm text-sm lg:text-base font-semibold ${
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
                     {(comments as any)?.length > 0 ? (
                        <div>
                           {comments?.map((comment: any) => (
                              <div key={comment?.id}>
                                 <Comments comment={comment} />
                              </div>
                           ))}
                        </div>
                     ) : (
                        <p className='text-center text-gray-600 dark:text-gray-400'>
                           No comments.
                        </p>
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
