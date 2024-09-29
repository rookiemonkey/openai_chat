import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useWsApi } from "../../context/useWs";
import { useChatApi, useChatMessages } from "../../context/useChat";
import { useChatThreadsApi } from "../../context/useChatThread";

const AssistantMessage = ({ message = "" }) => {
  const { receiveAssistantMessage } = useWsApi();
  const { setChatThreads, setActiveChatThreadId } = useChatThreadsApi();
  const { handleScrollDown } = useChatApi();
  const { setIsStreaming } = useChatMessages();

  const [finalMessage, setFinalMessage] = useState(message)
  const [streamingMessage, setStreamingMessage] = useState("")

  useEffect(() => {
    if (message) return function(){}

    const assistantMessageHandler = wsMessage => {
      if (wsMessage?.server_action) return null;
      if (wsMessage && wsMessage !== "ENDOFSTREAM") {
        setStreamingMessage(v => v + wsMessage)
        handleScrollDown()
      }
      if (wsMessage === "ENDOFSTREAM") {
        setIsStreaming(v => false)
        setFinalMessage(v => streamingMessage)
      }
    }

    const serverActionHandler = wsMessage => {
      if (!wsMessage?.server_action) return null;
      console.warn("SERVER ACTION PERFOMED: ", wsMessage)

      if (wsMessage.server_action == "chatthread_created"){
        setChatThreads(v => [wsMessage.chat_thread, ...v])
        setActiveChatThreadId(v => wsMessage.chat_thread.id)
      }
    }

    receiveAssistantMessage(assistantMessageHandler, serverActionHandler)
  }, [])

  return (
    <div className="row gpt-chat-box">
      <div className="chat-icon">
        <i className="fa fa-laptop" aria-hidden="true"></i>
      </div>
      <div className="chat-txt">
        <ReactMarkdown
          key={message ? finalMessage.length : streamingMessage.length}
          breaks
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={materialDark}
                  language={match[1]}
                  PreTag="div"
                  showLineNumbers={false}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
          >
          {message ? finalMessage : streamingMessage}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default AssistantMessage