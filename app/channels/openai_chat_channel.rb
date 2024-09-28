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
    chat_thread = get_chat_thread(data["chatThreadId"])
    assistant_response = test_broadcast_code(@user.email)

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