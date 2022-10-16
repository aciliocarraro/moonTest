import React, { useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
// import HomeLayout from "./components/HomeLayout/HomeLayout";
import Landing from "./components/Landing/Landing";
import Basket from "./components/Basket/Basket";
import Head from "./components/Head/Head";
import Scanner from "./components/newScanner/Scanner";

function App() {
  const unId = () => {
    let end = Math.floor(Math.random() * 1000).toString();
    let start = new Date().getUTCMilliseconds().toString();
    let id = start + '00' + end;
    return id;
  }

  const [userName, setUserName] = useState('User');
  const [basketQtt, setBasketQtt] = useState(0);
  const [basket, setBasket] = useState([
    // {
    //   id: unId(),
    //   barcode: "123456",
    //   product_name: "Product" + Math.floor(Math.random() * 1000),
    //   product_price: 50.10,
    //   product_qtty: 1
    // }
  ]);

  // console.log(basket);

  const setUserNameHandler = (userName) => {
    setUserName(userName);
  }
  const minusHandler = (itemId) => {
    // console.log('minus', itemId)
    setBasket((prevArray) => {
      const product = prevArray.find((item) => item.id == itemId);
      if (product.product_qtty == 1) {
        const newArray = prevArray.filter((item) => item.id !== itemId);
        return newArray;
      } else {
        product.product_qtty--;
        return prevArray;
      }

    })
    console.log(basket);
  }
  const plusHandler = (itemId) => {
    console.log('plus', itemId)
    setBasket((prevArray) => {
      const product = prevArray.find((item) => item.id == itemId);
      product.product_qtty++;
      return prevArray;
    })
    console.log(basket);
  }

  const totalItems = () => {
    let sum = 0;
    basket.map((item) => sum += item.product_qtty);
    return sum;
  }
  const addBarCodeHandler = (barcode, prodName) => {
    setBasket((prevBasketValue) => {
      return [...prevBasketValue, {
        id: unId(),
        barcode: barcode,
        product_name: prodName,
        product_price: Math.floor(Math.random() * (1000 - 100) + 100) / 100,
        product_qtty: 1
      }]
    })
    console.log(totalItems());
    setBasketQtt((prevValue) => {
      return prevValue * totalItems();
    });
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
            <NavLink className={({ isActive }) => isActive ? 'text-primary nav-link d-flex align-items-center fs-4' : 'fs-3 nav-link d-flex align-items-center text-dark'} to="/basket"><i className="bi bi-cart-fill"></i><span> Basket </span>{basketQtt > 0 && <span className="sup">{basketQtt}</span>}</NavLink>
          </div>
        </div>
      </div>
      <Routes>
        <Route index element={<Landing onSetUserName={setUserNameHandler} />} />
        <Route path="scanner" element={<Scanner onAddBarCode={addBarCodeHandler} />} />
        <Route path="basket" element={<Basket basket={basket} totalItems={totalItems()} onMinusItem={minusHandler} onPlusItem={plusHandler} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
