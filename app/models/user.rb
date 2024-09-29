class User < ApplicationRecord
  self.table_name = "users"
  has_many :chat_threads

  def serialized_chat_threads
    chat_threads.order(created_at: :desc).map { |ct| ct.serialized_info } 
  end
end