/** @format */

import React, { useState } from "react";
import { Data } from "./data/experienceData";
import classes from "./css/head.module.css";

const Experience = () => {
  const [title, settitle] = useState(Object.keys(Data)[0]);
  const [displayData, setdisplayData] = useState(Object.values(Data)[0]);
  const change = (index) => {
    settitle(Object.keys(Data)[index]);
    setdisplayData(Object.values(Data)[index]);
  };
  return (
    <div id='experience' className='mt-28  text-white'>
      <div
        className={`${classes.head} font-Comfortaa text-5xl lg:text-8xl flex justify-center lg:ml-72 `}>
        EXPERIENCE
      </div>
      <div className='flex flex-col lg:flex-row lg:mx-28 mt-14'>
        <div className='lg:w-2/5 overflow-x-auto mr-8  flex flex-row lg:flex-col h-auto '>
          {Object.keys(Data).map((element, index) => {
            if (element === title) {
              return (
                <div
                  className='border-l-4 bg-gray-700 pr-10 lg:mr-0 text-yellow-100 font-bold bg-opacity-60 border-yellow-100 cursor-pointer py-3 pl-3'
                  onClick={() => change(index)}
                  key={index}>
                  {element}
                </div>
              );
            }
            return (
              <div
                className='border-l-4 pr-10  lg:mr-0 border-yellow-100 cursor-pointer py-3 pl-3'
                onClick={() => change(index)}
                key={index}>
                {element}
              </div>
            );
          })}
        </div>
        <div className='ml-9 lg:mt-0 mt-10'>
          <div className='text-2xl font-bold'>{title}</div>
          <div className='py-3'>{displayData.Duration}</div>
          <ul className='list-square text-yellow-100'>
            {displayData.points.map((element, index) => (
              <li className='text-white pb-5 text-base' key={index}>
                {element}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
