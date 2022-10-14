import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./HomeLayout.css";
import Head from "../Head/Head";

const Home = () => {
  return (
    <div className="home-layout">
      <Head />
      <div className="d-flex justify-content-around my-2">
        <div className="py-2 px-3 btn btn-light">
          <Link to="/">Home</Link>
        </div>
        <div className="py-2 px-3 btn btn-light">
          <Link to="/basket">Basket</Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
};
export default Home;
