import { useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { RiLockPasswordFill } from 'react-icons/ri';
import {
   AiFillEdit,
   AiOutlineEye,
   AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { MdClose } from 'react-icons/md';

const RegistrationForm = ({
   data,
   handleChange,
   image,
   setImage,
   handleImage,
}: {
   data: {
      fullName: string;
      email: string;
      username: string;
      password: string;
      confirmPassword: string;
      userBio: string;
   };

   handleChange: any;
   image?: any;
   setImage?: any;
   handleImage: any;
}) => {
   const [passwordToggle, setPasswordToggle] = useState<string>('password');
   const [confirmToggle, setConfirmToggle] = useState<string>('password');

   const registerForm = (
      <div className='space-y-5 pb-3'>
         <div className='relative justify-center items-center flex flex-col'>
            <div className='relative'>
               <img
                  src={
                     image
                        ? image
                        : 'https://www.pngitem.com/pimgs/m/504-5040528_empty-profile-picture-png-transparent-png.png'
                  }
                  alt='user-pic'
                  className='w-[90px] h-[90px] mx-auto rounded-full shadow-md shadow-fuchsia-600 object-cover'
               />
               {image && (
                  <div
                     className='bg-fuchsia-400 h-5 w-5 rounded-full absolute top-0 flex justify-center items-center right-1 '
                     onClick={() => setImage(undefined)}
                  >
                     <MdClose className='w-4 h-4 text-white ' />
                  </div>
               )}
            </div>
            <label
               htmlFor='picfile'
               className='absolute flex items-center  px-2 py-1 space-x-1'
            >
               <p className='text-gray-600 text-sm font-semibold'>Upload</p>
               <AiFillEdit className='text-gray-600 cursor-pointer text-sm ' />
            </label>
            <input
               hidden
               onChange={handleImage}
               type='file'
               id='picfile'
               name='image'
               accept='.png,.jpeg,.jpg,.gif,.webp'
            />
         </div>

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
         <div className='flex flex-col lg:flex-row lg:items-center lg:space-x-3 space-y-5 lg:space-y-0'>
            <div className='flex-1'>
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
            <div className='flex-1'>
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
         </div>

         <div className=''>
            <label htmlFor='userBio' className='label'>
               Bio
            </label>
            <div>
               <textarea
                  id='userBio'
                  rows={7}
                  name='userBio'
                  onChange={handleChange}
                  placeholder='Your Bio...'
                  className='input px-2 border rounded-md text-sm'
               />
            </div>
         </div>

         <div className='flex flex-col lg:flex-row lg:items-center lg:space-x-3 space-y-5 lg:space-y-0'>
            <div className='flex-1'>
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
            <div className='flex-1'>
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
      </div>
   );

   return registerForm;
};

export default RegistrationForm;
