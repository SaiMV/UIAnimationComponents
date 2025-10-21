import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUITypewriterProps {
  text?: string;
  fontSize?: string;
  cursorColor?: string;
  cursorWidth?: string;
  animationDuration?: number;
  cursorBlinkSpeed?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUITypewriter: React.FC<FiEyesUITypewriterProps> = ({
  text = "Welcome To Finches Eyes UI Components",
  fontSize = "80px",
  cursorColor = "#ffffff",
  cursorWidth = "4px",
  animationDuration = 5000,
  cursorBlinkSpeed = 1000,
  autoPlay = true,
  repeatInterval = 6000,
  className = "",
  style = {},
  onComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const fiEyesUIContainer = containerRef.current;
    
    // Create styles dynamically
    const fiEyesUICreateStyles = () => {
      const fiEyesUIStyleId = 'fiEyesUI-typewriter-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-typewriter-container {
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
          text-align: center;
          margin: 0;
          padding: 20px;
          background-color: #000000;
          color: #ffffff;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .fiEyesUI-typewriter-content {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
          font-weight: bold;
        }
        
        .fiEyesUI-typewriter-text {
          white-space: nowrap;
          overflow: hidden;
          border-right: ${cursorWidth} solid ${cursorColor};
          animation: fiEyesUI-cursor ${cursorBlinkSpeed}ms step-start infinite, 
                     fiEyesUI-typewriter-text ${animationDuration}ms steps(${text.length}) alternate infinite;
        }
        
        @keyframes fiEyesUI-cursor {
          0%, 100% { 
            border-color: ${cursorColor}; 
          }
        }
        
        @keyframes fiEyesUI-typewriter-text {
          0% { 
            width: 0; 
          }
          100% { 
            width: ${text.length}ch; 
          }
        }
      `;
      
      document.head.appendChild(fiEyesUIStyle);
    };

    // Start animation
    const fiEyesUIStartAnimation = () => {
      if (!fiEyesUIContainer) return;
      
      setIsAnimating(true);
      
      // Calculate total animation time
      setTimeout(() => {
        setIsAnimating(false);
        onComplete?.();
      }, animationDuration);
    };

    // Initialize
    fiEyesUICreateStyles();
    
    if (autoPlay) {
      fiEyesUIStartAnimation();
      
      // Set up interval for auto-repeat
      intervalRef.current = window.setInterval(() => {
        fiEyesUIStartAnimation();
      }, repeatInterval) as unknown as number;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-typewriter-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [text, fontSize, cursorColor, cursorWidth, animationDuration, cursorBlinkSpeed, autoPlay, repeatInterval, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-typewriter-container ${className}`}
      style={style}
    >
      <div className="fiEyesUI-typewriter-content">
        <div className="fiEyesUI-typewriter-text">{text}</div>
      </div>
    </div>
  );
};
