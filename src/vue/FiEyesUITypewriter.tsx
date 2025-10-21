import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUITypewriterProps {
  text?: string;
  fontSize?: string;
  cursorColor?: string;
  cursorWidth?: string;
  animationDuration?: number;
  cursorBlinkSpeed?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUITypewriter = defineComponent({
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
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    }
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const typewriterContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();
    const intervalId = ref<number>();

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

    onMounted(() => {
      // Create styles dynamically
      fiEyesUICreateStyles();
      
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
        ref={typewriterContainerRef}
        class={`fiEyesUI-typewriter-container ${props.className}`}
        style={props.style}
      >
        <div class="fiEyesUI-typewriter-content">
          <div class="fiEyesUI-typewriter-text">{props.text}</div>
        </div>
      </div>
    );
  }
});
