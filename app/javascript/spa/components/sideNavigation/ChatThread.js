import React from 'react';
import { useChatThreads, useChatThreadsApi } from '../../context/useChatThread';
import { useChatMessages } from '../../context/useChat';

const ChatThread = ({ chatThread }) => {
  const { activeChatThreadId } = useChatThreads();
  const { setActiveChatThreadId } = useChatThreadsApi();
  const { isStreaming } = useChatMessages();

  const isActive = activeChatThreadId == chatThread.id

  const handleClick = e => {
    e.preventDefault()
    if (isStreaming) return null;
    setActiveChatThreadId(chatThread?.id)
  } 

  return (
    <li>
      <a 
        href="#" 
        className={`nav-link text-white ${isActive && "active"} ${(!isActive && isStreaming) && "soft-disabled"}`} 
        onClick={handleClick}
      >{chatThread?.title}</a>
    </li>
  )
}

export default ChatThread
