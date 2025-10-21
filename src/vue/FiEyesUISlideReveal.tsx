import { defineComponent, ref, onMounted, onUnmounted, watch, PropType } from 'vue';

export interface FiEyesUISlideRevealProps {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  letterSpacing?: string;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUISlideReveal = defineComponent({
  name: 'FiEyesUISlideReveal',
  props: {
    text: {
      type: String,
      default: 'Welcome To Finches Eyes UI Components'
    },
    fontSize: {
      type: String,
      default: '25px'
    },
    animationDuration: {
      type: Number,
      default: 1.1
    },
    letterSpacing: {
      type: String,
      default: '3px'
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
  setup(props: FiEyesUISlideRevealProps, { emit }) {
    const containerRef = ref<HTMLDivElement | null>(null);
    const animationTimeout = ref<number | null>(null);

    const fiEyesUIStartSlideRevealAnimation = () => {
      if (!containerRef.value) return;

      const textElement = containerRef.value.querySelector('.fiEyesUI-slideReveal-text');
      
      if (textElement) {
        // Reset animation
        textElement.classList.remove('fiEyesUI-slideReveal-animate');
        
        // Trigger animation
        setTimeout(() => {
          textElement.classList.add('fiEyesUI-slideReveal-animate');
        }, 10);
      }

      emit('animationStart');

      if (props.repeatInterval > 0) {
        animationTimeout.value = window.setTimeout(() => {
          fiEyesUIStartSlideRevealAnimation();
        }, props.repeatInterval * 1000);
      }
    };

    const fiEyesUIStopSlideRevealAnimation = () => {
      if (animationTimeout.value) {
        clearTimeout(animationTimeout.value);
        animationTimeout.value = null;
      }
    };

    onMounted(() => {
      if (props.autoPlay) {
        fiEyesUIStartSlideRevealAnimation();
      }
    });

    onUnmounted(() => {
      fiEyesUIStopSlideRevealAnimation();
    });

    watch(() => props.autoPlay, (newVal) => {
      if (newVal) {
        fiEyesUIStartSlideRevealAnimation();
      } else {
        fiEyesUIStopSlideRevealAnimation();
      }
    });

    return () => (
      <>
        <style dangerouslySetInnerHTML={{
          __html: `
            .fiEyesUI-slideReveal-container {
              display: flex;
              justify-content: center;
              align-items: center;
              font-family: 'Orbitron', sans-serif;
              background-color: #000000;
              color: #ffffff;
              height: 100%;
              font-size: ${props.fontSize};
              position: relative;
            }
            
            .fiEyesUI-slideReveal-title {
              position: relative;
              letter-spacing: ${props.letterSpacing};
              font-weight: 300;
              text-transform: uppercase;
              padding-right: 30px;
              overflow: hidden;
            }
            
            .fiEyesUI-slideReveal-text {
              margin: 0 auto;
              white-space: nowrap;
              transform: translateX(calc(100% + 30px));
              animation: fiEyesUI-leftSlide ${props.animationDuration}s cubic-bezier(0.68, -0.55, 0.265, 1.10) forwards;
            }
            
            .fiEyesUI-slideReveal-title::before {
              content: "";
              position: absolute;
              right: 0;
              height: 100%;
              background: #000000;
              animation: fiEyesUI-hiddingSlide ${props.animationDuration}s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
              z-index: 10;
            }
            
            .fiEyesUI-slideReveal-title::after {
              content: "";
              position: absolute;
              background: #ffffff;
              width: 75px;
              margin: auto 0;
              top: 5px;
              bottom: 0;
              height: 70%;
              animation: fiEyesUI-rightSlide ${props.animationDuration}s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
            }
            
            @keyframes fiEyesUI-leftSlide {
              0% {
                transform: translateX(calc(100% + 30px));
              }
              100% {
                transform: translateX(0%);
              }
            }
            
            @keyframes fiEyesUI-rightSlide {
              0% {
                right: 100%;
                width: 70px;
              }
              100% {
                opacity: 1;
                right: 0%;
                width: 24px;
              }
            }
            
            @keyframes fiEyesUI-hiddingSlide {
              0% {
                width: 100%;
              }
              100% {
                width: 0%;
              }
            }
          `
        }} />
        <div
          ref={containerRef}
          className={`fiEyesUI-slideReveal-container ${props.className}`}
          style={{
            fontSize: props.fontSize,
            ...props.style
          }}
        >
          <h1 className="fiEyesUI-slideReveal-title">
            <div className="fiEyesUI-slideReveal-text">
              {props.text}
            </div>
          </h1>
        </div>
      </>
    );
  }
});

export default FiEyesUISlideReveal;
