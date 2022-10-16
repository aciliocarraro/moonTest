import React from "react";

const MinusBtn = (props) => {

    const minusHandler = () => {
        // console.log(props.id)
        props.onClickMinus(props.id)
    }

    return (
        <button className="btn btn-link px-2" onClick={minusHandler}>
            {props.children}
        </button>
    )
}

export default MinusBtn;