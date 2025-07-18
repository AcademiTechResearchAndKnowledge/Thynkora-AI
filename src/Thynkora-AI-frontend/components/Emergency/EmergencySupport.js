import React from 'react';
const EmergencySupport = ({ onLogin }) => {
    return (React.createElement("div", null,
        React.createElement("h2", null, "Emergency Support Test"),
        React.createElement("button", { onClick: onLogin }, "Login")));
};
export default EmergencySupport;
