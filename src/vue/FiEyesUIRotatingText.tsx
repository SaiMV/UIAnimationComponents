import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUIRotatingTextProps {
  words?: string[];
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  wordDelay?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUIRotatingText = defineComponent({
  name: 'FiEyesUIRotatingText',
  props: {
    words: {
      type: Array as PropType<string[]>,
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
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    }
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const rotatingTextContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();
    const intervalId = ref<number>();

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
      if (!rotatingTextContainerRef.value) return;
      
      const fiEyesUIContainer = rotatingTextContainerRef.value;
      const fiEyesUIContentDiv = fiEyesUIContainer.querySelector('.fiEyesUI-rotatingText-content');
      if (!fiEyesUIContentDiv) return;
      
      fiEyesUIContentDiv.innerHTML = '';
      
      props.words.forEach((fiEyesUIWord, fiEyesUIIndex) => {
        const fiEyesUIWordDiv = document.createElement('h2');
        fiEyesUIWordDiv.className = 'fiEyesUI-rotatingText-word';
        fiEyesUIWordDiv.textContent = fiEyesUIWord;
        fiEyesUIContentDiv.appendChild(fiEyesUIWordDiv);
      });
    };

    const fiEyesUIStartAnimation = () => {
      if (!rotatingTextContainerRef.value) return;
      
      const fiEyesUIContainer = rotatingTextContainerRef.value;
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

    onMounted(() => {
      // Create styles dynamically
      fiEyesUICreateStyles();
      
      // Create word elements
      fiEyesUICreateWords();
      
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
        ref={rotatingTextContainerRef}
        class={`fiEyesUI-rotatingText-container ${props.className}`}
        style={{
          fontSize: props.fontSize,
          ...props.style
        }}
      >
        <div class="fiEyesUI-rotatingText-content"></div>
      </div>
    );
  }
});
