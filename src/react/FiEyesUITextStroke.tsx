import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUITextStrokeProps {
  text?: string;
  fontSize?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUITextStroke: React.FC<FiEyesUITextStrokeProps> = ({
  text = "Welcome To Finches Eyes UI Components",
  fontSize = "80px",
  strokeColor = "#8338ec",
  fillColor = "#c19bf5",
  strokeWidth = "2px",
  animationDuration = 4000,
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
      const fiEyesUIStyleId = 'fiEyesUI-textStroke-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-textStroke-container {
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
        
        .fiEyesUI-textStroke-content {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .fiEyesUI-textStroke-text {
          color: #ffffff;
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
          position: absolute;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
          margin: 0;
          padding: 0;
        }
        
        .fiEyesUI-textStroke-text:nth-child(1) {
          color: transparent;
          -webkit-text-stroke: ${strokeWidth} ${strokeColor};
          text-stroke: ${strokeWidth} ${strokeColor};
        }
        
        .fiEyesUI-textStroke-text:nth-child(2) {
          color: ${fillColor};
          animation: fiEyesUI-text-stroke-animate ${animationDuration}ms ease-in-out infinite;
        }
        
        @keyframes fiEyesUI-text-stroke-animate {
          0%, 100% {
            clip-path: polygon(
              0% 45%,
              16% 44%,
              33% 50%,
              54% 60%,
              70% 61%,
              84% 59%,
              100% 52%,
              100% 100%,
              0% 100%
            );
          }
          50% {
            clip-path: polygon(
              0% 60%,
              15% 65%,
              34% 66%,
              51% 62%,
              67% 50%,
              84% 45%,
              100% 46%,
              100% 100%,
              0% 100%
            );
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
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-textStroke-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [text, fontSize, strokeColor, fillColor, strokeWidth, animationDuration, autoPlay, repeatInterval, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-textStroke-container ${className}`}
      style={style}
    >
      <div className="fiEyesUI-textStroke-content">
        <h2 className="fiEyesUI-textStroke-text">{text}</h2>
        <h2 className="fiEyesUI-textStroke-text">{text}</h2>
      </div>
    </div>
  );
};
