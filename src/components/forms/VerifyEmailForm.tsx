import { RiLockPasswordFill } from 'react-icons/ri';
import { BsPersonFill } from 'react-icons/bs';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const VerifyEmailForm = ({
   data,
   handleChange,
}: {
   data: {
      username: string;
      verificationCode: string;
   };
   handleChange: any;
}) => {
   const [otpToggle, setOtpToggle] = useState<string>('password');
   const verifyEmailForm = (
      <div className='space-y-5 pb-3'>
         <div className='bg-white'>
            <label htmlFor='username' className='text-slate-600'>
               Username
            </label>
            <div className='relative'>
               <input
                  type='text'
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

         <div className='bg-white'>
            <div className='flex items-center justify-between'>
               <label htmlFor='verificationCode' className='text-slate-600'>
                  Verification Code
               </label>
               {data?.verificationCode !== '' && (
                  <>
                     {otpToggle === 'password' ? (
                        <AiOutlineEye
                           onClick={() => setOtpToggle('text')}
                           className='lg:w-5 lg:h-5 text-slate-800'
                        />
                     ) : (
                        <AiOutlineEyeInvisible
                           onClick={() => setOtpToggle('password')}
                           className='lg:w-5 lg:h-5 text-slate-800'
                        />
                     )}
                  </>
               )}
            </div>
            <div className='relative'>
               <input
                  type={otpToggle}
                  id='verificationCode'
                  name='verificationCode'
                  placeholder='Verification Code'
                  value={data.verificationCode}
                  onChange={handleChange}
                  autoComplete='off'
                  className='input'
               />
               <RiLockPasswordFill className='inputIcon' />
            </div>
         </div>
      </div>
   );

   return verifyEmailForm;
};

export default VerifyEmailForm;
