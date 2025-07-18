import React from 'react';

interface DAODashboardProps {
  onLogin: () => void;
  userActor?: any;         // adjust these types to be more specific if possible
  userProfile?: any;
}

const DAODashboard: React.FC<DAODashboardProps> = ({ onLogin, userActor, userProfile }) => {
  return (
    <div className="dao-dashboard">
      <h2>DAO Governance Dashboard</h2>

      {userProfile ? (
        <div>
          <p>Welcome, {userProfile.name}!</p>
          {/* Add your DAO logic and UI here */}
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <button onClick={onLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default DAODashboard;
