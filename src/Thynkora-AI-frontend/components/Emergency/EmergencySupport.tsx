
import React from 'react';

const EmergencySupport = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div>
      <h2>Emergency Support Test</h2>
      <button onClick={onLogin}>Login</button>
    </div>
  );
};

export default EmergencySupport;
