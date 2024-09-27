import React from 'react';
import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';
import { useChatMessages } from '../../context/useChat';
import AssistanStreamingMessage from './AssistanStreamingMessage';

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

      <AssistanStreamingMessage />

    </div>
  )
}

export default Messages