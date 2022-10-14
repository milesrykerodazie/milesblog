import { apiSlice } from '../app/api/apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState();

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
            url: '/admin-posts',
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
               post.id = post.postSlug;
               return post;
            });
            return postsAdapter.setAll(initialState, loadedPosts);
         },
         providesTags: (result: any, error: any, arg: any) => {
            if (result?.ids) {
               return [...result.ids.map((id: any) => ({ type: 'Post', id }))];
            } else return [{ type: 'Post', id: 'LIST' }];
         },
      }),
      getCategoryPosts: builder.query({
         query: (id) => ({
            url: `category-posts?category=${id}`,
            validiteStatus: (
               response: { status: number },
               result: { isError: any },
            ) => {
               return response.status === 200 && !result.isError;
            },
         }),
         transformResponse: (responseData) => {
            console.log(' category post response: => ', responseData);
            const loadedPosts = (responseData as any)?.posts?.map(
               (post: any) => {
                  post.id = post.postSlug;
                  return post;
               },
            );
            return postsAdapter.setAll(initialState, loadedPosts);
         },
         providesTags: (result: any, error: any, arg: any) => {
            if (result?.ids) {
               return [...result.ids.map((id: any) => ({ type: 'Post', id }))];
            } else return [{ type: 'Post', id: 'LIST' }];
         },
      }),

      getPostComments: builder.query({
         query: (id) => ({
            url: `post-comments/${id}`,
            validiteStatus: (
               response: { status: number },
               result: { isError: any },
            ) => {
               return response.status === 200 && !result.isError;
            },
         }),
         transformResponse: (responseData) => {
            console.log('post comments response: => ', responseData);

            // @ts-expect-error
            const loadedComments = responseData?.postComments?.map(
               (comment: any) => {
                  comment.id = comment._id;
                  return comment;
               },
            );
            return postsAdapter.setAll(initialState, loadedComments);
         },
         providesTags: (result: any, error: any, arg: any) => {
            if (result?.ids) {
               return [
                  ...result.ids.map((id: any) => ({ type: 'Comment', id })),
               ];
            } else return [{ type: 'Comment', id: 'LIST' }];
         },
      }),

      updatePost: builder.mutation({
         query: (initialPost) => ({
            url: '/update-post',
            method: 'PATCH',
            body: {
               ...initialPost,
            },
         }),
         invalidatesTags: (result, error, arg) => [
            { type: 'Post', id: arg.id },
         ],
      }),
      likePost: builder.mutation({
         query: ({ id, username }) => ({
            url: '/like-post',
            method: 'PATCH',
            body: {
               id,
               username,
            },
         }),
         invalidatesTags: (result, error, arg) => [
            { type: 'Post', id: arg.id },
         ],
      }),
      deletePost: builder.mutation({
         query: ({ id, postOwner }) => ({
            url: `/delete-post`,
            method: 'DELETE',
            body: {
               id,
               postOwner,
            },
         }),
         invalidatesTags: (result, error, arg) => [
            { type: 'Post', id: arg.id },
         ],
      }),
   }),
});

export const {
   useCreatePostMutation,
   useGetPostsQuery,
   useGetCategoryPostsQuery,
   useUpdatePostMutation,
   useLikePostMutation,
   useDeletePostMutation,
   useGetPostCommentsQuery,
} = postApiSlice;

// returns the query result object
//@ts-expect-error
export const selectPostsResult = postApiSlice.endpoints.getPosts.select();

export const selectCategoryPostsResult =
   // @ts-expect-error
   postApiSlice.endpoints.getCategoryPosts.select();

//memoize the posts result
const selectPostData = createSelector(
   selectPostsResult,
   (postResult) => postResult.data,
);

//memoize the category posts result
const selectCategoryPostData = createSelector(
   selectCategoryPostsResult,
   (catPostResult) => catPostResult.data,
);

export const {
   selectAll: selectAllPosts,
   selectById: selectPostById,
   selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) =>
   // @ts-expect-error
   selectPostData(state ?? initialState),
);

export const {
   selectAll: selectAllCategoryPosts,
   selectById: selectCategoryPostById,
   selectIds: selectCategoryPostIds,
} = postsAdapter.getSelectors((state) =>
   // @ts-expect-error
   selectCategoryPostData(state ?? initialState),
);
