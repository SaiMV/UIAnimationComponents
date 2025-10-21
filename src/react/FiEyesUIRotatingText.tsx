import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUIRotatingTextProps {
  words?: string[];
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  wordDelay?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUIRotatingText: React.FC<FiEyesUIRotatingTextProps> = ({
  words = ["beautiful", "maintainable", "perfect"],
  fontSize = "40px",
  color = "#ffffff",
  animationDuration = 1500,
  wordDelay = 1250,
  autoPlay = true,
  repeatInterval = 5000,
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
      const fiEyesUIStyleId = 'fiEyesUI-rotatingText-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-rotatingText-container {
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
        
        .fiEyesUI-rotatingText-content {
          position: relative;
          width: 100%;
        }
        
        .fiEyesUI-rotatingText-word {
          font-family: 'Orbitron', sans-serif;
          font-size: ${fontSize};
          left: 0;
          margin-bottom: 0;
          margin-top: 30px;
          opacity: 0;
          position: absolute;
          right: 0;
          text-align: center;
          text-transform: uppercase;
          top: 0;
          color: ${color};
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(1) {
          animation: fiEyesUI-rotate-text-up ${animationDuration}ms ${wordDelay}ms;
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(2) {
          animation: fiEyesUI-rotate-text-up ${animationDuration}ms ${wordDelay * 2}ms;
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(3) {
          animation: fiEyesUI-fade-text-in ${animationDuration}ms ${wordDelay * 3}ms forwards;
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(4) {
          animation: fiEyesUI-rotate-text-up ${animationDuration}ms ${wordDelay * 4}ms;
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(5) {
          animation: fiEyesUI-rotate-text-up ${animationDuration}ms ${wordDelay * 5}ms;
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(6) {
          animation: fiEyesUI-fade-text-in ${animationDuration}ms ${wordDelay * 6}ms forwards;
        }
        
        @keyframes fiEyesUI-rotate-text-up {
          0% {
            transform: translate3d(0, 80px, 0);
            opacity: 0;
          }
          20%, 80% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
          100% {
            transform: translate3d(0, -40px, 0);
            opacity: 0;
          }
        }
        
        @keyframes fiEyesUI-fade-text-in {
          0% {
            opacity: 0;
            transform: translate3d(0, 80px, 0);
          }
          50%, 100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `;
      
      document.head.appendChild(fiEyesUIStyle);
    };

    // Create word elements
    const fiEyesUICreateWords = () => {
      if (!fiEyesUIContainer) return;
      
      const fiEyesUIContentDiv = fiEyesUIContainer.querySelector('.fiEyesUI-rotatingText-content');
      if (!fiEyesUIContentDiv) return;
      
      fiEyesUIContentDiv.innerHTML = '';
      
      words.forEach((fiEyesUIWord, fiEyesUIIndex) => {
        const fiEyesUIWordDiv = document.createElement('h2');
        fiEyesUIWordDiv.className = 'fiEyesUI-rotatingText-word';
        fiEyesUIWordDiv.textContent = fiEyesUIWord;
        fiEyesUIContentDiv.appendChild(fiEyesUIWordDiv);
      });
    };

    // Start animation
    const fiEyesUIStartAnimation = () => {
      if (!fiEyesUIContainer) return;
      
      setIsAnimating(true);
      fiEyesUICreateWords();
      
      // Calculate total animation time
      const totalTime = (words.length * wordDelay) + animationDuration;
      
      setTimeout(() => {
        setIsAnimating(false);
        onComplete?.();
      }, totalTime);
    };

    // Initialize
    fiEyesUICreateStyles();
    fiEyesUICreateWords();
    
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
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-rotatingText-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [words, color, fontSize, animationDuration, wordDelay, autoPlay, repeatInterval, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-rotatingText-container ${className}`}
      style={{
        fontSize,
        ...style
      }}
    >
      <div className="fiEyesUI-rotatingText-content"></div>
    </div>
  );
};
