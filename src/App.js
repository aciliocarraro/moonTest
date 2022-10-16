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

  const [basket, setBasket] = useState([
    // {
    //   id: unId(),
    //   barcode: "123456",
    //   product_name: "Product" + Math.floor(Math.random() * 1000),
    //   product_price: 50.10,
    //   product_qtty: 1
    // }
  ]);

  const setUserNameHandler = (userName) => {
    setUserName(userName);
  }
  const minusHandler = (itemId) => {
    // console.log('minus', itemId)
    const index = basket.findIndex(item => item.id == itemId);
    const tempArray = [...basket];
    if (tempArray[index].product_qtty == 1) {
      tempArray.splice(index, 1);
      setBasket(tempArray);
      return
    }
    else {
      if (index >= 0) {
        tempArray[index].product_qtty--;
        setBasket(tempArray)
        return
      }
    }
  }

  const plusHandler = (itemId) => {
    const index = basket.findIndex(item => item.id == itemId);
    const tempArray = [...basket];
    if (index >= 0) {
      tempArray[index].product_qtty++;
      setBasket(tempArray)
      return
    }
  }
  const clearBasket = () => {
    setBasket([]);
    alert('Thank you for shopping with us ');
  }

  const totalItems = () => {
    let sum = 0;
    basket.map((item) => sum += item.product_qtty);
    return sum;
  }
  const addBarCodeHandler = (barcode, prodName) => {
    //this code must be commented out if there is no product list
    // const index = basket.findIndex(item => item.barcode == barcode)
    // const tempList = [...basket]
    // if (index >= 0) {
    //   tempList[index].product_qtty++
    //   setBasket(tempList)
    //   return
    // }
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
    // setBasketQtt((prevValue) => {
    //   return prevValue * totalItems();
    // });
  }
  return (
    // nav-link d-flex align-items-center fs-4"
    //['nav-link d-flex align-items-center', isActive? 'text-primary fs-4': 'fs-3'].filter(Boolean).join(" ") 
    //filter is optional
    <BrowserRouter>
      <Head userName={userName} />
      <div className="App">
        <div className="d-flex justify-content-around nav">
          <div className="py-2 px-3 nav-item">
            <NavLink className={({ isActive }) => ['nav-link d-flex align-items-center', isActive ? 'text-primary fs-3' : 'text-dark fs-4'].filter(Boolean).join(" ")} to="/" end><i className="bi bi-house-fill"></i><span> Home </span></NavLink>
          </div>
          <div className="py-2 px-3 nav-item">
            <NavLink className={({ isActive }) => ['nav-link d-flex align-items-center', isActive ? 'text-primary fs-3' : 'text-dark fs-4'].filter(Boolean).join(" ")} to="/scanner"><i className="bi bi-upc-scan"></i><span> Scanner </span></NavLink>
          </div>
          <div className="py-2 px-3 nav-item">
            <NavLink className={({ isActive }) => ['nav-link d-flex align-items-center', isActive ? 'text-primary fs-3' : 'text-dark fs-4'].filter(Boolean).join(" ")} to="/basket"><i className="bi bi-cart-fill"></i><span> Basket </span>{totalItems() > 0 && <span className="sup">{totalItems()}</span>}</NavLink>
          </div>
        </div>
      </div>
      <Routes>
        <Route index element={<Landing onSetUserName={setUserNameHandler} />} />
        <Route path="scanner" element={<Scanner onAddBarCode={addBarCodeHandler} />} />
        <Route path="basket" element={<Basket basket={basket} totalItems={totalItems()} onMinusItem={minusHandler} onPlusItem={plusHandler} onClearBasket={clearBasket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
