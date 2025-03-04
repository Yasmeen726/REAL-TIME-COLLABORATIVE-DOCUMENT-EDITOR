// client/src/components/Toolbar.js
import React from 'react';

function Toolbar() {
  const handleBold = () => {
    console.log('Bold clicked');
  };

  const handleItalic = () => {
    console.log('Italic clicked');
  };

  return (
    <div>
      <button onClick={handleBold}>Bold</button>
      <button onClick={handleItalic}>Italic</button>
    </div>
  );
}