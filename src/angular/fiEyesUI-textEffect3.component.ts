import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

export interface FiEyesUITextEffect3Config {
  text?: string;
  fontSize?: string;
  autoPlay?: boolean;
}

@Component({
  selector: 'fiEyesUI-textEffect3',
  template: `
    <div 
      #container
      class="fiEyesUI-textEffect3-container"
      [style.font-size]="config.fontSize || '3rem'"
      [style]="customStyle"
    >
      <div class="fiEyesUI-textEffect3-text"></div>
    </div>
  `,
  styles: [`
    .fiEyesUI-textEffect3-container {
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
    
    .fiEyesUI-textEffect3-text {
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      line-height: 1.2;
    }
    
    .fiEyesUI-textEffect3-text span {
      background: linear-gradient(90deg, rgba(249,249,249,1) 50%, rgba(2,0,36,0) 50%);
      background-size: 250%;
      animation: fiEyesUI-anim3 linear both;
      animation-timeline: view();
      animation-range: entry 50% cover 50%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bold;
      color: #000000;
    }
    
    @keyframes fiEyesUI-anim3 {
      0% {
        background-position: 100%;
      }
      100% {
        background-position: 0%;
      }
    }
  `]
})
export class FiEyesUITextEffect3Component implements OnInit, AfterViewInit, OnDestroy {
  @Input() config: FiEyesUITextEffect3Config = {};
  @Input() customStyle: string = '';
  @Output() animationComplete = new EventEmitter<void>();
  @Output() animationStart = new EventEmitter<void>();

  @ViewChild('container', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.fiEyesUIInitializeTextEffect3();
    this.animationStart.emit();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  fiEyesUIInitializeTextEffect3() {
    if (!this.containerRef?.nativeElement) return;

    const container = this.containerRef.nativeElement;
    const textElement = container.querySelector('.fiEyesUI-textEffect3-text');
    
    if (textElement) {
      textElement.innerHTML = '';
      const letters = (this.config.text || 'Welcome To Finches Eyes UI Components').split('');
      
      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        textElement.appendChild(span);
      });
    }
  }
}
