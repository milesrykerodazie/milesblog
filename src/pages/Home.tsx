import { Link } from 'react-router-dom';

const Home = () => {
   return (
      <div className=''>
         <hr className='border-slate-200  dark:border-slate-800 duration-500 ease-in' />
         <div className='space-x-4 p-3'>
            <h1 className='titleText'>Home</h1>
         </div>
         <Link to='/blog'>
            <button className='text-xl font-semibold text-gray-200 bg-slate-800 px-4 py-2 mt-3 rounded-md '>
               blog
            </button>
         </Link>
      </div>
   );
};

export default Home;
