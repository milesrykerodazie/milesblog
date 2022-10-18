import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ActionButton from '../components/ActionButton';
import LoginForm from '../components/forms/LoginForm';
import { useLoginMutation } from '../redux/features/authApiSlice';
import { useAppDispatch } from '../redux/app/store';
import { setCredentials } from '../redux/features/auth/authSlice';
import usePersist from '../hooks/usePersist';
import jwtDecode from 'jwt-decode';
import useTitle from '../hooks/useTitle';

const customId = 'custom-id-yes';

const Login = () => {
   useTitle('Login');
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
      // const type = event.target.type;
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
         const decoded = jwtDecode(loginResponse?.accessToken);

         const { username, roles } = (decoded as any).UserCred;
         localStorage.setItem(
            'user',
            JSON.stringify({ role: roles, username: username }),
         );
      }
   }, [loginResponse]);

   useEffect(() => {
      if (isSuccess) {
         setData({
            email: '',
            password: '',
         });
         dispatch(setCredentials({ accessToken: loginResponse?.accessToken }));
         toast.success(loginResponse?.success, {
            toastId: customId,
         });
         navigate('/');
      }
      // eslint-disable-next-line
   }, [isSuccess, navigate, dispatch, loginResponse?.accessToken]);

   const loginContent = (
      <form
         className='bg-rg-image h-screen bg-cover bg-center'
         onSubmit={handleSubmit}
      >
         <div className='dark:bg-black/80 bg-white/80 h-screen w-full duration-500 ease-in'>
            <div className='flex flex-col justify-center items-center h-full'>
               <div className='max-w-3xl w-full mx-auto bg-white dark:bg-black  p-5 space-y-3 shadow-md shadow-fuchsia-500 lg:rounded-md duration-500 ease-in'>
                  <h2 className='text-xl font-bold text-center py-2 text-fuchsia-500'>
                     Sign In
                  </h2>
                  <LoginForm data={data} handleChange={handleChange} />
                  {isError && (
                     <p className='text-red-500 text-sm'>
                        {(error as any)?.data?.message}
                     </p>
                  )}
                  <label
                     htmlFor='persist'
                     className='label flex text-xs space-x-2 items-center'
                  >
                     <input
                        type='checkbox'
                        className=''
                        id='persist'
                        onChange={handleToggle}
                        checked={persist}
                     />
                     <span className=''>Trust This Device</span>
                  </label>
                  <ActionButton
                     buttonDescription='Sign In'
                     canSubmit={canSubmit}
                     isLoading={isLoading}
                  />
                  <Link to='/auth/forgotpassword'>
                     <p className='text-sm text-slate-500 font-medium mt-1'>
                        Forgot Password?
                     </p>
                  </Link>
                  <div className=' flex items-center justify-center space-x-2'>
                     <p className='text-fuchsia-500 font-medium text-sm tracking-wide'>
                        Do not have an account?
                     </p>
                     <Link to='/auth'>
                        <button className='dark:text-white text-gray-700 font-semibold text-sm'>
                           Sign Up
                        </button>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </form>
   );
   return loginContent;
};

export default Login;
