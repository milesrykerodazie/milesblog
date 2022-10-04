import React, { useEffect, useState } from 'react';
import ActionButton from '../components/ActionButton';
import CreatePostForm from '../components/forms/CreatePostForm';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useCreatePostMutation } from '../redux/features/postApiSlice';

const CreatePost = () => {
   //getting the method to post
   const [
      createPost,
      { data: postSuccess, isLoading, isSuccess, isError, error },
   ] = useCreatePostMutation();

   //states for form details
   const [data, setData] = useState({
      postOwner: '',
      title: '',
      category: '',
   });

   const [valueEditor, setValueEditor] = useState('');

   //image state
   const [image, setImage] = useState(undefined);

   useEffect(() => {
      if (isSuccess) {
         setData({
            postOwner: '',
            title: '',
            category: '',
         });
         setImage(undefined);
         setValueEditor('');
      }
   }, [isSuccess]);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const type = event.target.type;

      const name = event.target.name;

      const value = event.target.value;

      setData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   //handle and convert it in base 64
   const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
         const file = event.target.files[0];
         setFileToBase(file);
         console.log(file);
      }
   };

   const setFileToBase = (file: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
         // @ts-expect-error
         setImage(reader.result);
      };
   };

   const canSubmit = [...Object.values(data)].every(Boolean);

   const postObject = {
      postOwner: data?.postOwner,
      title: data?.title,
      category: data?.category,
      image: image,
      post: valueEditor,
   };

   const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      console.log('post object: => ', postObject);
      if (canSubmit && valueEditor) {
         await createPost(postObject);
      }
   };

   console.log('success data from post: => ', postSuccess);

   return (
      <form onSubmit={handleSubmit} className='py-10'>
         <div className='lg:max-w-[90%] w-full lg:mx-auto bg-white dark:bg-black p-5 space-y-3 shadow-md shadow-fuchsia-500 lg:rounded-md duration-500 ease-in'>
            <h2 className='text-2xl font-bold text-center pt-2 pb-3 text-fuchsia-500'>
               Create Post
            </h2>{' '}
            <CreatePostForm
               data={data}
               handleChange={handleChange}
               handleImage={handleImage}
               valueEditor={valueEditor}
               setValueEditor={setValueEditor}
               image={image}
               setImage={setImage}
               canSubmit={canSubmit}
               isLoading={isLoading}
            />
            {/* {image && (
            <div className='mt-2 flex justify-center'>
               <div className='h-1/2'>
                  <img
                     src={image}
                     alt='logo'
                     className='rounded-md object-cover'
                  />
               </div>
               <div
                  className='-ml-3 -mt-2 z-40'
                  onClick={() => setImage(undefined)}
               >
                  <AiFillCloseCircle className='w-6 h-6 text-sm7' />
               </div>
            </div>
         )} */}
            {/* <ActionButton
            buttonDescription='Create Post'
            canSubmit={canSubmit}
            isLoading={isLoading}
         /> */}
         </div>
      </form>
   );
};

export default CreatePost;
