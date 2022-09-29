import { ImSpinner } from 'react-icons/im';
import { actionTypes } from '../typescriptTypes';

const ActionButton = ({
   buttonDescription,
   canSubmit,
   isLoading,
}: actionTypes) => {
   const Button = (
      <button
         type='submit'
         disabled={!canSubmit}
         className={`w-full bg-fuchsia-300 text-white py-2 rounded-md font-semibold tracking-wide uppercase flex items-center justify-center space-x-3 ${
            !canSubmit && 'opacity-20 text-gray-400'
         }`}
      >
         <span>{buttonDescription}</span>{' '}
         {isLoading && (
            <ImSpinner className='w-6 h-6 text-slate-200 animate-spin' />
         )}
      </button>
   );

   return Button;
};

export default ActionButton;
