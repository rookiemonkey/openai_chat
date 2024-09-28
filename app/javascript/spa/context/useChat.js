import React, { createContext, useContext, useCallback, useState, useMemo, useRef } from "react";
import { useWsApi } from "./useWs";

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
  const { sendUserMessage, receiveAssistantMessage } = useWsApi();
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
      messages,
      setMessages,
      isStreaming,
      setIsStreaming
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
    const payload = [
      { role: "user", content: userMessage },
      { role: "assistant", content: "" }
    ]
    setMessages(v => [...v, ...payload])
    setIsStreaming(v => true)

    sendUserMessage(userMessage)

    receiveAssistantMessage(assistantMessage => {
      if (assistantMessage && assistantMessage !== "ENDOFSTREAM") {
        const parent = document.querySelector('.chat-content-area')
        const assistantMessageTextEl = parent.lastChild.querySelector(".chat-txt")
        assistantMessageTextEl.innerHTML = assistantMessageTextEl.innerHTML + assistantMessage
      }
      if (assistantMessage === "ENDOFSTREAM") {
        setIsStreaming(v => false)
      }
    })
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