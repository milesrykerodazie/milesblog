import React, { useEffect, useState } from 'react';
import ActionButton from '../components/ActionButton';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';
import {
   useResetPasswordMutation,
   useVerifyResetLinkQuery,
} from '../redux/features/authApiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import useTitle from '../hooks/useTitle';
import LoadingComponent from '../components/LoadingComponent';

const customId = 'custom-id-yes';

const ResetPassword = () => {
   useTitle('reset-password');
   const location = useLocation();
   const { token, id } = queryString.parse(location.search);
   console.log('Location => ', location);

   console.log(token, id);

   // verify token and id from reset link

   const { isLoading, isSuccess, isError, error } = useVerifyResetLinkQuery({
      token,
      id,
   });

   //reset password mutation

   const [
      resetPassword,
      {
         data: successResponse,
         isLoading: resetLoading,
         isSuccess: resetSuccess,
         isError: resetIsError,
         error: resetError,
      },
   ] = useResetPasswordMutation();

   // initializing navigate
   const navigate = useNavigate();

   const [data, setData] = useState({
      password: '',
      confirmPassword: '',
   });

   const [passwordMatch, setPasswordMatch] = useState<string>('');

   useEffect(() => {
      if (resetSuccess) {
         setData({
            password: '',
            confirmPassword: '',
         });
         navigate('/auth/login');
      }
   }, [resetSuccess, navigate]);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // const type = event.target.type;

      const name = event.target.name;

      const value = event.target.value;

      setData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const canSubmit = [...Object.values(data)].every(Boolean);

   const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();

      if (data?.password.trim() !== data?.confirmPassword.trim()) {
         setPasswordMatch('Password do not match');
         setData({ password: '', confirmPassword: '' });
         return;
      }
      if (canSubmit) {
         await resetPassword({ password: data?.password, token, id });
      }
   };

   useEffect(() => {
      if (successResponse) {
         toast.success(successResponse?.message, {
            toastId: customId,
         });
      }
   }, [successResponse]);

   const resetPasswordContent = (
      <form
         className='bg-rg-image h-screen bg-cover bg-center'
         onSubmit={handleSubmit}
      >
         <div className='bg-slate-900/90 h-full'>
            <div className='flex flex-col justify-center items-center h-full'>
               <div className='max-w-3xl w-full mx-auto bg-white p-5 space-y-3 shadow-md  shadow-white lg:rounded-md'>
                  {isLoading && <LoadingComponent />}
                  {isSuccess && (
                     <>
                        <h2 className='text-xl font-bold text-center py-2 text-slate-600'>
                           Reset Password
                        </h2>
                        <ResetPasswordForm
                           data={data}
                           handleChange={handleChange}
                        />
                        {passwordMatch && (
                           <p className='text-red-500 text-sm'>
                              {passwordMatch}
                           </p>
                        )}
                        {resetIsError && (
                           <p className='text-red-500 text-sm'>
                              {(resetError as any)?.data?.message}
                           </p>
                        )}
                        <ActionButton
                           buttonDescription='Reset Password'
                           canSubmit={canSubmit}
                           isLoading={resetLoading}
                        />
                     </>
                  )}

                  {isError && (
                     <p className='text-red-500'>
                        {(error as any)?.data?.message}
                     </p>
                  )}
               </div>
            </div>
         </div>
      </form>
   );
   return resetPasswordContent;
};

export default ResetPassword;
