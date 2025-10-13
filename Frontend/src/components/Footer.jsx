import React from "react";
import FacebbokIcon from "../assets/facebook.png";
import GithubIcon from "../assets/github.png";
import GmailIcon from "../assets/gmail.png";
import InstagramIcon from "../assets/instagram.png";
import LinkedInIcon from "../assets/linkedin.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="flex items-center justify-center gap-4 mb-4 pt-12">
        <Link to={"https://www.facebook.com/share/15r77G11e4/"}>
          <img
            className="max-sm:w-8 w-10 bg-white rounded-xl p-1  hover:p-1.5 cursor-pointer"
            src={FacebbokIcon}
            alt="Facebook icon"
          />
        </Link>
        <Link to={"https://github.com/AhmedNadeeem"}>
          <img
            className="max-sm:w-8 w-10 bg-white rounded-xl p-1 hover:p-1.5 cursor-pointer"
            src={GithubIcon}
            alt="Github icon"
          />
        </Link>
        <Link
          to={"https://mail.google.com/mail/?view=cm&fs=1&to=ag1858085@gmail.com"}
        >
          <img
            className="max-sm:w-8 w-10 bg-white rounded-xl p-1  hover:p-1.5 cursor-pointer"
            src={GmailIcon}
            alt="Gmail icon"
          />
        </Link>
        <Link
          to={
            "https://www.instagram.com/ahmed_gondall?igsh=MW9mMjhrazE2NzM4aQ=="
          }
        >
          <img
            className="max-sm:w-8 w-10 bg-white rounded-xl p-1  hover:p-1.5 cursor-pointer"
            src={InstagramIcon}
            alt="Instagram icon"
          />
        </Link>
        <Link to={"https://www.linkedin.com/in/ahmed-nadeem-091630247/"}>
          <img
            className="max-sm:w-8 w-10 bg-white rounded-xl p-1  hover:p-1.5 cursor-pointer"
            src={LinkedInIcon}
            alt="Linkedin icon"
          />
        </Link>
      </div>

      <div className="flex gap-4 justify-center items-center pb-12">
        <Link
          className="max-sm:text-sm text-white font-thin hover:underline hover:text-[#ff9100]"
          to="/"
        >
          Home
        </Link>
        <Link
          className="max-sm:text-sm text-white font-thin hover:underline hover:text-[#ff9100]"
          to="/habits"
        >
          All Habits
        </Link>
        <Link
          className="max-sm:text-sm text-white font-thin hover:underline hover:text-[#ff9100]"
          to="/stats"
        >
          Stats
        </Link>
      </div>

      <div className="flex justify-center items-center bg-black py-3">
        <p className="max-sm:text-xs text-white font-thin text-sm tracking-widest">
          Made with <span className="text-[#ff9100]">&hearts;</span> by Ahmed
          Gondal
        </p>
      </div>
    </footer>
  );
}

export default Footer;
