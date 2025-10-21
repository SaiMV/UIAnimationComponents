import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

export interface FiEyesUISlideLeftConfig {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  letterDelay?: number;
  slideDistance?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-slideLeft',
  template: `
    <div 
      #container
      class="fiEyesUI-slideLeft-container"
      [style.font-size]="config.fontSize || '50px'"
      [style]="customStyle"
    >
      <h1 class="fiEyesUI-slideLeft-title">
        <span
          *ngFor="let char of textChars; let i = index"
          class="fiEyesUI-slideLeft-span"
          [style.animation-delay]="(config.letterDelay || 0.1) * i + 's'"
          [style.animation-duration]="(config.animationDuration || 1.5) + 's'"
        >
          {{ char === ' ' ? '\u00A0' : char }}
        </span>
      </h1>
    </div>
  `,
  styles: [`
    .fiEyesUI-slideLeft-container {
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: column;
      height: 100%;
      width: 100%;
      background-color: #000000;
      color: #ffffff;
      font-family: 'Orbitron', sans-serif;
    }
    
    .fiEyesUI-slideLeft-title {
      text-align: center;
      text-transform: uppercase;
      font-family: 'Orbitron', sans-serif;
      letter-spacing: 1px;
      color: #ffffff;
      margin: 0;
      padding: 0;
    }
    
    .fiEyesUI-slideLeft-span {
      display: inline-block;
      animation: fiEyesUI-slideLeft 1.5s forwards;
      opacity: 0;
      transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    
    @keyframes fiEyesUI-slideLeft {
      from {
        opacity: 0;
        transform: translateX(200px);
      } 
      to {
        opacity: 1;
        transform: translateX(0%);
      }
    }
  `]
})
export class FiEyesUISlideLeftComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() config: FiEyesUISlideLeftConfig = {};
  @Input() customStyle: string = '';
  @Output() animationComplete = new EventEmitter<void>();
  @Output() animationStart = new EventEmitter<void>();

  @ViewChild('container', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  textChars: string[] = [];
  private animationTimeout: number | null = null;

  ngOnInit() {
    this.textChars = (this.config.text || 'Welcome To Finches Eyes UI Components').split('');
  }

  ngAfterViewInit() {
    if (this.config.autoPlay !== false) {
      this.fiEyesUIStartSlideLeftAnimation();
    }
  }

  ngOnDestroy() {
    this.fiEyesUIStopSlideLeftAnimation();
  }

  fiEyesUIStartSlideLeftAnimation() {
    if (!this.containerRef?.nativeElement) return;

    const spans = this.containerRef.nativeElement.querySelectorAll('.fiEyesUI-slideLeft-span');
    
    spans.forEach((span, index) => {
      const element = span as HTMLElement;
      element.style.animationDelay = `${(this.config.letterDelay || 0.1) * index}s`;
      element.style.animationDuration = `${this.config.animationDuration || 1.5}s`;
    });

    this.animationStart.emit();

    if (this.config.repeatInterval && this.config.repeatInterval > 0) {
      this.animationTimeout = window.setTimeout(() => {
        this.fiEyesUIStartSlideLeftAnimation();
      }, this.config.repeatInterval * 1000);
    }
  }

  fiEyesUIStopSlideLeftAnimation() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
  }

  fiEyesUIResetAnimation() {
    this.fiEyesUIStopSlideLeftAnimation();
    setTimeout(() => {
      this.fiEyesUIStartSlideLeftAnimation();
    }, 100);
  }
}
