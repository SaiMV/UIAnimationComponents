import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUIResizeEffectProps {
  text?: string;
  minFontSize?: string;
  maxFontSize?: string;
  minFontWeight?: number;
  maxFontWeight?: number;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUIResizeEffect = defineComponent({
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
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    }
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const resizeEffectContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();
    const intervalId = ref<number>();

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
        ref={resizeEffectContainerRef}
        class={`fiEyesUI-resizeEffect-container ${props.className}`}
        style={props.style}
      >
        <div class="fiEyesUI-resizeEffect-content">
          <h1>{props.text}</h1>
        </div>
      </div>
    );
  }
});
