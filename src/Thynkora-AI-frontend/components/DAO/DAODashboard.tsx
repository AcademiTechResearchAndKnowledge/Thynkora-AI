import React from 'react';

type DAODashboardProps = {
  onLogin: () => void;
  userActor: any;
  userProfile: any;
};

const DAODashboard: React.FC<DAODashboardProps> = ({ onLogin, userActor, userProfile }) => {
  return (
    <div>
      <h2>DAO Dashboard</h2>
      {userProfile ? (
        <p>Welcome, {userProfile.name || 'Anonymous'}!</p>
      ) : (
        <p>User profile not loaded.</p>
      )}
      
      {/* Example usage of userActor */}
      <button onClick={() => onLogin()}>
        Re-authenticate
      </button>

      {/* Add your DAO interaction UI here */}
    </div>
  );
};

export default DAODashboard;
