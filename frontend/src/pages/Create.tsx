import { baseURL } from "@/baseURl";
import Editor from "@/components/Editor";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const router = useRouter();

  const [blogForm, setBlogForm] = useState({
    title: "",
    summary: "",
    category: "",
    file: "",
    content: "",
  });

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBlogForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditorChange = (value: string) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, summary, content, file, category } = blogForm;
    if (!title || !summary || !content || !category) {
      toast.error("Cannot post without a summary, title, and content");
      return;
    }
    console.log(blogForm);
    try {
      const { data } = await axios.post(
        `${baseURL}/posts`,
        {
          title,
          summary,
          content,
          file,
          category,
        },
        { withCredentials: true, timeout: 107000 }
      );
      // Process the response as needed
      if (data.success) {
        toast.success("Your Post was successful");
        setTimeout(() => {
          router.replace("/");
          setBlogForm({
            title: "",
            summary: "",
            category: "",
            file: "",
            content: "",
          });
        }, 2000);
      }
    } catch (error: any) {
      console.log(error);
      if (error.code === "ECONNABORTED") {
        // handle timeout error
        toast.error("Request timed out. Please try again later.");
        return;
      }
      if (error.response?.data?.msg) {
        toast.error(error.response.data.msg);
        return;
      }
      toast.error("Something wrong happened try again later");
    }
  };

  return (
    <section>
      <ToastContainer />
      <div className="py-14">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center md:items-start gap-3">
            <input
              type="title"
              name="title"
              placeholder="Title"
              value={blogForm.title}
              onChange={handleFormChange}
              className="px-4 py-2 border-2 border-gray-200 text-gray-950 rounded-sm focus:outline-none md:w-[40%]"
            />
            <input
              type="summary"
              name="summary"
              placeholder="Summary"
              value={blogForm.summary}
              onChange={handleFormChange}
              className="px-4 py-2 border-2 border-gray-200   text-gray-950 rounded-sm focus:outline-none w-[70%] md:max-w-[70%]"
            />
            <select
              name="category"
              value={blogForm.category}
              onChange={handleFormChange}
            >
              <option value="">Category</option>
              <option value="Software Development">Software Development</option>
              <option value="Data Analysis">Data Analysis</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Networking">Networking</option>

              <option value="Others">Others</option>
            </select>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="my-5 border-2 border-gray-200 "
            />
          </div>
          <Editor
            content={blogForm.content}
            handleEditorChange={handleEditorChange}
          />
          <button className="px-5 py-3 mx-auto bg-gray-800 w-[50%] text-white text-xl rounded-md">
            Post
          </button>
        </form>
      </div>
    </section>
  );
};

export default Create;
