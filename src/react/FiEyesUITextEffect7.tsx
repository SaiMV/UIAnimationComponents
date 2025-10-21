import React, { useEffect, useRef } from 'react';

export interface FiEyesUITextEffect7Props {
  text?: string;
  fontSize?: string;
  autoPlay?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const FiEyesUITextEffect7: React.FC<FiEyesUITextEffect7Props> = ({
  text = 'Welcome To Finches Eyes UI Components',
  fontSize = '3rem',
  autoPlay = true,
  onAnimationComplete,
  onAnimationStart,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const textElement = container.querySelector('.fiEyesUI-textEffect7-text');
    
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
          .fiEyesUI-textEffect7-container {
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
          
          .fiEyesUI-textEffect7-text {
            font-size: 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
            line-height: 1.2;
          }
          
          .fiEyesUI-textEffect7-text span {
            position: relative;
            color: #ffffff;
            pointer-events: none;
            animation: fiEyesUI-anim7 1s ease alternate infinite;
            animation-delay: calc(var(--delay) * 0.5);
          }
          
          @keyframes fiEyesUI-anim7 {
            0% {
              text-shadow: 0px 0px 0px #fff;
            }
            20% {
              text-shadow: 0px 0px 0px #fff;
            }
            100% {
              text-shadow: 0px 0px 50px #fff, 0px 0px 50px #fff, 0px 0px 50px #fff;
            }
          }
        `
      }} />
      <div
        ref={containerRef}
        className={`fiEyesUI-textEffect7-container ${className}`}
        style={{
          fontSize,
          ...style
        }}
      >
        <div className="fiEyesUI-textEffect7-text"></div>
      </div>
    </>
  );
};

export default FiEyesUITextEffect7;
