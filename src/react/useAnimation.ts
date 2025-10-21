import { useEffect, useRef, useCallback, useState } from 'react';
import { fiEyesUIAnimationEngine } from '../core/AnimationEngine';
import { AnimationOptions, AnimationInstance, AnimationConfig, Keyframe } from '../types';
import { getFiEyesUIPresetAnimation } from '../core/PresetAnimations';

export interface FiEyesUIUseAnimationOptions {
  keyframes?: Keyframe[];
  config?: Partial<AnimationConfig>;
  preset?: string;
  autoPlay?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onIteration?: () => void;
}

export interface FiEyesUIUseAnimationReturn {
  ref: React.RefObject<HTMLElement>;
  play: () => void;
  pause: () => void;
  reverse: () => void;
  finish: () => void;
  cancel: () => void;
  isPlaying: boolean;
  isPaused: boolean;
  isFinished: boolean;
}

export const useFiEyesUIAnimation = (options: FiEyesUIUseAnimationOptions = {}): FiEyesUIUseAnimationReturn => {
  const {
    keyframes = [],
    config = {},
    preset,
    autoPlay = false,
    onStart,
    onEnd,
    onIteration,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const animationRef = useRef<AnimationInstance | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const createAnimation = useCallback(() => {
    if (!ref.current) return;

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
      element: ref.current,
      keyframes: finalKeyframes,
      config: finalConfig as AnimationConfig,
      onStart: () => {
        setIsPlaying(true);
        setIsPaused(false);
        setIsFinished(false);
        onStart?.();
      },
      onEnd: () => {
        setIsPlaying(false);
        setIsPaused(false);
        setIsFinished(true);
        onEnd?.();
      },
      onIteration: () => {
        onIteration?.();
      },
    };

    fiEyesUIAnimationRef.current = fiEyesUIAnimationEngine.createAnimation(animationOptions);
  }, [keyframes, config, preset, onStart, onEnd, onIteration]);

  const play = useCallback(() => {
    if (fiEyesUIAnimationRef.current) {
      fiEyesUIAnimationRef.current.play();
    } else {
      createAnimation();
      if (fiEyesUIAnimationRef.current) {
        fiEyesUIAnimationRef.current.play();
      }
    }
  }, [createAnimation]);

  const pause = useCallback(() => {
    fiEyesUIAnimationRef.current?.pause();
    setIsPlaying(false);
    setIsPaused(true);
  }, []);

  const reverse = useCallback(() => {
    fiEyesUIAnimationRef.current?.reverse();
  }, []);

  const finish = useCallback(() => {
    fiEyesUIAnimationRef.current?.finish();
    setIsPlaying(false);
    setIsPaused(false);
    setIsFinished(true);
  }, []);

  const cancel = useCallback(() => {
    fiEyesUIAnimationRef.current?.cancel();
    fiEyesUIAnimationRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
    setIsFinished(false);
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (autoPlay && ref.current) {
      createAnimation();
      play();
    }
  }, [autoPlay, createAnimation, play]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ref.current) {
        fiEyesUIAnimationEngine.cancelAnimation(ref.current);
      }
    };
  }, []);

  return {
    ref,
    play,
    pause,
    reverse,
    finish,
    cancel,
    isPlaying,
    isPaused,
    isFinished,
  };
};
