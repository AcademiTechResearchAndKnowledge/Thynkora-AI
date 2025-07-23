import React, { useState } from 'react';
import TherapyChat from '@components/AITherapy/TherapyChat';
import Journal from '@components/Journal/JournalComponent';
import DAODashboard from '@components/DAO/DAODashboard';
import EmergencySupport from '@components/Emergency/EmergencySupport';

// Image imports
const landingBg = new URL('../pages/landing-bg.jpg', import.meta.url).href;
const p1 = new URL('../pages/p1.jpg', import.meta.url).href;
const AboutUsPage = new URL('../pages/AboutUsPage.jpg', import.meta.url).href;
const CustomerSupportPage = new URL('../pages/CustomerSupportPage.jpg', import.meta.url).href;
const PTSPage = new URL('../pages/PTSPage.jpg', import.meta.url).href;
const ArticlesPage = new URL('../pages/ArticlesPage.jpg', import.meta.url).href;

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [showp1, setShowp1] = useState(false);
  const [showAboutUsPage, setAboutUsPage] = useState(false);
  const [showCustomerSupportPage, setCustomerSupportPage] = useState(false);
  const [showPTSPage, setPTSPage] = useState(false);
  const [showArticlesPage, setArticlesPage] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userActor, setUserActor] = useState<any>(null);
  const [aiActor, setAiActor] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('therapy');

  const backgroundMap: Record<string, string> = {
    therapy: '', // optional: add background for each tab
    journal: '',
    dao: '',
    emergency: '',
  };

  const mockLogin = () => {
    setIsAuthenticated(true);
    setUserProfile({ name: 'Test User', email: 'test@example.com' });
    setUserActor({});
    setAiActor({});
    setShowLanding(false); // hide landing after login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserActor(null);
    setAiActor(null);
    setUserProfile(null);
    setShowLanding(true);
  };

  // Landing Page
  if (showLanding && !isAuthenticated) {
    return (
      <div className="landing-wrapper" style={{ position: 'relative', width: '100%', height: 'auto', overflow: 'auto' }}>
        <img src={landingBg} alt="Landing Page" style={{ width: 'auto', height: 'auto', display: 'block' }} />
        <button onClick={() => { setShowLanding(false); setShowp1(true); }} style={invisibleBtn('75.5rem', '0%')} />
        <button onClick={() => { setShowLanding(false); setArticlesPage(true); }} style={invisibleBtn('107.5rem', '-125%')} />
        <button onClick={() => { setShowLanding(false); setPTSPage(true); }} style={invisibleBtn('107.5rem', '195%')} />
        <button onClick={() => { setShowLanding(false); setAboutUsPage(true); }} style={invisibleBtn('12.5rem', '-161%')} />
        <button onClick={() => { setShowLanding(false); setCustomerSupportPage(true); }} style={invisibleBtn('10.5rem', '35%')} />
        <button onClick={() => setShowLanding(true)} style={invisibleBtn('107.5rem', '-395%')} />

        {/* Mock Login Button */}
        <button
          onClick={mockLogin}
          style={{
            position: 'absolute',
            bottom: '8rem',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '1rem 4rem',
            fontSize: '1.3rem',
            backgroundColor: 'white',
            color: '#000',
            border: '1px solid #000',
            borderRadius: '10px',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          Enter Thynkora
        </button>
      </div>
    );
  }

  // Individual Pages
  if (showp1) return imagePage(p1, () => setShowLanding(true), () => setAboutUsPage(true), '49rem', '197%', '-380%');
  if (showArticlesPage) return imagePage(ArticlesPage, () => setShowLanding(true), () => setAboutUsPage(true), '44.7rem', '197%', '-380%');
  if (showPTSPage) return imagePage(PTSPage, () => setShowLanding(true), () => setAboutUsPage(true), '44.7rem', '197%', '-380%');
  if (showAboutUsPage) return imagePage(AboutUsPage, () => setShowLanding(true), () => setArticlesPage(true), '87.7rem', '197%', '-380%');
  if (showCustomerSupportPage) return imagePage(CustomerSupportPage, () => setShowLanding(true), () => setArticlesPage(true), '49.1rem', '197%', '-380%');

  // Main App (Post-Login)
  if (isAuthenticated) {
    return (
      <div className="app" style={{
        backgroundImage: `url(${backgroundMap[activeTab] || ''})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        overflow: 'auto',
        color: '#fff',
      }}>
        <header style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1>Thynkora-AI</h1>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => setActiveTab('therapy')}>AI Therapy</button>
            <button onClick={() => setActiveTab('journal')}>Journal</button>
            <button onClick={() => setActiveTab('dao')}>DAO</button>
            <button onClick={() => setActiveTab('emergency')}>Emergency</button>
          </nav>
          <button onClick={handleLogout}>Logout</button>
        </header>

        <main style={{ padding: '2rem' }}>
          {activeTab === 'therapy' && <TherapyChat aiActor={aiActor} userProfile={userProfile} />}
          {activeTab === 'journal' && <Journal userActor={userActor} userProfile={userProfile} />}
          {activeTab === 'dao' && <DAODashboard onLogin={mockLogin} userActor={userActor} userProfile={userProfile} />}
          {activeTab === 'emergency' && <EmergencySupport userProfile={userProfile} />}
        </main>
      </div>
    );
  }

  // Just in case
  return <div>Loading...</div>;
};

export default App;

// Utility styles and helpers
const invisibleBtn = (bottom: string, translateX: string): React.CSSProperties => ({
  position: 'absolute',
  bottom,
  left: '50%',
  transform: `translateX(${translateX})`,
  padding: '1.5rem 5rem',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  border: 'none',
  cursor: 'pointer',
  zIndex: 10,
});

const imagePage = (
  src: string,
  homeCallback: () => void,
  navCallback: () => void,
  bottom: string,
  translateNav: string,
  translateHome: string
) => (
  <div style={{ position: 'relative', width: '100%', height: 'auto', overflow: 'auto', display: 'flex', justifyContent: 'center' }}>
    <img src={src} alt="page" style={{ width: 'auto', height: 'auto', display: 'block' }} />
    <button onClick={navCallback} style={invisibleBtn(bottom, translateNav)} />
    <button onClick={homeCallback} style={invisibleBtn(bottom, translateHome)} />
  </div>
);
