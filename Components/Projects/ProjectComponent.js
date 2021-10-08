/** @format */

import React from "react";

import { FiGithub } from "react-icons/fi";
import Image from "next/image";

const ProjectComponent = ({
  image,
  title,
  description,
  githubLink,
  reverse,
}) => {
  return (
    <div
      className={`${
        reverse
          ? "flex flex-col lg:flex-row-reverse"
          : "flex lg:flex-row flex-col"
      } my-14  `}>
      <div className=''>
        <Image width={"580px"} height={"380px"} alt='Project' src={image} />
      </div>
      <div
        className={`${
          reverse ? "lg:mr-8 mx-5 lg:mx-0 " : "lg:ml-28 mx-5 lg:mx-0 "
        }  lg:w-4/5`}>
        <div className='text-3xl font-bold font-Comfortaa mt-5 lg:mt-0 '>
          {title}
        </div>
        <div className={`py-6 text-lg font-sans`}>{description}</div>
        <a href={githubLink} rel='noreferrer' target='_blank'>
          <FiGithub size={25} />
        </a>
      </div>
    </div>
  );
};

export default ProjectComponent;
