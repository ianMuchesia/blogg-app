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
      <h2 className='text-2xl md:text-3xl mt-5 mb-2'>Recent Blog Posts</h2>
      <div className="grid gap-2 lg:grid-cols-3"> {posts && (<div className="cursor-pointer  lg:col-span-2" >
         <Link href={`/posts/${posts[0]._id}`}> 
         <div className="grid  place-items-center gap-2 lg:grid-cols-1 lg:gap-5">
         
             
           <img src={posts[0].image} alt={posts[0].title} className='' />
           <div className="">
           <h3 className='text-sm md:text-base lg:text-2xl'>{posts[0].title}</h3>
             <p className=' md:hidden overflow-hidden text-xs md:text-sm lg:text-base'>{posts[0].summary.slice(0,100)}...</p>  
             <p className='hidden  overflow-hidden text-xs md:text-sm lg:text-base md:block'>{posts[0].summary.slice(0,400)}...</p>  
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
          <p className='  overflow-hidden text-xs md:text-sm lg:hidden'>{post.summary.slice(0,100)}...</p>  
        <p className='text-[8px] text-gray-400'>  Posted on: {post.formattedDate} </p> 
        

        </div>
      
      
        </div>
        </Link> 
      </div>))}
      </div>
      </div>




      <h2 className='text-4xl md:text-4xl mt-10 mb-3 underline'>Editors Pick</h2>
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {posts&&posts.slice(0,7).map((post)=>(
    <div className="" key={post._id}>
     <h5>{post.formattedDate}</h5>
     <p>{post.summary.slice(0,150)}...</p>
     <Link href={`/posts/${posts[0]._id}` }>  <h4 className='cursor-pointer sm:text-xl '><span className='text-gray-500'>Read: </span> {post.title}</h4>
     </Link>
     <hr className='border-2 text-gray-600'/>
    </div>
  ))}
</div>
    </div>
  )
}

export default Welcome