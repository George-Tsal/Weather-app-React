import React from 'react'

const Button = ({ name, testApi }) => {
  return (
    <>
        <button onClick={testApi} type="submit" className='px-8 py-4 rounded-l-xl md:rounded-l-none rounded-r-xl w-full md:w-auto bg-sky-400 text-slate-100 uppercase tracking-widest hover:bg-sky-500 transition-all duration-200 ease-linear'>{name}</button>
    </>
  )
}

export default Button