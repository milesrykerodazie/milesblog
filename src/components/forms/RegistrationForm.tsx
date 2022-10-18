import { useEffect, useRef, useState } from 'react';
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
   userBio,
   handleBio,
   countRemaining,
   maxText,
}: {
   data: {
      fullName: string;
      email: string;
      username: string;
      password: string;
      confirmPassword: string;
   };

   handleChange: any;
   image?: any;
   setImage?: any;
   handleImage: any;
   userBio?: string;
   handleBio?: any;
   countRemaining?: any;
   maxText?: any;
}) => {
   const [passwordToggle, setPasswordToggle] = useState<string>('password');
   const [confirmToggle, setConfirmToggle] = useState<string>('password');

   const textAreaRef = useRef(null);
   const resizeTextArea = () => {
      if (textAreaRef?.current) {
         (textAreaRef as any).current.style.height = 'auto';
         (textAreaRef as any).current.style.height =
            (textAreaRef as any).current.scrollHeight + 'px';
      }
   };

   useEffect(resizeTextArea, [userBio]);

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
                  style={{ resize: 'none' }}
                  ref={textAreaRef}
                  rows={2}
                  name='userBio'
                  value={userBio}
                  onChange={handleBio}
                  placeholder='Your Bio...'
                  className='input px-2 border rounded-md text-sm'
               />
               {/* <p
                  className={`text-right  font-charm font-semibold tracking-wide text-sm hidden lg:block  ${
                     countRemaining <= 10
                        ? 'text-red-500'
                        : countRemaining <= 30
                        ? 'text-yellow-500'
                        : 'text-gray-400'
                  }`}
               >
                  {countRemaining}/{maxText}
               </p> */}
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
