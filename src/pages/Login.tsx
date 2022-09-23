import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ActionButton from '../components/ActionButton';
import LoginForm from '../components/forms/LoginForm';

const Login = () => {
   const [data, setData] = useState({
      email: '',
      password: '',
   });

   const handleSubmit = (e: React.SyntheticEvent) => {
      e.preventDefault();
      console.log(JSON.stringify(data));
   };

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const type = event.target.type;

      const name = event.target.name;

      const value = event.target.value;

      setData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const canSave = [...Object.values(data)].every(Boolean);

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
                  <ActionButton buttonDescription='Sign In' canSave={canSave} />
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
