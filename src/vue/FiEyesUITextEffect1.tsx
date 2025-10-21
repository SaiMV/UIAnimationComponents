import { defineComponent, ref, onMounted, onUnmounted, watch, PropType } from 'vue';

export interface FiEyesUITextEffect1Props {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUITextEffect1 = defineComponent({
  name: 'FiEyesUITextEffect1',
  props: {
    text: {
      type: String,
      default: 'Welcome To Finches Eyes UI Components'
    },
    fontSize: {
      type: String,
      default: '5rem'
    },
    animationDuration: {
      type: Number,
      default: 2
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    repeatInterval: {
      type: Number,
      default: 0
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
  emits: ['animationComplete', 'animationStart'],
  setup(props: FiEyesUITextEffect1Props, { emit }) {
    const containerRef = ref<HTMLDivElement | null>(null);
    const animationTimeout = ref<number | null>(null);

    const fiEyesUIInitializeTextEffect1 = () => {
      if (!containerRef.value) return;

      const container = containerRef.value;
      const textElement = container.querySelector('.fiEyesUI-textEffect1-text');
      
      if (textElement) {
        textElement.innerHTML = '';
        const letters = props.text.split('');
        
        letters.forEach((letter, index) => {
          const span = document.createElement('span');
          span.textContent = letter === ' ' ? '\u00A0' : letter;
          span.style.setProperty('--delay', `${index * 0.1}s`);
          span.style.setProperty('--duration', `${props.animationDuration}s`);
          textElement.appendChild(span);
        });
      }

      emit('animationStart');
    };

    const fiEyesUIStartAnimation = () => {
      if (props.repeatInterval > 0) {
        animationTimeout.value = window.setTimeout(() => {
          fiEyesUIStartAnimation();
        }, props.repeatInterval * 1000);
      }
    };

    const fiEyesUIStopAnimation = () => {
      if (animationTimeout.value) {
        clearTimeout(animationTimeout.value);
        animationTimeout.value = null;
      }
    };

    onMounted(() => {
      fiEyesUIInitializeTextEffect1();
      if (props.autoPlay) {
        fiEyesUIStartAnimation();
      }
    });

    onUnmounted(() => {
      fiEyesUIStopAnimation();
    });

    watch(() => props.autoPlay, (newVal) => {
      if (newVal) {
        fiEyesUIStartAnimation();
      } else {
        fiEyesUIStopAnimation();
      }
    });

    return () => (
      <>
        <style dangerouslySetInnerHTML={{
          __html: `
            .fiEyesUI-textEffect1-container {
              font-family: 'Orbitron', sans-serif;
              background-color: #000000;
              color: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
              padding: 10px;
              box-sizing: border-box;
            }
            
            .fiEyesUI-textEffect1-text {
              font-size: 1.5rem;
              font-weight: bold;
              text-transform: uppercase;
              text-align: center;
              line-height: 1.2;
            }
            
            .fiEyesUI-textEffect1-text span {
              display: inline-block;
              transform-style: preserve-3d;
              transform-origin: bottom;
              animation: fiEyesUI-anim1 var(--duration) linear infinite alternate;
              animation-delay: var(--delay);
              font-weight: bold;
              color: #000000;
              text-shadow: 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000;
            }
            
            @keyframes fiEyesUI-anim1 {
              0% {
                text-shadow: 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000;
                scale: 1 0;
              }
              100% {
                text-shadow: 0px 0px 2px #ffffff, 0px 0px 2px #ffffff, 0px 0px 2px #ffffff, 0px 0px 2px #ffffff;
                scale: 1 1;
              }
            }
          `
        }} />
        <div
          ref={containerRef}
          className={`fiEyesUI-textEffect1-container ${props.className}`}
          style={{
            fontSize: props.fontSize,
            ...props.style
          }}
        >
          <div className="fiEyesUI-textEffect1-text"></div>
        </div>
      </>
    );
  }
});

export default FiEyesUITextEffect1;
