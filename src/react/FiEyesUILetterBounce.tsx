import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUILetterBounceProps {
  text?: string;
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  letterDelay?: number;
  loop?: boolean;
  direction?: 'normal' | 'reverse' | 'alternate';
  easing?: string;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUILetterBounce: React.FC<FiEyesUILetterBounceProps> = ({
  text = "Welcome To Finches Eyes UI Components",
  fontSize = "4rem",
  color = "#ffffff",
  animationDuration = 800,
  letterDelay = 80,
  loop = true,
  direction = 'alternate',
  easing = 'easeInBounce',
  className = "",
  style = {},
  onComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const fiEyesUIContainer = containerRef.current;
    const fiEyesUIText = text;
    const fiEyesUICharacters = fiEyesUIText.split('');
    
    // Clear container
    fiEyesUIContainer.innerHTML = '';
    
    // Create styles dynamically
    const fiEyesUICreateStyles = () => {
      const fiEyesUIStyleId = 'fiEyesUI-letterBounce-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-letterBounce-container {
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
        
        .fiEyesUI-letterBounce-container:before {
          content: '';
          width: 100%;
          background: ${color};
          opacity: 0.3;
          bottom: 0;
          height: 1px;
          left: 0;
          position: absolute;
        }
        
        .fiEyesUI-letterBounce-name {
          display: flex;
          margin: auto;
          padding: 0 1rem 1rem;
          position: relative;
        }
        
        .fiEyesUI-letterBounce-letter {
          display: inline-block;
          opacity: 0;
          transform: scale(0.9);
          color: ${color};
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
        }
      `;
      
      document.head.appendChild(fiEyesUIStyle);
    };

    // Initialize animation
    const fiEyesUIInitializeAnimation = () => {
      fiEyesUICreateStyles();
      
      // Create name container
      const fiEyesUINameDiv = document.createElement('div');
      fiEyesUINameDiv.className = 'fiEyesUI-letterBounce-name';
      
      // Create letter divs for each character
      fiEyesUICharacters.forEach((fiEyesUIChar) => {
        const fiEyesUILetterDiv = document.createElement('div');
        fiEyesUILetterDiv.className = 'fiEyesUI-letterBounce-letter';
        fiEyesUILetterDiv.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
        fiEyesUINameDiv.appendChild(fiEyesUILetterDiv);
      });
      
      fiEyesUIContainer.appendChild(fiEyesUINameDiv);
      
      // Start animation
      fiEyesUIStartAnimation();
    };

    // Start animation function
    const fiEyesUIStartAnimation = () => {
      if (!fiEyesUIContainer) return;
      
      setIsAnimating(true);
      
      const fiEyesUILetters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-letterBounce-letter');
      
      // Animate each letter with delay
      fiEyesUILetters.forEach((fiEyesUILetter, fiEyesUIIndex) => {
        setTimeout(() => {
          fiEyesUILetter.style.opacity = '1';
          fiEyesUILetter.style.transform = 'scale(1)';
          fiEyesUILetter.style.transition = `all ${animationDuration}ms ${easing}`;
        }, fiEyesUIIndex * letterDelay);
      });
      
      // Calculate total animation time
      const totalTime = (fiEyesUICharacters.length * letterDelay) + animationDuration;
      
      setTimeout(() => {
        setIsAnimating(false);
        onComplete?.();
        
        // If loop is enabled, restart animation
        if (loop) {
          setTimeout(() => {
            fiEyesUIResetAndRestart();
          }, 1000);
        }
      }, totalTime);
    };

    // Reset and restart animation
    const fiEyesUIResetAndRestart = () => {
      const fiEyesUILetters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-letterBounce-letter');
      
      fiEyesUILetters.forEach((fiEyesUILetter) => {
        fiEyesUILetter.style.opacity = '0';
        fiEyesUILetter.style.transform = 'scale(0.9)';
      });
      
      setTimeout(() => {
        fiEyesUIStartAnimation();
      }, 100);
    };

    fiEyesUIInitializeAnimation();

    return () => {
      // Cleanup
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-letterBounce-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [text, color, fontSize, animationDuration, letterDelay, loop, direction, easing, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-letterBounce-container ${className}`}
      style={{
        fontSize,
        ...style
      }}
    />
  );
};
