/** @format */

import React from "react";
import { BlogData } from "./data/BlogData";
import Image from "next/image";
import classes from "./css/head.module.css";

const Blog = () => {
  return (
    <div id='blog' className='mt-36 text-white'>
      <div
        className={`${classes.head} flex justify-center text-7xl  mb-10 font-Comfortaa `}>
        BLOGS
      </div>
      <div className='flex flex-wrap lg:ml-32 mx-5 '>
        {Object.values(BlogData).map((data, index) => (
          <div className='lg:mx-11 mb-14 relative lg:w-3/12' key={index}>
            <Image
              alt='blogImage'
              width={"350px"}
              height={"350px"}
              src={data.imageLink}
            />
            <div className='pb-12 pt-3 font-Comfortaa text-2xl'>
              {Object.keys(BlogData)[index]}
            </div>
            <div className='absolute pt-2  w-full bottom-0  border-t-2 border-white'>
              {data.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
