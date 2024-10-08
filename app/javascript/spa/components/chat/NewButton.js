import React from "react";
import { useChatApi, useChatMessages } from "../../context/useChat";
import { useChatThreads } from "../../context/useChatThread";

const NewButton = () => {
  const { activeChatThreadId } = useChatThreads();
  const { handleNewChat } = useChatApi();
  const { isStreaming } = useChatMessages();

  const handleClick = () => !isStreaming && handleNewChat()

  if (activeChatThreadId === "NEW") return null;

  return (
    <button 
      className={`chat-inputs-area-button-new ${isStreaming && "soft-disabled"}`} onClick={handleClick} 
      disabled={isStreaming}
    ><i className="fas fa-plus"></i>
    </button>
  )
}

export default NewButton