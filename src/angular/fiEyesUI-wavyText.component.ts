import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

export interface FiEyesUIWavyTextConfig {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  waveHeight?: number;
  delayMultiplier?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-wavy-text',
  template: `
    <div 
      #container
      class="fiEyesUI-wavy-text-container"
      [style.font-size]="config.fontSize || '2em'"
      [style]="customStyle"
    >
      <span
        *ngFor="let char of textChars; let i = index"
        class="fiEyesUI-wavy-text-span"
        [style.--i]="i"
        [style.animation-delay]="(config.delayMultiplier || 0.1) * i + 's'"
        [style.animation-duration]="(config.animationDuration || 1.5) + 's'"
      >
        {{ char === ' ' ? '\u00A0' : char }}
      </span>
    </div>
  `,
  styles: [`
    .fiEyesUI-wavy-text-container {
      position: relative;
      display: inline-block;
      background-color: #000000;
      color: #ffffff;
      font-family: 'Orbitron', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    
    .fiEyesUI-wavy-text-span {
      position: relative;
      display: inline-block;
      color: #ffffff;
      animation: fiEyesUI-wavy-animate 1.5s ease-in-out infinite;
    }
    
    @keyframes fiEyesUI-wavy-animate {
      0%, 100% {
        transform: translateY(0px);
      }
      20% {
        transform: translateY(-20px);
      }
      40% {
        transform: translateY(0px);
      }
    }
  `]
})
export class FiEyesUIWavyTextComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() config: FiEyesUIWavyTextConfig = {};
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
      this.fiEyesUIStartWavyAnimation();
    }
  }

  ngOnDestroy() {
    this.fiEyesUIStopWavyAnimation();
  }

  fiEyesUIStartWavyAnimation() {
    if (!this.containerRef?.nativeElement) return;

    const spans = this.containerRef.nativeElement.querySelectorAll('.fiEyesUI-wavy-text-span');
    
    spans.forEach((span, index) => {
      const element = span as HTMLElement;
      element.style.setProperty('--i', index.toString());
      element.style.animationDelay = `${(this.config.delayMultiplier || 0.1) * index}s`;
      element.style.animationDuration = `${this.config.animationDuration || 1.5}s`;
    });

    this.animationStart.emit();

    if (this.config.repeatInterval && this.config.repeatInterval > 0) {
      this.animationTimeout = window.setTimeout(() => {
        this.fiEyesUIStartWavyAnimation();
      }, this.config.repeatInterval * 1000);
    }
  }

  fiEyesUIStopWavyAnimation() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
  }

  fiEyesUIResetAnimation() {
    this.fiEyesUIStopWavyAnimation();
    setTimeout(() => {
      this.fiEyesUIStartWavyAnimation();
    }, 100);
  }
}
