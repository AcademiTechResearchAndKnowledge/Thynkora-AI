import React from 'react';

type TherapyChatProps = {
  aiActor: any;
  userProfile: any;
};

const TherapyChat: React.FC<TherapyChatProps> = ({ aiActor, userProfile }) => {
  return (
    <div>
      <h2>Therapy Chat</h2>
      {/* Use aiActor and userProfile here */}
    </div>
  );
};

export default TherapyChat;
