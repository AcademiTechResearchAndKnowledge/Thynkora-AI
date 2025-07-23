import React, { useState, useEffect } from 'react';
import TherapyChat from '@components/AITherapy/TherapyChat';
import Journal from '@components/Journal/JournalComponent';
import DAODashboard from '@components/DAO/DAODashboard';
import EmergencySupport from '@components/Emergency/EmergencySupport';
// Landing page background image
const landingBg = new URL('../pages/landing-bg.jpg', import.meta.url).href;
//other pages
//const therapyBg = new URL('../pages/therapy-bg.jpg', import.meta.url).href;
//const journalBg = new URL('../pages/journal-bg.jpg', import.meta.url).href;
//const daoBg = new URL('../pages/dao-bg.jpg', import.meta.url).href;
//const emergencyBg = new URL('../pages/emergency-bg.jpg', import.meta.url).href;
const App = () => {
    const [showLanding, setShowLanding] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [userActor, setUserActor] = useState(null);
    const [aiActor, setAiActor] = useState(null);
    const [activeTab, setActiveTab] = useState('therapy');
    const backgroundMap = {
    // therapy: therapyBg,
    // journal: journalBg,
    // dao: daoBg,
    // emergency: emergencyBg,
    };
    useEffect(() => {
        console.log('App loaded');
    }, []);
    const mockLogin = async () => {
        console.log(' MOCK LOGIN ENABLED');
        setIsAuthenticated(true);
        setUserProfile({ name: 'Test User', email: 'test@example.com' });
        setUserActor({});
        setAiActor({});
    };
    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserActor(null);
        setAiActor(null);
        setUserProfile(null);
    };
    // ----------------------------
    // LANDING PAGE
    // ----------------------------
    if (showLanding) {
        return (React.createElement("div", { className: "landing-wrapper", style: {
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            } },
            React.createElement("img", { src: landingBg, alt: "Landing Page", style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                } }),
            React.createElement("div", { style: {
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                } },
                React.createElement("button", { onClick: () => setShowLanding(false), style: {
                        padding: '1rem 2rem',
                        fontSize: '1.2rem',
                        backgroundColor: '#ffffffcc',
                        color: '#000',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    } }, "Get Started"))));
    }
    // ----------------------------
    // LOGIN
    // ----------------------------
    if (!isAuthenticated) {
        return (React.createElement("div", { className: "app", style: { padding: '2rem', textAlign: 'center' } },
            React.createElement("h1", null, "Thynkora-AI (Mock Mode)"),
            React.createElement("button", { onClick: mockLogin }, "Mock Login"),
            React.createElement("p", null,
                "Open browser console \u2013 you should see: ",
                React.createElement("code", null, " MOCK LOGIN ENABLED"))));
    }
    // ----------------------------
    // MAIN APP
    // ----------------------------
    return (React.createElement("div", { className: "app", style: {
            backgroundImage: `url(${backgroundMap[activeTab]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            width: '100%',
            overflow: 'auto',
            color: '#fff',
        } },
        React.createElement("header", { className: "app-header", style: {
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            } },
            React.createElement("h1", null, "Thynkora-AI"),
            React.createElement("nav", { style: { display: 'flex', gap: '1rem' } },
                React.createElement("button", { className: activeTab === 'therapy' ? 'active' : '', onClick: () => setActiveTab('therapy') }, "AI Therapy"),
                React.createElement("button", { className: activeTab === 'journal' ? 'active' : '', onClick: () => setActiveTab('journal') }, "Journal"),
                React.createElement("button", { className: activeTab === 'dao' ? 'active' : '', onClick: () => setActiveTab('dao') }, "DAO"),
                React.createElement("button", { className: activeTab === 'emergency' ? 'active' : '', onClick: () => setActiveTab('emergency') }, "Emergency")),
            React.createElement("button", { onClick: handleLogout }, "Logout")),
        React.createElement("main", { className: "app-main", style: { padding: '2rem' } },
            activeTab === 'therapy' && (React.createElement(TherapyChat, { aiActor: aiActor, userProfile: userProfile })),
            activeTab === 'journal' && (React.createElement(Journal, { userActor: userActor, userProfile: userProfile })),
            activeTab === 'dao' && (React.createElement(DAODashboard, { onLogin: mockLogin, userActor: userActor, userProfile: userProfile })),
            activeTab === 'emergency' && (React.createElement(EmergencySupport, { userProfile: userProfile })))));
};
export default App;
