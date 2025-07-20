import React, { useState, useEffect } from 'react';
import TherapyChat from '@components/AITherapy/TherapyChat';
import Journal from '@components/Journal/JournalComponent';
import DAODashboard from '@components/DAO/DAODashboard';
import EmergencySupport from '@components/Emergency/EmergencySupport';
const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [userActor, setUserActor] = useState(null);
    const [aiActor, setAiActor] = useState(null);
    const [activeTab, setActiveTab] = useState('therapy');
    useEffect(() => {
        console.log("App loaded");
    }, []);
    //  Mock Login Function for Testing
    const mockLogin = async () => {
        console.log(" MOCK LOGIN ENABLED");
        setIsAuthenticated(true);
        // Optional: Fake actor/profile data
        setUserProfile({ name: "Test User", email: "test@example.com" });
        setUserActor({});
        setAiActor({});
    };
    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserActor(null);
        setAiActor(null);
        setUserProfile(null);
    };
    if (!isAuthenticated) {
        return (React.createElement("div", { className: "app" },
            React.createElement("h1", null, "Thynkora-AI (Mock Mode)"),
            React.createElement("button", { onClick: mockLogin }, "Mock Login"),
            React.createElement("p", null,
                "Open browser console \u2013 you should see: ",
                React.createElement("code", null, " MOCK LOGIN ENABLED"))));
    }
    return (React.createElement("div", { className: "app" },
        React.createElement("header", { className: "app-header" },
            React.createElement("h1", null, "Thynkora-AI"),
            React.createElement("nav", null,
                React.createElement("button", { className: activeTab === 'therapy' ? 'active' : '', onClick: () => setActiveTab('therapy') }, "AI Therapy"),
                React.createElement("button", { className: activeTab === 'journal' ? 'active' : '', onClick: () => setActiveTab('journal') }, "Journal"),
                React.createElement("button", { className: activeTab === 'dao' ? 'active' : '', onClick: () => setActiveTab('dao') }, "DAO"),
                React.createElement("button", { className: activeTab === 'emergency' ? 'active' : '', onClick: () => setActiveTab('emergency') }, "Emergency")),
            React.createElement("button", { onClick: handleLogout }, "Logout")),
        React.createElement("main", { className: "app-main" },
            activeTab === 'therapy' && (React.createElement(TherapyChat, { aiActor: aiActor, userProfile: userProfile })),
            activeTab === 'journal' && (React.createElement(Journal, { userActor: userActor, userProfile: userProfile })),
            activeTab === 'dao' && (React.createElement(DAODashboard, { onLogin: mockLogin, userActor: userActor, userProfile: userProfile })),
            activeTab === 'emergency' && (React.createElement(EmergencySupport, { userProfile: userProfile })))));
};
export default App;
