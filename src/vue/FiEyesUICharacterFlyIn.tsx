import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUICharacterFlyInProps {
  text?: string;
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  startDelay?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUICharacterFlyIn = defineComponent({
  name: 'FiEyesUICharacterFlyIn',
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
      default: 2800
    },
    startDelay: {
      type: Number,
      default: 700
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
    const characterFlyInContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();
    const intervalId = ref<number>();

    const fiEyesUICreateStyles = () => {
      const fiEyesUIStyleId = 'fiEyesUI-characterFlyIn-styles';
      const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      fiEyesUIStyleElement.value = document.createElement('style');
      fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
      fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-characterFlyIn-container {
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
        
        .fiEyesUI-characterFlyIn-list {
          position: absolute;
          left: 50%;
          top: 50%;
          list-style: none;
          transform: translateX(-50%) translateY(-50%);
          margin: 0;
          padding: 0;
        }
        
        .fiEyesUI-characterFlyIn-character {
          display: inline-block;
          margin-right: 30px;
          font-family: 'Orbitron', sans-serif;
          font-weight: 300;
          font-size: ${props.fontSize};
          color: ${props.color};
          opacity: 1;
          transition: all ${props.animationDuration}ms cubic-bezier(0.6, -.005, 0.32, 1.75);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character {
          opacity: 0;
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(1) {
          transform: translateX(150px) translateY(-170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(2) {
          transform: translateX(-210px) translateY(170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(3) {
          transform: translateX(20px) translateY(-100px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(4) {
          transform: translateX(-100px) translateY(-20px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(5) {
          transform: translateX(-70px) translateY(-200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(6) {
          transform: translateX(200px) translateY(70px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(7) {
          transform: translateX(30px) translateY(200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(8) {
          transform: translateX(30px) translateY(-100px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(9) {
          transform: translateX(100px) translateY(-170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(10) {
          transform: translateX(-100px) translateY(50px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(11) {
          transform: translateX(-550px) translateY(120px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(12) {
          transform: translateX(-40px) translateY(-50px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(13) {
          transform: translateX(150px) translateY(-170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(14) {
          transform: translateX(-210px) translateY(170px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(15) {
          transform: translateX(20px) translateY(-100px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(16) {
          transform: translateX(-100px) translateY(-20px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(17) {
          transform: translateX(-70px) translateY(-200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(18) {
          transform: translateX(200px) translateY(70px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(19) {
          transform: translateX(30px) translateY(200px);
        }
        
        .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(20) {
          transform: translateX(30px) translateY(-100px);
        }
      `;
      
      document.head.appendChild(fiEyesUIStyleElement.value);
    };

    const fiEyesUICreateCharacters = () => {
      if (!characterFlyInContainerRef.value) return;
      
      const fiEyesUIContainer = characterFlyInContainerRef.value;
      const fiEyesUIListDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterFlyIn-list');
      if (!fiEyesUIListDiv) return;
      
      fiEyesUIListDiv.innerHTML = '';
      
      const fiEyesUICharacters = props.text.split('');
      fiEyesUICharacters.forEach((fiEyesUIChar) => {
        const fiEyesUICharacterDiv = document.createElement('li');
        fiEyesUICharacterDiv.className = 'fiEyesUI-characterFlyIn-character';
        fiEyesUICharacterDiv.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
        fiEyesUIListDiv.appendChild(fiEyesUICharacterDiv);
      });
    };

    const fiEyesUIStartAnimation = () => {
      if (!characterFlyInContainerRef.value) return;
      
      const fiEyesUIContainer = characterFlyInContainerRef.value;
      fiEyesUICreateCharacters();
      
      const fiEyesUIListDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterFlyIn-list');
      if (!fiEyesUIListDiv) return;
      
      // Add hidden class initially
      fiEyesUIListDiv.classList.add('fiEyesUI-hidden');
      
      // Remove hidden class after delay to start animation
      setTimeout(() => {
        fiEyesUIListDiv.classList.remove('fiEyesUI-hidden');
        
        // Calculate total animation time
        const totalTime = props.startDelay + props.animationDuration;
        
        setTimeout(() => {
          emit('complete');
        }, totalTime);
      }, props.startDelay);
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
        ref={characterFlyInContainerRef}
        class={`fiEyesUI-characterFlyIn-container ${props.className}`}
        style={{
          fontSize: props.fontSize,
          ...props.style
        }}
      >
        <ul class="fiEyesUI-characterFlyIn-list fiEyesUI-hidden"></ul>
      </div>
    );
  }
});
