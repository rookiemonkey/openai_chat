import React from 'react';
import SideNavigation from "./components/sideNavigation/SideNavigation";
import Chat from "./components/chat/Chat";
import AuthProvider from './context/useAuth';
import WsProvider from './context/useWs';
import ChatProvider from './context/useChat';

const App = () => {
  return (
    <AuthProvider>
      <WsProvider>
        <ChatProvider>
          <div className="container-fluid">
            <div className="row">
              <SideNavigation />
              <Chat />
            </div>
          </div>
        </ChatProvider>
      </WsProvider>
    </AuthProvider>
  )
}

export default App