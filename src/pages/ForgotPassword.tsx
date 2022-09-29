import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../components/ActionButton';
import { GrMail } from 'react-icons/gr';
import { useForgotPasswordMutation } from '../redux/features/authApiSlice';

const ForgotPassword = () => {
   const [
      forgotPassword,
      { data: fPSuccess, isLoading, isSuccess, isError, error },
   ] = useForgotPasswordMutation();

   console.log('forgot password date: => ', fPSuccess);

   // initializing navigate
   const navigate = useNavigate();

   const [email, setEmail] = useState<string>('');

   useEffect(() => {
      if (isSuccess) {
         setEmail('');
      }
   }, [isSuccess, navigate]);

   const canSubmit = [email].every(Boolean);

   const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (canSubmit) await forgotPassword(email);
   };

   const forgotPasswordContent = (
      <form
         className='bg-rg-image h-screen bg-cover bg-center'
         onSubmit={handleSubmit}
      >
         <div className='bg-slate-900/90 h-full'>
            <div className='flex flex-col justify-center items-center h-full'>
               <div className='max-w-3xl w-full mx-auto bg-white p-5 space-y-3 shadow-md  shadow-white lg:rounded-md'>
                  <h2 className='text-xl font-bold text-center py-2 text-slate-600'>
                     Enter your email and we will send you a reset link to reset
                     your password.
                  </h2>
                  <div className='bg-white'>
                     <label htmlFor='email' className='text-slate-600'>
                        E-mail
                     </label>
                     <div className='relative'>
                        <input
                           type='email'
                           id='email'
                           name='email'
                           placeholder='Email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           autoComplete='off'
                           className='input'
                        />
                        <GrMail className='inputIcon' />
                     </div>
                  </div>
                  <ActionButton
                     buttonDescription='Get reset link'
                     canSubmit={canSubmit}
                     isLoading={isLoading}
                  />
               </div>
            </div>
         </div>
      </form>
   );
   return forgotPasswordContent;
};

export default ForgotPassword;
