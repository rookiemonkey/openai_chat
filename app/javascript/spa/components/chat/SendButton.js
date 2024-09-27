import React from "react";
import { useChatApi, useChatNewUserMessage } from "../../context/useChat";

const SendButton = () => {
  const { handleSendUserMessage } = useChatApi()
  const { textareaRef } = useChatNewUserMessage();

  const handleClick = () => handleSendUserMessage(textareaRef.current.value)
  
  return (
    <button className="col-1 chat-inputs-area-button" onClick={handleClick}>
      <i className="fa fa-paper-plane" aria-hidden="true"></i>
    </button>
  )
}

export default SendButton