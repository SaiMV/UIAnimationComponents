import { AnimationOptions, AnimationInstance, AnimationEvent, Keyframe, AnimationConfig } from '../types';

export type { AnimationOptions, AnimationInstance, AnimationEvent, Keyframe, AnimationConfig };

export class FiEyesUIAnimationEngine {
  private animations: Map<HTMLElement, Animation> = new Map();

  createAnimation(options: AnimationOptions): AnimationInstance {
    const { element, keyframes, config, onStart, onEnd, onIteration } = options;
    
    // Convert keyframes to the format expected by Web Animations API
    const processedKeyframes = this.processKeyframes(keyframes);
    
    const animation = element.animate(processedKeyframes, {
      duration: config.duration,
      delay: config.delay || 0,
      easing: config.easing || 'ease',
      iterations: config.iterations === 'infinite' ? Infinity : (config.iterations || 1),
      direction: config.direction || 'normal',
      fill: config.fillMode || 'both',
    });

    this.animations.set(element, animation);

    // Set up event listeners
    if (onStart) {
      animation.addEventListener('start', onStart);
    }
    if (onEnd) {
      animation.addEventListener('finish', onEnd);
    }
    if (onIteration) {
      animation.addEventListener('iteration', onIteration);
    }

    return {
      play: () => animation.play(),
      pause: () => animation.pause(),
      reverse: () => animation.reverse(),
      finish: () => animation.finish(),
      cancel: () => {
        animation.cancel();
        this.animations.delete(element);
      },
      addEventListener: (event: string, callback: () => void) => {
        animation.addEventListener(event, callback);
      },
      removeEventListener: (event: string, callback: () => void) => {
        animation.removeEventListener(event, callback);
      },
    };
  }

  private processKeyframes(keyframes: Keyframe[]): Keyframe[] {
    return keyframes.map(keyframe => {
      const processed: Keyframe = {};
      
      for (const [property, value] of Object.entries(keyframe)) {
        if (property === 'offset') {
          processed.offset = value as number;
        } else {
          processed[property] = value;
        }
      }
      
      return processed;
    });
  }

  getAnimation(element: HTMLElement): Animation | undefined {
    return this.animations.get(element);
  }

  pauseAll(): void {
    this.animations.forEach(animation => animation.pause());
  }

  resumeAll(): void {
    this.animations.forEach(animation => animation.play());
  }

  cancelAll(): void {
    this.animations.forEach(animation => animation.cancel());
    this.animations.clear();
  }

  cancelAnimation(element: HTMLElement): void {
    const animation = this.animations.get(element);
    if (animation) {
      animation.cancel();
      this.animations.delete(element);
    }
  }
}

export const fiEyesUIAnimationEngine = new FiEyesUIAnimationEngine();
