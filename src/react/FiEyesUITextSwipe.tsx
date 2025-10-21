import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUITextSwipeProps {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUITextSwipe: React.FC<FiEyesUITextSwipeProps> = ({
  text = "Welcome To Finches Eyes UI Components",
  fontSize = "48px",
  animationDuration = 1000,
  autoPlay = true,
  repeatInterval = 2000,
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
      const fiEyesUIStyleId = 'fiEyesUI-textSwipe-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-textSwipe-container {
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
        
        .fiEyesUI-textSwipe-content {
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
          color: rgba(255, 255, 255, 0.2);
          margin: auto;
        }
        
        .fiEyesUI-textSwipe-letter {
          display: inline-block;
          position: relative;
          transform-origin: 50% 50%;
          transition: all 0.5s ease;
        }
        
        .fiEyesUI-textSwipe-opaque {
          animation: fiEyesUI-textSwipe-opacity ${animationDuration}ms linear;
        }
        
        @keyframes fiEyesUI-textSwipe-opacity {
          0% {
            color: rgba(255, 255, 255, 0.2);
          }
          50% {
            color: rgba(255, 255, 255, 1);
          }
          100% {
            color: rgba(255, 255, 255, 0.2);
          }
        }
      `;
      
      document.head.appendChild(fiEyesUIStyle);
    };

    // Initialize text with individual letters
    const fiEyesUIInitializeText = () => {
      if (!fiEyesUIContainer) return;
      
      const fiEyesUIContentElement = fiEyesUIContainer.querySelector('.fiEyesUI-textSwipe-content');
      if (fiEyesUIContentElement) {
        fiEyesUIContentElement.innerHTML = '';
        
        const letters = text.split('');
        letters.forEach((letter, index) => {
          const span = document.createElement('span');
          span.className = 'fiEyesUI-textSwipe-letter';
          span.id = `fiEyesUI-letter-${index}`;
          span.textContent = letter;
          fiEyesUIContentElement.appendChild(span);
        });
      }
    };

    // Start animation
    const fiEyesUIStartAnimation = () => {
      if (!fiEyesUIContainer) return;
      
      setIsAnimating(true);
      
      const letters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-textSwipe-letter');
      const textLength = letters.length - 1;
      
      letters.forEach((element, index) => {
        setTimeout(() => {
          element.classList.toggle('fiEyesUI-textSwipe-opaque');
          
          if (index === textLength) {
            setTimeout(() => {
              setIsAnimating(false);
              onComplete?.();
            }, animationDuration);
          }
        }, (index + (textLength / 2)) * 10 * (100 / textLength));
      });
    };

    // Initialize
    fiEyesUICreateStyles();
    fiEyesUIInitializeText();
    
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
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-textSwipe-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [text, fontSize, animationDuration, autoPlay, repeatInterval, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-textSwipe-container ${className}`}
      style={style}
    >
      <div className="fiEyesUI-textSwipe-content">
        {/* Letters will be dynamically inserted here */}
      </div>
    </div>
  );
};
