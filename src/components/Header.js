import React from 'react'
import Netflix_Logo from '../images/Netflix_Logo.png'
import { signOut } from "firebase/auth";
import { auth } from '../utility/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser,removeUser } from '../utility/userSlice';
const Header = () => {
  const navigate=useNavigate();
  const user=useSelector(store=>store.user);
  const dispatch=useDispatch();
  function handleSignOut() {

    signOut(auth).then(() => {
      // Sign-out successful.
      
      
    }).catch((error) => {
      // An error happened.
      navigate('/error')
    });
  }

  useEffect(()=>{
        
        
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName,photoURL} = auth.currentUser;
        dispatch(
            addUser({
                uid:uid,
                email:email,
                displayName:displayName,
                photoURL:photoURL
            
            }))
            navigate('/browse')
        // ...
        
        
      } else {

        // User is signed out
        dispatch(removeUser())
        // ...
       navigate('/')
      }
    });
    return ()=>unsubscribe();
},[])
  return (
    <div className='w-screen flex justify-between z-10 absolute px-8 py-2 bg-gradient-to-b from-black'>
      <img
        className="w-40 z-10"
        src={Netflix_Logo}
        alt='netflix logo'
      />
     {user&& <div className='flex'>
        <img 
        className='w-12 h-12 '
        src={user.photoURL}/>
      <button onClick={handleSignOut} className='font-bold text-white'>(Sign out)</button>

      </div>}
  </div>
  )
}

export default Header