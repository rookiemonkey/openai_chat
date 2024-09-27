import React, { createContext, useCallback, useContext, useEffect } from "react";

const WsContext = createContext(
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

  return (
    <WsContext.Provider value={ws}>
      {children}
    </WsContext.Provider>
  );
}

export function useWs() {
  return useContext(WsContext);
}
