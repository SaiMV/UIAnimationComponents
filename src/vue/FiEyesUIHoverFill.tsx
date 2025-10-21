import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue';

export interface FiEyesUIHoverFillProps {
  text?: string;
  fontSize?: string;
  color?: string;
  hoverColor?: string;
  className?: string;
  style?: Record<string, any>;
}

export const FiEyesUIHoverFill = defineComponent({
  name: 'FiEyesUIHoverFill',
  props: {
    text: {
      type: String,
      default: 'Welcome To Finches Eyes UI Components'
    },
    fontSize: {
      type: String,
      default: '24px'
    },
    color: {
      type: String,
      default: '#ffffff'
    },
    hoverColor: {
      type: String,
      default: '#ffffff'
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
  emits: ['click'],
  setup(props, { emit }) {
    const hoverFillContainerRef = ref<HTMLDivElement>();
    const fiEyesUIStyleElement = ref<HTMLStyleElement>();

    const fiEyesUICreateStyles = () => {
      const fiEyesUIStyleId = 'fiEyesUI-hoverFill-styles';
      const fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
      
      if (fiEyesUIExistingStyle) {
        fiEyesUIExistingStyle.remove();
      }
      
      fiEyesUIStyleElement.value = document.createElement('style');
      fiEyesUIStyleElement.value.id = fiEyesUIStyleId;
      fiEyesUIStyleElement.value.textContent = `
        .fiEyesUI-hoverFill-container {
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
        
        .fiEyesUI-hoverFill-link {
          color: ${props.color};
          position: relative;
          display: inline-block;
          text-decoration: none;
          font-size: ${props.fontSize};
          font-family: 'Orbitron', sans-serif;
          transition: color 0.3s;
          overflow: hidden;
          cursor: pointer;
        }
        
        .fiEyesUI-hoverFill-link-layer {
          position: absolute;
          left: 0;
          top: 0;
          height: inherit;
          overflow: hidden;
          transform: translate3d(-100%, 0, 0);
          animation: fiEyesUI-hoverFill-out-layer 0.3s ease-out;
        }
        
        .fiEyesUI-hoverFill-link-layer:before {
          content: attr(data-text);
          transform: translate3d(100%, 0, 0);
          color: ${props.hoverColor};
          animation: fiEyesUI-hoverFill-out-text 0.3s ease-out;
          display: block;
          backface-visibility: hidden;
        }
        
        .fiEyesUI-hoverFill-link:hover .fiEyesUI-hoverFill-link-layer {
          animation: fiEyesUI-hoverFill-in-layer 0.3s ease forwards;
        }
        
        .fiEyesUI-hoverFill-link:hover .fiEyesUI-hoverFill-link-layer:before {
          animation: fiEyesUI-hoverFill-in-text 0.3s ease forwards;
        }
        
        @keyframes fiEyesUI-hoverFill-in-text {
          0% {
            transform: translate3d(100%, 0, 0);
          }
          to {
            transform: translateZ(0);
          }
        }
        
        @keyframes fiEyesUI-hoverFill-in-layer {
          0% {
            transform: translate3d(-100%, 0, 0);
          }
          to {
            transform: translateZ(0);
          }
        }
        
        @keyframes fiEyesUI-hoverFill-out-text {
          0% {
            transform: translateZ(0);
          }
          to {
            transform: translate3d(-100%, 0, 0);
          }
        }
        
        @keyframes fiEyesUI-hoverFill-out-layer {
          0% {
            transform: translateZ(0);
          }
          to {
            transform: translate3d(100%, 0, 0);
          }
        }
      `;
      
      document.head.appendChild(fiEyesUIStyleElement.value);
    };

    const fiEyesUICleanup = () => {
      if (fiEyesUIStyleElement.value) {
        fiEyesUIStyleElement.value.remove();
      }
    };

    const handleClick = (event: Event) => {
      event.preventDefault();
      emit('click');
    };

    onMounted(() => {
      // Create styles dynamically
      fiEyesUICreateStyles();
    });

    onUnmounted(() => {
      fiEyesUICleanup();
    });

    return () => (
      <div 
        ref={hoverFillContainerRef}
        class={`fiEyesUI-hoverFill-container ${props.className}`}
        style={props.style}
      >
        <a 
          href="#" 
          class="fiEyesUI-hoverFill-link"
          onClick={handleClick}
        >
          {props.text}
          <span 
            class="fiEyesUI-hoverFill-link-layer" 
            data-text={props.text}
          ></span>
        </a>
      </div>
    );
  }
});
