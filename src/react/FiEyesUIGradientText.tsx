import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUIGradientTextProps {
  text?: string;
  fontSize?: string;
  gradientColors?: string[];
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUIGradientText: React.FC<FiEyesUIGradientTextProps> = ({
  text = "Welcome To Finches Eyes UI Components",
  fontSize = "80px",
  gradientColors = ["#231557", "#44107a", "#ff1361", "#fff800"],
  animationDuration = 2000,
  autoPlay = true,
  repeatInterval = 3000,
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
      const fiEyesUIStyleId = 'fiEyesUI-gradientText-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-gradientText-container {
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
        
        .fiEyesUI-gradientText-content {
          text-transform: uppercase;
          background-image: linear-gradient(
            -225deg,
            ${gradientColors[0]} 0%,
            ${gradientColors[1]} 29%,
            ${gradientColors[2]} 67%,
            ${gradientColors[3]} 100%
          );
          background-size: auto auto;
          background-clip: border-box;
          background-size: 200% auto;
          color: #fff;
          background-clip: text;
          text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fiEyesUI-textclip ${animationDuration}ms linear infinite;
          display: inline-block;
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
        }
        
        @keyframes fiEyesUI-textclip {
          to {
            background-position: 200% center;
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
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-gradientText-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [text, fontSize, gradientColors, animationDuration, autoPlay, repeatInterval, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-gradientText-container ${className}`}
      style={style}
    >
      <div className="fiEyesUI-gradientText-content">
        <h3>{text}</h3>
      </div>
    </div>
  );
};
