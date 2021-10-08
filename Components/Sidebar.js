/** @format */

import Scrollspy from "react-scrollspy";
import React from "react";
import { GiCancel } from "react-icons/gi";
import classes from "./css/sidebar.module.css";

const Sidebar = ({ sideDrawerHandler }) => {
  const handleImageClick = (id) => {
    sideDrawerHandler();
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      className={`${classes.Container} lg:hidden visible z-30 w-80 fixed right-0 top-0 overflow-y-hidden bg-black h-screen text-white`}>
      <div className='flex justify-end mt-7 mr-7'>
        <GiCancel onClick={sideDrawerHandler} size={30} />
      </div>
      <Scrollspy items={["about", "experience", "projects", "blog", "contact"]}>
        <ul className='lg:hidden visible font-sans justify-center items-center mt-7 lg:flex-row flex-col flex py-3 text-lg'>
          <li
            onClick={() => handleImageClick("about")}
            className='cursor-pointer my-4 text-2xl hover:text-yellow-100 '>
            ABOUT
          </li>
          <li
            onClick={() => handleImageClick("experience")}
            className='cursor-pointer my-4 text-2xl hover:text-yellow-100'>
            EXPERIENCE
          </li>
          <li
            onClick={() => handleImageClick("projects")}
            className='cursor-pointer my-4 text-2xl hover:text-yellow-100'>
            PROJECTS
          </li>
          <li
            onClick={() => handleImageClick("blog")}
            className='cursor-pointer my-4 text-2xl hover:text-yellow-100'>
            BLOG
          </li>
          <li
            onClick={() => handleImageClick("contact")}
            className='cursor-pointer my-4 text-2xl hover:text-yellow-100'>
            CONTACT
          </li>
        </ul>
      </Scrollspy>
      <div className='my-3 font-Comfortaa flex justify-center rounded mx-24 border-2 border-yellow-100 py-2 font-bold cursor-pointer text-lg hover:text-yellow-100'>
        Resume
      </div>
    </div>
  );
};

export default Sidebar;
