import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
   <header className='bg-blue-500 p-2'>
    <nav className='flex justify-between p-2'>
        <div className="logo font-bold text-2xl">No<span className='text-purple-900'>To</span> <span className='text-sm font-normal'> Manage Notes and Todos at one place!</span></div>
        <ul className='flex gap-2'>
            <NavLink to="/" className={({isActive})=>`${isActive ? "underline ":""}cursor-pointer hover:underline`}>Notes</NavLink>
            <NavLink to="/todo" className={({isActive})=>`${isActive ? "underline ":""}cursor-pointer hover:underline`}>Todos</NavLink>
        </ul>
    </nav>
   </header>
  )
}

export default Navbar
