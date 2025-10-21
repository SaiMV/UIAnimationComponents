import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUICharacterGlowProps {
  text?: string;
  fontSize?: string;
  color?: string;
  glowColor?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUICharacterGlow: React.FC<FiEyesUICharacterGlowProps> = ({
  text = "Welcome To Finches Eyes UI Components",
  fontSize = "80px",
  color = "#ffffff",
  glowColor = "#00bbff",
  animationDuration = 2250,
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
      const fiEyesUIStyleId = 'fiEyesUI-characterGlow-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-characterGlow-container {
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
        
        .fiEyesUI-characterGlow-content {
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .fiEyesUI-characterGlow-character {
          display: block;
          float: left;
          animation: fiEyesUI-character-glow ${animationDuration}ms linear infinite;
          margin: 0 5px;
          padding: 0;
          position: relative;
          color: #111;
        }
        
        .fiEyesUI-characterGlow-character:nth-child(1) {
          animation-delay: 0s;
        }
        .fiEyesUI-characterGlow-character:nth-child(2) {
          animation-delay: 0.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(3) {
          animation-delay: 0.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(4) {
          animation-delay: 0.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(5) {
          animation-delay: 1s;
        }
        .fiEyesUI-characterGlow-character:nth-child(6) {
          animation-delay: 1.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(7) {
          animation-delay: 1.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(8) {
          animation-delay: 1.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(9) {
          animation-delay: 2s;
        }
        .fiEyesUI-characterGlow-character:nth-child(10) {
          animation-delay: 2.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(11) {
          animation-delay: 2.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(12) {
          animation-delay: 2.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(13) {
          animation-delay: 3s;
        }
        .fiEyesUI-characterGlow-character:nth-child(14) {
          animation-delay: 3.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(15) {
          animation-delay: 3.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(16) {
          animation-delay: 3.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(17) {
          animation-delay: 4s;
        }
        .fiEyesUI-characterGlow-character:nth-child(18) {
          animation-delay: 4.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(19) {
          animation-delay: 4.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(20) {
          animation-delay: 4.75s;
        }
        
        @keyframes fiEyesUI-character-glow {
          0%, 100% {
            color: ${color};
            filter: blur(2px);
            text-shadow: 0 0 10px ${glowColor},
              0 0 20px ${glowColor},
              0 0 40px ${glowColor},
              0 0 80px ${glowColor},
              0 0 120px ${glowColor},
              0 0 200px ${glowColor},
              0 0 300px ${glowColor},
              0 0 400px ${glowColor};
          }
          5%, 95% {
            color: #111;
            filter: blur(0px);
            text-shadow: none;
          }
        }
      `;
      
      document.head.appendChild(fiEyesUIStyle);
    };

    // Create character elements
    const fiEyesUICreateCharacters = () => {
      if (!fiEyesUIContainer) return;
      
      const fiEyesUIContentDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterGlow-content');
      if (!fiEyesUIContentDiv) return;
      
      fiEyesUIContentDiv.innerHTML = '';
      
      const fiEyesUICharacters = text.split('');
      fiEyesUICharacters.forEach((fiEyesUIChar) => {
        const fiEyesUICharacterSpan = document.createElement('span');
        fiEyesUICharacterSpan.className = 'fiEyesUI-characterGlow-character';
        fiEyesUICharacterSpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
        fiEyesUIContentDiv.appendChild(fiEyesUICharacterSpan);
      });
    };

    // Start animation
    const fiEyesUIStartAnimation = () => {
      if (!fiEyesUIContainer) return;
      
      setIsAnimating(true);
      fiEyesUICreateCharacters();
      
      // Calculate total animation time
      setTimeout(() => {
        setIsAnimating(false);
        onComplete?.();
      }, animationDuration);
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
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-characterGlow-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [text, color, glowColor, fontSize, animationDuration, autoPlay, repeatInterval, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-characterGlow-container ${className}`}
      style={style}
    >
      <div className="fiEyesUI-characterGlow-content"></div>
    </div>
  );
};
