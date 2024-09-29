import React, { createContext, useCallback, useContext, useEffect } from "react";
import { useAuth } from "./useAuth";

const WsContext = createContext(
  {}
);

const WsApiContext = createContext(
  {}
);

export default function WsProvider({ children }) {
  const { mockEmail } = useAuth()
  const ws = new WebSocket("ws://localhost:3000/cable")

  useEffect(() => {
    ws.onopen = () => subscribe()
    return () => unsubscribe()
  }, [])

  const subscribe = useCallback(() => {
    ws.send(JSON.stringify(
      {
        command: "subscribe",
        identifier: JSON.stringify(
          {
            channel: "OpenaiChatChannel",
            email: mockEmail
          }
        )
      }
    ))
  }, [ws])

  const unsubscribe = useCallback(() => {
    ws.send(JSON.stringify(
      {
        command: "unsubscribe",
        identifier: JSON.stringify(
          {
            channel: "OpenaiChatChannel",
            email: mockEmail
          }
        )
      }
    ))
  }, [ws])

  const sendUserMessage = useCallback(({ message, chatThreadId }) => {
    ws.send(JSON.stringify(
      {
        command: "message",
        identifier: JSON.stringify(
          {
            channel: "OpenaiChatChannel",
            email: mockEmail
          }
        ),
        data: JSON.stringify(
          {
            message: message,
            chatThreadId
          }
        )
      }
    ))
  }, [ws])

  const receiveAssistantMessage = useCallback(
    (
      assistantMessageHandler,
      serverActionHandler,
    ) => {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const message = data?.message?.message
        assistantMessageHandler(message)
        serverActionHandler(message)
      };
    }
  )

  return (
    <WsContext.Provider value={ws}>
      <WsApiContext.Provider value={{ sendUserMessage, receiveAssistantMessage }}>
        {children}
      </WsApiContext.Provider>
    </WsContext.Provider>
  );
}

export function useWs() {
  return useContext(WsContext);
}

export function useWsApi() {
  return useContext(WsApiContext);
}
