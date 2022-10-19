import { useParams } from 'react-router-dom';
import DetailsDisplay from '../components/DetailsDisplay';
import { useGetPostsQuery } from '../redux/features/postApiSlice';
import useTitle from '../hooks/useTitle';
import { useGetAllUsersQuery } from '../redux/features/usersApiSlice';

const PostDetails = () => {
   //checking params
   const { id }: any = useParams();
   useTitle(id);
   const { post } = useGetPostsQuery('postList', {
      selectFromResult: ({ data }) => ({
         post: data?.entities[id],
      }),
   });

   //for authomatically getting post owner on login
   let username: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      username = JSON.parse(userName);
   }

   const { user }: any = useGetAllUsersQuery('usersList', {
      selectFromResult: ({ data }) => ({
         user: data?.entities[username?.username],
      }),
   });

   return (
      <div>
         <DetailsDisplay post={post} authUser={user} />
      </div>
   );
};

export default PostDetails;
