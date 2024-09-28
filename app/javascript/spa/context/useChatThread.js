import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const ChatThreadContext = createContext(
  {}
);

export default function ChatThreadProvider({ children }) {
  const { mockEmail } = useAuth()
  const [chatThreads, setChatThreads] = useState([])

  useEffect(() => {
    fetch(encodeURI(`/api/get_chat_threads?email=${mockEmail}`))
      .then(response => response.json())
      .then(({ data }) => setChatThreads(data))
  }, [])

  return (
    <ChatThreadContext.Provider value={{ chatThreads }}>
      {children}
    </ChatThreadContext.Provider>
  );
}

export function useChatThread() {
  return useContext(ChatThreadContext);
}