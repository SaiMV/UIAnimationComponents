import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUITitleRevealProps {
  title?: string;
  subtitle?: string;
  titleFontSize?: string;
  subtitleFontSize?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUITitleReveal: React.FC<FiEyesUITitleRevealProps> = ({
  title = "Welcome To Finches Eyes UI Components",
  subtitle = "Elegance is an attitude",
  titleFontSize = "calc(6vw + 1rem)",
  subtitleFontSize = "calc(0.4vw + 0.5rem)",
  animationDuration = 500,
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
      const fiEyesUIStyleId = 'fiEyesUI-titleReveal-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-titleReveal-container {
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
        
        .fiEyesUI-titleReveal-content {
          position: relative;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
          margin: 0;
        }
        
        .fiEyesUI-titleReveal-title {
          font-weight: 700;
          display: inline-flex;
          margin: -5px;
          padding: 5px;
        }
        
        .fiEyesUI-titleReveal-letter {
          font-size: ${titleFontSize};
          margin-left: -2px;
          opacity: 0;
        }
        
        .fiEyesUI-titleReveal-subtitle {
          font-weight: 400;
          font-size: ${subtitleFontSize};
          letter-spacing: calc(0.3vw + 0.5rem);
          text-transform: uppercase;
          position: relative;
          top: -5px;
          opacity: 0;
        }
        
        .fiEyesUI-titleReveal-letter-animate {
          animation: fiEyesUI-titleReveal-slide ${animationDuration}ms ease-in-quad forwards;
        }
        
        .fiEyesUI-titleReveal-letter-fade {
          animation: fiEyesUI-titleReveal-fade ${animationDuration}ms ease-in-quad forwards;
        }
        
        .fiEyesUI-titleReveal-subtitle-animate {
          animation: fiEyesUI-titleReveal-subtitle-fade 300ms ease-in-quad forwards;
        }
        
        @keyframes fiEyesUI-titleReveal-slide {
          from {
            transform: translateX(5px);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes fiEyesUI-titleReveal-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fiEyesUI-titleReveal-subtitle-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `;
      
      document.head.appendChild(fiEyesUIStyle);
    };

    // Initialize text with individual letters
    const fiEyesUIInitializeText = () => {
      if (!fiEyesUIContainer) return;
      
      const titleElement = fiEyesUIContainer.querySelector('.fiEyesUI-titleReveal-title');
      const subtitleElement = fiEyesUIContainer.querySelector('.fiEyesUI-titleReveal-subtitle');
      
      if (titleElement) {
        titleElement.innerHTML = '';
        const letters = title.split('');
        letters.forEach((letter, index) => {
          const span = document.createElement('span');
          span.className = 'fiEyesUI-titleReveal-letter';
          span.id = `fiEyesUI-title-letter-${index}`;
          span.textContent = letter === ' ' ? '\u00A0' : letter;
          titleElement.appendChild(span);
        });
      }
      
      if (subtitleElement) {
        subtitleElement.textContent = subtitle;
      }
    };

    // Start animation
    const fiEyesUIStartAnimation = () => {
      if (!fiEyesUIContainer) return;
      
      setIsAnimating(true);
      
      const letters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-titleReveal-letter');
      const subtitleElement = fiEyesUIContainer.querySelector('.fiEyesUI-titleReveal-subtitle');
      
      // Reset all elements
      letters.forEach(letter => {
        letter.classList.remove('fiEyesUI-titleReveal-letter-animate', 'fiEyesUI-titleReveal-letter-fade');
      });
      if (subtitleElement) {
        subtitleElement.classList.remove('fiEyesUI-titleReveal-subtitle-animate');
      }
      
      // Animate letters
      setTimeout(() => {
        letters.forEach((letter, index) => {
          setTimeout(() => {
            letter.classList.add('fiEyesUI-titleReveal-letter-animate');
          }, 50 * index);
          
          setTimeout(() => {
            letter.classList.add('fiEyesUI-titleReveal-letter-fade');
            
            if (index === letters.length - 1) {
              setTimeout(() => {
                if (subtitleElement) {
                  subtitleElement.classList.add('fiEyesUI-titleReveal-subtitle-animate');
                }
                setIsAnimating(false);
                onComplete?.();
              }, 60 * index + 100);
            }
          }, 60 * index);
        });
      }, 500);
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
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-titleReveal-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [title, subtitle, titleFontSize, subtitleFontSize, animationDuration, autoPlay, repeatInterval, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-titleReveal-container ${className}`}
      style={style}
    >
      <div className="fiEyesUI-titleReveal-content">
        <h1>
          <span className="fiEyesUI-titleReveal-title">
            {/* Letters will be dynamically inserted here */}
          </span>
          <br />
          <span className="fiEyesUI-titleReveal-subtitle">
            {/* Subtitle will be dynamically inserted here */}
          </span>
        </h1>
      </div>
    </div>
  );
};
