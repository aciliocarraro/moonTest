import React, { useContext, useState } from "react";
import "./Landing.css";

const Landing = (props) => {
  // const { userName, setUserName } = useContext(UserContext);
  // console.log('landing', setUserName);
  const [enteredName, setEnteredName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [validator, setValidator] = useState("d-none");

  const nameHandler = (e) => {
    if (e.target.value.length > 2) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setEnteredName(e.target.value);

    // console.log(e.target.value);
  };
  const formHandler = (e) => {
    e.preventDefault();
    if (enteredName.trim().length === 0) {
      setIsValid(false);
      return;
    }
    // console.log(enteredName);
    // setUserName(enteredName);
    props.onSetUserName(enteredName);
    setEnteredName("");
  };
  return (
    <div className="p-2 d-flex flex-column align-items-center">
      <div className="cart-logo p-5">
        <i className="bi bi-cart4"></i>
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
            className="form-control w-100"
            type="text"
            placeholder="Enter your name"
            onChange={nameHandler}
            value={enteredName}
          />
          {!isValid && <span className="text-danger fs-6">Name should be longer than 2 characters</span>}
        </div>
        <button className="btn btn-dark w-100" type="submit" disabled={!isValid}>
          Save name
        </button>
      </form>
    </div>
  );
};

export default Landing;
