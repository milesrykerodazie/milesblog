import { apiSlice } from '../app/api/apiSlice';
import { logOutUser, setCredentials } from './auth/authSlice';
import { RegisterTypes, LoginTypes } from '../../typescriptTypes';

export const authApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      register: builder.mutation({
         query: (initialUserData: RegisterTypes) => ({
            url: '/register',
            method: 'POST',
            body: {
               ...initialUserData,
            },
         }),
         invalidatesTags: [{ type: 'User', id: 'LIST' }],
      }),
      verifyEmail: builder.mutation({
         query: (verifycredentials) => ({
            url: '/verify-email',
            method: 'POST',
            body: { ...verifycredentials },
         }),
      }),
      login: builder.mutation({
         query: (credentials: LoginTypes) => ({
            url: '/login',
            method: 'POST',
            body: { ...credentials },
         }),
      }),

      logout: builder.mutation({
         query: () => ({
            url: '/logout',
            method: 'POST',
         }),
         async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;

               dispatch(logOutUser());
               setTimeout(() => {
                  dispatch(apiSlice.util.resetApiState());
               }, 1000);
            } catch (err) {
               console.log(err);
            }
         },
      }),

      forgotPassword: builder.mutation({
         query: (email) => ({
            url: '/forgotpassword',
            method: 'POST',
            body: { email },
         }),
      }),

      verifyResetLink: builder.query({
         //@ts-ignore
         query: ({ token, id }) =>
            `/reset-link-verification?token=${token}&id=${id}`,
      }),

      resetPassword: builder.mutation({
         query: (details) => ({
            url: `/reset-password?token=${details?.token}&id=${details?.id}`,
            method: 'POST',
            body: details,
         }),
      }),

      refresh: builder.mutation({
         query: () => ({
            url: '/auth-refresh',
            method: 'GET',
         }),
         async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               const { accessToken } = data;
               dispatch(setCredentials({ accessToken }));
            } catch (err) {
               console.log('If no token to refresh', err);
            }
         },
      }),
   }),
});

export const {
   useRegisterMutation,
   useVerifyEmailMutation,
   useLoginMutation,
   useLogoutMutation,
   useForgotPasswordMutation,
   useVerifyResetLinkQuery,
   useResetPasswordMutation,
   useRefreshMutation,
} = authApiSlice;
