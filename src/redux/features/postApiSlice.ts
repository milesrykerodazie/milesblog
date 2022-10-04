import { apiSlice } from '../app/api/apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

export const postApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      createPost: builder.mutation({
         query: (postValues) => ({
            url: '/new-post',
            method: 'POST',
            body: {
               ...postValues,
            },
         }),
         invalidatesTags: [{ type: 'Post', id: 'List' }],
      }),
   }),
});

export const { useCreatePostMutation } = postApiSlice;
