import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatBubble from '../components/ChatBubble';
import TypingIndicator from '../components/TypingIndicator';
import ProjectCard from '../components/ProjectCard';
import MessageInput from '../components/MessageInput';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  isLink?: boolean;
  href?: string;
  downloadName?: string;
  isProjects?: boolean;
  isFooter?: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStage, setCurrentStage] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [awaitingInput, setAwaitingInput] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState('Message');
  const [currentTypingMessage, setCurrentTypingMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const userMessages = [
    "Hey, who's this?",
    "What are you currently working on?",
    "Can I see your projects?",
    "How can I contact you?"
  ];

  const conversationStages = [
    // Stage 0: Initial greeting
    {
      messages: [
        { text: "👋 Hey there", isUser: false },
        { text: "I'm Kino", isUser: false },
        { text: "I build full-stack apps with NestJS, .NET Core, and React.", isUser: false },
      ],
      nextPlaceholder: "Message"
    },
    // Stage 1: Current work
    {
      messages: [
        { text: "Currently building a driving school management system.", isUser: false },
        { text: "Just finished a scraper that uses OpenAI to turn raw HTML into clean job data.", isUser: false },
      ],
      nextPlaceholder: "Message"
    },
    // Stage 2: Projects
    {
      messages: [
        { text: "Want to see what I've been working on?", isUser: false },
        { text: "", isUser: false, isProjects: true },
      ],
      nextPlaceholder: "Message"
    },
    // Stage 3: Contact
    {
      messages: [
        { text: "Not looking for freelance — focused on landing a dev role.", isUser: false },
        { text: "Let's connect 👇", isUser: false },
        { text: "💼 LinkedIn", isUser: false, isLink: true, href: "https://linkedin.com" },
        { text: "📧 Email Me", isUser: false, isLink: true, href: "mailto:kino@example.com" },
        { text: "📄 Download Resume", isUser: false, isLink: true, href: "#", downloadName: "Kino_Resume.pdf" },
        { text: "👾 Portfolio v1.0 – Last updated May 2025", isUser: false, isFooter: true },
      ],
      nextPlaceholder: ""
    }
  ];

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTyping]);

  useEffect(() => {
    // Start with the first user message
    setTimeout(() => {
      setCurrentTypingMessage(userMessages[0]);
      setAwaitingInput(true);
    }, 1000);
  }, []);

  const addMessage = (messageData: Omit<Message, 'id'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const playStage = async (stageIndex: number) => {
    const stage = conversationStages[stageIndex];
    if (!stage) return;

    // Process each message in the stage with typing indicator, except footer
    for (let i = 0; i < stage.messages.length; i++) {
      const msg = stage.messages[i];
      
      // Skip typing indicator for footer messages
      if ('isFooter' in msg && msg.isFooter) {
        // Wait a bit, then add footer directly without typing
        await new Promise(resolve => setTimeout(resolve, 1000));
        addMessage(msg);
        continue;
      }
      
      // Wait a bit between messages for natural pacing
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Show typing indicator
      setShowTyping(true);
      
      // Wait for typing duration (1-2 seconds)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Hide typing and add message
      setShowTyping(false);
      addMessage(msg);
      
      // Small delay before next message
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Wait a bit, then show next user message prompt
    setTimeout(() => {
      const nextUserMessageIndex = stageIndex + 1;
      if (nextUserMessageIndex < userMessages.length) {
        setCurrentTypingMessage(userMessages[nextUserMessageIndex]);
        setAwaitingInput(true);
      }
    }, 1000);
  };

  const handleUserMessage = (message: string) => {
    // Add user message
    addMessage({ text: message, isUser: true });
    setAwaitingInput(false);
    setCurrentTypingMessage('');
    
    // Move to next stage after a short delay
    setTimeout(() => {
      playStage(currentStage);
      setCurrentStage(prev => prev + 1);
    }, 500);
  };

  const handleTypingComplete = () => {
    // Typing animation is complete, user can now send
  };

  const renderMessage = (msg: Message) => {
    if (msg.isProjects) {
      return (
        <div key={msg.id} className="px-4 mb-4 space-y-3 animate-fade-in">
          <ProjectCard
            title="🛠️ Driving School App"
            tech="📦 React + Supabase"
            icon="🚗"
            href="https://github.com"
            delay={0}
          />
          <ProjectCard
            title="🤖 AI Job Scraper"
            tech="🧠 Python + OpenAI API"
            icon="🔍"
            href="https://github.com"
            delay={200}
          />
        </div>
      );
    }

    if (msg.isFooter) {
      return (
        <div key={msg.id} className="flex justify-center mb-2 px-4 pt-4 animate-fade-in">
          <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
            {msg.text}
          </div>
        </div>
      );
    }

    return (
      <ChatBubble
        key={msg.id}
        message={msg.text}
        isUser={msg.isUser}
        isLink={msg.isLink}
        href={msg.href}
        downloadName={msg.downloadName}
      />
    );
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      <ChatHeader />
      
      <div className="flex-1 max-w-md mx-auto w-full flex flex-col">
        {/* Messages Container - iPhone style with messages flowing from bottom */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto pt-6 pb-4"
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}
        >
          <div className="flex flex-col">
            {messages.map(renderMessage)}
            {showTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Fixed Message Input */}
        <div className="flex-shrink-0">
          <MessageInput
            placeholder={inputPlaceholder}
            onSend={handleUserMessage}
            disabled={!awaitingInput}
            currentMessage={currentTypingMessage}
            onTypingComplete={handleTypingComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
