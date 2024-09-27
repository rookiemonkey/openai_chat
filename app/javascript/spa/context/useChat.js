import React, { createContext, useContext, useCallback, useState, useMemo, useRef } from "react";
import sendUserMessage from "../api/sendUserMessage";

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
  const [messages, setMessages] = useState([])

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
      messages
    }),
    [messages]
  )

  const handleResetInput = useCallback(() => {
    setNewUserMessage(v => {
      textareaRef.current.value = ""
      return ""
    })
  }, [])

  const handleSendUserMessage = useCallback(async userMessage => {
    handleResetInput()
    const payload = { role: "user", content: userMessage }
    setMessages(v => [...v, payload])
    // const assistantResponse = await sendUserMessage(userMessage)
    // console.log(assistantResponse)
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