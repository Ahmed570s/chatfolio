
import React from 'react';

const ChatHeader = () => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 p-4 sticky top-0 z-10 backdrop-blur-md bg-opacity-90">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            K
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Kino</h1>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
        <div className="text-gray-400">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
