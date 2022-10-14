import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./HomeLayout.css";
import Head from "../Head/Head";

const Home = () => {
  return (
    <>
      <Head />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/basket">Basket</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};
export default Home;
