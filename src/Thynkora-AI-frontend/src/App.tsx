import React, { useState, useEffect } from 'react';
import TherapyChat from '@components/AITherapy/TherapyChat';
import Journal from '@components/Journal/JournalComponent';
import DAODashboard from '@components/DAO/DAODashboard';
import EmergencySupport from '@components/Emergency/EmergencySupport';

// Background assets

//const therapyBg = new URL('../pages/therapy-bg.jpg', import.meta.url).href;
//const journalBg = new URL('../pages/journal-bg.jpg', import.meta.url).href;
//const daoBg = new URL('../pages/dao-bg.jpg', import.meta.url).href;
//const emergencyBg = new URL('../pages/emergency-bg.jpg', import.meta.url).href;

const landingBg = new URL('../pages/landing-bg.jpg', import.meta.url).href;
const p1 = new URL('../pages/p1.jpg', import.meta.url).href;
const AboutUsPage = new URL('../pages/AboutUsPage.jpg', import.meta.url).href;
const CustomerSupportPage = new URL('../pages/CustomerSupportPage.jpg', import.meta.url).href;
const PTSPage = new URL('../pages/PTSPage.jpg', import.meta.url).href;
const ArticlesPage = new URL('../pages/ArticlesPage.jpg', import.meta.url).href;

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<
    'landing' | 'p1' | 'about' | 'support' | 'pts' | 'articles' | 'main'
  >('landing');

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userActor, setUserActor] = useState<any>(null);
  const [aiActor, setAiActor] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('therapy');

  useEffect(() => {
    console.log('App loaded');
  }, []);

  const mockLogin = async () => {
    console.log(' MOCK LOGIN ENABLED');
    setIsAuthenticated(true);
    setUserProfile({ name: 'Test User', email: 'test@example.com' });
    setUserActor({});
    setAiActor({});
    setActivePage('main');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserActor(null);
    setAiActor(null);
    setUserProfile(null);
    setActivePage('landing');
  };

  const backgroundMap: Record<string, string> = {
    // therapy: therapyBg,
    // journal: journalBg,
    // dao: daoBg,
    // emergency: emergencyBg,
  };

  // ----------------------------
  // Landing Page
  // ----------------------------
  if (activePage === 'landing') {
    return (
      <div
        className="landing-wrapper"
        style={{
          position: 'relative',
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

        {/* Buttons to go to other pages */}

        {/* ARTICLES PAGE*/}
        <button
          onClick={() => setActivePage('articles')}
          style={{
            position: 'absolute',
            bottom: '107.5rem',
            left: '50%',
            transform: 'translateX(-145%)',
            padding: '1rem 2rem',
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


        {/* PRIVACY AND TERMS PAGE*/}
        <button
          onClick={() => setActivePage('pts')}
          style={{
            position: 'absolute',
            bottom: '107.5rem',
            left: '50%',
            transform: 'translateX(220%)',
            padding: '1rem 2.3rem',
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


        {/* PAGE 1*/}
        <button
          onClick={() => setActivePage('p1')}
          style={{
            position: 'absolute',
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
  // Static Pages
  // ----------------------------
  const renderStaticPage = (imgSrc: string, label: string) => (
    <div
      className={`${label}Page`}
      style={{
        position: 'relative',
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
        src={imgSrc}
        alt={`${label} Page`}
        style={{
          width: 'auto',
          height: 'auto',
          maxWidth: 'none',
          maxHeight: 'none',
          display: 'block',
        }}
      />


    </div>


  );

  if (activePage === 'p1') return renderStaticPage(p1, 'P1');

  if (activePage === 'articles') {
    <div
      className={`ArticlesPage`}
      style={{
        position: 'relative',
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
        src={ArticlesPage}
        alt={` ArticlesPage`}
        style={{
          width: 'auto',
          height: 'auto',
          maxWidth: 'none',
          maxHeight: 'none',
          display: 'block',
        }}
      />
      <button
        onClick={() => setActivePage('pts')}
        style={{
          position: 'absolute',
          bottom: '107.5rem',
          left: '50%',
          transform: 'translateX(220%)',
          padding: '1rem 2.3rem',
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
  }



  if (activePage === 'pts') return renderStaticPage(PTSPage, 'PTS');
  if (activePage === 'about') return renderStaticPage(AboutUsPage, 'AboutUs');
  if (activePage === 'support') return renderStaticPage(CustomerSupportPage, 'Support');

  // ----------------------------
  // Login
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
  // Main Authenticated App
  // ----------------------------
  if (activePage === 'main') {
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
  }

  return null;
};

export default App;
