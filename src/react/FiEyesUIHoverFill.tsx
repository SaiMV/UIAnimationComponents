import React, { useEffect, useRef, useState } from 'react';

export interface FiEyesUIHoverFillProps {
  text?: string;
  fontSize?: string;
  color?: string;
  hoverColor?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const FiEyesUIHoverFill: React.FC<FiEyesUIHoverFillProps> = ({
  text = "Welcome To Finches Eyes UI Components",
  fontSize = "24px",
  color = "#ffffff",
  hoverColor = "#ffffff",
  className = "",
  style = {},
  onClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const fiEyesUIContainer = containerRef.current;
    
    // Create styles dynamically
    const fiEyesUICreateStyles = () => {
      const fiEyesUIStyleId = 'fiEyesUI-hoverFill-styles';
      let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      const fiEyesUIStyle = document.createElement('style');
      fiEyesUIStyle.id = fiEyesUIStyleId;
      fiEyesUIStyle.textContent = `
        .fiEyesUI-hoverFill-container {
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
          text-align: center;
          margin: 0;
          padding: 20px;
          background-color: #000000;
          color: #ffffff;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .fiEyesUI-hoverFill-link {
          color: ${color};
          position: relative;
          display: inline-block;
          text-decoration: none;
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
          transition: color 0.3s;
          overflow: hidden;
          cursor: pointer;
        }
        
        .fiEyesUI-hoverFill-link-layer {
          position: absolute;
          left: 0;
          top: 0;
          height: inherit;
          overflow: hidden;
          transform: translate3d(-100%, 0, 0);
          animation: fiEyesUI-hoverFill-out-layer 0.3s ease-out;
        }
        
        .fiEyesUI-hoverFill-link-layer:before {
          content: attr(data-text);
          transform: translate3d(100%, 0, 0);
          color: ${hoverColor};
          animation: fiEyesUI-hoverFill-out-text 0.3s ease-out;
          display: block;
          backface-visibility: hidden;
        }
        
        .fiEyesUI-hoverFill-link:hover .fiEyesUI-hoverFill-link-layer {
          animation: fiEyesUI-hoverFill-in-layer 0.3s ease forwards;
        }
        
        .fiEyesUI-hoverFill-link:hover .fiEyesUI-hoverFill-link-layer:before {
          animation: fiEyesUI-hoverFill-in-text 0.3s ease forwards;
        }
        
        @keyframes fiEyesUI-hoverFill-in-text {
          0% {
            transform: translate3d(100%, 0, 0);
          }
          to {
            transform: translateZ(0);
          }
        }
        
        @keyframes fiEyesUI-hoverFill-in-layer {
          0% {
            transform: translate3d(-100%, 0, 0);
          }
          to {
            transform: translateZ(0);
          }
        }
        
        @keyframes fiEyesUI-hoverFill-out-text {
          0% {
            transform: translateZ(0);
          }
          to {
            transform: translate3d(-100%, 0, 0);
          }
        }
        
        @keyframes fiEyesUI-hoverFill-out-layer {
          0% {
            transform: translateZ(0);
          }
          to {
            transform: translate3d(100%, 0, 0);
          }
        }
      `;
      
      document.head.appendChild(fiEyesUIStyle);
    };

    // Initialize
    fiEyesUICreateStyles();

    return () => {
      const fiEyesUIStyleElement = document.getElementById('fiEyesUI-hoverFill-styles');
      if (fiEyesUIStyleElement) {
        fiEyesUIStyleElement.remove();
      }
    };
  }, [text, fontSize, color, hoverColor]);

  return (
    <div 
      ref={containerRef}
      className={`fiEyesUI-hoverFill-container ${className}`}
      style={style}
    >
      <a 
        href="#" 
        className="fiEyesUI-hoverFill-link"
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
      >
        {text}
        <span 
          className="fiEyesUI-hoverFill-link-layer" 
          data-text={text}
        ></span>
      </a>
    </div>
  );
};
