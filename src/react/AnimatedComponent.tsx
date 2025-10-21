import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useFiEyesUIAnimation, FiEyesUIUseAnimationOptions, FiEyesUIUseAnimationReturn } from './useAnimation';

export interface FiEyesUIAnimatedComponentProps extends FiEyesUIUseAnimationOptions {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

export interface FiEyesUIAnimatedComponentRef {
  play: () => void;
  pause: () => void;
  reverse: () => void;
  finish: () => void;
  cancel: () => void;
  isPlaying: boolean;
  isPaused: boolean;
  isFinished: boolean;
}

export const FiEyesUIAnimatedComponent = forwardRef<FiEyesUIAnimatedComponentRef, FiEyesUIAnimatedComponentProps>(
  ({ children, className, style, as: Component = 'div', ...animationOptions }, ref) => {
    const animation = useFiEyesUIAnimation(animationOptions);
    const elementRef = useRef<HTMLElement>(null);

    useImperativeHandle(ref, () => ({
      play: animation.play,
      pause: animation.pause,
      reverse: animation.reverse,
      finish: animation.finish,
      cancel: animation.cancel,
      isPlaying: animation.isPlaying,
      isPaused: animation.isPaused,
      isFinished: animation.isFinished,
    }), [animation]);

    // Merge refs
        const combinedRef = (node: HTMLElement | null) => {
          if (elementRef.current !== node) {
            elementRef.current = node;
          }
          if (typeof animation.ref === 'object' && animation.ref) {
            const ref = animation.ref as React.MutableRefObject<HTMLElement | null>;
            if (ref.current !== node) {
              ref.current = node;
            }
          }
        };

    return React.createElement(
      Component,
      {
        ref: combinedRef,
        className,
        style,
      },
      children
    );
  }
);

FiEyesUIAnimatedComponent.displayName = 'FiEyesUIAnimatedComponent';
