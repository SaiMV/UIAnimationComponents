import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

export interface FiEyesUITextEffect6Config {
  text?: string;
  fontSize?: string;
  autoPlay?: boolean;
}

@Component({
  selector: 'fiEyesUI-textEffect6',
  template: `
    <div 
      #container
      class="fiEyesUI-textEffect6-container"
      [style.font-size]="config.fontSize || '3rem'"
      [style]="customStyle"
    >
      <div class="fiEyesUI-textEffect6-text"></div>
    </div>
  `,
  styles: [`
    .fiEyesUI-textEffect6-container {
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
    
    .fiEyesUI-textEffect6-text {
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      line-height: 1.2;
    }
    
    .fiEyesUI-textEffect6-text span {
      position: relative;
      color: #ffffff;
      pointer-events: none;
      animation: fiEyesUI-anim6 linear both;
      animation-timeline: scroll();
      animation-range: entry calc((var(--index) * (100/var(--totalChars))) * 1%) cover 100%;
    }
    
    .fiEyesUI-textEffect6-container:hover .fiEyesUI-textEffect6-text span {
      animation: fiEyesUI-anim6 1s ease alternate infinite;
      animation-delay: calc(var(--delay) * 0.5);
    }
    
    @keyframes fiEyesUI-anim6 {
      0% {
        font-weight: 100;
      }
      20% {
        font-weight: 900;
      }
      100% {
        font-weight: 900;
      }
    }
  `]
})
export class FiEyesUITextEffect6Component implements OnInit, AfterViewInit, OnDestroy {
  @Input() config: FiEyesUITextEffect6Config = {};
  @Input() customStyle: string = '';
  @Output() animationComplete = new EventEmitter<void>();
  @Output() animationStart = new EventEmitter<void>();

  @ViewChild('container', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.fiEyesUIInitializeTextEffect6();
    this.animationStart.emit();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  fiEyesUIInitializeTextEffect6() {
    if (!this.containerRef?.nativeElement) return;

    const container = this.containerRef.nativeElement;
    const textElement = container.querySelector('.fiEyesUI-textEffect6-text');
    
    if (textElement) {
      textElement.innerHTML = '';
      const letters = (this.config.text || 'Welcome To Finches Eyes UI Components').split('');
      
      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.style.setProperty('--delay', `${index * 0.1}s`);
        span.style.setProperty('--index', index.toString());
        span.style.setProperty('--totalChars', letters.length.toString());
        textElement.appendChild(span);
      });
    }
  }
}
