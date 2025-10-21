import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

export interface FiEyesUISlideRevealConfig {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  letterSpacing?: string;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-slideReveal',
  template: `
    <div 
      #container
      class="fiEyesUI-slideReveal-container"
      [style.font-size]="config.fontSize || '25px'"
      [style]="customStyle"
    >
      <h1 class="fiEyesUI-slideReveal-title">
        <div class="fiEyesUI-slideReveal-text">
          {{ config.text || 'Welcome To Finches Eyes UI Components' }}
        </div>
      </h1>
    </div>
  `,
  styles: [`
    .fiEyesUI-slideReveal-container {
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Orbitron', sans-serif;
      background-color: #000000;
      color: #ffffff;
      height: 100%;
      position: relative;
    }
    
    .fiEyesUI-slideReveal-title {
      position: relative;
      letter-spacing: 3px;
      font-weight: 300;
      text-transform: uppercase;
      padding-right: 30px;
      overflow: hidden;
    }
    
    .fiEyesUI-slideReveal-text {
      margin: 0 auto;
      white-space: nowrap;
      transform: translateX(calc(100% + 30px));
      animation: fiEyesUI-leftSlide 1.1s cubic-bezier(0.68, -0.55, 0.265, 1.10) forwards;
    }
    
    .fiEyesUI-slideReveal-title::before {
      content: "";
      position: absolute;
      right: 0;
      height: 100%;
      background: #000000;
      animation: fiEyesUI-hiddingSlide 1.1s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
      z-index: 10;
    }
    
    .fiEyesUI-slideReveal-title::after {
      content: "";
      position: absolute;
      background: #ffffff;
      width: 75px;
      margin: auto 0;
      top: 5px;
      bottom: 0;
      height: 70%;
      animation: fiEyesUI-rightSlide 1.1s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
    }
    
    @keyframes fiEyesUI-leftSlide {
      0% {
        transform: translateX(calc(100% + 30px));
      }
      100% {
        transform: translateX(0%);
      }
    }
    
    @keyframes fiEyesUI-rightSlide {
      0% {
        right: 100%;
        width: 70px;
      }
      100% {
        opacity: 1;
        right: 0%;
        width: 24px;
      }
    }
    
    @keyframes fiEyesUI-hiddingSlide {
      0% {
        width: 100%;
      }
      100% {
        width: 0%;
      }
    }
  `]
})
export class FiEyesUISlideRevealComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() config: FiEyesUISlideRevealConfig = {};
  @Input() customStyle: string = '';
  @Output() animationComplete = new EventEmitter<void>();
  @Output() animationStart = new EventEmitter<void>();

  @ViewChild('container', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  private animationTimeout: number | null = null;

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    if (this.config.autoPlay !== false) {
      this.fiEyesUIStartSlideRevealAnimation();
    }
  }

  ngOnDestroy() {
    this.fiEyesUIStopSlideRevealAnimation();
  }

  fiEyesUIStartSlideRevealAnimation() {
    if (!this.containerRef?.nativeElement) return;

    const textElement = this.containerRef.nativeElement.querySelector('.fiEyesUI-slideReveal-text');
    
    if (textElement) {
      // Reset animation
      textElement.classList.remove('fiEyesUI-slideReveal-animate');
      
      // Trigger animation
      setTimeout(() => {
        textElement.classList.add('fiEyesUI-slideReveal-animate');
      }, 10);
    }

    this.animationStart.emit();

    if (this.config.repeatInterval && this.config.repeatInterval > 0) {
      this.animationTimeout = window.setTimeout(() => {
        this.fiEyesUIStartSlideRevealAnimation();
      }, this.config.repeatInterval * 1000);
    }
  }

  fiEyesUIStopSlideRevealAnimation() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
  }

  fiEyesUIResetAnimation() {
    this.fiEyesUIStopSlideRevealAnimation();
    setTimeout(() => {
      this.fiEyesUIStartSlideRevealAnimation();
    }, 100);
  }
}
