import { useAppSelector } from '@/reduxHooks'
import Link from 'next/link'
import React, { useState } from 'react'
import {AiOutlineSearch , AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import { formatISO9075 } from "date-fns";


const li_styles = {
  listStyle: `cursor-pointer hover:scale-x-110 hover:text-red-500 transition duration-500 hover:ease-in-out ml-10`,
}
const Navbar = () => {

  const auth = useAppSelector(state=>state.auth)

  console.log(auth)


  const [ toggle , setToggle] = useState(false)

  const closeToggle=()=>{
    setToggle(false)
  }

  
  return (
    <nav className='relative top-0 left-0 right-0 bottom-0 md:flex items-center justify-between lg:px-5 xl:px-10'>
      <div className='flex items-center justify-between z-[-1]'>
        <AiOutlineSearch className='text-2xl sm:text-4xl md:hidden'/>
        <Link href="/"><h4 className='text-xl flex items-center sm:text-4xl'>  <span className='text-xs'>the</span>
          Msodoki</h4></Link>
          <AiOutlineMenu className='text-2xl cursor-pointer sm:text-4xl md:hidden' onClick={()=>setToggle(true)}/>
      </div>
      <div className={`${toggle?"bg-white fixed  z-50 inset-0 flex ":"hidden"} flex-col items-center justify-evenly md:static md:flex md:bg-inherit`}>
        <AiOutlineClose className='text-4xl cursor-pointer transition duration-500 hover:ease-in-out hover:scale-125 md:hidden'onClick={()=>setToggle(false)} />
        <ul className='flex flex-col items-center justify-evenly md:flex-row gap-10 text-2xl'>
          <li></li>
          <li onClick={closeToggle} className={li_styles.listStyle}><Link href="/">Home</Link></li>
          <li onClick={closeToggle} className={li_styles.listStyle}><Link href="/Create">About</Link></li>
          <li onClick={closeToggle} className={li_styles.listStyle}><Link href="/Create">Categories</Link></li>
        {auth.user.role === 'admin' &&  <Link href="/Create"> <li className={li_styles.listStyle}>Create</li></Link> }
          
{/*           <li><Link href="/Login"><button className='px-4 py-2 bg-none border-2 border-gray-500 rounded-md hover:bg-red-500 hover:text-white cursor-pointer transition duration-300 hover:ease-linear '>Login</button></Link></li>
 */}        </ul>
      </div>
    </nav>
  )
}

export default Navbar