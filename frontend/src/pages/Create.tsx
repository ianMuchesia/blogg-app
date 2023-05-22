import { baseURL } from '@/baseURl';
import Editor from '@/components/Editor';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';





const Create = () => {

  const [blogForm, setBlogForm] = useState({
    title: "",
    summary: "",
    category: "",
    file: "",
    content: "",
  });
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setBlogForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handleEditorChange = (
    value: string,
   
  ) => {
    setBlogForm((prevForm) => ({
      ...prevForm,
      content: value,
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBlogForm((prevForm) => ({
          ...prevForm,
          file: reader.result as string,
        }));
      };
    } else {
      setBlogForm((prevForm) => ({
        ...prevForm,
        file: "",
      }));
    }
  };
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { title, summary, content, file } = blogForm;
    if (!title || !summary || !content) {
      toast.error("Cannot post without a summary, title, and content");
      return;
    }
  console.log(blogForm)
 /*    try {
      const response = await axios.post(`${baseURL}/post`, blogForm, { withCredentials: true });
      // Process the response as needed
    } catch (error) {
      toast.error("Something went wrong");
    } */
  };
  
  return (
    <section>
      <ToastContainer />
  <div className='py-14' >
      <form onSubmit={handleSubmit} >
        <div className="flex flex-col items-center md:items-start gap-3">
        <input type="title" name="title" placeholder="Title" value={blogForm.title} onChange={handleFormChange} 
        className='px-4 py-2  text-gray-950 rounded-sm focus:outline-none md:w-[40%]'/>
        <input type="summary" name="summary" placeholder="Summary" value={blogForm.summary} onChange={handleFormChange} 
        className='px-4 py-2  text-gray-950 rounded-sm focus:outline-none w-[70%] md:max-w-[70%]'/>
        <input type="file" name="file" onChange={handleFileChange}  className='my-5'/>
        </div>
        <Editor content={blogForm.content} handleEditorChange={handleEditorChange} />
        <button className='px-5 py-3 mx-auto bg-gray-800 w-[50%] text-white text-xl rounded-md'>
        Post
        </button>
      </form>
      </div>
    </section>
  );
}

export default Create;
