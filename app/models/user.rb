class User < ApplicationRecord
  self.table_name = "users"
  has_many :chat_threads
end