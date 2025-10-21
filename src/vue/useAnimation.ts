import { ref, onMounted, onUnmounted, Ref } from 'vue';
import { fiEyesUIAnimationEngine } from '../core/AnimationEngine';
import { AnimationOptions, AnimationInstance, AnimationConfig, Keyframe } from '../types';
import { getFiEyesUIPresetAnimation } from '../core/PresetAnimations';

export interface FiEyesUIVueAnimationOptions {
  keyframes?: Keyframe[];
  config?: Partial<AnimationConfig>;
  preset?: string;
  autoPlay?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onIteration?: () => void;
}

export interface FiEyesUIVueAnimationReturn {
  elementRef: Ref<HTMLElement | null>;
  play: () => void;
  pause: () => void;
  reverse: () => void;
  finish: () => void;
  cancel: () => void;
  isPlaying: Ref<boolean>;
  isPaused: Ref<boolean>;
  isFinished: Ref<boolean>;
}

export function useFiEyesUIVueAnimation(options: FiEyesUIVueAnimationOptions = {}): FiEyesUIVueAnimationReturn {
  const {
    keyframes = [],
    config = {},
    preset,
    autoPlay = false,
    onStart,
    onEnd,
    onIteration,
  } = options;

  const elementRef = ref<HTMLElement | null>(null);
  const animationRef = ref<AnimationInstance | null>(null);
  const isPlaying = ref(false);
  const isPaused = ref(false);
  const isFinished = ref(false);

  const createAnimation = () => {
    if (!elementRef.value) return;

    let finalKeyframes = keyframes;
    let finalConfig = { ...config };

    // Use preset if provided
    if (preset) {
      const presetAnimation = getFiEyesUIPresetAnimation(preset);
      if (presetAnimation) {
        finalKeyframes = presetAnimation.keyframes;
        finalConfig = { ...presetAnimation.defaultConfig, ...config };
      }
    }

    if (finalKeyframes.length === 0) return;

    const animationOptions: AnimationOptions = {
      element: elementRef.value,
      keyframes: finalKeyframes,
      config: finalConfig as AnimationConfig,
      onStart: () => {
        isPlaying.value = true;
        isPaused.value = false;
        isFinished.value = false;
        onStart?.();
      },
      onEnd: () => {
        isPlaying.value = false;
        isPaused.value = false;
        isFinished.value = true;
        onEnd?.();
      },
      onIteration: () => {
        onIteration?.();
      },
    };

    animationRef.value = fiEyesUIAnimationEngine.createAnimation(animationOptions);
  };

  const play = () => {
    if (animationRef.value) {
      animationRef.value.play();
    } else {
      createAnimation();
      if (animationRef.value) {
        animationRef.value.play();
      }
    }
  };

  const pause = () => {
    animationRef.value?.pause();
    isPlaying.value = false;
    isPaused.value = true;
  };

  const reverse = () => {
    animationRef.value?.reverse();
  };

  const finish = () => {
    animationRef.value?.finish();
    isPlaying.value = false;
    isPaused.value = false;
    isFinished.value = true;
  };

  const cancel = () => {
    animationRef.value?.cancel();
    animationRef.value = null;
    isPlaying.value = false;
    isPaused.value = false;
    isFinished.value = false;
  };

  onMounted(() => {
    if (autoPlay) {
      createAnimation();
      play();
    }
  });

  onUnmounted(() => {
      if (elementRef.value) {
        fiEyesUIAnimationEngine.cancelAnimation(elementRef.value);
      }
  });

  return {
    elementRef,
    play,
    pause,
    reverse,
    finish,
    cancel,
    isPlaying,
    isPaused,
    isFinished,
  };
}
