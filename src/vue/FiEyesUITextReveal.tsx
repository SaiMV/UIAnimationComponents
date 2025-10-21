import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUITextRevealProps {
  text1?: string;
  text2?: string;
  fontSize1?: string;
  fontSize2?: string;
  color1?: string;
  color2?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUITextReveal = defineComponent({
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
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    }
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const textRevealContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();
    const intervalId = ref<number>();

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
        ref={textRevealContainerRef}
        class={`fiEyesUI-textReveal-container ${props.className}`}
        style={props.style}
      >
        <div class="fiEyesUI-textReveal-content">
          <span class="fiEyesUI-textReveal-span fiEyesUI-textReveal-text1">{props.text1}</span>
          <span class="fiEyesUI-textReveal-span fiEyesUI-textReveal-text2">{props.text2}</span>
        </div>
      </div>
    );
  }
});
