(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react/jsx-runtime'), require('@angular/core'), require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'react/jsx-runtime', '@angular/core', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FinchesEyeAnimation = {}, global.React, global.jsxRuntime, global.ng, global.Vue));
})(this, (function (exports, React, jsxRuntime, core, vue) { 'use strict';

    class FiEyesUIAnimationEngine {
        constructor() {
            this.animations = new Map();
        }
        createAnimation(options) {
            const { element, keyframes, config, onStart, onEnd, onIteration } = options;
            // Convert keyframes to the format expected by Web Animations API
            const processedKeyframes = this.processKeyframes(keyframes);
            const animation = element.animate(processedKeyframes, {
                duration: config.duration,
                delay: config.delay || 0,
                easing: config.easing || 'ease',
                iterations: config.iterations === 'infinite' ? Infinity : (config.iterations || 1),
                direction: config.direction || 'normal',
                fill: config.fillMode || 'both',
            });
            this.animations.set(element, animation);
            // Set up event listeners
            if (onStart) {
                animation.addEventListener('start', onStart);
            }
            if (onEnd) {
                animation.addEventListener('finish', onEnd);
            }
            if (onIteration) {
                animation.addEventListener('iteration', onIteration);
            }
            return {
                play: () => animation.play(),
                pause: () => animation.pause(),
                reverse: () => animation.reverse(),
                finish: () => animation.finish(),
                cancel: () => {
                    animation.cancel();
                    this.animations.delete(element);
                },
                addEventListener: (event, callback) => {
                    animation.addEventListener(event, callback);
                },
                removeEventListener: (event, callback) => {
                    animation.removeEventListener(event, callback);
                },
            };
        }
        processKeyframes(keyframes) {
            return keyframes.map(keyframe => {
                const processed = {};
                for (const [property, value] of Object.entries(keyframe)) {
                    if (property === 'offset') {
                        processed.offset = value;
                    }
                    else {
                        processed[property] = value;
                    }
                }
                return processed;
            });
        }
        getAnimation(element) {
            return this.animations.get(element);
        }
        pauseAll() {
            this.animations.forEach(animation => animation.pause());
        }
        resumeAll() {
            this.animations.forEach(animation => animation.play());
        }
        cancelAll() {
            this.animations.forEach(animation => animation.cancel());
            this.animations.clear();
        }
        cancelAnimation(element) {
            const animation = this.animations.get(element);
            if (animation) {
                animation.cancel();
                this.animations.delete(element);
            }
        }
    }
    const fiEyesUIAnimationEngine = new FiEyesUIAnimationEngine();

    const fiEyesUIPresetAnimations = [
        {
            name: 'fadeIn',
            keyframes: [
                { opacity: 0 },
                { opacity: 1 }
            ],
            defaultConfig: {
                duration: 300,
                easing: 'ease-out'
            }
        },
        {
            name: 'fadeOut',
            keyframes: [
                { opacity: 1 },
                { opacity: 0 }
            ],
            defaultConfig: {
                duration: 300,
                easing: 'ease-in'
            }
        },
        {
            name: 'slideInUp',
            keyframes: [
                { transform: 'translateY(100%)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 }
            ],
            defaultConfig: {
                duration: 400,
                easing: 'ease-out'
            }
        },
        {
            name: 'slideInDown',
            keyframes: [
                { transform: 'translateY(-100%)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 }
            ],
            defaultConfig: {
                duration: 400,
                easing: 'ease-out'
            }
        },
        {
            name: 'slideInLeft',
            keyframes: [
                { transform: 'translateX(-100%)', opacity: 0 },
                { transform: 'translateX(0)', opacity: 1 }
            ],
            defaultConfig: {
                duration: 400,
                easing: 'ease-out'
            }
        },
        {
            name: 'slideInRight',
            keyframes: [
                { transform: 'translateX(100%)', opacity: 0 },
                { transform: 'translateX(0)', opacity: 1 }
            ],
            defaultConfig: {
                duration: 400,
                easing: 'ease-out'
            }
        },
        {
            name: 'zoomIn',
            keyframes: [
                { transform: 'scale(0)', opacity: 0 },
                { transform: 'scale(1)', opacity: 1 }
            ],
            defaultConfig: {
                duration: 300,
                easing: 'ease-out'
            }
        },
        {
            name: 'zoomOut',
            keyframes: [
                { transform: 'scale(1)', opacity: 1 },
                { transform: 'scale(0)', opacity: 0 }
            ],
            defaultConfig: {
                duration: 300,
                easing: 'ease-in'
            }
        },
        {
            name: 'bounce',
            keyframes: [
                { transform: 'translateY(0)' },
                { transform: 'translateY(-30px)' },
                { transform: 'translateY(0)' },
                { transform: 'translateY(-15px)' },
                { transform: 'translateY(0)' },
                { transform: 'translateY(-5px)' },
                { transform: 'translateY(0)' }
            ],
            defaultConfig: {
                duration: 1000,
                easing: 'ease-out'
            }
        },
        {
            name: 'shake',
            keyframes: [
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-5px)' },
                { transform: 'translateX(5px)' },
                { transform: 'translateX(0)' }
            ],
            defaultConfig: {
                duration: 500,
                easing: 'ease-in-out'
            }
        },
        {
            name: 'pulse',
            keyframes: [
                { transform: 'scale(1)' },
                { transform: 'scale(1.05)' },
                { transform: 'scale(1)' }
            ],
            defaultConfig: {
                duration: 1000,
                iterations: 'infinite',
                easing: 'ease-in-out'
            }
        },
        {
            name: 'rotate',
            keyframes: [
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(360deg)' }
            ],
            defaultConfig: {
                duration: 1000,
                iterations: 'infinite',
                easing: 'linear'
            }
        }
    ];
    const getFiEyesUIPresetAnimation = (name) => {
        return fiEyesUIPresetAnimations.find(animation => animation.name === name);
    };

    const fiEyesUIEasingFunctions = {
        linear: 'linear',
        ease: 'ease',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
        // Custom cubic-bezier functions
        easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
        easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
        easeInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
        easeInSine: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
        easeInExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        easeInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.34)',
        easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
        easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
        easeOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
        easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
        easeOutCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
        easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
        easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        easeInOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
        easeInOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',
        easeInOutSine: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
        easeInOutExpo: 'cubic-bezier(1, 0, 0, 1)',
        easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
        easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    };

    const useFiEyesUIAnimation = (options = {}) => {
        const { keyframes = [], config = {}, preset, autoPlay = false, onStart, onEnd, onIteration, } = options;
        const ref = React.useRef(null);
        React.useRef(null);
        const [isPlaying, setIsPlaying] = React.useState(false);
        const [isPaused, setIsPaused] = React.useState(false);
        const [isFinished, setIsFinished] = React.useState(false);
        const createAnimation = React.useCallback(() => {
            if (!ref.current)
                return;
            let finalKeyframes = keyframes;
            let finalConfig = { ...config };
            // Use preset if provided
            if (preset) {
                const presetAnimation = getFiEyesUIPresetAnimation(preset);
                if (presetAnimation) {
                    finalKeyframes = presetAnimation.keyframes;
                    finalConfig = { ...presetAnimation.defaultConfig, ...config };
                }
            }
            if (finalKeyframes.length === 0)
                return;
            const animationOptions = {
                element: ref.current,
                keyframes: finalKeyframes,
                config: finalConfig,
                onStart: () => {
                    setIsPlaying(true);
                    setIsPaused(false);
                    setIsFinished(false);
                    onStart?.();
                },
                onEnd: () => {
                    setIsPlaying(false);
                    setIsPaused(false);
                    setIsFinished(true);
                    onEnd?.();
                },
                onIteration: () => {
                    onIteration?.();
                },
            };
            fiEyesUIAnimationRef.current = fiEyesUIAnimationEngine.createAnimation(animationOptions);
        }, [keyframes, config, preset, onStart, onEnd, onIteration]);
        const play = React.useCallback(() => {
            if (fiEyesUIAnimationRef.current) {
                fiEyesUIAnimationRef.current.play();
            }
            else {
                createAnimation();
                if (fiEyesUIAnimationRef.current) {
                    fiEyesUIAnimationRef.current.play();
                }
            }
        }, [createAnimation]);
        const pause = React.useCallback(() => {
            fiEyesUIAnimationRef.current?.pause();
            setIsPlaying(false);
            setIsPaused(true);
        }, []);
        const reverse = React.useCallback(() => {
            fiEyesUIAnimationRef.current?.reverse();
        }, []);
        const finish = React.useCallback(() => {
            fiEyesUIAnimationRef.current?.finish();
            setIsPlaying(false);
            setIsPaused(false);
            setIsFinished(true);
        }, []);
        const cancel = React.useCallback(() => {
            fiEyesUIAnimationRef.current?.cancel();
            fiEyesUIAnimationRef.current = null;
            setIsPlaying(false);
            setIsPaused(false);
            setIsFinished(false);
        }, []);
        // Auto-play effect
        React.useEffect(() => {
            if (autoPlay && ref.current) {
                createAnimation();
                play();
            }
        }, [autoPlay, createAnimation, play]);
        // Cleanup on unmount
        React.useEffect(() => {
            return () => {
                if (ref.current) {
                    fiEyesUIAnimationEngine.cancelAnimation(ref.current);
                }
            };
        }, []);
        return {
            ref,
            play,
            pause,
            reverse,
            finish,
            cancel,
            isPlaying,
            isPaused,
            isFinished,
        };
    };

    const FiEyesUIAnimatedComponent = React.forwardRef(({ children, className, style, as: Component = 'div', ...animationOptions }, ref) => {
        const animation = useFiEyesUIAnimation(animationOptions);
        const elementRef = React.useRef(null);
        React.useImperativeHandle(ref, () => ({
            play: animation.play,
            pause: animation.pause,
            reverse: animation.reverse,
            finish: animation.finish,
            cancel: animation.cancel,
            isPlaying: animation.isPlaying,
            isPaused: animation.isPaused,
            isFinished: animation.isFinished,
        }), [animation]);
        // Merge refs
        const combinedRef = (node) => {
            if (elementRef.current !== node) {
                elementRef.current = node;
            }
            if (typeof animation.ref === 'object' && animation.ref) {
                const ref = animation.ref;
                if (ref.current !== node) {
                    ref.current = node;
                }
            }
        };
        return React.createElement(Component, {
            ref: combinedRef,
            className,
            style,
        }, children);
    });
    FiEyesUIAnimatedComponent.displayName = 'FiEyesUIAnimatedComponent';

    const FiEyesUITextDrop = ({ text = "Welcome To Finches Eyes UI Components", fontSize = "3em", color = "#ffffff", secondaryColor = "#ffffff", animationDuration = 1.2, delayRange = { min: 1, max: 9 }, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isVisible, setIsVisible] = React.useState(false);
        React.useRef();
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            const fiEyesUIText = text;
            const fiEyesUICharacters = fiEyesUIText.split('');
            // Clear container
            fiEyesUIContainer.innerHTML = '';
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-textDrop-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-textDrop-container {
          font-family: 'Orbitron', sans-serif;
          font-weight: 400;
          text-align: center;
          margin: 0;
          padding: 20px;
          background-color: #000000;
          color: #ffffff;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .fiEyesUI-letterDrop {
          position: relative;
          top: 0;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.5em;
          opacity: 0.8;
          transform: rotateX(-90deg);
          animation: fiEyesUILetterDrop ${animationDuration}s ease 1 normal forwards;
        }
        
        .fiEyesUI-letterDrop.fiEyesUI-secondary {
          color: ${secondaryColor};
        }
        
        @keyframes fiEyesUILetterDrop {
          10% {
            opacity: 0.5;
          }
          20% {
            opacity: 0.8;
            top: 3.75em;
            transform: rotateX(-360deg);
          }
          100% {
            opacity: 1;
            top: 4.50em;
            transform: rotateX(360deg);
          }
        }
      `;
                // Add delay classes
                for (let i = delayRange.min; i <= delayRange.max; i++) {
                    fiEyesUIStyle.textContent += `
          .fiEyesUI-ld${i} { 
            animation-delay: 1.${i}s; 
          }
        `;
                }
                document.head.appendChild(fiEyesUIStyle);
            };
            // Create random delay function
            const fiEyesUIRandomDelay = (min, max) => {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };
            // Initialize animation
            const fiEyesUIInitializeAnimation = () => {
                fiEyesUICreateStyles();
                let fiEyesUICharacterIndex = 0;
                const fiEyesUIMaxDelay = Math.max(...Array.from({ length: fiEyesUICharacters.length }, (_, i) => fiEyesUIRandomDelay(delayRange.min, delayRange.max)));
                fiEyesUICharacters.forEach((fiEyesUIChar, fiEyesUIIndex) => {
                    const fiEyesUIDelay = fiEyesUIRandomDelay(delayRange.min, delayRange.max);
                    const fiEyesUISpan = document.createElement('span');
                    fiEyesUISpan.className = `fiEyesUI-letterDrop fiEyesUI-ld${fiEyesUIDelay}`;
                    fiEyesUISpan.style.color = color;
                    // Add secondary color to even characters
                    if (fiEyesUIIndex % 2 === 1) {
                        fiEyesUISpan.classList.add('fiEyesUI-secondary');
                    }
                    fiEyesUISpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
                    fiEyesUIContainer.appendChild(fiEyesUISpan);
                    // Track completion
                    fiEyesUICharacterIndex++;
                    if (fiEyesUICharacterIndex === fiEyesUICharacters.length) {
                        const fiEyesUIMaxAnimationTime = (fiEyesUIMaxDelay / 10) * 1000 + (animationDuration * 1000);
                        setTimeout(() => {
                            setIsVisible(true);
                            onComplete?.();
                        }, fiEyesUIMaxAnimationTime);
                    }
                });
            };
            fiEyesUIInitializeAnimation();
            return () => {
                // Cleanup
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-textDrop-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [text, color, secondaryColor, animationDuration, delayRange, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textDrop-container ${className}`, style: {
                fontSize,
                ...style
            } }));
    };

    const FiEyesUIFlyInOut = ({ text = "Welcome To Finches Eyes UI Components", fontSize = "3em", color = "#ffffff", animationDuration = 4, animationSpeed = 100, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const paragraphRef = React.useRef(null);
        const [isVisible, setIsVisible] = React.useState(true);
        React.useEffect(() => {
            if (!paragraphRef.current)
                return;
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
                    }
                    else {
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
        return (jsxRuntime.jsxs("div", { ref: containerRef, className: `fiEyesUI-flyInOut-container ${className}`, style: {
                fontFamily: "'Orbitron', sans-serif",
                margin: "0 auto",
                position: "relative",
                zIndex: 2,
                display: "table",
                width: "100%",
                backgroundColor: "#000000",
                color: "#ffffff",
                ...style
            }, children: [jsxRuntime.jsx("div", { className: "fiEyesUI-flyInOut-content", children: jsxRuntime.jsx("p", { ref: paragraphRef, className: "fiEyesUI-flyInOut-typer", style: {
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
                        }, children: text }) }), jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
                    } })] }));
    };

    const FiEyesUIBlurReveal = ({ text = "Welcome To Finches Eyes UI Components", fontSize = "32px", color = "#ffffff", animationDuration = 550, letterDelay = 35, autoRepeat = true, repeatInterval = 2000, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isAnimating, setIsAnimating] = React.useState(false);
        const intervalRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            const fiEyesUIText = text;
            const fiEyesUICharacters = fiEyesUIText.split('');
            // Clear container
            fiEyesUIContainer.innerHTML = '';
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-blurReveal-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-blurReveal-container {
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
        }
        
        .fiEyesUI-blurReveal-text {
          color: ${color};
          font-size: ${fontSize};
          text-align: center;
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
        }
        
        .fiEyesUI-blurReveal-text span {
          opacity: 0;
          transition: all ${animationDuration}ms ease;
          filter: blur(25px);
          transform: translateZ(0);
          display: inline-block;
        }
        
        .fiEyesUI-blurReveal-text.animate span {
          opacity: 1;
          filter: blur(0px);
        }
      `;
                // Add delay classes for each character
                fiEyesUICharacters.forEach((_, index) => {
                    const delay = letterDelay * (index + 1);
                    fiEyesUIStyle.textContent += `
          .fiEyesUI-blurReveal-text span:nth-child(${index + 1}) {
            transition-delay: ${delay}ms;
          }
        `;
                });
                document.head.appendChild(fiEyesUIStyle);
            };
            // Initialize animation
            const fiEyesUIInitializeAnimation = () => {
                fiEyesUICreateStyles();
                // Create spans for each character
                fiEyesUICharacters.forEach((fiEyesUIChar) => {
                    const fiEyesUISpan = document.createElement('span');
                    fiEyesUISpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
                    fiEyesUIContainer.appendChild(fiEyesUISpan);
                });
                // Start animation
                fiEyesUIStartAnimation();
            };
            // Start animation function
            const fiEyesUIStartAnimation = () => {
                if (!fiEyesUIContainer)
                    return;
                setIsAnimating(true);
                fiEyesUIContainer.classList.add('animate');
                // Calculate total animation time
                const totalTime = (fiEyesUICharacters.length * letterDelay) + animationDuration;
                setTimeout(() => {
                    setIsAnimating(false);
                    onComplete?.();
                }, totalTime);
            };
            // Auto repeat function
            const fiEyesUIStartAutoRepeat = () => {
                if (autoRepeat) {
                    intervalRef.current = setInterval(() => {
                        fiEyesUIContainer.classList.remove('animate');
                        setTimeout(() => {
                            fiEyesUIStartAnimation();
                        }, 100);
                    }, repeatInterval);
                }
            };
            fiEyesUIInitializeAnimation();
            fiEyesUIStartAutoRepeat();
            return () => {
                // Cleanup
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-blurReveal-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [text, color, fontSize, animationDuration, letterDelay, autoRepeat, repeatInterval, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-blurReveal-container ${className}`, style: {
                fontSize,
                ...style
            } }));
    };

    const FiEyesUILetterBounce = ({ text = "Welcome To Finches Eyes UI Components", fontSize = "4rem", color = "#ffffff", animationDuration = 800, letterDelay = 80, loop = true, direction = 'alternate', easing = 'easeInBounce', className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isAnimating, setIsAnimating] = React.useState(false);
        React.useRef();
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            const fiEyesUIText = text;
            const fiEyesUICharacters = fiEyesUIText.split('');
            // Clear container
            fiEyesUIContainer.innerHTML = '';
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-letterBounce-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-letterBounce-container {
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
        
        .fiEyesUI-letterBounce-container:before {
          content: '';
          width: 100%;
          background: ${color};
          opacity: 0.3;
          bottom: 0;
          height: 1px;
          left: 0;
          position: absolute;
        }
        
        .fiEyesUI-letterBounce-name {
          display: flex;
          margin: auto;
          padding: 0 1rem 1rem;
          position: relative;
        }
        
        .fiEyesUI-letterBounce-letter {
          display: inline-block;
          opacity: 0;
          transform: scale(0.9);
          color: ${color};
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
        }
      `;
                document.head.appendChild(fiEyesUIStyle);
            };
            // Initialize animation
            const fiEyesUIInitializeAnimation = () => {
                fiEyesUICreateStyles();
                // Create name container
                const fiEyesUINameDiv = document.createElement('div');
                fiEyesUINameDiv.className = 'fiEyesUI-letterBounce-name';
                // Create letter divs for each character
                fiEyesUICharacters.forEach((fiEyesUIChar) => {
                    const fiEyesUILetterDiv = document.createElement('div');
                    fiEyesUILetterDiv.className = 'fiEyesUI-letterBounce-letter';
                    fiEyesUILetterDiv.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
                    fiEyesUINameDiv.appendChild(fiEyesUILetterDiv);
                });
                fiEyesUIContainer.appendChild(fiEyesUINameDiv);
                // Start animation
                fiEyesUIStartAnimation();
            };
            // Start animation function
            const fiEyesUIStartAnimation = () => {
                if (!fiEyesUIContainer)
                    return;
                setIsAnimating(true);
                const fiEyesUILetters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-letterBounce-letter');
                // Animate each letter with delay
                fiEyesUILetters.forEach((fiEyesUILetter, fiEyesUIIndex) => {
                    setTimeout(() => {
                        fiEyesUILetter.style.opacity = '1';
                        fiEyesUILetter.style.transform = 'scale(1)';
                        fiEyesUILetter.style.transition = `all ${animationDuration}ms ${easing}`;
                    }, fiEyesUIIndex * letterDelay);
                });
                // Calculate total animation time
                const totalTime = (fiEyesUICharacters.length * letterDelay) + animationDuration;
                setTimeout(() => {
                    setIsAnimating(false);
                    onComplete?.();
                    // If loop is enabled, restart animation
                    if (loop) {
                        setTimeout(() => {
                            fiEyesUIResetAndRestart();
                        }, 1000);
                    }
                }, totalTime);
            };
            // Reset and restart animation
            const fiEyesUIResetAndRestart = () => {
                const fiEyesUILetters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-letterBounce-letter');
                fiEyesUILetters.forEach((fiEyesUILetter) => {
                    fiEyesUILetter.style.opacity = '0';
                    fiEyesUILetter.style.transform = 'scale(0.9)';
                });
                setTimeout(() => {
                    fiEyesUIStartAnimation();
                }, 100);
            };
            fiEyesUIInitializeAnimation();
            return () => {
                // Cleanup
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-letterBounce-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [text, color, fontSize, animationDuration, letterDelay, loop, direction, easing, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-letterBounce-container ${className}`, style: {
                fontSize,
                ...style
            } }));
    };

    const FiEyesUITextScale = ({ text = "Welcome To Finches Eyes UI Components", fontSize = "80px", color = "#ffffff", animationDuration = 1500, animationDelay = 0, autoPlay = true, repeatInterval = 3000, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isAnimating, setIsAnimating] = React.useState(false);
        const intervalRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-textScale-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-textScale-container {
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
        
        .fiEyesUI-textScale-appendText {
          text-align: center;
          padding: 34px;
          display: block;
          color: ${color};
          width: 100%;
        }
        
        .fiEyesUI-textScale-character {
          display: inline;
          font-weight: bolder;
          font-size: ${fontSize};
          margin: auto;
          text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
        }
        
        .fiEyesUI-textScale-character.fiEyesUI-animate {
          animation: fiEyesUI-rotate ${animationDuration}ms linear forwards;
        }
        
        @keyframes fiEyesUI-rotate {
          0% {
            transform: scale(0);
          }
          10% {
            font-size: ${fontSize};
            transform: scale(2);
          }
          20% {
            transform: scale(0.5);
          }
          40% {
            transform: scale(1.5);
          }
          60% {
            transform: scale(0.8);
          }
          80% {
            transform: scale(1.2);
          }
          100% {
            font-size: ${fontSize};
            transform: scale(1);
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyle);
            };
            // Split text into characters
            const fiEyesUISplitText = () => {
                if (!fiEyesUIContainer)
                    return;
                const fiEyesUIText = text;
                const fiEyesUILengthOfText = fiEyesUIText.length;
                const fiEyesUICharList = new Array(fiEyesUILengthOfText);
                for (let i = 0; i < fiEyesUILengthOfText; i++) {
                    fiEyesUICharList[i] = fiEyesUIText.charAt(i);
                }
                const fiEyesUITargetDiv = fiEyesUIContainer.querySelector('.fiEyesUI-textScale-appendText');
                if (!fiEyesUITargetDiv)
                    return;
                fiEyesUITargetDiv.innerHTML = '';
                for (let i = 0; i < fiEyesUILengthOfText; i++) {
                    const fiEyesUIDiv = document.createElement('div');
                    fiEyesUIDiv.classList.add(`fiEyesUI-ch-${i}`);
                    fiEyesUIDiv.classList.add('fiEyesUI-textScale-character');
                    fiEyesUIDiv.textContent = fiEyesUICharList[i];
                    fiEyesUITargetDiv.appendChild(fiEyesUIDiv);
                }
            };
            // Animate text
            const fiEyesUIAnimateText = () => {
                if (!fiEyesUIContainer)
                    return;
                setIsAnimating(true);
                fiEyesUISplitText();
                setTimeout(() => {
                    const fiEyesUIItems = fiEyesUIContainer.querySelectorAll('.fiEyesUI-textScale-character');
                    fiEyesUIItems.forEach((fiEyesUIItem) => {
                        fiEyesUIItem.classList.add('fiEyesUI-animate');
                    });
                    setTimeout(() => {
                        setIsAnimating(false);
                        onComplete?.();
                    }, animationDuration);
                }, animationDelay);
            };
            // Initialize
            fiEyesUICreateStyles();
            fiEyesUISplitText();
            if (autoPlay) {
                fiEyesUIAnimateText();
                // Set up interval for auto-repeat
                intervalRef.current = window.setInterval(() => {
                    fiEyesUIAnimateText();
                }, repeatInterval);
            }
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-textScale-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [text, color, fontSize, animationDuration, animationDelay, autoPlay, repeatInterval, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textScale-container ${className}`, style: {
                fontSize,
                ...style
            }, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textScale-appendText" }) }));
    };

    const FiEyesUIRotatingText = ({ words = ["beautiful", "maintainable", "perfect"], fontSize = "40px", color = "#ffffff", animationDuration = 1500, wordDelay = 1250, autoPlay = true, repeatInterval = 5000, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isAnimating, setIsAnimating] = React.useState(false);
        const intervalRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-rotatingText-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-rotatingText-container {
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
        
        .fiEyesUI-rotatingText-content {
          position: relative;
          width: 100%;
        }
        
        .fiEyesUI-rotatingText-word {
          font-family: 'Orbitron', sans-serif;
          font-size: ${fontSize};
          left: 0;
          margin-bottom: 0;
          margin-top: 30px;
          opacity: 0;
          position: absolute;
          right: 0;
          text-align: center;
          text-transform: uppercase;
          top: 0;
          color: ${color};
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(1) {
          animation: fiEyesUI-rotate-text-up ${animationDuration}ms ${wordDelay}ms;
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(2) {
          animation: fiEyesUI-rotate-text-up ${animationDuration}ms ${wordDelay * 2}ms;
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(3) {
          animation: fiEyesUI-fade-text-in ${animationDuration}ms ${wordDelay * 3}ms forwards;
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(4) {
          animation: fiEyesUI-rotate-text-up ${animationDuration}ms ${wordDelay * 4}ms;
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(5) {
          animation: fiEyesUI-rotate-text-up ${animationDuration}ms ${wordDelay * 5}ms;
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(6) {
          animation: fiEyesUI-fade-text-in ${animationDuration}ms ${wordDelay * 6}ms forwards;
        }
        
        @keyframes fiEyesUI-rotate-text-up {
          0% {
            transform: translate3d(0, 80px, 0);
            opacity: 0;
          }
          20%, 80% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
          100% {
            transform: translate3d(0, -40px, 0);
            opacity: 0;
          }
        }
        
        @keyframes fiEyesUI-fade-text-in {
          0% {
            opacity: 0;
            transform: translate3d(0, 80px, 0);
          }
          50%, 100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyle);
            };
            // Create word elements
            const fiEyesUICreateWords = () => {
                if (!fiEyesUIContainer)
                    return;
                const fiEyesUIContentDiv = fiEyesUIContainer.querySelector('.fiEyesUI-rotatingText-content');
                if (!fiEyesUIContentDiv)
                    return;
                fiEyesUIContentDiv.innerHTML = '';
                words.forEach((fiEyesUIWord, fiEyesUIIndex) => {
                    const fiEyesUIWordDiv = document.createElement('h2');
                    fiEyesUIWordDiv.className = 'fiEyesUI-rotatingText-word';
                    fiEyesUIWordDiv.textContent = fiEyesUIWord;
                    fiEyesUIContentDiv.appendChild(fiEyesUIWordDiv);
                });
            };
            // Start animation
            const fiEyesUIStartAnimation = () => {
                if (!fiEyesUIContainer)
                    return;
                setIsAnimating(true);
                fiEyesUICreateWords();
                // Calculate total animation time
                const totalTime = (words.length * wordDelay) + animationDuration;
                setTimeout(() => {
                    setIsAnimating(false);
                    onComplete?.();
                }, totalTime);
            };
            // Initialize
            fiEyesUICreateStyles();
            fiEyesUICreateWords();
            if (autoPlay) {
                fiEyesUIStartAnimation();
                // Set up interval for auto-repeat
                intervalRef.current = window.setInterval(() => {
                    fiEyesUIStartAnimation();
                }, repeatInterval);
            }
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-rotatingText-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [words, color, fontSize, animationDuration, wordDelay, autoPlay, repeatInterval, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-rotatingText-container ${className}`, style: {
                fontSize,
                ...style
            }, children: jsxRuntime.jsx("div", { className: "fiEyesUI-rotatingText-content" }) }));
    };

    const FiEyesUICharacterFlyIn = ({ text = "Welcome To Finches Eyes UI Components", fontSize = "32px", color = "#ffffff", animationDuration = 2800, startDelay = 700, autoPlay = true, repeatInterval = 5000, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isAnimating, setIsAnimating] = React.useState(false);
        const intervalRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-characterFlyIn-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-characterFlyIn-container {
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
        
        .fiEyesUI-characterFlyIn-list {
          position: absolute;
          left: 50%;
          top: 50%;
          list-style: none;
          transform: translateX(-50%) translateY(-50%);
          margin: 0;
          padding: 0;
        }
        
        .fiEyesUI-characterFlyIn-character {
          display: inline-block;
          margin-right: 30px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 300;
          font-size: ${fontSize};
          color: ${color};
          opacity: 1;
          transition: all ${animationDuration}ms cubic-bezier(0.6, -.005, 0.32, 1.75);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character {
          opacity: 0;
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(1) {
          transform: translateX(150px) translateY(-170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(2) {
          transform: translateX(-210px) translateY(170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(3) {
          transform: translateX(20px) translateY(-100px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(4) {
          transform: translateX(-100px) translateY(-20px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(5) {
          transform: translateX(-70px) translateY(-200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(6) {
          transform: translateX(200px) translateY(70px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(7) {
          transform: translateX(30px) translateY(200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(8) {
          transform: translateX(30px) translateY(-100px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(9) {
          transform: translateX(100px) translateY(-170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(10) {
          transform: translateX(-100px) translateY(50px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(11) {
          transform: translateX(-550px) translateY(120px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(12) {
          transform: translateX(-40px) translateY(-50px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(13) {
          transform: translateX(150px) translateY(-170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(14) {
          transform: translateX(-210px) translateY(170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(15) {
          transform: translateX(20px) translateY(-100px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(16) {
          transform: translateX(-100px) translateY(-20px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(17) {
          transform: translateX(-70px) translateY(-200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(18) {
          transform: translateX(200px) translateY(70px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(19) {
          transform: translateX(30px) translateY(200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(20) {
          transform: translateX(30px) translateY(-100px);
        }
      `;
                document.head.appendChild(fiEyesUIStyle);
            };
            // Create character elements
            const fiEyesUICreateCharacters = () => {
                if (!fiEyesUIContainer)
                    return;
                const fiEyesUIListDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterFlyIn-list');
                if (!fiEyesUIListDiv)
                    return;
                fiEyesUIListDiv.innerHTML = '';
                const fiEyesUICharacters = text.split('');
                fiEyesUICharacters.forEach((fiEyesUIChar) => {
                    const fiEyesUICharacterDiv = document.createElement('li');
                    fiEyesUICharacterDiv.className = 'fiEyesUI-characterFlyIn-character';
                    fiEyesUICharacterDiv.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
                    fiEyesUIListDiv.appendChild(fiEyesUICharacterDiv);
                });
            };
            // Start animation
            const fiEyesUIStartAnimation = () => {
                if (!fiEyesUIContainer)
                    return;
                setIsAnimating(true);
                fiEyesUICreateCharacters();
                const fiEyesUIListDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterFlyIn-list');
                if (!fiEyesUIListDiv)
                    return;
                // Add hidden class initially
                fiEyesUIListDiv.classList.add('fiEyesUI-hidden');
                // Remove hidden class after delay to start animation
                setTimeout(() => {
                    fiEyesUIListDiv.classList.remove('fiEyesUI-hidden');
                    // Calculate total animation time
                    const totalTime = startDelay + animationDuration;
                    setTimeout(() => {
                        setIsAnimating(false);
                        onComplete?.();
                    }, totalTime);
                }, startDelay);
            };
            // Initialize
            fiEyesUICreateStyles();
            fiEyesUICreateCharacters();
            if (autoPlay) {
                fiEyesUIStartAnimation();
                // Set up interval for auto-repeat
                intervalRef.current = window.setInterval(() => {
                    fiEyesUIStartAnimation();
                }, repeatInterval);
            }
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-characterFlyIn-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [text, color, fontSize, animationDuration, startDelay, autoPlay, repeatInterval, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-characterFlyIn-container ${className}`, style: {
                fontSize,
                ...style
            }, children: jsxRuntime.jsx("ul", { className: "fiEyesUI-characterFlyIn-list fiEyesUI-hidden" }) }));
    };

    const FiEyesUITextReveal = ({ text1 = "Welcome To", text2 = "Finches Eyes UI Components", fontSize1 = "60px", fontSize2 = "30px", color1 = "#ffffff", color2 = "#ffffff", animationDuration = 2500, autoPlay = true, repeatInterval = 4000, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isAnimating, setIsAnimating] = React.useState(false);
        const intervalRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-textReveal-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-textReveal-container {
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
        
        .fiEyesUI-textReveal-content {
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }
        
        .fiEyesUI-textReveal-span {
          text-transform: uppercase;
          display: block;
        }
        
        .fiEyesUI-textReveal-text1 {
          color: ${color1};
          font-size: ${fontSize1};
          font-weight: 700;
          letter-spacing: 8px;
          margin-bottom: 20px;
          background: #000000;
          position: relative;
          animation: fiEyesUI-text-reveal ${animationDuration}ms 1;
        }
        
        .fiEyesUI-textReveal-text2 {
          font-size: ${fontSize2};
          color: ${color2};
        }
        
        @keyframes fiEyesUI-text-reveal {
          0% {
            color: #000000;
            margin-bottom: -40px;
          }
          30% {
            letter-spacing: 25px;
            margin-bottom: -40px;
          }
          100% {
            color: ${color1};
            letter-spacing: 8px;
            margin-bottom: 20px;
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyle);
            };
            // Start animation
            const fiEyesUIStartAnimation = () => {
                if (!fiEyesUIContainer)
                    return;
                setIsAnimating(true);
                // Calculate total animation time
                setTimeout(() => {
                    setIsAnimating(false);
                    onComplete?.();
                }, animationDuration);
            };
            // Initialize
            fiEyesUICreateStyles();
            if (autoPlay) {
                fiEyesUIStartAnimation();
                // Set up interval for auto-repeat
                intervalRef.current = window.setInterval(() => {
                    fiEyesUIStartAnimation();
                }, repeatInterval);
            }
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-textReveal-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [text1, text2, color1, color2, fontSize1, fontSize2, animationDuration, autoPlay, repeatInterval, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textReveal-container ${className}`, style: style, children: jsxRuntime.jsxs("div", { className: "fiEyesUI-textReveal-content", children: [jsxRuntime.jsx("span", { className: "fiEyesUI-textReveal-span fiEyesUI-textReveal-text1", children: text1 }), jsxRuntime.jsx("span", { className: "fiEyesUI-textReveal-span fiEyesUI-textReveal-text2", children: text2 })] }) }));
    };

    const FiEyesUICharacterGlow = ({ text = "Welcome To Finches Eyes UI Components", fontSize = "80px", color = "#ffffff", glowColor = "#00bbff", animationDuration = 2250, autoPlay = true, repeatInterval = 3000, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isAnimating, setIsAnimating] = React.useState(false);
        const intervalRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-characterGlow-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-characterGlow-container {
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
        
        .fiEyesUI-characterGlow-content {
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .fiEyesUI-characterGlow-character {
          display: block;
          float: left;
          animation: fiEyesUI-character-glow ${animationDuration}ms linear infinite;
          margin: 0 5px;
          padding: 0;
          position: relative;
          color: #111;
        }
        
        .fiEyesUI-characterGlow-character:nth-child(1) {
          animation-delay: 0s;
        }
        .fiEyesUI-characterGlow-character:nth-child(2) {
          animation-delay: 0.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(3) {
          animation-delay: 0.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(4) {
          animation-delay: 0.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(5) {
          animation-delay: 1s;
        }
        .fiEyesUI-characterGlow-character:nth-child(6) {
          animation-delay: 1.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(7) {
          animation-delay: 1.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(8) {
          animation-delay: 1.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(9) {
          animation-delay: 2s;
        }
        .fiEyesUI-characterGlow-character:nth-child(10) {
          animation-delay: 2.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(11) {
          animation-delay: 2.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(12) {
          animation-delay: 2.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(13) {
          animation-delay: 3s;
        }
        .fiEyesUI-characterGlow-character:nth-child(14) {
          animation-delay: 3.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(15) {
          animation-delay: 3.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(16) {
          animation-delay: 3.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(17) {
          animation-delay: 4s;
        }
        .fiEyesUI-characterGlow-character:nth-child(18) {
          animation-delay: 4.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(19) {
          animation-delay: 4.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(20) {
          animation-delay: 4.75s;
        }
        
        @keyframes fiEyesUI-character-glow {
          0%, 100% {
            color: ${color};
            filter: blur(2px);
            text-shadow: 0 0 10px ${glowColor},
              0 0 20px ${glowColor},
              0 0 40px ${glowColor},
              0 0 80px ${glowColor},
              0 0 120px ${glowColor},
              0 0 200px ${glowColor},
              0 0 300px ${glowColor},
              0 0 400px ${glowColor};
          }
          5%, 95% {
            color: #111;
            filter: blur(0px);
            text-shadow: none;
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyle);
            };
            // Create character elements
            const fiEyesUICreateCharacters = () => {
                if (!fiEyesUIContainer)
                    return;
                const fiEyesUIContentDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterGlow-content');
                if (!fiEyesUIContentDiv)
                    return;
                fiEyesUIContentDiv.innerHTML = '';
                const fiEyesUICharacters = text.split('');
                fiEyesUICharacters.forEach((fiEyesUIChar) => {
                    const fiEyesUICharacterSpan = document.createElement('span');
                    fiEyesUICharacterSpan.className = 'fiEyesUI-characterGlow-character';
                    fiEyesUICharacterSpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
                    fiEyesUIContentDiv.appendChild(fiEyesUICharacterSpan);
                });
            };
            // Start animation
            const fiEyesUIStartAnimation = () => {
                if (!fiEyesUIContainer)
                    return;
                setIsAnimating(true);
                fiEyesUICreateCharacters();
                // Calculate total animation time
                setTimeout(() => {
                    setIsAnimating(false);
                    onComplete?.();
                }, animationDuration);
            };
            // Initialize
            fiEyesUICreateStyles();
            fiEyesUICreateCharacters();
            if (autoPlay) {
                fiEyesUIStartAnimation();
                // Set up interval for auto-repeat
                intervalRef.current = window.setInterval(() => {
                    fiEyesUIStartAnimation();
                }, repeatInterval);
            }
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-characterGlow-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [text, color, glowColor, fontSize, animationDuration, autoPlay, repeatInterval, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-characterGlow-container ${className}`, style: style, children: jsxRuntime.jsx("div", { className: "fiEyesUI-characterGlow-content" }) }));
    };

    const FiEyesUITextStroke = ({ text = "Welcome To Finches Eyes UI Components", fontSize = "80px", strokeColor = "#8338ec", fillColor = "#c19bf5", strokeWidth = "2px", animationDuration = 4000, autoPlay = true, repeatInterval = 5000, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isAnimating, setIsAnimating] = React.useState(false);
        const intervalRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-textStroke-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-textStroke-container {
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
        
        .fiEyesUI-textStroke-content {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .fiEyesUI-textStroke-text {
          color: #ffffff;
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
          position: absolute;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
          margin: 0;
          padding: 0;
        }
        
        .fiEyesUI-textStroke-text:nth-child(1) {
          color: transparent;
          -webkit-text-stroke: ${strokeWidth} ${strokeColor};
          text-stroke: ${strokeWidth} ${strokeColor};
        }
        
        .fiEyesUI-textStroke-text:nth-child(2) {
          color: ${fillColor};
          animation: fiEyesUI-text-stroke-animate ${animationDuration}ms ease-in-out infinite;
        }
        
        @keyframes fiEyesUI-text-stroke-animate {
          0%, 100% {
            clip-path: polygon(
              0% 45%,
              16% 44%,
              33% 50%,
              54% 60%,
              70% 61%,
              84% 59%,
              100% 52%,
              100% 100%,
              0% 100%
            );
          }
          50% {
            clip-path: polygon(
              0% 60%,
              15% 65%,
              34% 66%,
              51% 62%,
              67% 50%,
              84% 45%,
              100% 46%,
              100% 100%,
              0% 100%
            );
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyle);
            };
            // Start animation
            const fiEyesUIStartAnimation = () => {
                if (!fiEyesUIContainer)
                    return;
                setIsAnimating(true);
                // Calculate total animation time
                setTimeout(() => {
                    setIsAnimating(false);
                    onComplete?.();
                }, animationDuration);
            };
            // Initialize
            fiEyesUICreateStyles();
            if (autoPlay) {
                fiEyesUIStartAnimation();
                // Set up interval for auto-repeat
                intervalRef.current = window.setInterval(() => {
                    fiEyesUIStartAnimation();
                }, repeatInterval);
            }
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-textStroke-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [text, fontSize, strokeColor, fillColor, strokeWidth, animationDuration, autoPlay, repeatInterval, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textStroke-container ${className}`, style: style, children: jsxRuntime.jsxs("div", { className: "fiEyesUI-textStroke-content", children: [jsxRuntime.jsx("h2", { className: "fiEyesUI-textStroke-text", children: text }), jsxRuntime.jsx("h2", { className: "fiEyesUI-textStroke-text", children: text })] }) }));
    };

    const FiEyesUITypewriter = ({ text = "Welcome To Finches Eyes UI Components", fontSize = "80px", cursorColor = "#ffffff", cursorWidth = "4px", animationDuration = 5000, cursorBlinkSpeed = 1000, autoPlay = true, repeatInterval = 6000, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isAnimating, setIsAnimating] = React.useState(false);
        const intervalRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-typewriter-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-typewriter-container {
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
        
        .fiEyesUI-typewriter-content {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
          font-weight: bold;
        }
        
        .fiEyesUI-typewriter-text {
          white-space: nowrap;
          overflow: hidden;
          border-right: ${cursorWidth} solid ${cursorColor};
          animation: fiEyesUI-cursor ${cursorBlinkSpeed}ms step-start infinite, 
                     fiEyesUI-typewriter-text ${animationDuration}ms steps(${text.length}) alternate infinite;
        }
        
        @keyframes fiEyesUI-cursor {
          0%, 100% { 
            border-color: ${cursorColor}; 
          }
        }
        
        @keyframes fiEyesUI-typewriter-text {
          0% { 
            width: 0; 
          }
          100% { 
            width: ${text.length}ch; 
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyle);
            };
            // Start animation
            const fiEyesUIStartAnimation = () => {
                if (!fiEyesUIContainer)
                    return;
                setIsAnimating(true);
                // Calculate total animation time
                setTimeout(() => {
                    setIsAnimating(false);
                    onComplete?.();
                }, animationDuration);
            };
            // Initialize
            fiEyesUICreateStyles();
            if (autoPlay) {
                fiEyesUIStartAnimation();
                // Set up interval for auto-repeat
                intervalRef.current = window.setInterval(() => {
                    fiEyesUIStartAnimation();
                }, repeatInterval);
            }
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-typewriter-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [text, fontSize, cursorColor, cursorWidth, animationDuration, cursorBlinkSpeed, autoPlay, repeatInterval, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-typewriter-container ${className}`, style: style, children: jsxRuntime.jsx("div", { className: "fiEyesUI-typewriter-content", children: jsxRuntime.jsx("div", { className: "fiEyesUI-typewriter-text", children: text }) }) }));
    };

    const FiEyesUIFadeIn = ({ text = "Welcome To Finches Eyes UI Components", fontSize = "80px", animationDuration = 7000, autoPlay = true, repeatInterval = 8000, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isAnimating, setIsAnimating] = React.useState(false);
        const intervalRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-fadeIn-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-fadeIn-container {
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
        
        .fiEyesUI-fadeIn-content {
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          color: #ffffff;
          padding: 1rem;
          text-align: center;
          animation-name: fiEyesUI-fade-in;
          animation-duration: ${animationDuration}ms;
          animation-fill-mode: both;
        }
        
        @keyframes fiEyesUI-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyle);
            };
            // Start animation
            const fiEyesUIStartAnimation = () => {
                if (!fiEyesUIContainer)
                    return;
                setIsAnimating(true);
                // Calculate total animation time
                setTimeout(() => {
                    setIsAnimating(false);
                    onComplete?.();
                }, animationDuration);
            };
            // Initialize
            fiEyesUICreateStyles();
            if (autoPlay) {
                fiEyesUIStartAnimation();
                // Set up interval for auto-repeat
                intervalRef.current = window.setInterval(() => {
                    fiEyesUIStartAnimation();
                }, repeatInterval);
            }
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-fadeIn-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [text, fontSize, animationDuration, autoPlay, repeatInterval, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-fadeIn-container ${className}`, style: style, children: jsxRuntime.jsx("div", { className: "fiEyesUI-fadeIn-content", children: jsxRuntime.jsx("h1", { children: text }) }) }));
    };

    const FiEyesUIGradientText = ({ text = "Welcome To Finches Eyes UI Components", fontSize = "80px", gradientColors = ["#231557", "#44107a", "#ff1361", "#fff800"], animationDuration = 2000, autoPlay = true, repeatInterval = 3000, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isAnimating, setIsAnimating] = React.useState(false);
        const intervalRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-gradientText-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-gradientText-container {
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
        
        .fiEyesUI-gradientText-content {
          text-transform: uppercase;
          background-image: linear-gradient(
            -225deg,
            ${gradientColors[0]} 0%,
            ${gradientColors[1]} 29%,
            ${gradientColors[2]} 67%,
            ${gradientColors[3]} 100%
          );
          background-size: auto auto;
          background-clip: border-box;
          background-size: 200% auto;
          color: #fff;
          background-clip: text;
          text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fiEyesUI-textclip ${animationDuration}ms linear infinite;
          display: inline-block;
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
        }
        
        @keyframes fiEyesUI-textclip {
          to {
            background-position: 200% center;
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyle);
            };
            // Start animation
            const fiEyesUIStartAnimation = () => {
                if (!fiEyesUIContainer)
                    return;
                setIsAnimating(true);
                // Calculate total animation time
                setTimeout(() => {
                    setIsAnimating(false);
                    onComplete?.();
                }, animationDuration);
            };
            // Initialize
            fiEyesUICreateStyles();
            if (autoPlay) {
                fiEyesUIStartAnimation();
                // Set up interval for auto-repeat
                intervalRef.current = window.setInterval(() => {
                    fiEyesUIStartAnimation();
                }, repeatInterval);
            }
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-gradientText-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [text, fontSize, gradientColors, animationDuration, autoPlay, repeatInterval, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-gradientText-container ${className}`, style: style, children: jsxRuntime.jsx("div", { className: "fiEyesUI-gradientText-content", children: jsxRuntime.jsx("h3", { children: text }) }) }));
    };

    const FiEyesUIResizeEffect = ({ text = "Welcome To Finches Eyes UI Components", minFontSize = "20px", maxFontSize = "50px", minFontWeight = 100, maxFontWeight = 900, animationDuration = 5000, autoPlay = true, repeatInterval = 6000, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isAnimating, setIsAnimating] = React.useState(false);
        const intervalRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-resizeEffect-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-resizeEffect-container {
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
        
        .fiEyesUI-resizeEffect-content {
          font-size: ${minFontSize};
          font-weight: ${minFontWeight};
          font-family: 'Orbitron', sans-serif;
          animation: fiEyesUI-resize-anime ${animationDuration}ms infinite forwards;
          animation-direction: alternate;
          color: #ffffff;
        }
        
        @keyframes fiEyesUI-resize-anime {
          from {
            font-size: ${minFontSize};
            font-weight: ${minFontWeight};
            opacity: 0;
          } 
          to {
            font-size: ${maxFontSize};
            font-weight: ${maxFontWeight};
            text-shadow: 0px 0px 5px #ffffff;
            opacity: 1;
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyle);
            };
            // Start animation
            const fiEyesUIStartAnimation = () => {
                if (!fiEyesUIContainer)
                    return;
                setIsAnimating(true);
                // Calculate total animation time
                setTimeout(() => {
                    setIsAnimating(false);
                    onComplete?.();
                }, animationDuration);
            };
            // Initialize
            fiEyesUICreateStyles();
            if (autoPlay) {
                fiEyesUIStartAnimation();
                // Set up interval for auto-repeat
                intervalRef.current = window.setInterval(() => {
                    fiEyesUIStartAnimation();
                }, repeatInterval);
            }
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-resizeEffect-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [text, minFontSize, maxFontSize, minFontWeight, maxFontWeight, animationDuration, autoPlay, repeatInterval, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-resizeEffect-container ${className}`, style: style, children: jsxRuntime.jsx("div", { className: "fiEyesUI-resizeEffect-content", children: jsxRuntime.jsx("h1", { children: text }) }) }));
    };

    const FiEyesUITextScaleBounce = ({ text = "Welcome To Finches Eyes UI Components", fontSize = "80px", animationDuration = 1500, autoPlay = true, repeatInterval = 3000, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isAnimating, setIsAnimating] = React.useState(false);
        const intervalRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-textScaleBounce-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-textScaleBounce-container {
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
        
        .fiEyesUI-textScaleBounce-content {
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
          font-weight: bolder;
          color: #ffffff;
          text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
          display: inline;
          margin: auto;
        }
        
        .fiEyesUI-textScaleBounce-animate {
          animation: fiEyesUI-textScaleBounce-rotate ${animationDuration}ms linear forwards;
        }
        
        @keyframes fiEyesUI-textScaleBounce-rotate {
          0% {
            transform: scale(0);
          }
          10% {
            font-size: ${fontSize};
            transform: scale(2);
          }
          20% {
            transform: scale(0.5);
          }
          40% {
            transform: scale(1.5);
          }
          60% {
            transform: scale(0.8);
          }
          80% {
            transform: scale(1.2);
          }
          100% {
            font-size: ${fontSize};
            transform: scale(1);
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyle);
            };
            // Start animation
            const fiEyesUIStartAnimation = () => {
                if (!fiEyesUIContainer)
                    return;
                setIsAnimating(true);
                const fiEyesUIContentElement = fiEyesUIContainer.querySelector('.fiEyesUI-textScaleBounce-content');
                if (fiEyesUIContentElement) {
                    fiEyesUIContentElement.classList.add('fiEyesUI-textScaleBounce-animate');
                    setTimeout(() => {
                        fiEyesUIContentElement.classList.remove('fiEyesUI-textScaleBounce-animate');
                        setIsAnimating(false);
                        onComplete?.();
                    }, animationDuration);
                }
            };
            // Initialize
            fiEyesUICreateStyles();
            if (autoPlay) {
                fiEyesUIStartAnimation();
                // Set up interval for auto-repeat
                intervalRef.current = window.setInterval(() => {
                    fiEyesUIStartAnimation();
                }, repeatInterval);
            }
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-textScaleBounce-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [text, fontSize, animationDuration, autoPlay, repeatInterval, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textScaleBounce-container ${className}`, style: style, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textScaleBounce-content", children: text }) }));
    };

    const FiEyesUITextSwipe = ({ text = "Welcome To Finches Eyes UI Components", fontSize = "48px", animationDuration = 1000, autoPlay = true, repeatInterval = 2000, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isAnimating, setIsAnimating] = React.useState(false);
        const intervalRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-textSwipe-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-textSwipe-container {
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
        
        .fiEyesUI-textSwipe-content {
          font-size: ${fontSize};
          font-family: 'Orbitron', sans-serif;
          color: rgba(255, 255, 255, 0.2);
          margin: auto;
        }
        
        .fiEyesUI-textSwipe-letter {
          display: inline-block;
          position: relative;
          transform-origin: 50% 50%;
          transition: all 0.5s ease;
        }
        
        .fiEyesUI-textSwipe-opaque {
          animation: fiEyesUI-textSwipe-opacity ${animationDuration}ms linear;
        }
        
        @keyframes fiEyesUI-textSwipe-opacity {
          0% {
            color: rgba(255, 255, 255, 0.2);
          }
          50% {
            color: rgba(255, 255, 255, 1);
          }
          100% {
            color: rgba(255, 255, 255, 0.2);
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyle);
            };
            // Initialize text with individual letters
            const fiEyesUIInitializeText = () => {
                if (!fiEyesUIContainer)
                    return;
                const fiEyesUIContentElement = fiEyesUIContainer.querySelector('.fiEyesUI-textSwipe-content');
                if (fiEyesUIContentElement) {
                    fiEyesUIContentElement.innerHTML = '';
                    const letters = text.split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.className = 'fiEyesUI-textSwipe-letter';
                        span.id = `fiEyesUI-letter-${index}`;
                        span.textContent = letter;
                        fiEyesUIContentElement.appendChild(span);
                    });
                }
            };
            // Start animation
            const fiEyesUIStartAnimation = () => {
                if (!fiEyesUIContainer)
                    return;
                setIsAnimating(true);
                const letters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-textSwipe-letter');
                const textLength = letters.length - 1;
                letters.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.toggle('fiEyesUI-textSwipe-opaque');
                        if (index === textLength) {
                            setTimeout(() => {
                                setIsAnimating(false);
                                onComplete?.();
                            }, animationDuration);
                        }
                    }, (index + (textLength / 2)) * 10 * (100 / textLength));
                });
            };
            // Initialize
            fiEyesUICreateStyles();
            fiEyesUIInitializeText();
            if (autoPlay) {
                fiEyesUIStartAnimation();
                // Set up interval for auto-repeat
                intervalRef.current = window.setInterval(() => {
                    fiEyesUIStartAnimation();
                }, repeatInterval);
            }
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-textSwipe-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [text, fontSize, animationDuration, autoPlay, repeatInterval, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textSwipe-container ${className}`, style: style, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textSwipe-content" }) }));
    };

    const FiEyesUIHoverFill = ({ text = "Welcome To Finches Eyes UI Components", fontSize = "24px", color = "#ffffff", hoverColor = "#ffffff", className = "", style = {}, onClick }) => {
        const containerRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            containerRef.current;
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
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-hoverFill-container ${className}`, style: style, children: jsxRuntime.jsxs("a", { href: "#", className: "fiEyesUI-hoverFill-link", onClick: (e) => {
                    e.preventDefault();
                    onClick?.();
                }, children: [text, jsxRuntime.jsx("span", { className: "fiEyesUI-hoverFill-link-layer", "data-text": text })] }) }));
    };

    const FiEyesUITitleReveal = ({ title = "Welcome To Finches Eyes UI Components", subtitle = "Elegance is an attitude", titleFontSize = "calc(6vw + 1rem)", subtitleFontSize = "calc(0.4vw + 0.5rem)", animationDuration = 500, autoPlay = true, repeatInterval = 4000, className = "", style = {}, onComplete }) => {
        const containerRef = React.useRef(null);
        const [isAnimating, setIsAnimating] = React.useState(false);
        const intervalRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const fiEyesUIContainer = containerRef.current;
            // Create styles dynamically
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-titleReveal-styles';
                let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                const fiEyesUIStyle = document.createElement('style');
                fiEyesUIStyle.id = fiEyesUIStyleId;
                fiEyesUIStyle.textContent = `
        .fiEyesUI-titleReveal-container {
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
        
        .fiEyesUI-titleReveal-content {
          position: relative;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
          margin: 0;
        }
        
        .fiEyesUI-titleReveal-title {
          font-weight: 700;
          display: inline-flex;
          margin: -5px;
          padding: 5px;
        }
        
        .fiEyesUI-titleReveal-letter {
          font-size: ${titleFontSize};
          margin-left: -2px;
          opacity: 0;
        }
        
        .fiEyesUI-titleReveal-subtitle {
          font-weight: 400;
          font-size: ${subtitleFontSize};
          letter-spacing: calc(0.3vw + 0.5rem);
          text-transform: uppercase;
          position: relative;
          top: -5px;
          opacity: 0;
        }
        
        .fiEyesUI-titleReveal-letter-animate {
          animation: fiEyesUI-titleReveal-slide ${animationDuration}ms ease-in-quad forwards;
        }
        
        .fiEyesUI-titleReveal-letter-fade {
          animation: fiEyesUI-titleReveal-fade ${animationDuration}ms ease-in-quad forwards;
        }
        
        .fiEyesUI-titleReveal-subtitle-animate {
          animation: fiEyesUI-titleReveal-subtitle-fade 300ms ease-in-quad forwards;
        }
        
        @keyframes fiEyesUI-titleReveal-slide {
          from {
            transform: translateX(5px);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes fiEyesUI-titleReveal-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fiEyesUI-titleReveal-subtitle-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyle);
            };
            // Initialize text with individual letters
            const fiEyesUIInitializeText = () => {
                if (!fiEyesUIContainer)
                    return;
                const titleElement = fiEyesUIContainer.querySelector('.fiEyesUI-titleReveal-title');
                const subtitleElement = fiEyesUIContainer.querySelector('.fiEyesUI-titleReveal-subtitle');
                if (titleElement) {
                    titleElement.innerHTML = '';
                    const letters = title.split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.className = 'fiEyesUI-titleReveal-letter';
                        span.id = `fiEyesUI-title-letter-${index}`;
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        titleElement.appendChild(span);
                    });
                }
                if (subtitleElement) {
                    subtitleElement.textContent = subtitle;
                }
            };
            // Start animation
            const fiEyesUIStartAnimation = () => {
                if (!fiEyesUIContainer)
                    return;
                setIsAnimating(true);
                const letters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-titleReveal-letter');
                const subtitleElement = fiEyesUIContainer.querySelector('.fiEyesUI-titleReveal-subtitle');
                // Reset all elements
                letters.forEach(letter => {
                    letter.classList.remove('fiEyesUI-titleReveal-letter-animate', 'fiEyesUI-titleReveal-letter-fade');
                });
                if (subtitleElement) {
                    subtitleElement.classList.remove('fiEyesUI-titleReveal-subtitle-animate');
                }
                // Animate letters
                setTimeout(() => {
                    letters.forEach((letter, index) => {
                        setTimeout(() => {
                            letter.classList.add('fiEyesUI-titleReveal-letter-animate');
                        }, 50 * index);
                        setTimeout(() => {
                            letter.classList.add('fiEyesUI-titleReveal-letter-fade');
                            if (index === letters.length - 1) {
                                setTimeout(() => {
                                    if (subtitleElement) {
                                        subtitleElement.classList.add('fiEyesUI-titleReveal-subtitle-animate');
                                    }
                                    setIsAnimating(false);
                                    onComplete?.();
                                }, 60 * index + 100);
                            }
                        }, 60 * index);
                    });
                }, 500);
            };
            // Initialize
            fiEyesUICreateStyles();
            fiEyesUIInitializeText();
            if (autoPlay) {
                fiEyesUIStartAnimation();
                // Set up interval for auto-repeat
                intervalRef.current = window.setInterval(() => {
                    fiEyesUIStartAnimation();
                }, repeatInterval);
            }
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                const fiEyesUIStyleElement = document.getElementById('fiEyesUI-titleReveal-styles');
                if (fiEyesUIStyleElement) {
                    fiEyesUIStyleElement.remove();
                }
            };
        }, [title, subtitle, titleFontSize, subtitleFontSize, animationDuration, autoPlay, repeatInterval, onComplete]);
        return (jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-titleReveal-container ${className}`, style: style, children: jsxRuntime.jsx("div", { className: "fiEyesUI-titleReveal-content", children: jsxRuntime.jsxs("h1", { children: [jsxRuntime.jsx("span", { className: "fiEyesUI-titleReveal-title" }), jsxRuntime.jsx("br", {}), jsxRuntime.jsx("span", { className: "fiEyesUI-titleReveal-subtitle" })] }) }) }));
    };

    const FiEyesUIWavyText = ({ text = 'Welcome To Finches Eyes UI Components', fontSize = '2em', animationDuration = 1.5, waveHeight = 20, delayMultiplier = 0.1, autoPlay = true, repeatInterval = 0, onAnimationComplete, onAnimationStart, className = '', style = {} }) => {
        const containerRef = React.useRef(null);
        const animationRef = React.useRef(null);
        const fiEyesUIStartWavyAnimation = () => {
            if (!containerRef.current)
                return;
            const container = containerRef.current;
            const spans = container.querySelectorAll('.fiEyesUI-wavy-text-span');
            spans.forEach((span, index) => {
                const element = span;
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
        React.useEffect(() => {
            if (autoPlay) {
                fiEyesUIStartWavyAnimation();
            }
            return () => {
                fiEyesUIStopWavyAnimation();
            };
        }, [autoPlay, repeatInterval]);
        React.useEffect(() => {
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
            return text.split('').map((char, index) => (jsxRuntime.jsx("span", { className: "fiEyesUI-wavy-text-span", style: {
                    '--i': index,
                    animationDelay: `${delayMultiplier * index}s`,
                    animationDuration: `${animationDuration}s`
                }, children: char === ' ' ? '\u00A0' : char }, index)));
        };
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
                    } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-wavy-text-container ${className}`, style: {
                        fontSize,
                        ...style
                    }, children: fiEyesUIRenderText() })] }));
    };

    const FiEyesUISlideLeft = ({ text = 'Welcome To Finches Eyes UI Components', fontSize = '50px', animationDuration = 1.5, letterDelay = 0.1, slideDistance = 200, autoPlay = true, repeatInterval = 0, onAnimationComplete, onAnimationStart, className = '', style = {} }) => {
        const containerRef = React.useRef(null);
        const animationRef = React.useRef(null);
        const fiEyesUIStartSlideLeftAnimation = () => {
            if (!containerRef.current)
                return;
            const container = containerRef.current;
            const spans = container.querySelectorAll('.fiEyesUI-slideLeft-span');
            spans.forEach((span, index) => {
                const element = span;
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
        React.useEffect(() => {
            if (autoPlay) {
                fiEyesUIStartSlideLeftAnimation();
            }
            return () => {
                fiEyesUIStopSlideLeftAnimation();
            };
        }, [autoPlay, repeatInterval]);
        React.useEffect(() => {
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
            return text.split('').map((char, index) => (jsxRuntime.jsx("span", { className: "fiEyesUI-slideLeft-span", style: {
                    animationDelay: `${letterDelay * index}s`,
                    animationDuration: `${animationDuration}s`
                }, children: char === ' ' ? '\u00A0' : char }, index)));
        };
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
                    } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-slideLeft-container ${className}`, style: {
                        fontSize,
                        ...style
                    }, children: jsxRuntime.jsx("h1", { className: "fiEyesUI-slideLeft-title", children: fiEyesUIRenderText() }) })] }));
    };

    const FiEyesUISlideReveal = ({ text = 'Welcome To Finches Eyes UI Components', fontSize = '25px', animationDuration = 1.1, letterSpacing = '3px', autoPlay = true, repeatInterval = 0, onAnimationComplete, onAnimationStart, className = '', style = {} }) => {
        const containerRef = React.useRef(null);
        const animationRef = React.useRef(null);
        const fiEyesUIStartSlideRevealAnimation = () => {
            if (!containerRef.current)
                return;
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
        React.useEffect(() => {
            if (autoPlay) {
                fiEyesUIStartSlideRevealAnimation();
            }
            return () => {
                fiEyesUIStopSlideRevealAnimation();
            };
        }, [autoPlay, repeatInterval]);
        React.useEffect(() => {
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
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
                    } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-slideReveal-container ${className}`, style: {
                        fontSize,
                        ...style
                    }, children: jsxRuntime.jsx("h1", { className: "fiEyesUI-slideReveal-title", children: jsxRuntime.jsx("div", { className: "fiEyesUI-slideReveal-text", children: text }) }) })] }));
    };

    const FiEyesUITextEffect1 = ({ text = 'Welcome To Finches Eyes UI Components', fontSize = '5rem', animationDuration = 2, autoPlay = true, repeatInterval = 0, onAnimationComplete, onAnimationStart, className = '', style = {} }) => {
        const containerRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const container = containerRef.current;
            const textElement = container.querySelector('.fiEyesUI-textEffect1-text');
            if (textElement) {
                textElement.innerHTML = '';
                const letters = text.split('');
                letters.forEach((letter, index) => {
                    const span = document.createElement('span');
                    span.textContent = letter === ' ' ? '\u00A0' : letter;
                    span.style.setProperty('--delay', `${index * 0.1}s`);
                    span.style.setProperty('--duration', `${animationDuration}s`);
                    textElement.appendChild(span);
                });
            }
            if (onAnimationStart) {
                onAnimationStart();
            }
        }, [text, animationDuration, onAnimationStart]);
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
                        __html: `
          .fiEyesUI-textEffect1-container {
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
          
          .fiEyesUI-textEffect1-text {
            font-size: 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
            line-height: 1.2;
          }
          
          .fiEyesUI-textEffect1-text span {
            display: inline-block;
            transform-style: preserve-3d;
            transform-origin: bottom;
            animation: fiEyesUI-anim1 var(--duration) linear infinite alternate;
            animation-delay: var(--delay);
            font-weight: bold;
            color: #000000;
            text-shadow: 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000;
          }
          
          @keyframes fiEyesUI-anim1 {
            0% {
              text-shadow: 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000;
              scale: 1 0;
            }
            100% {
              text-shadow: 0px 0px 2px #ffffff, 0px 0px 2px #ffffff, 0px 0px 2px #ffffff, 0px 0px 2px #ffffff;
              scale: 1 1;
            }
          }
        `
                    } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textEffect1-container ${className}`, style: {
                        fontSize,
                        ...style
                    }, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textEffect1-text" }) })] }));
    };

    const FiEyesUITextEffect2 = ({ text = 'Welcome To Finches Eyes UI Components', fontSize = '3rem', autoPlay = true, onAnimationComplete, onAnimationStart, className = '', style = {} }) => {
        const containerRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
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
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
                    } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textEffect2-container ${className}`, style: {
                        fontSize,
                        ...style
                    }, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textEffect2-text" }) })] }));
    };

    const FiEyesUITextEffect3 = ({ text = 'Welcome To Finches Eyes UI Components', fontSize = '3rem', autoPlay = true, onAnimationComplete, onAnimationStart, className = '', style = {} }) => {
        const containerRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
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
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
                    } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textEffect3-container ${className}`, style: {
                        fontSize,
                        ...style
                    }, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textEffect3-text" }) })] }));
    };

    const FiEyesUITextEffect4 = ({ text = 'Welcome To Finches Eyes UI Components', fontSize = '3rem', autoPlay = true, onAnimationComplete, onAnimationStart, className = '', style = {} }) => {
        const containerRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
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
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
                    } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textEffect4-container ${className}`, style: {
                        fontSize,
                        ...style
                    }, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textEffect4-text" }) })] }));
    };

    const FiEyesUITextEffect5 = ({ text = 'Welcome To Finches Eyes UI Components', fontSize = '3rem', autoPlay = true, onAnimationComplete, onAnimationStart, className = '', style = {} }) => {
        const containerRef = React.useRef(null);
        const [isDisintegrated, setIsDisintegrated] = React.useState(false);
        const fiEyesUIDisintegrate = () => {
            if (!containerRef.current)
                return;
            const container = containerRef.current;
            const spans = container.querySelectorAll('.fiEyesUI-textEffect5-text span');
            spans.forEach((span, index) => {
                const element = span;
                element.style.setProperty('--delay', `${index * 0.1}s`);
                element.style.setProperty('--duration', '1s');
                element.classList.add('fiEyesUI-disintegrate');
            });
            setIsDisintegrated(true);
            if (onAnimationComplete) {
                setTimeout(() => {
                    onAnimationComplete();
                }, 1000);
            }
        };
        React.useEffect(() => {
            if (!containerRef.current)
                return;
            const container = containerRef.current;
            const textElement = container.querySelector('.fiEyesUI-textEffect5-text');
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
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
                        __html: `
          .fiEyesUI-textEffect5-container {
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
            cursor: pointer;
          }
          
          .fiEyesUI-textEffect5-text {
            font-size: 1.5rem;
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
            line-height: 1.2;
          }
          
          .fiEyesUI-textEffect5-text span {
            position: relative;
            color: #ffffff;
            pointer-events: none;
          }
          
          .fiEyesUI-disintegrate {
            animation: fiEyesUI-anim5 var(--duration, 1s) linear forwards;
            animation-delay: calc(var(--delay, 0) * 1s);
          }
          
          @keyframes fiEyesUI-anim5 {
            0% {
              filter: blur(0px);
            }
            10% {
              filter: blur(0px);
            }
            100% {
              filter: blur(500px);
            }
          }
        `
                    } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textEffect5-container ${className}`, style: {
                        fontSize,
                        ...style
                    }, onClick: fiEyesUIDisintegrate, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textEffect5-text" }) })] }));
    };

    const FiEyesUITextEffect6 = ({ text = 'Welcome To Finches Eyes UI Components', fontSize = '3rem', autoPlay = true, onAnimationComplete, onAnimationStart, className = '', style = {} }) => {
        const containerRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
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
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
                    } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textEffect6-container ${className}`, style: {
                        fontSize,
                        ...style
                    }, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textEffect6-text" }) })] }));
    };

    const FiEyesUITextEffect7 = ({ text = 'Welcome To Finches Eyes UI Components', fontSize = '3rem', autoPlay = true, onAnimationComplete, onAnimationStart, className = '', style = {} }) => {
        const containerRef = React.useRef(null);
        React.useEffect(() => {
            if (!containerRef.current)
                return;
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
        return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
                    } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textEffect7-container ${className}`, style: {
                        fontSize,
                        ...style
                    }, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textEffect7-text" }) })] }));
    };

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
        function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
        var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
        var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
        var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
        var _, done = false;
        for (var i = decorators.length - 1; i >= 0; i--) {
            var context = {};
            for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
            for (var p in contextIn.access) context.access[p] = contextIn.access[p];
            context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
            var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
            if (kind === "accessor") {
                if (result === void 0) continue;
                if (result === null || typeof result !== "object") throw new TypeError("Object expected");
                if (_ = accept(result.get)) descriptor.get = _;
                if (_ = accept(result.set)) descriptor.set = _;
                if (_ = accept(result.init)) initializers.unshift(_);
            }
            else if (_ = accept(result)) {
                if (kind === "field") initializers.unshift(_);
                else descriptor[key] = _;
            }
        }
        if (target) Object.defineProperty(target, contextIn.name, descriptor);
        done = true;
    }
    function __runInitializers(thisArg, initializers, value) {
        var useValue = arguments.length > 2;
        for (var i = 0; i < initializers.length; i++) {
            value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
        }
        return useValue ? value : void 0;
    }
    function __setFunctionName(f, name, prefix) {
        if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
        return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
    }
    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    let FiEyesUIAnimationService = (() => {
        let _classDecorators = [core.Injectable({
                providedIn: 'root'
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        _classThis = class {
            constructor() {
                this.fiEyesUIAnimationEngine = new FiEyesUIAnimationEngine();
                this.animations = new Map();
            }
            createAnimation(elementRef, options) {
                const animation = this.fiEyesUIAnimationEngine.createAnimation({
                    element: elementRef.nativeElement,
                    keyframes: options.keyframes,
                    config: options.config,
                    onStart: options.onStart,
                    onEnd: options.onEnd,
                    onIteration: options.onIteration
                });
                this.animations.set(elementRef, animation);
                return animation;
            }
            play(elementRef) {
                const animation = this.animations.get(elementRef);
                if (animation) {
                    animation.play();
                }
            }
            pause(elementRef) {
                const animation = this.animations.get(elementRef);
                if (animation) {
                    animation.pause();
                }
            }
            reverse(elementRef) {
                const animation = this.animations.get(elementRef);
                if (animation) {
                    animation.reverse();
                }
            }
            finish(elementRef) {
                const animation = this.animations.get(elementRef);
                if (animation) {
                    animation.finish();
                }
            }
            cancel(elementRef) {
                const animation = this.animations.get(elementRef);
                if (animation) {
                    animation.cancel();
                    this.animations.delete(elementRef);
                }
            }
            getAnimation(elementRef) {
                return this.animations.get(elementRef);
            }
            pauseAll() {
                this.animations.forEach(animation => animation.pause());
            }
            resumeAll() {
                this.animations.forEach(animation => animation.play());
            }
            cancelAll() {
                this.animations.forEach(animation => animation.cancel());
                this.animations.clear();
            }
        };
        __setFunctionName(_classThis, "FiEyesUIAnimationService");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUIAnimationDirective = (() => {
        let _classDecorators = [core.Directive({
                selector: '[fiEyesUIAnimate]',
                exportAs: 'fiEyesUIAnimate'
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _instanceExtraInitializers = [];
        let _fiEyesUIKeyframes_decorators;
        let _fiEyesUIKeyframes_initializers = [];
        let _fiEyesUIKeyframes_extraInitializers = [];
        let _fiEyesUIConfig_decorators;
        let _fiEyesUIConfig_initializers = [];
        let _fiEyesUIConfig_extraInitializers = [];
        let _fiEyesUIPreset_decorators;
        let _fiEyesUIPreset_initializers = [];
        let _fiEyesUIPreset_extraInitializers = [];
        let _fiEyesUIAutoPlay_decorators;
        let _fiEyesUIAutoPlay_initializers = [];
        let _fiEyesUIAutoPlay_extraInitializers = [];
        let _fiEyesUITrigger_decorators;
        let _fiEyesUITrigger_initializers = [];
        let _fiEyesUITrigger_extraInitializers = [];
        let _animationStart_decorators;
        let _animationStart_initializers = [];
        let _animationStart_extraInitializers = [];
        let _animationEnd_decorators;
        let _animationEnd_initializers = [];
        let _animationEnd_extraInitializers = [];
        let _animationIteration_decorators;
        let _animationIteration_initializers = [];
        let _animationIteration_extraInitializers = [];
        let _onClick_decorators;
        let _onMouseEnter_decorators;
        let _onFocus_decorators;
        _classThis = class {
            constructor(elementRef, fiEyesUIAnimationService) {
                this.elementRef = (__runInitializers(this, _instanceExtraInitializers), elementRef);
                this.fiEyesUIAnimationService = fiEyesUIAnimationService;
                this.fiEyesUIKeyframes = __runInitializers(this, _fiEyesUIKeyframes_initializers, void 0);
                this.fiEyesUIConfig = (__runInitializers(this, _fiEyesUIKeyframes_extraInitializers), __runInitializers(this, _fiEyesUIConfig_initializers, void 0));
                this.fiEyesUIPreset = (__runInitializers(this, _fiEyesUIConfig_extraInitializers), __runInitializers(this, _fiEyesUIPreset_initializers, void 0));
                this.fiEyesUIAutoPlay = (__runInitializers(this, _fiEyesUIPreset_extraInitializers), __runInitializers(this, _fiEyesUIAutoPlay_initializers, false));
                this.fiEyesUITrigger = (__runInitializers(this, _fiEyesUIAutoPlay_extraInitializers), __runInitializers(this, _fiEyesUITrigger_initializers, void 0));
                this.animationStart = (__runInitializers(this, _fiEyesUITrigger_extraInitializers), __runInitializers(this, _animationStart_initializers, new core.EventEmitter()));
                this.animationEnd = (__runInitializers(this, _animationStart_extraInitializers), __runInitializers(this, _animationEnd_initializers, new core.EventEmitter()));
                this.animationIteration = (__runInitializers(this, _animationEnd_extraInitializers), __runInitializers(this, _animationIteration_initializers, new core.EventEmitter()));
                this.animation = __runInitializers(this, _animationIteration_extraInitializers);
                this.isPlaying = false;
                this.isPaused = false;
                this.isFinished = false;
            }
            ngOnInit() {
                this.createAnimation();
                if (this.fiEyesUIAutoPlay) {
                    this.play();
                }
            }
            ngOnDestroy() {
                this.fiEyesUIAnimationService.cancel(this.elementRef);
            }
            createAnimation() {
                const options = {
                    keyframes: this.fiEyesUIKeyframes,
                    config: this.fiEyesUIConfig,
                    preset: this.fiEyesUIPreset,
                    onStart: () => {
                        this.isPlaying = true;
                        this.isPaused = false;
                        this.isFinished = false;
                        this.animationStart.emit();
                    },
                    onEnd: () => {
                        this.isPlaying = false;
                        this.isPaused = false;
                        this.isFinished = true;
                        this.animationEnd.emit();
                    },
                    onIteration: () => {
                        this.animationIteration.emit();
                    },
                };
                this.animation = this.fiEyesUIAnimationService.createAnimation(this.elementRef, options);
            }
            onClick() {
                if (this.fiEyesUITrigger === 'click') {
                    this.play();
                }
            }
            onMouseEnter() {
                if (this.fiEyesUITrigger === 'hover') {
                    this.play();
                }
            }
            onFocus() {
                if (this.fiEyesUITrigger === 'focus') {
                    this.play();
                }
            }
            play() {
                if (this.animation) {
                    this.animation.play();
                }
                else {
                    this.createAnimation();
                    this.animation?.play();
                }
            }
            pause() {
                this.animation?.pause();
                this.isPlaying = false;
                this.isPaused = true;
            }
            reverse() {
                this.animation?.reverse();
            }
            finish() {
                this.animation?.finish();
                this.isPlaying = false;
                this.isPaused = false;
                this.isFinished = true;
            }
            cancel() {
                this.fiEyesUIAnimationService.cancel(this.elementRef);
                this.animation = undefined;
                this.isPlaying = false;
                this.isPaused = false;
                this.isFinished = false;
            }
            get playing() {
                return this.isPlaying;
            }
            get paused() {
                return this.isPaused;
            }
            get finished() {
                return this.isFinished;
            }
        };
        __setFunctionName(_classThis, "FiEyesUIAnimationDirective");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _fiEyesUIKeyframes_decorators = [core.Input()];
            _fiEyesUIConfig_decorators = [core.Input()];
            _fiEyesUIPreset_decorators = [core.Input()];
            _fiEyesUIAutoPlay_decorators = [core.Input()];
            _fiEyesUITrigger_decorators = [core.Input()];
            _animationStart_decorators = [core.Output()];
            _animationEnd_decorators = [core.Output()];
            _animationIteration_decorators = [core.Output()];
            _onClick_decorators = [core.HostListener('click')];
            _onMouseEnter_decorators = [core.HostListener('mouseenter')];
            _onFocus_decorators = [core.HostListener('focus')];
            __esDecorate(_classThis, null, _onClick_decorators, { kind: "method", name: "onClick", static: false, private: false, access: { has: obj => "onClick" in obj, get: obj => obj.onClick }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_classThis, null, _onMouseEnter_decorators, { kind: "method", name: "onMouseEnter", static: false, private: false, access: { has: obj => "onMouseEnter" in obj, get: obj => obj.onMouseEnter }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_classThis, null, _onFocus_decorators, { kind: "method", name: "onFocus", static: false, private: false, access: { has: obj => "onFocus" in obj, get: obj => obj.onFocus }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _fiEyesUIKeyframes_decorators, { kind: "field", name: "fiEyesUIKeyframes", static: false, private: false, access: { has: obj => "fiEyesUIKeyframes" in obj, get: obj => obj.fiEyesUIKeyframes, set: (obj, value) => { obj.fiEyesUIKeyframes = value; } }, metadata: _metadata }, _fiEyesUIKeyframes_initializers, _fiEyesUIKeyframes_extraInitializers);
            __esDecorate(null, null, _fiEyesUIConfig_decorators, { kind: "field", name: "fiEyesUIConfig", static: false, private: false, access: { has: obj => "fiEyesUIConfig" in obj, get: obj => obj.fiEyesUIConfig, set: (obj, value) => { obj.fiEyesUIConfig = value; } }, metadata: _metadata }, _fiEyesUIConfig_initializers, _fiEyesUIConfig_extraInitializers);
            __esDecorate(null, null, _fiEyesUIPreset_decorators, { kind: "field", name: "fiEyesUIPreset", static: false, private: false, access: { has: obj => "fiEyesUIPreset" in obj, get: obj => obj.fiEyesUIPreset, set: (obj, value) => { obj.fiEyesUIPreset = value; } }, metadata: _metadata }, _fiEyesUIPreset_initializers, _fiEyesUIPreset_extraInitializers);
            __esDecorate(null, null, _fiEyesUIAutoPlay_decorators, { kind: "field", name: "fiEyesUIAutoPlay", static: false, private: false, access: { has: obj => "fiEyesUIAutoPlay" in obj, get: obj => obj.fiEyesUIAutoPlay, set: (obj, value) => { obj.fiEyesUIAutoPlay = value; } }, metadata: _metadata }, _fiEyesUIAutoPlay_initializers, _fiEyesUIAutoPlay_extraInitializers);
            __esDecorate(null, null, _fiEyesUITrigger_decorators, { kind: "field", name: "fiEyesUITrigger", static: false, private: false, access: { has: obj => "fiEyesUITrigger" in obj, get: obj => obj.fiEyesUITrigger, set: (obj, value) => { obj.fiEyesUITrigger = value; } }, metadata: _metadata }, _fiEyesUITrigger_initializers, _fiEyesUITrigger_extraInitializers);
            __esDecorate(null, null, _animationStart_decorators, { kind: "field", name: "animationStart", static: false, private: false, access: { has: obj => "animationStart" in obj, get: obj => obj.animationStart, set: (obj, value) => { obj.animationStart = value; } }, metadata: _metadata }, _animationStart_initializers, _animationStart_extraInitializers);
            __esDecorate(null, null, _animationEnd_decorators, { kind: "field", name: "animationEnd", static: false, private: false, access: { has: obj => "animationEnd" in obj, get: obj => obj.animationEnd, set: (obj, value) => { obj.animationEnd = value; } }, metadata: _metadata }, _animationEnd_initializers, _animationEnd_extraInitializers);
            __esDecorate(null, null, _animationIteration_decorators, { kind: "field", name: "animationIteration", static: false, private: false, access: { has: obj => "animationIteration" in obj, get: obj => obj.animationIteration, set: (obj, value) => { obj.animationIteration = value; } }, metadata: _metadata }, _animationIteration_initializers, _animationIteration_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUITextDropComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-textDrop',
                template: `
    <div 
      #textDropContainer
      class="fiEyesUI-textDrop-container"
      [style.font-size]="fontSize"
      [class]="className"
      [style]="style"
    ></div>
  `,
                styles: [`
    .fiEyesUI-textDrop-container {
      font-family: 'Orbitron', sans-serif;
      font-weight: 400;
      text-align: center;
      margin: 0;
      padding: 20px;
      background-color: #000000;
      color: #ffffff;
      min-height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text_decorators;
        let _text_initializers = [];
        let _text_extraInitializers = [];
        let _fontSize_decorators;
        let _fontSize_initializers = [];
        let _fontSize_extraInitializers = [];
        let _color_decorators;
        let _color_initializers = [];
        let _color_extraInitializers = [];
        let _secondaryColor_decorators;
        let _secondaryColor_initializers = [];
        let _secondaryColor_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _delayRange_decorators;
        let _delayRange_initializers = [];
        let _delayRange_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _textDropContainerRef_decorators;
        let _textDropContainerRef_initializers = [];
        let _textDropContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text = __runInitializers(this, _text_initializers, 'Welcome To Finches Eyes UI Components');
                this.fontSize = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _fontSize_initializers, '3em'));
                this.color = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _color_initializers, '#ffffff'));
                this.secondaryColor = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _secondaryColor_initializers, '#ffffff'));
                this.animationDuration = (__runInitializers(this, _secondaryColor_extraInitializers), __runInitializers(this, _animationDuration_initializers, 1.2));
                this.delayRange = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _delayRange_initializers, { min: 1, max: 9 }));
                this.className = (__runInitializers(this, _delayRange_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.textDropContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _textDropContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _textDropContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.textDropContainerRef?.nativeElement)
                    return;
                const fiEyesUIContainer = this.textDropContainerRef.nativeElement;
                const fiEyesUIText = this.text;
                const fiEyesUICharacters = fiEyesUIText.split('');
                // Clear container
                fiEyesUIContainer.innerHTML = '';
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                // Create random delay function
                const fiEyesUIRandomDelay = (min, max) => {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                };
                let fiEyesUICharacterIndex = 0;
                const fiEyesUIMaxDelay = Math.max(...Array.from({ length: fiEyesUICharacters.length }, (_, i) => fiEyesUIRandomDelay(this.delayRange.min, this.delayRange.max)));
                fiEyesUICharacters.forEach((fiEyesUIChar, fiEyesUIIndex) => {
                    const fiEyesUIDelay = fiEyesUIRandomDelay(this.delayRange.min, this.delayRange.max);
                    const fiEyesUISpan = document.createElement('span');
                    fiEyesUISpan.className = `fiEyesUI-letterDrop fiEyesUI-ld${fiEyesUIDelay}`;
                    fiEyesUISpan.style.color = this.color;
                    // Add secondary color to even characters
                    if (fiEyesUIIndex % 2 === 1) {
                        fiEyesUISpan.classList.add('fiEyesUI-secondary');
                    }
                    fiEyesUISpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
                    fiEyesUIContainer.appendChild(fiEyesUISpan);
                    // Track completion
                    fiEyesUICharacterIndex++;
                    if (fiEyesUICharacterIndex === fiEyesUICharacters.length) {
                        const fiEyesUIMaxAnimationTime = (fiEyesUIMaxDelay / 10) * 1000 + (this.animationDuration * 1000);
                        setTimeout(() => {
                            this.complete.emit();
                        }, fiEyesUIMaxAnimationTime);
                    }
                });
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-textDrop-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-letterDrop {
        position: relative;
        top: 0;
        display: inline-block;
        text-transform: uppercase;
        letter-spacing: 0.5em;
        opacity: 0.8;
        transform: rotateX(-90deg);
        animation: fiEyesUILetterDrop ${this.animationDuration}s ease 1 normal forwards;
      }
      
      .fiEyesUI-letterDrop.fiEyesUI-secondary {
        color: ${this.secondaryColor};
      }
      
      @keyframes fiEyesUILetterDrop {
        10% {
          opacity: 0.5;
        }
        20% {
          opacity: 0.8;
          top: 3.75em;
          transform: rotateX(-360deg);
        }
        100% {
          opacity: 1;
          top: 4.50em;
          transform: rotateX(360deg);
        }
      }
    `;
                // Add delay classes
                for (let i = this.delayRange.min; i <= this.delayRange.max; i++) {
                    this.fiEyesUIStyleElement.textContent += `
        .fiEyesUI-ld${i} { 
          animation-delay: 1.${i}s; 
        }
      `;
                }
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUITextDropComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [core.Input()];
            _fontSize_decorators = [core.Input()];
            _color_decorators = [core.Input()];
            _secondaryColor_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _delayRange_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _textDropContainerRef_decorators = [core.ViewChild('textDropContainer')];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(null, null, _secondaryColor_decorators, { kind: "field", name: "secondaryColor", static: false, private: false, access: { has: obj => "secondaryColor" in obj, get: obj => obj.secondaryColor, set: (obj, value) => { obj.secondaryColor = value; } }, metadata: _metadata }, _secondaryColor_initializers, _secondaryColor_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _delayRange_decorators, { kind: "field", name: "delayRange", static: false, private: false, access: { has: obj => "delayRange" in obj, get: obj => obj.delayRange, set: (obj, value) => { obj.delayRange = value; } }, metadata: _metadata }, _delayRange_initializers, _delayRange_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _textDropContainerRef_decorators, { kind: "field", name: "textDropContainerRef", static: false, private: false, access: { has: obj => "textDropContainerRef" in obj, get: obj => obj.textDropContainerRef, set: (obj, value) => { obj.textDropContainerRef = value; } }, metadata: _metadata }, _textDropContainerRef_initializers, _textDropContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUIFlyInOutComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-flyInOut',
                template: `
    <div 
      #flyInOutContainer
      class="fiEyesUI-flyInOut-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-flyInOut-content">
        <p 
          #flyInOutTyper
          class="fiEyesUI-flyInOut-typer"
          [style.font-size]="fontSize"
          [style.color]="color"
        >
          {{ text }}
        </p>
      </div>
    </div>
  `,
                styles: [`
    .fiEyesUI-flyInOut-container {
      font-family: 'Orbitron', sans-serif;
      margin: 0 auto;
      position: relative;
      z-index: 2;
      display: table;
      width: 100%;
      background-color: #000000;
      color: #ffffff;
      padding: 20px;
      min-height: 120px;
    }

    .fiEyesUI-flyInOut-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .fiEyesUI-flyInOut-typer {
      display: table;
      text-align: center;
      vertical-align: middle;
      margin: 0 auto;
      padding: 15% 0;
      line-height: 3em;
      letter-spacing: 0.5em;
      text-transform: uppercase;
    }

    .fiEyesUI-flyInOut-typer i {
      display: inline-block;
      font-style: normal;
      padding: 0 0.25em;
      transform: scale(0);
      transition: all 1s ease;
    }

    .fiEyesUI-flyInOut-typer i.fiEyesUIFlyInOut {
      animation: fiEyesUIFlyInOut 4s infinite ease-in-out;
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text_decorators;
        let _text_initializers = [];
        let _text_extraInitializers = [];
        let _fontSize_decorators;
        let _fontSize_initializers = [];
        let _fontSize_extraInitializers = [];
        let _color_decorators;
        let _color_initializers = [];
        let _color_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _animationSpeed_decorators;
        let _animationSpeed_initializers = [];
        let _animationSpeed_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _flyInOutContainerRef_decorators;
        let _flyInOutContainerRef_initializers = [];
        let _flyInOutContainerRef_extraInitializers = [];
        let _flyInOutTyperRef_decorators;
        let _flyInOutTyperRef_initializers = [];
        let _flyInOutTyperRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text = __runInitializers(this, _text_initializers, 'Welcome To Finches Eyes UI Components');
                this.fontSize = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _fontSize_initializers, '3em'));
                this.color = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _color_initializers, '#ffffff'));
                this.animationDuration = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _animationDuration_initializers, 4));
                this.animationSpeed = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _animationSpeed_initializers, 100));
                this.className = (__runInitializers(this, _animationSpeed_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.flyInOutContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _flyInOutContainerRef_initializers, void 0));
                this.flyInOutTyperRef = (__runInitializers(this, _flyInOutContainerRef_extraInitializers), __runInitializers(this, _flyInOutTyperRef_initializers, void 0));
                this.fiEyesUIAnimationTimeout = __runInitializers(this, _flyInOutTyperRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.flyInOutTyperRef?.nativeElement)
                    return;
                const fiEyesUIParagraph = this.flyInOutTyperRef.nativeElement;
                const fiEyesUIText = this.text;
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
                    this.fiEyesUIAnimationTimeout = window.setTimeout(() => {
                        fiEyesUIWrappedChars[j].className = 'fiEyesUIFlyInOut';
                        j += 1;
                        if (j < fiEyesUIWrappedCharsLen) {
                            fiEyesUIAddEffect();
                        }
                        else {
                            // Animation completed
                            setTimeout(() => {
                                this.complete.emit();
                            }, this.animationDuration * 1000);
                        }
                    }, this.animationSpeed);
                };
                fiEyesUIAddEffect();
            }
            fiEyesUICleanup() {
                if (this.fiEyesUIAnimationTimeout) {
                    clearTimeout(this.fiEyesUIAnimationTimeout);
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUIFlyInOutComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [core.Input()];
            _fontSize_decorators = [core.Input()];
            _color_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _animationSpeed_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _flyInOutContainerRef_decorators = [core.ViewChild('flyInOutContainer')];
            _flyInOutTyperRef_decorators = [core.ViewChild('flyInOutTyper')];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _animationSpeed_decorators, { kind: "field", name: "animationSpeed", static: false, private: false, access: { has: obj => "animationSpeed" in obj, get: obj => obj.animationSpeed, set: (obj, value) => { obj.animationSpeed = value; } }, metadata: _metadata }, _animationSpeed_initializers, _animationSpeed_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _flyInOutContainerRef_decorators, { kind: "field", name: "flyInOutContainerRef", static: false, private: false, access: { has: obj => "flyInOutContainerRef" in obj, get: obj => obj.flyInOutContainerRef, set: (obj, value) => { obj.flyInOutContainerRef = value; } }, metadata: _metadata }, _flyInOutContainerRef_initializers, _flyInOutContainerRef_extraInitializers);
            __esDecorate(null, null, _flyInOutTyperRef_decorators, { kind: "field", name: "flyInOutTyperRef", static: false, private: false, access: { has: obj => "flyInOutTyperRef" in obj, get: obj => obj.flyInOutTyperRef, set: (obj, value) => { obj.flyInOutTyperRef = value; } }, metadata: _metadata }, _flyInOutTyperRef_initializers, _flyInOutTyperRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUIBlurRevealComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-blurReveal',
                template: `
    <div 
      #blurRevealContainer
      class="fiEyesUI-blurReveal-container"
      [style.font-size]="fontSize"
      [class]="className"
      [style]="style"
    ></div>
  `,
                styles: [`
    .fiEyesUI-blurReveal-container {
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
    }
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text_decorators;
        let _text_initializers = [];
        let _text_extraInitializers = [];
        let _fontSize_decorators;
        let _fontSize_initializers = [];
        let _fontSize_extraInitializers = [];
        let _color_decorators;
        let _color_initializers = [];
        let _color_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _letterDelay_decorators;
        let _letterDelay_initializers = [];
        let _letterDelay_extraInitializers = [];
        let _autoRepeat_decorators;
        let _autoRepeat_initializers = [];
        let _autoRepeat_extraInitializers = [];
        let _repeatInterval_decorators;
        let _repeatInterval_initializers = [];
        let _repeatInterval_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _blurRevealContainerRef_decorators;
        let _blurRevealContainerRef_initializers = [];
        let _blurRevealContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text = __runInitializers(this, _text_initializers, 'Welcome To Finches Eyes UI Components');
                this.fontSize = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _fontSize_initializers, '32px'));
                this.color = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _color_initializers, '#ffffff'));
                this.animationDuration = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _animationDuration_initializers, 550));
                this.letterDelay = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _letterDelay_initializers, 35));
                this.autoRepeat = (__runInitializers(this, _letterDelay_extraInitializers), __runInitializers(this, _autoRepeat_initializers, true));
                this.repeatInterval = (__runInitializers(this, _autoRepeat_extraInitializers), __runInitializers(this, _repeatInterval_initializers, 2000));
                this.className = (__runInitializers(this, _repeatInterval_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.blurRevealContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _blurRevealContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _blurRevealContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.blurRevealContainerRef?.nativeElement)
                    return;
                const fiEyesUIContainer = this.blurRevealContainerRef.nativeElement;
                const fiEyesUIText = this.text;
                const fiEyesUICharacters = fiEyesUIText.split('');
                // Clear container
                fiEyesUIContainer.innerHTML = '';
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                // Create spans for each character
                fiEyesUICharacters.forEach((fiEyesUIChar) => {
                    const fiEyesUISpan = document.createElement('span');
                    fiEyesUISpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
                    fiEyesUIContainer.appendChild(fiEyesUISpan);
                });
                // Start animation
                this.fiEyesUIStartAnimation();
                // Start auto repeat if enabled
                if (this.autoRepeat) {
                    this.fiEyesUIStartAutoRepeat();
                }
            }
            fiEyesUIStartAnimation() {
                if (!this.blurRevealContainerRef?.nativeElement)
                    return;
                const fiEyesUIContainer = this.blurRevealContainerRef.nativeElement;
                fiEyesUIContainer.classList.add('animate');
                // Calculate total animation time
                const totalTime = (this.text.length * this.letterDelay) + this.animationDuration;
                setTimeout(() => {
                    this.complete.emit();
                }, totalTime);
            }
            fiEyesUIStartAutoRepeat() {
                this.intervalRef = setInterval(() => {
                    if (this.blurRevealContainerRef?.nativeElement) {
                        this.blurRevealContainerRef.nativeElement.classList.remove('animate');
                        setTimeout(() => {
                            this.fiEyesUIStartAnimation();
                        }, 100);
                    }
                }, this.repeatInterval);
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-blurReveal-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-blurReveal-container {
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
      }
      
      .fiEyesUI-blurReveal-text {
        color: ${this.color};
        font-size: ${this.fontSize};
        text-align: center;
        font-family: 'Orbitron', sans-serif;
        font-weight: 600;
      }
      
      .fiEyesUI-blurReveal-text span {
        opacity: 0;
        transition: all ${this.animationDuration}ms ease;
        filter: blur(25px);
        transform: translateZ(0);
        display: inline-block;
      }
      
      .fiEyesUI-blurReveal-text.animate span {
        opacity: 1;
        filter: blur(0px);
      }
    `;
                // Add delay classes for each character
                const fiEyesUICharacters = this.text.split('');
                fiEyesUICharacters.forEach((_, index) => {
                    const delay = this.letterDelay * (index + 1);
                    this.fiEyesUIStyleElement.textContent += `
        .fiEyesUI-blurReveal-text span:nth-child(${index + 1}) {
          transition-delay: ${delay}ms;
        }
      `;
                });
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.intervalRef) {
                    clearInterval(this.intervalRef);
                }
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUIBlurRevealComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [core.Input()];
            _fontSize_decorators = [core.Input()];
            _color_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _letterDelay_decorators = [core.Input()];
            _autoRepeat_decorators = [core.Input()];
            _repeatInterval_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _blurRevealContainerRef_decorators = [core.ViewChild('blurRevealContainer')];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _letterDelay_decorators, { kind: "field", name: "letterDelay", static: false, private: false, access: { has: obj => "letterDelay" in obj, get: obj => obj.letterDelay, set: (obj, value) => { obj.letterDelay = value; } }, metadata: _metadata }, _letterDelay_initializers, _letterDelay_extraInitializers);
            __esDecorate(null, null, _autoRepeat_decorators, { kind: "field", name: "autoRepeat", static: false, private: false, access: { has: obj => "autoRepeat" in obj, get: obj => obj.autoRepeat, set: (obj, value) => { obj.autoRepeat = value; } }, metadata: _metadata }, _autoRepeat_initializers, _autoRepeat_extraInitializers);
            __esDecorate(null, null, _repeatInterval_decorators, { kind: "field", name: "repeatInterval", static: false, private: false, access: { has: obj => "repeatInterval" in obj, get: obj => obj.repeatInterval, set: (obj, value) => { obj.repeatInterval = value; } }, metadata: _metadata }, _repeatInterval_initializers, _repeatInterval_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _blurRevealContainerRef_decorators, { kind: "field", name: "blurRevealContainerRef", static: false, private: false, access: { has: obj => "blurRevealContainerRef" in obj, get: obj => obj.blurRevealContainerRef, set: (obj, value) => { obj.blurRevealContainerRef = value; } }, metadata: _metadata }, _blurRevealContainerRef_initializers, _blurRevealContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUILetterBounceComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-letterBounce',
                template: `
    <div 
      #letterBounceContainer
      class="fiEyesUI-letterBounce-container"
      [style.font-size]="fontSize"
      [class]="className"
      [style]="style"
    ></div>
  `,
                styles: [`
    .fiEyesUI-letterBounce-container {
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text_decorators;
        let _text_initializers = [];
        let _text_extraInitializers = [];
        let _fontSize_decorators;
        let _fontSize_initializers = [];
        let _fontSize_extraInitializers = [];
        let _color_decorators;
        let _color_initializers = [];
        let _color_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _letterDelay_decorators;
        let _letterDelay_initializers = [];
        let _letterDelay_extraInitializers = [];
        let _loop_decorators;
        let _loop_initializers = [];
        let _loop_extraInitializers = [];
        let _direction_decorators;
        let _direction_initializers = [];
        let _direction_extraInitializers = [];
        let _easing_decorators;
        let _easing_initializers = [];
        let _easing_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _letterBounceContainerRef_decorators;
        let _letterBounceContainerRef_initializers = [];
        let _letterBounceContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text = __runInitializers(this, _text_initializers, 'Welcome To Finches Eyes UI Components');
                this.fontSize = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _fontSize_initializers, '4rem'));
                this.color = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _color_initializers, '#ffffff'));
                this.animationDuration = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _animationDuration_initializers, 800));
                this.letterDelay = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _letterDelay_initializers, 80));
                this.loop = (__runInitializers(this, _letterDelay_extraInitializers), __runInitializers(this, _loop_initializers, true));
                this.direction = (__runInitializers(this, _loop_extraInitializers), __runInitializers(this, _direction_initializers, 'alternate'));
                this.easing = (__runInitializers(this, _direction_extraInitializers), __runInitializers(this, _easing_initializers, 'easeInBounce'));
                this.className = (__runInitializers(this, _easing_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.letterBounceContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _letterBounceContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _letterBounceContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.letterBounceContainerRef?.nativeElement)
                    return;
                const fiEyesUIContainer = this.letterBounceContainerRef.nativeElement;
                const fiEyesUIText = this.text;
                const fiEyesUICharacters = fiEyesUIText.split('');
                // Clear container
                fiEyesUIContainer.innerHTML = '';
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                // Create name container
                const fiEyesUINameDiv = document.createElement('div');
                fiEyesUINameDiv.className = 'fiEyesUI-letterBounce-name';
                // Create letter divs for each character
                fiEyesUICharacters.forEach((fiEyesUIChar) => {
                    const fiEyesUILetterDiv = document.createElement('div');
                    fiEyesUILetterDiv.className = 'fiEyesUI-letterBounce-letter';
                    fiEyesUILetterDiv.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
                    fiEyesUINameDiv.appendChild(fiEyesUILetterDiv);
                });
                fiEyesUIContainer.appendChild(fiEyesUINameDiv);
                // Start animation
                this.fiEyesUIStartAnimation();
            }
            fiEyesUIStartAnimation() {
                if (!this.letterBounceContainerRef?.nativeElement)
                    return;
                const fiEyesUIContainer = this.letterBounceContainerRef.nativeElement;
                const fiEyesUILetters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-letterBounce-letter');
                // Animate each letter with delay
                fiEyesUILetters.forEach((fiEyesUILetter, fiEyesUIIndex) => {
                    setTimeout(() => {
                        fiEyesUILetter.style.opacity = '1';
                        fiEyesUILetter.style.transform = 'scale(1)';
                        fiEyesUILetter.style.transition = `all ${this.animationDuration}ms ${this.easing}`;
                    }, fiEyesUIIndex * this.letterDelay);
                });
                // Calculate total animation time
                const totalTime = (this.text.length * this.letterDelay) + this.animationDuration;
                this.animationTimeout = setTimeout(() => {
                    this.complete.emit();
                    // If loop is enabled, restart animation
                    if (this.loop) {
                        setTimeout(() => {
                            this.fiEyesUIResetAndRestart();
                        }, 1000);
                    }
                }, totalTime);
            }
            fiEyesUIResetAndRestart() {
                if (!this.letterBounceContainerRef?.nativeElement)
                    return;
                const fiEyesUIContainer = this.letterBounceContainerRef.nativeElement;
                const fiEyesUILetters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-letterBounce-letter');
                fiEyesUILetters.forEach((fiEyesUILetter) => {
                    fiEyesUILetter.style.opacity = '0';
                    fiEyesUILetter.style.transform = 'scale(0.9)';
                });
                setTimeout(() => {
                    this.fiEyesUIStartAnimation();
                }, 100);
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-letterBounce-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-letterBounce-container {
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
      
      .fiEyesUI-letterBounce-container:before {
        content: '';
        width: 100%;
        background: ${this.color};
        opacity: 0.3;
        bottom: 0;
        height: 1px;
        left: 0;
        position: absolute;
      }
      
      .fiEyesUI-letterBounce-name {
        display: flex;
        margin: auto;
        padding: 0 1rem 1rem;
        position: relative;
      }
      
      .fiEyesUI-letterBounce-letter {
        display: inline-block;
        opacity: 0;
        transform: scale(0.9);
        color: ${this.color};
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
        font-weight: 600;
      }
    `;
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.animationTimeout) {
                    clearTimeout(this.animationTimeout);
                }
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUILetterBounceComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [core.Input()];
            _fontSize_decorators = [core.Input()];
            _color_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _letterDelay_decorators = [core.Input()];
            _loop_decorators = [core.Input()];
            _direction_decorators = [core.Input()];
            _easing_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _letterBounceContainerRef_decorators = [core.ViewChild('letterBounceContainer')];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _letterDelay_decorators, { kind: "field", name: "letterDelay", static: false, private: false, access: { has: obj => "letterDelay" in obj, get: obj => obj.letterDelay, set: (obj, value) => { obj.letterDelay = value; } }, metadata: _metadata }, _letterDelay_initializers, _letterDelay_extraInitializers);
            __esDecorate(null, null, _loop_decorators, { kind: "field", name: "loop", static: false, private: false, access: { has: obj => "loop" in obj, get: obj => obj.loop, set: (obj, value) => { obj.loop = value; } }, metadata: _metadata }, _loop_initializers, _loop_extraInitializers);
            __esDecorate(null, null, _direction_decorators, { kind: "field", name: "direction", static: false, private: false, access: { has: obj => "direction" in obj, get: obj => obj.direction, set: (obj, value) => { obj.direction = value; } }, metadata: _metadata }, _direction_initializers, _direction_extraInitializers);
            __esDecorate(null, null, _easing_decorators, { kind: "field", name: "easing", static: false, private: false, access: { has: obj => "easing" in obj, get: obj => obj.easing, set: (obj, value) => { obj.easing = value; } }, metadata: _metadata }, _easing_initializers, _easing_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _letterBounceContainerRef_decorators, { kind: "field", name: "letterBounceContainerRef", static: false, private: false, access: { has: obj => "letterBounceContainerRef" in obj, get: obj => obj.letterBounceContainerRef, set: (obj, value) => { obj.letterBounceContainerRef = value; } }, metadata: _metadata }, _letterBounceContainerRef_initializers, _letterBounceContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUITextScaleComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-textScale',
                template: `
    <div 
      #textScaleContainer
      class="fiEyesUI-textScale-container"
      [style.font-size]="fontSize"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-textScale-appendText"></div>
    </div>
  `,
                styles: [`
    .fiEyesUI-textScale-container {
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text_decorators;
        let _text_initializers = [];
        let _text_extraInitializers = [];
        let _fontSize_decorators;
        let _fontSize_initializers = [];
        let _fontSize_extraInitializers = [];
        let _color_decorators;
        let _color_initializers = [];
        let _color_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _animationDelay_decorators;
        let _animationDelay_initializers = [];
        let _animationDelay_extraInitializers = [];
        let _autoPlay_decorators;
        let _autoPlay_initializers = [];
        let _autoPlay_extraInitializers = [];
        let _repeatInterval_decorators;
        let _repeatInterval_initializers = [];
        let _repeatInterval_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _textScaleContainerRef_decorators;
        let _textScaleContainerRef_initializers = [];
        let _textScaleContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text = __runInitializers(this, _text_initializers, 'Welcome To Finches Eyes UI Components');
                this.fontSize = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _fontSize_initializers, '80px'));
                this.color = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _color_initializers, '#ffffff'));
                this.animationDuration = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _animationDuration_initializers, 1500));
                this.animationDelay = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _animationDelay_initializers, 0));
                this.autoPlay = (__runInitializers(this, _animationDelay_extraInitializers), __runInitializers(this, _autoPlay_initializers, true));
                this.repeatInterval = (__runInitializers(this, _autoPlay_extraInitializers), __runInitializers(this, _repeatInterval_initializers, 3000));
                this.className = (__runInitializers(this, _repeatInterval_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.textScaleContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _textScaleContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _textScaleContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.textScaleContainerRef?.nativeElement)
                    return;
                this.textScaleContainerRef.nativeElement;
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                // Split text into characters
                this.fiEyesUISplitText();
                if (this.autoPlay) {
                    this.fiEyesUIAnimateText();
                    // Set up interval for auto-repeat
                    this.intervalId = window.setInterval(() => {
                        this.fiEyesUIAnimateText();
                    }, this.repeatInterval);
                }
            }
            fiEyesUISplitText() {
                if (!this.textScaleContainerRef?.nativeElement)
                    return;
                const fiEyesUIContainer = this.textScaleContainerRef.nativeElement;
                const fiEyesUIText = this.text;
                const fiEyesUILengthOfText = fiEyesUIText.length;
                const fiEyesUICharList = new Array(fiEyesUILengthOfText);
                for (let i = 0; i < fiEyesUILengthOfText; i++) {
                    fiEyesUICharList[i] = fiEyesUIText.charAt(i);
                }
                const fiEyesUITargetDiv = fiEyesUIContainer.querySelector('.fiEyesUI-textScale-appendText');
                if (!fiEyesUITargetDiv)
                    return;
                fiEyesUITargetDiv.innerHTML = '';
                for (let i = 0; i < fiEyesUILengthOfText; i++) {
                    const fiEyesUIDiv = document.createElement('div');
                    fiEyesUIDiv.classList.add(`fiEyesUI-ch-${i}`);
                    fiEyesUIDiv.classList.add('fiEyesUI-textScale-character');
                    fiEyesUIDiv.textContent = fiEyesUICharList[i];
                    fiEyesUITargetDiv.appendChild(fiEyesUIDiv);
                }
            }
            fiEyesUIAnimateText() {
                if (!this.textScaleContainerRef?.nativeElement)
                    return;
                const fiEyesUIContainer = this.textScaleContainerRef.nativeElement;
                this.fiEyesUISplitText();
                setTimeout(() => {
                    const fiEyesUIItems = fiEyesUIContainer.querySelectorAll('.fiEyesUI-textScale-character');
                    fiEyesUIItems.forEach((fiEyesUIItem) => {
                        fiEyesUIItem.classList.add('fiEyesUI-animate');
                    });
                    setTimeout(() => {
                        this.complete.emit();
                    }, this.animationDuration);
                }, this.animationDelay);
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-textScale-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-textScale-container {
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
      
      .fiEyesUI-textScale-appendText {
        text-align: center;
        padding: 34px;
        display: block;
        color: ${this.color};
        width: 100%;
      }
      
      .fiEyesUI-textScale-character {
        display: inline;
        font-weight: bolder;
        font-size: ${this.fontSize};
        margin: auto;
        text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
      }
      
      .fiEyesUI-textScale-character.fiEyesUI-animate {
        animation: fiEyesUI-rotate ${this.animationDuration}ms linear forwards;
      }
      
      @keyframes fiEyesUI-rotate {
        0% {
          transform: scale(0);
        }
        10% {
          font-size: ${this.fontSize};
          transform: scale(2);
        }
        20% {
          transform: scale(0.5);
        }
        40% {
          transform: scale(1.5);
        }
        60% {
          transform: scale(0.8);
        }
        80% {
          transform: scale(1.2);
        }
        100% {
          font-size: ${this.fontSize};
          transform: scale(1);
        }
      }
    `;
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUITextScaleComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [core.Input()];
            _fontSize_decorators = [core.Input()];
            _color_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _animationDelay_decorators = [core.Input()];
            _autoPlay_decorators = [core.Input()];
            _repeatInterval_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _textScaleContainerRef_decorators = [core.ViewChild('textScaleContainer')];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _animationDelay_decorators, { kind: "field", name: "animationDelay", static: false, private: false, access: { has: obj => "animationDelay" in obj, get: obj => obj.animationDelay, set: (obj, value) => { obj.animationDelay = value; } }, metadata: _metadata }, _animationDelay_initializers, _animationDelay_extraInitializers);
            __esDecorate(null, null, _autoPlay_decorators, { kind: "field", name: "autoPlay", static: false, private: false, access: { has: obj => "autoPlay" in obj, get: obj => obj.autoPlay, set: (obj, value) => { obj.autoPlay = value; } }, metadata: _metadata }, _autoPlay_initializers, _autoPlay_extraInitializers);
            __esDecorate(null, null, _repeatInterval_decorators, { kind: "field", name: "repeatInterval", static: false, private: false, access: { has: obj => "repeatInterval" in obj, get: obj => obj.repeatInterval, set: (obj, value) => { obj.repeatInterval = value; } }, metadata: _metadata }, _repeatInterval_initializers, _repeatInterval_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _textScaleContainerRef_decorators, { kind: "field", name: "textScaleContainerRef", static: false, private: false, access: { has: obj => "textScaleContainerRef" in obj, get: obj => obj.textScaleContainerRef, set: (obj, value) => { obj.textScaleContainerRef = value; } }, metadata: _metadata }, _textScaleContainerRef_initializers, _textScaleContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUIRotatingTextComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-rotatingText',
                template: `
    <div 
      #rotatingTextContainer
      class="fiEyesUI-rotatingText-container"
      [style.font-size]="fontSize"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-rotatingText-content"></div>
    </div>
  `,
                styles: [`
    .fiEyesUI-rotatingText-container {
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _words_decorators;
        let _words_initializers = [];
        let _words_extraInitializers = [];
        let _fontSize_decorators;
        let _fontSize_initializers = [];
        let _fontSize_extraInitializers = [];
        let _color_decorators;
        let _color_initializers = [];
        let _color_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _wordDelay_decorators;
        let _wordDelay_initializers = [];
        let _wordDelay_extraInitializers = [];
        let _autoPlay_decorators;
        let _autoPlay_initializers = [];
        let _autoPlay_extraInitializers = [];
        let _repeatInterval_decorators;
        let _repeatInterval_initializers = [];
        let _repeatInterval_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _rotatingTextContainerRef_decorators;
        let _rotatingTextContainerRef_initializers = [];
        let _rotatingTextContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.words = __runInitializers(this, _words_initializers, ['beautiful', 'maintainable', 'perfect']);
                this.fontSize = (__runInitializers(this, _words_extraInitializers), __runInitializers(this, _fontSize_initializers, '40px'));
                this.color = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _color_initializers, '#ffffff'));
                this.animationDuration = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _animationDuration_initializers, 1500));
                this.wordDelay = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _wordDelay_initializers, 1250));
                this.autoPlay = (__runInitializers(this, _wordDelay_extraInitializers), __runInitializers(this, _autoPlay_initializers, true));
                this.repeatInterval = (__runInitializers(this, _autoPlay_extraInitializers), __runInitializers(this, _repeatInterval_initializers, 5000));
                this.className = (__runInitializers(this, _repeatInterval_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.rotatingTextContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _rotatingTextContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _rotatingTextContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.rotatingTextContainerRef?.nativeElement)
                    return;
                this.rotatingTextContainerRef.nativeElement;
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                // Create word elements
                this.fiEyesUICreateWords();
                if (this.autoPlay) {
                    this.fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    this.intervalId = window.setInterval(() => {
                        this.fiEyesUIStartAnimation();
                    }, this.repeatInterval);
                }
            }
            fiEyesUICreateWords() {
                if (!this.rotatingTextContainerRef?.nativeElement)
                    return;
                const fiEyesUIContainer = this.rotatingTextContainerRef.nativeElement;
                const fiEyesUIContentDiv = fiEyesUIContainer.querySelector('.fiEyesUI-rotatingText-content');
                if (!fiEyesUIContentDiv)
                    return;
                fiEyesUIContentDiv.innerHTML = '';
                this.words.forEach((fiEyesUIWord, fiEyesUIIndex) => {
                    const fiEyesUIWordDiv = document.createElement('h2');
                    fiEyesUIWordDiv.className = 'fiEyesUI-rotatingText-word';
                    fiEyesUIWordDiv.textContent = fiEyesUIWord;
                    fiEyesUIContentDiv.appendChild(fiEyesUIWordDiv);
                });
            }
            fiEyesUIStartAnimation() {
                if (!this.rotatingTextContainerRef?.nativeElement)
                    return;
                this.rotatingTextContainerRef.nativeElement;
                this.fiEyesUICreateWords();
                // Calculate total animation time
                const totalTime = (this.words.length * this.wordDelay) + this.animationDuration;
                setTimeout(() => {
                    this.complete.emit();
                }, totalTime);
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-rotatingText-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-rotatingText-container {
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
      
      .fiEyesUI-rotatingText-content {
        position: relative;
        width: 100%;
      }
      
      .fiEyesUI-rotatingText-word {
        font-family: 'Orbitron', sans-serif;
        font-size: ${this.fontSize};
        left: 0;
        margin-bottom: 0;
        margin-top: 30px;
        opacity: 0;
        position: absolute;
        right: 0;
        text-align: center;
        text-transform: uppercase;
        top: 0;
        color: ${this.color};
      }
      
      .fiEyesUI-rotatingText-word:nth-of-type(1) {
        animation: fiEyesUI-rotate-text-up ${this.animationDuration}ms ${this.wordDelay}ms;
      }
      
      .fiEyesUI-rotatingText-word:nth-of-type(2) {
        animation: fiEyesUI-rotate-text-up ${this.animationDuration}ms ${this.wordDelay * 2}ms;
      }
      
      .fiEyesUI-rotatingText-word:nth-of-type(3) {
        animation: fiEyesUI-fade-text-in ${this.animationDuration}ms ${this.wordDelay * 3}ms forwards;
      }
      
      .fiEyesUI-rotatingText-word:nth-of-type(4) {
        animation: fiEyesUI-rotate-text-up ${this.animationDuration}ms ${this.wordDelay * 4}ms;
      }
      
      .fiEyesUI-rotatingText-word:nth-of-type(5) {
        animation: fiEyesUI-rotate-text-up ${this.animationDuration}ms ${this.wordDelay * 5}ms;
      }
      
      .fiEyesUI-rotatingText-word:nth-of-type(6) {
        animation: fiEyesUI-fade-text-in ${this.animationDuration}ms ${this.wordDelay * 6}ms forwards;
      }
      
      @keyframes fiEyesUI-rotate-text-up {
        0% {
          transform: translate3d(0, 80px, 0);
          opacity: 0;
        }
        20%, 80% {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
        100% {
          transform: translate3d(0, -40px, 0);
          opacity: 0;
        }
      }
      
      @keyframes fiEyesUI-fade-text-in {
        0% {
          opacity: 0;
          transform: translate3d(0, 80px, 0);
        }
        50%, 100% {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }
    `;
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUIRotatingTextComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _words_decorators = [core.Input()];
            _fontSize_decorators = [core.Input()];
            _color_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _wordDelay_decorators = [core.Input()];
            _autoPlay_decorators = [core.Input()];
            _repeatInterval_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _rotatingTextContainerRef_decorators = [core.ViewChild('rotatingTextContainer')];
            __esDecorate(null, null, _words_decorators, { kind: "field", name: "words", static: false, private: false, access: { has: obj => "words" in obj, get: obj => obj.words, set: (obj, value) => { obj.words = value; } }, metadata: _metadata }, _words_initializers, _words_extraInitializers);
            __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _wordDelay_decorators, { kind: "field", name: "wordDelay", static: false, private: false, access: { has: obj => "wordDelay" in obj, get: obj => obj.wordDelay, set: (obj, value) => { obj.wordDelay = value; } }, metadata: _metadata }, _wordDelay_initializers, _wordDelay_extraInitializers);
            __esDecorate(null, null, _autoPlay_decorators, { kind: "field", name: "autoPlay", static: false, private: false, access: { has: obj => "autoPlay" in obj, get: obj => obj.autoPlay, set: (obj, value) => { obj.autoPlay = value; } }, metadata: _metadata }, _autoPlay_initializers, _autoPlay_extraInitializers);
            __esDecorate(null, null, _repeatInterval_decorators, { kind: "field", name: "repeatInterval", static: false, private: false, access: { has: obj => "repeatInterval" in obj, get: obj => obj.repeatInterval, set: (obj, value) => { obj.repeatInterval = value; } }, metadata: _metadata }, _repeatInterval_initializers, _repeatInterval_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _rotatingTextContainerRef_decorators, { kind: "field", name: "rotatingTextContainerRef", static: false, private: false, access: { has: obj => "rotatingTextContainerRef" in obj, get: obj => obj.rotatingTextContainerRef, set: (obj, value) => { obj.rotatingTextContainerRef = value; } }, metadata: _metadata }, _rotatingTextContainerRef_initializers, _rotatingTextContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUICharacterFlyInComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-characterFlyIn',
                template: `
    <div 
      #characterFlyInContainer
      class="fiEyesUI-characterFlyIn-container"
      [style.font-size]="fontSize"
      [class]="className"
      [style]="style"
    >
      <ul class="fiEyesUI-characterFlyIn-list fiEyesUI-hidden"></ul>
    </div>
  `,
                styles: [`
    .fiEyesUI-characterFlyIn-container {
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text_decorators;
        let _text_initializers = [];
        let _text_extraInitializers = [];
        let _fontSize_decorators;
        let _fontSize_initializers = [];
        let _fontSize_extraInitializers = [];
        let _color_decorators;
        let _color_initializers = [];
        let _color_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _startDelay_decorators;
        let _startDelay_initializers = [];
        let _startDelay_extraInitializers = [];
        let _autoPlay_decorators;
        let _autoPlay_initializers = [];
        let _autoPlay_extraInitializers = [];
        let _repeatInterval_decorators;
        let _repeatInterval_initializers = [];
        let _repeatInterval_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _characterFlyInContainerRef_decorators;
        let _characterFlyInContainerRef_initializers = [];
        let _characterFlyInContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text = __runInitializers(this, _text_initializers, 'Welcome To Finches Eyes UI Components');
                this.fontSize = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _fontSize_initializers, '32px'));
                this.color = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _color_initializers, '#ffffff'));
                this.animationDuration = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _animationDuration_initializers, 2800));
                this.startDelay = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _startDelay_initializers, 700));
                this.autoPlay = (__runInitializers(this, _startDelay_extraInitializers), __runInitializers(this, _autoPlay_initializers, true));
                this.repeatInterval = (__runInitializers(this, _autoPlay_extraInitializers), __runInitializers(this, _repeatInterval_initializers, 5000));
                this.className = (__runInitializers(this, _repeatInterval_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.characterFlyInContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _characterFlyInContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _characterFlyInContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.characterFlyInContainerRef?.nativeElement)
                    return;
                this.characterFlyInContainerRef.nativeElement;
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                // Create character elements
                this.fiEyesUICreateCharacters();
                if (this.autoPlay) {
                    this.fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    this.intervalId = window.setInterval(() => {
                        this.fiEyesUIStartAnimation();
                    }, this.repeatInterval);
                }
            }
            fiEyesUICreateCharacters() {
                if (!this.characterFlyInContainerRef?.nativeElement)
                    return;
                const fiEyesUIContainer = this.characterFlyInContainerRef.nativeElement;
                const fiEyesUIListDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterFlyIn-list');
                if (!fiEyesUIListDiv)
                    return;
                fiEyesUIListDiv.innerHTML = '';
                const fiEyesUICharacters = this.text.split('');
                fiEyesUICharacters.forEach((fiEyesUIChar) => {
                    const fiEyesUICharacterDiv = document.createElement('li');
                    fiEyesUICharacterDiv.className = 'fiEyesUI-characterFlyIn-character';
                    fiEyesUICharacterDiv.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
                    fiEyesUIListDiv.appendChild(fiEyesUICharacterDiv);
                });
            }
            fiEyesUIStartAnimation() {
                if (!this.characterFlyInContainerRef?.nativeElement)
                    return;
                const fiEyesUIContainer = this.characterFlyInContainerRef.nativeElement;
                this.fiEyesUICreateCharacters();
                const fiEyesUIListDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterFlyIn-list');
                if (!fiEyesUIListDiv)
                    return;
                // Add hidden class initially
                fiEyesUIListDiv.classList.add('fiEyesUI-hidden');
                // Remove hidden class after delay to start animation
                setTimeout(() => {
                    fiEyesUIListDiv.classList.remove('fiEyesUI-hidden');
                    // Calculate total animation time
                    const totalTime = this.startDelay + this.animationDuration;
                    setTimeout(() => {
                        this.complete.emit();
                    }, totalTime);
                }, this.startDelay);
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-characterFlyIn-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-characterFlyIn-container {
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
      
      .fiEyesUI-characterFlyIn-list {
        position: absolute;
        left: 50%;
        top: 50%;
        list-style: none;
        transform: translateX(-50%) translateY(-50%);
        margin: 0;
        padding: 0;
      }
      
      .fiEyesUI-characterFlyIn-character {
        display: inline-block;
        margin-right: 30px;
        font-family: 'Orbitron', sans-serif;
        font-weight: 300;
        font-size: ${this.fontSize};
        color: ${this.color};
        opacity: 1;
        transition: all ${this.animationDuration}ms cubic-bezier(0.6, -.005, 0.32, 1.75);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character {
        opacity: 0;
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(1) {
        transform: translateX(150px) translateY(-170px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(2) {
        transform: translateX(-210px) translateY(170px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(3) {
        transform: translateX(20px) translateY(-100px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(4) {
        transform: translateX(-100px) translateY(-20px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(5) {
        transform: translateX(-70px) translateY(-200px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(6) {
        transform: translateX(200px) translateY(70px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(7) {
        transform: translateX(30px) translateY(200px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(8) {
        transform: translateX(30px) translateY(-100px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(9) {
        transform: translateX(100px) translateY(-170px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(10) {
        transform: translateX(-100px) translateY(50px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(11) {
        transform: translateX(-550px) translateY(120px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(12) {
        transform: translateX(-40px) translateY(-50px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(13) {
        transform: translateX(150px) translateY(-170px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(14) {
        transform: translateX(-210px) translateY(170px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(15) {
        transform: translateX(20px) translateY(-100px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(16) {
        transform: translateX(-100px) translateY(-20px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(17) {
        transform: translateX(-70px) translateY(-200px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(18) {
        transform: translateX(200px) translateY(70px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(19) {
        transform: translateX(30px) translateY(200px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(20) {
        transform: translateX(30px) translateY(-100px);
      }
    `;
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUICharacterFlyInComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [core.Input()];
            _fontSize_decorators = [core.Input()];
            _color_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _startDelay_decorators = [core.Input()];
            _autoPlay_decorators = [core.Input()];
            _repeatInterval_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _characterFlyInContainerRef_decorators = [core.ViewChild('characterFlyInContainer')];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _startDelay_decorators, { kind: "field", name: "startDelay", static: false, private: false, access: { has: obj => "startDelay" in obj, get: obj => obj.startDelay, set: (obj, value) => { obj.startDelay = value; } }, metadata: _metadata }, _startDelay_initializers, _startDelay_extraInitializers);
            __esDecorate(null, null, _autoPlay_decorators, { kind: "field", name: "autoPlay", static: false, private: false, access: { has: obj => "autoPlay" in obj, get: obj => obj.autoPlay, set: (obj, value) => { obj.autoPlay = value; } }, metadata: _metadata }, _autoPlay_initializers, _autoPlay_extraInitializers);
            __esDecorate(null, null, _repeatInterval_decorators, { kind: "field", name: "repeatInterval", static: false, private: false, access: { has: obj => "repeatInterval" in obj, get: obj => obj.repeatInterval, set: (obj, value) => { obj.repeatInterval = value; } }, metadata: _metadata }, _repeatInterval_initializers, _repeatInterval_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _characterFlyInContainerRef_decorators, { kind: "field", name: "characterFlyInContainerRef", static: false, private: false, access: { has: obj => "characterFlyInContainerRef" in obj, get: obj => obj.characterFlyInContainerRef, set: (obj, value) => { obj.characterFlyInContainerRef = value; } }, metadata: _metadata }, _characterFlyInContainerRef_initializers, _characterFlyInContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUITextRevealComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-textReveal',
                template: `
    <div 
      #textRevealContainer
      class="fiEyesUI-textReveal-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-textReveal-content">
        <span class="fiEyesUI-textReveal-span fiEyesUI-textReveal-text1">{{ text1 }}</span>
        <span class="fiEyesUI-textReveal-span fiEyesUI-textReveal-text2">{{ text2 }}</span>
      </div>
    </div>
  `,
                styles: [`
    .fiEyesUI-textReveal-container {
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text1_decorators;
        let _text1_initializers = [];
        let _text1_extraInitializers = [];
        let _text2_decorators;
        let _text2_initializers = [];
        let _text2_extraInitializers = [];
        let _fontSize1_decorators;
        let _fontSize1_initializers = [];
        let _fontSize1_extraInitializers = [];
        let _fontSize2_decorators;
        let _fontSize2_initializers = [];
        let _fontSize2_extraInitializers = [];
        let _color1_decorators;
        let _color1_initializers = [];
        let _color1_extraInitializers = [];
        let _color2_decorators;
        let _color2_initializers = [];
        let _color2_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _autoPlay_decorators;
        let _autoPlay_initializers = [];
        let _autoPlay_extraInitializers = [];
        let _repeatInterval_decorators;
        let _repeatInterval_initializers = [];
        let _repeatInterval_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _textRevealContainerRef_decorators;
        let _textRevealContainerRef_initializers = [];
        let _textRevealContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text1 = __runInitializers(this, _text1_initializers, 'Welcome To');
                this.text2 = (__runInitializers(this, _text1_extraInitializers), __runInitializers(this, _text2_initializers, 'Finches Eyes UI Components'));
                this.fontSize1 = (__runInitializers(this, _text2_extraInitializers), __runInitializers(this, _fontSize1_initializers, '60px'));
                this.fontSize2 = (__runInitializers(this, _fontSize1_extraInitializers), __runInitializers(this, _fontSize2_initializers, '30px'));
                this.color1 = (__runInitializers(this, _fontSize2_extraInitializers), __runInitializers(this, _color1_initializers, '#ffffff'));
                this.color2 = (__runInitializers(this, _color1_extraInitializers), __runInitializers(this, _color2_initializers, '#ffffff'));
                this.animationDuration = (__runInitializers(this, _color2_extraInitializers), __runInitializers(this, _animationDuration_initializers, 2500));
                this.autoPlay = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _autoPlay_initializers, true));
                this.repeatInterval = (__runInitializers(this, _autoPlay_extraInitializers), __runInitializers(this, _repeatInterval_initializers, 4000));
                this.className = (__runInitializers(this, _repeatInterval_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.textRevealContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _textRevealContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _textRevealContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.textRevealContainerRef?.nativeElement)
                    return;
                this.textRevealContainerRef.nativeElement;
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                if (this.autoPlay) {
                    this.fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    this.intervalId = window.setInterval(() => {
                        this.fiEyesUIStartAnimation();
                    }, this.repeatInterval);
                }
            }
            fiEyesUIStartAnimation() {
                if (!this.textRevealContainerRef?.nativeElement)
                    return;
                // Calculate total animation time
                setTimeout(() => {
                    this.complete.emit();
                }, this.animationDuration);
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-textReveal-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-textReveal-container {
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
      
      .fiEyesUI-textReveal-content {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
      }
      
      .fiEyesUI-textReveal-span {
        text-transform: uppercase;
        display: block;
      }
      
      .fiEyesUI-textReveal-text1 {
        color: ${this.color1};
        font-size: ${this.fontSize1};
        font-weight: 700;
        letter-spacing: 8px;
        margin-bottom: 20px;
        background: #000000;
        position: relative;
        animation: fiEyesUI-text-reveal ${this.animationDuration}ms 1;
      }
      
      .fiEyesUI-textReveal-text2 {
        font-size: ${this.fontSize2};
        color: ${this.color2};
      }
      
      @keyframes fiEyesUI-text-reveal {
        0% {
          color: #000000;
          margin-bottom: -40px;
        }
        30% {
          letter-spacing: 25px;
          margin-bottom: -40px;
        }
        100% {
          color: ${this.color1};
          letter-spacing: 8px;
          margin-bottom: 20px;
        }
      }
    `;
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUITextRevealComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text1_decorators = [core.Input()];
            _text2_decorators = [core.Input()];
            _fontSize1_decorators = [core.Input()];
            _fontSize2_decorators = [core.Input()];
            _color1_decorators = [core.Input()];
            _color2_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _autoPlay_decorators = [core.Input()];
            _repeatInterval_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _textRevealContainerRef_decorators = [core.ViewChild('textRevealContainer')];
            __esDecorate(null, null, _text1_decorators, { kind: "field", name: "text1", static: false, private: false, access: { has: obj => "text1" in obj, get: obj => obj.text1, set: (obj, value) => { obj.text1 = value; } }, metadata: _metadata }, _text1_initializers, _text1_extraInitializers);
            __esDecorate(null, null, _text2_decorators, { kind: "field", name: "text2", static: false, private: false, access: { has: obj => "text2" in obj, get: obj => obj.text2, set: (obj, value) => { obj.text2 = value; } }, metadata: _metadata }, _text2_initializers, _text2_extraInitializers);
            __esDecorate(null, null, _fontSize1_decorators, { kind: "field", name: "fontSize1", static: false, private: false, access: { has: obj => "fontSize1" in obj, get: obj => obj.fontSize1, set: (obj, value) => { obj.fontSize1 = value; } }, metadata: _metadata }, _fontSize1_initializers, _fontSize1_extraInitializers);
            __esDecorate(null, null, _fontSize2_decorators, { kind: "field", name: "fontSize2", static: false, private: false, access: { has: obj => "fontSize2" in obj, get: obj => obj.fontSize2, set: (obj, value) => { obj.fontSize2 = value; } }, metadata: _metadata }, _fontSize2_initializers, _fontSize2_extraInitializers);
            __esDecorate(null, null, _color1_decorators, { kind: "field", name: "color1", static: false, private: false, access: { has: obj => "color1" in obj, get: obj => obj.color1, set: (obj, value) => { obj.color1 = value; } }, metadata: _metadata }, _color1_initializers, _color1_extraInitializers);
            __esDecorate(null, null, _color2_decorators, { kind: "field", name: "color2", static: false, private: false, access: { has: obj => "color2" in obj, get: obj => obj.color2, set: (obj, value) => { obj.color2 = value; } }, metadata: _metadata }, _color2_initializers, _color2_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _autoPlay_decorators, { kind: "field", name: "autoPlay", static: false, private: false, access: { has: obj => "autoPlay" in obj, get: obj => obj.autoPlay, set: (obj, value) => { obj.autoPlay = value; } }, metadata: _metadata }, _autoPlay_initializers, _autoPlay_extraInitializers);
            __esDecorate(null, null, _repeatInterval_decorators, { kind: "field", name: "repeatInterval", static: false, private: false, access: { has: obj => "repeatInterval" in obj, get: obj => obj.repeatInterval, set: (obj, value) => { obj.repeatInterval = value; } }, metadata: _metadata }, _repeatInterval_initializers, _repeatInterval_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _textRevealContainerRef_decorators, { kind: "field", name: "textRevealContainerRef", static: false, private: false, access: { has: obj => "textRevealContainerRef" in obj, get: obj => obj.textRevealContainerRef, set: (obj, value) => { obj.textRevealContainerRef = value; } }, metadata: _metadata }, _textRevealContainerRef_initializers, _textRevealContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUICharacterGlowComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-characterGlow',
                template: `
    <div 
      #characterGlowContainer
      class="fiEyesUI-characterGlow-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-characterGlow-content"></div>
    </div>
  `,
                styles: [`
    .fiEyesUI-characterGlow-container {
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text_decorators;
        let _text_initializers = [];
        let _text_extraInitializers = [];
        let _fontSize_decorators;
        let _fontSize_initializers = [];
        let _fontSize_extraInitializers = [];
        let _color_decorators;
        let _color_initializers = [];
        let _color_extraInitializers = [];
        let _glowColor_decorators;
        let _glowColor_initializers = [];
        let _glowColor_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _autoPlay_decorators;
        let _autoPlay_initializers = [];
        let _autoPlay_extraInitializers = [];
        let _repeatInterval_decorators;
        let _repeatInterval_initializers = [];
        let _repeatInterval_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _characterGlowContainerRef_decorators;
        let _characterGlowContainerRef_initializers = [];
        let _characterGlowContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text = __runInitializers(this, _text_initializers, 'Welcome To Finches Eyes UI Components');
                this.fontSize = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _fontSize_initializers, '80px'));
                this.color = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _color_initializers, '#ffffff'));
                this.glowColor = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _glowColor_initializers, '#00bbff'));
                this.animationDuration = (__runInitializers(this, _glowColor_extraInitializers), __runInitializers(this, _animationDuration_initializers, 2250));
                this.autoPlay = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _autoPlay_initializers, true));
                this.repeatInterval = (__runInitializers(this, _autoPlay_extraInitializers), __runInitializers(this, _repeatInterval_initializers, 3000));
                this.className = (__runInitializers(this, _repeatInterval_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.characterGlowContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _characterGlowContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _characterGlowContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.characterGlowContainerRef?.nativeElement)
                    return;
                this.characterGlowContainerRef.nativeElement;
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                // Create character elements
                this.fiEyesUICreateCharacters();
                if (this.autoPlay) {
                    this.fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    this.intervalId = window.setInterval(() => {
                        this.fiEyesUIStartAnimation();
                    }, this.repeatInterval);
                }
            }
            fiEyesUICreateCharacters() {
                if (!this.characterGlowContainerRef?.nativeElement)
                    return;
                const fiEyesUIContainer = this.characterGlowContainerRef.nativeElement;
                const fiEyesUIContentDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterGlow-content');
                if (!fiEyesUIContentDiv)
                    return;
                fiEyesUIContentDiv.innerHTML = '';
                const fiEyesUICharacters = this.text.split('');
                fiEyesUICharacters.forEach((fiEyesUIChar) => {
                    const fiEyesUICharacterSpan = document.createElement('span');
                    fiEyesUICharacterSpan.className = 'fiEyesUI-characterGlow-character';
                    fiEyesUICharacterSpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
                    fiEyesUIContentDiv.appendChild(fiEyesUICharacterSpan);
                });
            }
            fiEyesUIStartAnimation() {
                if (!this.characterGlowContainerRef?.nativeElement)
                    return;
                this.fiEyesUICreateCharacters();
                // Calculate total animation time
                setTimeout(() => {
                    this.complete.emit();
                }, this.animationDuration);
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-characterGlow-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-characterGlow-container {
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
      
      .fiEyesUI-characterGlow-content {
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .fiEyesUI-characterGlow-character {
        display: block;
        float: left;
        animation: fiEyesUI-character-glow ${this.animationDuration}ms linear infinite;
        margin: 0 5px;
        padding: 0;
        position: relative;
        color: #111;
      }
      
      .fiEyesUI-characterGlow-character:nth-child(1) {
        animation-delay: 0s;
      }
      .fiEyesUI-characterGlow-character:nth-child(2) {
        animation-delay: 0.25s;
      }
      .fiEyesUI-characterGlow-character:nth-child(3) {
        animation-delay: 0.5s;
      }
      .fiEyesUI-characterGlow-character:nth-child(4) {
        animation-delay: 0.75s;
      }
      .fiEyesUI-characterGlow-character:nth-child(5) {
        animation-delay: 1s;
      }
      .fiEyesUI-characterGlow-character:nth-child(6) {
        animation-delay: 1.25s;
      }
      .fiEyesUI-characterGlow-character:nth-child(7) {
        animation-delay: 1.5s;
      }
      .fiEyesUI-characterGlow-character:nth-child(8) {
        animation-delay: 1.75s;
      }
      .fiEyesUI-characterGlow-character:nth-child(9) {
        animation-delay: 2s;
      }
      .fiEyesUI-characterGlow-character:nth-child(10) {
        animation-delay: 2.25s;
      }
      .fiEyesUI-characterGlow-character:nth-child(11) {
        animation-delay: 2.5s;
      }
      .fiEyesUI-characterGlow-character:nth-child(12) {
        animation-delay: 2.75s;
      }
      .fiEyesUI-characterGlow-character:nth-child(13) {
        animation-delay: 3s;
      }
      .fiEyesUI-characterGlow-character:nth-child(14) {
        animation-delay: 3.25s;
      }
      .fiEyesUI-characterGlow-character:nth-child(15) {
        animation-delay: 3.5s;
      }
      .fiEyesUI-characterGlow-character:nth-child(16) {
        animation-delay: 3.75s;
      }
      .fiEyesUI-characterGlow-character:nth-child(17) {
        animation-delay: 4s;
      }
      .fiEyesUI-characterGlow-character:nth-child(18) {
        animation-delay: 4.25s;
      }
      .fiEyesUI-characterGlow-character:nth-child(19) {
        animation-delay: 4.5s;
      }
      .fiEyesUI-characterGlow-character:nth-child(20) {
        animation-delay: 4.75s;
      }
      
      @keyframes fiEyesUI-character-glow {
        0%, 100% {
          color: ${this.color};
          filter: blur(2px);
          text-shadow: 0 0 10px ${this.glowColor},
            0 0 20px ${this.glowColor},
            0 0 40px ${this.glowColor},
            0 0 80px ${this.glowColor},
            0 0 120px ${this.glowColor},
            0 0 200px ${this.glowColor},
            0 0 300px ${this.glowColor},
            0 0 400px ${this.glowColor};
        }
        5%, 95% {
          color: #111;
          filter: blur(0px);
          text-shadow: none;
        }
      }
    `;
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUICharacterGlowComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [core.Input()];
            _fontSize_decorators = [core.Input()];
            _color_decorators = [core.Input()];
            _glowColor_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _autoPlay_decorators = [core.Input()];
            _repeatInterval_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _characterGlowContainerRef_decorators = [core.ViewChild('characterGlowContainer')];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(null, null, _glowColor_decorators, { kind: "field", name: "glowColor", static: false, private: false, access: { has: obj => "glowColor" in obj, get: obj => obj.glowColor, set: (obj, value) => { obj.glowColor = value; } }, metadata: _metadata }, _glowColor_initializers, _glowColor_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _autoPlay_decorators, { kind: "field", name: "autoPlay", static: false, private: false, access: { has: obj => "autoPlay" in obj, get: obj => obj.autoPlay, set: (obj, value) => { obj.autoPlay = value; } }, metadata: _metadata }, _autoPlay_initializers, _autoPlay_extraInitializers);
            __esDecorate(null, null, _repeatInterval_decorators, { kind: "field", name: "repeatInterval", static: false, private: false, access: { has: obj => "repeatInterval" in obj, get: obj => obj.repeatInterval, set: (obj, value) => { obj.repeatInterval = value; } }, metadata: _metadata }, _repeatInterval_initializers, _repeatInterval_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _characterGlowContainerRef_decorators, { kind: "field", name: "characterGlowContainerRef", static: false, private: false, access: { has: obj => "characterGlowContainerRef" in obj, get: obj => obj.characterGlowContainerRef, set: (obj, value) => { obj.characterGlowContainerRef = value; } }, metadata: _metadata }, _characterGlowContainerRef_initializers, _characterGlowContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUITextStrokeComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-textStroke',
                template: `
    <div 
      #textStrokeContainer
      class="fiEyesUI-textStroke-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-textStroke-content">
        <h2 class="fiEyesUI-textStroke-text">{{ text }}</h2>
        <h2 class="fiEyesUI-textStroke-text">{{ text }}</h2>
      </div>
    </div>
  `,
                styles: [`
    .fiEyesUI-textStroke-container {
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text_decorators;
        let _text_initializers = [];
        let _text_extraInitializers = [];
        let _fontSize_decorators;
        let _fontSize_initializers = [];
        let _fontSize_extraInitializers = [];
        let _strokeColor_decorators;
        let _strokeColor_initializers = [];
        let _strokeColor_extraInitializers = [];
        let _fillColor_decorators;
        let _fillColor_initializers = [];
        let _fillColor_extraInitializers = [];
        let _strokeWidth_decorators;
        let _strokeWidth_initializers = [];
        let _strokeWidth_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _autoPlay_decorators;
        let _autoPlay_initializers = [];
        let _autoPlay_extraInitializers = [];
        let _repeatInterval_decorators;
        let _repeatInterval_initializers = [];
        let _repeatInterval_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _textStrokeContainerRef_decorators;
        let _textStrokeContainerRef_initializers = [];
        let _textStrokeContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text = __runInitializers(this, _text_initializers, 'Welcome To Finches Eyes UI Components');
                this.fontSize = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _fontSize_initializers, '80px'));
                this.strokeColor = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _strokeColor_initializers, '#8338ec'));
                this.fillColor = (__runInitializers(this, _strokeColor_extraInitializers), __runInitializers(this, _fillColor_initializers, '#c19bf5'));
                this.strokeWidth = (__runInitializers(this, _fillColor_extraInitializers), __runInitializers(this, _strokeWidth_initializers, '2px'));
                this.animationDuration = (__runInitializers(this, _strokeWidth_extraInitializers), __runInitializers(this, _animationDuration_initializers, 4000));
                this.autoPlay = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _autoPlay_initializers, true));
                this.repeatInterval = (__runInitializers(this, _autoPlay_extraInitializers), __runInitializers(this, _repeatInterval_initializers, 5000));
                this.className = (__runInitializers(this, _repeatInterval_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.textStrokeContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _textStrokeContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _textStrokeContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.textStrokeContainerRef?.nativeElement)
                    return;
                this.textStrokeContainerRef.nativeElement;
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                if (this.autoPlay) {
                    this.fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    this.intervalId = window.setInterval(() => {
                        this.fiEyesUIStartAnimation();
                    }, this.repeatInterval);
                }
            }
            fiEyesUIStartAnimation() {
                if (!this.textStrokeContainerRef?.nativeElement)
                    return;
                // Calculate total animation time
                setTimeout(() => {
                    this.complete.emit();
                }, this.animationDuration);
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-textStroke-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-textStroke-container {
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
      
      .fiEyesUI-textStroke-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .fiEyesUI-textStroke-text {
        color: #ffffff;
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        margin: 0;
        padding: 0;
      }
      
      .fiEyesUI-textStroke-text:nth-child(1) {
        color: transparent;
        -webkit-text-stroke: ${this.strokeWidth} ${this.strokeColor};
        text-stroke: ${this.strokeWidth} ${this.strokeColor};
      }
      
      .fiEyesUI-textStroke-text:nth-child(2) {
        color: ${this.fillColor};
        animation: fiEyesUI-text-stroke-animate ${this.animationDuration}ms ease-in-out infinite;
      }
      
      @keyframes fiEyesUI-text-stroke-animate {
        0%, 100% {
          clip-path: polygon(
            0% 45%,
            16% 44%,
            33% 50%,
            54% 60%,
            70% 61%,
            84% 59%,
            100% 52%,
            100% 100%,
            0% 100%
          );
        }
        50% {
          clip-path: polygon(
            0% 60%,
            15% 65%,
            34% 66%,
            51% 62%,
            67% 50%,
            84% 45%,
            100% 46%,
            100% 100%,
            0% 100%
          );
        }
      }
    `;
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUITextStrokeComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [core.Input()];
            _fontSize_decorators = [core.Input()];
            _strokeColor_decorators = [core.Input()];
            _fillColor_decorators = [core.Input()];
            _strokeWidth_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _autoPlay_decorators = [core.Input()];
            _repeatInterval_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _textStrokeContainerRef_decorators = [core.ViewChild('textStrokeContainer')];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
            __esDecorate(null, null, _strokeColor_decorators, { kind: "field", name: "strokeColor", static: false, private: false, access: { has: obj => "strokeColor" in obj, get: obj => obj.strokeColor, set: (obj, value) => { obj.strokeColor = value; } }, metadata: _metadata }, _strokeColor_initializers, _strokeColor_extraInitializers);
            __esDecorate(null, null, _fillColor_decorators, { kind: "field", name: "fillColor", static: false, private: false, access: { has: obj => "fillColor" in obj, get: obj => obj.fillColor, set: (obj, value) => { obj.fillColor = value; } }, metadata: _metadata }, _fillColor_initializers, _fillColor_extraInitializers);
            __esDecorate(null, null, _strokeWidth_decorators, { kind: "field", name: "strokeWidth", static: false, private: false, access: { has: obj => "strokeWidth" in obj, get: obj => obj.strokeWidth, set: (obj, value) => { obj.strokeWidth = value; } }, metadata: _metadata }, _strokeWidth_initializers, _strokeWidth_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _autoPlay_decorators, { kind: "field", name: "autoPlay", static: false, private: false, access: { has: obj => "autoPlay" in obj, get: obj => obj.autoPlay, set: (obj, value) => { obj.autoPlay = value; } }, metadata: _metadata }, _autoPlay_initializers, _autoPlay_extraInitializers);
            __esDecorate(null, null, _repeatInterval_decorators, { kind: "field", name: "repeatInterval", static: false, private: false, access: { has: obj => "repeatInterval" in obj, get: obj => obj.repeatInterval, set: (obj, value) => { obj.repeatInterval = value; } }, metadata: _metadata }, _repeatInterval_initializers, _repeatInterval_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _textStrokeContainerRef_decorators, { kind: "field", name: "textStrokeContainerRef", static: false, private: false, access: { has: obj => "textStrokeContainerRef" in obj, get: obj => obj.textStrokeContainerRef, set: (obj, value) => { obj.textStrokeContainerRef = value; } }, metadata: _metadata }, _textStrokeContainerRef_initializers, _textStrokeContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUITypewriterComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-typewriter',
                template: `
    <div 
      #typewriterContainer
      class="fiEyesUI-typewriter-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-typewriter-content">
        <div class="fiEyesUI-typewriter-text">{{ text }}</div>
      </div>
    </div>
  `,
                styles: [`
    .fiEyesUI-typewriter-container {
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text_decorators;
        let _text_initializers = [];
        let _text_extraInitializers = [];
        let _fontSize_decorators;
        let _fontSize_initializers = [];
        let _fontSize_extraInitializers = [];
        let _cursorColor_decorators;
        let _cursorColor_initializers = [];
        let _cursorColor_extraInitializers = [];
        let _cursorWidth_decorators;
        let _cursorWidth_initializers = [];
        let _cursorWidth_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _cursorBlinkSpeed_decorators;
        let _cursorBlinkSpeed_initializers = [];
        let _cursorBlinkSpeed_extraInitializers = [];
        let _autoPlay_decorators;
        let _autoPlay_initializers = [];
        let _autoPlay_extraInitializers = [];
        let _repeatInterval_decorators;
        let _repeatInterval_initializers = [];
        let _repeatInterval_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _typewriterContainerRef_decorators;
        let _typewriterContainerRef_initializers = [];
        let _typewriterContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text = __runInitializers(this, _text_initializers, 'Welcome To Finches Eyes UI Components');
                this.fontSize = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _fontSize_initializers, '80px'));
                this.cursorColor = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _cursorColor_initializers, '#ffffff'));
                this.cursorWidth = (__runInitializers(this, _cursorColor_extraInitializers), __runInitializers(this, _cursorWidth_initializers, '4px'));
                this.animationDuration = (__runInitializers(this, _cursorWidth_extraInitializers), __runInitializers(this, _animationDuration_initializers, 5000));
                this.cursorBlinkSpeed = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _cursorBlinkSpeed_initializers, 1000));
                this.autoPlay = (__runInitializers(this, _cursorBlinkSpeed_extraInitializers), __runInitializers(this, _autoPlay_initializers, true));
                this.repeatInterval = (__runInitializers(this, _autoPlay_extraInitializers), __runInitializers(this, _repeatInterval_initializers, 6000));
                this.className = (__runInitializers(this, _repeatInterval_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.typewriterContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _typewriterContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _typewriterContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.typewriterContainerRef?.nativeElement)
                    return;
                this.typewriterContainerRef.nativeElement;
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                if (this.autoPlay) {
                    this.fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    this.intervalId = window.setInterval(() => {
                        this.fiEyesUIStartAnimation();
                    }, this.repeatInterval);
                }
            }
            fiEyesUIStartAnimation() {
                if (!this.typewriterContainerRef?.nativeElement)
                    return;
                // Calculate total animation time
                setTimeout(() => {
                    this.complete.emit();
                }, this.animationDuration);
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-typewriter-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-typewriter-container {
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
      
      .fiEyesUI-typewriter-content {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
        font-weight: bold;
      }
      
      .fiEyesUI-typewriter-text {
        white-space: nowrap;
        overflow: hidden;
        border-right: ${this.cursorWidth} solid ${this.cursorColor};
        animation: fiEyesUI-cursor ${this.cursorBlinkSpeed}ms step-start infinite, 
                   fiEyesUI-typewriter-text ${this.animationDuration}ms steps(${this.text.length}) alternate infinite;
      }
      
      @keyframes fiEyesUI-cursor {
        0%, 100% { 
          border-color: ${this.cursorColor}; 
        }
      }
      
      @keyframes fiEyesUI-typewriter-text {
        0% { 
          width: 0; 
        }
        100% { 
          width: ${this.text.length}ch; 
        }
      }
    `;
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUITypewriterComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [core.Input()];
            _fontSize_decorators = [core.Input()];
            _cursorColor_decorators = [core.Input()];
            _cursorWidth_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _cursorBlinkSpeed_decorators = [core.Input()];
            _autoPlay_decorators = [core.Input()];
            _repeatInterval_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _typewriterContainerRef_decorators = [core.ViewChild('typewriterContainer')];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
            __esDecorate(null, null, _cursorColor_decorators, { kind: "field", name: "cursorColor", static: false, private: false, access: { has: obj => "cursorColor" in obj, get: obj => obj.cursorColor, set: (obj, value) => { obj.cursorColor = value; } }, metadata: _metadata }, _cursorColor_initializers, _cursorColor_extraInitializers);
            __esDecorate(null, null, _cursorWidth_decorators, { kind: "field", name: "cursorWidth", static: false, private: false, access: { has: obj => "cursorWidth" in obj, get: obj => obj.cursorWidth, set: (obj, value) => { obj.cursorWidth = value; } }, metadata: _metadata }, _cursorWidth_initializers, _cursorWidth_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _cursorBlinkSpeed_decorators, { kind: "field", name: "cursorBlinkSpeed", static: false, private: false, access: { has: obj => "cursorBlinkSpeed" in obj, get: obj => obj.cursorBlinkSpeed, set: (obj, value) => { obj.cursorBlinkSpeed = value; } }, metadata: _metadata }, _cursorBlinkSpeed_initializers, _cursorBlinkSpeed_extraInitializers);
            __esDecorate(null, null, _autoPlay_decorators, { kind: "field", name: "autoPlay", static: false, private: false, access: { has: obj => "autoPlay" in obj, get: obj => obj.autoPlay, set: (obj, value) => { obj.autoPlay = value; } }, metadata: _metadata }, _autoPlay_initializers, _autoPlay_extraInitializers);
            __esDecorate(null, null, _repeatInterval_decorators, { kind: "field", name: "repeatInterval", static: false, private: false, access: { has: obj => "repeatInterval" in obj, get: obj => obj.repeatInterval, set: (obj, value) => { obj.repeatInterval = value; } }, metadata: _metadata }, _repeatInterval_initializers, _repeatInterval_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _typewriterContainerRef_decorators, { kind: "field", name: "typewriterContainerRef", static: false, private: false, access: { has: obj => "typewriterContainerRef" in obj, get: obj => obj.typewriterContainerRef, set: (obj, value) => { obj.typewriterContainerRef = value; } }, metadata: _metadata }, _typewriterContainerRef_initializers, _typewriterContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUIFadeInComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-fadeIn',
                template: `
    <div 
      #fadeInContainer
      class="fiEyesUI-fadeIn-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-fadeIn-content">
        <h1>{{ text }}</h1>
      </div>
    </div>
  `,
                styles: [`
    .fiEyesUI-fadeIn-container {
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text_decorators;
        let _text_initializers = [];
        let _text_extraInitializers = [];
        let _fontSize_decorators;
        let _fontSize_initializers = [];
        let _fontSize_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _autoPlay_decorators;
        let _autoPlay_initializers = [];
        let _autoPlay_extraInitializers = [];
        let _repeatInterval_decorators;
        let _repeatInterval_initializers = [];
        let _repeatInterval_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _fadeInContainerRef_decorators;
        let _fadeInContainerRef_initializers = [];
        let _fadeInContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text = __runInitializers(this, _text_initializers, 'Welcome To Finches Eyes UI Components');
                this.fontSize = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _fontSize_initializers, '80px'));
                this.animationDuration = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _animationDuration_initializers, 7000));
                this.autoPlay = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _autoPlay_initializers, true));
                this.repeatInterval = (__runInitializers(this, _autoPlay_extraInitializers), __runInitializers(this, _repeatInterval_initializers, 8000));
                this.className = (__runInitializers(this, _repeatInterval_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.fadeInContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _fadeInContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _fadeInContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.fadeInContainerRef?.nativeElement)
                    return;
                this.fadeInContainerRef.nativeElement;
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                if (this.autoPlay) {
                    this.fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    this.intervalId = window.setInterval(() => {
                        this.fiEyesUIStartAnimation();
                    }, this.repeatInterval);
                }
            }
            fiEyesUIStartAnimation() {
                if (!this.fadeInContainerRef?.nativeElement)
                    return;
                // Calculate total animation time
                setTimeout(() => {
                    this.complete.emit();
                }, this.animationDuration);
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-fadeIn-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-fadeIn-container {
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
      
      .fiEyesUI-fadeIn-content {
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
        font-weight: 900;
        color: #ffffff;
        padding: 1rem;
        text-align: center;
        animation-name: fiEyesUI-fade-in;
        animation-duration: ${this.animationDuration}ms;
        animation-fill-mode: both;
      }
      
      @keyframes fiEyesUI-fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUIFadeInComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [core.Input()];
            _fontSize_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _autoPlay_decorators = [core.Input()];
            _repeatInterval_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _fadeInContainerRef_decorators = [core.ViewChild('fadeInContainer')];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _autoPlay_decorators, { kind: "field", name: "autoPlay", static: false, private: false, access: { has: obj => "autoPlay" in obj, get: obj => obj.autoPlay, set: (obj, value) => { obj.autoPlay = value; } }, metadata: _metadata }, _autoPlay_initializers, _autoPlay_extraInitializers);
            __esDecorate(null, null, _repeatInterval_decorators, { kind: "field", name: "repeatInterval", static: false, private: false, access: { has: obj => "repeatInterval" in obj, get: obj => obj.repeatInterval, set: (obj, value) => { obj.repeatInterval = value; } }, metadata: _metadata }, _repeatInterval_initializers, _repeatInterval_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _fadeInContainerRef_decorators, { kind: "field", name: "fadeInContainerRef", static: false, private: false, access: { has: obj => "fadeInContainerRef" in obj, get: obj => obj.fadeInContainerRef, set: (obj, value) => { obj.fadeInContainerRef = value; } }, metadata: _metadata }, _fadeInContainerRef_initializers, _fadeInContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUIGradientTextComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-gradientText',
                template: `
    <div 
      #gradientTextContainer
      class="fiEyesUI-gradientText-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-gradientText-content">
        <h3>{{ text }}</h3>
      </div>
    </div>
  `,
                styles: [`
    .fiEyesUI-gradientText-container {
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text_decorators;
        let _text_initializers = [];
        let _text_extraInitializers = [];
        let _fontSize_decorators;
        let _fontSize_initializers = [];
        let _fontSize_extraInitializers = [];
        let _gradientColors_decorators;
        let _gradientColors_initializers = [];
        let _gradientColors_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _autoPlay_decorators;
        let _autoPlay_initializers = [];
        let _autoPlay_extraInitializers = [];
        let _repeatInterval_decorators;
        let _repeatInterval_initializers = [];
        let _repeatInterval_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _gradientTextContainerRef_decorators;
        let _gradientTextContainerRef_initializers = [];
        let _gradientTextContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text = __runInitializers(this, _text_initializers, 'Welcome To Finches Eyes UI Components');
                this.fontSize = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _fontSize_initializers, '80px'));
                this.gradientColors = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _gradientColors_initializers, ['#231557', '#44107a', '#ff1361', '#fff800']));
                this.animationDuration = (__runInitializers(this, _gradientColors_extraInitializers), __runInitializers(this, _animationDuration_initializers, 2000));
                this.autoPlay = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _autoPlay_initializers, true));
                this.repeatInterval = (__runInitializers(this, _autoPlay_extraInitializers), __runInitializers(this, _repeatInterval_initializers, 3000));
                this.className = (__runInitializers(this, _repeatInterval_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.gradientTextContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _gradientTextContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _gradientTextContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.gradientTextContainerRef?.nativeElement)
                    return;
                this.gradientTextContainerRef.nativeElement;
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                if (this.autoPlay) {
                    this.fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    this.intervalId = window.setInterval(() => {
                        this.fiEyesUIStartAnimation();
                    }, this.repeatInterval);
                }
            }
            fiEyesUIStartAnimation() {
                if (!this.gradientTextContainerRef?.nativeElement)
                    return;
                // Calculate total animation time
                setTimeout(() => {
                    this.complete.emit();
                }, this.animationDuration);
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-gradientText-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-gradientText-container {
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
      
      .fiEyesUI-gradientText-content {
        text-transform: uppercase;
        background-image: linear-gradient(
          -225deg,
          ${this.gradientColors[0]} 0%,
          ${this.gradientColors[1]} 29%,
          ${this.gradientColors[2]} 67%,
          ${this.gradientColors[3]} 100%
        );
        background-size: auto auto;
        background-clip: border-box;
        background-size: 200% auto;
        color: #fff;
        background-clip: text;
        text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: fiEyesUI-textclip ${this.animationDuration}ms linear infinite;
        display: inline-block;
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
      }
      
      @keyframes fiEyesUI-textclip {
        to {
          background-position: 200% center;
        }
      }
    `;
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUIGradientTextComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [core.Input()];
            _fontSize_decorators = [core.Input()];
            _gradientColors_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _autoPlay_decorators = [core.Input()];
            _repeatInterval_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _gradientTextContainerRef_decorators = [core.ViewChild('gradientTextContainer')];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
            __esDecorate(null, null, _gradientColors_decorators, { kind: "field", name: "gradientColors", static: false, private: false, access: { has: obj => "gradientColors" in obj, get: obj => obj.gradientColors, set: (obj, value) => { obj.gradientColors = value; } }, metadata: _metadata }, _gradientColors_initializers, _gradientColors_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _autoPlay_decorators, { kind: "field", name: "autoPlay", static: false, private: false, access: { has: obj => "autoPlay" in obj, get: obj => obj.autoPlay, set: (obj, value) => { obj.autoPlay = value; } }, metadata: _metadata }, _autoPlay_initializers, _autoPlay_extraInitializers);
            __esDecorate(null, null, _repeatInterval_decorators, { kind: "field", name: "repeatInterval", static: false, private: false, access: { has: obj => "repeatInterval" in obj, get: obj => obj.repeatInterval, set: (obj, value) => { obj.repeatInterval = value; } }, metadata: _metadata }, _repeatInterval_initializers, _repeatInterval_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _gradientTextContainerRef_decorators, { kind: "field", name: "gradientTextContainerRef", static: false, private: false, access: { has: obj => "gradientTextContainerRef" in obj, get: obj => obj.gradientTextContainerRef, set: (obj, value) => { obj.gradientTextContainerRef = value; } }, metadata: _metadata }, _gradientTextContainerRef_initializers, _gradientTextContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUIResizeEffectComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-resizeEffect',
                template: `
    <div 
      #resizeEffectContainer
      class="fiEyesUI-resizeEffect-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-resizeEffect-content">
        <h1>{{ text }}</h1>
      </div>
    </div>
  `,
                styles: [`
    .fiEyesUI-resizeEffect-container {
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text_decorators;
        let _text_initializers = [];
        let _text_extraInitializers = [];
        let _minFontSize_decorators;
        let _minFontSize_initializers = [];
        let _minFontSize_extraInitializers = [];
        let _maxFontSize_decorators;
        let _maxFontSize_initializers = [];
        let _maxFontSize_extraInitializers = [];
        let _minFontWeight_decorators;
        let _minFontWeight_initializers = [];
        let _minFontWeight_extraInitializers = [];
        let _maxFontWeight_decorators;
        let _maxFontWeight_initializers = [];
        let _maxFontWeight_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _autoPlay_decorators;
        let _autoPlay_initializers = [];
        let _autoPlay_extraInitializers = [];
        let _repeatInterval_decorators;
        let _repeatInterval_initializers = [];
        let _repeatInterval_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _resizeEffectContainerRef_decorators;
        let _resizeEffectContainerRef_initializers = [];
        let _resizeEffectContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text = __runInitializers(this, _text_initializers, 'Welcome To Finches Eyes UI Components');
                this.minFontSize = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _minFontSize_initializers, '20px'));
                this.maxFontSize = (__runInitializers(this, _minFontSize_extraInitializers), __runInitializers(this, _maxFontSize_initializers, '50px'));
                this.minFontWeight = (__runInitializers(this, _maxFontSize_extraInitializers), __runInitializers(this, _minFontWeight_initializers, 100));
                this.maxFontWeight = (__runInitializers(this, _minFontWeight_extraInitializers), __runInitializers(this, _maxFontWeight_initializers, 900));
                this.animationDuration = (__runInitializers(this, _maxFontWeight_extraInitializers), __runInitializers(this, _animationDuration_initializers, 5000));
                this.autoPlay = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _autoPlay_initializers, true));
                this.repeatInterval = (__runInitializers(this, _autoPlay_extraInitializers), __runInitializers(this, _repeatInterval_initializers, 6000));
                this.className = (__runInitializers(this, _repeatInterval_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.resizeEffectContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _resizeEffectContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _resizeEffectContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.resizeEffectContainerRef?.nativeElement)
                    return;
                this.resizeEffectContainerRef.nativeElement;
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                if (this.autoPlay) {
                    this.fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    this.intervalId = window.setInterval(() => {
                        this.fiEyesUIStartAnimation();
                    }, this.repeatInterval);
                }
            }
            fiEyesUIStartAnimation() {
                if (!this.resizeEffectContainerRef?.nativeElement)
                    return;
                // Calculate total animation time
                setTimeout(() => {
                    this.complete.emit();
                }, this.animationDuration);
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-resizeEffect-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-resizeEffect-container {
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
      
      .fiEyesUI-resizeEffect-content {
        font-size: ${this.minFontSize};
        font-weight: ${this.minFontWeight};
        font-family: 'Orbitron', sans-serif;
        animation: fiEyesUI-resize-anime ${this.animationDuration}ms infinite forwards;
        animation-direction: alternate;
        color: #ffffff;
      }
      
      @keyframes fiEyesUI-resize-anime {
        from {
          font-size: ${this.minFontSize};
          font-weight: ${this.minFontWeight};
          opacity: 0;
        } 
        to {
          font-size: ${this.maxFontSize};
          font-weight: ${this.maxFontWeight};
          text-shadow: 0px 0px 5px #ffffff;
          opacity: 1;
        }
      }
    `;
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUIResizeEffectComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [core.Input()];
            _minFontSize_decorators = [core.Input()];
            _maxFontSize_decorators = [core.Input()];
            _minFontWeight_decorators = [core.Input()];
            _maxFontWeight_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _autoPlay_decorators = [core.Input()];
            _repeatInterval_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _resizeEffectContainerRef_decorators = [core.ViewChild('resizeEffectContainer')];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _minFontSize_decorators, { kind: "field", name: "minFontSize", static: false, private: false, access: { has: obj => "minFontSize" in obj, get: obj => obj.minFontSize, set: (obj, value) => { obj.minFontSize = value; } }, metadata: _metadata }, _minFontSize_initializers, _minFontSize_extraInitializers);
            __esDecorate(null, null, _maxFontSize_decorators, { kind: "field", name: "maxFontSize", static: false, private: false, access: { has: obj => "maxFontSize" in obj, get: obj => obj.maxFontSize, set: (obj, value) => { obj.maxFontSize = value; } }, metadata: _metadata }, _maxFontSize_initializers, _maxFontSize_extraInitializers);
            __esDecorate(null, null, _minFontWeight_decorators, { kind: "field", name: "minFontWeight", static: false, private: false, access: { has: obj => "minFontWeight" in obj, get: obj => obj.minFontWeight, set: (obj, value) => { obj.minFontWeight = value; } }, metadata: _metadata }, _minFontWeight_initializers, _minFontWeight_extraInitializers);
            __esDecorate(null, null, _maxFontWeight_decorators, { kind: "field", name: "maxFontWeight", static: false, private: false, access: { has: obj => "maxFontWeight" in obj, get: obj => obj.maxFontWeight, set: (obj, value) => { obj.maxFontWeight = value; } }, metadata: _metadata }, _maxFontWeight_initializers, _maxFontWeight_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _autoPlay_decorators, { kind: "field", name: "autoPlay", static: false, private: false, access: { has: obj => "autoPlay" in obj, get: obj => obj.autoPlay, set: (obj, value) => { obj.autoPlay = value; } }, metadata: _metadata }, _autoPlay_initializers, _autoPlay_extraInitializers);
            __esDecorate(null, null, _repeatInterval_decorators, { kind: "field", name: "repeatInterval", static: false, private: false, access: { has: obj => "repeatInterval" in obj, get: obj => obj.repeatInterval, set: (obj, value) => { obj.repeatInterval = value; } }, metadata: _metadata }, _repeatInterval_initializers, _repeatInterval_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _resizeEffectContainerRef_decorators, { kind: "field", name: "resizeEffectContainerRef", static: false, private: false, access: { has: obj => "resizeEffectContainerRef" in obj, get: obj => obj.resizeEffectContainerRef, set: (obj, value) => { obj.resizeEffectContainerRef = value; } }, metadata: _metadata }, _resizeEffectContainerRef_initializers, _resizeEffectContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUITextScaleBounceComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-textScaleBounce',
                template: `
    <div 
      #textScaleBounceContainer
      class="fiEyesUI-textScaleBounce-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-textScaleBounce-content">
        {{ text }}
      </div>
    </div>
  `,
                styles: [`
    .fiEyesUI-textScaleBounce-container {
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text_decorators;
        let _text_initializers = [];
        let _text_extraInitializers = [];
        let _fontSize_decorators;
        let _fontSize_initializers = [];
        let _fontSize_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _autoPlay_decorators;
        let _autoPlay_initializers = [];
        let _autoPlay_extraInitializers = [];
        let _repeatInterval_decorators;
        let _repeatInterval_initializers = [];
        let _repeatInterval_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _textScaleBounceContainerRef_decorators;
        let _textScaleBounceContainerRef_initializers = [];
        let _textScaleBounceContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text = __runInitializers(this, _text_initializers, 'Welcome To Finches Eyes UI Components');
                this.fontSize = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _fontSize_initializers, '80px'));
                this.animationDuration = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _animationDuration_initializers, 1500));
                this.autoPlay = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _autoPlay_initializers, true));
                this.repeatInterval = (__runInitializers(this, _autoPlay_extraInitializers), __runInitializers(this, _repeatInterval_initializers, 3000));
                this.className = (__runInitializers(this, _repeatInterval_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.textScaleBounceContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _textScaleBounceContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _textScaleBounceContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.textScaleBounceContainerRef?.nativeElement)
                    return;
                this.textScaleBounceContainerRef.nativeElement;
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                if (this.autoPlay) {
                    this.fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    this.intervalId = window.setInterval(() => {
                        this.fiEyesUIStartAnimation();
                    }, this.repeatInterval);
                }
            }
            fiEyesUIStartAnimation() {
                if (!this.textScaleBounceContainerRef?.nativeElement)
                    return;
                const fiEyesUIContentElement = this.textScaleBounceContainerRef.nativeElement.querySelector('.fiEyesUI-textScaleBounce-content');
                if (fiEyesUIContentElement) {
                    fiEyesUIContentElement.classList.add('fiEyesUI-textScaleBounce-animate');
                    setTimeout(() => {
                        fiEyesUIContentElement.classList.remove('fiEyesUI-textScaleBounce-animate');
                        this.complete.emit();
                    }, this.animationDuration);
                }
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-textScaleBounce-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-textScaleBounce-container {
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
      
      .fiEyesUI-textScaleBounce-content {
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
        font-weight: bolder;
        color: #ffffff;
        text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
        display: inline;
        margin: auto;
      }
      
      .fiEyesUI-textScaleBounce-animate {
        animation: fiEyesUI-textScaleBounce-rotate ${this.animationDuration}ms linear forwards;
      }
      
      @keyframes fiEyesUI-textScaleBounce-rotate {
        0% {
          transform: scale(0);
        }
        10% {
          font-size: ${this.fontSize};
          transform: scale(2);
        }
        20% {
          transform: scale(0.5);
        }
        40% {
          transform: scale(1.5);
        }
        60% {
          transform: scale(0.8);
        }
        80% {
          transform: scale(1.2);
        }
        100% {
          font-size: ${this.fontSize};
          transform: scale(1);
        }
      }
    `;
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUITextScaleBounceComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [core.Input()];
            _fontSize_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _autoPlay_decorators = [core.Input()];
            _repeatInterval_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _textScaleBounceContainerRef_decorators = [core.ViewChild('textScaleBounceContainer')];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _autoPlay_decorators, { kind: "field", name: "autoPlay", static: false, private: false, access: { has: obj => "autoPlay" in obj, get: obj => obj.autoPlay, set: (obj, value) => { obj.autoPlay = value; } }, metadata: _metadata }, _autoPlay_initializers, _autoPlay_extraInitializers);
            __esDecorate(null, null, _repeatInterval_decorators, { kind: "field", name: "repeatInterval", static: false, private: false, access: { has: obj => "repeatInterval" in obj, get: obj => obj.repeatInterval, set: (obj, value) => { obj.repeatInterval = value; } }, metadata: _metadata }, _repeatInterval_initializers, _repeatInterval_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _textScaleBounceContainerRef_decorators, { kind: "field", name: "textScaleBounceContainerRef", static: false, private: false, access: { has: obj => "textScaleBounceContainerRef" in obj, get: obj => obj.textScaleBounceContainerRef, set: (obj, value) => { obj.textScaleBounceContainerRef = value; } }, metadata: _metadata }, _textScaleBounceContainerRef_initializers, _textScaleBounceContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUITextSwipeComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-textSwipe',
                template: `
    <div 
      #textSwipeContainer
      class="fiEyesUI-textSwipe-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-textSwipe-content">
        <!-- Letters will be dynamically inserted here -->
      </div>
    </div>
  `,
                styles: [`
    .fiEyesUI-textSwipe-container {
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text_decorators;
        let _text_initializers = [];
        let _text_extraInitializers = [];
        let _fontSize_decorators;
        let _fontSize_initializers = [];
        let _fontSize_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _autoPlay_decorators;
        let _autoPlay_initializers = [];
        let _autoPlay_extraInitializers = [];
        let _repeatInterval_decorators;
        let _repeatInterval_initializers = [];
        let _repeatInterval_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _textSwipeContainerRef_decorators;
        let _textSwipeContainerRef_initializers = [];
        let _textSwipeContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text = __runInitializers(this, _text_initializers, 'Welcome To Finches Eyes UI Components');
                this.fontSize = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _fontSize_initializers, '48px'));
                this.animationDuration = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _animationDuration_initializers, 1000));
                this.autoPlay = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _autoPlay_initializers, true));
                this.repeatInterval = (__runInitializers(this, _autoPlay_extraInitializers), __runInitializers(this, _repeatInterval_initializers, 2000));
                this.className = (__runInitializers(this, _repeatInterval_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.textSwipeContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _textSwipeContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _textSwipeContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.textSwipeContainerRef?.nativeElement)
                    return;
                this.textSwipeContainerRef.nativeElement;
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                // Initialize text with individual letters
                this.fiEyesUIInitializeText();
                if (this.autoPlay) {
                    this.fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    this.intervalId = window.setInterval(() => {
                        this.fiEyesUIStartAnimation();
                    }, this.repeatInterval);
                }
            }
            fiEyesUIInitializeText() {
                if (!this.textSwipeContainerRef?.nativeElement)
                    return;
                const fiEyesUIContentElement = this.textSwipeContainerRef.nativeElement.querySelector('.fiEyesUI-textSwipe-content');
                if (fiEyesUIContentElement) {
                    fiEyesUIContentElement.innerHTML = '';
                    const letters = this.text.split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.className = 'fiEyesUI-textSwipe-letter';
                        span.id = `fiEyesUI-letter-${index}`;
                        span.textContent = letter;
                        fiEyesUIContentElement.appendChild(span);
                    });
                }
            }
            fiEyesUIStartAnimation() {
                if (!this.textSwipeContainerRef?.nativeElement)
                    return;
                const letters = this.textSwipeContainerRef.nativeElement.querySelectorAll('.fiEyesUI-textSwipe-letter');
                const textLength = letters.length - 1;
                letters.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.toggle('fiEyesUI-textSwipe-opaque');
                        if (index === textLength) {
                            setTimeout(() => {
                                this.complete.emit();
                            }, this.animationDuration);
                        }
                    }, (index + (textLength / 2)) * 10 * (100 / textLength));
                });
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-textSwipe-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-textSwipe-container {
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
      
      .fiEyesUI-textSwipe-content {
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
        color: rgba(255, 255, 255, 0.2);
        margin: auto;
      }
      
      .fiEyesUI-textSwipe-letter {
        display: inline-block;
        position: relative;
        transform-origin: 50% 50%;
        transition: all 0.5s ease;
      }
      
      .fiEyesUI-textSwipe-opaque {
        animation: fiEyesUI-textSwipe-opacity ${this.animationDuration}ms linear;
      }
      
      @keyframes fiEyesUI-textSwipe-opacity {
        0% {
          color: rgba(255, 255, 255, 0.2);
        }
        50% {
          color: rgba(255, 255, 255, 1);
        }
        100% {
          color: rgba(255, 255, 255, 0.2);
        }
      }
    `;
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUITextSwipeComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [core.Input()];
            _fontSize_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _autoPlay_decorators = [core.Input()];
            _repeatInterval_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _textSwipeContainerRef_decorators = [core.ViewChild('textSwipeContainer')];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _autoPlay_decorators, { kind: "field", name: "autoPlay", static: false, private: false, access: { has: obj => "autoPlay" in obj, get: obj => obj.autoPlay, set: (obj, value) => { obj.autoPlay = value; } }, metadata: _metadata }, _autoPlay_initializers, _autoPlay_extraInitializers);
            __esDecorate(null, null, _repeatInterval_decorators, { kind: "field", name: "repeatInterval", static: false, private: false, access: { has: obj => "repeatInterval" in obj, get: obj => obj.repeatInterval, set: (obj, value) => { obj.repeatInterval = value; } }, metadata: _metadata }, _repeatInterval_initializers, _repeatInterval_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _textSwipeContainerRef_decorators, { kind: "field", name: "textSwipeContainerRef", static: false, private: false, access: { has: obj => "textSwipeContainerRef" in obj, get: obj => obj.textSwipeContainerRef, set: (obj, value) => { obj.textSwipeContainerRef = value; } }, metadata: _metadata }, _textSwipeContainerRef_initializers, _textSwipeContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUIHoverFillComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-hoverFill',
                template: `
    <div 
      #hoverFillContainer
      class="fiEyesUI-hoverFill-container"
      [class]="className"
      [style]="style"
    >
      <a 
        href="#" 
        class="fiEyesUI-hoverFill-link"
        (click)="onClick($event)"
      >
        {{ text }}
        <span 
          class="fiEyesUI-hoverFill-link-layer" 
          [attr.data-text]="text"
        ></span>
      </a>
    </div>
  `,
                styles: [`
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _text_decorators;
        let _text_initializers = [];
        let _text_extraInitializers = [];
        let _fontSize_decorators;
        let _fontSize_initializers = [];
        let _fontSize_extraInitializers = [];
        let _color_decorators;
        let _color_initializers = [];
        let _color_extraInitializers = [];
        let _hoverColor_decorators;
        let _hoverColor_initializers = [];
        let _hoverColor_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _click_decorators;
        let _click_initializers = [];
        let _click_extraInitializers = [];
        let _hoverFillContainerRef_decorators;
        let _hoverFillContainerRef_initializers = [];
        let _hoverFillContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.text = __runInitializers(this, _text_initializers, 'Welcome To Finches Eyes UI Components');
                this.fontSize = (__runInitializers(this, _text_extraInitializers), __runInitializers(this, _fontSize_initializers, '24px'));
                this.color = (__runInitializers(this, _fontSize_extraInitializers), __runInitializers(this, _color_initializers, '#ffffff'));
                this.hoverColor = (__runInitializers(this, _color_extraInitializers), __runInitializers(this, _hoverColor_initializers, '#ffffff'));
                this.className = (__runInitializers(this, _hoverColor_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.click = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _click_initializers, new core.EventEmitter()));
                this.hoverFillContainerRef = (__runInitializers(this, _click_extraInitializers), __runInitializers(this, _hoverFillContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _hoverFillContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            onClick(event) {
                event.preventDefault();
                this.click.emit();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.hoverFillContainerRef?.nativeElement)
                    return;
                // Create styles dynamically
                this.fiEyesUICreateStyles();
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-hoverFill-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
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
        color: ${this.color};
        position: relative;
        display: inline-block;
        text-decoration: none;
        font-size: ${this.fontSize};
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
        color: ${this.hoverColor};
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
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUIHoverFillComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _text_decorators = [core.Input()];
            _fontSize_decorators = [core.Input()];
            _color_decorators = [core.Input()];
            _hoverColor_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _click_decorators = [core.Output()];
            _hoverFillContainerRef_decorators = [core.ViewChild('hoverFillContainer')];
            __esDecorate(null, null, _text_decorators, { kind: "field", name: "text", static: false, private: false, access: { has: obj => "text" in obj, get: obj => obj.text, set: (obj, value) => { obj.text = value; } }, metadata: _metadata }, _text_initializers, _text_extraInitializers);
            __esDecorate(null, null, _fontSize_decorators, { kind: "field", name: "fontSize", static: false, private: false, access: { has: obj => "fontSize" in obj, get: obj => obj.fontSize, set: (obj, value) => { obj.fontSize = value; } }, metadata: _metadata }, _fontSize_initializers, _fontSize_extraInitializers);
            __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _color_extraInitializers);
            __esDecorate(null, null, _hoverColor_decorators, { kind: "field", name: "hoverColor", static: false, private: false, access: { has: obj => "hoverColor" in obj, get: obj => obj.hoverColor, set: (obj, value) => { obj.hoverColor = value; } }, metadata: _metadata }, _hoverColor_initializers, _hoverColor_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _click_decorators, { kind: "field", name: "click", static: false, private: false, access: { has: obj => "click" in obj, get: obj => obj.click, set: (obj, value) => { obj.click = value; } }, metadata: _metadata }, _click_initializers, _click_extraInitializers);
            __esDecorate(null, null, _hoverFillContainerRef_decorators, { kind: "field", name: "hoverFillContainerRef", static: false, private: false, access: { has: obj => "hoverFillContainerRef" in obj, get: obj => obj.hoverFillContainerRef, set: (obj, value) => { obj.hoverFillContainerRef = value; } }, metadata: _metadata }, _hoverFillContainerRef_initializers, _hoverFillContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUITitleRevealComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-titleReveal',
                template: `
    <div 
      #titleRevealContainer
      class="fiEyesUI-titleReveal-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-titleReveal-content">
        <h1>
          <span class="fiEyesUI-titleReveal-title">
            <!-- Letters will be dynamically inserted here -->
          </span>
          <br />
          <span class="fiEyesUI-titleReveal-subtitle">
            <!-- Subtitle will be dynamically inserted here -->
          </span>
        </h1>
      </div>
    </div>
  `,
                styles: [`
    .fiEyesUI-titleReveal-container {
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _title_decorators;
        let _title_initializers = [];
        let _title_extraInitializers = [];
        let _subtitle_decorators;
        let _subtitle_initializers = [];
        let _subtitle_extraInitializers = [];
        let _titleFontSize_decorators;
        let _titleFontSize_initializers = [];
        let _titleFontSize_extraInitializers = [];
        let _subtitleFontSize_decorators;
        let _subtitleFontSize_initializers = [];
        let _subtitleFontSize_extraInitializers = [];
        let _animationDuration_decorators;
        let _animationDuration_initializers = [];
        let _animationDuration_extraInitializers = [];
        let _autoPlay_decorators;
        let _autoPlay_initializers = [];
        let _autoPlay_extraInitializers = [];
        let _repeatInterval_decorators;
        let _repeatInterval_initializers = [];
        let _repeatInterval_extraInitializers = [];
        let _className_decorators;
        let _className_initializers = [];
        let _className_extraInitializers = [];
        let _style_decorators;
        let _style_initializers = [];
        let _style_extraInitializers = [];
        let _complete_decorators;
        let _complete_initializers = [];
        let _complete_extraInitializers = [];
        let _titleRevealContainerRef_decorators;
        let _titleRevealContainerRef_initializers = [];
        let _titleRevealContainerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.title = __runInitializers(this, _title_initializers, 'Welcome To Finches Eyes UI Components');
                this.subtitle = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _subtitle_initializers, 'Elegance is an attitude'));
                this.titleFontSize = (__runInitializers(this, _subtitle_extraInitializers), __runInitializers(this, _titleFontSize_initializers, 'calc(6vw + 1rem)'));
                this.subtitleFontSize = (__runInitializers(this, _titleFontSize_extraInitializers), __runInitializers(this, _subtitleFontSize_initializers, 'calc(0.4vw + 0.5rem)'));
                this.animationDuration = (__runInitializers(this, _subtitleFontSize_extraInitializers), __runInitializers(this, _animationDuration_initializers, 500));
                this.autoPlay = (__runInitializers(this, _animationDuration_extraInitializers), __runInitializers(this, _autoPlay_initializers, true));
                this.repeatInterval = (__runInitializers(this, _autoPlay_extraInitializers), __runInitializers(this, _repeatInterval_initializers, 4000));
                this.className = (__runInitializers(this, _repeatInterval_extraInitializers), __runInitializers(this, _className_initializers, ''));
                this.style = (__runInitializers(this, _className_extraInitializers), __runInitializers(this, _style_initializers, {}));
                this.complete = (__runInitializers(this, _style_extraInitializers), __runInitializers(this, _complete_initializers, new core.EventEmitter()));
                this.titleRevealContainerRef = (__runInitializers(this, _complete_extraInitializers), __runInitializers(this, _titleRevealContainerRef_initializers, void 0));
                this.fiEyesUIStyleElement = __runInitializers(this, _titleRevealContainerRef_extraInitializers);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeAnimation();
            }
            ngOnDestroy() {
                this.fiEyesUICleanup();
            }
            fiEyesUIInitializeAnimation() {
                if (!this.titleRevealContainerRef?.nativeElement)
                    return;
                this.titleRevealContainerRef.nativeElement;
                // Create styles dynamically
                this.fiEyesUICreateStyles();
                // Initialize text with individual letters
                this.fiEyesUIInitializeText();
                if (this.autoPlay) {
                    this.fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    this.intervalId = window.setInterval(() => {
                        this.fiEyesUIStartAnimation();
                    }, this.repeatInterval);
                }
            }
            fiEyesUIInitializeText() {
                if (!this.titleRevealContainerRef?.nativeElement)
                    return;
                const titleElement = this.titleRevealContainerRef.nativeElement.querySelector('.fiEyesUI-titleReveal-title');
                const subtitleElement = this.titleRevealContainerRef.nativeElement.querySelector('.fiEyesUI-titleReveal-subtitle');
                if (titleElement) {
                    titleElement.innerHTML = '';
                    const letters = this.title.split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.className = 'fiEyesUI-titleReveal-letter';
                        span.id = `fiEyesUI-title-letter-${index}`;
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        titleElement.appendChild(span);
                    });
                }
                if (subtitleElement) {
                    subtitleElement.textContent = this.subtitle;
                }
            }
            fiEyesUIStartAnimation() {
                if (!this.titleRevealContainerRef?.nativeElement)
                    return;
                const letters = this.titleRevealContainerRef.nativeElement.querySelectorAll('.fiEyesUI-titleReveal-letter');
                const subtitleElement = this.titleRevealContainerRef.nativeElement.querySelector('.fiEyesUI-titleReveal-subtitle');
                // Reset all elements
                letters.forEach(letter => {
                    letter.classList.remove('fiEyesUI-titleReveal-letter-animate', 'fiEyesUI-titleReveal-letter-fade');
                });
                if (subtitleElement) {
                    subtitleElement.classList.remove('fiEyesUI-titleReveal-subtitle-animate');
                }
                // Animate letters
                setTimeout(() => {
                    letters.forEach((letter, index) => {
                        setTimeout(() => {
                            letter.classList.add('fiEyesUI-titleReveal-letter-animate');
                        }, 50 * index);
                        setTimeout(() => {
                            letter.classList.add('fiEyesUI-titleReveal-letter-fade');
                            if (index === letters.length - 1) {
                                setTimeout(() => {
                                    if (subtitleElement) {
                                        subtitleElement.classList.add('fiEyesUI-titleReveal-subtitle-animate');
                                    }
                                    this.complete.emit();
                                }, 60 * index + 100);
                            }
                        }, 60 * index);
                    });
                }, 500);
            }
            fiEyesUICreateStyles() {
                const fiEyesUIStyleId = 'fiEyesUI-titleReveal-styles';
                this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId);
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
                this.fiEyesUIStyleElement = document.createElement('style');
                this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
                this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-titleReveal-container {
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
      
      .fiEyesUI-titleReveal-content {
        position: relative;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        margin: 0;
      }
      
      .fiEyesUI-titleReveal-title {
        font-weight: 700;
        display: inline-flex;
        margin: -5px;
        padding: 5px;
      }
      
      .fiEyesUI-titleReveal-letter {
        font-size: ${this.titleFontSize};
        margin-left: -2px;
        opacity: 0;
      }
      
      .fiEyesUI-titleReveal-subtitle {
        font-weight: 400;
        font-size: ${this.subtitleFontSize};
        letter-spacing: calc(0.3vw + 0.5rem);
        text-transform: uppercase;
        position: relative;
        top: -5px;
        opacity: 0;
      }
      
      .fiEyesUI-titleReveal-letter-animate {
        animation: fiEyesUI-titleReveal-slide ${this.animationDuration}ms ease-in-quad forwards;
      }
      
      .fiEyesUI-titleReveal-letter-fade {
        animation: fiEyesUI-titleReveal-fade ${this.animationDuration}ms ease-in-quad forwards;
      }
      
      .fiEyesUI-titleReveal-subtitle-animate {
        animation: fiEyesUI-titleReveal-subtitle-fade 300ms ease-in-quad forwards;
      }
      
      @keyframes fiEyesUI-titleReveal-slide {
        from {
          transform: translateX(5px);
        }
        to {
          transform: translateX(0);
        }
      }
      
      @keyframes fiEyesUI-titleReveal-fade {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes fiEyesUI-titleReveal-subtitle-fade {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;
                document.head.appendChild(this.fiEyesUIStyleElement);
            }
            fiEyesUICleanup() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                if (this.fiEyesUIStyleElement) {
                    this.fiEyesUIStyleElement.remove();
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUITitleRevealComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _title_decorators = [core.Input()];
            _subtitle_decorators = [core.Input()];
            _titleFontSize_decorators = [core.Input()];
            _subtitleFontSize_decorators = [core.Input()];
            _animationDuration_decorators = [core.Input()];
            _autoPlay_decorators = [core.Input()];
            _repeatInterval_decorators = [core.Input()];
            _className_decorators = [core.Input()];
            _style_decorators = [core.Input()];
            _complete_decorators = [core.Output()];
            _titleRevealContainerRef_decorators = [core.ViewChild('titleRevealContainer')];
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _subtitle_decorators, { kind: "field", name: "subtitle", static: false, private: false, access: { has: obj => "subtitle" in obj, get: obj => obj.subtitle, set: (obj, value) => { obj.subtitle = value; } }, metadata: _metadata }, _subtitle_initializers, _subtitle_extraInitializers);
            __esDecorate(null, null, _titleFontSize_decorators, { kind: "field", name: "titleFontSize", static: false, private: false, access: { has: obj => "titleFontSize" in obj, get: obj => obj.titleFontSize, set: (obj, value) => { obj.titleFontSize = value; } }, metadata: _metadata }, _titleFontSize_initializers, _titleFontSize_extraInitializers);
            __esDecorate(null, null, _subtitleFontSize_decorators, { kind: "field", name: "subtitleFontSize", static: false, private: false, access: { has: obj => "subtitleFontSize" in obj, get: obj => obj.subtitleFontSize, set: (obj, value) => { obj.subtitleFontSize = value; } }, metadata: _metadata }, _subtitleFontSize_initializers, _subtitleFontSize_extraInitializers);
            __esDecorate(null, null, _animationDuration_decorators, { kind: "field", name: "animationDuration", static: false, private: false, access: { has: obj => "animationDuration" in obj, get: obj => obj.animationDuration, set: (obj, value) => { obj.animationDuration = value; } }, metadata: _metadata }, _animationDuration_initializers, _animationDuration_extraInitializers);
            __esDecorate(null, null, _autoPlay_decorators, { kind: "field", name: "autoPlay", static: false, private: false, access: { has: obj => "autoPlay" in obj, get: obj => obj.autoPlay, set: (obj, value) => { obj.autoPlay = value; } }, metadata: _metadata }, _autoPlay_initializers, _autoPlay_extraInitializers);
            __esDecorate(null, null, _repeatInterval_decorators, { kind: "field", name: "repeatInterval", static: false, private: false, access: { has: obj => "repeatInterval" in obj, get: obj => obj.repeatInterval, set: (obj, value) => { obj.repeatInterval = value; } }, metadata: _metadata }, _repeatInterval_initializers, _repeatInterval_extraInitializers);
            __esDecorate(null, null, _className_decorators, { kind: "field", name: "className", static: false, private: false, access: { has: obj => "className" in obj, get: obj => obj.className, set: (obj, value) => { obj.className = value; } }, metadata: _metadata }, _className_initializers, _className_extraInitializers);
            __esDecorate(null, null, _style_decorators, { kind: "field", name: "style", static: false, private: false, access: { has: obj => "style" in obj, get: obj => obj.style, set: (obj, value) => { obj.style = value; } }, metadata: _metadata }, _style_initializers, _style_extraInitializers);
            __esDecorate(null, null, _complete_decorators, { kind: "field", name: "complete", static: false, private: false, access: { has: obj => "complete" in obj, get: obj => obj.complete, set: (obj, value) => { obj.complete = value; } }, metadata: _metadata }, _complete_initializers, _complete_extraInitializers);
            __esDecorate(null, null, _titleRevealContainerRef_decorators, { kind: "field", name: "titleRevealContainerRef", static: false, private: false, access: { has: obj => "titleRevealContainerRef" in obj, get: obj => obj.titleRevealContainerRef, set: (obj, value) => { obj.titleRevealContainerRef = value; } }, metadata: _metadata }, _titleRevealContainerRef_initializers, _titleRevealContainerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUIWavyTextComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-wavy-text',
                template: `
    <div 
      #container
      class="fiEyesUI-wavy-text-container"
      [style.font-size]="config.fontSize || '2em'"
      [style]="customStyle"
    >
      <span
        *ngFor="let char of textChars; let i = index"
        class="fiEyesUI-wavy-text-span"
        [style.--i]="i"
        [style.animation-delay]="(config.delayMultiplier || 0.1) * i + 's'"
        [style.animation-duration]="(config.animationDuration || 1.5) + 's'"
      >
        {{ char === ' ' ? '\u00A0' : char }}
      </span>
    </div>
  `,
                styles: [`
    .fiEyesUI-wavy-text-container {
      position: relative;
      display: inline-block;
      background-color: #000000;
      color: #ffffff;
      font-family: 'Orbitron', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    
    .fiEyesUI-wavy-text-span {
      position: relative;
      display: inline-block;
      color: #ffffff;
      animation: fiEyesUI-wavy-animate 1.5s ease-in-out infinite;
    }
    
    @keyframes fiEyesUI-wavy-animate {
      0%, 100% {
        transform: translateY(0px);
      }
      20% {
        transform: translateY(-20px);
      }
      40% {
        transform: translateY(0px);
      }
    }
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _config_decorators;
        let _config_initializers = [];
        let _config_extraInitializers = [];
        let _customStyle_decorators;
        let _customStyle_initializers = [];
        let _customStyle_extraInitializers = [];
        let _animationComplete_decorators;
        let _animationComplete_initializers = [];
        let _animationComplete_extraInitializers = [];
        let _animationStart_decorators;
        let _animationStart_initializers = [];
        let _animationStart_extraInitializers = [];
        let _containerRef_decorators;
        let _containerRef_initializers = [];
        let _containerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.config = __runInitializers(this, _config_initializers, {});
                this.customStyle = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _customStyle_initializers, ''));
                this.animationComplete = (__runInitializers(this, _customStyle_extraInitializers), __runInitializers(this, _animationComplete_initializers, new core.EventEmitter()));
                this.animationStart = (__runInitializers(this, _animationComplete_extraInitializers), __runInitializers(this, _animationStart_initializers, new core.EventEmitter()));
                this.containerRef = (__runInitializers(this, _animationStart_extraInitializers), __runInitializers(this, _containerRef_initializers, void 0));
                this.textChars = (__runInitializers(this, _containerRef_extraInitializers), []);
                this.animationTimeout = null;
            }
            ngOnInit() {
                this.textChars = (this.config.text || 'Welcome To Finches Eyes UI Components').split('');
            }
            ngAfterViewInit() {
                if (this.config.autoPlay !== false) {
                    this.fiEyesUIStartWavyAnimation();
                }
            }
            ngOnDestroy() {
                this.fiEyesUIStopWavyAnimation();
            }
            fiEyesUIStartWavyAnimation() {
                if (!this.containerRef?.nativeElement)
                    return;
                const spans = this.containerRef.nativeElement.querySelectorAll('.fiEyesUI-wavy-text-span');
                spans.forEach((span, index) => {
                    const element = span;
                    element.style.setProperty('--i', index.toString());
                    element.style.animationDelay = `${(this.config.delayMultiplier || 0.1) * index}s`;
                    element.style.animationDuration = `${this.config.animationDuration || 1.5}s`;
                });
                this.animationStart.emit();
                if (this.config.repeatInterval && this.config.repeatInterval > 0) {
                    this.animationTimeout = window.setTimeout(() => {
                        this.fiEyesUIStartWavyAnimation();
                    }, this.config.repeatInterval * 1000);
                }
            }
            fiEyesUIStopWavyAnimation() {
                if (this.animationTimeout) {
                    clearTimeout(this.animationTimeout);
                    this.animationTimeout = null;
                }
            }
            fiEyesUIResetAnimation() {
                this.fiEyesUIStopWavyAnimation();
                setTimeout(() => {
                    this.fiEyesUIStartWavyAnimation();
                }, 100);
            }
        };
        __setFunctionName(_classThis, "FiEyesUIWavyTextComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _config_decorators = [core.Input()];
            _customStyle_decorators = [core.Input()];
            _animationComplete_decorators = [core.Output()];
            _animationStart_decorators = [core.Output()];
            _containerRef_decorators = [core.ViewChild('container', { static: false })];
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(null, null, _customStyle_decorators, { kind: "field", name: "customStyle", static: false, private: false, access: { has: obj => "customStyle" in obj, get: obj => obj.customStyle, set: (obj, value) => { obj.customStyle = value; } }, metadata: _metadata }, _customStyle_initializers, _customStyle_extraInitializers);
            __esDecorate(null, null, _animationComplete_decorators, { kind: "field", name: "animationComplete", static: false, private: false, access: { has: obj => "animationComplete" in obj, get: obj => obj.animationComplete, set: (obj, value) => { obj.animationComplete = value; } }, metadata: _metadata }, _animationComplete_initializers, _animationComplete_extraInitializers);
            __esDecorate(null, null, _animationStart_decorators, { kind: "field", name: "animationStart", static: false, private: false, access: { has: obj => "animationStart" in obj, get: obj => obj.animationStart, set: (obj, value) => { obj.animationStart = value; } }, metadata: _metadata }, _animationStart_initializers, _animationStart_extraInitializers);
            __esDecorate(null, null, _containerRef_decorators, { kind: "field", name: "containerRef", static: false, private: false, access: { has: obj => "containerRef" in obj, get: obj => obj.containerRef, set: (obj, value) => { obj.containerRef = value; } }, metadata: _metadata }, _containerRef_initializers, _containerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUISlideLeftComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-slideLeft',
                template: `
    <div 
      #container
      class="fiEyesUI-slideLeft-container"
      [style.font-size]="config.fontSize || '50px'"
      [style]="customStyle"
    >
      <h1 class="fiEyesUI-slideLeft-title">
        <span
          *ngFor="let char of textChars; let i = index"
          class="fiEyesUI-slideLeft-span"
          [style.animation-delay]="(config.letterDelay || 0.1) * i + 's'"
          [style.animation-duration]="(config.animationDuration || 1.5) + 's'"
        >
          {{ char === ' ' ? '\u00A0' : char }}
        </span>
      </h1>
    </div>
  `,
                styles: [`
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
    }
    
    @keyframes fiEyesUI-slideLeft {
      from {
        opacity: 0;
        transform: translateX(200px);
      } 
      to {
        opacity: 1;
        transform: translateX(0%);
      }
    }
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _config_decorators;
        let _config_initializers = [];
        let _config_extraInitializers = [];
        let _customStyle_decorators;
        let _customStyle_initializers = [];
        let _customStyle_extraInitializers = [];
        let _animationComplete_decorators;
        let _animationComplete_initializers = [];
        let _animationComplete_extraInitializers = [];
        let _animationStart_decorators;
        let _animationStart_initializers = [];
        let _animationStart_extraInitializers = [];
        let _containerRef_decorators;
        let _containerRef_initializers = [];
        let _containerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.config = __runInitializers(this, _config_initializers, {});
                this.customStyle = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _customStyle_initializers, ''));
                this.animationComplete = (__runInitializers(this, _customStyle_extraInitializers), __runInitializers(this, _animationComplete_initializers, new core.EventEmitter()));
                this.animationStart = (__runInitializers(this, _animationComplete_extraInitializers), __runInitializers(this, _animationStart_initializers, new core.EventEmitter()));
                this.containerRef = (__runInitializers(this, _animationStart_extraInitializers), __runInitializers(this, _containerRef_initializers, void 0));
                this.textChars = (__runInitializers(this, _containerRef_extraInitializers), []);
                this.animationTimeout = null;
            }
            ngOnInit() {
                this.textChars = (this.config.text || 'Welcome To Finches Eyes UI Components').split('');
            }
            ngAfterViewInit() {
                if (this.config.autoPlay !== false) {
                    this.fiEyesUIStartSlideLeftAnimation();
                }
            }
            ngOnDestroy() {
                this.fiEyesUIStopSlideLeftAnimation();
            }
            fiEyesUIStartSlideLeftAnimation() {
                if (!this.containerRef?.nativeElement)
                    return;
                const spans = this.containerRef.nativeElement.querySelectorAll('.fiEyesUI-slideLeft-span');
                spans.forEach((span, index) => {
                    const element = span;
                    element.style.animationDelay = `${(this.config.letterDelay || 0.1) * index}s`;
                    element.style.animationDuration = `${this.config.animationDuration || 1.5}s`;
                });
                this.animationStart.emit();
                if (this.config.repeatInterval && this.config.repeatInterval > 0) {
                    this.animationTimeout = window.setTimeout(() => {
                        this.fiEyesUIStartSlideLeftAnimation();
                    }, this.config.repeatInterval * 1000);
                }
            }
            fiEyesUIStopSlideLeftAnimation() {
                if (this.animationTimeout) {
                    clearTimeout(this.animationTimeout);
                    this.animationTimeout = null;
                }
            }
            fiEyesUIResetAnimation() {
                this.fiEyesUIStopSlideLeftAnimation();
                setTimeout(() => {
                    this.fiEyesUIStartSlideLeftAnimation();
                }, 100);
            }
        };
        __setFunctionName(_classThis, "FiEyesUISlideLeftComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _config_decorators = [core.Input()];
            _customStyle_decorators = [core.Input()];
            _animationComplete_decorators = [core.Output()];
            _animationStart_decorators = [core.Output()];
            _containerRef_decorators = [core.ViewChild('container', { static: false })];
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(null, null, _customStyle_decorators, { kind: "field", name: "customStyle", static: false, private: false, access: { has: obj => "customStyle" in obj, get: obj => obj.customStyle, set: (obj, value) => { obj.customStyle = value; } }, metadata: _metadata }, _customStyle_initializers, _customStyle_extraInitializers);
            __esDecorate(null, null, _animationComplete_decorators, { kind: "field", name: "animationComplete", static: false, private: false, access: { has: obj => "animationComplete" in obj, get: obj => obj.animationComplete, set: (obj, value) => { obj.animationComplete = value; } }, metadata: _metadata }, _animationComplete_initializers, _animationComplete_extraInitializers);
            __esDecorate(null, null, _animationStart_decorators, { kind: "field", name: "animationStart", static: false, private: false, access: { has: obj => "animationStart" in obj, get: obj => obj.animationStart, set: (obj, value) => { obj.animationStart = value; } }, metadata: _metadata }, _animationStart_initializers, _animationStart_extraInitializers);
            __esDecorate(null, null, _containerRef_decorators, { kind: "field", name: "containerRef", static: false, private: false, access: { has: obj => "containerRef" in obj, get: obj => obj.containerRef, set: (obj, value) => { obj.containerRef = value; } }, metadata: _metadata }, _containerRef_initializers, _containerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUISlideRevealComponent = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-slideReveal',
                template: `
    <div 
      #container
      class="fiEyesUI-slideReveal-container"
      [style.font-size]="config.fontSize || '25px'"
      [style]="customStyle"
    >
      <h1 class="fiEyesUI-slideReveal-title">
        <div class="fiEyesUI-slideReveal-text">
          {{ config.text || 'Welcome To Finches Eyes UI Components' }}
        </div>
      </h1>
    </div>
  `,
                styles: [`
    .fiEyesUI-slideReveal-container {
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Orbitron', sans-serif;
      background-color: #000000;
      color: #ffffff;
      height: 100%;
      position: relative;
    }
    
    .fiEyesUI-slideReveal-title {
      position: relative;
      letter-spacing: 3px;
      font-weight: 300;
      text-transform: uppercase;
      padding-right: 30px;
      overflow: hidden;
    }
    
    .fiEyesUI-slideReveal-text {
      margin: 0 auto;
      white-space: nowrap;
      transform: translateX(calc(100% + 30px));
      animation: fiEyesUI-leftSlide 1.1s cubic-bezier(0.68, -0.55, 0.265, 1.10) forwards;
    }
    
    .fiEyesUI-slideReveal-title::before {
      content: "";
      position: absolute;
      right: 0;
      height: 100%;
      background: #000000;
      animation: fiEyesUI-hiddingSlide 1.1s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
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
      animation: fiEyesUI-rightSlide 1.1s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _config_decorators;
        let _config_initializers = [];
        let _config_extraInitializers = [];
        let _customStyle_decorators;
        let _customStyle_initializers = [];
        let _customStyle_extraInitializers = [];
        let _animationComplete_decorators;
        let _animationComplete_initializers = [];
        let _animationComplete_extraInitializers = [];
        let _animationStart_decorators;
        let _animationStart_initializers = [];
        let _animationStart_extraInitializers = [];
        let _containerRef_decorators;
        let _containerRef_initializers = [];
        let _containerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.config = __runInitializers(this, _config_initializers, {});
                this.customStyle = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _customStyle_initializers, ''));
                this.animationComplete = (__runInitializers(this, _customStyle_extraInitializers), __runInitializers(this, _animationComplete_initializers, new core.EventEmitter()));
                this.animationStart = (__runInitializers(this, _animationComplete_extraInitializers), __runInitializers(this, _animationStart_initializers, new core.EventEmitter()));
                this.containerRef = (__runInitializers(this, _animationStart_extraInitializers), __runInitializers(this, _containerRef_initializers, void 0));
                this.animationTimeout = (__runInitializers(this, _containerRef_extraInitializers), null);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                if (this.config.autoPlay !== false) {
                    this.fiEyesUIStartSlideRevealAnimation();
                }
            }
            ngOnDestroy() {
                this.fiEyesUIStopSlideRevealAnimation();
            }
            fiEyesUIStartSlideRevealAnimation() {
                if (!this.containerRef?.nativeElement)
                    return;
                const textElement = this.containerRef.nativeElement.querySelector('.fiEyesUI-slideReveal-text');
                if (textElement) {
                    // Reset animation
                    textElement.classList.remove('fiEyesUI-slideReveal-animate');
                    // Trigger animation
                    setTimeout(() => {
                        textElement.classList.add('fiEyesUI-slideReveal-animate');
                    }, 10);
                }
                this.animationStart.emit();
                if (this.config.repeatInterval && this.config.repeatInterval > 0) {
                    this.animationTimeout = window.setTimeout(() => {
                        this.fiEyesUIStartSlideRevealAnimation();
                    }, this.config.repeatInterval * 1000);
                }
            }
            fiEyesUIStopSlideRevealAnimation() {
                if (this.animationTimeout) {
                    clearTimeout(this.animationTimeout);
                    this.animationTimeout = null;
                }
            }
            fiEyesUIResetAnimation() {
                this.fiEyesUIStopSlideRevealAnimation();
                setTimeout(() => {
                    this.fiEyesUIStartSlideRevealAnimation();
                }, 100);
            }
        };
        __setFunctionName(_classThis, "FiEyesUISlideRevealComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _config_decorators = [core.Input()];
            _customStyle_decorators = [core.Input()];
            _animationComplete_decorators = [core.Output()];
            _animationStart_decorators = [core.Output()];
            _containerRef_decorators = [core.ViewChild('container', { static: false })];
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(null, null, _customStyle_decorators, { kind: "field", name: "customStyle", static: false, private: false, access: { has: obj => "customStyle" in obj, get: obj => obj.customStyle, set: (obj, value) => { obj.customStyle = value; } }, metadata: _metadata }, _customStyle_initializers, _customStyle_extraInitializers);
            __esDecorate(null, null, _animationComplete_decorators, { kind: "field", name: "animationComplete", static: false, private: false, access: { has: obj => "animationComplete" in obj, get: obj => obj.animationComplete, set: (obj, value) => { obj.animationComplete = value; } }, metadata: _metadata }, _animationComplete_initializers, _animationComplete_extraInitializers);
            __esDecorate(null, null, _animationStart_decorators, { kind: "field", name: "animationStart", static: false, private: false, access: { has: obj => "animationStart" in obj, get: obj => obj.animationStart, set: (obj, value) => { obj.animationStart = value; } }, metadata: _metadata }, _animationStart_initializers, _animationStart_extraInitializers);
            __esDecorate(null, null, _containerRef_decorators, { kind: "field", name: "containerRef", static: false, private: false, access: { has: obj => "containerRef" in obj, get: obj => obj.containerRef, set: (obj, value) => { obj.containerRef = value; } }, metadata: _metadata }, _containerRef_initializers, _containerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUITextEffect1Component = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-textEffect1',
                template: `
    <div 
      #container
      class="fiEyesUI-textEffect1-container"
      [style.font-size]="config.fontSize || '5rem'"
      [style]="customStyle"
    >
      <div class="fiEyesUI-textEffect1-text"></div>
    </div>
  `,
                styles: [`
    .fiEyesUI-textEffect1-container {
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
    
    .fiEyesUI-textEffect1-text {
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      line-height: 1.2;
    }
    
    .fiEyesUI-textEffect1-text span {
      display: inline-block;
      transform-style: preserve-3d;
      transform-origin: bottom;
      animation: fiEyesUI-anim1 2s linear infinite alternate;
      animation-delay: var(--delay);
      font-weight: bold;
      color: #000000;
      text-shadow: 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000;
    }
    
    @keyframes fiEyesUI-anim1 {
      0% {
        text-shadow: 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000;
        scale: 1 0;
      }
      100% {
        text-shadow: 0px 0px 2px #ffffff, 0px 0px 2px #ffffff, 0px 0px 2px #ffffff, 0px 0px 2px #ffffff;
        scale: 1 1;
      }
    }
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _config_decorators;
        let _config_initializers = [];
        let _config_extraInitializers = [];
        let _customStyle_decorators;
        let _customStyle_initializers = [];
        let _customStyle_extraInitializers = [];
        let _animationComplete_decorators;
        let _animationComplete_initializers = [];
        let _animationComplete_extraInitializers = [];
        let _animationStart_decorators;
        let _animationStart_initializers = [];
        let _animationStart_extraInitializers = [];
        let _containerRef_decorators;
        let _containerRef_initializers = [];
        let _containerRef_extraInitializers = [];
        _classThis = class {
            constructor() {
                this.config = __runInitializers(this, _config_initializers, {});
                this.customStyle = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _customStyle_initializers, ''));
                this.animationComplete = (__runInitializers(this, _customStyle_extraInitializers), __runInitializers(this, _animationComplete_initializers, new core.EventEmitter()));
                this.animationStart = (__runInitializers(this, _animationComplete_extraInitializers), __runInitializers(this, _animationStart_initializers, new core.EventEmitter()));
                this.containerRef = (__runInitializers(this, _animationStart_extraInitializers), __runInitializers(this, _containerRef_initializers, void 0));
                this.animationTimeout = (__runInitializers(this, _containerRef_extraInitializers), null);
            }
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeTextEffect1();
                if (this.config.autoPlay !== false) {
                    this.fiEyesUIStartAnimation();
                }
            }
            ngOnDestroy() {
                this.fiEyesUIStopAnimation();
            }
            fiEyesUIInitializeTextEffect1() {
                if (!this.containerRef?.nativeElement)
                    return;
                const container = this.containerRef.nativeElement;
                const textElement = container.querySelector('.fiEyesUI-textEffect1-text');
                if (textElement) {
                    textElement.innerHTML = '';
                    const letters = (this.config.text || 'Welcome To Finches Eyes UI Components').split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        span.style.setProperty('--delay', `${index * 0.1}s`);
                        span.style.setProperty('--duration', `${this.config.animationDuration || 2}s`);
                        textElement.appendChild(span);
                    });
                }
                this.animationStart.emit();
            }
            fiEyesUIStartAnimation() {
                if (this.config.repeatInterval && this.config.repeatInterval > 0) {
                    this.animationTimeout = window.setTimeout(() => {
                        this.fiEyesUIStartAnimation();
                    }, this.config.repeatInterval * 1000);
                }
            }
            fiEyesUIStopAnimation() {
                if (this.animationTimeout) {
                    clearTimeout(this.animationTimeout);
                    this.animationTimeout = null;
                }
            }
        };
        __setFunctionName(_classThis, "FiEyesUITextEffect1Component");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _config_decorators = [core.Input()];
            _customStyle_decorators = [core.Input()];
            _animationComplete_decorators = [core.Output()];
            _animationStart_decorators = [core.Output()];
            _containerRef_decorators = [core.ViewChild('container', { static: false })];
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(null, null, _customStyle_decorators, { kind: "field", name: "customStyle", static: false, private: false, access: { has: obj => "customStyle" in obj, get: obj => obj.customStyle, set: (obj, value) => { obj.customStyle = value; } }, metadata: _metadata }, _customStyle_initializers, _customStyle_extraInitializers);
            __esDecorate(null, null, _animationComplete_decorators, { kind: "field", name: "animationComplete", static: false, private: false, access: { has: obj => "animationComplete" in obj, get: obj => obj.animationComplete, set: (obj, value) => { obj.animationComplete = value; } }, metadata: _metadata }, _animationComplete_initializers, _animationComplete_extraInitializers);
            __esDecorate(null, null, _animationStart_decorators, { kind: "field", name: "animationStart", static: false, private: false, access: { has: obj => "animationStart" in obj, get: obj => obj.animationStart, set: (obj, value) => { obj.animationStart = value; } }, metadata: _metadata }, _animationStart_initializers, _animationStart_extraInitializers);
            __esDecorate(null, null, _containerRef_decorators, { kind: "field", name: "containerRef", static: false, private: false, access: { has: obj => "containerRef" in obj, get: obj => obj.containerRef, set: (obj, value) => { obj.containerRef = value; } }, metadata: _metadata }, _containerRef_initializers, _containerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUITextEffect2Component = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-textEffect2',
                template: `
    <div 
      #container
      class="fiEyesUI-textEffect2-container"
      [style.font-size]="config.fontSize || '3rem'"
      [style]="customStyle"
    >
      <div class="fiEyesUI-textEffect2-text"></div>
    </div>
  `,
                styles: [`
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _config_decorators;
        let _config_initializers = [];
        let _config_extraInitializers = [];
        let _customStyle_decorators;
        let _customStyle_initializers = [];
        let _customStyle_extraInitializers = [];
        let _animationComplete_decorators;
        let _animationComplete_initializers = [];
        let _animationComplete_extraInitializers = [];
        let _animationStart_decorators;
        let _animationStart_initializers = [];
        let _animationStart_extraInitializers = [];
        let _containerRef_decorators;
        let _containerRef_initializers = [];
        let _containerRef_extraInitializers = [];
        _classThis = class {
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeTextEffect2();
                this.animationStart.emit();
            }
            ngOnDestroy() {
                // Cleanup if needed
            }
            fiEyesUIInitializeTextEffect2() {
                if (!this.containerRef?.nativeElement)
                    return;
                const container = this.containerRef.nativeElement;
                const textElement = container.querySelector('.fiEyesUI-textEffect2-text');
                if (textElement) {
                    textElement.innerHTML = '';
                    const letters = (this.config.text || 'Welcome To Finches Eyes UI Components').split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        span.style.setProperty('--delay', `${index * 0.1}s`);
                        textElement.appendChild(span);
                    });
                }
            }
            constructor() {
                this.config = __runInitializers(this, _config_initializers, {});
                this.customStyle = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _customStyle_initializers, ''));
                this.animationComplete = (__runInitializers(this, _customStyle_extraInitializers), __runInitializers(this, _animationComplete_initializers, new core.EventEmitter()));
                this.animationStart = (__runInitializers(this, _animationComplete_extraInitializers), __runInitializers(this, _animationStart_initializers, new core.EventEmitter()));
                this.containerRef = (__runInitializers(this, _animationStart_extraInitializers), __runInitializers(this, _containerRef_initializers, void 0));
                __runInitializers(this, _containerRef_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "FiEyesUITextEffect2Component");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _config_decorators = [core.Input()];
            _customStyle_decorators = [core.Input()];
            _animationComplete_decorators = [core.Output()];
            _animationStart_decorators = [core.Output()];
            _containerRef_decorators = [core.ViewChild('container', { static: false })];
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(null, null, _customStyle_decorators, { kind: "field", name: "customStyle", static: false, private: false, access: { has: obj => "customStyle" in obj, get: obj => obj.customStyle, set: (obj, value) => { obj.customStyle = value; } }, metadata: _metadata }, _customStyle_initializers, _customStyle_extraInitializers);
            __esDecorate(null, null, _animationComplete_decorators, { kind: "field", name: "animationComplete", static: false, private: false, access: { has: obj => "animationComplete" in obj, get: obj => obj.animationComplete, set: (obj, value) => { obj.animationComplete = value; } }, metadata: _metadata }, _animationComplete_initializers, _animationComplete_extraInitializers);
            __esDecorate(null, null, _animationStart_decorators, { kind: "field", name: "animationStart", static: false, private: false, access: { has: obj => "animationStart" in obj, get: obj => obj.animationStart, set: (obj, value) => { obj.animationStart = value; } }, metadata: _metadata }, _animationStart_initializers, _animationStart_extraInitializers);
            __esDecorate(null, null, _containerRef_decorators, { kind: "field", name: "containerRef", static: false, private: false, access: { has: obj => "containerRef" in obj, get: obj => obj.containerRef, set: (obj, value) => { obj.containerRef = value; } }, metadata: _metadata }, _containerRef_initializers, _containerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUITextEffect3Component = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-textEffect3',
                template: `
    <div 
      #container
      class="fiEyesUI-textEffect3-container"
      [style.font-size]="config.fontSize || '3rem'"
      [style]="customStyle"
    >
      <div class="fiEyesUI-textEffect3-text"></div>
    </div>
  `,
                styles: [`
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _config_decorators;
        let _config_initializers = [];
        let _config_extraInitializers = [];
        let _customStyle_decorators;
        let _customStyle_initializers = [];
        let _customStyle_extraInitializers = [];
        let _animationComplete_decorators;
        let _animationComplete_initializers = [];
        let _animationComplete_extraInitializers = [];
        let _animationStart_decorators;
        let _animationStart_initializers = [];
        let _animationStart_extraInitializers = [];
        let _containerRef_decorators;
        let _containerRef_initializers = [];
        let _containerRef_extraInitializers = [];
        _classThis = class {
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeTextEffect3();
                this.animationStart.emit();
            }
            ngOnDestroy() {
                // Cleanup if needed
            }
            fiEyesUIInitializeTextEffect3() {
                if (!this.containerRef?.nativeElement)
                    return;
                const container = this.containerRef.nativeElement;
                const textElement = container.querySelector('.fiEyesUI-textEffect3-text');
                if (textElement) {
                    textElement.innerHTML = '';
                    const letters = (this.config.text || 'Welcome To Finches Eyes UI Components').split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        textElement.appendChild(span);
                    });
                }
            }
            constructor() {
                this.config = __runInitializers(this, _config_initializers, {});
                this.customStyle = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _customStyle_initializers, ''));
                this.animationComplete = (__runInitializers(this, _customStyle_extraInitializers), __runInitializers(this, _animationComplete_initializers, new core.EventEmitter()));
                this.animationStart = (__runInitializers(this, _animationComplete_extraInitializers), __runInitializers(this, _animationStart_initializers, new core.EventEmitter()));
                this.containerRef = (__runInitializers(this, _animationStart_extraInitializers), __runInitializers(this, _containerRef_initializers, void 0));
                __runInitializers(this, _containerRef_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "FiEyesUITextEffect3Component");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _config_decorators = [core.Input()];
            _customStyle_decorators = [core.Input()];
            _animationComplete_decorators = [core.Output()];
            _animationStart_decorators = [core.Output()];
            _containerRef_decorators = [core.ViewChild('container', { static: false })];
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(null, null, _customStyle_decorators, { kind: "field", name: "customStyle", static: false, private: false, access: { has: obj => "customStyle" in obj, get: obj => obj.customStyle, set: (obj, value) => { obj.customStyle = value; } }, metadata: _metadata }, _customStyle_initializers, _customStyle_extraInitializers);
            __esDecorate(null, null, _animationComplete_decorators, { kind: "field", name: "animationComplete", static: false, private: false, access: { has: obj => "animationComplete" in obj, get: obj => obj.animationComplete, set: (obj, value) => { obj.animationComplete = value; } }, metadata: _metadata }, _animationComplete_initializers, _animationComplete_extraInitializers);
            __esDecorate(null, null, _animationStart_decorators, { kind: "field", name: "animationStart", static: false, private: false, access: { has: obj => "animationStart" in obj, get: obj => obj.animationStart, set: (obj, value) => { obj.animationStart = value; } }, metadata: _metadata }, _animationStart_initializers, _animationStart_extraInitializers);
            __esDecorate(null, null, _containerRef_decorators, { kind: "field", name: "containerRef", static: false, private: false, access: { has: obj => "containerRef" in obj, get: obj => obj.containerRef, set: (obj, value) => { obj.containerRef = value; } }, metadata: _metadata }, _containerRef_initializers, _containerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUITextEffect4Component = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-textEffect4',
                template: `
    <div 
      #container
      class="fiEyesUI-textEffect4-container"
      [style.font-size]="config.fontSize || '3rem'"
      [style]="customStyle"
    >
      <div class="fiEyesUI-textEffect4-text"></div>
    </div>
  `,
                styles: [`
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _config_decorators;
        let _config_initializers = [];
        let _config_extraInitializers = [];
        let _customStyle_decorators;
        let _customStyle_initializers = [];
        let _customStyle_extraInitializers = [];
        let _animationComplete_decorators;
        let _animationComplete_initializers = [];
        let _animationComplete_extraInitializers = [];
        let _animationStart_decorators;
        let _animationStart_initializers = [];
        let _animationStart_extraInitializers = [];
        let _containerRef_decorators;
        let _containerRef_initializers = [];
        let _containerRef_extraInitializers = [];
        _classThis = class {
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeTextEffect4();
                this.animationStart.emit();
            }
            ngOnDestroy() {
                // Cleanup if needed
            }
            fiEyesUIInitializeTextEffect4() {
                if (!this.containerRef?.nativeElement)
                    return;
                const container = this.containerRef.nativeElement;
                const textElement = container.querySelector('.fiEyesUI-textEffect4-text');
                if (textElement) {
                    textElement.innerHTML = '';
                    const letters = (this.config.text || 'Welcome To Finches Eyes UI Components').split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        span.setAttribute('char', letter === ' ' ? '\u00A0' : letter);
                        span.style.setProperty('--delay', `${index * 0.1}s`);
                        textElement.appendChild(span);
                    });
                }
            }
            constructor() {
                this.config = __runInitializers(this, _config_initializers, {});
                this.customStyle = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _customStyle_initializers, ''));
                this.animationComplete = (__runInitializers(this, _customStyle_extraInitializers), __runInitializers(this, _animationComplete_initializers, new core.EventEmitter()));
                this.animationStart = (__runInitializers(this, _animationComplete_extraInitializers), __runInitializers(this, _animationStart_initializers, new core.EventEmitter()));
                this.containerRef = (__runInitializers(this, _animationStart_extraInitializers), __runInitializers(this, _containerRef_initializers, void 0));
                __runInitializers(this, _containerRef_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "FiEyesUITextEffect4Component");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _config_decorators = [core.Input()];
            _customStyle_decorators = [core.Input()];
            _animationComplete_decorators = [core.Output()];
            _animationStart_decorators = [core.Output()];
            _containerRef_decorators = [core.ViewChild('container', { static: false })];
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(null, null, _customStyle_decorators, { kind: "field", name: "customStyle", static: false, private: false, access: { has: obj => "customStyle" in obj, get: obj => obj.customStyle, set: (obj, value) => { obj.customStyle = value; } }, metadata: _metadata }, _customStyle_initializers, _customStyle_extraInitializers);
            __esDecorate(null, null, _animationComplete_decorators, { kind: "field", name: "animationComplete", static: false, private: false, access: { has: obj => "animationComplete" in obj, get: obj => obj.animationComplete, set: (obj, value) => { obj.animationComplete = value; } }, metadata: _metadata }, _animationComplete_initializers, _animationComplete_extraInitializers);
            __esDecorate(null, null, _animationStart_decorators, { kind: "field", name: "animationStart", static: false, private: false, access: { has: obj => "animationStart" in obj, get: obj => obj.animationStart, set: (obj, value) => { obj.animationStart = value; } }, metadata: _metadata }, _animationStart_initializers, _animationStart_extraInitializers);
            __esDecorate(null, null, _containerRef_decorators, { kind: "field", name: "containerRef", static: false, private: false, access: { has: obj => "containerRef" in obj, get: obj => obj.containerRef, set: (obj, value) => { obj.containerRef = value; } }, metadata: _metadata }, _containerRef_initializers, _containerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUITextEffect5Component = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-textEffect5',
                template: `
    <div 
      #container
      class="fiEyesUI-textEffect5-container"
      [style.font-size]="config.fontSize || '3rem'"
      [style]="customStyle"
      (click)="fiEyesUIDisintegrate()"
    >
      <div class="fiEyesUI-textEffect5-text"></div>
    </div>
  `,
                styles: [`
    .fiEyesUI-textEffect5-container {
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
      cursor: pointer;
    }
    
    .fiEyesUI-textEffect5-text {
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      line-height: 1.2;
    }
    
    .fiEyesUI-textEffect5-text span {
      position: relative;
      color: #ffffff;
      pointer-events: none;
    }
    
    .fiEyesUI-disintegrate {
      animation: fiEyesUI-anim5 var(--duration, 1s) linear forwards;
      animation-delay: calc(var(--delay, 0) * 1s);
    }
    
    @keyframes fiEyesUI-anim5 {
      0% {
        filter: blur(0px);
      }
      10% {
        filter: blur(0px);
      }
      100% {
        filter: blur(500px);
      }
    }
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _config_decorators;
        let _config_initializers = [];
        let _config_extraInitializers = [];
        let _customStyle_decorators;
        let _customStyle_initializers = [];
        let _customStyle_extraInitializers = [];
        let _animationComplete_decorators;
        let _animationComplete_initializers = [];
        let _animationComplete_extraInitializers = [];
        let _animationStart_decorators;
        let _animationStart_initializers = [];
        let _animationStart_extraInitializers = [];
        let _containerRef_decorators;
        let _containerRef_initializers = [];
        let _containerRef_extraInitializers = [];
        _classThis = class {
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeTextEffect5();
                this.animationStart.emit();
            }
            ngOnDestroy() {
                // Cleanup if needed
            }
            fiEyesUIInitializeTextEffect5() {
                if (!this.containerRef?.nativeElement)
                    return;
                const container = this.containerRef.nativeElement;
                const textElement = container.querySelector('.fiEyesUI-textEffect5-text');
                if (textElement) {
                    textElement.innerHTML = '';
                    const letters = (this.config.text || 'Welcome To Finches Eyes UI Components').split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        span.style.setProperty('--delay', `${index * 0.1}s`);
                        textElement.appendChild(span);
                    });
                }
            }
            fiEyesUIDisintegrate() {
                if (!this.containerRef?.nativeElement)
                    return;
                const container = this.containerRef.nativeElement;
                const spans = container.querySelectorAll('.fiEyesUI-textEffect5-text span');
                spans.forEach((span, index) => {
                    const element = span;
                    element.style.setProperty('--delay', `${index * 0.1}s`);
                    element.style.setProperty('--duration', '1s');
                    element.classList.add('fiEyesUI-disintegrate');
                });
                setTimeout(() => {
                    this.animationComplete.emit();
                }, 1000);
            }
            constructor() {
                this.config = __runInitializers(this, _config_initializers, {});
                this.customStyle = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _customStyle_initializers, ''));
                this.animationComplete = (__runInitializers(this, _customStyle_extraInitializers), __runInitializers(this, _animationComplete_initializers, new core.EventEmitter()));
                this.animationStart = (__runInitializers(this, _animationComplete_extraInitializers), __runInitializers(this, _animationStart_initializers, new core.EventEmitter()));
                this.containerRef = (__runInitializers(this, _animationStart_extraInitializers), __runInitializers(this, _containerRef_initializers, void 0));
                __runInitializers(this, _containerRef_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "FiEyesUITextEffect5Component");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _config_decorators = [core.Input()];
            _customStyle_decorators = [core.Input()];
            _animationComplete_decorators = [core.Output()];
            _animationStart_decorators = [core.Output()];
            _containerRef_decorators = [core.ViewChild('container', { static: false })];
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(null, null, _customStyle_decorators, { kind: "field", name: "customStyle", static: false, private: false, access: { has: obj => "customStyle" in obj, get: obj => obj.customStyle, set: (obj, value) => { obj.customStyle = value; } }, metadata: _metadata }, _customStyle_initializers, _customStyle_extraInitializers);
            __esDecorate(null, null, _animationComplete_decorators, { kind: "field", name: "animationComplete", static: false, private: false, access: { has: obj => "animationComplete" in obj, get: obj => obj.animationComplete, set: (obj, value) => { obj.animationComplete = value; } }, metadata: _metadata }, _animationComplete_initializers, _animationComplete_extraInitializers);
            __esDecorate(null, null, _animationStart_decorators, { kind: "field", name: "animationStart", static: false, private: false, access: { has: obj => "animationStart" in obj, get: obj => obj.animationStart, set: (obj, value) => { obj.animationStart = value; } }, metadata: _metadata }, _animationStart_initializers, _animationStart_extraInitializers);
            __esDecorate(null, null, _containerRef_decorators, { kind: "field", name: "containerRef", static: false, private: false, access: { has: obj => "containerRef" in obj, get: obj => obj.containerRef, set: (obj, value) => { obj.containerRef = value; } }, metadata: _metadata }, _containerRef_initializers, _containerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUITextEffect6Component = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-textEffect6',
                template: `
    <div 
      #container
      class="fiEyesUI-textEffect6-container"
      [style.font-size]="config.fontSize || '3rem'"
      [style]="customStyle"
    >
      <div class="fiEyesUI-textEffect6-text"></div>
    </div>
  `,
                styles: [`
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _config_decorators;
        let _config_initializers = [];
        let _config_extraInitializers = [];
        let _customStyle_decorators;
        let _customStyle_initializers = [];
        let _customStyle_extraInitializers = [];
        let _animationComplete_decorators;
        let _animationComplete_initializers = [];
        let _animationComplete_extraInitializers = [];
        let _animationStart_decorators;
        let _animationStart_initializers = [];
        let _animationStart_extraInitializers = [];
        let _containerRef_decorators;
        let _containerRef_initializers = [];
        let _containerRef_extraInitializers = [];
        _classThis = class {
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeTextEffect6();
                this.animationStart.emit();
            }
            ngOnDestroy() {
                // Cleanup if needed
            }
            fiEyesUIInitializeTextEffect6() {
                if (!this.containerRef?.nativeElement)
                    return;
                const container = this.containerRef.nativeElement;
                const textElement = container.querySelector('.fiEyesUI-textEffect6-text');
                if (textElement) {
                    textElement.innerHTML = '';
                    const letters = (this.config.text || 'Welcome To Finches Eyes UI Components').split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        span.style.setProperty('--delay', `${index * 0.1}s`);
                        span.style.setProperty('--index', index.toString());
                        span.style.setProperty('--totalChars', letters.length.toString());
                        textElement.appendChild(span);
                    });
                }
            }
            constructor() {
                this.config = __runInitializers(this, _config_initializers, {});
                this.customStyle = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _customStyle_initializers, ''));
                this.animationComplete = (__runInitializers(this, _customStyle_extraInitializers), __runInitializers(this, _animationComplete_initializers, new core.EventEmitter()));
                this.animationStart = (__runInitializers(this, _animationComplete_extraInitializers), __runInitializers(this, _animationStart_initializers, new core.EventEmitter()));
                this.containerRef = (__runInitializers(this, _animationStart_extraInitializers), __runInitializers(this, _containerRef_initializers, void 0));
                __runInitializers(this, _containerRef_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "FiEyesUITextEffect6Component");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _config_decorators = [core.Input()];
            _customStyle_decorators = [core.Input()];
            _animationComplete_decorators = [core.Output()];
            _animationStart_decorators = [core.Output()];
            _containerRef_decorators = [core.ViewChild('container', { static: false })];
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(null, null, _customStyle_decorators, { kind: "field", name: "customStyle", static: false, private: false, access: { has: obj => "customStyle" in obj, get: obj => obj.customStyle, set: (obj, value) => { obj.customStyle = value; } }, metadata: _metadata }, _customStyle_initializers, _customStyle_extraInitializers);
            __esDecorate(null, null, _animationComplete_decorators, { kind: "field", name: "animationComplete", static: false, private: false, access: { has: obj => "animationComplete" in obj, get: obj => obj.animationComplete, set: (obj, value) => { obj.animationComplete = value; } }, metadata: _metadata }, _animationComplete_initializers, _animationComplete_extraInitializers);
            __esDecorate(null, null, _animationStart_decorators, { kind: "field", name: "animationStart", static: false, private: false, access: { has: obj => "animationStart" in obj, get: obj => obj.animationStart, set: (obj, value) => { obj.animationStart = value; } }, metadata: _metadata }, _animationStart_initializers, _animationStart_extraInitializers);
            __esDecorate(null, null, _containerRef_decorators, { kind: "field", name: "containerRef", static: false, private: false, access: { has: obj => "containerRef" in obj, get: obj => obj.containerRef, set: (obj, value) => { obj.containerRef = value; } }, metadata: _metadata }, _containerRef_initializers, _containerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    let FiEyesUITextEffect7Component = (() => {
        let _classDecorators = [core.Component({
                selector: 'fiEyesUI-textEffect7',
                template: `
    <div 
      #container
      class="fiEyesUI-textEffect7-container"
      [style.font-size]="config.fontSize || '3rem'"
      [style]="customStyle"
    >
      <div class="fiEyesUI-textEffect7-text"></div>
    </div>
  `,
                styles: [`
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
  `]
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _config_decorators;
        let _config_initializers = [];
        let _config_extraInitializers = [];
        let _customStyle_decorators;
        let _customStyle_initializers = [];
        let _customStyle_extraInitializers = [];
        let _animationComplete_decorators;
        let _animationComplete_initializers = [];
        let _animationComplete_extraInitializers = [];
        let _animationStart_decorators;
        let _animationStart_initializers = [];
        let _animationStart_extraInitializers = [];
        let _containerRef_decorators;
        let _containerRef_initializers = [];
        let _containerRef_extraInitializers = [];
        _classThis = class {
            ngOnInit() {
                // Component initialization
            }
            ngAfterViewInit() {
                this.fiEyesUIInitializeTextEffect7();
                this.animationStart.emit();
            }
            ngOnDestroy() {
                // Cleanup if needed
            }
            fiEyesUIInitializeTextEffect7() {
                if (!this.containerRef?.nativeElement)
                    return;
                const container = this.containerRef.nativeElement;
                const textElement = container.querySelector('.fiEyesUI-textEffect7-text');
                if (textElement) {
                    textElement.innerHTML = '';
                    const letters = (this.config.text || 'Welcome To Finches Eyes UI Components').split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        span.style.setProperty('--delay', `${index * 0.1}s`);
                        textElement.appendChild(span);
                    });
                }
            }
            constructor() {
                this.config = __runInitializers(this, _config_initializers, {});
                this.customStyle = (__runInitializers(this, _config_extraInitializers), __runInitializers(this, _customStyle_initializers, ''));
                this.animationComplete = (__runInitializers(this, _customStyle_extraInitializers), __runInitializers(this, _animationComplete_initializers, new core.EventEmitter()));
                this.animationStart = (__runInitializers(this, _animationComplete_extraInitializers), __runInitializers(this, _animationStart_initializers, new core.EventEmitter()));
                this.containerRef = (__runInitializers(this, _animationStart_extraInitializers), __runInitializers(this, _containerRef_initializers, void 0));
                __runInitializers(this, _containerRef_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "FiEyesUITextEffect7Component");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _config_decorators = [core.Input()];
            _customStyle_decorators = [core.Input()];
            _animationComplete_decorators = [core.Output()];
            _animationStart_decorators = [core.Output()];
            _containerRef_decorators = [core.ViewChild('container', { static: false })];
            __esDecorate(null, null, _config_decorators, { kind: "field", name: "config", static: false, private: false, access: { has: obj => "config" in obj, get: obj => obj.config, set: (obj, value) => { obj.config = value; } }, metadata: _metadata }, _config_initializers, _config_extraInitializers);
            __esDecorate(null, null, _customStyle_decorators, { kind: "field", name: "customStyle", static: false, private: false, access: { has: obj => "customStyle" in obj, get: obj => obj.customStyle, set: (obj, value) => { obj.customStyle = value; } }, metadata: _metadata }, _customStyle_initializers, _customStyle_extraInitializers);
            __esDecorate(null, null, _animationComplete_decorators, { kind: "field", name: "animationComplete", static: false, private: false, access: { has: obj => "animationComplete" in obj, get: obj => obj.animationComplete, set: (obj, value) => { obj.animationComplete = value; } }, metadata: _metadata }, _animationComplete_initializers, _animationComplete_extraInitializers);
            __esDecorate(null, null, _animationStart_decorators, { kind: "field", name: "animationStart", static: false, private: false, access: { has: obj => "animationStart" in obj, get: obj => obj.animationStart, set: (obj, value) => { obj.animationStart = value; } }, metadata: _metadata }, _animationStart_initializers, _animationStart_extraInitializers);
            __esDecorate(null, null, _containerRef_decorators, { kind: "field", name: "containerRef", static: false, private: false, access: { has: obj => "containerRef" in obj, get: obj => obj.containerRef, set: (obj, value) => { obj.containerRef = value; } }, metadata: _metadata }, _containerRef_initializers, _containerRef_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return _classThis;
    })();

    function useFiEyesUIVueAnimation(options = {}) {
        const { keyframes = [], config = {}, preset, autoPlay = false, onStart, onEnd, onIteration, } = options;
        const elementRef = vue.ref(null);
        const animationRef = vue.ref(null);
        const isPlaying = vue.ref(false);
        const isPaused = vue.ref(false);
        const isFinished = vue.ref(false);
        const createAnimation = () => {
            if (!elementRef.value)
                return;
            let finalKeyframes = keyframes;
            let finalConfig = { ...config };
            // Use preset if provided
            if (preset) {
                const presetAnimation = getFiEyesUIPresetAnimation(preset);
                if (presetAnimation) {
                    finalKeyframes = presetAnimation.keyframes;
                    finalConfig = { ...presetAnimation.defaultConfig, ...config };
                }
            }
            if (finalKeyframes.length === 0)
                return;
            const animationOptions = {
                element: elementRef.value,
                keyframes: finalKeyframes,
                config: finalConfig,
                onStart: () => {
                    isPlaying.value = true;
                    isPaused.value = false;
                    isFinished.value = false;
                    onStart?.();
                },
                onEnd: () => {
                    isPlaying.value = false;
                    isPaused.value = false;
                    isFinished.value = true;
                    onEnd?.();
                },
                onIteration: () => {
                    onIteration?.();
                },
            };
            animationRef.value = fiEyesUIAnimationEngine.createAnimation(animationOptions);
        };
        const play = () => {
            if (animationRef.value) {
                animationRef.value.play();
            }
            else {
                createAnimation();
                if (animationRef.value) {
                    animationRef.value.play();
                }
            }
        };
        const pause = () => {
            animationRef.value?.pause();
            isPlaying.value = false;
            isPaused.value = true;
        };
        const reverse = () => {
            animationRef.value?.reverse();
        };
        const finish = () => {
            animationRef.value?.finish();
            isPlaying.value = false;
            isPaused.value = false;
            isFinished.value = true;
        };
        const cancel = () => {
            animationRef.value?.cancel();
            animationRef.value = null;
            isPlaying.value = false;
            isPaused.value = false;
            isFinished.value = false;
        };
        vue.onMounted(() => {
            if (autoPlay) {
                createAnimation();
                play();
            }
        });
        vue.onUnmounted(() => {
            if (elementRef.value) {
                fiEyesUIAnimationEngine.cancelAnimation(elementRef.value);
            }
        });
        return {
            elementRef,
            play,
            pause,
            reverse,
            finish,
            cancel,
            isPlaying,
            isPaused,
            isFinished,
        };
    }

    vue.defineComponent({
        name: 'FiEyesUIAnimatedComponent',
        props: {
            keyframes: {
                type: Array,
                default: () => []
            },
            config: {
                type: Object,
                default: () => ({})
            },
            preset: {
                type: String,
                default: undefined
            },
            autoPlay: {
                type: Boolean,
                default: false
            },
            tag: {
                type: String,
                default: 'div'
            },
            className: {
                type: String,
                default: undefined
            },
            style: {
                type: Object,
                default: () => ({})
            },
            trigger: {
                type: String,
                default: 'manual'
            },
            onStart: {
                type: Function,
                default: undefined
            },
            onEnd: {
                type: Function,
                default: undefined
            },
            onIteration: {
                type: Function,
                default: undefined
            }
        },
        emits: ['start', 'end', 'iteration'],
        setup(props, { emit, slots }) {
            const animation = useFiEyesUIVueAnimation({
                keyframes: props.keyframes,
                config: props.config,
                preset: props.preset,
                autoPlay: props.autoPlay,
                onStart: () => {
                    emit('start');
                    props.onStart?.();
                },
                onEnd: () => {
                    emit('end');
                    props.onEnd?.();
                },
                onIteration: () => {
                    emit('iteration');
                    props.onIteration?.();
                },
            });
            const handleClick = () => {
                if (props.trigger === 'click') {
                    animation.play();
                }
            };
            const handleMouseEnter = () => {
                if (props.trigger === 'hover') {
                    animation.play();
                }
            };
            const handleFocus = () => {
                if (props.trigger === 'focus') {
                    animation.play();
                }
            };
            // Expose animation methods to parent
            const exposedMethods = {
                play: animation.play,
                pause: animation.pause,
                reverse: animation.reverse,
                finish: animation.finish,
                cancel: animation.cancel,
                isPlaying: animation.isPlaying,
                isPaused: animation.isPaused,
                isFinished: animation.isFinished,
            };
            return {
                elementRef: animation.elementRef,
                handleClick,
                handleMouseEnter,
                handleFocus,
                ...exposedMethods
            };
        },
        render() {
            const Tag = this.tag;
            return (jsxRuntime.jsx(Tag, { ref: this.elementRef, class: this.className, style: this.style, onClick: this.handleClick, onMouseenter: this.handleMouseEnter, onFocus: this.handleFocus, children: this.$slots.default?.() }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUITextDrop',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '3em'
            },
            color: {
                type: String,
                default: '#ffffff'
            },
            secondaryColor: {
                type: String,
                default: '#ffffff'
            },
            animationDuration: {
                type: Number,
                default: 1.2
            },
            delayRange: {
                type: Object,
                default: () => ({ min: 1, max: 9 })
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const textDropContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const fiEyesUIRandomDelay = (min, max) => {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-textDrop-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-textDrop-container {
          font-family: 'Orbitron', sans-serif;
          font-weight: 400;
          text-align: center;
          margin: 0;
          padding: 20px;
          background-color: #000000;
          color: #ffffff;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .fiEyesUI-letterDrop {
          position: relative;
          top: 0;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.5em;
          opacity: 0.8;
          transform: rotateX(-90deg);
          animation: fiEyesUILetterDrop ${props.animationDuration}s ease 1 normal forwards;
        }
        
        .fiEyesUI-letterDrop.fiEyesUI-secondary {
          color: ${props.secondaryColor};
        }
        
        @keyframes fiEyesUILetterDrop {
          10% {
            opacity: 0.5;
          }
          20% {
            opacity: 0.8;
            top: 3.75em;
            transform: rotateX(-360deg);
          }
          100% {
            opacity: 1;
            top: 4.50em;
            transform: rotateX(360deg);
          }
        }
      `;
                // Add delay classes
                for (let i = props.delayRange.min; i <= props.delayRange.max; i++) {
                    fiEyesUIStyleElement.value.textContent += `
          .fiEyesUI-ld${i} { 
            animation-delay: 1.${i}s; 
          }
        `;
                }
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUIInitializeAnimation = () => {
                if (!textDropContainerRef.value)
                    return;
                const fiEyesUIContainer = textDropContainerRef.value;
                const fiEyesUIText = props.text;
                const fiEyesUICharacters = fiEyesUIText.split('');
                // Clear container
                fiEyesUIContainer.innerHTML = '';
                // Create styles dynamically
                fiEyesUICreateStyles();
                let fiEyesUICharacterIndex = 0;
                const fiEyesUIMaxDelay = Math.max(...Array.from({ length: fiEyesUICharacters.length }, (_, i) => fiEyesUIRandomDelay(props.delayRange.min, props.delayRange.max)));
                fiEyesUICharacters.forEach((fiEyesUIChar, fiEyesUIIndex) => {
                    const fiEyesUIDelay = fiEyesUIRandomDelay(props.delayRange.min, props.delayRange.max);
                    const fiEyesUISpan = document.createElement('span');
                    fiEyesUISpan.className = `fiEyesUI-letterDrop fiEyesUI-ld${fiEyesUIDelay}`;
                    fiEyesUISpan.style.color = props.color;
                    // Add secondary color to even characters
                    if (fiEyesUIIndex % 2 === 1) {
                        fiEyesUISpan.classList.add('fiEyesUI-secondary');
                    }
                    fiEyesUISpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
                    fiEyesUIContainer.appendChild(fiEyesUISpan);
                    // Track completion
                    fiEyesUICharacterIndex++;
                    if (fiEyesUICharacterIndex === fiEyesUICharacters.length) {
                        const fiEyesUIMaxAnimationTime = (fiEyesUIMaxDelay / 10) * 1000 + (props.animationDuration * 1000);
                        setTimeout(() => {
                            emit('complete');
                        }, fiEyesUIMaxAnimationTime);
                    }
                });
            };
            const fiEyesUICleanup = () => {
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                fiEyesUIInitializeAnimation();
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: textDropContainerRef, class: `fiEyesUI-textDrop-container ${props.className}`, style: {
                    fontSize: props.fontSize,
                    ...props.style
                } }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUIFlyInOut',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '3em'
            },
            color: {
                type: String,
                default: '#ffffff'
            },
            animationDuration: {
                type: Number,
                default: 4
            },
            animationSpeed: {
                type: Number,
                default: 100
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const flyInOutContainerRef = vue.ref();
            const flyInOutTyperRef = vue.ref();
            const fiEyesUIAnimationTimeout = vue.ref();
            const fiEyesUIInitializeAnimation = () => {
                if (!flyInOutTyperRef.value)
                    return;
                const fiEyesUIParagraph = flyInOutTyperRef.value;
                const fiEyesUIText = props.text;
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
                    fiEyesUIAnimationTimeout.value = window.setTimeout(() => {
                        fiEyesUIWrappedChars[j].className = 'fiEyesUIFlyInOut';
                        j += 1;
                        if (j < fiEyesUIWrappedCharsLen) {
                            fiEyesUIAddEffect();
                        }
                        else {
                            // Animation completed
                            setTimeout(() => {
                                emit('complete');
                            }, props.animationDuration * 1000);
                        }
                    }, props.animationSpeed);
                };
                fiEyesUIAddEffect();
            };
            const fiEyesUICleanup = () => {
                if (fiEyesUIAnimationTimeout.value) {
                    clearTimeout(fiEyesUIAnimationTimeout.value);
                }
            };
            vue.onMounted(() => {
                fiEyesUIInitializeAnimation();
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsxs("div", { ref: flyInOutContainerRef, class: `fiEyesUI-flyInOut-container ${props.className}`, style: {
                    fontFamily: "'Orbitron', sans-serif",
                    margin: "0 auto",
                    position: "relative",
                    zIndex: 2,
                    display: "table",
                    width: "100%",
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    padding: "20px",
                    minHeight: "120px",
                    ...props.style
                }, children: [jsxRuntime.jsx("div", { class: "fiEyesUI-flyInOut-content", children: jsxRuntime.jsx("p", { ref: flyInOutTyperRef, class: "fiEyesUI-flyInOut-typer", style: {
                                display: "table",
                                textAlign: "center",
                                verticalAlign: "middle",
                                margin: "0 auto",
                                padding: "15% 0",
                                fontSize: props.fontSize,
                                lineHeight: "3em",
                                letterSpacing: "0.5em",
                                textTransform: "uppercase",
                                color: props.color
                            }, children: props.text }) }), jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
              color: ${props.color};
              animation: fiEyesUIFlyInOut ${props.animationDuration}s infinite ease-in-out;
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
                        } })] }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUIBlurReveal',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '32px'
            },
            color: {
                type: String,
                default: '#ffffff'
            },
            animationDuration: {
                type: Number,
                default: 550
            },
            letterDelay: {
                type: Number,
                default: 35
            },
            autoRepeat: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 2000
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const blurRevealContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const intervalRef = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-blurReveal-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-blurReveal-container {
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
        }
        
        .fiEyesUI-blurReveal-text {
          color: ${props.color};
          font-size: ${props.fontSize};
          text-align: center;
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
        }
        
        .fiEyesUI-blurReveal-text span {
          opacity: 0;
          transition: all ${props.animationDuration}ms ease;
          filter: blur(25px);
          transform: translateZ(0);
          display: inline-block;
        }
        
        .fiEyesUI-blurReveal-text.animate span {
          opacity: 1;
          filter: blur(0px);
        }
      `;
                // Add delay classes for each character
                const fiEyesUICharacters = props.text.split('');
                fiEyesUICharacters.forEach((_, index) => {
                    const delay = props.letterDelay * (index + 1);
                    fiEyesUIStyleElement.value.textContent += `
          .fiEyesUI-blurReveal-text span:nth-child(${index + 1}) {
            transition-delay: ${delay}ms;
          }
        `;
                });
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUIStartAnimation = () => {
                if (!blurRevealContainerRef.value)
                    return;
                blurRevealContainerRef.value.classList.add('animate');
                // Calculate total animation time
                const totalTime = (props.text.length * props.letterDelay) + props.animationDuration;
                setTimeout(() => {
                    emit('complete');
                }, totalTime);
            };
            const fiEyesUIStartAutoRepeat = () => {
                if (props.autoRepeat) {
                    intervalRef.value = setInterval(() => {
                        if (blurRevealContainerRef.value) {
                            blurRevealContainerRef.value.classList.remove('animate');
                            setTimeout(() => {
                                fiEyesUIStartAnimation();
                            }, 100);
                        }
                    }, props.repeatInterval);
                }
            };
            const fiEyesUIInitializeAnimation = () => {
                if (!blurRevealContainerRef.value)
                    return;
                const fiEyesUIContainer = blurRevealContainerRef.value;
                const fiEyesUIText = props.text;
                const fiEyesUICharacters = fiEyesUIText.split('');
                // Clear container
                fiEyesUIContainer.innerHTML = '';
                // Create styles dynamically
                fiEyesUICreateStyles();
                // Create spans for each character
                fiEyesUICharacters.forEach((fiEyesUIChar) => {
                    const fiEyesUISpan = document.createElement('span');
                    fiEyesUISpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
                    fiEyesUIContainer.appendChild(fiEyesUISpan);
                });
                // Start animation
                fiEyesUIStartAnimation();
                // Start auto repeat if enabled
                fiEyesUIStartAutoRepeat();
            };
            const fiEyesUICleanup = () => {
                if (intervalRef.value) {
                    clearInterval(intervalRef.value);
                }
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                fiEyesUIInitializeAnimation();
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: blurRevealContainerRef, class: `fiEyesUI-blurReveal-container ${props.className}`, style: {
                    fontSize: props.fontSize,
                    ...props.style
                } }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUILetterBounce',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '4rem'
            },
            color: {
                type: String,
                default: '#ffffff'
            },
            animationDuration: {
                type: Number,
                default: 800
            },
            letterDelay: {
                type: Number,
                default: 80
            },
            loop: {
                type: Boolean,
                default: true
            },
            direction: {
                type: String,
                default: 'alternate'
            },
            easing: {
                type: String,
                default: 'easeInBounce'
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const letterBounceContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const animationTimeout = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-letterBounce-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-letterBounce-container {
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
        
        .fiEyesUI-letterBounce-container:before {
          content: '';
          width: 100%;
          background: ${props.color};
          opacity: 0.3;
          bottom: 0;
          height: 1px;
          left: 0;
          position: absolute;
        }
        
        .fiEyesUI-letterBounce-name {
          display: flex;
          margin: auto;
          padding: 0 1rem 1rem;
          position: relative;
        }
        
        .fiEyesUI-letterBounce-letter {
          display: inline-block;
          opacity: 0;
          transform: scale(0.9);
          color: ${props.color};
          font-size: ${props.fontSize};
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
        }
      `;
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUIStartAnimation = () => {
                if (!letterBounceContainerRef.value)
                    return;
                const fiEyesUIContainer = letterBounceContainerRef.value;
                const fiEyesUILetters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-letterBounce-letter');
                // Animate each letter with delay
                fiEyesUILetters.forEach((fiEyesUILetter, fiEyesUIIndex) => {
                    setTimeout(() => {
                        fiEyesUILetter.style.opacity = '1';
                        fiEyesUILetter.style.transform = 'scale(1)';
                        fiEyesUILetter.style.transition = `all ${props.animationDuration}ms ${props.easing}`;
                    }, fiEyesUIIndex * props.letterDelay);
                });
                // Calculate total animation time
                const totalTime = (props.text.length * props.letterDelay) + props.animationDuration;
                animationTimeout.value = setTimeout(() => {
                    emit('complete');
                    // If loop is enabled, restart animation
                    if (props.loop) {
                        setTimeout(() => {
                            fiEyesUIResetAndRestart();
                        }, 1000);
                    }
                }, totalTime);
            };
            const fiEyesUIResetAndRestart = () => {
                if (!letterBounceContainerRef.value)
                    return;
                const fiEyesUIContainer = letterBounceContainerRef.value;
                const fiEyesUILetters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-letterBounce-letter');
                fiEyesUILetters.forEach((fiEyesUILetter) => {
                    fiEyesUILetter.style.opacity = '0';
                    fiEyesUILetter.style.transform = 'scale(0.9)';
                });
                setTimeout(() => {
                    fiEyesUIStartAnimation();
                }, 100);
            };
            const fiEyesUIInitializeAnimation = () => {
                if (!letterBounceContainerRef.value)
                    return;
                const fiEyesUIContainer = letterBounceContainerRef.value;
                const fiEyesUIText = props.text;
                const fiEyesUICharacters = fiEyesUIText.split('');
                // Clear container
                fiEyesUIContainer.innerHTML = '';
                // Create styles dynamically
                fiEyesUICreateStyles();
                // Create name container
                const fiEyesUINameDiv = document.createElement('div');
                fiEyesUINameDiv.className = 'fiEyesUI-letterBounce-name';
                // Create letter divs for each character
                fiEyesUICharacters.forEach((fiEyesUIChar) => {
                    const fiEyesUILetterDiv = document.createElement('div');
                    fiEyesUILetterDiv.className = 'fiEyesUI-letterBounce-letter';
                    fiEyesUILetterDiv.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
                    fiEyesUINameDiv.appendChild(fiEyesUILetterDiv);
                });
                fiEyesUIContainer.appendChild(fiEyesUINameDiv);
                // Start animation
                fiEyesUIStartAnimation();
            };
            const fiEyesUICleanup = () => {
                if (animationTimeout.value) {
                    clearTimeout(animationTimeout.value);
                }
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                fiEyesUIInitializeAnimation();
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: letterBounceContainerRef, class: `fiEyesUI-letterBounce-container ${props.className}`, style: {
                    fontSize: props.fontSize,
                    ...props.style
                } }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUITextScale',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '80px'
            },
            color: {
                type: String,
                default: '#ffffff'
            },
            animationDuration: {
                type: Number,
                default: 1500
            },
            animationDelay: {
                type: Number,
                default: 0
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 3000
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const textScaleContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const intervalId = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-textScale-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-textScale-container {
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
        
        .fiEyesUI-textScale-appendText {
          text-align: center;
          padding: 34px;
          display: block;
          color: ${props.color};
          width: 100%;
        }
        
        .fiEyesUI-textScale-character {
          display: inline;
          font-weight: bolder;
          font-size: ${props.fontSize};
          margin: auto;
          text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
        }
        
        .fiEyesUI-textScale-character.fiEyesUI-animate {
          animation: fiEyesUI-rotate ${props.animationDuration}ms linear forwards;
        }
        
        @keyframes fiEyesUI-rotate {
          0% {
            transform: scale(0);
          }
          10% {
            font-size: ${props.fontSize};
            transform: scale(2);
          }
          20% {
            transform: scale(0.5);
          }
          40% {
            transform: scale(1.5);
          }
          60% {
            transform: scale(0.8);
          }
          80% {
            transform: scale(1.2);
          }
          100% {
            font-size: ${props.fontSize};
            transform: scale(1);
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUISplitText = () => {
                if (!textScaleContainerRef.value)
                    return;
                const fiEyesUIContainer = textScaleContainerRef.value;
                const fiEyesUIText = props.text;
                const fiEyesUILengthOfText = fiEyesUIText.length;
                const fiEyesUICharList = new Array(fiEyesUILengthOfText);
                for (let i = 0; i < fiEyesUILengthOfText; i++) {
                    fiEyesUICharList[i] = fiEyesUIText.charAt(i);
                }
                const fiEyesUITargetDiv = fiEyesUIContainer.querySelector('.fiEyesUI-textScale-appendText');
                if (!fiEyesUITargetDiv)
                    return;
                fiEyesUITargetDiv.innerHTML = '';
                for (let i = 0; i < fiEyesUILengthOfText; i++) {
                    const fiEyesUIDiv = document.createElement('div');
                    fiEyesUIDiv.classList.add(`fiEyesUI-ch-${i}`);
                    fiEyesUIDiv.classList.add('fiEyesUI-textScale-character');
                    fiEyesUIDiv.textContent = fiEyesUICharList[i];
                    fiEyesUITargetDiv.appendChild(fiEyesUIDiv);
                }
            };
            const fiEyesUIAnimateText = () => {
                if (!textScaleContainerRef.value)
                    return;
                const fiEyesUIContainer = textScaleContainerRef.value;
                fiEyesUISplitText();
                setTimeout(() => {
                    const fiEyesUIItems = fiEyesUIContainer.querySelectorAll('.fiEyesUI-textScale-character');
                    fiEyesUIItems.forEach((fiEyesUIItem) => {
                        fiEyesUIItem.classList.add('fiEyesUI-animate');
                    });
                    setTimeout(() => {
                        emit('complete');
                    }, props.animationDuration);
                }, props.animationDelay);
            };
            const fiEyesUICleanup = () => {
                if (intervalId.value) {
                    clearInterval(intervalId.value);
                }
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                // Create styles dynamically
                fiEyesUICreateStyles();
                // Split text into characters
                fiEyesUISplitText();
                if (props.autoPlay) {
                    fiEyesUIAnimateText();
                    // Set up interval for auto-repeat
                    intervalId.value = window.setInterval(() => {
                        fiEyesUIAnimateText();
                    }, props.repeatInterval);
                }
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: textScaleContainerRef, class: `fiEyesUI-textScale-container ${props.className}`, style: {
                    fontSize: props.fontSize,
                    ...props.style
                }, children: jsxRuntime.jsx("div", { class: "fiEyesUI-textScale-appendText" }) }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUIRotatingText',
        props: {
            words: {
                type: Array,
                default: () => ['beautiful', 'maintainable', 'perfect']
            },
            fontSize: {
                type: String,
                default: '40px'
            },
            color: {
                type: String,
                default: '#ffffff'
            },
            animationDuration: {
                type: Number,
                default: 1500
            },
            wordDelay: {
                type: Number,
                default: 1250
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 5000
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const rotatingTextContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const intervalId = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-rotatingText-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-rotatingText-container {
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
        
        .fiEyesUI-rotatingText-content {
          position: relative;
          width: 100%;
        }
        
        .fiEyesUI-rotatingText-word {
          font-family: 'Orbitron', sans-serif;
          font-size: ${props.fontSize};
          left: 0;
          margin-bottom: 0;
          margin-top: 30px;
          opacity: 0;
          position: absolute;
          right: 0;
          text-align: center;
          text-transform: uppercase;
          top: 0;
          color: ${props.color};
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(1) {
          animation: fiEyesUI-rotate-text-up ${props.animationDuration}ms ${props.wordDelay}ms;
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(2) {
          animation: fiEyesUI-rotate-text-up ${props.animationDuration}ms ${props.wordDelay * 2}ms;
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(3) {
          animation: fiEyesUI-fade-text-in ${props.animationDuration}ms ${props.wordDelay * 3}ms forwards;
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(4) {
          animation: fiEyesUI-rotate-text-up ${props.animationDuration}ms ${props.wordDelay * 4}ms;
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(5) {
          animation: fiEyesUI-rotate-text-up ${props.animationDuration}ms ${props.wordDelay * 5}ms;
        }
        
        .fiEyesUI-rotatingText-word:nth-of-type(6) {
          animation: fiEyesUI-fade-text-in ${props.animationDuration}ms ${props.wordDelay * 6}ms forwards;
        }
        
        @keyframes fiEyesUI-rotate-text-up {
          0% {
            transform: translate3d(0, 80px, 0);
            opacity: 0;
          }
          20%, 80% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
          100% {
            transform: translate3d(0, -40px, 0);
            opacity: 0;
          }
        }
        
        @keyframes fiEyesUI-fade-text-in {
          0% {
            opacity: 0;
            transform: translate3d(0, 80px, 0);
          }
          50%, 100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUICreateWords = () => {
                if (!rotatingTextContainerRef.value)
                    return;
                const fiEyesUIContainer = rotatingTextContainerRef.value;
                const fiEyesUIContentDiv = fiEyesUIContainer.querySelector('.fiEyesUI-rotatingText-content');
                if (!fiEyesUIContentDiv)
                    return;
                fiEyesUIContentDiv.innerHTML = '';
                props.words.forEach((fiEyesUIWord, fiEyesUIIndex) => {
                    const fiEyesUIWordDiv = document.createElement('h2');
                    fiEyesUIWordDiv.className = 'fiEyesUI-rotatingText-word';
                    fiEyesUIWordDiv.textContent = fiEyesUIWord;
                    fiEyesUIContentDiv.appendChild(fiEyesUIWordDiv);
                });
            };
            const fiEyesUIStartAnimation = () => {
                if (!rotatingTextContainerRef.value)
                    return;
                rotatingTextContainerRef.value;
                fiEyesUICreateWords();
                // Calculate total animation time
                const totalTime = (props.words.length * props.wordDelay) + props.animationDuration;
                setTimeout(() => {
                    emit('complete');
                }, totalTime);
            };
            const fiEyesUICleanup = () => {
                if (intervalId.value) {
                    clearInterval(intervalId.value);
                }
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                // Create styles dynamically
                fiEyesUICreateStyles();
                // Create word elements
                fiEyesUICreateWords();
                if (props.autoPlay) {
                    fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    intervalId.value = window.setInterval(() => {
                        fiEyesUIStartAnimation();
                    }, props.repeatInterval);
                }
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: rotatingTextContainerRef, class: `fiEyesUI-rotatingText-container ${props.className}`, style: {
                    fontSize: props.fontSize,
                    ...props.style
                }, children: jsxRuntime.jsx("div", { class: "fiEyesUI-rotatingText-content" }) }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUICharacterFlyIn',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '32px'
            },
            color: {
                type: String,
                default: '#ffffff'
            },
            animationDuration: {
                type: Number,
                default: 2800
            },
            startDelay: {
                type: Number,
                default: 700
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 5000
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const characterFlyInContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const intervalId = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-characterFlyIn-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-characterFlyIn-container {
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
        
        .fiEyesUI-characterFlyIn-list {
          position: absolute;
          left: 50%;
          top: 50%;
          list-style: none;
          transform: translateX(-50%) translateY(-50%);
          margin: 0;
          padding: 0;
        }
        
        .fiEyesUI-characterFlyIn-character {
          display: inline-block;
          margin-right: 30px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 300;
          font-size: ${props.fontSize};
          color: ${props.color};
          opacity: 1;
          transition: all ${props.animationDuration}ms cubic-bezier(0.6, -.005, 0.32, 1.75);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character {
          opacity: 0;
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(1) {
          transform: translateX(150px) translateY(-170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(2) {
          transform: translateX(-210px) translateY(170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(3) {
          transform: translateX(20px) translateY(-100px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(4) {
          transform: translateX(-100px) translateY(-20px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(5) {
          transform: translateX(-70px) translateY(-200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(6) {
          transform: translateX(200px) translateY(70px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(7) {
          transform: translateX(30px) translateY(200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(8) {
          transform: translateX(30px) translateY(-100px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(9) {
          transform: translateX(100px) translateY(-170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(10) {
          transform: translateX(-100px) translateY(50px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(11) {
          transform: translateX(-550px) translateY(120px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(12) {
          transform: translateX(-40px) translateY(-50px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(13) {
          transform: translateX(150px) translateY(-170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(14) {
          transform: translateX(-210px) translateY(170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(15) {
          transform: translateX(20px) translateY(-100px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(16) {
          transform: translateX(-100px) translateY(-20px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(17) {
          transform: translateX(-70px) translateY(-200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(18) {
          transform: translateX(200px) translateY(70px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(19) {
          transform: translateX(30px) translateY(200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(20) {
          transform: translateX(30px) translateY(-100px);
        }
      `;
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUICreateCharacters = () => {
                if (!characterFlyInContainerRef.value)
                    return;
                const fiEyesUIContainer = characterFlyInContainerRef.value;
                const fiEyesUIListDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterFlyIn-list');
                if (!fiEyesUIListDiv)
                    return;
                fiEyesUIListDiv.innerHTML = '';
                const fiEyesUICharacters = props.text.split('');
                fiEyesUICharacters.forEach((fiEyesUIChar) => {
                    const fiEyesUICharacterDiv = document.createElement('li');
                    fiEyesUICharacterDiv.className = 'fiEyesUI-characterFlyIn-character';
                    fiEyesUICharacterDiv.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
                    fiEyesUIListDiv.appendChild(fiEyesUICharacterDiv);
                });
            };
            const fiEyesUIStartAnimation = () => {
                if (!characterFlyInContainerRef.value)
                    return;
                const fiEyesUIContainer = characterFlyInContainerRef.value;
                fiEyesUICreateCharacters();
                const fiEyesUIListDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterFlyIn-list');
                if (!fiEyesUIListDiv)
                    return;
                // Add hidden class initially
                fiEyesUIListDiv.classList.add('fiEyesUI-hidden');
                // Remove hidden class after delay to start animation
                setTimeout(() => {
                    fiEyesUIListDiv.classList.remove('fiEyesUI-hidden');
                    // Calculate total animation time
                    const totalTime = props.startDelay + props.animationDuration;
                    setTimeout(() => {
                        emit('complete');
                    }, totalTime);
                }, props.startDelay);
            };
            const fiEyesUICleanup = () => {
                if (intervalId.value) {
                    clearInterval(intervalId.value);
                }
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                // Create styles dynamically
                fiEyesUICreateStyles();
                // Create character elements
                fiEyesUICreateCharacters();
                if (props.autoPlay) {
                    fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    intervalId.value = window.setInterval(() => {
                        fiEyesUIStartAnimation();
                    }, props.repeatInterval);
                }
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: characterFlyInContainerRef, class: `fiEyesUI-characterFlyIn-container ${props.className}`, style: {
                    fontSize: props.fontSize,
                    ...props.style
                }, children: jsxRuntime.jsx("ul", { class: "fiEyesUI-characterFlyIn-list fiEyesUI-hidden" }) }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUITextReveal',
        props: {
            text1: {
                type: String,
                default: 'Welcome To'
            },
            text2: {
                type: String,
                default: 'Finches Eyes UI Components'
            },
            fontSize1: {
                type: String,
                default: '60px'
            },
            fontSize2: {
                type: String,
                default: '30px'
            },
            color1: {
                type: String,
                default: '#ffffff'
            },
            color2: {
                type: String,
                default: '#ffffff'
            },
            animationDuration: {
                type: Number,
                default: 2500
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 4000
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const textRevealContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const intervalId = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-textReveal-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-textReveal-container {
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
        
        .fiEyesUI-textReveal-content {
          text-align: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }
        
        .fiEyesUI-textReveal-span {
          text-transform: uppercase;
          display: block;
        }
        
        .fiEyesUI-textReveal-text1 {
          color: ${props.color1};
          font-size: ${props.fontSize1};
          font-weight: 700;
          letter-spacing: 8px;
          margin-bottom: 20px;
          background: #000000;
          position: relative;
          animation: fiEyesUI-text-reveal ${props.animationDuration}ms 1;
        }
        
        .fiEyesUI-textReveal-text2 {
          font-size: ${props.fontSize2};
          color: ${props.color2};
        }
        
        @keyframes fiEyesUI-text-reveal {
          0% {
            color: #000000;
            margin-bottom: -40px;
          }
          30% {
            letter-spacing: 25px;
            margin-bottom: -40px;
          }
          100% {
            color: ${props.color1};
            letter-spacing: 8px;
            margin-bottom: 20px;
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUIStartAnimation = () => {
                // Calculate total animation time
                setTimeout(() => {
                    emit('complete');
                }, props.animationDuration);
            };
            const fiEyesUICleanup = () => {
                if (intervalId.value) {
                    clearInterval(intervalId.value);
                }
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                // Create styles dynamically
                fiEyesUICreateStyles();
                if (props.autoPlay) {
                    fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    intervalId.value = window.setInterval(() => {
                        fiEyesUIStartAnimation();
                    }, props.repeatInterval);
                }
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: textRevealContainerRef, class: `fiEyesUI-textReveal-container ${props.className}`, style: props.style, children: jsxRuntime.jsxs("div", { class: "fiEyesUI-textReveal-content", children: [jsxRuntime.jsx("span", { class: "fiEyesUI-textReveal-span fiEyesUI-textReveal-text1", children: props.text1 }), jsxRuntime.jsx("span", { class: "fiEyesUI-textReveal-span fiEyesUI-textReveal-text2", children: props.text2 })] }) }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUICharacterGlow',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '80px'
            },
            color: {
                type: String,
                default: '#ffffff'
            },
            glowColor: {
                type: String,
                default: '#00bbff'
            },
            animationDuration: {
                type: Number,
                default: 2250
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 3000
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const characterGlowContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const intervalId = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-characterGlow-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-characterGlow-container {
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
        
        .fiEyesUI-characterGlow-content {
          font-size: ${props.fontSize};
          font-family: 'Orbitron', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .fiEyesUI-characterGlow-character {
          display: block;
          float: left;
          animation: fiEyesUI-character-glow ${props.animationDuration}ms linear infinite;
          margin: 0 5px;
          padding: 0;
          position: relative;
          color: #111;
        }
        
        .fiEyesUI-characterGlow-character:nth-child(1) {
          animation-delay: 0s;
        }
        .fiEyesUI-characterGlow-character:nth-child(2) {
          animation-delay: 0.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(3) {
          animation-delay: 0.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(4) {
          animation-delay: 0.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(5) {
          animation-delay: 1s;
        }
        .fiEyesUI-characterGlow-character:nth-child(6) {
          animation-delay: 1.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(7) {
          animation-delay: 1.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(8) {
          animation-delay: 1.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(9) {
          animation-delay: 2s;
        }
        .fiEyesUI-characterGlow-character:nth-child(10) {
          animation-delay: 2.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(11) {
          animation-delay: 2.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(12) {
          animation-delay: 2.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(13) {
          animation-delay: 3s;
        }
        .fiEyesUI-characterGlow-character:nth-child(14) {
          animation-delay: 3.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(15) {
          animation-delay: 3.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(16) {
          animation-delay: 3.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(17) {
          animation-delay: 4s;
        }
        .fiEyesUI-characterGlow-character:nth-child(18) {
          animation-delay: 4.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(19) {
          animation-delay: 4.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(20) {
          animation-delay: 4.75s;
        }
        
        @keyframes fiEyesUI-character-glow {
          0%, 100% {
            color: ${props.color};
            filter: blur(2px);
            text-shadow: 0 0 10px ${props.glowColor},
              0 0 20px ${props.glowColor},
              0 0 40px ${props.glowColor},
              0 0 80px ${props.glowColor},
              0 0 120px ${props.glowColor},
              0 0 200px ${props.glowColor},
              0 0 300px ${props.glowColor},
              0 0 400px ${props.glowColor};
          }
          5%, 95% {
            color: #111;
            filter: blur(0px);
            text-shadow: none;
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUICreateCharacters = () => {
                if (!characterGlowContainerRef.value)
                    return;
                const fiEyesUIContainer = characterGlowContainerRef.value;
                const fiEyesUIContentDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterGlow-content');
                if (!fiEyesUIContentDiv)
                    return;
                fiEyesUIContentDiv.innerHTML = '';
                const fiEyesUICharacters = props.text.split('');
                fiEyesUICharacters.forEach((fiEyesUIChar) => {
                    const fiEyesUICharacterSpan = document.createElement('span');
                    fiEyesUICharacterSpan.className = 'fiEyesUI-characterGlow-character';
                    fiEyesUICharacterSpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
                    fiEyesUIContentDiv.appendChild(fiEyesUICharacterSpan);
                });
            };
            const fiEyesUIStartAnimation = () => {
                fiEyesUICreateCharacters();
                // Calculate total animation time
                setTimeout(() => {
                    emit('complete');
                }, props.animationDuration);
            };
            const fiEyesUICleanup = () => {
                if (intervalId.value) {
                    clearInterval(intervalId.value);
                }
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                // Create styles dynamically
                fiEyesUICreateStyles();
                // Create character elements
                fiEyesUICreateCharacters();
                if (props.autoPlay) {
                    fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    intervalId.value = window.setInterval(() => {
                        fiEyesUIStartAnimation();
                    }, props.repeatInterval);
                }
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: characterGlowContainerRef, class: `fiEyesUI-characterGlow-container ${props.className}`, style: props.style, children: jsxRuntime.jsx("div", { class: "fiEyesUI-characterGlow-content" }) }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUITextStroke',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '80px'
            },
            strokeColor: {
                type: String,
                default: '#8338ec'
            },
            fillColor: {
                type: String,
                default: '#c19bf5'
            },
            strokeWidth: {
                type: String,
                default: '2px'
            },
            animationDuration: {
                type: Number,
                default: 4000
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 5000
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const textStrokeContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const intervalId = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-textStroke-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-textStroke-container {
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
        
        .fiEyesUI-textStroke-content {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .fiEyesUI-textStroke-text {
          color: #ffffff;
          font-size: ${props.fontSize};
          font-family: 'Orbitron', sans-serif;
          position: absolute;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
          margin: 0;
          padding: 0;
        }
        
        .fiEyesUI-textStroke-text:nth-child(1) {
          color: transparent;
          -webkit-text-stroke: ${props.strokeWidth} ${props.strokeColor};
          text-stroke: ${props.strokeWidth} ${props.strokeColor};
        }
        
        .fiEyesUI-textStroke-text:nth-child(2) {
          color: ${props.fillColor};
          animation: fiEyesUI-text-stroke-animate ${props.animationDuration}ms ease-in-out infinite;
        }
        
        @keyframes fiEyesUI-text-stroke-animate {
          0%, 100% {
            clip-path: polygon(
              0% 45%,
              16% 44%,
              33% 50%,
              54% 60%,
              70% 61%,
              84% 59%,
              100% 52%,
              100% 100%,
              0% 100%
            );
          }
          50% {
            clip-path: polygon(
              0% 60%,
              15% 65%,
              34% 66%,
              51% 62%,
              67% 50%,
              84% 45%,
              100% 46%,
              100% 100%,
              0% 100%
            );
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUIStartAnimation = () => {
                // Calculate total animation time
                setTimeout(() => {
                    emit('complete');
                }, props.animationDuration);
            };
            const fiEyesUICleanup = () => {
                if (intervalId.value) {
                    clearInterval(intervalId.value);
                }
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                // Create styles dynamically
                fiEyesUICreateStyles();
                if (props.autoPlay) {
                    fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    intervalId.value = window.setInterval(() => {
                        fiEyesUIStartAnimation();
                    }, props.repeatInterval);
                }
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: textStrokeContainerRef, class: `fiEyesUI-textStroke-container ${props.className}`, style: props.style, children: jsxRuntime.jsxs("div", { class: "fiEyesUI-textStroke-content", children: [jsxRuntime.jsx("h2", { class: "fiEyesUI-textStroke-text", children: props.text }), jsxRuntime.jsx("h2", { class: "fiEyesUI-textStroke-text", children: props.text })] }) }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUITypewriter',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '80px'
            },
            cursorColor: {
                type: String,
                default: '#ffffff'
            },
            cursorWidth: {
                type: String,
                default: '4px'
            },
            animationDuration: {
                type: Number,
                default: 5000
            },
            cursorBlinkSpeed: {
                type: Number,
                default: 1000
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 6000
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const typewriterContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const intervalId = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-typewriter-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-typewriter-container {
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
        
        .fiEyesUI-typewriter-content {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: ${props.fontSize};
          font-family: 'Orbitron', sans-serif;
          font-weight: bold;
        }
        
        .fiEyesUI-typewriter-text {
          white-space: nowrap;
          overflow: hidden;
          border-right: ${props.cursorWidth} solid ${props.cursorColor};
          animation: fiEyesUI-cursor ${props.cursorBlinkSpeed}ms step-start infinite, 
                     fiEyesUI-typewriter-text ${props.animationDuration}ms steps(${props.text.length}) alternate infinite;
        }
        
        @keyframes fiEyesUI-cursor {
          0%, 100% { 
            border-color: ${props.cursorColor}; 
          }
        }
        
        @keyframes fiEyesUI-typewriter-text {
          0% { 
            width: 0; 
          }
          100% { 
            width: ${props.text.length}ch; 
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUIStartAnimation = () => {
                // Calculate total animation time
                setTimeout(() => {
                    emit('complete');
                }, props.animationDuration);
            };
            const fiEyesUICleanup = () => {
                if (intervalId.value) {
                    clearInterval(intervalId.value);
                }
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                // Create styles dynamically
                fiEyesUICreateStyles();
                if (props.autoPlay) {
                    fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    intervalId.value = window.setInterval(() => {
                        fiEyesUIStartAnimation();
                    }, props.repeatInterval);
                }
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: typewriterContainerRef, class: `fiEyesUI-typewriter-container ${props.className}`, style: props.style, children: jsxRuntime.jsx("div", { class: "fiEyesUI-typewriter-content", children: jsxRuntime.jsx("div", { class: "fiEyesUI-typewriter-text", children: props.text }) }) }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUIFadeIn',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '80px'
            },
            animationDuration: {
                type: Number,
                default: 7000
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 8000
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const fadeInContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const intervalId = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-fadeIn-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-fadeIn-container {
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
        
        .fiEyesUI-fadeIn-content {
          font-size: ${props.fontSize};
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          color: #ffffff;
          padding: 1rem;
          text-align: center;
          animation-name: fiEyesUI-fade-in;
          animation-duration: ${props.animationDuration}ms;
          animation-fill-mode: both;
        }
        
        @keyframes fiEyesUI-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUIStartAnimation = () => {
                // Calculate total animation time
                setTimeout(() => {
                    emit('complete');
                }, props.animationDuration);
            };
            const fiEyesUICleanup = () => {
                if (intervalId.value) {
                    clearInterval(intervalId.value);
                }
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                // Create styles dynamically
                fiEyesUICreateStyles();
                if (props.autoPlay) {
                    fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    intervalId.value = window.setInterval(() => {
                        fiEyesUIStartAnimation();
                    }, props.repeatInterval);
                }
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: fadeInContainerRef, class: `fiEyesUI-fadeIn-container ${props.className}`, style: props.style, children: jsxRuntime.jsx("div", { class: "fiEyesUI-fadeIn-content", children: jsxRuntime.jsx("h1", { children: props.text }) }) }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUIGradientText',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '80px'
            },
            gradientColors: {
                type: Array,
                default: () => ['#231557', '#44107a', '#ff1361', '#fff800']
            },
            animationDuration: {
                type: Number,
                default: 2000
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 3000
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const gradientTextContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const intervalId = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-gradientText-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-gradientText-container {
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
        
        .fiEyesUI-gradientText-content {
          text-transform: uppercase;
          background-image: linear-gradient(
            -225deg,
            ${props.gradientColors[0]} 0%,
            ${props.gradientColors[1]} 29%,
            ${props.gradientColors[2]} 67%,
            ${props.gradientColors[3]} 100%
          );
          background-size: auto auto;
          background-clip: border-box;
          background-size: 200% auto;
          color: #fff;
          background-clip: text;
          text-fill-color: transparent;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fiEyesUI-textclip ${props.animationDuration}ms linear infinite;
          display: inline-block;
          font-size: ${props.fontSize};
          font-family: 'Orbitron', sans-serif;
        }
        
        @keyframes fiEyesUI-textclip {
          to {
            background-position: 200% center;
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUIStartAnimation = () => {
                // Calculate total animation time
                setTimeout(() => {
                    emit('complete');
                }, props.animationDuration);
            };
            const fiEyesUICleanup = () => {
                if (intervalId.value) {
                    clearInterval(intervalId.value);
                }
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                // Create styles dynamically
                fiEyesUICreateStyles();
                if (props.autoPlay) {
                    fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    intervalId.value = window.setInterval(() => {
                        fiEyesUIStartAnimation();
                    }, props.repeatInterval);
                }
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: gradientTextContainerRef, class: `fiEyesUI-gradientText-container ${props.className}`, style: props.style, children: jsxRuntime.jsx("div", { class: "fiEyesUI-gradientText-content", children: jsxRuntime.jsx("h3", { children: props.text }) }) }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUIResizeEffect',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            minFontSize: {
                type: String,
                default: '20px'
            },
            maxFontSize: {
                type: String,
                default: '50px'
            },
            minFontWeight: {
                type: Number,
                default: 100
            },
            maxFontWeight: {
                type: Number,
                default: 900
            },
            animationDuration: {
                type: Number,
                default: 5000
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 6000
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const resizeEffectContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const intervalId = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-resizeEffect-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-resizeEffect-container {
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
        
        .fiEyesUI-resizeEffect-content {
          font-size: ${props.minFontSize};
          font-weight: ${props.minFontWeight};
          font-family: 'Orbitron', sans-serif;
          animation: fiEyesUI-resize-anime ${props.animationDuration}ms infinite forwards;
          animation-direction: alternate;
          color: #ffffff;
        }
        
        @keyframes fiEyesUI-resize-anime {
          from {
            font-size: ${props.minFontSize};
            font-weight: ${props.minFontWeight};
            opacity: 0;
          } 
          to {
            font-size: ${props.maxFontSize};
            font-weight: ${props.maxFontWeight};
            text-shadow: 0px 0px 5px #ffffff;
            opacity: 1;
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUIStartAnimation = () => {
                // Calculate total animation time
                setTimeout(() => {
                    emit('complete');
                }, props.animationDuration);
            };
            const fiEyesUICleanup = () => {
                if (intervalId.value) {
                    clearInterval(intervalId.value);
                }
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                // Create styles dynamically
                fiEyesUICreateStyles();
                if (props.autoPlay) {
                    fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    intervalId.value = window.setInterval(() => {
                        fiEyesUIStartAnimation();
                    }, props.repeatInterval);
                }
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: resizeEffectContainerRef, class: `fiEyesUI-resizeEffect-container ${props.className}`, style: props.style, children: jsxRuntime.jsx("div", { class: "fiEyesUI-resizeEffect-content", children: jsxRuntime.jsx("h1", { children: props.text }) }) }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUITextScaleBounce',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '80px'
            },
            animationDuration: {
                type: Number,
                default: 1500
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 3000
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const textScaleBounceContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const intervalId = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-textScaleBounce-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-textScaleBounce-container {
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
        
        .fiEyesUI-textScaleBounce-content {
          font-size: ${props.fontSize};
          font-family: 'Orbitron', sans-serif;
          font-weight: bolder;
          color: #ffffff;
          text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
          display: inline;
          margin: auto;
        }
        
        .fiEyesUI-textScaleBounce-animate {
          animation: fiEyesUI-textScaleBounce-rotate ${props.animationDuration}ms linear forwards;
        }
        
        @keyframes fiEyesUI-textScaleBounce-rotate {
          0% {
            transform: scale(0);
          }
          10% {
            font-size: ${props.fontSize};
            transform: scale(2);
          }
          20% {
            transform: scale(0.5);
          }
          40% {
            transform: scale(1.5);
          }
          60% {
            transform: scale(0.8);
          }
          80% {
            transform: scale(1.2);
          }
          100% {
            font-size: ${props.fontSize};
            transform: scale(1);
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUIStartAnimation = () => {
                if (!textScaleBounceContainerRef.value)
                    return;
                const fiEyesUIContentElement = textScaleBounceContainerRef.value.querySelector('.fiEyesUI-textScaleBounce-content');
                if (fiEyesUIContentElement) {
                    fiEyesUIContentElement.classList.add('fiEyesUI-textScaleBounce-animate');
                    setTimeout(() => {
                        fiEyesUIContentElement.classList.remove('fiEyesUI-textScaleBounce-animate');
                        emit('complete');
                    }, props.animationDuration);
                }
            };
            const fiEyesUICleanup = () => {
                if (intervalId.value) {
                    clearInterval(intervalId.value);
                }
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                // Create styles dynamically
                fiEyesUICreateStyles();
                if (props.autoPlay) {
                    fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    intervalId.value = window.setInterval(() => {
                        fiEyesUIStartAnimation();
                    }, props.repeatInterval);
                }
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: textScaleBounceContainerRef, class: `fiEyesUI-textScaleBounce-container ${props.className}`, style: props.style, children: jsxRuntime.jsx("div", { class: "fiEyesUI-textScaleBounce-content", children: props.text }) }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUITextSwipe',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '48px'
            },
            animationDuration: {
                type: Number,
                default: 1000
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 2000
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const textSwipeContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const intervalId = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-textSwipe-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-textSwipe-container {
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
        
        .fiEyesUI-textSwipe-content {
          font-size: ${props.fontSize};
          font-family: 'Orbitron', sans-serif;
          color: rgba(255, 255, 255, 0.2);
          margin: auto;
        }
        
        .fiEyesUI-textSwipe-letter {
          display: inline-block;
          position: relative;
          transform-origin: 50% 50%;
          transition: all 0.5s ease;
        }
        
        .fiEyesUI-textSwipe-opaque {
          animation: fiEyesUI-textSwipe-opacity ${props.animationDuration}ms linear;
        }
        
        @keyframes fiEyesUI-textSwipe-opacity {
          0% {
            color: rgba(255, 255, 255, 0.2);
          }
          50% {
            color: rgba(255, 255, 255, 1);
          }
          100% {
            color: rgba(255, 255, 255, 0.2);
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUIInitializeText = () => {
                if (!textSwipeContainerRef.value)
                    return;
                const fiEyesUIContentElement = textSwipeContainerRef.value.querySelector('.fiEyesUI-textSwipe-content');
                if (fiEyesUIContentElement) {
                    fiEyesUIContentElement.innerHTML = '';
                    const letters = props.text.split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.className = 'fiEyesUI-textSwipe-letter';
                        span.id = `fiEyesUI-letter-${index}`;
                        span.textContent = letter;
                        fiEyesUIContentElement.appendChild(span);
                    });
                }
            };
            const fiEyesUIStartAnimation = () => {
                if (!textSwipeContainerRef.value)
                    return;
                const letters = textSwipeContainerRef.value.querySelectorAll('.fiEyesUI-textSwipe-letter');
                const textLength = letters.length - 1;
                letters.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.toggle('fiEyesUI-textSwipe-opaque');
                        if (index === textLength) {
                            setTimeout(() => {
                                emit('complete');
                            }, props.animationDuration);
                        }
                    }, (index + (textLength / 2)) * 10 * (100 / textLength));
                });
            };
            const fiEyesUICleanup = () => {
                if (intervalId.value) {
                    clearInterval(intervalId.value);
                }
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                // Create styles dynamically
                fiEyesUICreateStyles();
                // Initialize text with individual letters
                fiEyesUIInitializeText();
                if (props.autoPlay) {
                    fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    intervalId.value = window.setInterval(() => {
                        fiEyesUIStartAnimation();
                    }, props.repeatInterval);
                }
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: textSwipeContainerRef, class: `fiEyesUI-textSwipe-container ${props.className}`, style: props.style, children: jsxRuntime.jsx("div", { class: "fiEyesUI-textSwipe-content" }) }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUIHoverFill',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '24px'
            },
            color: {
                type: String,
                default: '#ffffff'
            },
            hoverColor: {
                type: String,
                default: '#ffffff'
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['click'],
        setup(props, { emit }) {
            const hoverFillContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-hoverFill-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
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
          color: ${props.color};
          position: relative;
          display: inline-block;
          text-decoration: none;
          font-size: ${props.fontSize};
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
          color: ${props.hoverColor};
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
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUICleanup = () => {
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            const handleClick = (event) => {
                event.preventDefault();
                emit('click');
            };
            vue.onMounted(() => {
                // Create styles dynamically
                fiEyesUICreateStyles();
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: hoverFillContainerRef, class: `fiEyesUI-hoverFill-container ${props.className}`, style: props.style, children: jsxRuntime.jsxs("a", { href: "#", class: "fiEyesUI-hoverFill-link", onClick: handleClick, children: [props.text, jsxRuntime.jsx("span", { class: "fiEyesUI-hoverFill-link-layer", "data-text": props.text })] }) }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUITitleReveal',
        props: {
            title: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            subtitle: {
                type: String,
                default: 'Elegance is an attitude'
            },
            titleFontSize: {
                type: String,
                default: 'calc(6vw + 1rem)'
            },
            subtitleFontSize: {
                type: String,
                default: 'calc(0.4vw + 0.5rem)'
            },
            animationDuration: {
                type: Number,
                default: 500
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 4000
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['complete'],
        setup(props, { emit }) {
            const titleRevealContainerRef = vue.ref();
            const fiEyesUIStyleElement = vue.ref();
            const intervalId = vue.ref();
            const fiEyesUICreateStyles = () => {
                const fiEyesUIStyleId = 'fiEyesUI-titleReveal-styles';
                const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
                if (fiEyesUIExistingStyle) {
                    fiEyesUIExistingStyle.remove();
                }
                fiEyesUIStyleElement.value = document.createElement('style');
                fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
                fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-titleReveal-container {
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
        
        .fiEyesUI-titleReveal-content {
          position: relative;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
          margin: 0;
        }
        
        .fiEyesUI-titleReveal-title {
          font-weight: 700;
          display: inline-flex;
          margin: -5px;
          padding: 5px;
        }
        
        .fiEyesUI-titleReveal-letter {
          font-size: ${props.titleFontSize};
          margin-left: -2px;
          opacity: 0;
        }
        
        .fiEyesUI-titleReveal-subtitle {
          font-weight: 400;
          font-size: ${props.subtitleFontSize};
          letter-spacing: calc(0.3vw + 0.5rem);
          text-transform: uppercase;
          position: relative;
          top: -5px;
          opacity: 0;
        }
        
        .fiEyesUI-titleReveal-letter-animate {
          animation: fiEyesUI-titleReveal-slide ${props.animationDuration}ms ease-in-quad forwards;
        }
        
        .fiEyesUI-titleReveal-letter-fade {
          animation: fiEyesUI-titleReveal-fade ${props.animationDuration}ms ease-in-quad forwards;
        }
        
        .fiEyesUI-titleReveal-subtitle-animate {
          animation: fiEyesUI-titleReveal-subtitle-fade 300ms ease-in-quad forwards;
        }
        
        @keyframes fiEyesUI-titleReveal-slide {
          from {
            transform: translateX(5px);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes fiEyesUI-titleReveal-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fiEyesUI-titleReveal-subtitle-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `;
                document.head.appendChild(fiEyesUIStyleElement.value);
            };
            const fiEyesUIInitializeText = () => {
                if (!titleRevealContainerRef.value)
                    return;
                const titleElement = titleRevealContainerRef.value.querySelector('.fiEyesUI-titleReveal-title');
                const subtitleElement = titleRevealContainerRef.value.querySelector('.fiEyesUI-titleReveal-subtitle');
                if (titleElement) {
                    titleElement.innerHTML = '';
                    const letters = props.title.split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.className = 'fiEyesUI-titleReveal-letter';
                        span.id = `fiEyesUI-title-letter-${index}`;
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        titleElement.appendChild(span);
                    });
                }
                if (subtitleElement) {
                    subtitleElement.textContent = props.subtitle;
                }
            };
            const fiEyesUIStartAnimation = () => {
                if (!titleRevealContainerRef.value)
                    return;
                const letters = titleRevealContainerRef.value.querySelectorAll('.fiEyesUI-titleReveal-letter');
                const subtitleElement = titleRevealContainerRef.value.querySelector('.fiEyesUI-titleReveal-subtitle');
                // Reset all elements
                letters.forEach(letter => {
                    letter.classList.remove('fiEyesUI-titleReveal-letter-animate', 'fiEyesUI-titleReveal-letter-fade');
                });
                if (subtitleElement) {
                    subtitleElement.classList.remove('fiEyesUI-titleReveal-subtitle-animate');
                }
                // Animate letters
                setTimeout(() => {
                    letters.forEach((letter, index) => {
                        setTimeout(() => {
                            letter.classList.add('fiEyesUI-titleReveal-letter-animate');
                        }, 50 * index);
                        setTimeout(() => {
                            letter.classList.add('fiEyesUI-titleReveal-letter-fade');
                            if (index === letters.length - 1) {
                                setTimeout(() => {
                                    if (subtitleElement) {
                                        subtitleElement.classList.add('fiEyesUI-titleReveal-subtitle-animate');
                                    }
                                    emit('complete');
                                }, 60 * index + 100);
                            }
                        }, 60 * index);
                    });
                }, 500);
            };
            const fiEyesUICleanup = () => {
                if (intervalId.value) {
                    clearInterval(intervalId.value);
                }
                if (fiEyesUIStyleElement.value) {
                    fiEyesUIStyleElement.value.remove();
                }
            };
            vue.onMounted(() => {
                // Create styles dynamically
                fiEyesUICreateStyles();
                // Initialize text with individual letters
                fiEyesUIInitializeText();
                if (props.autoPlay) {
                    fiEyesUIStartAnimation();
                    // Set up interval for auto-repeat
                    intervalId.value = window.setInterval(() => {
                        fiEyesUIStartAnimation();
                    }, props.repeatInterval);
                }
            });
            vue.onUnmounted(() => {
                fiEyesUICleanup();
            });
            return () => (jsxRuntime.jsx("div", { ref: titleRevealContainerRef, class: `fiEyesUI-titleReveal-container ${props.className}`, style: props.style, children: jsxRuntime.jsx("div", { class: "fiEyesUI-titleReveal-content", children: jsxRuntime.jsxs("h1", { children: [jsxRuntime.jsx("span", { class: "fiEyesUI-titleReveal-title" }), jsxRuntime.jsx("br", {}), jsxRuntime.jsx("span", { class: "fiEyesUI-titleReveal-subtitle" })] }) }) }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUIWavyText',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '2em'
            },
            animationDuration: {
                type: Number,
                default: 1.5
            },
            waveHeight: {
                type: Number,
                default: 20
            },
            delayMultiplier: {
                type: Number,
                default: 0.1
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 0
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['animationComplete', 'animationStart'],
        setup(props, { emit }) {
            const containerRef = vue.ref(null);
            const animationTimeout = vue.ref(null);
            const fiEyesUIStartWavyAnimation = () => {
                if (!containerRef.value)
                    return;
                const spans = containerRef.value.querySelectorAll('.fiEyesUI-wavy-text-span');
                spans.forEach((span, index) => {
                    const element = span;
                    element.style.setProperty('--i', index.toString());
                    element.style.animationDelay = `${props.delayMultiplier * index}s`;
                    element.style.animationDuration = `${props.animationDuration}s`;
                });
                emit('animationStart');
                if (props.repeatInterval > 0) {
                    animationTimeout.value = window.setTimeout(() => {
                        fiEyesUIStartWavyAnimation();
                    }, props.repeatInterval * 1000);
                }
            };
            const fiEyesUIStopWavyAnimation = () => {
                if (animationTimeout.value) {
                    clearTimeout(animationTimeout.value);
                    animationTimeout.value = null;
                }
            };
            const fiEyesUIRenderText = () => {
                return props.text.split('').map((char, index) => (jsxRuntime.jsx("span", { className: "fiEyesUI-wavy-text-span", style: {
                        '--i': index,
                        animationDelay: `${props.delayMultiplier * index}s`,
                        animationDuration: `${props.animationDuration}s`
                    }, children: char === ' ' ? '\u00A0' : char }, index)));
            };
            vue.onMounted(() => {
                if (props.autoPlay) {
                    fiEyesUIStartWavyAnimation();
                }
            });
            vue.onUnmounted(() => {
                fiEyesUIStopWavyAnimation();
            });
            vue.watch(() => props.autoPlay, (newVal) => {
                if (newVal) {
                    fiEyesUIStartWavyAnimation();
                }
                else {
                    fiEyesUIStopWavyAnimation();
                }
            });
            return () => (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
                            __html: `
            .fiEyesUI-wavy-text-container {
              position: relative;
              display: inline-block;
              background-color: #000000;
              color: #ffffff;
              font-family: 'Orbitron', sans-serif;
              font-size: ${props.fontSize};
              text-transform: uppercase;
              letter-spacing: 0.1em;
            }
            
            .fiEyesUI-wavy-text-span {
              position: relative;
              display: inline-block;
              color: #ffffff;
              animation: fiEyesUI-wavy-animate ${props.animationDuration}s ease-in-out infinite;
              animation-delay: calc(${props.delayMultiplier}s * var(--i));
            }
            
            @keyframes fiEyesUI-wavy-animate {
              0%, 100% {
                transform: translateY(0px);
              }
              20% {
                transform: translateY(-${props.waveHeight}px);
              }
              40% {
                transform: translateY(0px);
              }
            }
          `
                        } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-wavy-text-container ${props.className}`, style: {
                            fontSize: props.fontSize,
                            ...props.style
                        }, children: fiEyesUIRenderText() })] }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUISlideLeft',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '50px'
            },
            animationDuration: {
                type: Number,
                default: 1.5
            },
            letterDelay: {
                type: Number,
                default: 0.1
            },
            slideDistance: {
                type: Number,
                default: 200
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 0
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['animationComplete', 'animationStart'],
        setup(props, { emit }) {
            const containerRef = vue.ref(null);
            const animationTimeout = vue.ref(null);
            const fiEyesUIStartSlideLeftAnimation = () => {
                if (!containerRef.value)
                    return;
                const spans = containerRef.value.querySelectorAll('.fiEyesUI-slideLeft-span');
                spans.forEach((span, index) => {
                    const element = span;
                    element.style.animationDelay = `${props.letterDelay * index}s`;
                    element.style.animationDuration = `${props.animationDuration}s`;
                });
                emit('animationStart');
                if (props.repeatInterval > 0) {
                    animationTimeout.value = window.setTimeout(() => {
                        fiEyesUIStartSlideLeftAnimation();
                    }, props.repeatInterval * 1000);
                }
            };
            const fiEyesUIStopSlideLeftAnimation = () => {
                if (animationTimeout.value) {
                    clearTimeout(animationTimeout.value);
                    animationTimeout.value = null;
                }
            };
            const fiEyesUIRenderText = () => {
                return props.text.split('').map((char, index) => (jsxRuntime.jsx("span", { className: "fiEyesUI-slideLeft-span", style: {
                        animationDelay: `${props.letterDelay * index}s`,
                        animationDuration: `${props.animationDuration}s`
                    }, children: char === ' ' ? '\u00A0' : char }, index)));
            };
            vue.onMounted(() => {
                if (props.autoPlay) {
                    fiEyesUIStartSlideLeftAnimation();
                }
            });
            vue.onUnmounted(() => {
                fiEyesUIStopSlideLeftAnimation();
            });
            vue.watch(() => props.autoPlay, (newVal) => {
                if (newVal) {
                    fiEyesUIStartSlideLeftAnimation();
                }
                else {
                    fiEyesUIStopSlideLeftAnimation();
                }
            });
            return () => (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
              font-size: ${props.fontSize};
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
                transform: translateX(${props.slideDistance}px);
              } 
              to {
                opacity: 1;
                transform: translateX(0%);
              }
            }
          `
                        } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-slideLeft-container ${props.className}`, style: {
                            fontSize: props.fontSize,
                            ...props.style
                        }, children: jsxRuntime.jsx("h1", { className: "fiEyesUI-slideLeft-title", children: fiEyesUIRenderText() }) })] }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUISlideReveal',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '25px'
            },
            animationDuration: {
                type: Number,
                default: 1.1
            },
            letterSpacing: {
                type: String,
                default: '3px'
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 0
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['animationComplete', 'animationStart'],
        setup(props, { emit }) {
            const containerRef = vue.ref(null);
            const animationTimeout = vue.ref(null);
            const fiEyesUIStartSlideRevealAnimation = () => {
                if (!containerRef.value)
                    return;
                const textElement = containerRef.value.querySelector('.fiEyesUI-slideReveal-text');
                if (textElement) {
                    // Reset animation
                    textElement.classList.remove('fiEyesUI-slideReveal-animate');
                    // Trigger animation
                    setTimeout(() => {
                        textElement.classList.add('fiEyesUI-slideReveal-animate');
                    }, 10);
                }
                emit('animationStart');
                if (props.repeatInterval > 0) {
                    animationTimeout.value = window.setTimeout(() => {
                        fiEyesUIStartSlideRevealAnimation();
                    }, props.repeatInterval * 1000);
                }
            };
            const fiEyesUIStopSlideRevealAnimation = () => {
                if (animationTimeout.value) {
                    clearTimeout(animationTimeout.value);
                    animationTimeout.value = null;
                }
            };
            vue.onMounted(() => {
                if (props.autoPlay) {
                    fiEyesUIStartSlideRevealAnimation();
                }
            });
            vue.onUnmounted(() => {
                fiEyesUIStopSlideRevealAnimation();
            });
            vue.watch(() => props.autoPlay, (newVal) => {
                if (newVal) {
                    fiEyesUIStartSlideRevealAnimation();
                }
                else {
                    fiEyesUIStopSlideRevealAnimation();
                }
            });
            return () => (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
                            __html: `
            .fiEyesUI-slideReveal-container {
              display: flex;
              justify-content: center;
              align-items: center;
              font-family: 'Orbitron', sans-serif;
              background-color: #000000;
              color: #ffffff;
              height: 100%;
              font-size: ${props.fontSize};
              position: relative;
            }
            
            .fiEyesUI-slideReveal-title {
              position: relative;
              letter-spacing: ${props.letterSpacing};
              font-weight: 300;
              text-transform: uppercase;
              padding-right: 30px;
              overflow: hidden;
            }
            
            .fiEyesUI-slideReveal-text {
              margin: 0 auto;
              white-space: nowrap;
              transform: translateX(calc(100% + 30px));
              animation: fiEyesUI-leftSlide ${props.animationDuration}s cubic-bezier(0.68, -0.55, 0.265, 1.10) forwards;
            }
            
            .fiEyesUI-slideReveal-title::before {
              content: "";
              position: absolute;
              right: 0;
              height: 100%;
              background: #000000;
              animation: fiEyesUI-hiddingSlide ${props.animationDuration}s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
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
              animation: fiEyesUI-rightSlide ${props.animationDuration}s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
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
                        } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-slideReveal-container ${props.className}`, style: {
                            fontSize: props.fontSize,
                            ...props.style
                        }, children: jsxRuntime.jsx("h1", { className: "fiEyesUI-slideReveal-title", children: jsxRuntime.jsx("div", { className: "fiEyesUI-slideReveal-text", children: props.text }) }) })] }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUITextEffect1',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '5rem'
            },
            animationDuration: {
                type: Number,
                default: 2
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            repeatInterval: {
                type: Number,
                default: 0
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['animationComplete', 'animationStart'],
        setup(props, { emit }) {
            const containerRef = vue.ref(null);
            const animationTimeout = vue.ref(null);
            const fiEyesUIInitializeTextEffect1 = () => {
                if (!containerRef.value)
                    return;
                const container = containerRef.value;
                const textElement = container.querySelector('.fiEyesUI-textEffect1-text');
                if (textElement) {
                    textElement.innerHTML = '';
                    const letters = props.text.split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        span.style.setProperty('--delay', `${index * 0.1}s`);
                        span.style.setProperty('--duration', `${props.animationDuration}s`);
                        textElement.appendChild(span);
                    });
                }
                emit('animationStart');
            };
            const fiEyesUIStartAnimation = () => {
                if (props.repeatInterval > 0) {
                    animationTimeout.value = window.setTimeout(() => {
                        fiEyesUIStartAnimation();
                    }, props.repeatInterval * 1000);
                }
            };
            const fiEyesUIStopAnimation = () => {
                if (animationTimeout.value) {
                    clearTimeout(animationTimeout.value);
                    animationTimeout.value = null;
                }
            };
            vue.onMounted(() => {
                fiEyesUIInitializeTextEffect1();
                if (props.autoPlay) {
                    fiEyesUIStartAnimation();
                }
            });
            vue.onUnmounted(() => {
                fiEyesUIStopAnimation();
            });
            vue.watch(() => props.autoPlay, (newVal) => {
                if (newVal) {
                    fiEyesUIStartAnimation();
                }
                else {
                    fiEyesUIStopAnimation();
                }
            });
            return () => (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
                            __html: `
            .fiEyesUI-textEffect1-container {
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
            
            .fiEyesUI-textEffect1-text {
              font-size: 1.5rem;
              font-weight: bold;
              text-transform: uppercase;
              text-align: center;
              line-height: 1.2;
            }
            
            .fiEyesUI-textEffect1-text span {
              display: inline-block;
              transform-style: preserve-3d;
              transform-origin: bottom;
              animation: fiEyesUI-anim1 var(--duration) linear infinite alternate;
              animation-delay: var(--delay);
              font-weight: bold;
              color: #000000;
              text-shadow: 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000;
            }
            
            @keyframes fiEyesUI-anim1 {
              0% {
                text-shadow: 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000;
                scale: 1 0;
              }
              100% {
                text-shadow: 0px 0px 2px #ffffff, 0px 0px 2px #ffffff, 0px 0px 2px #ffffff, 0px 0px 2px #ffffff;
                scale: 1 1;
              }
            }
          `
                        } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textEffect1-container ${props.className}`, style: {
                            fontSize: props.fontSize,
                            ...props.style
                        }, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textEffect1-text" }) })] }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUITextEffect2',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '3rem'
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['animationComplete', 'animationStart'],
        setup(props, { emit }) {
            const containerRef = vue.ref(null);
            const fiEyesUIInitializeTextEffect2 = () => {
                if (!containerRef.value)
                    return;
                const container = containerRef.value;
                const textElement = container.querySelector('.fiEyesUI-textEffect2-text');
                if (textElement) {
                    textElement.innerHTML = '';
                    const letters = props.text.split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        span.style.setProperty('--delay', `${index * 0.1}s`);
                        textElement.appendChild(span);
                    });
                }
                emit('animationStart');
            };
            vue.onMounted(() => {
                fiEyesUIInitializeTextEffect2();
            });
            return () => (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
                        } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textEffect2-container ${props.className}`, style: {
                            fontSize: props.fontSize,
                            ...props.style
                        }, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textEffect2-text" }) })] }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUITextEffect3',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '3rem'
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['animationComplete', 'animationStart'],
        setup(props, { emit }) {
            const containerRef = vue.ref(null);
            const fiEyesUIInitializeTextEffect3 = () => {
                if (!containerRef.value)
                    return;
                const container = containerRef.value;
                const textElement = container.querySelector('.fiEyesUI-textEffect3-text');
                if (textElement) {
                    textElement.innerHTML = '';
                    const letters = props.text.split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        textElement.appendChild(span);
                    });
                }
                emit('animationStart');
            };
            vue.onMounted(() => {
                fiEyesUIInitializeTextEffect3();
            });
            return () => (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
                        } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textEffect3-container ${props.className}`, style: {
                            fontSize: props.fontSize,
                            ...props.style
                        }, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textEffect3-text" }) })] }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUITextEffect4',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '3rem'
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['animationComplete', 'animationStart'],
        setup(props, { emit }) {
            const containerRef = vue.ref(null);
            const fiEyesUIInitializeTextEffect4 = () => {
                if (!containerRef.value)
                    return;
                const container = containerRef.value;
                const textElement = container.querySelector('.fiEyesUI-textEffect4-text');
                if (textElement) {
                    textElement.innerHTML = '';
                    const letters = props.text.split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        span.setAttribute('char', letter === ' ' ? '\u00A0' : letter);
                        span.style.setProperty('--delay', `${index * 0.1}s`);
                        textElement.appendChild(span);
                    });
                }
                emit('animationStart');
            };
            vue.onMounted(() => {
                fiEyesUIInitializeTextEffect4();
            });
            return () => (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
                        } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textEffect4-container ${props.className}`, style: {
                            fontSize: props.fontSize,
                            ...props.style
                        }, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textEffect4-text" }) })] }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUITextEffect5',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '3rem'
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['animationComplete', 'animationStart'],
        setup(props, { emit }) {
            const containerRef = vue.ref(null);
            const fiEyesUIInitializeTextEffect5 = () => {
                if (!containerRef.value)
                    return;
                const container = containerRef.value;
                const textElement = container.querySelector('.fiEyesUI-textEffect5-text');
                if (textElement) {
                    textElement.innerHTML = '';
                    const letters = props.text.split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        span.style.setProperty('--delay', `${index * 0.1}s`);
                        textElement.appendChild(span);
                    });
                }
                emit('animationStart');
            };
            const fiEyesUIDisintegrate = () => {
                if (!containerRef.value)
                    return;
                const container = containerRef.value;
                const spans = container.querySelectorAll('.fiEyesUI-textEffect5-text span');
                spans.forEach((span, index) => {
                    const element = span;
                    element.style.setProperty('--delay', `${index * 0.1}s`);
                    element.style.setProperty('--duration', '1s');
                    element.classList.add('fiEyesUI-disintegrate');
                });
                setTimeout(() => {
                    emit('animationComplete');
                }, 1000);
            };
            vue.onMounted(() => {
                fiEyesUIInitializeTextEffect5();
            });
            return () => (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
                            __html: `
            .fiEyesUI-textEffect5-container {
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
              cursor: pointer;
            }
            
            .fiEyesUI-textEffect5-text {
              font-size: 1.5rem;
              font-weight: bold;
              text-transform: uppercase;
              text-align: center;
              line-height: 1.2;
            }
            
            .fiEyesUI-textEffect5-text span {
              position: relative;
              color: #ffffff;
              pointer-events: none;
            }
            
            .fiEyesUI-disintegrate {
              animation: fiEyesUI-anim5 var(--duration, 1s) linear forwards;
              animation-delay: calc(var(--delay, 0) * 1s);
            }
            
            @keyframes fiEyesUI-anim5 {
              0% {
                filter: blur(0px);
              }
              10% {
                filter: blur(0px);
              }
              100% {
                filter: blur(500px);
              }
            }
          `
                        } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textEffect5-container ${props.className}`, style: {
                            fontSize: props.fontSize,
                            ...props.style
                        }, onClick: fiEyesUIDisintegrate, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textEffect5-text" }) })] }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUITextEffect6',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '3rem'
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['animationComplete', 'animationStart'],
        setup(props, { emit }) {
            const containerRef = vue.ref(null);
            const fiEyesUIInitializeTextEffect6 = () => {
                if (!containerRef.value)
                    return;
                const container = containerRef.value;
                const textElement = container.querySelector('.fiEyesUI-textEffect6-text');
                if (textElement) {
                    textElement.innerHTML = '';
                    const letters = props.text.split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        span.style.setProperty('--delay', `${index * 0.1}s`);
                        span.style.setProperty('--index', index.toString());
                        span.style.setProperty('--totalChars', letters.length.toString());
                        textElement.appendChild(span);
                    });
                }
                emit('animationStart');
            };
            vue.onMounted(() => {
                fiEyesUIInitializeTextEffect6();
            });
            return () => (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
                        } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textEffect6-container ${props.className}`, style: {
                            fontSize: props.fontSize,
                            ...props.style
                        }, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textEffect6-text" }) })] }));
        }
    });

    vue.defineComponent({
        name: 'FiEyesUITextEffect7',
        props: {
            text: {
                type: String,
                default: 'Welcome To Finches Eyes UI Components'
            },
            fontSize: {
                type: String,
                default: '3rem'
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            className: {
                type: String,
                default: ''
            },
            style: {
                type: Object,
                default: () => ({})
            }
        },
        emits: ['animationComplete', 'animationStart'],
        setup(props, { emit }) {
            const containerRef = vue.ref(null);
            const fiEyesUIInitializeTextEffect7 = () => {
                if (!containerRef.value)
                    return;
                const container = containerRef.value;
                const textElement = container.querySelector('.fiEyesUI-textEffect7-text');
                if (textElement) {
                    textElement.innerHTML = '';
                    const letters = props.text.split('');
                    letters.forEach((letter, index) => {
                        const span = document.createElement('span');
                        span.textContent = letter === ' ' ? '\u00A0' : letter;
                        span.style.setProperty('--delay', `${index * 0.1}s`);
                        textElement.appendChild(span);
                    });
                }
                emit('animationStart');
            };
            vue.onMounted(() => {
                fiEyesUIInitializeTextEffect7();
            });
            return () => (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("style", { dangerouslySetInnerHTML: {
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
                        } }), jsxRuntime.jsx("div", { ref: containerRef, className: `fiEyesUI-textEffect7-container ${props.className}`, style: {
                            fontSize: props.fontSize,
                            ...props.style
                        }, children: jsxRuntime.jsx("div", { className: "fiEyesUI-textEffect7-text" }) })] }));
        }
    });

    exports.FiEyesUIAnimatedComponent = FiEyesUIAnimatedComponent;
    exports.FiEyesUIAnimationDirective = FiEyesUIAnimationDirective;
    exports.FiEyesUIAnimationService = FiEyesUIAnimationService;
    exports.FiEyesUIBlurReveal = FiEyesUIBlurReveal;
    exports.FiEyesUIBlurRevealComponent = FiEyesUIBlurRevealComponent;
    exports.FiEyesUICharacterFlyIn = FiEyesUICharacterFlyIn;
    exports.FiEyesUICharacterFlyInComponent = FiEyesUICharacterFlyInComponent;
    exports.FiEyesUICharacterGlow = FiEyesUICharacterGlow;
    exports.FiEyesUICharacterGlowComponent = FiEyesUICharacterGlowComponent;
    exports.FiEyesUIFadeIn = FiEyesUIFadeIn;
    exports.FiEyesUIFadeInComponent = FiEyesUIFadeInComponent;
    exports.FiEyesUIFlyInOut = FiEyesUIFlyInOut;
    exports.FiEyesUIFlyInOutComponent = FiEyesUIFlyInOutComponent;
    exports.FiEyesUIGradientText = FiEyesUIGradientText;
    exports.FiEyesUIGradientTextComponent = FiEyesUIGradientTextComponent;
    exports.FiEyesUIHoverFill = FiEyesUIHoverFill;
    exports.FiEyesUIHoverFillComponent = FiEyesUIHoverFillComponent;
    exports.FiEyesUILetterBounce = FiEyesUILetterBounce;
    exports.FiEyesUILetterBounceComponent = FiEyesUILetterBounceComponent;
    exports.FiEyesUIResizeEffect = FiEyesUIResizeEffect;
    exports.FiEyesUIResizeEffectComponent = FiEyesUIResizeEffectComponent;
    exports.FiEyesUIRotatingText = FiEyesUIRotatingText;
    exports.FiEyesUIRotatingTextComponent = FiEyesUIRotatingTextComponent;
    exports.FiEyesUISlideLeft = FiEyesUISlideLeft;
    exports.FiEyesUISlideLeftComponent = FiEyesUISlideLeftComponent;
    exports.FiEyesUISlideReveal = FiEyesUISlideReveal;
    exports.FiEyesUISlideRevealComponent = FiEyesUISlideRevealComponent;
    exports.FiEyesUITextDrop = FiEyesUITextDrop;
    exports.FiEyesUITextDropComponent = FiEyesUITextDropComponent;
    exports.FiEyesUITextEffect1 = FiEyesUITextEffect1;
    exports.FiEyesUITextEffect1Component = FiEyesUITextEffect1Component;
    exports.FiEyesUITextEffect2 = FiEyesUITextEffect2;
    exports.FiEyesUITextEffect2Component = FiEyesUITextEffect2Component;
    exports.FiEyesUITextEffect3 = FiEyesUITextEffect3;
    exports.FiEyesUITextEffect3Component = FiEyesUITextEffect3Component;
    exports.FiEyesUITextEffect4 = FiEyesUITextEffect4;
    exports.FiEyesUITextEffect4Component = FiEyesUITextEffect4Component;
    exports.FiEyesUITextEffect5 = FiEyesUITextEffect5;
    exports.FiEyesUITextEffect5Component = FiEyesUITextEffect5Component;
    exports.FiEyesUITextEffect6 = FiEyesUITextEffect6;
    exports.FiEyesUITextEffect6Component = FiEyesUITextEffect6Component;
    exports.FiEyesUITextEffect7 = FiEyesUITextEffect7;
    exports.FiEyesUITextEffect7Component = FiEyesUITextEffect7Component;
    exports.FiEyesUITextReveal = FiEyesUITextReveal;
    exports.FiEyesUITextRevealComponent = FiEyesUITextRevealComponent;
    exports.FiEyesUITextScale = FiEyesUITextScale;
    exports.FiEyesUITextScaleBounce = FiEyesUITextScaleBounce;
    exports.FiEyesUITextScaleBounceComponent = FiEyesUITextScaleBounceComponent;
    exports.FiEyesUITextScaleComponent = FiEyesUITextScaleComponent;
    exports.FiEyesUITextStroke = FiEyesUITextStroke;
    exports.FiEyesUITextStrokeComponent = FiEyesUITextStrokeComponent;
    exports.FiEyesUITextSwipe = FiEyesUITextSwipe;
    exports.FiEyesUITextSwipeComponent = FiEyesUITextSwipeComponent;
    exports.FiEyesUITitleReveal = FiEyesUITitleReveal;
    exports.FiEyesUITitleRevealComponent = FiEyesUITitleRevealComponent;
    exports.FiEyesUITypewriter = FiEyesUITypewriter;
    exports.FiEyesUITypewriterComponent = FiEyesUITypewriterComponent;
    exports.FiEyesUIWavyText = FiEyesUIWavyText;
    exports.FiEyesUIWavyTextComponent = FiEyesUIWavyTextComponent;
    exports.fiEyesUIAnimationEngine = fiEyesUIAnimationEngine;
    exports.fiEyesUIEasingFunctions = fiEyesUIEasingFunctions;
    exports.fiEyesUIPresetAnimations = fiEyesUIPresetAnimations;
    exports.getFiEyesUIPresetAnimation = getFiEyesUIPresetAnimation;
    exports.useFiEyesUIAnimation = useFiEyesUIAnimation;
    exports.useVueAnimation = useFiEyesUIVueAnimation;

}));
//# sourceMappingURL=index.umd.js.map
