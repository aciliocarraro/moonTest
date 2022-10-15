import React from "react";
import "./Basket.css";


const Basket = (props) => {
  const editProdNameHandler = (e) => {
    console.log(e.target);
  }
  const purchaseHandler = () => {
    // console.log(JSON.stringify(props.basket))
    const basketInfo = props.basket;
    fetch('http://localhost/moon_basket/moon_basket_create.php', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(basketInfo)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  // console.log(props.basket);
  return (
    <div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-danger px-4 fs-3" onClick={purchaseHandler}> <i className="bi bi-cart-check-fill"></i>
        </button></div>
      {
        props.basket.map((item) => (
          <div key={item.id}>
            <p onClick={editProdNameHandler}>{item.product_name}</p>
            <p>{item.barcode}</p>
          </div>
        ))
      }
    </div >
  );
};

export default Basket;
