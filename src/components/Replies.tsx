import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { format } from 'timeago.js';

const Replies = ({ reply }: any) => {
   return (
      <div>
         <div className='flex space-x-2'>
            <img
               src={reply?.userImage}
               alt='user-img'
               className='w-8 h-8 rounded-full object-cover'
            />
            <div className='space-y-2 flex-1'>
               <div className='bg-gray-200 p-2 rounded-md flex justify-between'>
                  <div>
                     <p className='capitalize underline text-sm'>
                        {reply?.username}
                     </p>
                     <p className='text-sm'>{reply?.reply}</p>
                  </div>
                  <span className='text-xs'>{format(reply?.createdAt)}</span>
               </div>
               <div className='flex space-x-2 text-sm items-center'>
                  <div className='flex space-x-2 items-center'>
                     <p>Like</p>
                     <div className='flex space-x-2 items-center'>
                        <AiFillLike className='w-6 h-6 text-fuchsia-600' />
                        <p>{reply?.likes.length}</p>
                     </div>
                  </div>
                  <span>|</span>
                  <div className='flex items-center space-x-2'>
                     <p>Reply</p>
                     <p>{reply?.replies.length}</p>
                  </div>
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

export default Replies;
