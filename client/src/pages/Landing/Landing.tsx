import React from 'react'

const Landing = () => {
  return (
    <div className='bg-primary w-screen min-h-screen flex justify-center items-center'>
      <div className='max-w-[110rem] w-full test min-h-screen'>
        {/* navbar */}
        <div className="header text-white md:px-[1.5rem] px-[.8rem] py-[.5rem] flex justify-between items-center test">
          <div className="logo">
            <h3 className='text-bold text-ubuntu text-[24px] font-bold'>Open<span className='text-unique'>Sphere</span></h3>
          </div>
          <div className="navbar">
            <ul className='flex gap-3 text-ubuntu font-medium text-[16px]'>
              <li className='hover:text-[greenyellow] cursor-pointer'>Home</li>
              <li className='hover:text-[greenyellow] cursor-pointer'>About</li>
              <li className='hover:text-[greenyellow] cursor-pointer'>Division</li>
              <li className='hover:text-[greenyellow] cursor-pointer'>Contact Us</li>
            </ul>
          </div>
          <button className='btn text-[black]'>
            <a href="/login">Login</a>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Landing
