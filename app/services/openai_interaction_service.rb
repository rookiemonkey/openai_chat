class OpenaiInteractionService
  include Singleton

  def initialize
    @client = OpenAI::Client.new
  end
  
  # https://community.openai.com/t/gpt-3-5-turbo-how-to-remember-previous-messages-like-chat-gpt-website/170370/6
  def send_messages(messages, stream_proc)
    assistant_message = ""
    @client.chat(
      parameters: {
        model: ENV["OPENAI_MODEL"],
        messages: messages,
        temperature: 1,
        stream: proc do |chunk, _bytesize|
          content = chunk.dig("choices", 0, "delta", "content")
          finish_reason = chunk.dig("choices", 0, "finish_reason")
          assistant_message << (content.nil? ? "" : content)

          if finish_reason == "stop"
            stream_proc.call("ENDOFSTREAM")
          else
            stream_proc.call(content)
          end
        end
      }
    )
    return assistant_message
  end

end