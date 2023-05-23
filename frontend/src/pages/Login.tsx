import Link from 'next/link'
import React, {useState} from 'react'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { baseURL } from '@/baseURl';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/reduxHooks';
import { setIsAuthenticated } from '@/store/authSlice';


const Login = () => {

    const dispatch = useAppDispatch()

    const router = useRouter();

    const  [ loginForm , setLoginForm ] = useState({
        email:"",
        password:"",
    })


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setLoginForm(prevForm=>({
            ...prevForm,
            [e.target.name]: e.target.value
        }))
    }


    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
        const { email , password } = loginForm
        if(!email || !password){
            toast.error("Please input both password and email")
        }
        try {
            const {data} = await axios.post(`${baseURL}/auth/login`, {email , password}, {withCredentials:true, timeout: 5000 })

            if (data.success) {
                toast.success("Login successful!");
        
                const {name , userId , role} = data.user
                dispatch(setIsAuthenticated({
                    name,
                    userId,
                    role
                }))
        
                setLoginForm({
                  email: "",
                  password: "",
                });
              
                setTimeout(()=>{
                  router.push('/')
                }, 2000)
              }
            } catch (error: any) {
              console.log(error);
              if (error.code === "ECONNABORTED") {
                // handle timeout error
                toast.error("Request timed out. Please try again later.");
                return
              }
              if (error.response?.data?.msg) {
                toast.error(error.response.data.msg);
                return;
              }
              toast.error("Something wrong happened try again later");
            }
          };
  return (
   


    <section className=" dark:bg-gray-900">
        <ToastContainer/>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     {/* title */}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email"
                          value={loginForm.email}
                          onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" 
                     value={loginForm.password}
                     onChange={handleChange}

                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                    </div>
                    {/* <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div> */}
                    <button type="submit" className="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <Link href="/Signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}




export default Login