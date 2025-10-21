import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUIFlyInOutProps {
  text?: string;
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  animationSpeed?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const FiEyesUIFlyInOut: React.FC<FiEyesUIFlyInOutProps> = ({
  text = "Welcome To Finches Eyes UI Components",
  fontSize = "3em",
  color = "#ffffff",
  animationDuration = 4,
  animationSpeed = 100,
  className = "",
  style = {},
  onComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!paragraphRef.current) return;

    const fiEyesUIParagraph = paragraphRef.current;
    const fiEyesUIText = text;
    const fiEyesUICharacters = fiEyesUIText.length;
    let fiEyesUINewText = '';

    // Wrap each character in <i> tags
    for (let i = 0; i < fiEyesUICharacters; i += 1) {
      fiEyesUINewText += '<i>' + fiEyesUIText.charAt(i) + '</i>';
    }

    fiEyesUIParagraph.innerHTML = fiEyesUINewText;

    const fiEyesUIWrappedChars = fiEyesUIParagraph.getElementsByTagName('i');
    const fiEyesUIWrappedCharsLen = fiEyesUIWrappedChars.length;
    let j = 0;

    const fiEyesUIAddEffect = () => {
      setTimeout(() => {
        fiEyesUIWrappedChars[j].className = 'fiEyesUIFlyInOut';
        j += 1;
        if (j < fiEyesUIWrappedCharsLen) {
          fiEyesUIAddEffect();
        } else {
          // Animation completed
          setTimeout(() => {
            onComplete?.();
          }, animationDuration * 1000);
        }
      }, animationSpeed);
    };

    fiEyesUIAddEffect();

    return () => {
      // Cleanup
      if (fiEyesUIParagraph) {
        fiEyesUIParagraph.innerHTML = '';
      }
    };
  }, [text, animationDuration, animationSpeed, onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-flyInOut-container ${className}`}
      style={{
        fontFamily: "'Orbitron', sans-serif",
        margin: "0 auto",
        position: "relative",
        zIndex: 2,
        display: "table",
        width: "100%",
        backgroundColor: "#000000",
        color: "#ffffff",
        ...style
      }}
    >
      <div className="fiEyesUI-flyInOut-content">
        <p 
          ref={paragraphRef}
          className="fiEyesUI-flyInOut-typer"
          style={{
            display: "table",
            textAlign: "center",
            verticalAlign: "middle",
            margin: "0 auto",
            padding: "15% 0",
            fontSize,
            lineHeight: "3em",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color
          }}
        >
          {text}
        </p>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          .fiEyesUI-flyInOut-content {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }

          .fiEyesUI-flyInOut-typer i {
            display: inline-block;
            font-style: normal;
            padding: 0 0.25em;
            transform: scale(0);
            transition: all 1s ease;
          }

          .fiEyesUI-flyInOut-typer i.fiEyesUIFlyInOut {
            color: ${color};
            animation: fiEyesUIFlyInOut ${animationDuration}s infinite ease-in-out;
          }

          @keyframes fiEyesUIFlyInOut {
            0% {
              transform: scaleY(-3) translate3d(0, -300%, 0);
            }
            15%, 45% {
              color: rgba(255, 255, 255, 0.8);
              transform: scaleZ(1) translate3d(0, 10%, 0);
            }
            100% {
              color: rgba(236, 243, 186, 0.2);
              transform: scale3d(9);
            }
          }
        `
      }} />
    </div>
  );
};
