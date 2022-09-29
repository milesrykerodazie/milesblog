import React from 'react';
import { useAppSelector } from '../redux/app/store';
import { selectCurrentToken } from '../redux/features/auth/authSlice';

const BlogPage = () => {
   const token = useAppSelector(selectCurrentToken);

   return <div className='text-black'>BlogPage</div>;
};

export default BlogPage;
