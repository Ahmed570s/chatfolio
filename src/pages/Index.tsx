
import React, { useState, useEffect } from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatBubble from '../components/ChatBubble';
import TypingIndicator from '../components/TypingIndicator';
import ProjectCard from '../components/ProjectCard';
import MessageInput from '../components/MessageInput';

interface Message {
  text: string;
  isUser: boolean;
  delay?: number;
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
        { text: "👋 Hey there", isUser: false, delay: 1000 },
        { text: "I'm Kino", isUser: false, delay: 1500 },
        { text: "I build full-stack apps with NestJS, .NET Core, and React.", isUser: false, delay: 2000 },
      ],
      nextPlaceholder: "Message"
    },
    // Stage 1: Current work
    {
      messages: [
        { text: "Currently building a driving school management system.", isUser: false, delay: 500 },
        { text: "Just finished a scraper that uses OpenAI to turn raw HTML into clean job data.", isUser: false, delay: 1500 },
      ],
      nextPlaceholder: "Message"
    },
    // Stage 2: Projects
    {
      messages: [
        { text: "Want to see what I've been working on?", isUser: false, delay: 500 },
        { text: "", isUser: false, delay: 1000, isProjects: true },
      ],
      nextPlaceholder: "Message"
    },
    // Stage 3: Contact
    {
      messages: [
        { text: "Not looking for freelance — focused on landing a dev role.", isUser: false, delay: 500 },
        { text: "Let's connect 👇", isUser: false, delay: 1000 },
        { text: "💼 LinkedIn", isUser: false, delay: 1500, isLink: true, href: "https://linkedin.com" },
        { text: "📧 Email Me", isUser: false, delay: 2000, isLink: true, href: "mailto:kino@example.com" },
        { text: "📄 Download Resume", isUser: false, delay: 2500, isLink: true, href: "#", downloadName: "Kino_Resume.pdf" },
        { text: "👾 Portfolio v1.0 – Last updated May 2025", isUser: false, delay: 3000, isFooter: true },
      ],
      nextPlaceholder: ""
    }
  ];

  useEffect(() => {
    // Start with the first user message
    setTimeout(() => {
      setCurrentTypingMessage(userMessages[0]);
      setAwaitingInput(true);
    }, 1000);
  }, []);

  const playStage = (stageIndex: number) => {
    const stage = conversationStages[stageIndex];
    if (!stage) return;

    let totalStageTime = 0;
    
    stage.messages.forEach((msg, index) => {
      const messageDelay = msg.delay || 0;
      const typingDuration = index > 0 ? 800 : 0; // Only add typing delay if not the first message
      
      setTimeout(() => {
        if (index > 0) {
          setShowTyping(true);
          setTimeout(() => {
            setShowTyping(false);
            setMessages(prev => [...prev, msg]);
          }, 800);
        } else {
          setMessages(prev => [...prev, msg]);
        }
      }, totalStageTime + messageDelay);
      
      // Calculate when this message will be fully displayed
      totalStageTime += messageDelay + typingDuration;
    });

    // Wait until all messages in this stage are done before showing next user message
    setTimeout(() => {
      const nextUserMessageIndex = stageIndex + 1;
      if (nextUserMessageIndex < userMessages.length) {
        setCurrentTypingMessage(userMessages[nextUserMessageIndex]);
        setAwaitingInput(true);
      }
    }, totalStageTime + 1000); // Add extra 1 second buffer after all messages are displayed
  };

  const handleUserMessage = (message: string) => {
    // Add user message
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setAwaitingInput(false);
    setCurrentTypingMessage('');
    
    // Move to next stage
    setTimeout(() => {
      playStage(currentStage);
      setCurrentStage(prev => prev + 1);
    }, 500);
  };

  const handleTypingComplete = () => {
    // Typing animation is complete, user can now send
  };

  const renderMessage = (msg: Message, index: number) => {
    if (msg.isProjects) {
      return (
        <div key={index} className="px-4 mb-4 space-y-3 animate-fade-in" style={{ animationDelay: `${msg.delay}ms`, animationFillMode: 'both' }}>
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
        <div key={index} className="flex justify-center mb-2 px-4 animate-fade-in" style={{ animationDelay: `${msg.delay}ms`, animationFillMode: 'both' }}>
          <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
            {msg.text}
          </div>
        </div>
      );
    }

    return (
      <ChatBubble
        key={index}
        message={msg.text}
        isUser={msg.isUser}
        isLink={msg.isLink}
        href={msg.href}
        downloadName={msg.downloadName}
        delay={msg.delay}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <ChatHeader />
      
      <div className="max-w-md mx-auto">
        {/* Messages Container */}
        <div className="pt-6 pb-20">
          {messages.map((msg, index) => renderMessage(msg, index))}
          {showTyping && <TypingIndicator delay={0} duration={2000} />}
        </div>

        <MessageInput
          placeholder={inputPlaceholder}
          onSend={handleUserMessage}
          disabled={!awaitingInput}
          currentMessage={currentTypingMessage}
          onTypingComplete={handleTypingComplete}
        />
      </div>
    </div>
  );
};

export default Index;
