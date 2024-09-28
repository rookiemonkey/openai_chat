import React from 'react';
import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';
import { useChatMessages } from '../../context/useChat';

const Messages = () => {
  const { messages } = useChatMessages();

  return (
    <div className="chat-content-area">

      {
        messages.map(m => {
          const message = m.content;
          if (m.role == 'user') return <UserMessage message={message}/>
          return <AssistantMessage message={message}/>
        })
      }

    </div>
  )
}

export default Messages