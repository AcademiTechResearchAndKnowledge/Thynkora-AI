import React from 'react';

type EmergencySupportProps = {
  userProfile: any;
};

const EmergencySupport: React.FC<EmergencySupportProps> = ({ userProfile }) => {
  return (
    <div>
      <h2>Emergency Support</h2>
      {/* Use userProfile here */}
    </div>
  );
};

export default EmergencySupport;
