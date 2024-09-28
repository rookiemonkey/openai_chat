import React from 'react';
import ChatThread from './ChatThread';
import { useChatThread } from '../../context/useChatThread';

const ChatThreads = () => {
  const { chatThreads } = useChatThread();

  return (
    <ul>
      {
        chatThreads.map(ct => <ChatThread key={ct.id} chatThread={ct} />)
      }
    </ul>
  )
}

export default ChatThreads
