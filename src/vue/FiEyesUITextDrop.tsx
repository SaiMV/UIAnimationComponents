import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUITextDropProps {
  text?: string;
  fontSize?: string;
  color?: string;
  secondaryColor?: string;
  animationDuration?: number;
  delayRange?: { min: number; max: number };
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUITextDrop = defineComponent({
  name: 'FiEyesUITextDrop',
  props: {
    text: {
      type: String,
      default: 'Welcome To Finches Eyes UI Components'
    },
    fontSize: {
      type: String,
      default: '3em'
    },
    color: {
      type: String,
      default: '#ffffff'
    },
    secondaryColor: {
      type: String,
      default: '#ffffff'
    },
    animationDuration: {
      type: Number,
      default: 1.2
    },
    delayRange: {
      type: Object as PropType<{ min: number; max: number }>,
      default: () => ({ min: 1, max: 9 })
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
    const textDropContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();

    const fiEyesUIRandomDelay = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const fiEyesUICreateStyles = () => {
      const fiEyesUIStyleId = 'fiEyesUI-textDrop-styles';
      const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      fiEyesUIStyleElement.value = document.createElement('style');
      fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
      fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-textDrop-container {
          font-family: 'Orbitron', sans-serif;
          font-weight: 400;
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
        
        .fiEyesUI-letterDrop {
          position: relative;
          top: 0;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.5em;
          opacity: 0.8;
          transform: rotateX(-90deg);
          animation: fiEyesUILetterDrop ${props.animationDuration}s ease 1 normal forwards;
        }
        
        .fiEyesUI-letterDrop.fiEyesUI-secondary {
          color: ${props.secondaryColor};
        }
        
        @keyframes fiEyesUILetterDrop {
          10% {
            opacity: 0.5;
          }
          20% {
            opacity: 0.8;
            top: 3.75em;
            transform: rotateX(-360deg);
          }
          100% {
            opacity: 1;
            top: 4.50em;
            transform: rotateX(360deg);
          }
        }
      `;
      
      // Add delay classes
      for (let i = props.delayRange.min; i <= props.delayRange.max; i++) {
        fiEyesUIStyleElement.value.textContent += `
          .fiEyesUI-ld${i} { 
            animation-delay: 1.${i}s; 
          }
        `;
      }
      
      document.head.appendChild(fiEyesUIStyleElement.value);
    };

    const fiEyesUIInitializeAnimation = () => {
      if (!textDropContainerRef.value) return;

      const fiEyesUIContainer = textDropContainerRef.value;
      const fiEyesUIText = props.text;
      const fiEyesUICharacters = fiEyesUIText.split('');
      
      // Clear container
      fiEyesUIContainer.innerHTML = '';
      
      // Create styles dynamically
      fiEyesUICreateStyles();
      
      let fiEyesUICharacterIndex = 0;
      const fiEyesUIMaxDelay = Math.max(...Array.from({length: fiEyesUICharacters.length}, (_, i) => 
        fiEyesUIRandomDelay(props.delayRange.min, props.delayRange.max)
      ));
      
      fiEyesUICharacters.forEach((fiEyesUIChar, fiEyesUIIndex) => {
        const fiEyesUIDelay = fiEyesUIRandomDelay(props.delayRange.min, props.delayRange.max);
        const fiEyesUISpan = document.createElement('span');
        
        fiEyesUISpan.className = `fiEyesUI-letterDrop fiEyesUI-ld${fiEyesUIDelay}`;
        fiEyesUISpan.style.color = props.color;
        
        // Add secondary color to even characters
        if (fiEyesUIIndex % 2 === 1) {
          fiEyesUISpan.classList.add('fiEyesUI-secondary');
        }
        
        fiEyesUISpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
        fiEyesUIContainer.appendChild(fiEyesUISpan);
        
        // Track completion
        fiEyesUICharacterIndex++;
        if (fiEyesUICharacterIndex === fiEyesUICharacters.length) {
          const fiEyesUIMaxAnimationTime = (fiEyesUIMaxDelay / 10) * 1000 + (props.animationDuration * 1000);
          setTimeout(() => {
            emit('complete');
          }, fiEyesUIMaxAnimationTime);
        }
      });
    };

    const fiEyesUICleanup = () => {
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
        ref={textDropContainerRef}
        class={`fiEyesUI-textDrop-container ${props.className}`}
        style={{
          fontSize: props.fontSize,
          ...props.style
        }}
      />
    );
  }
});
