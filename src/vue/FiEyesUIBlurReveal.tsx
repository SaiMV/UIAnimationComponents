import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUIBlurRevealProps {
  text?: string;
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  letterDelay?: number;
  autoRepeat?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUIBlurReveal = defineComponent({
  name: 'FiEyesUIBlurReveal',
  props: {
    text: {
      type: String,
      default: 'Welcome To Finches Eyes UI Components'
    },
    fontSize: {
      type: String,
      default: '32px'
    },
    color: {
      type: String,
      default: '#ffffff'
    },
    animationDuration: {
      type: Number,
      default: 550
    },
    letterDelay: {
      type: Number,
      default: 35
    },
    autoRepeat: {
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
    const blurRevealContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();
    const intervalRef = ref<NodeJS.Timeout>();

    const fiEyesUICreateStyles = () => {
      const fiEyesUIStyleId = 'fiEyesUI-blurReveal-styles';
      const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      fiEyesUIStyleElement.value = document.createElement('style');
      fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
      fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-blurReveal-container {
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
        }
        
        .fiEyesUI-blurReveal-text {
          color: ${props.color};
          font-size: ${props.fontSize};
          text-align: center;
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
        }
        
        .fiEyesUI-blurReveal-text span {
          opacity: 0;
          transition: all ${props.animationDuration}ms ease;
          filter: blur(25px);
          transform: translateZ(0);
          display: inline-block;
        }
        
        .fiEyesUI-blurReveal-text.animate span {
          opacity: 1;
          filter: blur(0px);
        }
      `;
      
      // Add delay classes for each character
      const fiEyesUICharacters = props.text.split('');
      fiEyesUICharacters.forEach((_, index) => {
        const delay = props.letterDelay * (index + 1);
        fiEyesUIStyleElement.value!.textContent += `
          .fiEyesUI-blurReveal-text span:nth-child(${index + 1}) {
            transition-delay: ${delay}ms;
          }
        `;
      });
      
      document.head.appendChild(fiEyesUIStyleElement.value);
    };

    const fiEyesUIStartAnimation = () => {
      if (!blurRevealContainerRef.value) return;
      
      blurRevealContainerRef.value.classList.add('animate');
      
      // Calculate total animation time
      const totalTime = (props.text.length * props.letterDelay) + props.animationDuration;
      
      setTimeout(() => {
        emit('complete');
      }, totalTime);
    };

    const fiEyesUIStartAutoRepeat = () => {
      if (props.autoRepeat) {
        intervalRef.value = setInterval(() => {
          if (blurRevealContainerRef.value) {
            blurRevealContainerRef.value.classList.remove('animate');
            setTimeout(() => {
              fiEyesUIStartAnimation();
            }, 100);
          }
        }, props.repeatInterval);
      }
    };

    const fiEyesUIInitializeAnimation = () => {
      if (!blurRevealContainerRef.value) return;

      const fiEyesUIContainer = blurRevealContainerRef.value;
      const fiEyesUIText = props.text;
      const fiEyesUICharacters = fiEyesUIText.split('');
      
      // Clear container
      fiEyesUIContainer.innerHTML = '';
      
      // Create styles dynamically
      fiEyesUICreateStyles();
      
      // Create spans for each character
      fiEyesUICharacters.forEach((fiEyesUIChar) => {
        const fiEyesUISpan = document.createElement('span');
        fiEyesUISpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
        fiEyesUIContainer.appendChild(fiEyesUISpan);
      });
      
      // Start animation
      fiEyesUIStartAnimation();
      
      // Start auto repeat if enabled
      fiEyesUIStartAutoRepeat();
    };

    const fiEyesUICleanup = () => {
      if (intervalRef.value) {
        clearInterval(intervalRef.value);
      }
      if (fiEyesUIStyleElement.value) {
        fiEyesUIStyleElement.value.remove();
      }
    };

    onMounted(() => {
      fiEyesUIInitializeAnimation();
    });

    onUnmounted(() => {
      fiEyesUICleanup();
    });

    return () => (
      <div 
        ref={blurRevealContainerRef}
        class={`fiEyesUI-blurReveal-container ${props.className}`}
        style={{
          fontSize: props.fontSize,
          ...props.style
        }}
      />
    );
  }
});
