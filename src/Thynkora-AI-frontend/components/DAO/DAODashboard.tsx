
import React from 'react';

const DAODashboard = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div>
      <h2>DAODashboard Test</h2>
      <button onClick={onLogin}>Login</button>
    </div>
  );
};

export default DAODashboard;
