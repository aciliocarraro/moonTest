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
  // const plusHandler = (itemId) => {
  //   // props.onPlusHandler(itemId);
  //   console.log(itemId)
  // }
  // const minusHandler = (itemId) => {
  //   // props.onMinusHandler(itemId);
  //   // console.log(itemId)


  // }

  const total = () => {
    let sum = 0;
    props.basket.map((value) => sum += value.product_price * value.product_qtty);
    return sum;
  }

  return (
    <div className="container">
      <div className="cart-bg">
        <div className="cart-area row g-0">
          <div className="basket-area col-lg-8 mb-5 bg-success">
            <div className="p-5">
              <h1>Shopping Basket</h1>
              <hr className="my-4" />
              {props.basket.length === 0 && <div className="text-center fs-3">There are no articles in this cart</div>}
              {
                props.basket.map((item) => (
                  <div className="row mb-4 justify-content-between align-items-center" key={item.id}>
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp" className="img-fluid rounded-3" alt="Cotton T-shirt" />
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <h6 className="text-muted">{item.product_name}</h6>
                      <h6 className="text-black mb-0">Barcode {item.barcode}</h6>
                      <h6 className="text-black mb-0">Id {item.id}</h6>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3 d-flex justify-content-center align-items-center">
                      <MinusBtn
                        onClickMinus={props.onMinusItem}
                        id={item.id}
                      >   <i className="bi bi-dash-square-fill"></i></MinusBtn>
                      <p className="bg-white p-2 fw-bold">{item.product_qtty}</p>
                      <PlusBtn
                        onClickPlus={props.onPlusItem}
                        id={item.id}
                      >   <i className="bi bi-dash-square-fill"></i></PlusBtn>

                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offsert-lg-1">
                      <h6 className="mb-0">{currencyFormater(item.product_price)}</h6>
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
          <div className="cart-summary col-lg-4 bg-warning">
            <div className="p-5">
              <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
              <hr className="my-4"></hr>
              <div className="d-flex justify-content-between mb-4">
                <h5 className="text-uppercase">Total items </h5>
                <h5>{props.totalItems}</h5>
              </div>
              <div className="d-flex justify-content-between mb-5">
                <h5 className="text-uppercase">Total price</h5>
                <h5>€ {total()}</h5>
              </div>
            </div>
          </div>

        </div>
      </div>  {/*end cart-container*/}
      <div className="d-flex justify-content-center">
        <button className="btn btn-danger px-4 fs-4" onClick={purchaseHandler}> <i className="bi bi-cart-check-fill"></i> Checkout
        </button>
      </div>

    </div>
  );
};

export default Basket;
