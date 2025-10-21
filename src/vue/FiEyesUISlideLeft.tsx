import { defineComponent, ref, onMounted, onUnmounted, watch, PropType } from 'vue';

export interface FiEyesUISlideLeftProps {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  letterDelay?: number;
  slideDistance?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUISlideLeft = defineComponent({
  name: 'FiEyesUISlideLeft',
  props: {
    text: {
      type: String,
      default: 'Welcome To Finches Eyes UI Components'
    },
    fontSize: {
      type: String,
      default: '50px'
    },
    animationDuration: {
      type: Number,
      default: 1.5
    },
    letterDelay: {
      type: Number,
      default: 0.1
    },
    slideDistance: {
      type: Number,
      default: 200
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
  setup(props: FiEyesUISlideLeftProps, { emit }) {
    const containerRef = ref<HTMLDivElement | null>(null);
    const animationTimeout = ref<number | null>(null);

    const fiEyesUIStartSlideLeftAnimation = () => {
      if (!containerRef.value) return;

      const spans = containerRef.value.querySelectorAll('.fiEyesUI-slideLeft-span');
      
      spans.forEach((span, index) => {
        const element = span as HTMLElement;
        element.style.animationDelay = `${props.letterDelay * index}s`;
        element.style.animationDuration = `${props.animationDuration}s`;
      });

      emit('animationStart');

      if (props.repeatInterval > 0) {
        animationTimeout.value = window.setTimeout(() => {
          fiEyesUIStartSlideLeftAnimation();
        }, props.repeatInterval * 1000);
      }
    };

    const fiEyesUIStopSlideLeftAnimation = () => {
      if (animationTimeout.value) {
        clearTimeout(animationTimeout.value);
        animationTimeout.value = null;
      }
    };

    const fiEyesUIRenderText = () => {
      return props.text.split('').map((char, index) => (
        <span
          key={index}
          className="fiEyesUI-slideLeft-span"
          style={{
            animationDelay: `${props.letterDelay * index}s`,
            animationDuration: `${props.animationDuration}s`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    };

    onMounted(() => {
      if (props.autoPlay) {
        fiEyesUIStartSlideLeftAnimation();
      }
    });

    onUnmounted(() => {
      fiEyesUIStopSlideLeftAnimation();
    });

    watch(() => props.autoPlay, (newVal) => {
      if (newVal) {
        fiEyesUIStartSlideLeftAnimation();
      } else {
        fiEyesUIStopSlideLeftAnimation();
      }
    });

    return () => (
      <>
        <style dangerouslySetInnerHTML={{
          __html: `
            .fiEyesUI-slideLeft-container {
              display: flex;
              justify-content: center;
              align-content: center;
              flex-direction: column;
              height: 100%;
              width: 100%;
              background-color: #000000;
              color: #ffffff;
              font-family: 'Orbitron', sans-serif;
            }
            
            .fiEyesUI-slideLeft-title {
              text-align: center;
              text-transform: uppercase;
              font-family: 'Orbitron', sans-serif;
              font-size: ${props.fontSize};
              letter-spacing: 1px;
              color: #ffffff;
              margin: 0;
              padding: 0;
            }
            
            .fiEyesUI-slideLeft-span {
              display: inline-block;
              animation: fiEyesUI-slideLeft 1.5s forwards;
              opacity: 0;
              transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
              animation-delay: calc(0.1s * var(--i));
            }
            
            @keyframes fiEyesUI-slideLeft {
              from {
                opacity: 0;
                transform: translateX(${props.slideDistance}px);
              } 
              to {
                opacity: 1;
                transform: translateX(0%);
              }
            }
          `
        }} />
        <div
          ref={containerRef}
          className={`fiEyesUI-slideLeft-container ${props.className}`}
          style={{
            fontSize: props.fontSize,
            ...props.style
          }}
        >
          <h1 className="fiEyesUI-slideLeft-title">
            {fiEyesUIRenderText()}
          </h1>
        </div>
      </>
    );
  }
});

export default FiEyesUISlideLeft;
