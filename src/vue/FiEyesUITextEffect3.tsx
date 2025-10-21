import { defineComponent, ref, onMounted, onUnmounted, watch, PropType } from 'vue';

export interface FiEyesUITextEffect3Props {
  text?: string;
  fontSize?: string;
  autoPlay?: boolean;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUITextEffect3 = defineComponent({
  name: 'FiEyesUITextEffect3',
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
  setup(props: FiEyesUITextEffect3Props, { emit }) {
    const containerRef = ref<HTMLDivElement | null>(null);

    const fiEyesUIInitializeTextEffect3 = () => {
      if (!containerRef.value) return;

      const container = containerRef.value;
      const textElement = container.querySelector('.fiEyesUI-textEffect3-text');
      
      if (textElement) {
        textElement.innerHTML = '';
        const letters = props.text.split('');
        
        letters.forEach((letter, index) => {
          const span = document.createElement('span');
          span.textContent = letter === ' ' ? '\u00A0' : letter;
          textElement.appendChild(span);
        });
      }

      emit('animationStart');
    };

    onMounted(() => {
      fiEyesUIInitializeTextEffect3();
    });

    return () => (
      <>
        <style dangerouslySetInnerHTML={{
          __html: `
            .fiEyesUI-textEffect3-container {
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
            
            .fiEyesUI-textEffect3-text {
              font-size: 1.5rem;
              font-weight: bold;
              text-transform: uppercase;
              text-align: center;
              line-height: 1.2;
            }
            
            .fiEyesUI-textEffect3-text span {
              background: linear-gradient(90deg, rgba(249,249,249,1) 50%, rgba(2,0,36,0) 50%);
              background-size: 250%;
              animation: fiEyesUI-anim3 linear both;
              animation-timeline: view();
              animation-range: entry 50% cover 50%;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-weight: bold;
              color: #000000;
            }
            
            @keyframes fiEyesUI-anim3 {
              0% {
                background-position: 100%;
              }
              100% {
                background-position: 0%;
              }
            }
          `
        }} />
        <div
          ref={containerRef}
          className={`fiEyesUI-textEffect3-container ${props.className}`}
          style={{
            fontSize: props.fontSize,
            ...props.style
          }}
        >
          <div className="fiEyesUI-textEffect3-text"></div>
        </div>
      </>
    );
  }
});

export default FiEyesUITextEffect3;
