import React from 'react';
import SideNavigation from "./components/sideNavigation/SideNavigation";
import Chat from "./components/chat/Chat";
import WsProvider from './context/useWs';
import ChatProvider from './context/useChat';

const App = () => {
  return (
    <WsProvider>
      <div className="container-fluid">
        <div className="row">
          <SideNavigation/>
          <ChatProvider>
            <Chat/>
          </ChatProvider>
        </div>
      </div>
    </WsProvider>
  )
}

export default App