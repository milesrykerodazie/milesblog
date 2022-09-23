import { BsPersonFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { RiLockPasswordFill } from 'react-icons/ri';

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
   const registerForm = (
      <div className='space-y-5 pb-3'>
         <div className='bg-white'>
            <label htmlFor='fullName' className='text-slate-600'>
               {' '}
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
            <label htmlFor='username' className='text-slate-600'>
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
         <div className='bg-white'>
            <label htmlFor='confirmPassword' className='text-slate-600'>
               Confirm Password
            </label>
            <div className='relative'>
               <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  placeholder='Confirm Password'
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

   return registerForm;
};

export default RegistrationForm;
