import React from "react";
import { logo, NavMenu } from "../../constants";

import { IoMail } from "react-icons/io5";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="bg-slate-50 py-8 ">
      <div className="container flex flex-col justify-center items-center gap-4">
        <img
          src={logo}
          alt=""
          width={40}
          height={40}
          onClick={() => {
            navigate("/");
          }}
        />
        <h1 className="text-xl sm:text-2xl text-blue font-semibold">
          AI Powered Quiz App
        </h1>
        <div className="flex gap-4">
          <a href="mailto:santhoshs19032003@gmail.com">
            <IoMail size={20}/>
          </a>
          <a href="https://www.linkedin.com/in/santhosh-s-163a04263/">
            <FaLinkedinIn size={20}/>
          </a>
          <a href="https://github.com/Santhosh1933">
            <FaGithub size={20}/>
          </a>
        </div>
      </div>
    </div>
  );
};
