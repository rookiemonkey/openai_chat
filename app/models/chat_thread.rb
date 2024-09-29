class ChatThread < ApplicationRecord
  belongs_to :user
  has_many :chat_messages, dependent: :destroy 

  def serialized_info
    {
      id: id,
      title: "#{created_at.strftime("%m/%d/%Y %H:%M:%S")} UTC"
    }
  end

  def serialized_conversation_info
    chat_messages.order(:created_at).map { |m| m.serialized_info }
  end
end
