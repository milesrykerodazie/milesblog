import React from 'react';
import { useGetPostsQuery } from '../redux/features/postApiSlice';
import { memo } from 'react';

const Post = ({ postId }: any) => {
   const { post }: any = useGetPostsQuery('postList', {
      selectFromResult: ({ data }) => ({
         post: data?.entities[postId],
      }),
   });

   //for getting the html form of the post
   const getText = (html: string) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent;
   };

   function createMarkup() {
      return {
         __html: post?.post,
      };
   }
   return (
      <div>
         <h2>{post?.title}</h2>
         <p dangerouslySetInnerHTML={createMarkup()} />
      </div>
   );
};

const memoizedPost = memo(Post);

export default memoizedPost;
