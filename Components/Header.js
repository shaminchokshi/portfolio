/** @format */

import React, { useState } from "react";
import Scrollspy from "react-scrollspy";
import Backdrop from "./Backdrop";
import Circle from "./Circle";
import Sidebar from "./Sidebar";

const Header = () => {
  const [sidedrawer, setsidedrawer] = useState(false);
  const handleImageClick = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };
  const sideDrawerHandler = () => {
    setsidedrawer(!sidedrawer);
  };
  return (
    <div className='text-white relative flex justify-between py-5 lg:px-36'>
      <div className='opacity-20 absolute -left-36 -top-24'>
        <Circle />
      </div>
      <div className='bg-yellow-100 font-Comfortaa h-11 px-4 ml-10 lg:ml-0 lg:px-0  text-black lg:w-12 lg:h-12 text-center pt-1 rounded-full font-bold text-3xl '>
        s
      </div>
      <div
        onClick={sideDrawerHandler}
        className='visible lg:hidden absolute top-8 right-10'>
        <div className='w-12 mb-2 h-1 bg-white rounded-full'></div>
        <div className='w-12 mb-2 h-1 bg-white rounded-full'></div>
        <div className='w-12 mb-2 h-1 bg-white rounded-full'></div>
      </div>
      <Scrollspy items={["about", "experience", "projects", "blog", "contact"]}>
        <ul className='lg:visible invisible font-sans flex py-3 text-lg'>
          <li
            onClick={() => handleImageClick("about")}
            className='cursor-pointer hover:text-yellow-100 '>
            ABOUT
          </li>
          <span className='cursor-pointer hover:text-yellow-100 px-1'>/</span>
          <li
            onClick={() => handleImageClick("experience")}
            className='cursor-pointer hover:text-yellow-100 pl-2'>
            EXPERIENCE
          </li>
          <span className='cursor-pointer hover:text-yellow-100 px-1'>/</span>
          <li
            onClick={() => handleImageClick("projects")}
            className='cursor-pointer hover:text-yellow-100 pl-2'>
            PROJECTS{" "}
          </li>
          <span className='cursor-pointer hover:text-yellow-100 px-1'>/</span>
          <li
            onClick={() => handleImageClick("blog")}
            className='cursor-pointer hover:text-yellow-100 pl-2'>
            BLOG
          </li>
          <span className='cursor-pointer hover:text-yellow-100 px-1'>/</span>
          <li
            onClick={() => handleImageClick("contact")}
            className='cursor-pointer hover:text-yellow-100 pl-2'>
            CONTACT
          </li>
        </ul>
      </Scrollspy>
      <div className='invisible lg:visible my-3 font-Comfortaa font-bold cursor-pointer text-lg hover:text-yellow-100'>
        Resume
      </div>
      {sidedrawer && (
        <>
          <Backdrop sideDrawerHandler={sideDrawerHandler} />
          <Sidebar sideDrawerHandler={sideDrawerHandler} />
        </>
      )}
    </div>
  );
};

export default Header;
