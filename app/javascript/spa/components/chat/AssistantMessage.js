import React from "react";

const AssistantMessage = ({ message }) => {
  return (
    <div className="row gpt-chat-box">
      <div className="chat-icon">
        <i className="fa fa-laptop" aria-hidden="true"></i>
      </div>
      <div className="chat-txt">{message}</div>
    </div>
  )
}

export default AssistantMessage