
import React from 'react';

const TherapyChat = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div>
      <h2>Therapy Chat</h2>
      <button onClick={onLogin}>Login</button>
    </div>
  );
};

export default TherapyChat;
