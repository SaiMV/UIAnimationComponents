import { defineComponent, ref, onMounted, onUnmounted, watch, PropType } from 'vue';

export interface FiEyesUITextEffect7Props {
  text?: string;
  fontSize?: string;
  autoPlay?: boolean;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUITextEffect7 = defineComponent({
  name: 'FiEyesUITextEffect7',
  props: {
    text: {
      type: String,
      default: 'Welcome To Finches Eyes UI Components'
    },
    fontSize: {
      type: String,
      default: '3rem'
    },
    autoPlay: {
      type: Boolean,
      default: true
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
  setup(props: FiEyesUITextEffect7Props, { emit }) {
    const containerRef = ref<HTMLDivElement | null>(null);

    const fiEyesUIInitializeTextEffect7 = () => {
      if (!containerRef.value) return;

      const container = containerRef.value;
      const textElement = container.querySelector('.fiEyesUI-textEffect7-text');
      
      if (textElement) {
        textElement.innerHTML = '';
        const letters = props.text.split('');
        
        letters.forEach((letter, index) => {
          const span = document.createElement('span');
          span.textContent = letter === ' ' ? '\u00A0' : letter;
          span.style.setProperty('--delay', `${index * 0.1}s`);
          textElement.appendChild(span);
        });
      }

      emit('animationStart');
    };

    onMounted(() => {
      fiEyesUIInitializeTextEffect7();
    });

    return () => (
      <>
        <style dangerouslySetInnerHTML={{
          __html: `
            .fiEyesUI-textEffect7-container {
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
            
            .fiEyesUI-textEffect7-text {
              font-size: 1.5rem;
              font-weight: bold;
              text-transform: uppercase;
              text-align: center;
              line-height: 1.2;
            }
            
            .fiEyesUI-textEffect7-text span {
              position: relative;
              color: #ffffff;
              pointer-events: none;
              animation: fiEyesUI-anim7 1s ease alternate infinite;
              animation-delay: calc(var(--delay) * 0.5);
            }
            
            @keyframes fiEyesUI-anim7 {
              0% {
                text-shadow: 0px 0px 0px #fff;
              }
              20% {
                text-shadow: 0px 0px 0px #fff;
              }
              100% {
                text-shadow: 0px 0px 50px #fff, 0px 0px 50px #fff, 0px 0px 50px #fff;
              }
            }
          `
        }} />
        <div
          ref={containerRef}
          className={`fiEyesUI-textEffect7-container ${props.className}`}
          style={{
            fontSize: props.fontSize,
            ...props.style
          }}
        >
          <div className="fiEyesUI-textEffect7-text"></div>
        </div>
      </>
    );
  }
});

export default FiEyesUITextEffect7;
