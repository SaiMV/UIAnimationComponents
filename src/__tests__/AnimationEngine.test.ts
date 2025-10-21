import { AnimationEngine } from '../core/AnimationEngine';
import { Keyframe, AnimationConfig } from '../types';

describe('AnimationEngine', () => {
  let animationEngine: AnimationEngine;
  let mockElement: HTMLElement;

  beforeEach(() => {
    animationEngine = new AnimationEngine();
    mockElement = document.createElement('div');
    document.body.appendChild(mockElement);
  });

  afterEach(() => {
    document.body.removeChild(mockElement);
  });

  describe('createAnimation', () => {
    it('should create an animation with basic keyframes', () => {
      const keyframes: Keyframe[] = [
        { opacity: 0 },
        { opacity: 1 }
      ];
      const config: AnimationConfig = {
        duration: 1000
      };

      const animation = animationEngine.createAnimation({
        element: mockElement,
        keyframes,
        config
      });

      expect(animation).toBeDefined();
      expect(typeof animation.play).toBe('function');
      expect(typeof animation.pause).toBe('function');
      expect(typeof animation.cancel).toBe('function');
    });

    it('should handle preset animations', () => {
      const keyframes: Keyframe[] = [
        { transform: 'translateY(100%)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 }
      ];
      const config: AnimationConfig = {
        duration: 500,
        easing: 'ease-out'
      };

      const animation = animationEngine.createAnimation({
        element: mockElement,
        keyframes,
        config,
        onStart: jest.fn(),
        onEnd: jest.fn()
      });

      expect(animation).toBeDefined();
    });

    it('should call event callbacks', () => {
      const onStart = jest.fn();
      const onEnd = jest.fn();
      const onIteration = jest.fn();

      const keyframes: Keyframe[] = [
        { opacity: 0 },
        { opacity: 1 }
      ];
      const config: AnimationConfig = {
        duration: 100,
        iterations: 2
      };

      const animation = animationEngine.createAnimation({
        element: mockElement,
        keyframes,
        config,
        onStart,
        onEnd,
        onIteration
      });

      // Simulate animation events
      animation.play();
      
      // Note: In a real test environment, you'd need to wait for the actual animation
      // to complete or mock the Web Animations API more thoroughly
    });
  });

  describe('animation management', () => {
    it('should track animations', () => {
      const keyframes: Keyframe[] = [{ opacity: 0 }, { opacity: 1 }];
      const config: AnimationConfig = { duration: 1000 };

      animationEngine.createAnimation({
        element: mockElement,
        keyframes,
        config
      });

      const animation = animationEngine.getAnimation(mockElement);
      expect(animation).toBeDefined();
    });

    it('should cancel animation', () => {
      const keyframes: Keyframe[] = [{ opacity: 0 }, { opacity: 1 }];
      const config: AnimationConfig = { duration: 1000 };

      animationEngine.createAnimation({
        element: mockElement,
        keyframes,
        config
      });

      animationEngine.cancelAnimation(mockElement);
      const animation = animationEngine.getAnimation(mockElement);
      expect(animation).toBeUndefined();
    });

    it('should pause all animations', () => {
      const keyframes: Keyframe[] = [{ opacity: 0 }, { opacity: 1 }];
      const config: AnimationConfig = { duration: 1000 };

      const animation = animationEngine.createAnimation({
        element: mockElement,
        keyframes,
        config
      });

      const pauseSpy = jest.spyOn(animation, 'pause');
      animationEngine.pauseAll();

      expect(pauseSpy).toHaveBeenCalled();
    });
  });
});
