class OpenaiInteractionService
  
  # https://community.openai.com/t/gpt-3-5-turbo-how-to-remember-previous-messages-like-chat-gpt-website/170370/6
  def send_messages(messages)
    assistant_message = ""
    OpenAI::Client.new.chat(
      parameters: {
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 1,
        stream: proc do |chunk, _bytesize|
          content = chunk.dig("choices", 0, "delta", "content")
          assistant_message << (content.present? ? content : "")
        end
      }
    )
    return {
      role: "assistant",
      content: assistant_message
    }
  end

end