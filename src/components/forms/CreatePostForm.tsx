import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor, { modules, formats } from '../../hooks/Editor';

const CreatePostForm = ({
   data,
   handleChange,
   handleImage,
   valueEditor,
   setValueEditor,
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
}) => {
   const postForm = (
      <div className='space-y-7 pb-3'>
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
         {/* <div className=''>
            <label htmlFor='post' className='label'>
               Post
            </label>
            <div className='relative'>
               <input
                  type='text'
                  id='post'
                  name='post'
                  placeholder='Post'
                  autoComplete='off'
                  className='input'
                  value={data.post}
                  onChange={handleChange}
               />
            </div>
         </div> */}
         <div>
            <Editor />
            <ReactQuill
               className='editor'
               theme='snow'
               value={valueEditor}
               onChange={setValueEditor}
               placeholder={'Write something awesome...'}
               modules={modules}
               formats={formats}
            />
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
            <label htmlFor='file' className='label'>
               <p className='mb-3'>Blog Image</p>
               <p className='text-base 2xl:text-xl tracking-wider text-gray-400'>
                  Photo or Video
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
         </div>
      </div>
   );

   return postForm;
};

export default CreatePostForm;
