import { Injectable, ElementRef } from '@angular/core';
import { FiEyesUIAnimationEngine, AnimationInstance, AnimationOptions } from '../core/AnimationEngine';

@Injectable({
  providedIn: 'root'
})
export class FiEyesUIAnimationService {
  private fiEyesUIAnimationEngine = new FiEyesUIAnimationEngine();
  private animations = new Map<ElementRef<HTMLElement>, AnimationInstance>();

  createAnimation(elementRef: ElementRef<HTMLElement>, options: AnimationOptions): AnimationInstance {
    const animation = this.fiEyesUIAnimationEngine.createAnimation({
      element: elementRef.nativeElement,
      keyframes: options.keyframes,
      config: options.config,
      onStart: options.onStart,
      onEnd: options.onEnd,
      onIteration: options.onIteration
    });
    this.animations.set(elementRef, animation);
    return animation;
  }

  play(elementRef: ElementRef<HTMLElement>): void {
    const animation = this.animations.get(elementRef);
    if (animation) {
      animation.play();
    }
  }

  pause(elementRef: ElementRef<HTMLElement>): void {
    const animation = this.animations.get(elementRef);
    if (animation) {
      animation.pause();
    }
  }

  reverse(elementRef: ElementRef<HTMLElement>): void {
    const animation = this.animations.get(elementRef);
    if (animation) {
      animation.reverse();
    }
  }

  finish(elementRef: ElementRef<HTMLElement>): void {
    const animation = this.animations.get(elementRef);
    if (animation) {
      animation.finish();
    }
  }

  cancel(elementRef: ElementRef<HTMLElement>): void {
    const animation = this.animations.get(elementRef);
    if (animation) {
      animation.cancel();
      this.animations.delete(elementRef);
    }
  }

  getAnimation(elementRef: ElementRef<HTMLElement>): AnimationInstance | undefined {
    return this.animations.get(elementRef);
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
}