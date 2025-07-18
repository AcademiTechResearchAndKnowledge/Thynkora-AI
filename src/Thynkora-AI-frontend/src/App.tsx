import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as userManagementIdl } from './declarations/user_management';
import { idlFactory as aiTherapyIdl } from './declarations/ai_therapy';
import AuthComponent from '@components/Auth/AuthComponent';
import TherapyChat from '@components/AITherapy/TherapyChat';
import Journal from '@components/Journal/JournalComponent';
import DAODashboard from '@components/DAO/DAODashboard';
import EmergencySupport from '@components/Emergency/EmergencySupport';

import './App.css';



const App: React.FC = () => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userActor, setUserActor] = useState<any>(null);
  const [aiActor, setAiActor] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('therapy');
  const [userProfile, setUserProfile] = useState<any>(null);

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

  const setupActors = async (client: AuthClient) => {
    const identity = client.getIdentity();
    const agent = new HttpAgent({ identity });
    
    // In production, use mainnet
    if (process.env.NODE_ENV === 'production') {
      await agent.fetchRootKey();
    }

    const userActor = Actor.createActor(userManagementIdl, {
      agent,
      canisterId: process.env.REACT_APP_USER_MANAGEMENT_CANISTER_ID!,
    });

    const aiActor = Actor.createActor(aiTherapyIdl, {
      agent,
      canisterId: process.env.REACT_APP_AI_THERAPY_CANISTER_ID!,
    });

    setUserActor(userActor);
    setAiActor(aiActor);
    
    // Load user profile
    try {
      const profile = await userActor.getProfile();
      setUserProfile(profile);
    } catch (error) {
      console.log('No profile found, user needs to create one');
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

  if (!isAuthenticated) {
    return <AuthComponent onLogin={handleLogin} />;
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
          <TherapyChat 
            aiActor={aiActor} 
            userProfile={userProfile}
          />
        )}
        {activeTab === 'journal' && (
          <Journal 
            userActor={userActor}
            userProfile={userProfile}
          />
        )}
        {activeTab === 'dao' && (
          <DAODashboard
  onLogin={handleLogin}
  userActor={userActor}
  userProfile={userProfile}
/>

        )}
        {activeTab === 'emergency' && (
          <EmergencySupport 
            userProfile={userProfile}
          />
        )}
      </main>
    </div>
  );
};

export default App;
