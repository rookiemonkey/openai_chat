import React from "react";
import { useChatThreads } from "../../context/useChatThread";
import { useChatMessages } from "../../context/useChat";
import Spinner from "../Spinner";

const MessagesLoader = () => {
  const { activeChatThreadId } = useChatThreads();
  const { isFetchingMessages } = useChatMessages();

  const isLoading = isFetchingMessages && activeChatThreadId !== "NEW"

  if (!isLoading) return null;

  return (
    <div className="chat-content-area chat-content-area-loading">
      <Spinner size={25} />
      <br/>
      <small>
        Retrieving your conversation
      </small>
    </div>
  )
}

export default MessagesLoader;