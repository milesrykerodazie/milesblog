import React, { useState } from 'react';
import ActionButton from '../components/ActionButton';
import VerifyEmailForm from '../components/forms/VerifyEmailForm';

const VerifyEmail = () => {
   const [data, setData] = useState({
      userId: '',
      verificationCode: '',
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

   const verifyEmailContent = (
      <form
         className='bg-rg-image h-screen bg-cover bg-center'
         onSubmit={handleSubmit}
      >
         <div className='bg-slate-900/90 h-full'>
            <div className='flex flex-col justify-center items-center h-full'>
               <div className='max-w-3xl w-full mx-auto bg-white p-5 space-y-3 shadow-md  shadow-white lg:rounded-md'>
                  <h2 className='text-xl font-bold text-center py-2 text-slate-600'>
                     Verify Email
                  </h2>
                  <VerifyEmailForm data={data} handleChange={handleChange} />
                  <ActionButton buttonDescription='Verify' canSave={canSave} />
               </div>
            </div>
         </div>
      </form>
   );
   return verifyEmailContent;
};

export default VerifyEmail;
