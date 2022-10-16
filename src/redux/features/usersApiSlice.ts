import { apiSlice } from '../app/api/apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllUsers: builder.query({
         query: () => ({
            url: '/users',
            validiteStatus: (
               response: { status: number },
               result: { isError: any },
            ) => {
               return response.status === 200 && !result.isError;
            },
         }),
         transformResponse: (responseData: any) => {
            console.log(responseData);

            const loadedUsers = responseData?.users?.map((user: any) => {
               user.id = user.username;
               return user;
            });
            console.log('loadedUsers: => ', loadedUsers);

            return usersAdapter.setAll(initialState, loadedUsers);
         },
         providesTags: (result: any, error: any, arg: any) => {
            console.log('users result: => ', result);

            if (result?.ids) {
               return [
                  { type: 'User', id: 'LIST' },
                  ...result.ids.map((id: any) => ({ type: 'User', id })),
               ];
            } else return [{ type: 'User', id: 'LIST' }];
         },
      }),
   }),
});

export const { useGetAllUsersQuery } = usersApiSlice;
// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getAllUsers.select([]);

console.log('selected users result', selectUsersResult);

// creates memoized selector
const selectUsersData = createSelector(
   selectUsersResult,
   (usersResult) => usersResult.data, // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
   selectAll: selectAllUsers,
   selectById: selectUserById,
   selectIds: selectUserIds,
   // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(
   (state) => selectUsersData(state as RootState) ?? initialState,
);
