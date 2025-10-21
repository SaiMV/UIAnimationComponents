export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: EasingFunction;
  iterations?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

export type EasingFunction = 
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'cubic-bezier'
  | string;

export interface Keyframe {
  [property: string]: string | number | undefined;
  offset?: number;
}

export interface AnimationOptions {
  element: HTMLElement;
  keyframes: Keyframe[];
  config: AnimationConfig;
  onStart?: () => void;
  onEnd?: () => void;
  onIteration?: () => void;
}

export interface AnimationInstance {
  play: () => void;
  pause: () => void;
  reverse: () => void;
  finish: () => void;
  cancel: () => void;
  addEventListener: (event: string, callback: () => void) => void;
  removeEventListener: (event: string, callback: () => void) => void;
}

export interface PresetAnimation {
  name: string;
  keyframes: Keyframe[];
  defaultConfig: Partial<AnimationConfig>;
}

export type AnimationEvent = 'start' | 'end' | 'iteration' | 'cancel' | 'finish';
