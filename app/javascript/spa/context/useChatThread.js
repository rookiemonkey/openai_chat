import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const ChatThreadContext = createContext(
  {}
);

const ChatThreadApiContext = createContext(
  {}
);

export default function ChatThreadProvider({ children }) {
  const { mockEmail } = useAuth()
  const [activeChatThreadId, setActiveChatThreadId] = useState("NEW")
  const [chatThreads, setChatThreads] = useState([])

  useEffect(() => {
    fetch(encodeURI(`/api/get_chat_threads?email=${mockEmail}`))
      .then(response => response.json())
      .then(({ data }) => setChatThreads(data))
  }, [])

  const apiValue = {
    setActiveChatThreadId,
    setChatThreads
  }

  return (
    <ChatThreadContext.Provider value={{ activeChatThreadId, chatThreads }}>
      <ChatThreadApiContext.Provider value={apiValue}>
        {children}
      </ChatThreadApiContext.Provider>
    </ChatThreadContext.Provider>
  );
}

export function useChatThreads() {
  return useContext(ChatThreadContext);
}

export function useChatThreadsApi() {
  return useContext(ChatThreadApiContext);
}