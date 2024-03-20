import React from 'react'
import Header from './Header'
import { useState } from 'react'

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  function toggleSignInForm(){
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div className=''>
      <Header></Header>

      <div className='relative'>
        <div>
          <img className=''
            src='https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg' />

        </div>
        <form className=' bg-opacity-50 rounded absolute w-4/12 p-12 text-white  my-20 mx-auto top-0 left-[35%]  bg-black opacity-1 flex flex-col '>
          <h1 className=' font-bold text-3xl p-2 my-2 '>{isSignInForm?"Sign In":"Sign Up"}</h1>
          {!isSignInForm && <input className='p-2 m-2 w-full bg-gray-700 rounded' type='text' placeholder='Full Name'></input>
         }
          <input className='p-2 m-2 w-full bg-gray-700 rounded' type='text' placeholder='Email Address'></input>
          
          <input className='p-2 m-2 w-full rounded bg-gray-700' type='password' placeholder='Password' ></input>
          <button className='p-2 m-2 w-full border rounded bg-red-600 '>{isSignInForm?"Sign In":"Sign Up"}</button>



          <div><p className='cursor-pointer p-2 my-2' onClick={toggleSignInForm}>{isSignInForm?"New to Netflix? Sign up now ":"Already registered? Sign in Now"} </p></div>


        </form>
      </div>

    </div>
  )
}

export default Login