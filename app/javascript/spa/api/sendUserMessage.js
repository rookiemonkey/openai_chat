export default async function sendUserMessage(userMessage) {
  const response = await fetch('/api/send_messages', { 
    method: "POST", 
    newUserMessage: {
      role: "user",
      content: userMessage
    }
  });
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let systemResponse = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    systemResponse += decoder.decode(value, { stream: true });
  }

  console.log(systemResponse)
  console.log('Streaming complete');

  return systemResponse
}