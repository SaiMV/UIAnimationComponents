import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUITextDropProps {
  text?: string;
  fontSize?: string | null; // null means responsive sizing
  color?: string;
  secondaryColor?: string;
  animationDuration?: number;
  delayRange?: { min: number; max: number };
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUITextDrop: React.FC<FiEyesUITextDropProps> = ({
  text = "Welcome To Finches Eyes UI Components",
  fontSize = null, // Default to responsive sizing
  color = "#ffffff",
  secondaryColor = "#ffffff",
  animationDuration = 1.2,
  delayRange = { min: 1, max: 9 },
  className = "",
  style = {},
  onComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationIdRef = useRef<number>();

  // Responsive font sizing utility
  const calculateResponsiveFontSize = (container: HTMLElement, userFontSize: string | null) => {
    if (userFontSize) return userFontSize;
    
    const rect = container.getBoundingClientRect();
    const containerSize = Math.min(rect.width, rect.height);
    
    const minFontSize = 0.8;
    const maxFontSize = 4;
    const baseFontSize = 1.5;
    const minContainerSize = 120;
    const maxContainerSize = 600;
    const scalingFactor = 0.8;
    
    const normalizedSize = Math.max(0, Math.min(1, 
      (containerSize - minContainerSize) / (maxContainerSize - minContainerSize)
    ));
    
    const calculatedSize = baseFontSize + (normalizedSize * scalingFactor * (maxFontSize - baseFontSize));
    const finalSize = Math.max(minFontSize, Math.min(maxFontSize, calculatedSize));
    
    return `${finalSize}rem`;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const fiEyesUIContainer = containerRef.current;
    const fiEyesUIText = text;
    const fiEyesUICharacters = fiEyesUIText.split('');
    
    // Clear container
    fiEyesUIContainer.innerHTML = '';
    
    // Create styles dynamically
    const fiEyesUICreateStyles = () => {
      const fiEyesUIStyleId = 'fiEyesUI-textDrop-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const responsiveFontSize = calculateResponsiveFontSize(fiEyesUIContainer, fontSize);
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-textDrop-container {
          font-family: 'Orbitron', sans-serif;
          font-weight: 400;
          text-align: center;
          margin: 0;
          padding: 20px;
          font-size: ${responsiveFontSize};
          background-color: #000000;
          color: #ffffff;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
        
        .fiEyesUI-letterDrop {
          position: relative;
          top: 0;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.5em;
          opacity: 0.8;
          transform: rotateX(-90deg);
          animation: fiEyesUILetterDrop ${animationDuration}s ease 1 normal forwards;
        }
        
        .fiEyesUI-letterDrop.fiEyesUI-secondary {
          color: ${secondaryColor};
        }
        
        @keyframes fiEyesUILetterDrop {
          10% {
            opacity: 0.5;
          }
          20% {
            opacity: 0.8;
            top: 3.75em;
            transform: rotateX(-360deg);
          }
          100% {
            opacity: 1;
            top: 4.50em;
            transform: rotateX(360deg);
          }
        }
      `;
      
      // Add delay classes
      for (let i = delayRange.min; i <= delayRange.max; i++) {
        fiEyesUIStyle.textContent += `
          .fiEyesUI-ld${i} { 
            animation-delay: 1.${i}s; 
          }
        `;
      }
      
      document.head.appendChild(fiEyesUIStyle);
    };

    // Create random delay function
    const fiEyesUIRandomDelay = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Initialize animation
    const fiEyesUIInitializeAnimation = () => {
      fiEyesUICreateStyles();
      
      let fiEyesUICharacterIndex = 0;
      const fiEyesUIMaxDelay = Math.max(...Array.from({length: fiEyesUICharacters.length}, (_, i) => 
        fiEyesUIRandomDelay(delayRange.min, delayRange.max)
      ));
      
      fiEyesUICharacters.forEach((fiEyesUIChar, fiEyesUIIndex) => {
        const fiEyesUIDelay = fiEyesUIRandomDelay(delayRange.min, delayRange.max);
        const fiEyesUISpan = document.createElement('span');
        
        fiEyesUISpan.className = `fiEyesUI-letterDrop fiEyesUI-ld${fiEyesUIDelay}`;
        fiEyesUISpan.style.color = color;
        
        // Add secondary color to even characters
        if (fiEyesUIIndex % 2 === 1) {
          fiEyesUISpan.classList.add('fiEyesUI-secondary');
        }
        
        fiEyesUISpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
        fiEyesUIContainer.appendChild(fiEyesUISpan);
        
        // Track completion
        fiEyesUICharacterIndex++;
        if (fiEyesUICharacterIndex === fiEyesUICharacters.length) {
          const fiEyesUIMaxAnimationTime = (fiEyesUIMaxDelay / 10) * 1000 + (animationDuration * 1000);
          setTimeout(() => {
            setIsVisible(true);
            onComplete?.();
          }, fiEyesUIMaxAnimationTime);
        }
      });
    };

    fiEyesUIInitializeAnimation();

    return () => {
      // Cleanup
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-textDrop-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [text, color, secondaryColor, animationDuration, delayRange, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-textDrop-container ${className}`}
      style={{
        fontSize,
        ...style
      }}
    />
  );
};
