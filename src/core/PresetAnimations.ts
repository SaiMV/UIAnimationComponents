import { PresetAnimation } from '../types';

export const fiEyesUIPresetAnimations: PresetAnimation[] = [
  {
    name: 'fadeIn',
    keyframes: [
      { opacity: 0 },
      { opacity: 1 }
    ],
    defaultConfig: {
      duration: 300,
      easing: 'ease-out'
    }
  },
  {
    name: 'fadeOut',
    keyframes: [
      { opacity: 1 },
      { opacity: 0 }
    ],
    defaultConfig: {
      duration: 300,
      easing: 'ease-in'
    }
  },
  {
    name: 'slideInUp',
    keyframes: [
      { transform: 'translateY(100%)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ],
    defaultConfig: {
      duration: 400,
      easing: 'ease-out'
    }
  },
  {
    name: 'slideInDown',
    keyframes: [
      { transform: 'translateY(-100%)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ],
    defaultConfig: {
      duration: 400,
      easing: 'ease-out'
    }
  },
  {
    name: 'slideInLeft',
    keyframes: [
      { transform: 'translateX(-100%)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 }
    ],
    defaultConfig: {
      duration: 400,
      easing: 'ease-out'
    }
  },
  {
    name: 'slideInRight',
    keyframes: [
      { transform: 'translateX(100%)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 }
    ],
    defaultConfig: {
      duration: 400,
      easing: 'ease-out'
    }
  },
  {
    name: 'zoomIn',
    keyframes: [
      { transform: 'scale(0)', opacity: 0 },
      { transform: 'scale(1)', opacity: 1 }
    ],
    defaultConfig: {
      duration: 300,
      easing: 'ease-out'
    }
  },
  {
    name: 'zoomOut',
    keyframes: [
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(0)', opacity: 0 }
    ],
    defaultConfig: {
      duration: 300,
      easing: 'ease-in'
    }
  },
  {
    name: 'bounce',
    keyframes: [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-30px)' },
      { transform: 'translateY(0)' },
      { transform: 'translateY(-15px)' },
      { transform: 'translateY(0)' },
      { transform: 'translateY(-5px)' },
      { transform: 'translateY(0)' }
    ],
    defaultConfig: {
      duration: 1000,
      easing: 'ease-out'
    }
  },
  {
    name: 'shake',
    keyframes: [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(0)' }
    ],
    defaultConfig: {
      duration: 500,
      easing: 'ease-in-out'
    }
  },
  {
    name: 'pulse',
    keyframes: [
      { transform: 'scale(1)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' }
    ],
    defaultConfig: {
      duration: 1000,
      iterations: 'infinite',
      easing: 'ease-in-out'
    }
  },
  {
    name: 'rotate',
    keyframes: [
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(360deg)' }
    ],
    defaultConfig: {
      duration: 1000,
      iterations: 'infinite',
      easing: 'linear'
    }
  }
];

export const getFiEyesUIPresetAnimation = (name: string): PresetAnimation | undefined => {
  return fiEyesUIPresetAnimations.find(animation => animation.name === name);
};
