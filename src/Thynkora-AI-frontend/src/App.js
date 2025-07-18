        ////skip auth for test\\\\



import React, { useState } from 'react';
import AuthComponent from '@components/Auth/AuthComponent';
import TherapyChat from '@components/AITherapy/TherapyChat';
import Journal from '@components/Journal/JournalComponent';
import DAODashboard from '@components/DAO/DAODashboard';
import EmergencySupport from '@components/Emergency/EmergencySupport';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [aiActor, setAiActor] = useState<any>(null);
  const [userActor, setUserActor] = useState<any>(null);

  const setupActors = async () => {
    // replace with actual actor setup logic
    setAiActor({ mock: true });
    setUserActor({ mock: true });
    setUserProfile({ username: 'Tester' });
  };

  const handleLogin = async () => {
    setIsAuthenticated(true);
    await setupActors();
  };

  if (!isAuthenticated) {
    return <AuthComponent onLogin={handleLogin} />;
  }

  return (
    <div>
      <TherapyChat aiActor={aiActor} userProfile={userProfile} />
      <Journal userActor={userActor} userProfile={userProfile} />
      <DAODashboard onLogin={handleLogin} />
      <EmergencySupport userProfile={userProfile} />
    </div>
  );
}

export default App;
