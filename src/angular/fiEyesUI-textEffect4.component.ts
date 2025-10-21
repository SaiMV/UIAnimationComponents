import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

export interface FiEyesUITextEffect4Config {
  text?: string;
  fontSize?: string;
  autoPlay?: boolean;
}

@Component({
  selector: 'fiEyesUI-textEffect4',
  template: `
    <div 
      #container
      class="fiEyesUI-textEffect4-container"
      [style.font-size]="config.fontSize || '3rem'"
      [style]="customStyle"
    >
      <div class="fiEyesUI-textEffect4-text"></div>
    </div>
  `,
  styles: [`
    .fiEyesUI-textEffect4-container {
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
    
    .fiEyesUI-textEffect4-text {
      overflow: hidden;
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      line-height: 1.2;
    }
    
    .fiEyesUI-textEffect4-text span {
      position: relative;
      font-weight: bold;
      color: #ffffff;
      display: inline-block;
    }
    
    .fiEyesUI-textEffect4-text span::after {
      position: absolute;
      left: 0;
      top: 100%;
      content: attr(char);
      color: #000000;
      text-shadow: 0px 0px 1px #fff, 0px 0px 1px #fff, 0px 0px 1px #fff, 0px 0px 1px #fff;
    }
    
    .fiEyesUI-textEffect4-container:hover .fiEyesUI-textEffect4-text span {
      animation: fiEyesUI-anim4 1s linear infinite;
      animation-delay: calc(var(--delay) * 0.5);
    }
    
    @keyframes fiEyesUI-anim4 {
      0% {
        filter: blur(0px);
        translate: 0 0;
      }
      100% {
        filter: blur(10px);
        translate: 0 -100%;
      }
    }
  `]
})
export class FiEyesUITextEffect4Component implements OnInit, AfterViewInit, OnDestroy {
  @Input() config: FiEyesUITextEffect4Config = {};
  @Input() customStyle: string = '';
  @Output() animationComplete = new EventEmitter<void>();
  @Output() animationStart = new EventEmitter<void>();

  @ViewChild('container', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.fiEyesUIInitializeTextEffect4();
    this.animationStart.emit();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  fiEyesUIInitializeTextEffect4() {
    if (!this.containerRef?.nativeElement) return;

    const container = this.containerRef.nativeElement;
    const textElement = container.querySelector('.fiEyesUI-textEffect4-text');
    
    if (textElement) {
      textElement.innerHTML = '';
      const letters = (this.config.text || 'Welcome To Finches Eyes UI Components').split('');
      
      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.setAttribute('char', letter === ' ' ? '\u00A0' : letter);
        span.style.setProperty('--delay', `${index * 0.1}s`);
        textElement.appendChild(span);
      });
    }
  }
}
