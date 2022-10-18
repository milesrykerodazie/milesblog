import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ActionButton from '../components/ActionButton';
import RegistrationForm from '../components/forms/RegistrationForm';
import { useRegisterMutation } from '../redux/features/authApiSlice';
import useTitle from '../hooks/useTitle';

const customId = 'custom-id-yes';
const Register = () => {
   useTitle('Register');
   //the register state from redux
   const [
      register,
      { data: registerResponse, isLoading, isSuccess, isError, error },
   ] = useRegisterMutation();

   // initializing navigate
   const navigate = useNavigate();

   //states for form details
   const [data, setData] = useState({
      fullName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      userBio: '',
   });

   const [passwordMatch, setPasswordMatch] = useState<string>('');
   //image state
   const [image, setImage] = useState(undefined);

   useEffect(() => {
      if (isSuccess) {
         setData({
            fullName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            userBio: '',
         });
         toast.success(registerResponse?.message, {
            toastId: customId,
         });
         navigate('/auth/verifyemail');
      }
      // eslint-disable-next-line
   }, [isSuccess, navigate]);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // const type = event.target.type;

      const name = event.target.name;

      const value = event.target.value;

      setData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

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

   const canSubmit = [...Object.values(data)].every(Boolean);

   const registerObject = {
      fullName: data?.fullName.trim(),
      email: data?.email.trim(),
      username: data?.username.trim(),
      password: data?.password.trim(),
      userBio: data?.userBio.trim(),
      profilePicture: image,
   };

   const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (data?.password.trim() !== data?.confirmPassword.trim()) {
         setPasswordMatch('Password do not match');
         setData({ ...data, password: '', confirmPassword: '' });
         return;
      }
      if (canSubmit) {
         await register(registerObject);
      }
   };

   const registerContent = (
      <form
         className='bg-rg-image bg-cover bg-center w-full h-screen'
         onSubmit={handleSubmit}
      >
         <div className='dark:bg-black/90 bg-white/80 h-screen w-full duration-500 ease-in'>
            <div className='flex flex-col pt-3'>
               <div className='lg:max-w-4xl w-full lg:mx-auto bg-white dark:bg-black p-3 space-y-2 shadow-md shadow-fuchsia-500 lg:rounded-md duration-500 ease-in'>
                  {isError && (
                     <h2 className=' text-red-600 text-sm capitalize'>
                        {(error as any)?.data?.message}
                     </h2>
                  )}
                  <h2 className='text-xl font-bold text-center py-2 text-fuchsia-500'>
                     Sign Up
                  </h2>
                  <RegistrationForm
                     data={data}
                     handleChange={handleChange}
                     image={image}
                     setImage={setImage}
                     handleImage={handleImage}
                  />
                  {passwordMatch && (
                     <span className='py-1 text-red-600 text-sm'>
                        {passwordMatch}
                     </span>
                  )}
                  <ActionButton
                     buttonDescription='Sign Up'
                     canSubmit={canSubmit}
                     isLoading={isLoading}
                  />
                  <div className='mt-4 flex items-center justify-center space-x-2'>
                     <p className='text-fuchsia-500 font-medium text-sm tracking-wide'>
                        Already have an account?
                     </p>
                     <Link to='/auth/login'>
                        <button className='dark:text-white text-gray-700 font-semibold text-sm'>
                           Sign In
                        </button>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </form>
   );
   return registerContent;
};

export default Register;
