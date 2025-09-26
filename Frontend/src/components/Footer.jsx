import React from 'react'
import FacebbokIcon from "../assets/facebook.png";
import GithubIcon from "../assets/github.png";
import GmailIcon from "../assets/gmail.png";
import InstagramIcon from "../assets/instagram.png";

function Footer() {
  return (
    <footer className='bg-gray-900'>

      <div className='flex items-center justify-center gap-4 mb-4 pt-12'>
        <img className='w-10 bg-white rounded-xl p-1  hover:p-1.5 cursor-pointer' src={FacebbokIcon} alt="Facebook icon" />
        <img className='w-10 bg-white rounded-xl p-1 hover:p-1.5 cursor-pointer' src={GithubIcon} alt="Github icon" />
        <img className='w-10 bg-white rounded-xl p-1  hover:p-1.5 cursor-pointer' src={GmailIcon} alt="Gmail icon" />
        <img className='w-10 bg-white rounded-xl p-1  hover:p-1.5 cursor-pointer' src={InstagramIcon} alt="Instagram icon" />
      </div>

      <div className='flex gap-4 justify-center items-center pb-12'>
        <a className='text-white font-thin hover:underline' href="">Home</a>
        <a className='text-white font-thin hover:underline' href="">Dashboard</a>
        <a className='text-white font-thin hover:underline' href="">Habits</a>
        <a className='text-white font-thin hover:underline' href="">Text</a>
      </div>

      <div className='flex justify-center items-center bg-black py-3'>
        <p className='text-white font-thin text-sm tracking-widest'>Made with <span className='text-red-500'>&hearts;</span> by Ahmed Gondal</p>
      </div>

    </footer>
  )
}

export default Footer