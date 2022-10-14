import React from "react";
import { Outlet, Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      Cart Logo
      <input type="text" placeholder="enter your name" />
      <Link to="scanner">Scanner</Link>
    </div>
  );
};

export default Landing;
