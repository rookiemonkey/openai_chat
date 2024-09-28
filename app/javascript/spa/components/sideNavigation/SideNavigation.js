import React from 'react';
import ChatThreads from './ChatThreads';

const SideNavigation = () => {
  return (
    <div className="nav nav-pills side-nav col-lg-3 col-md-12 flex-column mb-auto">
      <ChatThreads/>
    </div>
  )
}

export default SideNavigation