import { RiLockPasswordFill } from 'react-icons/ri';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const ResetPasswordForm = ({ data, handleChange }) => {
   const [passwordToggle, setPasswordToggle] = useState('password');
   const [confirmToggle, setConfirmToggle] = useState('password');

   const resetPasswordForm = (
      <div className='space-y-5 pb-3'>
         <div className='bg-white'>
            <div className='flex items-center justify-between'>
               <label htmlFor='password' className='text-slate-600'>
                  New Password
               </label>
               {data?.password !== '' && (
                  <>
                     {passwordToggle === 'password' ? (
                        <AiOutlineEye
                           onClick={() => setPasswordToggle('text')}
                           className='lg:w-5 lg:h-5 text-slate-800'
                        />
                     ) : (
                        <AiOutlineEyeInvisible
                           onClick={() => setPasswordToggle('password')}
                           className='lg:w-5 lg:h-5 text-slate-800'
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
                  placeholder='New Password'
                  value={data.password}
                  onChange={handleChange}
                  autoComplete='off'
                  className='input'
               />
               <RiLockPasswordFill className='inputIcon' />
            </div>
         </div>
         <div className='bg-white'>
            <div className='flex items-center justify-between'>
               <label htmlFor='confirmPassword' className='text-slate-600'>
                  Confirm New Password
               </label>
               {data?.confirmPassword !== '' && (
                  <>
                     {confirmToggle === 'password' ? (
                        <AiOutlineEye
                           onClick={() => setConfirmToggle('text')}
                           className='lg:w-5 lg:h-5 text-slate-800'
                        />
                     ) : (
                        <AiOutlineEyeInvisible
                           onClick={() => setConfirmToggle('password')}
                           className='lg:w-5 lg:h-5 text-slate-800'
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
                  placeholder='Confirm New Password'
                  value={data.confirmPassword}
                  onChange={handleChange}
                  autoComplete='off'
                  className='input'
               />
               <RiLockPasswordFill className='inputIcon' />
            </div>
         </div>
      </div>
   );

   return resetPasswordForm;
};

export default ResetPasswordForm;
