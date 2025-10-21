import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

export interface FiEyesUITextEffect2Config {
  text?: string;
  fontSize?: string;
  autoPlay?: boolean;
}

@Component({
  selector: 'fiEyesUI-textEffect2',
  template: `
    <div 
      #container
      class="fiEyesUI-textEffect2-container"
      [style.font-size]="config.fontSize || '3rem'"
      [style]="customStyle"
    >
      <div class="fiEyesUI-textEffect2-text"></div>
    </div>
  `,
  styles: [`
    .fiEyesUI-textEffect2-container {
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
    
    .fiEyesUI-textEffect2-text {
      height: 2rem;
      overflow: hidden;
      perspective: 5000px;
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      line-height: 1.2;
    }
    
    .fiEyesUI-textEffect2-text span {
      color: #ffffff;
      display: inline-block;
      transition: all 0.5s ease;
      position: relative;
    }
    
    .fiEyesUI-textEffect2-container:hover .fiEyesUI-textEffect2-text span {
      transform-style: preserve-3d;
      transform-origin: center;
      animation: fiEyesUI-anim2 1s linear;
      animation-delay: calc(var(--delay) * 0.2);
    }
    
    @keyframes fiEyesUI-anim2 {
      0% {
        transform: rotatex(0deg);
      }
      100% {
        transform: rotatex(360deg);
      }
    }
  `]
})
export class FiEyesUITextEffect2Component implements OnInit, AfterViewInit, OnDestroy {
  @Input() config: FiEyesUITextEffect2Config = {};
  @Input() customStyle: string = '';
  @Output() animationComplete = new EventEmitter<void>();
  @Output() animationStart = new EventEmitter<void>();

  @ViewChild('container', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.fiEyesUIInitializeTextEffect2();
    this.animationStart.emit();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  fiEyesUIInitializeTextEffect2() {
    if (!this.containerRef?.nativeElement) return;

    const container = this.containerRef.nativeElement;
    const textElement = container.querySelector('.fiEyesUI-textEffect2-text');
    
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
