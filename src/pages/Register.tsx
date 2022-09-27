import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ActionButton from '../components/ActionButton';
import RegistrationForm from '../components/forms/RegistrationForm';
import { useRegisterMutation } from '../redux/features/authApiSlice';

const Register = () => {
   //the register state from redux
   const [
      register,
      { data: successResponse, isLoading, isSuccess, isError, error },
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
   });

   const [passwordMatch, setPasswordMatch] = useState<string>('');

   // console.log('register data: =>', data);

   useEffect(() => {
      if (isSuccess) {
         setData({
            fullName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
         });
         navigate('/verifyemail');
      }
   }, [isSuccess, navigate]);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const type = event.target.type;

      const name = event.target.name;

      const value = event.target.value;

      setData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const canSubmit = [...Object.values(data)].every(Boolean);

   const registerObject = {
      fullName: data?.fullName.trim(),
      email: data?.email.trim(),
      username: data?.username.trim(),
      password: data?.password.trim(),
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
         className='bg-rg-image h-screen bg-cover bg-center'
         onSubmit={handleSubmit}
      >
         <div className='bg-slate-900/90 h-full'>
            <div className='flex flex-col justify-center items-center h-full'>
               <div className='max-w-3xl w-full mx-auto bg-white p-5 space-y-3 shadow-md  shadow-white lg:rounded-md'>
                  <h2 className='text-xl font-bold text-center py-2 text-slate-600'>
                     Sign Up
                  </h2>
                  <RegistrationForm data={data} handleChange={handleChange} />
                  <ActionButton
                     buttonDescription='Sign Up'
                     canSubmit={canSubmit}
                     isLoading={isLoading}
                  />
               </div>
               <div className='mt-4 flex items-center justify-center space-x-2'>
                  <p className='text-white text-xs tracking-wide'>
                     Already have an account?
                  </p>
                  <Link to='/login'>
                     <button className='text-slate-300 font-semibold text-sm'>
                        Sign In
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </form>
   );
   return registerContent;
};

export default Register;
