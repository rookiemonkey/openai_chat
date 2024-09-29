import React from 'react';
import { useChatThreadsApi } from '../../context/useChatThread';

const ChatThread = ({ chatThread }) => {
  const { setActiveChatThreadId } = useChatThreadsApi();

  const handleClick = e => {
    e.preventDefault()
    setActiveChatThreadId(chatThread?.id)
  } 

  return (
    <li>
      <a href="#" className="nav-link text-white" onClick={handleClick}>
        {chatThread?.title}
      </a>
    </li>
  )
}

export default ChatThread
