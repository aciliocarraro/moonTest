import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./components/HomeLayout/HomeLayout";
import Landing from "./components/Landing/Landing";
import Basket from "./components/Basket/Basket";

import Scanner from "./components/newScanner/Scanner";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Landing />}></Route>
          <Route path="scanner" element={<Scanner />}>
            Scanner
          </Route>
          <Route path="basket" element={<Basket />}>
            Basket
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //   </header>

    //   <div>
    //     <Scanner />
    //   </div>
    // </div>
  );
}

export default App;
