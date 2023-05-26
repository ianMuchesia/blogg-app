import { post } from '@/@types/@types'
import Link from 'next/link';
import React from 'react'
import { formatISO9075 } from "date-fns";
import { formatMongoDate } from '@/utils/utilsDate';

interface Props{
  posts:post[];
}
const Welcome = ({posts}:Props) => {
  return (
    <div className="my-4 p-2">
      <div className="flex flex-col items-center">
      <h1 className='text-4xl my-3 md:text-5xl text-center'>Inside Tech: Tips and Stories</h1>
      <p className='font-semibold text-lg my-2 sm:max-w-[500px] text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, repellat.</p>
      </div>
      <input type="text" 
      className='w-full py-1 px-4 text-lg text-gray-800 rounded-sm focus:outline-none lg:max-w-[40%]'
      placeholder='Search'/>
      <h2 className='text-2xl md:text-3xl mt-5'>Recent Blog Posts</h2>
      <div className="grid lg:grid-cols-3"> {posts && (<div className="cursor-pointer  lg:col-span-2" >
         <Link href={`/posts/${posts[0]._id}`}> 
         <div className="grid grid-cols-2 place-items-center gap-2 lg:grid-cols-1">
         
             
           <img src={posts[0].image} alt={posts[0].title} />
           <div className="">
           <h3 className='text-sm md:text-base lg:text-2xl'>{posts[0].title}</h3>
             <p className='hidden sm:block  overflow-hidden text-xs md:text-sm lg:text-base'>{posts[0].summary.slice(0,400)}...</p>  
           <p className='text-[8px] lg:text-sm text-gray-400'>  Posted on: {posts[0].formattedDate} </p> 
           
   
           </div>
         
         
           </div>
           </Link> 
         </div>)}
         
       <div className="lg:flex flex-col items-center">
      { posts && posts.slice(1,4).map((post)=>(<div className="cursor-pointer " key={post._id}>
      <Link href={`/posts/${post._id}`}> 
      <div className="grid grid-cols-2 place-items-center gap-2 lg:grid-cols-1">
      
          
        <img src={post.image} alt={post.title} className='lg:h-40 w-80' />
        <div className="">
        <h3 className='text-sm md:text-base'>{post.title.slice(0,30)}</h3>
          <p className='hidden sm:block  overflow-hidden text-xs md:text-sm lg:hidden'>{post.summary.slice(0,400)}...</p>  
        <p className='text-[8px] text-gray-400'>  Posted on: {post.formattedDate} </p> 
        

        </div>
      
      
        </div>
        </Link> 
      </div>))}
      </div>
      </div>

    </div>
  )
}

export default Welcome