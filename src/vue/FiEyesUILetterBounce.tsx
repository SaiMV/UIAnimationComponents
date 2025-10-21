import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUILetterBounceProps {
  text?: string;
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  letterDelay?: number;
  loop?: boolean;
  direction?: 'normal' | 'reverse' | 'alternate';
  easing?: string;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUILetterBounce = defineComponent({
  name: 'FiEyesUILetterBounce',
  props: {
    text: {
      type: String,
      default: 'Welcome To Finches Eyes UI Components'
    },
    fontSize: {
      type: String,
      default: '4rem'
    },
    color: {
      type: String,
      default: '#ffffff'
    },
    animationDuration: {
      type: Number,
      default: 800
    },
    letterDelay: {
      type: Number,
      default: 80
    },
    loop: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String as PropType<'normal' | 'reverse' | 'alternate'>,
      default: 'alternate'
    },
    easing: {
      type: String,
      default: 'easeInBounce'
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
    const letterBounceContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();
    const animationTimeout = ref<NodeJS.Timeout>();

    const fiEyesUICreateStyles = () => {
      const fiEyesUIStyleId = 'fiEyesUI-letterBounce-styles';
      const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      fiEyesUIStyleElement.value = document.createElement('style');
      fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
      fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-letterBounce-container {
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
        
        .fiEyesUI-letterBounce-container:before {
          content: '';
          width: 100%;
          background: ${props.color};
          opacity: 0.3;
          bottom: 0;
          height: 1px;
          left: 0;
          position: absolute;
        }
        
        .fiEyesUI-letterBounce-name {
          display: flex;
          margin: auto;
          padding: 0 1rem 1rem;
          position: relative;
        }
        
        .fiEyesUI-letterBounce-letter {
          display: inline-block;
          opacity: 0;
          transform: scale(0.9);
          color: ${props.color};
          font-size: ${props.fontSize};
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
        }
      `;
      
      document.head.appendChild(fiEyesUIStyleElement.value);
    };

    const fiEyesUIStartAnimation = () => {
      if (!letterBounceContainerRef.value) return;
      
      const fiEyesUIContainer = letterBounceContainerRef.value;
      const fiEyesUILetters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-letterBounce-letter');
      
      // Animate each letter with delay
      fiEyesUILetters.forEach((fiEyesUILetter, fiEyesUIIndex) => {
        setTimeout(() => {
          (fiEyesUILetter as HTMLElement).style.opacity = '1';
          (fiEyesUILetter as HTMLElement).style.transform = 'scale(1)';
          (fiEyesUILetter as HTMLElement).style.transition = `all ${props.animationDuration}ms ${props.easing}`;
        }, fiEyesUIIndex * props.letterDelay);
      });
      
      // Calculate total animation time
      const totalTime = (props.text.length * props.letterDelay) + props.animationDuration;
      
      animationTimeout.value = setTimeout(() => {
        emit('complete');
        
        // If loop is enabled, restart animation
        if (props.loop) {
          setTimeout(() => {
            fiEyesUIResetAndRestart();
          }, 1000);
        }
      }, totalTime);
    };

    const fiEyesUIResetAndRestart = () => {
      if (!letterBounceContainerRef.value) return;
      
      const fiEyesUIContainer = letterBounceContainerRef.value;
      const fiEyesUILetters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-letterBounce-letter');
      
      fiEyesUILetters.forEach((fiEyesUILetter) => {
        (fiEyesUILetter as HTMLElement).style.opacity = '0';
        (fiEyesUILetter as HTMLElement).style.transform = 'scale(0.9)';
      });
      
      setTimeout(() => {
        fiEyesUIStartAnimation();
      }, 100);
    };

    const fiEyesUIInitializeAnimation = () => {
      if (!letterBounceContainerRef.value) return;

      const fiEyesUIContainer = letterBounceContainerRef.value;
      const fiEyesUIText = props.text;
      const fiEyesUICharacters = fiEyesUIText.split('');
      
      // Clear container
      fiEyesUIContainer.innerHTML = '';
      
      // Create styles dynamically
      fiEyesUICreateStyles();
      
      // Create name container
      const fiEyesUINameDiv = document.createElement('div');
      fiEyesUINameDiv.className = 'fiEyesUI-letterBounce-name';
      
      // Create letter divs for each character
      fiEyesUICharacters.forEach((fiEyesUIChar) => {
        const fiEyesUILetterDiv = document.createElement('div');
        fiEyesUILetterDiv.className = 'fiEyesUI-letterBounce-letter';
        fiEyesUILetterDiv.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
        fiEyesUINameDiv.appendChild(fiEyesUILetterDiv);
      });
      
      fiEyesUIContainer.appendChild(fiEyesUINameDiv);
      
      // Start animation
      fiEyesUIStartAnimation();
    };

    const fiEyesUICleanup = () => {
      if (animationTimeout.value) {
        clearTimeout(animationTimeout.value);
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
        ref={letterBounceContainerRef}
        class={`fiEyesUI-letterBounce-container ${props.className}`}
        style={{
          fontSize: props.fontSize,
          ...props.style
        }}
      />
    );
  }
});
