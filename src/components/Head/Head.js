import React from "react";
import Logo from "../Logo/Logo";
import "./Head.css";

const Head = (props) => {
  const userName = props.userName;
  return (
    <div className="head bg-primary m-0">
      <Logo />
      <div className="user-name fs-3 text-white fw-bold">Hi {userName}</div>
    </div>
  );
};

export default Head;
