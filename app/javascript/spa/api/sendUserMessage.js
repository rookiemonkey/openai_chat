export default async function sendUserMessage(userMessage, handleChunk) {
  const response = await fetch('/api/send_messages', { 
    method: "POST", 
    newUserMessage: {
      role: "user",
      content: userMessage
    }
  });
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    handleChunk(decoder.decode(value, { stream: true }))
  }
}