import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUITextSwipeProps {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUITextSwipe = defineComponent({
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
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    }
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const textSwipeContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();
    const intervalId = ref<number>();

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
      if (!textSwipeContainerRef.value) return;
      
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
      if (!textSwipeContainerRef.value) return;
      
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
        ref={textSwipeContainerRef}
        class={`fiEyesUI-textSwipe-container ${props.className}`}
        style={props.style}
      >
        <div class="fiEyesUI-textSwipe-content">
          {/* Letters will be dynamically inserted here */}
        </div>
      </div>
    );
  }
});
