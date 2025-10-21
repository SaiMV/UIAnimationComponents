import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUICharacterGlowProps {
  text?: string;
  fontSize?: string;
  color?: string;
  glowColor?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUICharacterGlow = defineComponent({
  name: 'FiEyesUICharacterGlow',
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
    glowColor: {
      type: String,
      default: '#00bbff'
    },
    animationDuration: {
      type: Number,
      default: 2250
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
    const characterGlowContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();
    const intervalId = ref<number>();

    const fiEyesUICreateStyles = () => {
      const fiEyesUIStyleId = 'fiEyesUI-characterGlow-styles';
      const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      fiEyesUIStyleElement.value = document.createElement('style');
      fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
      fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-characterGlow-container {
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
        
        .fiEyesUI-characterGlow-content {
          font-size: ${props.fontSize};
          font-family: 'Orbitron', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .fiEyesUI-characterGlow-character {
          display: block;
          float: left;
          animation: fiEyesUI-character-glow ${props.animationDuration}ms linear infinite;
          margin: 0 5px;
          padding: 0;
          position: relative;
          color: #111;
        }
        
        .fiEyesUI-characterGlow-character:nth-child(1) {
          animation-delay: 0s;
        }
        .fiEyesUI-characterGlow-character:nth-child(2) {
          animation-delay: 0.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(3) {
          animation-delay: 0.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(4) {
          animation-delay: 0.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(5) {
          animation-delay: 1s;
        }
        .fiEyesUI-characterGlow-character:nth-child(6) {
          animation-delay: 1.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(7) {
          animation-delay: 1.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(8) {
          animation-delay: 1.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(9) {
          animation-delay: 2s;
        }
        .fiEyesUI-characterGlow-character:nth-child(10) {
          animation-delay: 2.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(11) {
          animation-delay: 2.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(12) {
          animation-delay: 2.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(13) {
          animation-delay: 3s;
        }
        .fiEyesUI-characterGlow-character:nth-child(14) {
          animation-delay: 3.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(15) {
          animation-delay: 3.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(16) {
          animation-delay: 3.75s;
        }
        .fiEyesUI-characterGlow-character:nth-child(17) {
          animation-delay: 4s;
        }
        .fiEyesUI-characterGlow-character:nth-child(18) {
          animation-delay: 4.25s;
        }
        .fiEyesUI-characterGlow-character:nth-child(19) {
          animation-delay: 4.5s;
        }
        .fiEyesUI-characterGlow-character:nth-child(20) {
          animation-delay: 4.75s;
        }
        
        @keyframes fiEyesUI-character-glow {
          0%, 100% {
            color: ${props.color};
            filter: blur(2px);
            text-shadow: 0 0 10px ${props.glowColor},
              0 0 20px ${props.glowColor},
              0 0 40px ${props.glowColor},
              0 0 80px ${props.glowColor},
              0 0 120px ${props.glowColor},
              0 0 200px ${props.glowColor},
              0 0 300px ${props.glowColor},
              0 0 400px ${props.glowColor};
          }
          5%, 95% {
            color: #111;
            filter: blur(0px);
            text-shadow: none;
          }
        }
      `;
      
      document.head.appendChild(fiEyesUIStyleElement.value);
    };

    const fiEyesUICreateCharacters = () => {
      if (!characterGlowContainerRef.value) return;
      
      const fiEyesUIContainer = characterGlowContainerRef.value;
      const fiEyesUIContentDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterGlow-content');
      if (!fiEyesUIContentDiv) return;
      
      fiEyesUIContentDiv.innerHTML = '';
      
      const fiEyesUICharacters = props.text.split('');
      fiEyesUICharacters.forEach((fiEyesUIChar) => {
        const fiEyesUICharacterSpan = document.createElement('span');
        fiEyesUICharacterSpan.className = 'fiEyesUI-characterGlow-character';
        fiEyesUICharacterSpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
        fiEyesUIContentDiv.appendChild(fiEyesUICharacterSpan);
      });
    };

    const fiEyesUIStartAnimation = () => {
      fiEyesUICreateCharacters();
      
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
      
      // Create character elements
      fiEyesUICreateCharacters();
      
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
        ref={characterGlowContainerRef}
        class={`fiEyesUI-characterGlow-container ${props.className}`}
        style={props.style}
      >
        <div class="fiEyesUI-characterGlow-content"></div>
      </div>
    );
  }
});
