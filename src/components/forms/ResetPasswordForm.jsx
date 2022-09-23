import { RiLockPasswordFill } from 'react-icons/ri';
import { BsPersonFill } from 'react-icons/bs';

const ResetPasswordForm = ({
   data,
   handleChange,
}: {
   data: {
      password: string,
      confirmPassword: string,
   },
   handleChange: any,
}) => {
   const resetPasswordForm = (
      <div className='space-y-5 pb-3'>
         <div className='bg-white'>
            <label htmlFor='password' className='text-slate-600'>
               New Password
            </label>
            <div className='relative'>
               <input
                  type='password'
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
            <label htmlFor='confirmPassword' className='text-slate-600'>
               Confirm New Password
            </label>
            <div className='relative'>
               <input
                  type='password'
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
