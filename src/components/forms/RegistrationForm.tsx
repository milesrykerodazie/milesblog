import React, { Dispatch, SetStateAction, useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const RegistrationForm = ({
   data,
   handleChange,
}: {
   data: {
      fullName: string;
      email: string;
      username: string;
      password: string;
      confirmPassword: string;
   };

   handleChange: any;
}) => {
   const [passwordToggle, setPasswordToggle] = useState<string>('password');
   const [confirmToggle, setConfirmToggle] = useState<string>('password');

   const registerForm = (
      <div className='space-y-7 pb-3'>
         <div className=''>
            <label htmlFor='fullName' className='label'>
               Full Name
            </label>
            <div className='relative'>
               <input
                  type='text'
                  id='fullName'
                  name='fullName'
                  placeholder='Full Name'
                  value={data.fullName}
                  onChange={handleChange}
                  autoComplete='off'
                  className='input'
               />
               <BsPersonFill className='inputIcon' />
            </div>
         </div>
         <div className=''>
            <label htmlFor='email' className='label'>
               E-mail
            </label>
            <div className='relative'>
               <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='E-mail'
                  value={data.email}
                  onChange={handleChange}
                  autoComplete='off'
                  className='input'
               />
               <GrMail className='inputIcon' />
            </div>
         </div>
         <div className=''>
            <label htmlFor='username' className='label'>
               Username
            </label>
            <div className='relative'>
               <input
                  type='username'
                  id='username'
                  name='username'
                  placeholder='Username'
                  value={data.username}
                  onChange={handleChange}
                  autoComplete='off'
                  className='input'
               />
               <BsPersonFill className='inputIcon' />
            </div>
         </div>
         <div className=''>
            <div className='flex items-center justify-between'>
               <label htmlFor='password' className='label'>
                  Password
               </label>
               {data?.password !== '' && (
                  <>
                     {passwordToggle === 'password' ? (
                        <AiOutlineEye
                           onClick={() => setPasswordToggle('text')}
                           className='lg:w-5 lg:h-5 text-slate-800 dark:text-slate-400 duration-500 ease-in'
                        />
                     ) : (
                        <AiOutlineEyeInvisible
                           onClick={() => setPasswordToggle('password')}
                           className='lg:w-5 lg:h-5 text-slate-800 dark:text-slate-400 duration-500 ease-in'
                        />
                     )}
                  </>
               )}
            </div>
            <div className='relative'>
               <input
                  type={passwordToggle}
                  id='password'
                  name='password'
                  placeholder='Password'
                  value={data.password}
                  onChange={handleChange}
                  autoComplete='off'
                  className='input'
               />
               <RiLockPasswordFill className='inputIcon' />
            </div>
         </div>
         <div className=''>
            <div className='flex items-center justify-between'>
               <label htmlFor='confirmPassword' className='label'>
                  Confirm Password
               </label>
               {data?.confirmPassword !== '' && (
                  <>
                     {confirmToggle === 'password' ? (
                        <AiOutlineEye
                           onClick={() => setConfirmToggle('text')}
                           className='lg:w-5 lg:h-5 text-slate-800 dark:text-slate-400 duration-500 ease-in'
                        />
                     ) : (
                        <AiOutlineEyeInvisible
                           onClick={() => setConfirmToggle('password')}
                           className='lg:w-5 lg:h-5 text-slate-800 dark:text-slate-400 duration-500 ease-in'
                        />
                     )}
                  </>
               )}
            </div>
            <div className='relative'>
               <input
                  type={confirmToggle}
                  id='confirmPassword'
                  name='confirmPassword'
                  placeholder='Confirm Password'
                  value={data.confirmPassword}
                  onChange={handleChange}
                  autoComplete='off'
                  disabled={data?.password === ''}
                  className='input'
               />
               <RiLockPasswordFill className='inputIcon' />
            </div>
         </div>
      </div>
   );

   return registerForm;
};

export default RegistrationForm;
