

import React from 'react';

const JournalComponent = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div>
      <h2>Journal Test</h2>
      <button onClick={onLogin}>Login</button>
    </div>
  );
};

export default JournalComponent;
