import React, { useEffect, useRef } from 'react';

export interface FiEyesUITextEffect3Props {
  text?: string;
  fontSize?: string;
  autoPlay?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const FiEyesUITextEffect3: React.FC<FiEyesUITextEffect3Props> = ({
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
    const textElement = container.querySelector('.fiEyesUI-textEffect3-text');
    
    if (textElement) {
      textElement.innerHTML = '';
      const letters = text.split('');
      
      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
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
          .fiEyesUI-textEffect3-container {
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
          
          .fiEyesUI-textEffect3-text {
            font-size: 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
            line-height: 1.2;
          }
          
          .fiEyesUI-textEffect3-text span {
            background: linear-gradient(90deg, rgba(249,249,249,1) 50%, rgba(2,0,36,0) 50%);
            background-size: 250%;
            animation: fiEyesUI-anim3 linear both;
            animation-timeline: view();
            animation-range: entry 50% cover 50%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: bold;
            color: #000000;
          }
          
          @keyframes fiEyesUI-anim3 {
            0% {
              background-position: 100%;
            }
            100% {
              background-position: 0%;
            }
          }
        `
      }} />
      <div
        ref={containerRef}
        className={`fiEyesUI-textEffect3-container ${className}`}
        style={{
          fontSize,
          ...style
        }}
      >
        <div className="fiEyesUI-textEffect3-text"></div>
      </div>
    </>
  );
};

export default FiEyesUITextEffect3;
