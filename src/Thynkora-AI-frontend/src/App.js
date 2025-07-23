import React, { useState, useEffect } from 'react';
import TherapyChat from '@components/AITherapy/TherapyChat';
import Journal from '@components/Journal/JournalComponent';
import DAODashboard from '@components/DAO/DAODashboard';
import EmergencySupport from '@components/Emergency/EmergencySupport';
// Background images (from pages folder)
import therapyBg from './pages/therapy-bg.jpg';
import journalBg from './pages/journal-bg.jpg';
import daoBg from './pages/dao-bg.jpg';
import emergencyBg from './pages/emergency-bg.jpg';
import landingBg from './pages/landing-bg.jpg'; // Home Page
const App = () => {
    const [showLanding, setShowLanding] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [userActor, setUserActor] = useState(null);
    const [aiActor, setAiActor] = useState(null);
    const [activeTab, setActiveTab] = useState('therapy');
    const backgroundMap = {
        therapy: therapyBg,
        journal: journalBg,
        dao: daoBg,
        emergency: emergencyBg
    };
    useEffect(() => {
        console.log("App loaded");
    }, []);
    // Mock login
    const mockLogin = async () => {
        console.log(" MOCK LOGIN ENABLED");
        setIsAuthenticated(true);
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
    // 1. Show Landing Page
    if (showLanding) {
        return (React.createElement("div", { className: "landing-page", style: {
                backgroundImage: `url(${landingBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                textAlign: 'center',
            } },
            React.createElement("h1", null, "Welcome to Thynkora-AI"),
            React.createElement("p", null, "Your AI-powered mental wellness assistant"),
            React.createElement("button", { onClick: () => setShowLanding(false), style: {
                    padding: '1rem 2rem',
                    fontSize: '1.2rem',
                    marginTop: '1rem',
                    backgroundColor: '#ffffffdd',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                } }, "Enter")));
    }
    // 2. Show Login Page
    if (!isAuthenticated) {
        return (React.createElement("div", { className: "app" },
            React.createElement("h1", null, "Thynkora-AI (Mock Mode)"),
            React.createElement("button", { onClick: mockLogin }, "Mock Login"),
            React.createElement("p", null,
                "Open browser console \u2013 you should see: ",
                React.createElement("code", null, " MOCK LOGIN ENABLED"))));
    }
    // 3. Show Main App with background image per tab
    return (React.createElement("div", { className: "app", style: {
            backgroundImage: `url(${backgroundMap[activeTab]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            width: '100%',
        } },
        React.createElement("header", { className: "app-header" },
            React.createElement("h1", null, "Thynkora-AI"),
            React.createElement("nav", null,
                React.createElement("button", { className: activeTab === 'therapy' ? 'active' : '', onClick: () => setActiveTab('therapy') }, "AI Therapy"),
                React.createElement("button", { className: activeTab === 'journal' ? 'active' : '', onClick: () => setActiveTab('journal') }, "Journal"),
                React.createElement("button", { className: activeTab === 'dao' ? 'active' : '', onClick: () => setActiveTab('dao') }, "DAO"),
                React.createElement("button", { className: activeTab === 'emergency' ? 'active' : '', onClick: () => setActiveTab('emergency') }, "Emergency")),
            React.createElement("button", { onClick: handleLogout }, "Logout")),
        React.createElement("main", { className: "app-main" },
            activeTab === 'therapy' && React.createElement(TherapyChat, { aiActor: aiActor, userProfile: userProfile }),
            activeTab === 'journal' && React.createElement(Journal, { userActor: userActor, userProfile: userProfile }),
            activeTab === 'dao' && (React.createElement(DAODashboard, { onLogin: mockLogin, userActor: userActor, userProfile: userProfile })),
            activeTab === 'emergency' && React.createElement(EmergencySupport, { userProfile: userProfile }))));
};
export default App;
