import React, { useEffect, useRef, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BsPersonFill } from 'react-icons/bs';
import { FaUserCheck, FaUserLock } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import { MdClose, MdVerified } from 'react-icons/md';
import { useUpdateUserMutation } from '../../redux/features/usersApiSlice';
import ActionButton from '../ActionButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const customId = 'custom-id-yes';

const EditProfileForm = ({ user }: any) => {
   //updating user
   const [
      updateUser,
      { data: updateData, isLoading, isSuccess, isError, error },
   ] = useUpdateUserMutation();

   const navigate = useNavigate();

   const [data, setData] = useState({
      fullName: user?.fullName,
      email: user?.email,
      username: user?.username,
   });

   const [active, setActive] = useState(user?.active);
   //image state
   const [image, setImage] = useState(undefined);

   const [userBio, setUserBio] = useState('');

   //states for count
   const [count, setCount] = useState(0);
   const maxText = 200;

   const countRemaining = maxText - count;

   console.log(userBio);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // const type = event.target.type;

      const name = event.target.name;

      const value = event.target.value;

      setData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleBio = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setCount(e.target.value.length);
      setUserBio(e.target.value);
   };

   const textAreaRef = useRef(null);
   const resizeTextArea = () => {
      if (textAreaRef?.current) {
         (textAreaRef as any).current.style.height = 'auto';
         (textAreaRef as any).current.style.height =
            (textAreaRef as any).current.scrollHeight + 'px';
      }
   };

   useEffect(resizeTextArea, [userBio]);

   //for authomatically getting post owner on login
   let userRole: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      userRole = JSON.parse(userName);
   }

   //handle and convert it in base 64
   const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
         const file = event.target.files[0];
         setFileToBase(file);
      }
   };

   const setFileToBase = (file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
         // @ts-expect-error
         setImage(reader.result);
      };
   };

   const updateObject = {
      id: user?._id,
      fullName: data?.fullName,
      email: data?.email,
      username: data?.username,
      role: user?.role,
      profilePicture: image,
      verified: user?.verified,
      userBio: userBio,
      active: active,
   };

   const canSubmit = [...Object.values(data)].every(Boolean);

   useEffect(() => {
      if (isSuccess) {
         toast.success(updateData?.message, {
            toastId: customId,
         });
         navigate(`/author/${user?.username}`);
      }
   }, [isSuccess, navigate, updateData?.message, user?.username]);

   const handleActive = (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (userRole?.role === 'Admin') {
         setActive((current: any) => !current);
      }
   };

   const handleUpdate = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (canSubmit) {
         await updateUser(updateObject);
      }
   };

   return (
      <form className='space-y-4 pt-10' onSubmit={handleUpdate}>
         <h2 className='text-xl font-bold text-center py-2 text-fuchsia-500'>
            Edit Profile
         </h2>
         <div className='relative justify-center items-center flex flex-col'>
            <div className='relative'>
               <img
                  src={image ? image : user?.profilePicture?.url}
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
               <p className='text-gray-700 text-sm font-semibold'>Change</p>
               <AiFillEdit className='text-fuchsia-300 cursor-pointer w-5 h-5 ' />
            </label>
            <input
               hidden
               onChange={handleImage}
               type='file'
               id='picfile'
               name='image'
               disabled={userRole?.role === 'Admin'}
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
                  onChange={handleChange as any}
                  autoComplete='off'
                  disabled={user?.username !== userRole?.username}
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
                     onChange={handleChange as any}
                     autoComplete='off'
                     disabled
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
                     onChange={handleChange as any}
                     autoComplete='off'
                     disabled
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
                  style={{ resize: 'none' }}
                  ref={textAreaRef}
                  id='userBio'
                  rows={2}
                  maxLength={200}
                  value={userBio}
                  onChange={handleBio as any}
                  name='userBio'
                  disabled={user?.username !== userRole?.username}
                  placeholder='Your Bio...'
                  className='input p-2 border rounded-md text-sm'
               />
               <p
                  className={`text-right  font-charm font-semibold tracking-wide text-sm  ${
                     countRemaining <= 10
                        ? 'text-red-500'
                        : countRemaining <= 30
                        ? 'text-yellow-500'
                        : 'text-gray-400'
                  }`}
               >
                  {countRemaining}/{maxText}
               </p>
            </div>
         </div>
         <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
               <label htmlFor='verified' className='label'>
                  Verified:
               </label>
               <p className='cursor-pointer'>
                  {user?.verified ? (
                     <MdVerified className='text-fuchsia-600 w-6 h-6' />
                  ) : (
                     <span className='text-gray-400'>Not Verified</span>
                  )}
               </p>
            </div>
            <div className='flex items-center space-x-2'>
               <label htmlFor='active' className='label'>
                  Active
               </label>
               <p className=' cursor-pointer' onClick={handleActive}>
                  {active ? (
                     <span>
                        <FaUserCheck className='text-fuchsia-600 w-6 h-6' />
                     </span>
                  ) : (
                     <span>
                        <FaUserLock className='text-gray-600/60 w-6 h-6' />
                     </span>
                  )}
               </p>
            </div>
         </div>
         <ActionButton
            buttonDescription='Update Profile'
            canSubmit={canSubmit}
            isLoading={isLoading}
         />
         {isError && (
            <p className='text-sm text-red-500 py-2'>
               {(error as any)?.data?.message}
            </p>
         )}
      </form>
   );
};

export default EditProfileForm;
