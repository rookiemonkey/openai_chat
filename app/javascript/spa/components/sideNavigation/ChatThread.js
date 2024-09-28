import React from 'react';

const ChatThread = ({ chatThread }) => {
  return (
    <li>
        <a href="#" className="nav-link text-white">
          {chatThread?.title}
        </a>
    </li>
  )
}

export default ChatThread
