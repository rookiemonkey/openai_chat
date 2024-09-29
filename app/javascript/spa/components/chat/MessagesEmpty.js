import React from "react";
import { useChatThreads } from "../../context/useChatThread";

const MessagesEmpty = () => {
  const { activeChatThreadId } = useChatThreads();
  const isEmpty = activeChatThreadId == "NEW"

  if (!isEmpty) return null;

  return (
    <div className="chat-content-area chat-content-area-empty">
      <p>
        Let's Talk!
      </p>
      <small>
        Type a message then click Send!
      </small>
    </div>
  )
}

export default MessagesEmpty;