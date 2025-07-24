import React, { useState, useEffect } from 'react';
import TherapyChat from '../components/AITherapy/TherapyChat';
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



const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userActor, setUserActor] = useState<any>(null);
  const [aiActor, setAiActor] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('therapy');
  const [showSimpleChatbot, setShowSimpleChatbot] = useState(false);



  const [showp1, setShowp1] = useState(false);
  const [showAboutUsPage, setAboutUsPage] = useState(false);
  const [showCustomerSupportPage, setCustomerSupportPage] = useState(false);
  const [showPTSPage, setPTSPage] = useState(false);
  const [showArticlesPage, setArticlesPage] = useState(false);



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

        {/*    PAGE 1    */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(false),
              setShowp1(true),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(false),
              setShowSimpleChatbot(false)
          }}
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



        {/*    ARTICLES BUTTON     */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(false),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(true),
              setShowSimpleChatbot(false)
          }}

          style={{
            position: 'absolute',
            bottom: '107.5rem',
            left: '50%',
            transform: 'translateX(-125%)',
            padding: '1rem 2.5rem',
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

        {/*    Privacy Page    */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(false),
              setShowp1(false),
              setPTSPage(true),
              setCustomerSupportPage(false),
              setArticlesPage(false),
              setShowSimpleChatbot(false)
          }}
          style={{
            position: 'absolute',
            bottom: '107.5rem',
            left: '50%',
            transform: 'translateX(195%)',
            padding: '1rem 2.5rem',
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

        {/*    ABOUT US    */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(true),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(false),
              setShowSimpleChatbot(false)
          }}
          style={{
            position: 'absolute',
            bottom: '12.5rem',
            left: '50%',
            transform: 'translateX(-161%)',
            padding: '1rem 5rem',
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
        {/*    CUSTOMER SUPPORT   */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(false),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(true),
              setArticlesPage(false),
              setShowSimpleChatbot(false)
          }}
          style={{
            position: 'absolute',
            bottom: '10.5rem',
            left: '50%',
            transform: 'translateX(35%)',
            padding: '1rem 5rem',
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


        {/* CHAT BOT */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(false),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(false),
              setShowSimpleChatbot(true)
          }}
          style={{
            position: 'absolute',
            bottom: '107.5rem',
            left: '50%',
            transform: 'translateX(60%)',
            padding: '1rem 2rem',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
        </button>



        <button
          onClick={() => setShowLanding(true)} // HOME BUTTON
          style={{
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
          }}
        >
        </button>



      </div>
    );
  }
  // ----------------------------
  // AI THERAPY CHAT BOT
  // ----------------------------
  if (showSimpleChatbot) {
    return (
      <div className="simple-chat-wrapper">
        <TherapyChat aiActor={aiActor} userProfile={userProfile} />
        <button
          onClick={() => {
            setShowLanding(true),
              setAboutUsPage(false),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(false),
              setShowSimpleChatbot(false)
          }}
          className="back-button"
        >
          ← Back
        </button>
      </div>
    );
  }



  // ----------------------------
  // Page 1 (log your thoughts)
  // ----------------------------
  if (showp1) {
    return (
      <div
        className="page1"
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
          src={p1}
          alt="page 1"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: 'none',
            maxHeight: 'none',
            display: 'block',
          }}
        />
        {/* CHAT BOT */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(false),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(false),
              setShowSimpleChatbot(true)
          }}
          style={{
            position: 'absolute',
            bottom: '49rem',
            left: '50%',
            transform: 'translateX(60%)',
            padding: '1rem 2rem',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
        </button>

        {/*    ABOUT US    */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(true),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(false),
              setShowSimpleChatbot(false)
          }}
          style={{
            position: 'absolute',
            bottom: '49rem',
            left: '50%',
            transform: 'translateX(197%)',
            padding: '1rem 2.5rem',
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




        <button
          onClick={() => setShowLanding(true)} // HOME BUTTON
          style={{
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
          }}
        >
        </button>

      </div>

    );
  }
  // ----------------------------
  // Articles Page
  // ----------------------------
  if (showArticlesPage) {
    return (
      <div
        className="ArticlesPage"
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
          src={ArticlesPage}
          alt="page 1"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: 'none',
            maxHeight: 'none',
            display: 'block',
          }}
        />
        {/* CHAT BOT */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(false),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(false),
              setShowSimpleChatbot(true)
          }}
          style={{
            position: 'absolute',
            bottom: '44.8rem',
            left: '50%',
            transform: 'translateX(60%)',
            padding: '1rem 2rem',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
        </button>

        {/*    ABOUT US    */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(true),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(false),
              setShowSimpleChatbot(false)
          }}
          style={{
            position: 'absolute',
            bottom: '44.7rem',
            left: '50%',
            transform: 'translateX(197%)',
            padding: '1rem 2.5rem',
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


        <button
          onClick={() => setShowLanding(true)} // Home Button
          style={{
            position: 'absolute',
            bottom: '44.5rem',
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
          }}
        >
        </button>

      </div>

    );
  }
  // ----------------------------
  // Privacy and Terms Page
  // ----------------------------
  if (showPTSPage) {
    return (
      <div
        className="PTSPage"
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
          src={PTSPage}
          alt="PTSPage"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: 'none',
            maxHeight: 'none',
            display: 'block',
          }}
        />
        {/* CHAT BOT */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(false),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(false),
              setShowSimpleChatbot(true)
          }}
          style={{
            position: 'absolute',
            bottom: '44.8rem',
            left: '50%',
            transform: 'translateX(60%)',
            padding: '1rem 2rem',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
        </button>

        {/*    ABOUT US    */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(true),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(false),
              setShowSimpleChatbot(false)
          }}
          style={{
            position: 'absolute',
            bottom: '49rem',
            left: '50%',
            transform: 'translateX(197%)',
            padding: '1rem 2.5rem',
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

        {/*    ARTICLES BUTTON     */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(false),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(true),
              setShowSimpleChatbot(false)
          }}

          style={{
            position: 'absolute',
            bottom: '44.8rem',
            left: '50%',
            transform: 'translateX(-135%)',
            padding: '1rem 2.5rem',
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

        <button
          onClick={() => setShowLanding(true)} // Home Button
          style={{
            position: 'absolute',
            bottom: '44.5rem',
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
          }}
        >
        </button>


      </div>

    );
  }
  // ----------------------------
  // ABOUT US PAGE
  // ----------------------------
  if (showAboutUsPage) {
    return (
      <div
        className="AboutUsPage"
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
          src={AboutUsPage}
          alt="AboutUsPage"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: 'none',
            maxHeight: 'none',
            display: 'block',
          }}
        />
        {/* CHAT BOT */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(false),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(false),
              setShowSimpleChatbot(true)
          }}
          style={{
            position: 'absolute',
            bottom: '87.8rem',
            left: '50%',
            transform: 'translateX(60%)',
            padding: '1rem 2rem',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
        </button>

        {/*    ARTICLES BUTTON     */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(false),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(true),
              setShowSimpleChatbot(false)
          }}

          style={{
            position: 'absolute',
            bottom: '87.7rem',
            left: '50%',
            transform: 'translateX(-135%)',
            padding: '1rem 2.5rem',
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

        <button
          onClick={() => setShowLanding(true)} // Home Button
          style={{
            position: 'absolute',
            bottom: '87.4rem',
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
          }}
        >
        </button>


      </div>

    );
  }
  // ----------------------------
  // CUSTOMER SUPPORT
  // ----------------------------
  if (showCustomerSupportPage) {
    return (
      <div
        className="CustomerSupportPage"
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
          src={CustomerSupportPage}
          alt="CustomerSupportPage"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: 'none',
            maxHeight: 'none',
            display: 'block',
          }}
        />
        {/* CHAT BOT */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(false),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(false),
              setShowSimpleChatbot(true)
          }}
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(60%)',
            padding: '1rem 2rem',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
        </button>

        {/*    ABOUT US    */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(true),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(false),
              setShowSimpleChatbot(false)
          }}
          style={{
            position: 'absolute',
            bottom: '49.1rem',
            left: '50%',
            transform: 'translateX(197%)',
            padding: '1rem 2.5rem',
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

        {/*    ARTICLES BUTTON     */}
        <button
          onClick={() => {
            setShowLanding(false),
              setAboutUsPage(false),
              setShowp1(false),
              setPTSPage(false),
              setCustomerSupportPage(false),
              setArticlesPage(true),
              setShowSimpleChatbot(false)
          }}

          style={{
            position: 'absolute',
            bottom: '49.1rem',
            left: '50%',
            transform: 'translateX(-135%)',
            padding: '1rem 2.5rem',
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

        <button
          onClick={() => setShowLanding(true)} // Home Button
          style={{
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
          }}
        >
        </button>

        <input
          type="text"
          placeholder="Type here..."
          className="text-input"
          style={{
            position: 'absolute',
            bottom: '31.6rem',
            left: '50%',
            transform: 'translateX(-150%)',
            padding: '1rem 6rem',
            fontSize: '1.2rem',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 10,
          }}
        />



      </div>

    );
  }




  /*
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
        backgroundImage: URL(${backgroundMap[activeTab]}),
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
  */
};

export default App;