class OpenaiChatChannel < ApplicationCable::Channel
  include ApplicationCable::Helper

  def subscribed
    @user = User.find_or_create_by(email: params[:email]) # see useAuth.js
    stream_for @user
  end

  def unsubscribed
    stop_stream_for @user
  end

  def receive(data)
    session_id =  params["sessionId"]
    is_chat_thread_new = data["chatThreadId"] == "NEW"
    chat_thread = get_chat_thread(data["chatThreadId"])

    chat_thread.update(is_streaming: true)

    OpenaiChatChannel.broadcast_to(
      @user, 
      message: { 
        session_id: session_id, 
        server_action: "chatthread_created", 
        chat_thread: chat_thread.serialized_info
      }
    ) if is_chat_thread_new

    if ENV["OPENAI_FAKED_STREAM"] == "true"
      assistant_response = test_broadcast_code(@user.email, session_id)
    else
      current_thread = chat_thread.serialized_conversation_info
      current_thread << { role: "user", content: data["message"] }

      stream_proc = Proc.new do |chunk|
        OpenaiChatChannel.broadcast_to(@user, message: { 
          session_id: session_id, 
          message: chunk
        })
      end

      assistant_response = OpenaiInteractionService.instance.send_messages(current_thread, stream_proc)
    end

    # below can be assigned to a job instead

    user_cm = ChatMessage.create(
      chat_thread_id: chat_thread.id,
      role: "user",
      message: data["message"]
    )

    ChatMessage.create(
      chat_thread_id: chat_thread.id,
      role: "assistant",
      message: assistant_response,
      created_at: user_cm.created_at + 1
    )

    chat_thread.update(is_streaming: false)
  end

  private

  def get_chat_thread(chat_thread_id)
    if chat_thread_id == "NEW"
      ChatThread.create(user_id: @user.id)
    else
      ChatThread.find_by(user_id: @user.id, id: chat_thread_id.to_i)
    end
  end
end