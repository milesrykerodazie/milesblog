import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../../features/auth/authSlice';
import { RootState } from '../store';

const { REACT_APP_API_LINK } = process.env;

const baseQuery = fetchBaseQuery({
   baseUrl: `${REACT_APP_API_LINK}`,
   // baseUrl: 'http://localhost:9000/milesapi',
   credentials: 'include',
   prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
         headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
   },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
   let result = await baseQuery(args, api, extraOptions);

   // If you want, handle other status codes, too
   if (result?.error?.status === 403) {
      // send refresh token to get new access token
      const refreshResult = await baseQuery('/auth-refresh', api, extraOptions);

      if (refreshResult?.data) {
         // store the new token
         api.dispatch(setCredentials({ ...refreshResult.data }));

         // retry original query with new access token
         result = await baseQuery(args, api, extraOptions);
      } else {
         if (refreshResult?.error?.status === 403) {
            (refreshResult as any).error.data.message =
               'Your login has expired.';
         }
         return refreshResult;
      }
   }

   return result;
};

export const apiSlice = createApi({
   baseQuery: baseQueryWithReauth,
   tagTypes: ['Post', 'User', 'Comment', 'Reply'],
   endpoints: (builder) => ({}),
});
