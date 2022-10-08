import React, { useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import EditPostForm from '../components/forms/EditPostForm';
import { useGetPostsQuery } from '../redux/features/postApiSlice';

const EditPost = () => {
   //checking params
   const { id }: any = useParams();

   const { post }: any = useGetPostsQuery('postList', {
      selectFromResult: ({ data }) => ({
         post: data?.entities[id],
      }),
   });

   if (!post)
      return (
         <div className='flex items-center justify-center mt-24'>
            <BiLoaderCircle className='w-14 h-12 text-gray-500 animate-spin' />
         </div>
      );

   const postContent = <EditPostForm post={post} />;

   return postContent;
};

export default EditPost;
