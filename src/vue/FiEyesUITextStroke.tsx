import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUITextStrokeProps {
  text?: string;
  fontSize?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUITextStroke = defineComponent({
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
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    }
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const textStrokeContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();
    const intervalId = ref<number>();

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
        ref={textStrokeContainerRef}
        class={`fiEyesUI-textStroke-container ${props.className}`}
        style={props.style}
      >
        <div class="fiEyesUI-textStroke-content">
          <h2 class="fiEyesUI-textStroke-text">{props.text}</h2>
          <h2 class="fiEyesUI-textStroke-text">{props.text}</h2>
        </div>
      </div>
    );
  }
});
