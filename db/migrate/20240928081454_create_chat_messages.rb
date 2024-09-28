class CreateChatMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :chat_messages do |t|
      t.belongs_to :chat_thread
      t.text :message
      t.string :role
      t.timestamps
    end
  end
end
