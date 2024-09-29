import React from "react";
import { useChatThreads } from "../../context/useChatThread";
import { useChatMessages } from "../../context/useChat";
import Spinner from "../Spinner";

const MessagesLoader = () => {
  const { activeChatThreadId } = useChatThreads();
  const { isFetchingMessages, isStillStreaming } = useChatMessages();

  const isLoading = (isFetchingMessages || isStillStreaming) && activeChatThreadId !== "NEW"

  if (!isLoading) return null;

  return (
    <div className="chat-content-area chat-content-area-loading">
      <Spinner size={25} />
      <br/>
      <small>
        {isFetchingMessages && "Retrieving your conversation"}
        {isStillStreaming && "AI is still generating messages. Please come back later!"}
      </small>
    </div>
  )
}

export default MessagesLoader;