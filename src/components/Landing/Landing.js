import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Landing.css";

const Landing = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [validator, setValidator] = useState("d-none");

  const nameHandler = (e) => {
    if (e.target.value.trim().length > 0) {
      setEnteredName(e.target.value);
      // setIsValid(true);
      console.log(e.target.value);
    }
  };
  const formHandler = (e) => {
    e.preventDefault();
    if (enteredName.trim().length === 0) {
      setIsValid(false);
      return;
    }
    console.log(enteredName);
    // props.onSetUserName(enteredName);
    setEnteredName("");
  };
  return (
    <div className="p-2 d-flex flex-column align-items-center">
      <div className="cart-logo p-5">
        <i className="bi bi-cart-check-fill"></i>
      </div>
      <form
        onSubmit={formHandler}
        className="d-flex flex-column align-items-center w-75"
      >
        <div className="mb-3 w-100 ">
          <label htmlFor="userName" className="form-label">
            User name
          </label>
          <input
            id="userName"
            className={`form-control w-100 ${
              !isValid && "border border-danger"
            }`}
            type="text"
            placeholder="Name"
            onChange={nameHandler}
            value={enteredName}
          />
          <span className={`${validator}`}></span>
        </div>
        <button className="btn btn-dark w-100" type="submit">
          Save name
        </button>
      </form>

      <Link className="btn btn-success mt-5" to="scanner">
        Scanner
      </Link>
    </div>
  );
};

export default Landing;
