import React from 'react';
import { useAppSelector } from '../redux/app/store';
import { selectCurrentToken } from '../redux/features/auth/authSlice';

const BlogPage = () => {
   const token = useAppSelector(selectCurrentToken);
   console.log('the token response: => ', token);
   return <div className='text-white'>BlogPage</div>;
};

export default BlogPage;
