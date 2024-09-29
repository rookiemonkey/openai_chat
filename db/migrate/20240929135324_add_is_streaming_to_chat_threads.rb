class AddIsStreamingToChatThreads < ActiveRecord::Migration[6.1]
  def change
    add_column :chat_threads, :is_streaming, :boolean, default: false
  end
end
