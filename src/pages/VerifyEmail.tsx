import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ActionButton from '../components/ActionButton';
import VerifyEmailForm from '../components/forms/VerifyEmailForm';
import { useVerifyEmailMutation } from '../redux/features/authApiSlice';

const VerifyEmail = () => {
   //the verify email request
   const [
      verifyEmail,
      { data: verifySuccess, isLoading, isSuccess, isError, error },
   ] = useVerifyEmailMutation();

   // initializing navigate
   const navigate = useNavigate();
   //states for verify email
   const [data, setData] = useState({
      username: '',
      verificationCode: '',
   });

   useEffect(() => {
      if (isSuccess) {
         setData({
            username: '',
            verificationCode: '',
         });
         navigate('/login');
      }
   }, [isSuccess, navigate]);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const type = event.target.type;

      const name = event.target.name;

      const value = event.target.value;

      setData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const canSubmit = [...Object.values(data)].every(Boolean);

   const verifyEmailObject = {
      username: data?.username.trim(),
      otp: data?.verificationCode.trim(),
   };

   const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (canSubmit) {
         await verifyEmail(verifyEmailObject);
      }
   };

   console.log('success verify message: => ', verifySuccess);

   const verifyEmailContent = (
      <form
         className='bg-rg-image h-screen bg-cover bg-center'
         onSubmit={handleSubmit}
      >
         <div className='bg-slate-900/90 h-full'>
            <div className='flex flex-col justify-center items-center h-full'>
               <div className='max-w-3xl w-full mx-auto bg-white p-5 space-y-3 shadow-md  shadow-white lg:rounded-md'>
                  <h2 className='text-xl font-bold text-center py-2 text-slate-600'>
                     Verify Email
                  </h2>
                  <VerifyEmailForm data={data} handleChange={handleChange} />
                  <ActionButton
                     buttonDescription='Verify'
                     canSubmit={canSubmit}
                     isLoading={isLoading}
                  />
                  <Link to='/login'>
                     <button
                        type='button'
                        className='w-full bg-slate-600 text-white py-2 rounded-md font-semibold tracking-wide uppercase mt-4'
                     >
                        Skip
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </form>
   );
   return verifyEmailContent;
};

export default VerifyEmail;
