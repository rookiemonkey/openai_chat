import React, { useEffect, useState } from "react";
import { useWs } from "../../context/useWs";
import { useChatMessages } from "../../context/useChat";
import AssistantMessage from "./AssistantMessage";

const AssistanStreamingMessage = () => {
  const ws = useWs()
  const { isStreaming } = useChatMessages();
  const [message, setMessage] = useState("")

  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data?.message?.message) 
        setMessage(v => v + data.message.message)
    };
  }, [])

  if (!isStreaming) return null

  return (
    <AssistantMessage message={message} />
  )
}

export default AssistanStreamingMessage