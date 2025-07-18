import React from 'react';
const AuthComponent = ({ onLogin }) => {
    return (React.createElement("div", null,
        React.createElement("h2", null, "Auth Test"),
        React.createElement("button", { onClick: onLogin }, "Login")));
};
export default AuthComponent;
