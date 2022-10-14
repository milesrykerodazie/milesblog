import { memo } from 'react';
import { useGetPostsQuery } from '../redux/features/postApiSlice';

const Banner = ({ filtered }: any) => {
   const { post }: any = useGetPostsQuery('postList', {
      selectFromResult: ({ data }) => ({
         post: data?.entities[filtered[0]],
      }),
   });

   return (
      <div className='relative w-full'>
         {post?.image?.url && (
            <img
               src={post?.image.url}
               alt='post_img'
               className='object-cover w-full h-52 lg:rounded-md'
            />
         )}
         <div className='absolute bottom-10 left-5 space-y-3'>
            <p className='text-2xl font-bold text-gray-800 truncate'>
               {post?.title}
            </p>
            <p className='font-semibold text-gray-800'>
               Category:{' '}
               <span className=' text-gray-800 capitalize tracking-wider'>
                  {post?.category}
               </span>
            </p>
         </div>
         <p className='absolute bottom-1 right-4 text-sm text-fuchsia-600 font-semibold tracking-wider animate-pulse'>
            latest post
         </p>
      </div>
   );
};

const memoizedBanner = memo(Banner);
export default memoizedBanner;
