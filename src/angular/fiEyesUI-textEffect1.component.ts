import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

export interface FiEyesUITextEffect1Config {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-textEffect1',
  template: `
    <div 
      #container
      class="fiEyesUI-textEffect1-container"
      [style.font-size]="config.fontSize || '5rem'"
      [style]="customStyle"
    >
      <div class="fiEyesUI-textEffect1-text"></div>
    </div>
  `,
  styles: [`
    .fiEyesUI-textEffect1-container {
      font-family: 'Orbitron', sans-serif;
      background-color: #000000;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
    
    .fiEyesUI-textEffect1-text {
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      line-height: 1.2;
    }
    
    .fiEyesUI-textEffect1-text span {
      display: inline-block;
      transform-style: preserve-3d;
      transform-origin: bottom;
      animation: fiEyesUI-anim1 2s linear infinite alternate;
      animation-delay: var(--delay);
      font-weight: bold;
      color: #000000;
      text-shadow: 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000;
    }
    
    @keyframes fiEyesUI-anim1 {
      0% {
        text-shadow: 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000;
        scale: 1 0;
      }
      100% {
        text-shadow: 0px 0px 2px #ffffff, 0px 0px 2px #ffffff, 0px 0px 2px #ffffff, 0px 0px 2px #ffffff;
        scale: 1 1;
      }
    }
  `]
})
export class FiEyesUITextEffect1Component implements OnInit, AfterViewInit, OnDestroy {
  @Input() config: FiEyesUITextEffect1Config = {};
  @Input() customStyle: string = '';
  @Output() animationComplete = new EventEmitter<void>();
  @Output() animationStart = new EventEmitter<void>();

  @ViewChild('container', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  private animationTimeout: number | null = null;

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.fiEyesUIInitializeTextEffect1();
    if (this.config.autoPlay !== false) {
      this.fiEyesUIStartAnimation();
    }
  }

  ngOnDestroy() {
    this.fiEyesUIStopAnimation();
  }

  fiEyesUIInitializeTextEffect1() {
    if (!this.containerRef?.nativeElement) return;

    const container = this.containerRef.nativeElement;
    const textElement = container.querySelector('.fiEyesUI-textEffect1-text');
    
    if (textElement) {
      textElement.innerHTML = '';
      const letters = (this.config.text || 'Welcome To Finches Eyes UI Components').split('');
      
      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.style.setProperty('--delay', `${index * 0.1}s`);
        span.style.setProperty('--duration', `${this.config.animationDuration || 2}s`);
        textElement.appendChild(span);
      });
    }

    this.animationStart.emit();
  }

  fiEyesUIStartAnimation() {
    if (this.config.repeatInterval && this.config.repeatInterval > 0) {
      this.animationTimeout = window.setTimeout(() => {
        this.fiEyesUIStartAnimation();
      }, this.config.repeatInterval * 1000);
    }
  }

  fiEyesUIStopAnimation() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
  }
}
