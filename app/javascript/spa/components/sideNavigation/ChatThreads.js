import React from 'react';
import ChatThread from './ChatThread';
import { useChatThreads } from '../../context/useChatThread';

const ChatThreads = () => {
  const { chatThreads } = useChatThreads();

  return (
    <ul className='side-nav'>
      {
        chatThreads.map(ct => <ChatThread key={ct.id} chatThread={ct} />)
      }
    </ul>
  )
}

export default ChatThreads
