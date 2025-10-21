import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUIFlyInOutProps {
  text?: string;
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  animationSpeed?: number;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUIFlyInOut = defineComponent({
  name: 'FiEyesUIFlyInOut',
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
    animationDuration: {
      type: Number,
      default: 4
    },
    animationSpeed: {
      type: Number,
      default: 100
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
    const flyInOutContainerRef = ref<HTMLDivElement>();
    const flyInOutTyperRef = ref<HTMLParagraphElement>();
    const fiEyesUIAnimationTimeout = ref<number>();

    const fiEyesUIInitializeAnimation = () => {
      if (!flyInOutTyperRef.value) return;

      const fiEyesUIParagraph = flyInOutTyperRef.value;
      const fiEyesUIText = props.text;
      const fiEyesUICharacters = fiEyesUIText.length;
      let fiEyesUINewText = '';

      // Wrap each character in <i> tags
      for (let i = 0; i < fiEyesUICharacters; i += 1) {
        fiEyesUINewText += '<i>' + fiEyesUIText.charAt(i) + '</i>';
      }

      fiEyesUIParagraph.innerHTML = fiEyesUINewText;

      const fiEyesUIWrappedChars = fiEyesUIParagraph.getElementsByTagName('i');
      const fiEyesUIWrappedCharsLen = fiEyesUIWrappedChars.length;
      let j = 0;

      const fiEyesUIAddEffect = () => {
        fiEyesUIAnimationTimeout.value = window.setTimeout(() => {
          fiEyesUIWrappedChars[j].className = 'fiEyesUIFlyInOut';
          j += 1;
          if (j < fiEyesUIWrappedCharsLen) {
            fiEyesUIAddEffect();
          } else {
            // Animation completed
            setTimeout(() => {
              emit('complete');
            }, props.animationDuration * 1000);
          }
        }, props.animationSpeed);
      };

      fiEyesUIAddEffect();
    };

    const fiEyesUICleanup = () => {
      if (fiEyesUIAnimationTimeout.value) {
        clearTimeout(fiEyesUIAnimationTimeout.value);
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
        ref={flyInOutContainerRef}
        class={`fiEyesUI-flyInOut-container ${props.className}`}
        style={{
          fontFamily: "'Orbitron', sans-serif",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
          display: "table",
          width: "100%",
          backgroundColor: "#000000",
          color: "#ffffff",
          padding: "20px",
          minHeight: "120px",
          ...props.style
        }}
      >
        <div class="fiEyesUI-flyInOut-content">
          <p 
            ref={flyInOutTyperRef}
            class="fiEyesUI-flyInOut-typer"
            style={{
              display: "table",
              textAlign: "center",
              verticalAlign: "middle",
              margin: "0 auto",
              padding: "15% 0",
              fontSize: props.fontSize,
              lineHeight: "3em",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: props.color
            }}
          >
            {props.text}
          </p>
        </div>
        <style dangerouslySetInnerHTML={{
          __html: `
            .fiEyesUI-flyInOut-content {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
            }

            .fiEyesUI-flyInOut-typer i {
              display: inline-block;
              font-style: normal;
              padding: 0 0.25em;
              transform: scale(0);
              transition: all 1s ease;
            }

            .fiEyesUI-flyInOut-typer i.fiEyesUIFlyInOut {
              color: ${props.color};
              animation: fiEyesUIFlyInOut ${props.animationDuration}s infinite ease-in-out;
            }

            @keyframes fiEyesUIFlyInOut {
              0% {
                transform: scaleY(-3) translate3d(0, -300%, 0);
              }
              15%, 45% {
                color: rgba(255, 255, 255, 0.8);
                transform: scaleZ(1) translate3d(0, 10%, 0);
              }
              100% {
                color: rgba(236, 243, 186, 0.2);
                transform: scale3d(9);
              }
            }
          `
        }} />
      </div>
    );
  }
});
