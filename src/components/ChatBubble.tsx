import React from 'react';

interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  isLink?: boolean;
  href?: string;
  downloadName?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  isUser = false, 
  isLink = false, 
  href, 
  downloadName
}) => {
  const bubbleClass = isUser 
    ? "bg-blue-500 dark:bg-blue-600 text-white ml-auto rounded-tl-2xl rounded-tr-lg rounded-bl-2xl rounded-br-2xl" 
    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 mr-auto rounded-tl-lg rounded-tr-2xl rounded-bl-2xl rounded-br-2xl";

  const containerClass = isUser ? "flex justify-end" : "flex justify-start";

  const content = isLink ? (
    <a 
      href={href} 
      download={downloadName}
      target={downloadName ? undefined : "_blank"}
      rel={downloadName ? undefined : "noopener noreferrer"}
      className="hover:underline"
    >
      {message}
    </a>
  ) : message;

  return (
    <div className={`${containerClass} mb-2 animate-smooth-fade-in px-4`}>
      <div className={`${bubbleClass} px-4 py-2 max-w-xs lg:max-w-sm shadow-sm`}>
        <p className="text-sm leading-relaxed whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
