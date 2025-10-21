import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

export interface FiEyesUITextEffect7Config {
  text?: string;
  fontSize?: string;
  autoPlay?: boolean;
}

@Component({
  selector: 'fiEyesUI-textEffect7',
  template: `
    <div 
      #container
      class="fiEyesUI-textEffect7-container"
      [style.font-size]="config.fontSize || '3rem'"
      [style]="customStyle"
    >
      <div class="fiEyesUI-textEffect7-text"></div>
    </div>
  `,
  styles: [`
    .fiEyesUI-textEffect7-container {
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
    
    .fiEyesUI-textEffect7-text {
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      line-height: 1.2;
    }
    
    .fiEyesUI-textEffect7-text span {
      position: relative;
      color: #ffffff;
      pointer-events: none;
      animation: fiEyesUI-anim7 1s ease alternate infinite;
      animation-delay: calc(var(--delay) * 0.5);
    }
    
    @keyframes fiEyesUI-anim7 {
      0% {
        text-shadow: 0px 0px 0px #fff;
      }
      20% {
        text-shadow: 0px 0px 0px #fff;
      }
      100% {
        text-shadow: 0px 0px 50px #fff, 0px 0px 50px #fff, 0px 0px 50px #fff;
      }
    }
  `]
})
export class FiEyesUITextEffect7Component implements OnInit, AfterViewInit, OnDestroy {
  @Input() config: FiEyesUITextEffect7Config = {};
  @Input() customStyle: string = '';
  @Output() animationComplete = new EventEmitter<void>();
  @Output() animationStart = new EventEmitter<void>();

  @ViewChild('container', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.fiEyesUIInitializeTextEffect7();
    this.animationStart.emit();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  fiEyesUIInitializeTextEffect7() {
    if (!this.containerRef?.nativeElement) return;

    const container = this.containerRef.nativeElement;
    const textElement = container.querySelector('.fiEyesUI-textEffect7-text');
    
    if (textElement) {
      textElement.innerHTML = '';
      const letters = (this.config.text || 'Welcome To Finches Eyes UI Components').split('');
      
      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.style.setProperty('--delay', `${index * 0.1}s`);
        textElement.appendChild(span);
      });
    }
  }
}
