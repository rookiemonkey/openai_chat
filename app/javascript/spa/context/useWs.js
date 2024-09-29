import React, { createContext, useCallback, useContext, useEffect } from "react";
import { useAuth } from "./useAuth";

const WsContext = createContext(
  {}
);

const WsApiContext = createContext(
  {}
);

export default function WsProvider({ children }) {
  const { mockEmail, sessionId } = useAuth()
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
            sessionId,
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
            sessionId,
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
            sessionId,
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
        if (data?.type === "ping") return null;

        const message = data?.message?.message
        const identifier = data?.message?.message?.session_id
        if (identifier !== sessionId) return null;

        const assistantMessage = message?.message
        if (assistantMessage) assistantMessageHandler(assistantMessage)

        const serverAction = message?.server_action
        if (serverAction) serverActionHandler(message)
      };
    },
    [sessionId]
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
