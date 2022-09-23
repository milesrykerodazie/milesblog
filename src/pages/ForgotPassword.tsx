import React, { useState } from 'react';
import ActionButton from '../components/ActionButton';
import { GrMail } from 'react-icons/gr';

const ForgotPassword = () => {
   // const handleSubmit = (e: React.SyntheticEvent) => {
   //    e.preventDefault();
   //    console.log(JSON.stringify(data));
   // };

   // const canSave = [...Object.values(data)].every(Boolean);

   const verifyEmailContent = (
      <form className='bg-rg-image h-screen bg-cover bg-center'>
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
                           autoComplete='off'
                           className='input'
                        />
                        <GrMail className='inputIcon' />
                     </div>
                  </div>
                  <ActionButton
                     buttonDescription='Get reset link'
                     canSave={false}
                  />
               </div>
            </div>
         </div>
      </form>
   );
   return verifyEmailContent;
};

export default ForgotPassword;
