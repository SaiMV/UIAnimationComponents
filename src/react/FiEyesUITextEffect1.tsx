import React, { useEffect, useRef } from 'react';

export interface FiEyesUITextEffect1Props {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const FiEyesUITextEffect1: React.FC<FiEyesUITextEffect1Props> = ({
  text = 'Welcome To Finches Eyes UI Components',
  fontSize = '5rem',
  animationDuration = 2,
  autoPlay = true,
  repeatInterval = 0,
  onAnimationComplete,
  onAnimationStart,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const textElement = container.querySelector('.fiEyesUI-textEffect1-text');
    
    if (textElement) {
      textElement.innerHTML = '';
      const letters = text.split('');
      
      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.style.setProperty('--delay', `${index * 0.1}s`);
        span.style.setProperty('--duration', `${animationDuration}s`);
        textElement.appendChild(span);
      });
    }

    if (onAnimationStart) {
      onAnimationStart();
    }
  }, [text, animationDuration, onAnimationStart]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .fiEyesUI-textEffect1-container {
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
          }
          
          .fiEyesUI-textEffect1-text {
            font-size: 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
            line-height: 1.2;
          }
          
          .fiEyesUI-textEffect1-text span {
            display: inline-block;
            transform-style: preserve-3d;
            transform-origin: bottom;
            animation: fiEyesUI-anim1 var(--duration) linear infinite alternate;
            animation-delay: var(--delay);
            font-weight: bold;
            color: #000000;
            text-shadow: 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000;
          }
          
          @keyframes fiEyesUI-anim1 {
            0% {
              text-shadow: 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000;
              scale: 1 0;
            }
            100% {
              text-shadow: 0px 0px 2px #ffffff, 0px 0px 2px #ffffff, 0px 0px 2px #ffffff, 0px 0px 2px #ffffff;
              scale: 1 1;
            }
          }
        `
      }} />
      <div
        ref={containerRef}
        className={`fiEyesUI-textEffect1-container ${className}`}
        style={{
          fontSize,
          ...style
        }}
      >
        <div className="fiEyesUI-textEffect1-text"></div>
      </div>
    </>
  );
};

export default FiEyesUITextEffect1;
