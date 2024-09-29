import React from "react";

const Spinner = ({ size = 50 }) => {
  
  const sizeStr = `${size}px`

  return (
    <div id="loading" style={{ width: sizeStr, height: sizeStr }}></div>
  )
}

export default Spinner;