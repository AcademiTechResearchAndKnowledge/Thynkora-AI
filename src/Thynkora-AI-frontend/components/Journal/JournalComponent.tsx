import React from 'react';

type JournalProps = {
  userActor: any;
  userProfile: any;
};

const Journal: React.FC<JournalProps> = ({ userActor, userProfile }) => {
  return (
    <div>
      <h2>Journal</h2>
      {/* Use userActor and userProfile here */}
    </div>
  );
};

export default Journal;
