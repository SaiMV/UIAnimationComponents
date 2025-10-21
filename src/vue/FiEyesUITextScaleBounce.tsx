import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUITextScaleBounceProps {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUITextScaleBounce = defineComponent({
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
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    }
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const textScaleBounceContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();
    const intervalId = ref<number>();

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
      if (!textScaleBounceContainerRef.value) return;
      
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
        ref={textScaleBounceContainerRef}
        class={`fiEyesUI-textScaleBounce-container ${props.className}`}
        style={props.style}
      >
        <div class="fiEyesUI-textScaleBounce-content">
          {props.text}
        </div>
      </div>
    );
  }
});
