/** @format */

import React from "react";

const Backdrop = ({ sideDrawerHandler }) => {
  return (
    <div
      onClick={sideDrawerHandler}
      className='lg:hidden visible fixed z-10 overflow-y-hidden top-0 left-0  w-screen h-screen bg-blue-300 opacity-20'></div>
  );
};

export default Backdrop;
