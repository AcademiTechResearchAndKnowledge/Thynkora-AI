
import React from 'react';

const AuthComponent = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div>
      <h2>Auth Test</h2>
      <button onClick={onLogin}>Login</button>
    </div>
  );
};

export default AuthComponent;
