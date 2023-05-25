import { comment, post } from "@/@types/@types";
import { baseURL } from "@/baseURl";
import axios from "axios";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import React, { useState } from "react";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatISO9075 } from "date-fns";
import { create } from "domain";

interface Props {
  post: post;
  comments: comment[];
}
const Post = ({ post, comments }: Props) => {
  const { image, title, content: postContent, user, createdAt } = post;

  console.log(comments);
  const [form, setForm] = useState({
    name: "",
    email: "",

    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prevForm) => {
      const { name, value } = e.target;
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = form;
    if (!name || !email || !message) {
      toast.warn("please fill all the inputs");
      return;
    }
    try {
      const response = await fetch(`${baseURL}/comments/${post._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        toast.success("sent successfully");
        setForm({
          name: "",
          email: "",

          message: "",
        });
      }
    } catch (error: any) {
      toast.error("something wrong happened, try again later");
      console.log(error);
    }
  };

  return (
    <div className="px-2 py-4">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center">
        <img src={image} alt={title} className="max-h-[500px] w-full" />
        <h1 className="text-4xl md:text-5xl text-center">{title}</h1>
        <p className="text-xs text-gray-500">posted on: {formatISO9075(new Date(createdAt))}</p>
        
        <img src={user.avatar} alt=""  className="h-14 w-14 rounded-full object-cover mt-5 mb-1"/>
        <p className="text-sm text-gray-500">Author: {user.name}</p>
        <div className="my-3">{parse(postContent)}</div>
      </div>
      <div className="grid place-items-center grid-cols-1 md:grid-cols-2">
        <h3 className="text-2xl my-2">{comments.length}{" "}{comments.length===1?"reply":"replies"}</h3>
        {comments &&
          comments.map((item) => (
            <div className="bg-gray-200 px-4 py-3" key={item._id}>
                <div className="flex items-center justify-between gap-6">
                <p className="text-xs text-gray-500"><span className="text-sm text-gray-700">
                By: </span>   {item.name}</p>
              <p className="text-xs text-gray-500"><span className="text-sm text-gray-700">
                At: </span>{formatISO9075(new Date(item.createdAt))}</p>
                </div>
             <p className="text-sm mt-4 text-gray-500">message:</p>
              <p className="text-lg">{item.content}</p>
            </div>
          ))}
      </div>
      <div className="mt-4 flex flex-col items-center">
        <h2 className="text-2xl">Add a Comment</h2>
        <p className="text-center text-base">Your Email address will not be published</p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <textarea
            placeholder="Message"
            value={form.message}
            name="message"
            onChange={handleChange}
            cols={30}
            rows={7}
            className="p-2"
          />
          <input
            type="text"
            placeholder="Full Name*"
            value={form.name}
            name="name"
            onChange={handleChange}
            className="p-2"
          />
          <input
            type="email"
            placeholder="Email*"
            value={form.email}
            name="email"
            onChange={handleChange}
            className="p-2"
          />

          <button className="bg-gray-700 text-white py-2 px-4 rounded-sm">COMMENT</button>
        </form>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get<post[]>(`${baseURL}/posts`, {
    withCredentials: true,
  });

  const paths = data.map((post) => ({
    params: {
      id: post._id,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;
  const { id } = params as { id: string };
  const { data: post } = await axios.get(`${baseURL}/posts/${id}`);

  const { data: comments } = await axios.get(`${baseURL}/comments/${id}`);

  return {
    props: { post, comments },
  };
};

export default Post;
