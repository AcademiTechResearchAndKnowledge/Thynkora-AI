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

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userActor, setUserActor] = useState<any>(null);
  const [aiActor, setAiActor] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('therapy');

  const backgroundMap: Record<string, string> = {
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
    return (
      <div
        className="landing-wrapper"
        style={{
          position: 'relative', // Needed to anchor the button inside this container
          width: '100%',
          height: 'auto',
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 0,
          margin: 0,
        }}
      >

        <img
          src={landingBg}
          alt="Landing Page"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: 'none',
            maxHeight: 'none',
            display: 'block',
          }}
        />

  
        <button
          onClick={() => setShowLanding(false)}
          style={{
            position: 'absolute',     // now relative to the wrapper
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
          }}
        >

        </button>
      </div>
    );
  }





  // ----------------------------
  // LOGIN
  // ----------------------------
  if (!isAuthenticated) {
    return (
      <div className="app" style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Thynkora-AI (Mock Mode)</h1>
        <button onClick={mockLogin}>Mock Login</button>
        <p>
          Open browser console – you should see: <code> MOCK LOGIN ENABLED</code>
        </p>
      </div>
    );
  }

  // ----------------------------
  // MAIN APP
  // ----------------------------
  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundMap[activeTab]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        overflow: 'auto',
        color: '#fff',
      }}
    >
      <header
        className="app-header"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Thynkora-AI</h1>
        <nav style={{ display: 'flex', gap: '1rem' }}>
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

      <main className="app-main" style={{ padding: '2rem' }}>
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
