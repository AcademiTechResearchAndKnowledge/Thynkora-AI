
import React from 'react';

const AuthComponent = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div>
      <h2>Please log in</h2>
      <button onClick={onLogin}>Login</button>
    </div>
  );
};

export default AuthComponent;
