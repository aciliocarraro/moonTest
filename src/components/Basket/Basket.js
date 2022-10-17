import React from "react";
import "./Basket.css";
import MinusBtn from "./MinusBtn";
import PlusBtn from "./PlusBtn";

const Basket = (props) => {
  const currencyFormater = (number) => {
    let result = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number);
    return result;
  }

  const purchaseHandler = () => {
    const basketInfo = props.basket;
    // console.log(basketInfo);
    const userData = props.userData;
    // console.log(userData);
    const purchaseData = [basketInfo, ...userData];
    console.log(JSON.stringify(purchaseData));
    fetch('http://localhost/moon_basket/moon_basket_create.php', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(purchaseData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    props.onClearBasket();
  }

  const total = () => {
    let sum = 0;
    props.basket.map((value) => sum += value.product_price * value.product_qtty);
    return sum;
  }

  return (
    <div className="container">
      <div className="cart-bg">
        <div className="cart-area row g-3">
          <div className="col-lg-8 rounded-3">
            <div className="basket-area p-4 rounded-3">
              <h1 className="text-center">Shopping Basket</h1>
              <hr className="my-4" />
              {props.basket.length === 0 && <div className="text-center fs-3">There are no articles in this cart</div>}
              {
                props.basket.map((item) => (
                  <div className="row mb-4 justify-content-between align-items-center" key={item.id}>
                    <div className="col-md-2 col-lg-2 col-xl-2 text-center mb-2">
                      <img src="./img/product-image-placeholder.jpg" className="cart-img rounded-3 border border-dark" alt="Cotton T-shirt" />
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <h4 className="text-muted">{item.product_name}</h4>
                      <h6 className="text-black mb-0">Barcode {item.barcode}</h6>
                      <h6 className="text-black mb-0">Id {item.id}</h6>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3 plusMinusContainer dFlex justify-content-center align-items-center">
                      <MinusBtn
                        onClickMinus={props.onMinusItem}
                        id={item.id}
                      >   <i className="bi bi-dash-square-fill"></i></MinusBtn>
                      <p className="bg-white p-2 fw-bold m-0 fs-5 rounded-2">{item.product_qtty}</p>
                      <PlusBtn
                        onClickPlus={props.onPlusItem}
                        id={item.id}
                      >   <i className="bi bi-plus-square-fill"></i></PlusBtn>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 text-end">
                      <h4 className="mb-0">{currencyFormater(item.product_price)}</h4>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a href="#!" className="text-muted"><i className="fas fa-times"></i></a>
                    </div>
                    <hr className="my-4" />
                  </div>
                ))
              }
            </div>
          </div>
          <div className=" col-lg-4 rounded-3">
            <div className="cart-summary p-4 rounded-3">
              <h3 className="fw-bold mb-2 mt-2 pt-1 text-center">Summary</h3>
              <hr className="my-4"></hr>
              <div className="dFlex justify-content-between align-items-center mb-2">
                <h5 className="text-uppercase">Total items </h5>
                <h5>{props.totalItems}</h5>
              </div>
              <div className="dFlex justify-content-between align-items-center mb-2">
                <h5 className="text-uppercase">Total price</h5>
                <h5>{currencyFormater(total())}</h5>
              </div>
              <div className="dFlex justify-content-center align-items-center mt-5">
                {props.basket.length > 0 && (<button className="btn btn-danger px-4 fs-4" onClick={purchaseHandler}> <i className="bi bi-cart-check-fill"></i> Checkout
                </button>)}
              </div>
            </div>
          </div>

        </div>
      </div>  {/*end cart-container*/}
    </div>
  );
};

export default Basket;
