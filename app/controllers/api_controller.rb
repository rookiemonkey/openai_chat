class ApiController < ApplicationController

  # there is really no concept of authorization here since only using url parameters
  # dont do this in real prod app

  def get_chat_threads
    render json: {
      data: current_user.serialized_chat_threads 
    }
  end

  def get_chat_thread
    chat_thread = ChatThread.find_by(user_id: current_user.id, id: params[:chatThreadId])
    render json: {
      data: chat_thread.serialized_conversation_info,
      isStillStreaming: chat_thread.is_streaming
    }
  end

  private

  def current_user
    User.find_or_create_by(email: params[:email])
  end
end