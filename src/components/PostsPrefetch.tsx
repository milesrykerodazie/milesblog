import { useEffect } from 'react';
import { useAppDispatch } from '../redux/app/store';
import { Outlet } from 'react-router-dom';
import { postApiSlice } from '../redux/features/postApiSlice';
import { usersApiSlice } from '../redux/features/usersApiSlice';

const PostsPrefetch = () => {
   //setting the dispatch
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(
         postApiSlice.util.prefetch('getPosts', 'postList', {
            force: true,
         }),
      );
      dispatch(
         usersApiSlice.util.prefetch('getAllUsers', 'usersList', {
            force: true,
         }),
      );

      // eslint-disable-next-line
   }, []);
   return <Outlet />;
};

export default PostsPrefetch;
