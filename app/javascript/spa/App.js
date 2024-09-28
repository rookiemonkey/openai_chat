import React from 'react';
import SideNavigation from "./components/sideNavigation/SideNavigation";
import Chat from "./components/chat/Chat";
import AuthProvider from './context/useAuth';
import WsProvider from './context/useWs';
import ChatProvider from './context/useChat';
import ChatThreadProvider from './context/useChatThread';

const App = () => {
  return (
    <AuthProvider>
      <WsProvider>
        <ChatThreadProvider>
          <ChatProvider>
            <div className="container-fluid">
              <div className="row">
                <SideNavigation />
                <Chat />
              </div>
            </div>
          </ChatProvider>
        </ChatThreadProvider>
      </WsProvider>
    </AuthProvider>
  )
}

export default App