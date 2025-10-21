import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

export interface FiEyesUITextEffect5Config {
  text?: string;
  fontSize?: string;
  autoPlay?: boolean;
}

@Component({
  selector: 'fiEyesUI-textEffect5',
  template: `
    <div 
      #container
      class="fiEyesUI-textEffect5-container"
      [style.font-size]="config.fontSize || '3rem'"
      [style]="customStyle"
      (click)="fiEyesUIDisintegrate()"
    >
      <div class="fiEyesUI-textEffect5-text"></div>
    </div>
  `,
  styles: [`
    .fiEyesUI-textEffect5-container {
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
      cursor: pointer;
    }
    
    .fiEyesUI-textEffect5-text {
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      line-height: 1.2;
    }
    
    .fiEyesUI-textEffect5-text span {
      position: relative;
      color: #ffffff;
      pointer-events: none;
    }
    
    .fiEyesUI-disintegrate {
      animation: fiEyesUI-anim5 var(--duration, 1s) linear forwards;
      animation-delay: calc(var(--delay, 0) * 1s);
    }
    
    @keyframes fiEyesUI-anim5 {
      0% {
        filter: blur(0px);
      }
      10% {
        filter: blur(0px);
      }
      100% {
        filter: blur(500px);
      }
    }
  `]
})
export class FiEyesUITextEffect5Component implements OnInit, AfterViewInit, OnDestroy {
  @Input() config: FiEyesUITextEffect5Config = {};
  @Input() customStyle: string = '';
  @Output() animationComplete = new EventEmitter<void>();
  @Output() animationStart = new EventEmitter<void>();

  @ViewChild('container', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.fiEyesUIInitializeTextEffect5();
    this.animationStart.emit();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  fiEyesUIInitializeTextEffect5() {
    if (!this.containerRef?.nativeElement) return;

    const container = this.containerRef.nativeElement;
    const textElement = container.querySelector('.fiEyesUI-textEffect5-text');
    
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

  fiEyesUIDisintegrate() {
    if (!this.containerRef?.nativeElement) return;
    
    const container = this.containerRef.nativeElement;
    const spans = container.querySelectorAll('.fiEyesUI-textEffect5-text span');
    
    spans.forEach((span, index) => {
      const element = span as HTMLElement;
      element.style.setProperty('--delay', `${index * 0.1}s`);
      element.style.setProperty('--duration', '1s');
      element.classList.add('fiEyesUI-disintegrate');
    });
    
    setTimeout(() => {
      this.animationComplete.emit();
    }, 1000);
  }
}
