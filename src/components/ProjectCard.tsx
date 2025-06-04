import React from 'react';

interface ProjectCardProps {
  title: string;
  tech: string;
  icon: string;
  href: string;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, tech, icon, href, delay = 0 }) => {
  return (
    <div 
      className="bg-gray-200 dark:bg-gray-700 rounded-tl-lg rounded-tr-2xl rounded-bl-2xl rounded-br-2xl p-4 transition-colors animate-fade-in"
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      <div className="flex items-start space-x-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{title}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{tech}</p>
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 dark:bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
