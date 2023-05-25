import { post } from '@/@types/@types'
import { baseURL } from '@/baseURl'
import axios from 'axios'
import { GetStaticPaths, GetStaticPropsContext } from 'next'
import React from 'react'

interface Props{
    post:post
}
const Post = ({post}:Props) => {

    const { image , title , content , user, createdAt} = post
  return (
    <div className="">
        <div className="">
            <img src={image} alt={title} />
            <h1>{title}</h1>
            <p>{createdAt}</p>
            <div className="">
                {content}
            </div>
        </div>
    </div>
  )
}





export const getStaticPaths:GetStaticPaths = async()=>{
    const {data} =await axios.get<post[]>(`${baseURL}/posts`, {withCredentials:true})

    const paths = data.map(post=>({
        params:{
            id:post._id
        }
    }))
    return{
        paths,
        fallback: 'blocking'
    }
}


export const  getStaticProps = async(context:GetStaticPropsContext)=>{
    const { params } = context;
    const { id } = params as { id: string };
    const {data:post} = await axios.get(`${baseURL}/posts/${id}`)



    return {
        props: {post}
    }
}


export default Post