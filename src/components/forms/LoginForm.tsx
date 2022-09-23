import { GrMail } from 'react-icons/gr';
import { RiLockPasswordFill } from 'react-icons/ri';

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
   const loginForm = (
      <div className='space-y-5 pb-3'>
         <div className='bg-white'>
            <label htmlFor='email' className='text-slate-600'>
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

         <div className='bg-white'>
            <label htmlFor='password' className='text-slate-600'>
               Password
            </label>
            <div className='relative'>
               <input
                  type='password'
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
