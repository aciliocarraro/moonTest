import React from "react";
import Logo from "../Logo/Logo";
import "./Head.css";

const Head = (props) => {
  const userData = props.userData;
  console.log(userData[0].name);
  return (
    <div className="head bg-primary m-0">
      <Logo />
      <div className="user-name fs-3 text-white fw-bold">
        <p className="ms-3"> Hi {userData[0].name} <span className="fs-6"> id: {userData[0].id}</span> </p>
      </div>
    </div>
  );
};

export default Head;
