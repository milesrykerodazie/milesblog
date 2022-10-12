import { apiSlice } from '../app/api/apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

const commentsAdapter = createEntityAdapter();
const initialState = commentsAdapter.getInitialState();

export const commentsApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getCommentReplies: builder.query({
         query: (id) => ({
            url: `comment-replies?id=${id}`,
            validiteStatus: (
               response: { status: number },
               result: { isError: any },
            ) => {
               return response.status === 200 && !result.isError;
            },
         }),
         transformResponse: (responseData) => {
            console.log('post response: => ', responseData);

            // @ts-expect-error
            const loadedReplies = responseData?.commentReplies?.map((reply) => {
               reply.id = reply._id;
               return reply;
            });
            return commentsAdapter.setAll(initialState, loadedReplies);
         },
         providesTags: (result: any, error: any, arg: any) => {
            if (result?.ids) {
               return [...result.ids.map((id: any) => ({ type: 'Reply', id }))];
            } else return [{ type: 'Reply', id: 'LIST' }];
         },
      }),
      postComment: builder.mutation({
         query: (commentDetails) => ({
            url: '/post-comment',
            method: 'POST',
            body: {
               ...commentDetails,
            },
         }),
         invalidatesTags: [{ type: 'Comment', id: 'List' }],
      }),
      likeComment: builder.mutation({
         query: ({ id, username }) => ({
            url: '/like-comment',
            method: 'PATCH',
            body: {
               id,
               username,
            },
         }),
         invalidatesTags: (result, error, arg) => [
            { type: 'Comment', id: arg.id },
         ],
      }),
   }),
});

export const {
   useGetCommentRepliesQuery,
   usePostCommentMutation,
   useLikeCommentMutation,
} = commentsApiSlice;
