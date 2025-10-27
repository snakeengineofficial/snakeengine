
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 p-4">
      <div className="w-2.5 h-2.5 bg-blue-300 rounded-full animate-pulse"></div>
      <div className="w-2.5 h-2.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2.5 h-2.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
};

export default TypingIndicator;
