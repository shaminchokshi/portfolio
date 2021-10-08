/** @format */

import React from "react";
import { Data } from "./data/ProjectData";
import ProjectComponent from "./Projects/ProjectComponent";
import classes from "./css/head.module.css";

const Projects = () => {
  return (
    <div id='projects' className='mt-36 text-white'>
      <div
        className={`${classes.head} font-Comfortaa lg:ml-64 text-6xl flex justify-center lg:text-8xl`}>
        PROJECTS
      </div>
      <div className='lg:px-40'>
        {Object.values(Data).map((element, index) => (
          <ProjectComponent
            key={index}
            reverse={index % 2 === 0 ? false : true}
            title={Object.keys(Data)[index]}
            image={element.imageLink}
            githubLink={element.githubLink}
            description={element.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
