import React, { createContext, useContext, useCallback, useState, useMemo, useRef } from "react";
import { useWs } from "./useWs";

const ChatApiContext = createContext(
  {}
);

const ChatMessagesContext = createContext(
  {}
);

const ChatNewUserMessageContext = createContext(
  {}
);

export default function ChatProvider({ children }) {
  const ws = useWs();
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const textareaRef = useRef(HTMLTextAreaElement)
  const [newUserMessage, setNewUserMessage] = useState("")

  const memoizedNewUserMessage = useMemo(
    () => ({
      textareaRef,
      newUserMessage,
      setNewUserMessage
    }),
    [newUserMessage]
  )

  const memoizedMessages = useMemo(
    () => ({
      isStreaming,
      messages
    }),
    [messages, isStreaming]
  )

  const handleResetInput = useCallback(() => {
    setNewUserMessage(v => {
      textareaRef.current.value = ""
      return ""
    })
  }, [])

  const handleSendUserMessage = useCallback(userMessage => {
    handleResetInput()
    const payload = { role: "user", content: userMessage }
    setMessages(v => [...v, payload])
    setIsStreaming(v => true)
    
    ws.send(JSON.stringify(
      {
        command: "message",
        identifier: JSON.stringify(
          {
            channel: "OpenaiChatChannel"
          }
        ),
        data: JSON.stringify(
          {
            message: userMessage
          }
        )
      }
    ))
  }, [])


  const apiValue = {
    handleSendUserMessage
  }

  return (
    <ChatApiContext.Provider value={apiValue}>
      <ChatMessagesContext.Provider value={memoizedMessages}>
        <ChatNewUserMessageContext.Provider value={memoizedNewUserMessage}>
          {children}
        </ChatNewUserMessageContext.Provider>
      </ChatMessagesContext.Provider>
    </ChatApiContext.Provider>
  );
}

export function useChatApi() {
  return useContext(ChatApiContext);
}

export function useChatMessages() {
  return useContext(ChatMessagesContext);
}

export function useChatNewUserMessage() {
  return useContext(ChatNewUserMessageContext);
}