import React from "react";

const PlusBtn = (props) => {

    const PlusHandler = () => {
        // console.log(props.id)
        props.onClickPlus(props.id)
    }

    return (
        <button className="btn btn-link px-2" onClick={PlusHandler}>
            {props.children}
        </button>
    )
}

export default PlusBtn;