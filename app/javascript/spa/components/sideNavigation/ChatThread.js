import React from 'react';
import { useChatThreads, useChatThreadsApi } from '../../context/useChatThread';

const ChatThread = ({ chatThread }) => {
  const { activeChatThreadId } = useChatThreads();
  const { setActiveChatThreadId } = useChatThreadsApi();

  const isActive = activeChatThreadId == chatThread.id

  const handleClick = e => {
    e.preventDefault()
    setActiveChatThreadId(chatThread?.id)
  } 

  return (
    <li>
      <a 
        href="#" 
        className={`nav-link text-white ${isActive ? "active" : ""}`} 
        onClick={handleClick}
      >{chatThread?.title}</a>
    </li>
  )
}

export default ChatThread
