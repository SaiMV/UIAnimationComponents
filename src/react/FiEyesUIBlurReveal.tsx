import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUIBlurRevealProps {
  text?: string;
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  letterDelay?: number;
  autoRepeat?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUIBlurReveal: React.FC<FiEyesUIBlurRevealProps> = ({
  text = "Welcome To Finches Eyes UI Components",
  fontSize = "32px",
  color = "#ffffff",
  animationDuration = 550,
  letterDelay = 35,
  autoRepeat = true,
  repeatInterval = 2000,
  className = "",
  style = {},
  onComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const fiEyesUIContainer = containerRef.current;
    const fiEyesUIText = text;
    const fiEyesUICharacters = fiEyesUIText.split('');
    
    // Clear container
    fiEyesUIContainer.innerHTML = '';
    
    // Create styles dynamically
    const fiEyesUICreateStyles = () => {
      const fiEyesUIStyleId = 'fiEyesUI-blurReveal-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-blurReveal-container {
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
        }
        
        .fiEyesUI-blurReveal-text {
          color: ${color};
          font-size: ${fontSize};
          text-align: center;
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
        }
        
        .fiEyesUI-blurReveal-text span {
          opacity: 0;
          transition: all ${animationDuration}ms ease;
          filter: blur(25px);
          transform: translateZ(0);
          display: inline-block;
        }
        
        .fiEyesUI-blurReveal-text.animate span {
          opacity: 1;
          filter: blur(0px);
        }
      `;
      
      // Add delay classes for each character
      fiEyesUICharacters.forEach((_, index) => {
        const delay = letterDelay * (index + 1);
        fiEyesUIStyle.textContent += `
          .fiEyesUI-blurReveal-text span:nth-child(${index + 1}) {
            transition-delay: ${delay}ms;
          }
        `;
      });
      
      document.head.appendChild(fiEyesUIStyle);
    };

    // Initialize animation
    const fiEyesUIInitializeAnimation = () => {
      fiEyesUICreateStyles();
      
      // Create spans for each character
      fiEyesUICharacters.forEach((fiEyesUIChar) => {
        const fiEyesUISpan = document.createElement('span');
        fiEyesUISpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
        fiEyesUIContainer.appendChild(fiEyesUISpan);
      });
      
      // Start animation
      fiEyesUIStartAnimation();
    };

    // Start animation function
    const fiEyesUIStartAnimation = () => {
      if (!fiEyesUIContainer) return;
      
      setIsAnimating(true);
      fiEyesUIContainer.classList.add('animate');
      
      // Calculate total animation time
      const totalTime = (fiEyesUICharacters.length * letterDelay) + animationDuration;
      
      setTimeout(() => {
        setIsAnimating(false);
        onComplete?.();
      }, totalTime);
    };

    // Auto repeat function
    const fiEyesUIStartAutoRepeat = () => {
      if (autoRepeat) {
        intervalRef.current = setInterval(() => {
          fiEyesUIContainer.classList.remove('animate');
          setTimeout(() => {
            fiEyesUIStartAnimation();
          }, 100);
        }, repeatInterval);
      }
    };

    fiEyesUIInitializeAnimation();
    fiEyesUIStartAutoRepeat();

    return () => {
      // Cleanup
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-blurReveal-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [text, color, fontSize, animationDuration, letterDelay, autoRepeat, repeatInterval, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-blurReveal-container ${className}`}
      style={{
        fontSize,
        ...style
      }}
    />
  );
};
