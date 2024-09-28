class ChatMessage < ApplicationRecord
  enum role: {
    user: 'user',
    assistant: 'assistant'
  }

  def serialized_info
    {
      role: role,
      content: message
    }
  end
end
