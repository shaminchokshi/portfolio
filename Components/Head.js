/** @format */

import React from "react";
import { FiTwitter, FiLinkedin, FiInstagram, FiGithub } from "react-icons/fi";
import classes from "./css/head.module.css";

const Head = () => {
  return (
    <div className='text-white mt-32'>
      <div className='w-5/6 lg:w-5/12'>
        <div className='flex font-sans ml-10 lg:ml-0 justify-end text-4xl text-yellow-100 mb-3'>
          Software Engineer & Business Data Analyst 
        </div>
        <div className='w-full border-2 bg-yellow-100 border-yellow-100' />
      </div>
      <div className='flex justify-center relative'>
        <div className='invisible lg:visible absolute left-44'>
          <div className='w-1 bg-yellow-100 h-36 border-yellow-100 border'></div>
        </div>
        <h1
          className={`${classes.head} font-Comfortaa text-center flex items-center justify-center text-6xl lg:text-8xl py-7`}>
          SHAMIN CHOKSHI
        </h1>
        <div className='invisible lg:visible absolute right-48 bottom-0'>
          <div className='w-1 bg-yellow-100 h-40 border-yellow-100 border'></div>
        </div>
      </div>
      <div className='w-full flex justify-end'>
        <div className='w-5/6 lg:w-5/12 flex justify-end'>
          <div className='w-full'>
            <div className='w-full border-2 bg-yellow-100 border-yellow-100' />
            <div className='font-sans text-4xl text-yellow-100 mt-3'>
              based in India
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
