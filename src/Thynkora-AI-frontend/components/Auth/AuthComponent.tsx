
import React, { useEffect } from 'react';

interface AuthComponentProps {
  onLogin: () => void;
}

const AuthComponent: React.FC<AuthComponentProps> = ({ onLogin }) => {
  const useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

  useEffect(() => {
    if (useMockAuth) {
      console.log('✅ MOCK LOGIN ENABLED');
      onLogin(); // Skip login for testing
    }
  }, [useMockAuth, onLogin]);

  const handleLoginClick = async () => {
    // Your real login code (e.g. Internet Identity)
    console.log('🔒 Real login triggered');
  };

  return useMockAuth ? (
    <div>🔓 Mock login in progress...</div>
  ) : (
    <button onClick={handleLoginClick}>Login with Internet Identity</button>
  );
};

export default AuthComponent;
