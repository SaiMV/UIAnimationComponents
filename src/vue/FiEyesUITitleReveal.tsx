import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUITitleRevealProps {
  title?: string;
  subtitle?: string;
  titleFontSize?: string;
  subtitleFontSize?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUITitleReveal = defineComponent({
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
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    }
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const titleRevealContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();
    const intervalId = ref<number>();

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
      if (!titleRevealContainerRef.value) return;
      
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
      if (!titleRevealContainerRef.value) return;
      
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

    onMounted(() => {
      // Create styles dynamically
      fiEyesUICreateStyles();
      
      // Initialize text with individual letters
      fiEyesUIInitializeText();
      
      if (props.autoPlay) {
        fiEyesUIStartAnimation();
        
        // Set up interval for auto-repeat
        intervalId.value = window.setInterval(() => {
          fiEyesUIStartAnimation();
        }, props.repeatInterval) as unknown as number;
      }
    });

    onUnmounted(() => {
      fiEyesUICleanup();
    });

    return () => (
      <div 
        ref={titleRevealContainerRef}
        class={`fiEyesUI-titleReveal-container ${props.className}`}
        style={props.style}
      >
        <div class="fiEyesUI-titleReveal-content">
          <h1>
            <span class="fiEyesUI-titleReveal-title">
              {/* Letters will be dynamically inserted here */}
            </span>
            <br />
            <span class="fiEyesUI-titleReveal-subtitle">
              {/* Subtitle will be dynamically inserted here */}
            </span>
          </h1>
        </div>
      </div>
    );
  }
});
