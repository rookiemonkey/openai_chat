import React, { createContext, useContext, useCallback, useState, useMemo, useRef, useEffect } from "react";
import { useWsApi } from "./useWs";
import { useChatThreads } from "./useChatThread";
import { useAuth } from "./useAuth";

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
  const { mockEmail } = useAuth();
  const { sendUserMessage } = useWsApi();
  const { activeChatThreadId } = useChatThreads();

  const [messages, setMessages] = useState([]);
  const [isFetchingMessages, setIsFethingMessages] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const textareaRef = useRef(HTMLTextAreaElement)
  const [newUserMessage, setNewUserMessage] = useState("")

  useEffect(() => {
    if (activeChatThreadId === "NEW" || !mockEmail) return function(){}

    setIsFethingMessages(v => true)
    const url = `/api/get_chat_thread?email=${mockEmail}&chatThreadId=${activeChatThreadId}`
    fetch(encodeURI(url))
      .then(response => response.json())
      .then(({ data }) => data.length && setMessages(data))
      .finally(() => setIsFethingMessages(v => false))

  }, [mockEmail, activeChatThreadId])

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
      isFetchingMessages,
      messages,
      setMessages,
      isStreaming,
      setIsStreaming
    }),
    [messages, isStreaming, isFetchingMessages]
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
    sendUserMessage({ message: userMessage, chatThreadId: activeChatThreadId })
  }, [activeChatThreadId])

  const handleScrollDown = useCallback(() => {
    const container = document.querySelector(".chat-content-area")
    container.scrollTop = container.scrollHeight;
  }, [])

  const apiValue = {
    handleSendUserMessage,
    handleScrollDown
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