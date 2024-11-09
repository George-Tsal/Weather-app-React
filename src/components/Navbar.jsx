import React from 'react'
import { Outlet } from 'react-router-dom'


const Navbar = () => {
  return (
      <>
          <header className='bg-transparent w-full h-24 border-b-2 border-b-sky-50 backdrop-blur-md'>
              <div className='container flex flex-row justify-center items-center h-full mx-auto text-slate-100'>
                  <h2 className='text-2xl font-semibold'>Simple weather app</h2>
              </div>
          </header>
          <Outlet />
      </>
  )
}

export default Navbar