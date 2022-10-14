import { apiSlice } from '../app/api/apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

const commentsAdapter = createEntityAdapter();
const initialState = commentsAdapter.getInitialState();

export const commentsApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getCommentReplies: builder.query({
         query: (id) => ({
            url: `/comment-replies/${id}`,
            validiteStatus: (
               response: { status: number },
               result: { isError: any },
            ) => {
               return response.status === 200 && !result.isError;
            },
         }),
         transformResponse: (responseData) => {
            console.log('comment reply response: => ', responseData);

            // @ts-expect-error
            const loadedReplies = responseData?.replies?.map((reply: any) => {
               reply.id = reply._id;
               return reply;
            });
            return commentsAdapter.setAll(initialState, loadedReplies);
         },
         providesTags: (result: any, error: any, arg: any) => {
            if (result?.ids) {
               return [
                  ...result.ids.map((id: any) => ({ type: 'Comment', id })),
               ];
            } else return [{ type: 'Comment', id: arg.id }];
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
         invalidatesTags: (result, error, arg) => [{ type: 'Comment' }],
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
      updateComment: builder.mutation({
         query: (updateDetails) => ({
            url: '/update-comment',
            method: 'PATCH',
            body: {
               ...updateDetails,
            },
         }),
         invalidatesTags: (result, error, arg) => [{ type: 'Comment' }],
      }),
      deleteComment: builder.mutation({
         query: (id) => ({
            url: `/delete-comment`,
            method: 'DELETE',
            body: {
               id,
            },
         }),
         invalidatesTags: (result, error, arg) => [{ type: 'Comment' }],
      }),
      replyComment: builder.mutation({
         query: (replyDetails) => ({
            url: '/reply-comment',
            method: 'POST',
            body: {
               ...replyDetails,
            },
         }),
         invalidatesTags: (result, error, arg) => [{ type: 'Comment' }],
      }),
      likeReply: builder.mutation({
         query: ({ id, username }) => ({
            url: '/like-reply',
            method: 'PATCH',
            body: {
               id,
               username,
            },
         }),
         invalidatesTags: [{ type: 'Comment' }],
      }),
      updateReply: builder.mutation({
         query: ({ id, replyOwner, reply }) => ({
            url: '/update-reply',
            method: 'PATCH',
            body: {
               id,
               replyOwner,
               reply,
            },
         }),
         invalidatesTags: (result, error, arg) => [{ type: 'Comment' }],
      }),
      deleteReply: builder.mutation({
         query: ({ id, commentId, replyOwner }) => ({
            url: `/delete-reply`,
            method: 'DELETE',
            body: {
               id,
               commentId,
               replyOwner,
            },
         }),
         invalidatesTags: (result, error, arg) => [{ type: 'Comment' }],
      }),
   }),
});

export const {
   useGetCommentRepliesQuery,
   usePostCommentMutation,
   useLikeCommentMutation,
   useUpdateCommentMutation,
   useReplyCommentMutation,
   useLikeReplyMutation,
   useDeleteCommentMutation,
   useUpdateReplyMutation,
   useDeleteReplyMutation,
} = commentsApiSlice;
