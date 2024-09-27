class OpenaiChatChannel < ApplicationCable::Channel
  include ApplicationCable::Helper

  def subscribed
    stream_from 'open_ai_response' # for now will stream to everyone
  end

  def unsubscribed
  end

  def receive(data)
    test_broadcast("open_ai_response")
  end
end