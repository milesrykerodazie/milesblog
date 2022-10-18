import { useParams } from 'react-router-dom';
import DetailsDisplay from '../components/DetailsDisplay';
import { useGetPostsQuery } from '../redux/features/postApiSlice';
import useTitle from '../hooks/useTitle';

const PostDetails = () => {
   //checking params
   const { id }: any = useParams();
   useTitle(id);
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
