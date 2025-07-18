import React, { useState, useEffect } from 'react';
import TherapyChat from '@components/AITherapy/TherapyChat';
import Journal from '@components/Journal/JournalComponent';
import DAODashboard from '@components/DAO/DAODashboard';
import EmergencySupport from '@components/Emergency/EmergencySupport';

import './App.css'; // Optional: comment out if you don't have this file

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userActor, setUserActor] = useState<any>(null);
  const [aiActor, setAiActor] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('therapy');

  useEffect(() => {
    console.log("App loaded");
  }, []);

  // ✅ Mock Login Function for Testing
  const mockLogin = async () => {
    console.log("✅ MOCK LOGIN ENABLED");
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
    return (
      <div className="app">
        <h1>Thynkora-AI (Mock Mode)</h1>
        <button onClick={mockLogin}>🚀 Mock Login</button>
        <p>Open browser console – you should see: <code>✅ MOCK LOGIN ENABLED</code></p>
      </div>
    );
  }

  return (
    <div className="app">
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
        {activeTab === 'therapy' && (
          <TherapyChat aiActor={aiActor} userProfile={userProfile} />
        )}
        {activeTab === 'journal' && (
          <Journal userActor={userActor} userProfile={userProfile} />
        )}
        {activeTab === 'dao' && (
          <DAODashboard
            onLogin={mockLogin}
            userActor={userActor}
            userProfile={userProfile}
          />
        )}
        {activeTab === 'emergency' && (
          <EmergencySupport userProfile={userProfile} />
        )}
      </main>
    </div>
  );
};

export default App;
