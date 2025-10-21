import React, { useEffect, useRef } from 'react';

export interface FiEyesUISlideRevealProps {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  letterSpacing?: string;
  autoPlay?: boolean;
  repeatInterval?: number;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const FiEyesUISlideReveal: React.FC<FiEyesUISlideRevealProps> = ({
  text = 'Welcome To Finches Eyes UI Components',
  fontSize = '25px',
  animationDuration = 1.1,
  letterSpacing = '3px',
  autoPlay = true,
  repeatInterval = 0,
  onAnimationComplete,
  onAnimationStart,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const fiEyesUIStartSlideRevealAnimation = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const textElement = container.querySelector('.fiEyesUI-slideReveal-text');
    
    if (textElement) {
      // Reset animation
      textElement.classList.remove('fiEyesUI-slideReveal-animate');
      
      // Trigger animation
      setTimeout(() => {
        textElement.classList.add('fiEyesUI-slideReveal-animate');
      }, 10);
    }

    if (onAnimationStart) {
      onAnimationStart();
    }

    if (repeatInterval > 0) {
      animationRef.current = window.setTimeout(() => {
        fiEyesUIStartSlideRevealAnimation();
      }, repeatInterval * 1000);
    }
  };

  const fiEyesUIStopSlideRevealAnimation = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  };

  useEffect(() => {
    if (autoPlay) {
      fiEyesUIStartSlideRevealAnimation();
    }

    return () => {
      fiEyesUIStopSlideRevealAnimation();
    };
  }, [autoPlay, repeatInterval]);

  useEffect(() => {
    const handleAnimationEnd = () => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    };

    const textElement = containerRef.current?.querySelector('.fiEyesUI-slideReveal-text');
    textElement?.addEventListener('animationend', handleAnimationEnd);

    return () => {
      textElement?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [onAnimationComplete]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .fiEyesUI-slideReveal-container {
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Orbitron', sans-serif;
            background-color: #000000;
            color: #ffffff;
            height: 100%;
            font-size: ${fontSize};
            position: relative;
          }
          
          .fiEyesUI-slideReveal-title {
            position: relative;
            letter-spacing: ${letterSpacing};
            font-weight: 300;
            text-transform: uppercase;
            padding-right: 30px;
            overflow: hidden;
          }
          
          .fiEyesUI-slideReveal-text {
            margin: 0 auto;
            white-space: nowrap;
            transform: translateX(calc(100% + 30px));
            animation: fiEyesUI-leftSlide ${animationDuration}s cubic-bezier(0.68, -0.55, 0.265, 1.10) forwards;
          }
          
          .fiEyesUI-slideReveal-title::before {
            content: "";
            position: absolute;
            right: 0;
            height: 100%;
            background: #000000;
            animation: fiEyesUI-hiddingSlide ${animationDuration}s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
            z-index: 10;
          }
          
          .fiEyesUI-slideReveal-title::after {
            content: "";
            position: absolute;
            background: #ffffff;
            width: 75px;
            margin: auto 0;
            top: 5px;
            bottom: 0;
            height: 70%;
            animation: fiEyesUI-rightSlide ${animationDuration}s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
          }
          
          @keyframes fiEyesUI-leftSlide {
            0% {
              transform: translateX(calc(100% + 30px));
            }
            100% {
              transform: translateX(0%);
            }
          }
          
          @keyframes fiEyesUI-rightSlide {
            0% {
              right: 100%;
              width: 70px;
            }
            100% {
              opacity: 1;
              right: 0%;
              width: 24px;
            }
          }
          
          @keyframes fiEyesUI-hiddingSlide {
            0% {
              width: 100%;
            }
            100% {
              width: 0%;
            }
          }
        `
      }} />
      <div
        ref={containerRef}
        className={`fiEyesUI-slideReveal-container ${className}`}
        style={{
          fontSize,
          ...style
        }}
      >
        <h1 className="fiEyesUI-slideReveal-title">
          <div className="fiEyesUI-slideReveal-text">
            {text}
          </div>
        </h1>
      </div>
    </>
  );
};

export default FiEyesUISlideReveal;
