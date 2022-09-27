import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ActionButton from '../components/ActionButton';
import LoginForm from '../components/forms/LoginForm';
import { useLoginMutation } from '../redux/features/authApiSlice';
import { useAppDispatch } from '../redux/app/store';
import { setCredentials } from '../redux/features/auth/authSlice';
import usePersist from '../hooks/usePersist';

const customId = 'custom-id-yes';

const Login = () => {
   //the login function
   const [
      login,
      { data: loginResponse, isLoading, isSuccess, isError, error },
   ] = useLoginMutation();

   // initializing navigate
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const [persist, setPersist] = usePersist();

   const [data, setData] = useState({
      email: '',
      password: '',
   });

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const type = event.target.type;

      const name = event.target.name;

      const value = event.target.value;

      setData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };
   const handleToggle = () => setPersist((current: any) => !current);
   const canSubmit = [...Object.values(data)].every(Boolean);
   const loginObject = {
      email: data?.email.trim(),
      password: data?.password.trim(),
   };

   const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (canSubmit) {
         await login(loginObject);
      }
   };
   useEffect(() => {
      if (loginResponse) {
         toast.success(loginResponse?.success, {
            toastId: customId,
         });
      }
   }, [loginResponse]);

   useEffect(() => {
      if (isSuccess) {
         setData({
            email: '',
            password: '',
         });
         dispatch(setCredentials({ accessToken: loginResponse?.accessToken }));
         navigate('/blog');
      }
   }, [isSuccess, navigate, dispatch]);

   const loginContent = (
      <form
         className='bg-rg-image h-screen bg-cover bg-center'
         onSubmit={handleSubmit}
      >
         <div className='bg-slate-900/90 h-full'>
            <div className='flex flex-col justify-center items-center h-full'>
               <div className='max-w-3xl w-full mx-auto bg-white p-5 space-y-3 shadow-md  shadow-white lg:rounded-md'>
                  <h2 className='text-xl font-bold text-center py-2 text-slate-600'>
                     Sign In
                  </h2>
                  <LoginForm data={data} handleChange={handleChange} />
                  {isError && (
                     <p className='text-red-500 text-sm'>
                        {(error as any)?.data?.message}
                     </p>
                  )}
                  <label htmlFor='persist' className='form__persist'>
                     <input
                        type='checkbox'
                        className='form__checkbox'
                        id='persist'
                        onChange={handleToggle}
                        checked={persist}
                     />
                     Trust This Device
                  </label>
                  <ActionButton
                     buttonDescription='Sign In'
                     canSubmit={canSubmit}
                     isLoading={isLoading}
                  />
                  <Link to='/forgotpassword'>
                     <p className='text-sm text-slate-600 font-medium'>
                        Forgot Password?
                     </p>
                  </Link>
               </div>
               <div className='mt-4 flex items-center justify-center space-x-2'>
                  <p className='text-white text-xs tracking-wide'>
                     Do not have an account?
                  </p>
                  <Link to='/register'>
                     <button className='text-slate-300 font-semibold text-sm'>
                        Sign Up
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </form>
   );
   return loginContent;
};

export default Login;
