class CreateChatThreads < ActiveRecord::Migration[6.1]
  def change
    create_table :chat_threads do |t|
      t.timestamps
      t.belongs_to :user
    end
  end
end
