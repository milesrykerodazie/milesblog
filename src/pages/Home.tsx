import Banner from '../components/Banner';
import Post from '../components/Post';
import { useGetPostsQuery } from '../redux/features/postApiSlice';
import { BiLoaderCircle } from 'react-icons/bi';
import useTitle from '../hooks/useTitle';

//get stuff from localeStorage
const useAuth = () => {
   let user: any;

   const userRole = localStorage.getItem('user');

   if (userRole) {
      user = JSON.parse(userRole);
   }

   if (user) {
      return {
         auth: true,
         role: user.role,
      };
   } else {
      return {
         auth: false,
         role: null,
      };
   }
};

const Home = () => {
   useTitle('Miles-Blog-Sample');
   const {
      data: postsData,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetPostsQuery('postList', {
      pollingInterval: 120000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
   });

   const { role } = useAuth();

   const filtered = postsData?.ids.filter(
      (filteredPost) =>
         (postsData as any)?.entities[filteredPost].suspended === false,
   );

   return (
      <div className=''>
         <Banner filtered={filtered} />

         {isLoading ? (
            <div className='flex items-center justify-center mt-24'>
               <BiLoaderCircle className='w-14 h-12 text-gray-500 animate-spin' />
            </div>
         ) : isError ? (
            <div className='flex items-center justify-center h-[calc(100vh-96px)]'>
               <p className='text-gray-800 dark:text-gray-200 lg:text-xl font-semibold duration-500 ease-in'>
                  {(error as any)?.data?.message}
               </p>
            </div>
         ) : isSuccess ? (
            <div>
               {role && role === 'Admin' ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-1'>
                     {postsData?.ids.map((postId) => (
                        <Post key={postId} postId={postId} />
                     ))}
                  </div>
               ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-1'>
                     {(filtered as any)?.map((postId: any) => (
                        <Post key={postId} postId={postId} />
                     ))}
                  </div>
               )}
            </div>
         ) : null}
      </div>
   );
};

export default Home;
