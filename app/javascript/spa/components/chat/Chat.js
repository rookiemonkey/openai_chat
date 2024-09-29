import React from 'react';
import Input from './Input';
import NewButton from './NewButton';
import SendButton from './SendButton';
import Messages from './Messages';
import MessagesEmpty from './MessagesEmpty';
import MessagesLoader from './MessagesLoader'

const Chat = () => {
  return (
    <div className="content p-0 pt-2 col-lg-10 col-md-12">
      <NewButton/>
      <MessagesEmpty/>
      <MessagesLoader/>
      <Messages/>
      <div className="overflow-hidden">
        <div className="row">
          <div className="col-12 chat-inputs-area-inner">
            <div className="row chat-inputs-container d-flex align-items-center justify-content-between">
              <Input />
              <SendButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat