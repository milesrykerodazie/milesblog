import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor, { modules, formats } from '../../hooks/Editor';
import ActionButton from '../ActionButton';
import { MdClose } from 'react-icons/md';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import {
   MdOutlineKeyboardArrowDown,
   MdKeyboardArrowRight,
   MdRemoveCircle,
} from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import { CATEGORIES, TagOptions } from '../../config/configurations';
import { useUpdatePostMutation } from '../../redux/features/postApiSlice';
import { useNavigate } from 'react-router-dom';

const EditPostForm = ({ post }: any) => {
   const [updatePost, { isLoading, isSuccess, isError, error }] =
      useUpdatePostMutation();

   const navigate = useNavigate();
   //edit methods
   //states for form details
   const [data, setData] = useState({
      postOwner: post?.postOwner,
      title: post?.title,
      role: post?.role,
   });

   const [valueEditor, setValueEditor] = useState(post?.post);
   const [category, setCategory] = useState(post?.category);
   const [featured, setFeatured] = useState(post?.featured);
   const [suspended, setSuspended] = useState(post?.suspended);
   const [tags, setTags] = useState(post?.tags);

   //image state
   const [image, setImage] = useState(undefined);
   const [open, setOpen] = useState(false);
   const [openTag, setOpenTag] = useState(false);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // const type = event.target.type;

      const name = event.target.name;

      const value = event.target.value;

      setData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   //removing dublicates from tags array
   let uniqueTags: any[] = [];
   tags.forEach((element: any) => {
      if (!uniqueTags.includes(element)) {
         uniqueTags.push(element);
      }
   });
   //removing tags not needed
   const removeTag = (removedTag: any) => {
      const newTags = uniqueTags.filter((tag) => tag !== removedTag);
      setTags(newTags);
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
         setImage((reader as any).result);
      };
   };

   const updateObject = {
      id: post?._id,
      postOwner: data?.postOwner,
      title: data?.title,
      postSlug: post?.postSlug,
      category: category,
      image: image,
      post: valueEditor,
      role: data?.role,
      featured: featured,
      suspended: suspended,
      tags: uniqueTags,
   };
   //end of methods

   console.log('update object: => ', updateObject);

   const canSubmit = [...Object.values(data)].every(Boolean);
   console.log('can submit:', canSubmit);

   useEffect(() => {
      if (isSuccess) {
         navigate('/');
      }
   }, [isSuccess, navigate]);

   const handleUpdate = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (canSubmit) {
         await updatePost(updateObject);
      }
   };

   const editForm = (
      <form className='pb-10' onSubmit={handleUpdate}>
         <div className='w-full lg:mx-auto bg-white dark:bg-black p-5 space-y-3 shadow-md shadow-fuchsia-500 lg:rounded-md duration-500 ease-in'>
            {isError && (
               <h2 className='py-2 text-red-600 '>
                  {(error as any)?.data?.message}
               </h2>
            )}
            <h2 className='text-2xl font-bold text-center pt-2 pb-3 text-fuchsia-500'>
               Edit Post
            </h2>{' '}
            <div>
               <div className='flex flex-col lg:flex-row lg:space-x-3'>
                  <div className='flex-1 space-y-5'>
                     <div className='hidden'>
                        <label htmlFor='postOwner' className='label'>
                           Post Owner
                        </label>
                        <div className='relative'>
                           <input
                              type='text'
                              id='postOwner'
                              name='postOwner'
                              placeholder='Post Owmer'
                              autoComplete='off'
                              className='input'
                              value={data.postOwner}
                              onChange={handleChange}
                           />
                        </div>
                     </div>
                     <div className=''>
                        <label htmlFor='title' className='label'>
                           Title
                        </label>
                        <div className='relative'>
                           <input
                              type='text'
                              id='title'
                              name='title'
                              placeholder='Title'
                              autoComplete='off'
                              className='input'
                              value={data.title}
                              onChange={handleChange}
                           />
                        </div>
                     </div>
                     <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between md:space-x-3'>
                        <div className='md:flex-1 relative'>
                           <label htmlFor='category' className='label'>
                              Category
                           </label>
                           <div className='flex items-center p-2 justify-between'>
                              <p className='border-b border-gray-300 dark:border-gray-600 py-2 lg:py-1 pl-6 pr-3 w-full dark:bg-black/90 text-gray-800/60 dark:text-gray-300 duration-500 ease-in text-xs capitalize tracking-wider'>
                                 {category === ''
                                    ? 'Select Category'
                                    : category}
                              </p>
                              {!open ? (
                                 <MdKeyboardArrowRight
                                    className='w-4 h-4 lg:w-6 lg:h-6 text-gray-800 dark:text-white duration-500 ease-in'
                                    onClick={() =>
                                       setOpen((current) => !current)
                                    }
                                 />
                              ) : (
                                 <MdOutlineKeyboardArrowDown
                                    className='w-4 h-4 lg:w-6 lg:h-6 text-gray-800 dark:text-white duration-500 ease-in '
                                    onClick={() =>
                                       setOpen((current) => !current)
                                    }
                                 />
                              )}
                           </div>
                           {/* select category */}
                           {open && (
                              <div className='bg-white dark:bg-black shadow-sm shadow-fuchsia-600 absolute top-14 z-20 px-1 rounded mt-1 h-36 overflow-y-auto w-full duration-500 ease-in'>
                                 {CATEGORIES?.map(({ id, value }) => (
                                    <p
                                       key={id}
                                       onClick={() => {
                                          setCategory(value);
                                          setOpen((current) => !current);
                                       }}
                                       className='text-sm text-black/90 dark:text-white cursor-pointer hover:bg-fuchsia-500 duration-500 ease-in select-none'
                                    >
                                       <span className='pl-2 '>{value}</span>
                                    </p>
                                 ))}
                              </div>
                           )}
                        </div>
                        <div className='flex items-center justify-between md:flex-1'>
                           <div>
                              <label htmlFor='featured' className='label'>
                                 Featured
                              </label>
                              <p
                                 className='justify-center items-center flex cursor-pointer py-2'
                                 onClick={() =>
                                    setFeatured((current: any) => !current)
                                 }
                              >
                                 {featured ? (
                                    <TiTick className='text-fuchsia-600 text-lg' />
                                 ) : (
                                    <TiTick className='text-gray-600/60 text-lg' />
                                 )}
                              </p>
                           </div>
                           <div>
                              <label htmlFor='role' className='label'>
                                 Role
                              </label>
                              <p className='text-xs text-gray-400 py-2'>
                                 {data?.role}
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className=''>
                        <label htmlFor='tags' className='label'>
                           Tags
                        </label>
                        <div className='relative'>
                           <div className='flex items-center justify-between'>
                              {uniqueTags?.length !== 0 ? (
                                 <div className='flex space-x-2 py-2'>
                                    {uniqueTags.map((tag: any, index: any) => (
                                       <span
                                          key={index}
                                          className='border text-xs px-2 py-1 rounded border-fuchsia-300 dark:text-white flex relative'
                                       >
                                          {tag}{' '}
                                          <MdRemoveCircle
                                             className='absolute -top-2 -right-1 text-fuchsia-500 w-4 h-4 cursor-pointer'
                                             onClick={() => removeTag(tag)}
                                          />
                                       </span>
                                    ))}
                                 </div>
                              ) : (
                                 <p className='text-xs text-gray-500/60 dark: py-2'>
                                    Select Tags
                                 </p>
                              )}

                              {!openTag ? (
                                 <MdKeyboardArrowRight
                                    className='w-4 h-4 lg:w-6 lg:h-6 text-gray-800 dark:text-white duration-500 ease-in'
                                    onClick={() =>
                                       setOpenTag((current) => !current)
                                    }
                                 />
                              ) : (
                                 <MdOutlineKeyboardArrowDown
                                    className='w-4 h-4 lg:w-6 lg:h-6 text-gray-800 dark:text-white duration-500 ease-in '
                                    onClick={() =>
                                       setOpenTag((current) => !current)
                                    }
                                 />
                              )}
                           </div>

                           {/* select category */}
                           {openTag && (
                              <div className='bg-white dark:bg-black shadow-md shadow-fuchsia-600 absolute top-9 z-20 px-1 rounded mt-1 py-1 h-28 overflow-y-auto w-full duration-500 ease-in'>
                                 {TagOptions?.map(({ id, value }) => (
                                    <p
                                       key={id}
                                       onClick={() => {
                                          setOpenTag((current) => !current);
                                          setTags([...tags, value]);
                                       }}
                                       className='text-sm text-black/90 dark:text-white cursor-pointer hover:bg-fuchsia-500 duration-500 ease-in select-none'
                                    >
                                       <span className='pl-2 capitalize text-xs'>
                                          {value}
                                       </span>
                                    </p>
                                 ))}
                              </div>
                           )}
                        </div>
                     </div>
                     <div>
                        <label htmlFor='file' className='label '>
                           <p className='bg-fuchsia-600 px-3 py-1 rounded-sm mb-4 text-base 2xl:text-xl tracking-wider text-white text-center cursor-pointer'>
                              Insert Blog Image
                           </p>
                        </label>
                        <input
                           hidden
                           onChange={handleImage}
                           type='file'
                           id='file'
                           name='image'
                           accept='.png,.jpeg,.jpg,.gif,.webp'
                        />

                        <div className='my-3 flex justify-center'>
                           <div className=''>
                              <img
                                 src={image ? image : post?.image?.url}
                                 alt='logo'
                                 className='rounded-md object-cover h-[300px] w-full'
                              />
                           </div>
                           {image && (
                              <div
                                 className='bg-fuchsia-500 h-6 w-6 rounded-full justify-center items-center flex -ml-3 -mt-2 z-40'
                                 onClick={() => setImage(undefined)}
                              >
                                 <MdClose className='w-5 h-5 text-white ' />
                              </div>
                           )}
                        </div>
                     </div>
                  </div>

                  <div className='flex-1'>
                     <div
                        className='flex items-center space-x-2 justify-end'
                        onClick={() => setSuspended((current: any) => !current)}
                     >
                        <p className='text-gray-800 dark:text-gray-200'>
                           Suspend:
                        </p>
                        {suspended ? (
                           <BsFillEyeSlashFill className='text-gray-800 dark:text-gray-200' />
                        ) : (
                           <BsFillEyeFill className='text-gray-800 dark:text-gray-200' />
                        )}
                     </div>
                     <Editor />
                     <ReactQuill
                        className='dark:text-white rounded-md'
                        theme='snow'
                        value={valueEditor}
                        onChange={setValueEditor}
                        placeholder={'Write something awesome...'}
                        modules={modules}
                        formats={formats}
                     />
                  </div>
               </div>
               <div className='py-3'>
                  <ActionButton
                     buttonDescription='Update Post'
                     canSubmit={canSubmit}
                     isLoading={isLoading}
                  />
               </div>
            </div>
         </div>
      </form>
   );

   return editForm;
};

export default EditPostForm;
