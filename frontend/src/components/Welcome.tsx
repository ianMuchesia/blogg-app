import { post } from '@/@types/@types'
import Link from 'next/link';
import React from 'react'

interface Props{
  posts:post[];
}
const Welcome = ({posts}:Props) => {
  return (
    <div className="my-4 p-2">
      <input type="text" 
      className='w-full py-1 px-4 text-lg text-gray-800 rounded-sm focus:outline-none'
      placeholder='Search'/>
      { posts && posts.slice(0,5).map((post)=>(<div className="cursor-pointer" key={post._id}>
        <Link href={`/posts/${post._id}`}>
        <img src={post.image} alt={post.title} />
        <div className="">
          <h6>{post.createdAt}</h6>
          <h3>{post.title}</h3>

        </div>
        </Link>
      </div>))}

    </div>
  )
}

export default Welcome