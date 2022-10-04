import { Outlet, Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from '../redux/features/authApiSlice';
import usePersist from '../hooks/usePersist';
import { useAppSelector } from '../redux/app/store';
import { selectCurrentToken } from '../redux/features/auth/authSlice';

const PersistLogin = () => {
   const [persist] = usePersist();
   const token = useAppSelector(selectCurrentToken);
   const effectRan = useRef(false);

   const [trueSuccess, setTrueSuccess] = useState(false);

   const [
      refresh,
      {
         data: refreshData,
         isUninitialized,
         isLoading,
         isSuccess,
         isError,
         error,
      },
   ] = useRefreshMutation();

   // @ts-expect-error
   useEffect(() => {
      if (
         effectRan.current === true ||
         process.env.NODE_ENV !== 'development'
      ) {
         const verifyRefreshToken = async () => {
            try {
               await refresh({});
               setTrueSuccess(true);
            } catch (err) {
               console.error(err);
            }
         };
         if (!token && persist) verifyRefreshToken();
      }
      return () => (effectRan.current = true);
      // eslint-disable-next-line
   }, []);

   return (
      <div>
         {!persist ? (
            <Outlet />
         ) : isLoading ? (
            <p>Loading...</p>
         ) : isSuccess && trueSuccess ? (
            <Outlet />
         ) : token && isUninitialized ? (
            <Outlet />
         ) : !token ? (
            <Outlet />
         ) : null}
      </div>
   );
};
export default PersistLogin;

// : isError ? (
//    <p>
//       {(error as any)?.data?.message
//          ? `${(error as any)?.data?.message} - `
//          : 'Server Error.'}
//       <Link to='/login'>Please login again</Link>
//    </p>
// )

//for reference purposes only

// useEffect(() => {
//    if (
//       effectRan.current === true ||
//       process.env.NODE_ENV !== 'development'
//    ) {
//       const verifyRefreshToken = async () => {
//          console.log('verifying refresh token');
//          try {
//             const response = await refresh({});
//             console.log('refresh response from persist login: =>', response);
//             if ((response as any)?.data) {
//                const { accessToken } = (response as any)?.data;
//                console.log('access token received => ', accessToken);
//                setTrueSuccess(true);
//             }
//             return;
//          } catch (err) {
//             console.error(err);
//          }
//       };

//       if (!token && persist) verifyRefreshToken();
//    }
//    return () => (effectRan.current = true);

//    // eslint-disable-next-line
// }, []);
