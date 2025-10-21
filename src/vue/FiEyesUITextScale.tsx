import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUITextScaleProps {
  text?: string;
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  animationDelay?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUITextScale = defineComponent({
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
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    }
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const textScaleContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();
    const intervalId = ref<number>();

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
      if (!textScaleContainerRef.value) return;
      
      const fiEyesUIContainer = textScaleContainerRef.value;
      const fiEyesUIText = props.text;
      const fiEyesUILengthOfText = fiEyesUIText.length;
      const fiEyesUICharList = new Array(fiEyesUILengthOfText);
      
      for (let i = 0; i < fiEyesUILengthOfText; i++) {
        fiEyesUICharList[i] = fiEyesUIText.charAt(i);
      }
      
      const fiEyesUITargetDiv = fiEyesUIContainer.querySelector('.fiEyesUI-textScale-appendText');
      if (!fiEyesUITargetDiv) return;
      
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
      if (!textScaleContainerRef.value) return;
      
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

    onMounted(() => {
      // Create styles dynamically
      fiEyesUICreateStyles();
      
      // Split text into characters
      fiEyesUISplitText();
      
      if (props.autoPlay) {
        fiEyesUIAnimateText();
        
        // Set up interval for auto-repeat
        intervalId.value = window.setInterval(() => {
          fiEyesUIAnimateText();
        }, props.repeatInterval) as unknown as number;
      }
    });

    onUnmounted(() => {
      fiEyesUICleanup();
    });

    return () => (
      <div 
        ref={textScaleContainerRef}
        class={`fiEyesUI-textScale-container ${props.className}`}
        style={{
          fontSize: props.fontSize,
          ...props.style
        }}
      >
        <div class="fiEyesUI-textScale-appendText"></div>
      </div>
    );
  }
});
