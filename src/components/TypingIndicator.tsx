import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-2 px-4 animate-smooth-fade-in">
      <div className="bg-gray-200 dark:bg-gray-700 rounded-tl-lg rounded-tr-2xl rounded-bl-2xl rounded-br-2xl px-4 py-3 shadow-sm">
        <div className="flex space-x-1">
          <div 
            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-typing-bounce" 
            style={{ animationDelay: '0ms' }}
          ></div>
          <div 
            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-typing-bounce" 
            style={{ animationDelay: '200ms' }}
          ></div>
          <div 
            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-typing-bounce" 
            style={{ animationDelay: '400ms' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
