import React from 'react'
import Netflix_Logo from '../images/Netflix_Logo.png'
const Header = () => {
  return (
    <div className=' z-10 absolute px-8 py-2 bg-gradient-to-b from-black'>
      <img 
      className="w-40 z-10"
      src={Netflix_Logo}
      alt='netflix logo'
      />
    </div>
  )
}

export default Header