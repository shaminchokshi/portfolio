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
        width={"200px"}
        height={"400px"}
        className='visible px-16 lg:invisible mx-20 w-12 h-36 rounded-lg'
        alt='userImage'
        src={"/Photo.jpeg"}
      />
      <div className='px-4 lg:px-0 mt-4 lg:mt-0 lg:pl-12 font-sans text-lg'>
        Hello there Folks!! Its me Shamin, <br />
        A Designer, A Developer and a Dancer.
        <br /> 
         A creative vein runs through me but I’m equal parts technically savvy.<br /> 
        I can make a paint brush dance to the tunes in my head but being a geek at heart, 
        I also write code just for fun. The wee hours of my nights are spent whipping up dance choreographies but 
        during afternoons I strictly plan dates with my Raspberry Pi.<br /> 
        I wouldn’t say that I can do it all or that I am a master of some.
        And being the Jack of all trades to be honest - is next to impossible for anyone. 
        But I can indeed say that with these two primary skills that I enjoy and nurture profusely, my day goes by quickly, 
        I sleep soundly and always wake up exhilarated to start again. 
        <br />
        
      </div>
    </div>
  );
};

export default About;
2;
