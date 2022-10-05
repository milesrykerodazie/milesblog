import { apiSlice } from '../app/api/apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

const potsAdapter = createEntityAdapter({});

// const sortedDesc = arr1.sort(
//    (objA, objB) => Number(objB.date) - Number(objA.date),
//  );

const initialState = potsAdapter.getInitialState();

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

      getPosts: builder.query({
         query: () => ({
            url: '/posts',
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
            const loadedPosts = responseData?.posts?.map((post) => {
               post.id = post._id;
               return post;
            });
            return potsAdapter.setAll(initialState, loadedPosts);
         },
         providesTags: (result: any, error: any, arg: any) => {
            if (result?.ids) {
               return [
                  { type: 'User', id: 'LIST' },
                  ...result.ids.map((id: any) => ({ type: 'Post', id })),
               ];
            } else return [{ type: 'Post', id: 'LIST' }];
         },

         //       providesTags: (result) =>
         //      result
         //        ? [
         //            ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
         //            { type: 'Posts', id: 'LIST' },
         //          ]
         //        : [{ type: 'Posts', id: 'LIST' }],
         //  }),
      }),
   }),
});

export const { useCreatePostMutation, useGetPostsQuery } = postApiSlice;

// returns the query result object
// @ts-expect-error
export const selectPostsResult = postApiSlice.endpoints.getPosts.select();

//memoize the result
const selectPostData = createSelector(
   selectPostsResult,
   (postResult) => postResult.data,
);

export const {
   selectAll: selectAllPosts,
   selectById: selectPostById,
   selectIds: selectPostIds,
   // @ts-expect-error
} = potsAdapter.getSelectors((state) => selectPostData(state ?? initialState));
