import React from 'react';
import Input from './Input';
import SendButton from './SendButton';
import Messages from './Messages';

const Chat = () => {
  return (
    <div className="content p-0 pt-2 col-lg-9 col-md-12">
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