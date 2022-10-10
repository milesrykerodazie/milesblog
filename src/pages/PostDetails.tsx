import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailsDisplay from '../components/DetailsDisplay';
import { useAppSelector } from '../redux/app/store';
import {
   selectPostById,
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

   console.log('the post: ', post, id);

   return (
      <div>
         <DetailsDisplay post={post} />
      </div>
   );
};

export default PostDetails;
