import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUITextScaleBounceProps {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUITextScaleBounce: React.FC<FiEyesUITextScaleBounceProps> = ({
  text = "Welcome To Finches Eyes UI Components",
  fontSize = "80px",
  animationDuration = 1500,
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
      const fiEyesUIStyleId = 'fiEyesUI-textScaleBounce-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-textScaleBounce-container {
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
        
        .fiEyesUI-textScaleBounce-content {
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
          font-weight: bolder;
          color: #ffffff;
          text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
          display: inline;
          margin: auto;
        }
        
        .fiEyesUI-textScaleBounce-animate {
          animation: fiEyesUI-textScaleBounce-rotate ${animationDuration}ms linear forwards;
        }
        
        @keyframes fiEyesUI-textScaleBounce-rotate {
          0% {
            transform: scale(0);
          }
          10% {
            font-size: ${fontSize};
            transform: scale(2);
          }
          20% {
            transform: scale(0.5);
          }
          40% {
            transform: scale(1.5);
          }
          60% {
            transform: scale(0.8);
          }
          80% {
            transform: scale(1.2);
          }
          100% {
            font-size: ${fontSize};
            transform: scale(1);
          }
        }
      `;
      
      document.head.appendChild(fiEyesUIStyle);
    };

    // Start animation
    const fiEyesUIStartAnimation = () => {
      if (!fiEyesUIContainer) return;
      
      setIsAnimating(true);
      
      const fiEyesUIContentElement = fiEyesUIContainer.querySelector('.fiEyesUI-textScaleBounce-content');
      if (fiEyesUIContentElement) {
        fiEyesUIContentElement.classList.add('fiEyesUI-textScaleBounce-animate');
        
        setTimeout(() => {
          fiEyesUIContentElement.classList.remove('fiEyesUI-textScaleBounce-animate');
          setIsAnimating(false);
          onComplete?.();
        }, animationDuration);
      }
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
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-textScaleBounce-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [text, fontSize, animationDuration, autoPlay, repeatInterval, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-textScaleBounce-container ${className}`}
      style={style}
    >
      <div className="fiEyesUI-textScaleBounce-content">
        {text}
      </div>
    </div>
  );
};
