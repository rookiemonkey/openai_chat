import React from 'react';
import SideNavigation from "./sideNavigation/SideNavigation";
import Chat from "./chat/Chat";

const App = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <SideNavigation/>
        <Chat/>
      </div>
    </div>
  )
}

export default App