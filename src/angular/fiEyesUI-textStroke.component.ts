import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUITextStrokeConfig {
  text?: string;
  fontSize?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-textStroke',
  template: `
    <div 
      #textStrokeContainer
      class="fiEyesUI-textStroke-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-textStroke-content">
        <h2 class="fiEyesUI-textStroke-text">{{ text }}</h2>
        <h2 class="fiEyesUI-textStroke-text">{{ text }}</h2>
      </div>
    </div>
  `,
  styles: [`
    .fiEyesUI-textStroke-container {
      font-family: 'Orbitron', sans-serif;
      font-weight: 600;
      text-align: center;
      margin: 0;
      padding: 20px;
      background-color: #000000;
      color: #ffffff;
      min-height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
  `]
})
export class FiEyesUITextStrokeComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = 'Welcome To Finches Eyes UI Components';
  @Input() fontSize: string = '80px';
  @Input() strokeColor: string = '#8338ec';
  @Input() fillColor: string = '#c19bf5';
  @Input() strokeWidth: string = '2px';
  @Input() animationDuration: number = 4000;
  @Input() autoPlay: boolean = true;
  @Input() repeatInterval: number = 5000;
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('textStrokeContainer') textStrokeContainerRef!: ElementRef<HTMLDivElement>;

  private fiEyesUIStyleElement?: HTMLStyleElement;
  private intervalId?: number;

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.fiEyesUIInitializeAnimation();
  }

  ngOnDestroy() {
    this.fiEyesUICleanup();
  }

  private fiEyesUIInitializeAnimation() {
    if (!this.textStrokeContainerRef?.nativeElement) return;

    const fiEyesUIContainer = this.textStrokeContainerRef.nativeElement;
    
    // Create styles dynamically
    this.fiEyesUICreateStyles();
    
    if (this.autoPlay) {
      this.fiEyesUIStartAnimation();
      
      // Set up interval for auto-repeat
      this.intervalId = window.setInterval(() => {
        this.fiEyesUIStartAnimation();
      }, this.repeatInterval) as unknown as number;
    }
  }

  private fiEyesUIStartAnimation() {
    if (!this.textStrokeContainerRef?.nativeElement) return;
    
    // Calculate total animation time
    setTimeout(() => {
      this.complete.emit();
    }, this.animationDuration);
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-textStroke-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-textStroke-container {
        font-family: 'Orbitron', sans-serif;
        font-weight: 600;
        text-align: center;
        margin: 0;
        padding: 20px;
        background-color: #000000;
        color: #ffffff;
        min-height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      
      .fiEyesUI-textStroke-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .fiEyesUI-textStroke-text {
        color: #ffffff;
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        margin: 0;
        padding: 0;
      }
      
      .fiEyesUI-textStroke-text:nth-child(1) {
        color: transparent;
        -webkit-text-stroke: ${this.strokeWidth} ${this.strokeColor};
        text-stroke: ${this.strokeWidth} ${this.strokeColor};
      }
      
      .fiEyesUI-textStroke-text:nth-child(2) {
        color: ${this.fillColor};
        animation: fiEyesUI-text-stroke-animate ${this.animationDuration}ms ease-in-out infinite;
      }
      
      @keyframes fiEyesUI-text-stroke-animate {
        0%, 100% {
          clip-path: polygon(
            0% 45%,
            16% 44%,
            33% 50%,
            54% 60%,
            70% 61%,
            84% 59%,
            100% 52%,
            100% 100%,
            0% 100%
          );
        }
        50% {
          clip-path: polygon(
            0% 60%,
            15% 65%,
            34% 66%,
            51% 62%,
            67% 50%,
            84% 45%,
            100% 46%,
            100% 100%,
            0% 100%
          );
        }
      }
    `;
    
    document.head.appendChild(this.fiEyesUIStyleElement);
  }

  private fiEyesUICleanup() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
  }
}
