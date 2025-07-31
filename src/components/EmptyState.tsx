import React from "react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  variant?: "tours" | "search" | "admin";
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  variant = "tours"
}) => {
  const renderIllustration = () => {
    switch (variant) {
      case "search":
        return (
          <div className="w-24 h-24 mx-auto mb-6">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-gray-300">
              <circle cx="45" cy="45" r="20" stroke="currentColor" strokeWidth="3" fill="none"/>
              <circle cx="45" cy="45" r="8" fill="currentColor" opacity="0.3"/>
              <line x1="65" y1="65" x2="85" y2="85" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <path d="M30 35 L60 35 M30 45 L50 45 M30 55 L55 55" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
            </svg>
          </div>
        );
      case "admin":
        return (
          <div className="w-24 h-24 mx-auto mb-6">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-gray-300">
              <rect x="20" y="30" width="60" height="40" rx="4" stroke="currentColor" strokeWidth="3" fill="none"/>
              <circle cx="50" cy="50" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M40 20 L60 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <path d="M35 75 L65 75" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
              <circle cx="30" cy="40" r="2" fill="currentColor" opacity="0.3"/>
              <circle cx="70" cy="60" r="2" fill="currentColor" opacity="0.3"/>
            </svg>
          </div>
        );
      default: // tours
        return (
          <div className="w-24 h-24 mx-auto mb-6">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-orange-300">
              <path 
                d="M20 80 Q50 20 80 80" 
                stroke="currentColor" 
                strokeWidth="3" 
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="35" cy="65" r="3" fill="currentColor" opacity="0.6"/>
              <circle cx="50" cy="45" r="4" fill="currentColor" opacity="0.8"/>
              <circle cx="65" cy="65" r="3" fill="currentColor" opacity="0.6"/>
              <path 
                d="M45 40 Q50 35 55 40" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none"
                strokeLinecap="round"
              />
              <rect x="25" y="75" width="50" height="8" rx="4" fill="currentColor" opacity="0.2"/>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        {renderIllustration()}
        
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed mb-6">
          {description}
        </p>
        
        {actionText && onAction && (
          <Button 
            onClick={onAction}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
