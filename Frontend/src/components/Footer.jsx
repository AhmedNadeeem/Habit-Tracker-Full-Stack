import React from 'react'
import FacebbokIcon from "../assets/facebook.png";
import GithubIcon from "../assets/github.png";
import GmailIcon from "../assets/gmail.png";
import InstagramIcon from "../assets/instagram.png";
import { Link } from 'react-router-dom';

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
        <Link className='text-white font-thin hover:underline hover:text-[#ff9100]' to="/">Home</Link>
        <Link className='text-white font-thin hover:underline hover:text-[#ff9100]' to="/dashboard">Dashboard</Link>
        <Link className='text-white font-thin hover:underline hover:text-[#ff9100]' to="/habits">All Habits</Link>
        <Link className='text-white font-thin hover:underline hover:text-[#ff9100]' to="/stats">Stats</Link>
      </div>

      <div className='flex justify-center items-center bg-black py-3'>
        <p className='text-white font-thin text-sm tracking-widest'>Made with <span className='text-[#ff9100]'>&hearts;</span> by Ahmed Gondal</p>
      </div>

    </footer>
  )
}

export default Footer