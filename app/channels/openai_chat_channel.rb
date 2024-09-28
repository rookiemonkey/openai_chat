class OpenaiChatChannel < ApplicationCable::Channel
  include ApplicationCable::Helper

  def subscribed
    stream_for current_user # see useAuth.js
  end

  def unsubscribed
  end

  def receive(data)
    test_broadcast_code(current_user.email)
  end

  private

  def current_user
    User.find_or_create_by(email: params[:email])
  end
end