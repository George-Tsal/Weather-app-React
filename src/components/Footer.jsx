import React from 'react'

const Footer = () => {

  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
    <footer className='bg-sky-900 w-full h-24 backdrop-blur-md flex justify-center items-center fixed bottom-0'>
        <h5 className='text-slate-100'>&copy;Copyrights reserved | {year}</h5>
    </footer>
    </>
  )
}

export default Footer