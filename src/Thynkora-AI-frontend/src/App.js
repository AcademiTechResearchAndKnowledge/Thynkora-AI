        ////skip auth for test\\\\



import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { AuthClient } from '@dfinity/auth-client';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as userManagementIdl } from './declarations/user_management';
import { idlFactory as aiTherapyIdl } from './declarations/ai_therapy';
=======
// import { AuthClient } from '@dfinity/auth-client';
// import { Actor, HttpAgent } from '@dfinity/agent';
// import { idlFactory as userManagementIdl } from './declarations/user_management';
// import { idlFactory as aiTherapyIdl } from './declarations/ai_therapy';

>>>>>>> 0fe8f05ebce8b6674e08699caae864fabdbc5ca1
import AuthComponent from '@components/Auth/AuthComponent';
import TherapyChat from '@components/AITherapy/TherapyChat';
import Journal from '@components/Journal/JournalComponent';
import DAODashboard from '@components/DAO/DAODashboard';
import EmergencySupport from '@components/Emergency/EmergencySupport';
<<<<<<< HEAD
const App = () => {
    const [authClient, setAuthClient] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userActor, setUserActor] = useState(null);
    const [aiActor, setAiActor] = useState(null);
    const [activeTab, setActiveTab] = useState('therapy');
    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        initAuth();
    }, []);
    const initAuth = async () => {
        const client = await AuthClient.create();
        setAuthClient(client);
        const isAuthenticated = await client.isAuthenticated();
        setIsAuthenticated(isAuthenticated);
        if (isAuthenticated) {
            await setupActors(client);
        }
    };
    const setupActors = async (client) => {
        const identity = client.getIdentity();
        const agent = new HttpAgent({ identity });
        if (process.env.NODE_ENV !== 'production') {
            await agent.fetchRootKey(); // Only in development
        }
        const userActor = Actor.createActor(userManagementIdl, {
            agent,
            canisterId: process.env.REACT_APP_USER_MANAGEMENT_CANISTER_ID,
        });
        const aiActor = Actor.createActor(aiTherapyIdl, {
            agent,
            canisterId: process.env.REACT_APP_AI_THERAPY_CANISTER_ID,
        });
        setUserActor(userActor);
        setAiActor(aiActor);
        try {
            const profile = await userActor.getProfile();
            setUserProfile(profile);
        }
        catch (error) {
            console.log('No profile found, user needs to create one');
        }
    };
    const handleLogin = async () => {
        if (!authClient)
            return;
        await authClient.login({
            identityProvider: 'https://identity.ic0.app',
            onSuccess: async () => {
                setIsAuthenticated(true);
                await setupActors(authClient);
            },
        });
    };
    const handleLogout = async () => {
        if (!authClient)
            return;
        await authClient.logout();
        setIsAuthenticated(false);
        setUserActor(null);
        setAiActor(null);
        setUserProfile(null);
    };
    if (!isAuthenticated) {
        return React.createElement(AuthComponent, { onLogin: handleLogin });
=======

////skip auth for test
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userActor, setUserActor] = useState<any>(null);
  const [aiActor, setAiActor] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('therapy');

  // Skip auth logic for testing
  useEffect(() => {
    setIsAuthenticated(true);

    // Set mock actors and profile data
    setUserActor({ mock: true });
    setAiActor({ mock: true });
    setUserProfile({
      name: 'Test User',
      email: 'test@example.com',
      bio: 'Testing only'
    });
  }, []);

  // Remove or comment out actual auth logic
  /*
  const initAuth = async () => {
    const client = await AuthClient.create();
    setAuthClient(client);

    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);

    if (isAuthenticated) {
      await setupActors(client);
>>>>>>> 0fe8f05ebce8b6674e08699caae864fabdbc5ca1
    }
  };

  const handleLogin = async () => {
    if (!authClient) return;

    await authClient.login({
      identityProvider: 'https://identity.ic0.app',
      onSuccess: async () => {
        setIsAuthenticated(true);
        await setupActors(authClient);
      },
    });
  };

  const handleLogout = async () => {
    if (!authClient) return;

    await authClient.logout();
    setIsAuthenticated(false);
    setUserActor(null);
    setAiActor(null);
    setUserProfile(null);
  };
  */

  if (!isAuthenticated) {
    return <div>Mocking authentication...</div>;
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
        {/* <button onClick={handleLogout}>Logout</button> */}
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
            onLogin={() => console.log('Mock login')}
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
