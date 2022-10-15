import React, { useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
// import HomeLayout from "./components/HomeLayout/HomeLayout";
import Landing from "./components/Landing/Landing";
import Basket from "./components/Basket/Basket";
import Head from "./components/Head/Head";
import Scanner from "./components/newScanner/Scanner";

function App() {
  const [userName, setUserName] = useState('User');
  const [basket, setBasket] = useState([
    {
      id: Math.random().toString(),
      barcode: "123456",
      product_name: "Product" + Math.floor(Math.random() * 1000)
    }]);
  // console.log(basket);
  const setUserNameHandler = (userName) => {
    setUserName(userName);
  }
  const addBarCodeHandler = (newProduct) => {
    setBasket((prevBasketValue) => {
      return [...prevBasketValue, newProduct]
    })
  }
  return (
    // nav-link d-flex align-items-center fs-4"
    //['comun classe', isActive? 'new class: 'other class'].filter(Boolean).join(" ") 
    //filter is optional
    <BrowserRouter>
      <Head userName={userName} />
      <div className="App">
        <div className="d-flex justify-content-around my-2 nav">
          <div className="py-2 px-3 nav-item">
            <NavLink className={({ isActive }) => isActive ? 'text-primary nav-link d-flex align-items-center fs-4' : 'fs-3 nav-link d-flex align-items-center text-dark'} to="/" end><i className="bi bi-house-fill"></i><span> Home </span></NavLink>
          </div>
          <div className="py-2 px-3 nav-item">
            <NavLink className={({ isActive }) => isActive ? 'text-primary nav-link d-flex align-items-center fs-4' : 'fs-3 nav-link d-flex align-items-center text-dark'} to="/scanner"><i className="bi bi-upc-scan"></i><span> Scanner </span></NavLink>
          </div>
          <div className="py-2 px-3 nav-item">
            <NavLink className={({ isActive }) => isActive ? 'text-primary nav-link d-flex align-items-center fs-4' : 'fs-3 nav-link d-flex align-items-center text-dark'} to="/basket"><i className="bi bi-cart-fill"></i><span> Basket </span></NavLink>
          </div>
        </div>
      </div>
      <Routes>
        <Route index element={<Landing onSetUserName={setUserNameHandler} />} />
        <Route path="scanner" element={<Scanner onAddBarCode={addBarCodeHandler} />} />
        <Route path="basket" element={<Basket basket={basket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
