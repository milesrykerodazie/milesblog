import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor, { modules, formats } from '../../hooks/Editor';
import { AiFillCloseCircle } from 'react-icons/ai';
import ActionButton from '../ActionButton';
import { MdClose } from 'react-icons/md';

const CreatePostForm = ({
   data,
   handleChange,
   handleImage,
   valueEditor,
   setValueEditor,
   image,
   setImage,
   canSubmit,
   isLoading,
}: {
   data: {
      postOwner: string;
      title: string;
      category: string;
   };
   handleChange: any;
   handleImage: any;
   valueEditor?: any;
   setValueEditor?: any;
   image?: any;
   setImage?: any;
   canSubmit?: any;
   isLoading?: any;
}) => {
   const postForm = (
      <div>
         <div className='flex flex-col lg:flex-row lg:space-x-3'>
            <div className='flex-1 space-y-5'>
               <div className=''>
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
               <div className=''>
                  <label htmlFor='category' className='label'>
                     Category
                  </label>
                  <div className='relative'>
                     <input
                        type='text'
                        id='category'
                        name='category'
                        placeholder='Category'
                        autoComplete='off'
                        className='input'
                        value={data.category}
                        onChange={handleChange}
                     />
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
                  {image && (
                     <div className='my-3 flex justify-center'>
                        <div className=''>
                           <img
                              src={image}
                              alt='logo'
                              className='rounded-md object-cover h-[300px] w-full'
                           />
                        </div>
                        <div
                           className='bg-fuchsia-500 h-6 w-6 rounded-full justify-center items-center flex -ml-3 -mt-2 z-40'
                           onClick={() => setImage(undefined)}
                        >
                           <MdClose className='w-5 h-5 text-white ' />
                        </div>
                     </div>
                  )}
               </div>
            </div>

            <div className='flex-1'>
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
               buttonDescription='Create Post'
               canSubmit={canSubmit}
               isLoading={isLoading}
            />
         </div>
      </div>
   );

   return postForm;
};

export default CreatePostForm;
