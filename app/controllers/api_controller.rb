class ApiController < ApplicationController
  def get_chat_threads
    render json: {
      data: current_user.chat_threads.order(created_at: :desc).map { |ct| ct.serialized_info } 
    }
  end

  private

  def current_user
    User.find_or_create_by(email: params[:email])
  end
end