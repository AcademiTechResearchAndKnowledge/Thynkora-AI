import React from 'react';
const AuthComponent = ({ onLogin }: { onLogin: () => void }) => (
  <button onClick={onLogin}>Login</button>
);
export default AuthComponent;
