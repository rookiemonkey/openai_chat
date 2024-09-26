import React from "react";
import sendUserMessage from "../api/sendUserMessage";

const Input = () => {

  const handleClick = () => {
    sendUserMessage("testing")
  }
  
  return (
    <button className="col-1 chat-inputs-area-button" onClick={handleClick}>
      <i className="fa fa-paper-plane" aria-hidden="true"></i>
    </button>
  )
}

export default Input