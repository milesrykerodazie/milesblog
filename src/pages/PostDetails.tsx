import { useParams, useOutletContext } from 'react-router-dom';
import DetailsDisplay from '../components/DetailsDisplay';

import { useGetPostsQuery } from '../redux/features/postApiSlice';

const PostDetails = () => {
   //checking params
   const { id }: any = useParams();

   const { post } = useGetPostsQuery('postList', {
      selectFromResult: ({ data }) => ({
         post: data?.entities[id],
      }),
   });

   return (
      <div>
         <DetailsDisplay post={post} />
      </div>
   );
};

export default PostDetails;
