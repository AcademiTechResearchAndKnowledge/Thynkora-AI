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

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userActor, setUserActor] = useState<any>(null);
  const [aiActor, setAiActor] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('therapy');

  const backgroundMap: Record<string, string> = {
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
    return (
      <div
        className="landing-page"
        style={{
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
        }}
      >
        <h1>Welcome to Thynkora-AI</h1>
        <p>Your AI-powered mental wellness assistant</p>
        <button
          onClick={() => setShowLanding(false)}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            marginTop: '1rem',
            backgroundColor: '#ffffffdd',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Enter
        </button>
      </div>
    );
  }

  // 2. Show Login Page
  if (!isAuthenticated) {
    return (
      <div className="app">
        <h1>Thynkora-AI (Mock Mode)</h1>
        <button onClick={mockLogin}>Mock Login</button>
        <p>Open browser console – you should see: <code> MOCK LOGIN ENABLED</code></p>
      </div>
    );
  }

  // 3. Show Main App with background image per tab
  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundMap[activeTab]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <header className="app-header">
        <h1>Thynkora-AI</h1>
        <nav>
          <button
            className={activeTab === 'therapy' ? 'active' : ''}
            onClick={() => setActiveTab('therapy')}
          >
            AI Therapy
          </button>
          <button
            className={activeTab === 'journal' ? 'active' : ''}
            onClick={() => setActiveTab('journal')}
          >
            Journal
          </button>
          <button
            className={activeTab === 'dao' ? 'active' : ''}
            onClick={() => setActiveTab('dao')}
          >
            DAO
          </button>
          <button
            className={activeTab === 'emergency' ? 'active' : ''}
            onClick={() => setActiveTab('emergency')}
          >
            Emergency
          </button>
        </nav>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <main className="app-main">
        {activeTab === 'therapy' && <TherapyChat aiActor={aiActor} userProfile={userProfile} />}
        {activeTab === 'journal' && <Journal userActor={userActor} userProfile={userProfile} />}
        {activeTab === 'dao' && (
          <DAODashboard onLogin={mockLogin} userActor={userActor} userProfile={userProfile} />
        )}
        {activeTab === 'emergency' && <EmergencySupport userProfile={userProfile} />}
      </main>
    </div>
  );
};

export default App;
