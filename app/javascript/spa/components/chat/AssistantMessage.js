import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useWsApi } from "../../context/useWs";
import { useChatMessages } from "../../context/useChat";

const AssistantMessage = ({ message = "" }) => {
  const { receiveAssistantMessage } = useWsApi();
  const { setIsStreaming } = useChatMessages();

  const [finalMessage, setFinalMessage] = useState(message)
  const [streamingMessage, setStreamingMessage] = useState("")

  useEffect(() => {
    if (message) return function(){}

    const assistantMessageHandler = assistantMessage => {
      if (assistantMessage && assistantMessage !== "ENDOFSTREAM") {
        setStreamingMessage(v => v + assistantMessage)
      }
      if (assistantMessage === "ENDOFSTREAM") {
        setIsStreaming(v => false)
        setFinalMessage(streamingMessage)
      }
    }

    receiveAssistantMessage(assistantMessageHandler)
  }, [])

  return (
    <div className="row gpt-chat-box">
      <div className="chat-icon">
        <i className="fa fa-laptop" aria-hidden="true"></i>
      </div>
      <div className="chat-txt">
        <ReactMarkdown
          key={message.length}
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