import React, { useEffect } from 'react';
const AuthComponent = ({ onLogin }) => {
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
    return useMockAuth ? (React.createElement("div", null, "\uD83D\uDD13 Mock login in progress...")) : (React.createElement("button", { onClick: handleLoginClick }, "Login with Internet Identity"));
};
export default AuthComponent;
