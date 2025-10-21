import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUITextEffect5Props {
  text?: string;
  fontSize?: string;
  autoPlay?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const FiEyesUITextEffect5: React.FC<FiEyesUITextEffect5Props> = ({
  text = 'Welcome To Finches Eyes UI Components',
  fontSize = '3rem',
  autoPlay = true,
  onAnimationComplete,
  onAnimationStart,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDisintegrated, setIsDisintegrated] = useState(false);

  const fiEyesUIDisintegrate = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const spans = container.querySelectorAll('.fiEyesUI-textEffect5-text span');
    
    spans.forEach((span, index) => {
      const element = span as HTMLElement;
      element.style.setProperty('--delay', `${index * 0.1}s`);
      element.style.setProperty('--duration', '1s');
      element.classList.add('fiEyesUI-disintegrate');
    });
    
    setIsDisintegrated(true);
    
    if (onAnimationComplete) {
      setTimeout(() => {
        onAnimationComplete();
      }, 1000);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const textElement = container.querySelector('.fiEyesUI-textEffect5-text');
    
    if (textElement) {
      textElement.innerHTML = '';
      const letters = text.split('');
      
      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.style.setProperty('--delay', `${index * 0.1}s`);
        textElement.appendChild(span);
      });
    }

    if (onAnimationStart) {
      onAnimationStart();
    }
  }, [text, onAnimationStart]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .fiEyesUI-textEffect5-container {
            font-family: 'Orbitron', sans-serif;
            background-color: #000000;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            padding: 10px;
            box-sizing: border-box;
            cursor: pointer;
          }
          
          .fiEyesUI-textEffect5-text {
            font-size: 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
            line-height: 1.2;
          }
          
          .fiEyesUI-textEffect5-text span {
            position: relative;
            color: #ffffff;
            pointer-events: none;
          }
          
          .fiEyesUI-disintegrate {
            animation: fiEyesUI-anim5 var(--duration, 1s) linear forwards;
            animation-delay: calc(var(--delay, 0) * 1s);
          }
          
          @keyframes fiEyesUI-anim5 {
            0% {
              filter: blur(0px);
            }
            10% {
              filter: blur(0px);
            }
            100% {
              filter: blur(500px);
            }
          }
        `
      }} />
      <div
        ref={containerRef}
        className={`fiEyesUI-textEffect5-container ${className}`}
        style={{
          fontSize,
          ...style
        }}
        onClick={fiEyesUIDisintegrate}
      >
        <div className="fiEyesUI-textEffect5-text"></div>
      </div>
    </>
  );
};

export default FiEyesUITextEffect5;
