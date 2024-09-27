import React from "react";

const UserMessage = ({ message }) => {
  return (
    <div className="row user-chat-box">
      <div className="chat-icon">
        <i className="fa fa-user" aria-hidden="true"></i>
      </div>
      <div className="chat-txt">{message}</div>
    </div>
  )
}

export default UserMessage