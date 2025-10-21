import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUIResizeEffectProps {
  text?: string;
  minFontSize?: string;
  maxFontSize?: string;
  minFontWeight?: number;
  maxFontWeight?: number;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUIResizeEffect: React.FC<FiEyesUIResizeEffectProps> = ({
  text = "Welcome To Finches Eyes UI Components",
  minFontSize = "20px",
  maxFontSize = "50px",
  minFontWeight = 100,
  maxFontWeight = 900,
  animationDuration = 5000,
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
      const fiEyesUIStyleId = 'fiEyesUI-resizeEffect-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-resizeEffect-container {
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
        
        .fiEyesUI-resizeEffect-content {
          font-size: ${minFontSize};
          font-weight: ${minFontWeight};
          font-family: 'Orbitron', sans-serif;
          animation: fiEyesUI-resize-anime ${animationDuration}ms infinite forwards;
          animation-direction: alternate;
          color: #ffffff;
        }
        
        @keyframes fiEyesUI-resize-anime {
          from {
            font-size: ${minFontSize};
            font-weight: ${minFontWeight};
            opacity: 0;
          } 
          to {
            font-size: ${maxFontSize};
            font-weight: ${maxFontWeight};
            text-shadow: 0px 0px 5px #ffffff;
            opacity: 1;
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
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-resizeEffect-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [text, minFontSize, maxFontSize, minFontWeight, maxFontWeight, animationDuration, autoPlay, repeatInterval, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-resizeEffect-container ${className}`}
      style={style}
    >
      <div className="fiEyesUI-resizeEffect-content">
        <h1>{text}</h1>
      </div>
    </div>
  );
};
