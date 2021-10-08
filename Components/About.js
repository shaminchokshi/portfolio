/** @format */

import React from "react";
import Image from "next/image";
import classes from "./css/head.module.css";
import Circle from "./Circle";

const About = () => {
  return (
    <div
      id='about'
      className='relative lg:px-28 lg:mt-56 flex flex-col lg:flex-row text-white'>
      <div className='absolute -right-32 bottom-52 opacity-20'>
        <Circle />
      </div>
      <div className='invisible lg:visible font-Comfortaa text-8xl mr-16'>
        <span className={classes.head}>A</span>
        <br />
        <span className={classes.head}>B</span>
        <br />
        <span className={classes.head}>O</span>
        <br />
        <span className={classes.head}>U</span>
        <br />
        <span className={classes.head}>T</span>
      </div>
      <div
        className={`${classes.head} flex justify-center lg:hidden -mb-36 -mt-96 font-Comfortaa text-6xl lg:text-8xl lg:mr-16`}>
        ABOUT
      </div>
      <Image
        width={"980px"}
        height={"350px"}
        className='invisible lg:visible mx-20 w-36 h-36 rounded-lg'
        alt='userImage'
        src={"/Photo.jpeg"}
      />
      <Image
        width={"280px"}
        height={"400px"}
        className='visible px-16 lg:invisible mx-20 w-12 h-36 rounded-lg'
        alt='userImage'
        src={"/Photo.jpeg"}
      />
      <div className='px-4 lg:px-0 mt-4 lg:mt-0 lg:pl-12 font-sans '>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        dignissim justo non lacinia dapibus. Etiam non ipsum diam. Mauris mollis
        nunc mi, ac eleifend metus eleifend et. <br />
        Phasellus ultricies non mauris id blandit. Proin non consequat mauris.
        Duis commodo augue eu leo vulputate, a dictum ligula condimentum.
        <br /> eu velit tincidunt, id elementum tellus congue. Nam dictum
        consequat mi eget efficitur.
        <br /> Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam
        semper placerat purus, ut sollicitudin augue elementum sed. Nam a sem
        egestas, cursus quam. Mauris mollis nunc mi, ac eleifend metus eleifend
        et. <br />
        Phasellus ultricies non mauris id blandit. Proin non consequat mauris.
        Duis commodo augue eu leo vulputate, a dictum ligula condimentum. eu
        velit tincidunt, id elementum tellus congue. Nulla dictum ipsum N
      </div>
    </div>
  );
};

export default About;
2;
