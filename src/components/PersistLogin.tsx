import { Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from '../redux/features/authApiSlice';
import usePersist from '../hooks/usePersist';
import { useAppSelector } from '../redux/app/store';
import { selectCurrentToken } from '../redux/features/auth/authSlice';
import LoadingComponent from './LoadingComponent';

const PersistLogin = () => {
   const [persist] = usePersist();
   const token = useAppSelector(selectCurrentToken);
   const effectRan = useRef(false);

   const [trueSuccess, setTrueSuccess] = useState(false);

   const [
      refresh,
      { data: refreshData, isUninitialized, isLoading, isSuccess },
   ] = useRefreshMutation();

   // @ts-expect-error
   useEffect(() => {
      if (
         effectRan.current === true ||
         process.env.NODE_ENV !== 'development'
      ) {
         const verifyRefreshToken = async () => {
            try {
               //@ts-expect-error
               await refresh();
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
            <LoadingComponent />
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
