import React, { useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
  const addBarCodeHandler = (barcode) => {
    setBasket((prevBasketValue) => {
      return [...prevBasketValue, barcode]
    })
  }
  return (
    <BrowserRouter>
      <Head userName={userName} />
      <div className="App">
        <div className="d-flex justify-content-around my-2">
          <div className="py-2 px-3 btn btn-light">
            <Link to="/">Home</Link>
          </div>
          <div className="py-2 px-3 btn btn-light">
            <Link to="/scanner">Scanner</Link>
          </div>
          <div className="py-2 px-3 btn btn-light">
            <Link to="/basket">Basket</Link>
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
