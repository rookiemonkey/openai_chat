import React, { createContext, useCallback, useContext, useEffect } from "react";

const WsContext = createContext(
  {}
);

const WsApiContext = createContext(
  {}
);

export default function WsProvider({ children }) {
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
            channel: "OpenaiChatChannel"
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
            channel: "OpenaiChatChannel"
          }
        )
      }
    ))
  }, [ws])

  const sendUserMessage = useCallback(message => {
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
            message: message
          }
        )
      }
    ))
  }, [ws])

  const receiveAssistantMessage = useCallback(handler => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const assistantMessage = data?.message?.message
      handler(assistantMessage)
    };
  })

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
