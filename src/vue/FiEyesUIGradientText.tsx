import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUIGradientTextProps {
  text?: string;
  fontSize?: string;
  gradientColors?: string[];
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUIGradientText = defineComponent({
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
      type: Array as PropType<string[]>,
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
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    }
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const gradientTextContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();
    const intervalId = ref<number>();

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
        ref={gradientTextContainerRef}
        class={`fiEyesUI-gradientText-container ${props.className}`}
        style={props.style}
      >
        <div class="fiEyesUI-gradientText-content">
          <h3>{props.text}</h3>
        </div>
      </div>
    );
  }
});
