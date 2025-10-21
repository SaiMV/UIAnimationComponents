import React, { useEffect, useRef } from 'react';

export interface FiEyesUITextEffect2Props {
  text?: string;
  fontSize?: string;
  autoPlay?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const FiEyesUITextEffect2: React.FC<FiEyesUITextEffect2Props> = ({
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
    const textElement = container.querySelector('.fiEyesUI-textEffect2-text');
    
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
          .fiEyesUI-textEffect2-container {
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
          
          .fiEyesUI-textEffect2-text {
            height: 2rem;
            overflow: hidden;
            perspective: 5000px;
            font-size: 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
            line-height: 1.2;
          }
          
          .fiEyesUI-textEffect2-text span {
            color: #ffffff;
            display: inline-block;
            transition: all 0.5s ease;
            position: relative;
          }
          
          .fiEyesUI-textEffect2-container:hover .fiEyesUI-textEffect2-text span {
            transform-style: preserve-3d;
            transform-origin: center;
            animation: fiEyesUI-anim2 1s linear;
            animation-delay: calc(var(--delay) * 0.2);
          }
          
          @keyframes fiEyesUI-anim2 {
            0% {
              transform: rotatex(0deg);
            }
            100% {
              transform: rotatex(360deg);
            }
          }
        `
      }} />
      <div
        ref={containerRef}
        className={`fiEyesUI-textEffect2-container ${className}`}
        style={{
          fontSize,
          ...style
        }}
      >
        <div className="fiEyesUI-textEffect2-text"></div>
      </div>
    </>
  );
};

export default FiEyesUITextEffect2;
