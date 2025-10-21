import React, { useEffect, useRef } from 'react';

export interface FiEyesUITextEffect6Props {
  text?: string;
  fontSize?: string;
  autoPlay?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const FiEyesUITextEffect6: React.FC<FiEyesUITextEffect6Props> = ({
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
    const textElement = container.querySelector('.fiEyesUI-textEffect6-text');
    
    if (textElement) {
      textElement.innerHTML = '';
      const letters = text.split('');
      
      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.style.setProperty('--delay', `${index * 0.1}s`);
        span.style.setProperty('--index', index.toString());
        span.style.setProperty('--totalChars', letters.length.toString());
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
          .fiEyesUI-textEffect6-container {
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
          
          .fiEyesUI-textEffect6-text {
            font-size: 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
            line-height: 1.2;
          }
          
          .fiEyesUI-textEffect6-text span {
            position: relative;
            color: #ffffff;
            pointer-events: none;
            animation: fiEyesUI-anim6 linear both;
            animation-timeline: scroll();
            animation-range: entry calc((var(--index) * (100/var(--totalChars))) * 1%) cover 100%;
          }
          
          .fiEyesUI-textEffect6-container:hover .fiEyesUI-textEffect6-text span {
            animation: fiEyesUI-anim6 1s ease alternate infinite;
            animation-delay: calc(var(--delay) * 0.5);
          }
          
          @keyframes fiEyesUI-anim6 {
            0% {
              font-weight: 100;
            }
            20% {
              font-weight: 900;
            }
            100% {
              font-weight: 900;
            }
          }
        `
      }} />
      <div
        ref={containerRef}
        className={`fiEyesUI-textEffect6-container ${className}`}
        style={{
          fontSize,
          ...style
        }}
      >
        <div className="fiEyesUI-textEffect6-text"></div>
      </div>
    </>
  );
};

export default FiEyesUITextEffect6;
