import React, { useState, useEffect, useRef } from 'react';
import TypeIt from 'typeit';

interface MessageInputProps {
  placeholder: string;
  onSend: (message: string) => void;
  disabled?: boolean;
  currentMessage?: string;
  onTypingComplete?: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  placeholder, 
  onSend, 
  disabled = false,
  currentMessage = '',
  onTypingComplete
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [canSend, setCanSend] = useState(false);
  const inputRef = useRef<HTMLSpanElement>(null);
  const typeItRef = useRef<TypeIt | null>(null);

  useEffect(() => {
    if (currentMessage && inputRef.current && !disabled) {
      setIsTyping(true);
      setCanSend(false);
      setMessage('');
      
      // Clear any existing TypeIt instance safely
      if (typeItRef.current) {
        try {
          typeItRef.current.destroy();
        } catch (error) {
          console.log('TypeIt destroy error (safe to ignore):', error);
        }
        typeItRef.current = null;
      }

      // Create new TypeIt instance
      typeItRef.current = new TypeIt(inputRef.current, {
        strings: [currentMessage],
        speed: 50,
        waitUntilVisible: true,
        afterComplete: () => {
          setMessage(currentMessage);
          setIsTyping(false);
          setCanSend(true);
          onTypingComplete?.();
        }
      });

      typeItRef.current.go();
    }

    // Cleanup function
    return () => {
      if (typeItRef.current) {
        try {
          typeItRef.current.destroy();
        } catch (error) {
          console.log('TypeIt cleanup error (safe to ignore):', error);
        }
        typeItRef.current = null;
      }
    };
  }, [currentMessage, disabled, onTypingComplete]);

  const handleSend = () => {
    if (message.trim() && canSend && !disabled) {
      onSend(message.trim());
      setMessage('');
      setCanSend(false);
      
      // Clear the input display
      if (inputRef.current) {
        inputRef.current.innerHTML = '';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && canSend) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
        <div className="flex-1 relative">
          <span
            ref={inputRef}
            className={`block bg-transparent outline-none text-gray-900 min-h-[20px] ${
              isTyping ? 'cursor-default' : 'cursor-text'
            }`}
            style={{ 
              minHeight: '20px',
              lineHeight: '20px'
            }}
          />
          {!message && !isTyping && (
            <span className="absolute top-0 left-0 text-gray-500 pointer-events-none">
              {placeholder}
            </span>
          )}
        </div>
        <button
          onClick={handleSend}
          disabled={disabled || !canSend || isTyping}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            disabled || !canSend || isTyping
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
