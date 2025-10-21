import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUITextRevealProps {
  text1?: string;
  text2?: string;
  fontSize1?: string;
  fontSize2?: string;
  color1?: string;
  color2?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUITextReveal: React.FC<FiEyesUITextRevealProps> = ({
  text1 = "Welcome To",
  text2 = "Finches Eyes UI Components",
  fontSize1 = "60px",
  fontSize2 = "30px",
  color1 = "#ffffff",
  color2 = "#ffffff",
  animationDuration = 2500,
  autoPlay = true,
  repeatInterval = 4000,
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
      const fiEyesUIStyleId = 'fiEyesUI-textReveal-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-textReveal-container {
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
        
        .fiEyesUI-textReveal-content {
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }
        
        .fiEyesUI-textReveal-span {
          text-transform: uppercase;
          display: block;
        }
        
        .fiEyesUI-textReveal-text1 {
          color: ${color1};
          font-size: ${fontSize1};
          font-weight: 700;
          letter-spacing: 8px;
          margin-bottom: 20px;
          background: #000000;
          position: relative;
          animation: fiEyesUI-text-reveal ${animationDuration}ms 1;
        }
        
        .fiEyesUI-textReveal-text2 {
          font-size: ${fontSize2};
          color: ${color2};
        }
        
        @keyframes fiEyesUI-text-reveal {
          0% {
            color: #000000;
            margin-bottom: -40px;
          }
          30% {
            letter-spacing: 25px;
            margin-bottom: -40px;
          }
          100% {
            color: ${color1};
            letter-spacing: 8px;
            margin-bottom: 20px;
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
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-textReveal-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [text1, text2, color1, color2, fontSize1, fontSize2, animationDuration, autoPlay, repeatInterval, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-textReveal-container ${className}`}
      style={style}
    >
      <div className="fiEyesUI-textReveal-content">
        <span className="fiEyesUI-textReveal-span fiEyesUI-textReveal-text1">{text1}</span>
        <span className="fiEyesUI-textReveal-span fiEyesUI-textReveal-text2">{text2}</span>
      </div>
    </div>
  );
};
