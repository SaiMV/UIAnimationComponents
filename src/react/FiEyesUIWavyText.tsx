import React, { useEffect, useRef } from 'react';

export interface FiEyesUIWavyTextProps {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  waveHeight?: number;
  delayMultiplier?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const FiEyesUIWavyText: React.FC<FiEyesUIWavyTextProps> = ({
  text = 'Welcome To Finches Eyes UI Components',
  fontSize = '2em',
  animationDuration = 1.5,
  waveHeight = 20,
  delayMultiplier = 0.1,
  autoPlay = true,
  repeatInterval = 0,
  onAnimationComplete,
  onAnimationStart,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const fiEyesUIStartWavyAnimation = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const spans = container.querySelectorAll('.fiEyesUI-wavy-text-span');
    
    spans.forEach((span, index) => {
      const element = span as HTMLElement;
      element.style.setProperty('--i', index.toString());
      element.style.animationDelay = `${delayMultiplier * index}s`;
      element.style.animationDuration = `${animationDuration}s`;
    });

    if (onAnimationStart) {
      onAnimationStart();
    }

    if (repeatInterval > 0) {
      animationRef.current = window.setTimeout(() => {
        fiEyesUIStartWavyAnimation();
      }, repeatInterval * 1000);
    }
  };

  const fiEyesUIStopWavyAnimation = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  };

  useEffect(() => {
    if (autoPlay) {
      fiEyesUIStartWavyAnimation();
    }

    return () => {
      fiEyesUIStopWavyAnimation();
    };
  }, [autoPlay, repeatInterval]);

  useEffect(() => {
    const handleAnimationEnd = () => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    };

    const spans = containerRef.current?.querySelectorAll('.fiEyesUI-wavy-text-span');
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
        className="fiEyesUI-wavy-text-span"
        style={{
          '--i': index,
          animationDelay: `${delayMultiplier * index}s`,
          animationDuration: `${animationDuration}s`
        } as React.CSSProperties}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .fiEyesUI-wavy-text-container {
            position: relative;
            display: inline-block;
            background-color: #000000;
            color: #ffffff;
            font-family: 'Orbitron', sans-serif;
            font-size: ${fontSize};
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          
          .fiEyesUI-wavy-text-span {
            position: relative;
            display: inline-block;
            color: #ffffff;
            animation: fiEyesUI-wavy-animate ${animationDuration}s ease-in-out infinite;
            animation-delay: calc(${delayMultiplier}s * var(--i));
          }
          
          @keyframes fiEyesUI-wavy-animate {
            0%, 100% {
              transform: translateY(0px);
            }
            20% {
              transform: translateY(-${waveHeight}px);
            }
            40% {
              transform: translateY(0px);
            }
          }
        `
      }} />
      <div
        ref={containerRef}
        className={`fiEyesUI-wavy-text-container ${className}`}
        style={{
          fontSize,
          ...style
        }}
      >
        {fiEyesUIRenderText()}
      </div>
    </>
  );
};

export default FiEyesUIWavyText;
