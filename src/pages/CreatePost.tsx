import React, { useEffect, useState } from 'react';
import CreatePostForm from '../components/forms/CreatePostForm';
import { useCreatePostMutation } from '../redux/features/postApiSlice';
import { toast } from 'react-toastify';
import useTitle from '../hooks/useTitle';

const customId = 'custom-id-yes';
const CreatePost = () => {
   useTitle('create-post');
   //getting the method to post
   const [
      createPost,
      { data: postSuccess, isLoading, isSuccess, isError, error },
   ] = useCreatePostMutation();

   //for authomatically getting post owner on login
   let user: any;
   const userName = localStorage.getItem('user');
   if (userName) {
      user = JSON.parse(userName);
   }

   //states for form details
   const [data, setData] = useState({
      postOwner: user ? user?.username : '',
      title: '',
      role: user ? user?.role : '',
   });

   const [valueEditor, setValueEditor] = useState('');
   const [category, setCategory] = useState('');
   const [featured, setFeatured] = useState(false);
   const [suspended, setSuspended] = useState(false);
   const [tags, setTags] = useState([]);

   //removing dublicates from tags array
   let uniqueTags: any[] = [];
   tags.forEach((element: any) => {
      if (!uniqueTags.includes(element)) {
         uniqueTags.push(element);
      }
   });

   //image state
   const [image, setImage] = useState(undefined);

   useEffect(() => {
      if (isSuccess) {
         setData({
            postOwner: user ? user?.username : '',
            title: '',
            role: user ? user?.role : '',
         });
         setImage(undefined);
         setValueEditor('');
         setCategory('');
         setTags([]);
      }
      if (postSuccess) {
         toast.success(postSuccess?.message, {
            toastId: customId,
         });
      }
      // eslint-disable-next-line
   }, [isSuccess, postSuccess]);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // const type = event.target.type;

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
      category: category,
      image: image,
      post: valueEditor,
      role: data?.role,
      featured: featured,
      suspended: suspended,
      tags: uniqueTags,
   };

   const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (canSubmit && valueEditor) {
         await createPost(postObject);
      }
   };

   return (
      <form onSubmit={handleSubmit} className='pb-10'>
         <div className=' w-full lg:mx-auto bg-white dark:bg-black p-5 space-y-3 shadow-md shadow-fuchsia-500 lg:rounded-md duration-500 ease-in'>
            {isError && (
               <h2 className='py-2 text-red-600 '>
                  {(error as any)?.data?.message}
               </h2>
            )}
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
               featured={featured}
               setFeatured={setFeatured}
               suspended={suspended}
               setSuspended={setSuspended}
               category={category}
               setCategory={setCategory}
               tags={tags}
               setTags={setTags}
            />
         </div>
      </form>
   );
};

export default CreatePost;
