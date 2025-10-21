import { Directive, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FiEyesUIAnimationService, FiEyesUIAngularAnimationOptions } from './animation.service';
import { AnimationInstance, Keyframe, AnimationConfig } from '../types';

@Directive({
  selector: '[fiEyesUIAnimate]',
  exportAs: 'fiEyesUIAnimate'
})
export class FiEyesUIAnimationDirective implements OnInit, OnDestroy {
  @Input() fiEyesUIKeyframes?: Keyframe[];
  @Input() fiEyesUIConfig?: Partial<AnimationConfig>;
  @Input() fiEyesUIPreset?: string;
  @Input() fiEyesUIAutoPlay = false;
  @Input() fiEyesUITrigger?: 'click' | 'hover' | 'focus' | 'manual';

  @Output() animationStart = new EventEmitter<void>();
  @Output() animationEnd = new EventEmitter<void>();
  @Output() animationIteration = new EventEmitter<void>();

  private animation?: AnimationInstance;
  private isPlaying = false;
  private isPaused = false;
  private isFinished = false;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private fiEyesUIAnimationService: FiEyesUIAnimationService
  ) {}

  ngOnInit(): void {
    this.createAnimation();
    
    if (this.fiEyesUIAutoPlay) {
      this.play();
    }
  }

  ngOnDestroy(): void {
    this.fiEyesUIAnimationService.cancel(this.elementRef);
  }

  private createAnimation(): void {
    const options: FiEyesUIAngularAnimationOptions = {
      keyframes: this.fiEyesUIKeyframes,
      config: this.fiEyesUIConfig,
      preset: this.fiEyesUIPreset,
      onStart: () => {
        this.isPlaying = true;
        this.isPaused = false;
        this.isFinished = false;
        this.animationStart.emit();
      },
      onEnd: () => {
        this.isPlaying = false;
        this.isPaused = false;
        this.isFinished = true;
        this.animationEnd.emit();
      },
      onIteration: () => {
        this.animationIteration.emit();
      },
    };

    this.animation = this.fiEyesUIAnimationService.createAnimation(this.elementRef, options);
  }

  @HostListener('click')
  onClick(): void {
    if (this.fiEyesUITrigger === 'click') {
      this.play();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.fiEyesUITrigger === 'hover') {
      this.play();
    }
  }

  @HostListener('focus')
  onFocus(): void {
    if (this.fiEyesUITrigger === 'focus') {
      this.play();
    }
  }

  play(): void {
    if (this.animation) {
      this.animation.play();
    } else {
      this.createAnimation();
      this.animation?.play();
    }
  }

  pause(): void {
    this.animation?.pause();
    this.isPlaying = false;
    this.isPaused = true;
  }

  reverse(): void {
    this.animation?.reverse();
  }

  finish(): void {
    this.animation?.finish();
    this.isPlaying = false;
    this.isPaused = false;
    this.isFinished = true;
  }

  cancel(): void {
    this.fiEyesUIAnimationService.cancel(this.elementRef);
    this.animation = undefined;
    this.isPlaying = false;
    this.isPaused = false;
    this.isFinished = false;
  }

  get playing(): boolean {
    return this.isPlaying;
  }

  get paused(): boolean {
    return this.isPaused;
  }

  get finished(): boolean {
    return this.isFinished;
  }
}
