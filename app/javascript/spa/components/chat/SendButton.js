import React from "react";
import { useChatApi, useChatMessages, useChatNewUserMessage } from "../../context/useChat";

const SendButton = () => {
  const { handleSendUserMessage } = useChatApi();
  const { isStreaming }=  useChatMessages();
  const { textareaRef } = useChatNewUserMessage();

  const handleClick = () => !isStreaming && textareaRef.current.value != "" && handleSendUserMessage(textareaRef.current.value)
  
  return (
    <button className="col-1 chat-inputs-area-button" onClick={handleClick} disabled={isStreaming}>
      <i className="fa fa-paper-plane" aria-hidden="true"></i>
    </button>
  )
}

export default SendButton