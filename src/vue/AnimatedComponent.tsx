import { defineComponent, computed, ref, onMounted, onUnmounted } from 'vue';
import { useFiEyesUIVueAnimation, FiEyesUIVueAnimationOptions } from './useAnimation';
import { Keyframe, AnimationConfig } from '../types';

interface FiEyesUIProps extends FiEyesUIVueAnimationOptions {
  tag?: string;
  className?: string;
  style?: Record<string, any>;
  trigger?: 'click' | 'hover' | 'focus' | 'manual';
}

export const FiEyesUIAnimatedComponent = defineComponent({
  name: 'FiEyesUIAnimatedComponent',
  props: {
    keyframes: {
      type: Array as () => Keyframe[],
      default: () => []
    },
    config: {
      type: Object as () => Partial<AnimationConfig>,
      default: () => ({})
    },
    preset: {
      type: String,
      default: undefined
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    className: {
      type: String,
      default: undefined
    },
    style: {
      type: Object as () => Record<string, any>,
      default: () => ({})
    },
    trigger: {
      type: String as () => 'click' | 'hover' | 'focus' | 'manual',
      default: 'manual'
    },
    onStart: {
      type: Function as () => (() => void) | undefined,
      default: undefined
    },
    onEnd: {
      type: Function as () => (() => void) | undefined,
      default: undefined
    },
    onIteration: {
      type: Function as () => (() => void) | undefined,
      default: undefined
    }
  },
  emits: ['start', 'end', 'iteration'],
  setup(props, { emit, slots }) {
    const animation = useFiEyesUIVueAnimation({
      keyframes: props.keyframes,
      config: props.config,
      preset: props.preset,
      autoPlay: props.autoPlay,
      onStart: () => {
        emit('start');
        props.onStart?.();
      },
      onEnd: () => {
        emit('end');
        props.onEnd?.();
      },
      onIteration: () => {
        emit('iteration');
        props.onIteration?.();
      },
    });

    const handleClick = () => {
      if (props.trigger === 'click') {
        animation.play();
      }
    };

    const handleMouseEnter = () => {
      if (props.trigger === 'hover') {
        animation.play();
      }
    };

    const handleFocus = () => {
      if (props.trigger === 'focus') {
        animation.play();
      }
    };

    // Expose animation methods to parent
    const exposedMethods = {
      play: animation.play,
      pause: animation.pause,
      reverse: animation.reverse,
      finish: animation.finish,
      cancel: animation.cancel,
      isPlaying: animation.isPlaying,
      isPaused: animation.isPaused,
      isFinished: animation.isFinished,
    };

    return {
      elementRef: animation.elementRef,
      handleClick,
      handleMouseEnter,
      handleFocus,
      ...exposedMethods
    };
  },
  render() {
    const Tag = this.tag as any;
    
    return (
      <Tag
        ref={this.elementRef}
        class={this.className}
        style={this.style}
        onClick={this.handleClick}
        onMouseenter={this.handleMouseEnter}
        onFocus={this.handleFocus}
      >
        {this.$slots.default?.()}
      </Tag>
    );
  }
});
