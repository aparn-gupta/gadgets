import React from 'react'
import { Link } from 'react-router'
import logoImg from "./assets/ug-logo.png"

const Navbar = () => {
  return (
    <div>
        <nav className='mt-1 z-40' style={{position: 'fixed', top: '-4px', left: 0, width: '100vw', background: '#020E1E'}} >
           <div className='container-fluid nav-clr text-white rounded-2xl py-2 flex' >

            <Link to="/" className='no-underline text-decoration-none text-white'>
            <div className='flex h-full items-center'>
               <img src={logoImg} className='w-10 h-10 mr-4' />

             
              <p className='text-2xl mt-3 no-underline text-white' style={{textDecoration: "none"}}> Ultimate Gadgeting</p>
               </div></Link>
           </div>
        </nav>
      
    </div>
  )
}

export default Navbar
