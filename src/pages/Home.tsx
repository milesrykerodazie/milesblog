import { Link } from 'react-router-dom';
import { useAppSelector } from '../redux/app/store';
import { selectCurrentToken } from '../redux/features/auth/authSlice';

const Home = () => {
   const token = useAppSelector(selectCurrentToken);
   console.log('role token: =>', token);
   return (
      <div className=''>
         <div className='space-x-4 p-3'>
            <h1 className='titleText'>Home</h1>
         </div>
         <div className='flex items-center space-x-3'>
            <Link to='/blog'>
               <button className='text-xl font-semibold text-gray-200 bg-slate-800 px-4 py-2 mt-3 rounded-md '>
                  blog
               </button>
            </Link>
            <Link to='/admin'>
               <button className='text-xl font-semibold text-gray-200 bg-slate-800 px-4 py-2 mt-3 rounded-md '>
                  Admin
               </button>
            </Link>
         </div>
      </div>
   );
};

export default Home;
