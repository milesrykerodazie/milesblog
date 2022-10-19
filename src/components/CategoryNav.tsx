import { NavLink } from 'react-router-dom';

import { CATEGORIES } from '../config/configurations';

const CategoryNav = ({ sidebar }: any) => {
   return (
      <nav className='flex items-center justify-center space-x-1 '>
         {CATEGORIES.map(({ id, value }) => (
            <div key={id}>
               <NavLink
                  to={`/category/${value}`}
                  className={({ isActive }) =>
                     isActive
                        ? 'font-semibold text-fuchsia-600  duration-500 ease-in uppercase text-base'
                        : 'font-semibold text-gray-800 dark:text-white duration-500 ease-in uppercase text-base flex space-x-1 '
                  }
               >
                  <span>{value}</span>
                  {value !== CATEGORIES[CATEGORIES.length - 1].value && (
                     <span className='text-fuchsia-500 px-1'>|</span>
                  )}
               </NavLink>
            </div>
         ))}
      </nav>
   );
};

export default CategoryNav;
