import { defineComponent, ref, onMounted, onUnmounted, watch, PropType } from 'vue';

export interface FiEyesUIWavyTextProps {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  waveHeight?: number;
  delayMultiplier?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUIWavyText = defineComponent({
  name: 'FiEyesUIWavyText',
  props: {
    text: {
      type: String,
      default: 'Welcome To Finches Eyes UI Components'
    },
    fontSize: {
      type: String,
      default: '2em'
    },
    animationDuration: {
      type: Number,
      default: 1.5
    },
    waveHeight: {
      type: Number,
      default: 20
    },
    delayMultiplier: {
      type: Number,
      default: 0.1
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
  setup(props: FiEyesUIWavyTextProps, { emit }) {
    const containerRef = ref<HTMLDivElement | null>(null);
    const animationTimeout = ref<number | null>(null);

    const fiEyesUIStartWavyAnimation = () => {
      if (!containerRef.value) return;

      const spans = containerRef.value.querySelectorAll('.fiEyesUI-wavy-text-span');
      
      spans.forEach((span, index) => {
        const element = span as HTMLElement;
        element.style.setProperty('--i', index.toString());
        element.style.animationDelay = `${props.delayMultiplier * index}s`;
        element.style.animationDuration = `${props.animationDuration}s`;
      });

      emit('animationStart');

      if (props.repeatInterval > 0) {
        animationTimeout.value = window.setTimeout(() => {
          fiEyesUIStartWavyAnimation();
        }, props.repeatInterval * 1000);
      }
    };

    const fiEyesUIStopWavyAnimation = () => {
      if (animationTimeout.value) {
        clearTimeout(animationTimeout.value);
        animationTimeout.value = null;
      }
    };

    const fiEyesUIRenderText = () => {
      return props.text.split('').map((char, index) => (
        <span
          key={index}
          className="fiEyesUI-wavy-text-span"
          style={{
            '--i': index,
            animationDelay: `${props.delayMultiplier * index}s`,
            animationDuration: `${props.animationDuration}s`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    };

    onMounted(() => {
      if (props.autoPlay) {
        fiEyesUIStartWavyAnimation();
      }
    });

    onUnmounted(() => {
      fiEyesUIStopWavyAnimation();
    });

    watch(() => props.autoPlay, (newVal) => {
      if (newVal) {
        fiEyesUIStartWavyAnimation();
      } else {
        fiEyesUIStopWavyAnimation();
      }
    });

    return () => (
      <>
        <style dangerouslySetInnerHTML={{
          __html: `
            .fiEyesUI-wavy-text-container {
              position: relative;
              display: inline-block;
              background-color: #000000;
              color: #ffffff;
              font-family: 'Orbitron', sans-serif;
              font-size: ${props.fontSize};
              text-transform: uppercase;
              letter-spacing: 0.1em;
            }
            
            .fiEyesUI-wavy-text-span {
              position: relative;
              display: inline-block;
              color: #ffffff;
              animation: fiEyesUI-wavy-animate ${props.animationDuration}s ease-in-out infinite;
              animation-delay: calc(${props.delayMultiplier}s * var(--i));
            }
            
            @keyframes fiEyesUI-wavy-animate {
              0%, 100% {
                transform: translateY(0px);
              }
              20% {
                transform: translateY(-${props.waveHeight}px);
              }
              40% {
                transform: translateY(0px);
              }
            }
          `
        }} />
        <div
          ref={containerRef}
          className={`fiEyesUI-wavy-text-container ${props.className}`}
          style={{
            fontSize: props.fontSize,
            ...props.style
          }}
        >
          {fiEyesUIRenderText()}
        </div>
      </>
    );
  }
});

export default FiEyesUIWavyText;
