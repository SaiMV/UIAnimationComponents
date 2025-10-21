import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUITextScaleProps {
  text?: string;
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  animationDelay?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUITextScale: React.FC<FiEyesUITextScaleProps> = ({
  text = "Welcome To Finches Eyes UI Components",
  fontSize = "80px",
  color = "#ffffff",
  animationDuration = 1500,
  animationDelay = 0,
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
      const fiEyesUIStyleId = 'fiEyesUI-textScale-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-textScale-container {
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
        
        .fiEyesUI-textScale-appendText {
          text-align: center;
          padding: 34px;
          display: block;
          color: ${color};
          width: 100%;
        }
        
        .fiEyesUI-textScale-character {
          display: inline;
          font-weight: bolder;
          font-size: ${fontSize};
          margin: auto;
          text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
        }
        
        .fiEyesUI-textScale-character.fiEyesUI-animate {
          animation: fiEyesUI-rotate ${animationDuration}ms linear forwards;
        }
        
        @keyframes fiEyesUI-rotate {
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

    // Split text into characters
    const fiEyesUISplitText = () => {
      if (!fiEyesUIContainer) return;
      
      const fiEyesUIText = text;
      const fiEyesUILengthOfText = fiEyesUIText.length;
      const fiEyesUICharList = new Array(fiEyesUILengthOfText);
      
      for (let i = 0; i < fiEyesUILengthOfText; i++) {
        fiEyesUICharList[i] = fiEyesUIText.charAt(i);
      }
      
      const fiEyesUITargetDiv = fiEyesUIContainer.querySelector('.fiEyesUI-textScale-appendText');
      if (!fiEyesUITargetDiv) return;
      
      fiEyesUITargetDiv.innerHTML = '';
      
      for (let i = 0; i < fiEyesUILengthOfText; i++) {
        const fiEyesUIDiv = document.createElement('div');
        fiEyesUIDiv.classList.add(`fiEyesUI-ch-${i}`);
        fiEyesUIDiv.classList.add('fiEyesUI-textScale-character');
        fiEyesUIDiv.textContent = fiEyesUICharList[i];
        fiEyesUITargetDiv.appendChild(fiEyesUIDiv);
      }
    };

    // Animate text
    const fiEyesUIAnimateText = () => {
      if (!fiEyesUIContainer) return;
      
      setIsAnimating(true);
      fiEyesUISplitText();
      
      setTimeout(() => {
        const fiEyesUIItems = fiEyesUIContainer.querySelectorAll('.fiEyesUI-textScale-character');
        fiEyesUIItems.forEach((fiEyesUIItem) => {
          fiEyesUIItem.classList.add('fiEyesUI-animate');
        });
        
        setTimeout(() => {
          setIsAnimating(false);
          onComplete?.();
        }, animationDuration);
      }, animationDelay);
    };

    // Initialize
    fiEyesUICreateStyles();
    fiEyesUISplitText();
    
    if (autoPlay) {
      fiEyesUIAnimateText();
      
      // Set up interval for auto-repeat
      intervalRef.current = window.setInterval(() => {
        fiEyesUIAnimateText();
      }, repeatInterval) as unknown as number;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-textScale-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [text, color, fontSize, animationDuration, animationDelay, autoPlay, repeatInterval, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-textScale-container ${className}`}
      style={{
        fontSize,
        ...style
      }}
    >
      <div className="fiEyesUI-textScale-appendText"></div>
    </div>
  );
};
