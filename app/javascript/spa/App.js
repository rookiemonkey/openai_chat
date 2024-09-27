import React from 'react';
import SideNavigation from "./components/sideNavigation/SideNavigation";
import Chat from "./components/chat/Chat";
import ChatProvider from './context/useChat';

const App = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <SideNavigation/>
        <ChatProvider>
          <Chat/>
        </ChatProvider>
      </div>
    </div>
  )
}

export default App