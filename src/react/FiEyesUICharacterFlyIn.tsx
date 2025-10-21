import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUICharacterFlyInProps {
  text?: string;
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  startDelay?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUICharacterFlyIn: React.FC<FiEyesUICharacterFlyInProps> = ({
  text = "Welcome To Finches Eyes UI Components",
  fontSize = "32px",
  color = "#ffffff",
  animationDuration = 2800,
  startDelay = 700,
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
      const fiEyesUIStyleId = 'fiEyesUI-characterFlyIn-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-characterFlyIn-container {
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
        
        .fiEyesUI-characterFlyIn-list {
          position: absolute;
          left: 50%;
          top: 50%;
          list-style: none;
          transform: translateX(-50%) translateY(-50%);
          margin: 0;
          padding: 0;
        }
        
        .fiEyesUI-characterFlyIn-character {
          display: inline-block;
          margin-right: 30px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 300;
          font-size: ${fontSize};
          color: ${color};
          opacity: 1;
          transition: all ${animationDuration}ms cubic-bezier(0.6, -.005, 0.32, 1.75);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character {
          opacity: 0;
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(1) {
          transform: translateX(150px) translateY(-170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(2) {
          transform: translateX(-210px) translateY(170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(3) {
          transform: translateX(20px) translateY(-100px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(4) {
          transform: translateX(-100px) translateY(-20px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(5) {
          transform: translateX(-70px) translateY(-200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(6) {
          transform: translateX(200px) translateY(70px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(7) {
          transform: translateX(30px) translateY(200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(8) {
          transform: translateX(30px) translateY(-100px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(9) {
          transform: translateX(100px) translateY(-170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(10) {
          transform: translateX(-100px) translateY(50px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(11) {
          transform: translateX(-550px) translateY(120px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(12) {
          transform: translateX(-40px) translateY(-50px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(13) {
          transform: translateX(150px) translateY(-170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(14) {
          transform: translateX(-210px) translateY(170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(15) {
          transform: translateX(20px) translateY(-100px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(16) {
          transform: translateX(-100px) translateY(-20px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(17) {
          transform: translateX(-70px) translateY(-200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(18) {
          transform: translateX(200px) translateY(70px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(19) {
          transform: translateX(30px) translateY(200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(20) {
          transform: translateX(30px) translateY(-100px);
        }
      `;
      
      document.head.appendChild(fiEyesUIStyle);
    };

    // Create character elements
    const fiEyesUICreateCharacters = () => {
      if (!fiEyesUIContainer) return;
      
      const fiEyesUIListDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterFlyIn-list');
      if (!fiEyesUIListDiv) return;
      
      fiEyesUIListDiv.innerHTML = '';
      
      const fiEyesUICharacters = text.split('');
      fiEyesUICharacters.forEach((fiEyesUIChar) => {
        const fiEyesUICharacterDiv = document.createElement('li');
        fiEyesUICharacterDiv.className = 'fiEyesUI-characterFlyIn-character';
        fiEyesUICharacterDiv.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
        fiEyesUIListDiv.appendChild(fiEyesUICharacterDiv);
      });
    };

    // Start animation
    const fiEyesUIStartAnimation = () => {
      if (!fiEyesUIContainer) return;
      
      setIsAnimating(true);
      fiEyesUICreateCharacters();
      
      const fiEyesUIListDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterFlyIn-list');
      if (!fiEyesUIListDiv) return;
      
      // Add hidden class initially
      fiEyesUIListDiv.classList.add('fiEyesUI-hidden');
      
      // Remove hidden class after delay to start animation
      setTimeout(() => {
        fiEyesUIListDiv.classList.remove('fiEyesUI-hidden');
        
        // Calculate total animation time
        const totalTime = startDelay + animationDuration;
        
        setTimeout(() => {
          setIsAnimating(false);
          onComplete?.();
        }, totalTime);
      }, startDelay);
    };

    // Initialize
    fiEyesUICreateStyles();
    fiEyesUICreateCharacters();
    
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
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-characterFlyIn-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [text, color, fontSize, animationDuration, startDelay, autoPlay, repeatInterval, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-characterFlyIn-container ${className}`}
      style={{
        fontSize,
        ...style
      }}
    >
      <ul className="fiEyesUI-characterFlyIn-list fiEyesUI-hidden"></ul>
    </div>
  );
};
