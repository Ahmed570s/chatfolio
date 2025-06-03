
import React from 'react';

interface TypingIndicatorProps {
  delay?: number;
  duration?: number;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ delay = 0, duration = 2000 }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, delay + duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [delay, duration]);

  if (!isVisible) return null;

  return (
    <div className="flex justify-start mb-2 px-4 animate-fade-in">
      <div className="bg-gray-200 rounded-tl-lg rounded-tr-2xl rounded-bl-2xl rounded-br-2xl px-4 py-3 shadow-sm">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
