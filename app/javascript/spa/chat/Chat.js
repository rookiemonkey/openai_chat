import React from 'react';
import Input from './Input';

const Chat = () => {
  return (
    <div className="content p-0 pt-2 col-lg-9 col-md-12">
      <div className="chat-content-area">
        <p>show thread here</p>
      </div>
      <div className="overflow-hidden">
        <div className="row">
          <div className="col-12 chat-inputs-area-inner">
            <div className="row chat-inputs-container d-flex align-items-center justify-content-between">
              <textarea name="" id="" className="col-11" placeholder="Send a message"></textarea>
              <Input />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat