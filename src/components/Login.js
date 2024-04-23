import React from 'react'
import Header from './Header'
import { useState, useRef } from 'react'
import validateData, { validateName } from "../utility/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utility/firebase';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utility/userSlice';
import {USER_AVTAR} from "../utility/constants"

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);


  function toggleSignInForm() {
    setIsSignInForm(!isSignInForm)
  }

  function handleButtonClick() {


    if (!isSignInForm) {
      const message = validateName(name.current.value);
      setErrorMessage(message)

    }

    const message = validateData(email.current.value, password.current.value)
    setErrorMessage(message)
    if (message) return;
    //sign In sign up logic

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;


          updateProfile(user, {
            displayName: name.current.value,
             photoURL: USER_AVTAR,
          }).then(() => {
            // Profile updated!
            // ...
            const {uid,email,displayName,photoURL} = user;
            dispatch(
                addUser({
                    uid:uid,
                    email:email,
                    displayName:displayName,
                    photoURL:photoURL
                
                }))
           
          }).catch((error) => {
            // An error occurred
            // ...
            setErrorMessage(error.message)
          });
          

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

        });
    }
    else {

      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          navigate('/browse')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
        });
    }
  }


  return (
    <div className=''>
      <Header></Header>

      <div className='relative'>
        <div>
          <img
            src='https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg' />

        </div>
        <form onSubmit={(e) => e.preventDefault()} className=' bg-opacity-50 rounded absolute w-4/12 p-12 text-white  my-20 mx-auto top-0 left-[35%]  bg-black opacity-1 flex flex-col '>
          <h1 className=' font-bold text-3xl p-2 my-2 '>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          {!isSignInForm && <input ref={name} className='p-2 m-2 w-full bg-gray-700 rounded' type='text' placeholder='Full Name'></input>
          }
          <input ref={email} className='p-2 m-2 w-full bg-gray-700 rounded' type='text' placeholder='Email Address'></input>

          <input ref={password} className='p-2 m-2 w-full rounded bg-gray-700' type='password' placeholder='Password' ></input>
          {errorMessage && <p className='text-red-700 p-2  font-bold text-xl'>{errorMessage}</p>}
          <button onClick={handleButtonClick} className='p-2 m-2 w-full border rounded bg-red-600 '>{isSignInForm ? "Sign In" : "Sign Up"}</button>



          <div><p className='cursor-pointer p-2 my-2' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign up now " : "Already registered? Sign in Now"} </p></div>


        </form>
      </div>

    </div>
  )
}

export default Login