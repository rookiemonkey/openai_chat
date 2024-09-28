class ChatThread < ApplicationRecord
  belongs_to :user
  has_many :chat_messages

  def serialized_info
    {
      id: id,
      title: created_at.strftime("%m/%d/%Y %H:%M:%S")
    }
  end
end
