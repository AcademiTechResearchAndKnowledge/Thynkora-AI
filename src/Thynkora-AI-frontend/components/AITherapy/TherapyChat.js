import React from 'react';
const TherapyChat = ({ onLogin }) => {
    return (React.createElement("div", null,
        React.createElement("h2", null, "Therapy Chat"),
        React.createElement("button", { onClick: onLogin }, "Login")));
};
export default TherapyChat;
