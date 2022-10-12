import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailsDisplay from '../components/DetailsDisplay';
import { useAppSelector } from '../redux/app/store';

import {
   selectPostById,
   useGetPostCommentsQuery,
   useGetPostsQuery,
} from '../redux/features/postApiSlice';

const PostDetails = () => {
   //checking params
   const { id }: any = useParams();

   const { post } = useGetPostsQuery('postList', {
      selectFromResult: ({ data }) => ({
         post: data?.entities[id],
      }),
   });

   const { comments } = useGetPostCommentsQuery(`${(post as any)?._id}`, {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      selectFromResult: ({ data }) => ({
         comments: data?.ids.map((id) => data?.entities[id]),
      }),
   });

   // getting the comments of this post

   console.log('List of comments. => ', comments);

   return (
      <div>
         <DetailsDisplay post={post} comments={comments} />
      </div>
   );
};

export default PostDetails;
