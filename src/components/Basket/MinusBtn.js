import React from "react";

const MinusBtn = (props) => {

    const minusHandler = () => {
        // console.log(props.id)
        props.onClickMinus(props.id)
    }

    return (
        <button className="btn px-2 fs-5" onClick={minusHandler}>
            {props.children}
        </button>
    )
}

export default MinusBtn;