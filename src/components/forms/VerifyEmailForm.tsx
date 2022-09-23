import { RiLockPasswordFill } from 'react-icons/ri';
import { BsPersonFill } from 'react-icons/bs';

const VerifyEmailForm = ({
   data,
   handleChange,
}: {
   data: {
      userId: string;
      verificationCode: string;
   };
   handleChange: any;
}) => {
   const verifyEmailForm = (
      <div className='space-y-5 pb-3'>
         <div className='bg-white'>
            <label htmlFor='userId' className='text-slate-600'>
               User Id
            </label>
            <div className='relative'>
               <input
                  type='text'
                  id='userId'
                  name='userId'
                  placeholder='User Id'
                  value={data.userId}
                  onChange={handleChange}
                  autoComplete='off'
                  className='input'
               />
               <BsPersonFill className='inputIcon' />
            </div>
         </div>

         <div className='bg-white'>
            <label htmlFor='otpCode' className='text-slate-600'>
               Verification Code
            </label>
            <div className='relative'>
               <input
                  type='password'
                  id='otpCode'
                  name='otpCode'
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
