import React from 'react';
const DAODashboard = ({ onLogin, userActor, userProfile }) => {
    return (React.createElement("div", null,
        React.createElement("h2", null, "DAO Dashboard"),
        userProfile ? (React.createElement("p", null,
            "Welcome, ",
            userProfile.name || 'Anonymous',
            "!")) : (React.createElement("p", null, "User profile not loaded.")),
        React.createElement("button", { onClick: () => onLogin() }, "Re-authenticate")));
};
export default DAODashboard;
