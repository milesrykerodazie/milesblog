import { Link } from 'react-router-dom';
import Post from '../components/Post';
import { useGetPostsQuery } from '../redux/features/postApiSlice';

const Home = () => {
   const {
      data: postsData,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetPostsQuery('postList', {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
   });

   return (
      <div>
         {isLoading ? (
            <p>Loading...</p>
         ) : isError ? (
            <div>{(error as any)?.data?.message}</div>
         ) : isSuccess ? (
            <div>
               {' '}
               {postsData?.ids.map((postId) => (
                  <Post key={postId} postId={postId} />
               ))}
            </div>
         ) : null}
      </div>
   );
};

export default Home;
