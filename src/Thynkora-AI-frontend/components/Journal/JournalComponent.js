import React from 'react';
const JournalComponent = ({ onLogin }) => {
    return (React.createElement("div", null,
        React.createElement("h2", null, "Journal Test"),
        React.createElement("button", { onClick: onLogin }, "Login")));
};
export default JournalComponent;
