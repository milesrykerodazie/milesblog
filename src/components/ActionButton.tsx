import React from 'react';

const ActionButton = ({
   buttonDescription,
   canSave,
}: {
   buttonDescription: string;
   canSave: any;
}) => {
   const Button = (
      <button
         type='submit'
         disabled={!canSave}
         className={`w-full bg-slate-600 text-white py-2 rounded-md font-semibold tracking-wide uppercase ${
            !canSave && 'opacity-20 text-gray-400'
         }`}
      >
         {buttonDescription}
      </button>
   );

   return Button;
};

export default ActionButton;
