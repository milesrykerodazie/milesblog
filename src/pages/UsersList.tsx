import { useState } from 'react';
import LoadingComponent from '../components/LoadingComponent';
import Users from '../components/Users';
import { useGetAllUsersQuery } from '../redux/features/usersApiSlice';
import { BiReset, BiSearch } from 'react-icons/bi';

const UsersList = () => {
   const {
      data: usersData,
      isLoading,
      isSuccess,
      isError,
      error,
   } = useGetAllUsersQuery('postList', {
      pollingInterval: 120000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
   });

   const [searchUsername, setSearchUsername] = useState('');
   const [searchedUser, setSearchedUser] = useState([]);

   const search = () => {
      if (searchUsername) {
         const filtered: any = usersData?.ids?.filter(
            (filteredUser) =>
               (usersData as any)?.entities[filteredUser].username ===
               searchUsername,
         );
         setSearchedUser(filtered);
      }
   };

   const reset = () => {
      setSearchUsername('');
      setSearchedUser([]);
   };

   return (
      <div>
         {isLoading && <LoadingComponent />}
         {isError && <p>{(error as any)?.data?.message}</p>}
         {isSuccess && (
            <div className='space-y-2 md:space-y-4 py-2 md:py-5 lg:max-w-6xl lg:mx-auto w-full px-2'>
               <div className='flex flex-col md:flex-row '>
                  <h2 className='text-fuchsia-600 text-sm lg:text-xl font-bold pb-3 md:flex-1'>
                     List of users
                  </h2>
                  <div className='flex items-center space-x-2'>
                     <div className='relative w-full'>
                        <input
                           type='text'
                           placeholder='search user'
                           value={searchUsername}
                           onChange={(e) => setSearchUsername(e.target.value)}
                           className='input'
                        />
                        <BiSearch className='inputIcon text-fuchsia-400' />
                     </div>
                     {searchedUser?.length > 0 ? (
                        <button
                           onClick={reset}
                           className='bg-fuchsia-600 rounded-full  justify-center items-center flex p-1'
                        >
                           <BiReset className=' text-white' />
                        </button>
                     ) : (
                        <button
                           onClick={search}
                           className='bg-fuchsia-600 rounded-full  justify-center items-center flex p-1'
                        >
                           <BiSearch className=' text-white' />
                        </button>
                     )}
                  </div>
               </div>
               <div>
                  {usersData?.ids?.length !== 0 && (
                     <div>
                        {searchedUser?.length > 0 ? (
                           <div>
                              {searchedUser.map((userId) => (
                                 <div key={userId}>
                                    <Users userId={userId} />
                                    {userId !==
                                       usersData?.ids[
                                          usersData?.ids.length - 1
                                       ] && <hr className='my-2 md:my-5' />}
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div>
                              {usersData?.ids?.map((userId) => (
                                 <div key={userId}>
                                    <Users userId={userId} />
                                    {userId !==
                                       usersData?.ids[
                                          usersData?.ids.length - 1
                                       ] && <hr className='my-2 md:my-5' />}
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};

export default UsersList;
