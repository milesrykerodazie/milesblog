import { GrMail } from 'react-icons/gr';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';

const LoginForm = ({
   data,
   handleChange,
}: {
   data: {
      email: string;
      password: string;
   };
   handleChange: any;
}) => {
   const [passwordToggle, setPasswordToggle] = useState<string>('password');
   const loginForm = (
      <div className='space-y-5 pb-3'>
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
      </div>
   );

   return loginForm;
};

export default LoginForm;
