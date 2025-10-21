import React, { useEffect, useRef } from 'react';

export interface FiEyesUITextEffect4Props {
  text?: string;
  fontSize?: string;
  autoPlay?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const FiEyesUITextEffect4: React.FC<FiEyesUITextEffect4Props> = ({
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
    const textElement = container.querySelector('.fiEyesUI-textEffect4-text');
    
    if (textElement) {
      textElement.innerHTML = '';
      const letters = text.split('');
      
      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.setAttribute('char', letter === ' ' ? '\u00A0' : letter);
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
          .fiEyesUI-textEffect4-container {
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
          
          .fiEyesUI-textEffect4-text {
            overflow: hidden;
            font-size: 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
            line-height: 1.2;
          }
          
          .fiEyesUI-textEffect4-text span {
            position: relative;
            font-weight: bold;
            color: #ffffff;
            display: inline-block;
          }
          
          .fiEyesUI-textEffect4-text span::after {
            position: absolute;
            left: 0;
            top: 100%;
            content: attr(char);
            color: #000000;
            text-shadow: 0px 0px 1px #fff, 0px 0px 1px #fff, 0px 0px 1px #fff, 0px 0px 1px #fff;
          }
          
          .fiEyesUI-textEffect4-container:hover .fiEyesUI-textEffect4-text span {
            animation: fiEyesUI-anim4 1s linear infinite;
            animation-delay: calc(var(--delay) * 0.5);
          }
          
          @keyframes fiEyesUI-anim4 {
            0% {
              filter: blur(0px);
              translate: 0 0;
            }
            100% {
              filter: blur(10px);
              translate: 0 -100%;
            }
          }
        `
      }} />
      <div
        ref={containerRef}
        className={`fiEyesUI-textEffect4-container ${className}`}
        style={{
          fontSize,
          ...style
        }}
      >
        <div className="fiEyesUI-textEffect4-text"></div>
      </div>
    </>
  );
};

export default FiEyesUITextEffect4;
