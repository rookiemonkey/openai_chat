import React, { useEffect } from 'react';
import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';
import { useChatApi, useChatMessages } from '../../context/useChat';
import { useChatThreads } from '../../context/useChatThread';

const Messages = () => {
  const { activeChatThreadId } = useChatThreads();
  const { handleScrollDown } = useChatApi();
  const { messages, isFetchingMessages } = useChatMessages();

  useEffect(() => {
    handleScrollDown()
  }, [messages])

  if (isFetchingMessages) return null;
  if (activeChatThreadId === "NEW" && !messages.length) return null;

  return (
    <div className="chat-content-area">

      {
        messages.map((m,i) => {
          const message = m.content;
          if (m.role == 'user') return <UserMessage key={i} message={message}/>
          return <AssistantMessage key={i} message={message}/>
        })
      }

    </div>
  )
}

export default Messages