import React from "react";
import "./Basket.css";


const Basket = (props) => {
  const editProdNameHandler = (e) => {
    console.log(e.target);
  }

  console.log(props.basket);
  return (
    <div>
      {props.basket.map((item) => (
        <div key={item.id}>
          <p onClick={editProdNameHandler}>{item.product_name}</p>
          <p>{item.barcode}</p>
        </div>
      ))}
    </div>
  );
};

export default Basket;
