import React from "react";
import { useChatNewUserMessage } from "../../context/useChat";

const Input = () => {
  const { textareaRef } = useChatNewUserMessage();

  return (
    <textarea className="col-11" wrap="hard" placeholder="Send a message" ref={textareaRef}>
    </textarea>
  )
}

export default Input