import { AiFillDelete, AiFillEdit, AiFillLike } from 'react-icons/ai';
import { FaComments } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { memo } from 'react';

const DetailsDisplay = ({ post }: any) => {
   //use navigation
   const navigate = useNavigate();
   //for getting the html form of the post
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

   //for authomatically getting post owner on login
   let user: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      user = JSON.parse(userName);
   }

   //link to edit post
   // const editPost = () => navigate(`admin/edit/${post?.postSlug}`);
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
                  className='object-cover w-full h-[620px] rounded-md mb-4'
               />
            )}
         </div>
         <div className='w-[80%] mx-auto'>
            <div className='mb-4 flex items-center justify-between'>
               <div>
                  <div>post owner details</div>
                  <p className='text-sm text-gray-600'>{dateCreated}</p>
                  {user && user?.username === post?.postOwner && (
                     <div className='flex items-center space-x-3'>
                        <AiFillDelete className='text-lg text-red-600' />
                        <Link to={`/admin/edit/${post?.postSlug}`}>
                           <AiFillEdit className='text-lg text-gray-700' />
                        </Link>
                     </div>
                  )}
               </div>
               <div className='flex items-center space-x-10'>
                  <div className='flex items-center space-x-2'>
                     {/* work on the likes, change from id to username */}
                     <AiFillLike className='w-6 h-6 text-gray-600' />
                     {post?.likes.length > 0 && (
                        <span>{post?.likes.length}</span>
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
               <div>
                  <textarea
                     rows={4}
                     placeholder='your comment.....'
                     className='border border-gray-300 dark:border-gray-600 rounded-sm w-full px-2 py-1 outline-none focus:ring-1 focus:ring-fuchsia-400 dark:bg-black/90 text-gray-800 dark:text-gray-300 duration-500 ease-in placeholder:text-gray-400 dark:placeholder:text-gray-400/80 placeholder:text-xs'
                  />
                  <div className='flex items-center justify-end'>
                     <button className='text-white bg-fuchsia-600 p-2 rounded-sm font-semibold'>
                        comment
                     </button>
                  </div>
                  <div className='text-sm'>display comments here</div>
               </div>
            </div>
         </div>
      </div>
   );
};
const memoizedDetailsDisplay = memo(DetailsDisplay);

export default memoizedDetailsDisplay;
