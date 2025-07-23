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
const p1 = new URL('../pages/p1.jpg', import.meta.url).href;
const AboutUsPage = new URL('../pages/AboutUsPage.jpg', import.meta.url).href;
const CustomerSupportPage = new URL('../pages/CustomerSupportPage.jpg', import.meta.url).href;
const PTSPage = new URL('../pages/PTSPage.jpg', import.meta.url).href;
const ArticlesPage = new URL('../pages/ArticlesPage.jpg', import.meta.url).href;
const App = () => {
    const [showLanding, setShowLanding] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [userActor, setUserActor] = useState(null);
    const [aiActor, setAiActor] = useState(null);
    const [activeTab, setActiveTab] = useState('therapy');
    const [showp1, setShowp1] = useState(true);
    const [showAboutUsPage, setAboutUsPage] = useState(true);
    const [showCustomerSupportPage, setCustomerSupportPage] = useState(true);
    const [showPTSPage, setPTSPage] = useState(true);
    const [showArticlesPage, setArticlesPage] = useState(true);
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
                position: 'relative', // Needed to anchor the button inside this container
                width: '100%',
                height: 'auto',
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 0,
                margin: 0,
            } },
            React.createElement("img", { src: landingBg, alt: "Landing Page", style: {
                    width: 'auto',
                    height: 'auto',
                    maxWidth: 'none',
                    maxHeight: 'none',
                    display: 'block',
                } }),
            React.createElement("button", { onClick: () => setShowLanding(false), style: {
                    position: 'absolute', // now relative to the wrapper
                    bottom: '75.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '1.5rem 9rem',
                    fontSize: '1.2rem',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 10,
                } }),
            React.createElement("button", { onClick: () => setArticlesPage(true), style: {
                    position: 'absolute',
                    bottom: '107.5rem',
                    left: '50%',
                    transform: 'translateX(-300%)',
                    padding: '1.5rem 5rem',
                    fontSize: '1.2rem',
                    backgroundColor: 'rgba(0, 0, 0, 100)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 10,
                } }),
            React.createElement("button", { onClick: () => setPTSPage(true), style: {
                    position: 'absolute',
                    bottom: '107.5rem',
                    left: '50%',
                    transform: 'translateX(-200%)',
                    padding: '1.5rem 5rem',
                    fontSize: '1.2rem',
                    backgroundColor: 'rgba(0, 0, 0, 100)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 10,
                } }),
            React.createElement("button", { onClick: () => setShowLanding(true), style: {
                    position: 'absolute',
                    bottom: '107.5rem',
                    left: '50%',
                    transform: 'translateX(-395%)',
                    padding: '1.5rem 5rem',
                    fontSize: '1.2rem',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 10,
                } })));
    }
    // ----------------------------
    // Page 1 (log your thoughts)
    // ----------------------------
    if (showp1) {
        return (React.createElement("div", { className: "page1", style: {
                position: 'relative', // Needed to anchor the button inside this container
                width: '100%',
                height: 'auto',
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 0,
                margin: 0,
            } },
            React.createElement("img", { src: p1, alt: "page 1", style: {
                    width: 'auto',
                    height: 'auto',
                    maxWidth: 'none',
                    maxHeight: 'none',
                    display: 'block',
                } }),
            React.createElement("button", { onClick: () => setShowLanding(true), style: {
                    position: 'absolute',
                    bottom: '48.8rem',
                    left: '50%',
                    transform: 'translateX(-380%)',
                    padding: '1.5rem 5rem',
                    fontSize: '1.2rem',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 10,
                } })));
    }
    // ----------------------------
    // Articles Page
    // ----------------------------
    if (showArticlesPage) {
        return (React.createElement("div", { className: "ArticlesPage", style: {
                position: 'relative', // Needed to anchor the button inside this container
                width: '100%',
                height: 'auto',
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 0,
                margin: 0,
            } },
            React.createElement("img", { src: ArticlesPage, alt: "page 1", style: {
                    width: 'auto',
                    height: 'auto',
                    maxWidth: 'none',
                    maxHeight: 'none',
                    display: 'block',
                } }),
            React.createElement("button", { onClick: () => setShowLanding(true), style: {
                    position: 'absolute',
                    bottom: '48.8rem',
                    left: '50%',
                    transform: 'translateX(-380%)',
                    padding: '1.5rem 5rem',
                    fontSize: '1.2rem',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 10,
                } })));
    }
    // ----------------------------
    // Privacy and Terms Page
    // ----------------------------
    if (showPTSPage) {
        return (React.createElement("div", { className: "PTSPage", style: {
                position: 'relative', // Needed to anchor the button inside this container
                width: '100%',
                height: 'auto',
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 0,
                margin: 0,
            } },
            React.createElement("img", { src: PTSPage, alt: "page 1", style: {
                    width: 'auto',
                    height: 'auto',
                    maxWidth: 'none',
                    maxHeight: 'none',
                    display: 'block',
                } }),
            React.createElement("button", { onClick: () => setShowLanding(true), style: {
                    position: 'absolute',
                    bottom: '48.8rem',
                    left: '50%',
                    transform: 'translateX(-380%)',
                    padding: '1.5rem 5rem',
                    fontSize: '1.2rem',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 10,
                } })));
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
