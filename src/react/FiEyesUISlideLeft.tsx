import React, { useEffect, useRef } from 'react';

export interface FiEyesUISlideLeftProps {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  letterDelay?: number;
  slideDistance?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const FiEyesUISlideLeft: React.FC<FiEyesUISlideLeftProps> = ({
  text = 'Welcome To Finches Eyes UI Components',
  fontSize = '50px',
  animationDuration = 1.5,
  letterDelay = 0.1,
  slideDistance = 200,
  autoPlay = true,
  repeatInterval = 0,
  onAnimationComplete,
  onAnimationStart,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const fiEyesUIStartSlideLeftAnimation = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const spans = container.querySelectorAll('.fiEyesUI-slideLeft-span');
    
    spans.forEach((span, index) => {
      const element = span as HTMLElement;
      element.style.animationDelay = `${letterDelay * index}s`;
      element.style.animationDuration = `${animationDuration}s`;
    });

    if (onAnimationStart) {
      onAnimationStart();
    }

    if (repeatInterval > 0) {
      animationRef.current = window.setTimeout(() => {
        fiEyesUIStartSlideLeftAnimation();
      }, repeatInterval * 1000);
    }
  };

  const fiEyesUIStopSlideLeftAnimation = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  };

  useEffect(() => {
    if (autoPlay) {
      fiEyesUIStartSlideLeftAnimation();
    }

    return () => {
      fiEyesUIStopSlideLeftAnimation();
    };
  }, [autoPlay, repeatInterval]);

  useEffect(() => {
    const handleAnimationEnd = () => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    };

    const spans = containerRef.current?.querySelectorAll('.fiEyesUI-slideLeft-span');
    spans?.forEach(span => {
      span.addEventListener('animationend', handleAnimationEnd);
    });

    return () => {
      spans?.forEach(span => {
        span.removeEventListener('animationend', handleAnimationEnd);
      });
    };
  }, [onAnimationComplete]);

  const fiEyesUIRenderText = () => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="fiEyesUI-slideLeft-span"
        style={{
          animationDelay: `${letterDelay * index}s`,
          animationDuration: `${animationDuration}s`
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .fiEyesUI-slideLeft-container {
            display: flex;
            justify-content: center;
            align-content: center;
            flex-direction: column;
            height: 100%;
            width: 100%;
            background-color: #000000;
            color: #ffffff;
            font-family: 'Orbitron', sans-serif;
          }
          
          .fiEyesUI-slideLeft-title {
            text-align: center;
            text-transform: uppercase;
            font-family: 'Orbitron', sans-serif;
            font-size: ${fontSize};
            letter-spacing: 1px;
            color: #ffffff;
            margin: 0;
            padding: 0;
          }
          
          .fiEyesUI-slideLeft-span {
            display: inline-block;
            animation: fiEyesUI-slideLeft 1.5s forwards;
            opacity: 0;
            transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
            animation-delay: calc(0.1s * var(--i));
          }
          
          @keyframes fiEyesUI-slideLeft {
            from {
              opacity: 0;
              transform: translateX(${slideDistance}px);
            } 
            to {
              opacity: 1;
              transform: translateX(0%);
            }
          }
        `
      }} />
      <div
        ref={containerRef}
        className={`fiEyesUI-slideLeft-container ${className}`}
        style={{
          fontSize,
          ...style
        }}
      >
        <h1 className="fiEyesUI-slideLeft-title">
          {fiEyesUIRenderText()}
        </h1>
      </div>
    </>
  );
};

export default FiEyesUISlideLeft;
