import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUITextScaleBounceConfig {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-textScaleBounce',
  template: `
    <div 
      #textScaleBounceContainer
      class="fiEyesUI-textScaleBounce-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-textScaleBounce-content">
        {{ text }}
      </div>
    </div>
  `,
  styles: [`
    .fiEyesUI-textScaleBounce-container {
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
export class FiEyesUITextScaleBounceComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = 'Welcome To Finches Eyes UI Components';
  @Input() fontSize: string = '80px';
  @Input() animationDuration: number = 1500;
  @Input() autoPlay: boolean = true;
  @Input() repeatInterval: number = 3000;
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('textScaleBounceContainer') textScaleBounceContainerRef!: ElementRef<HTMLDivElement>;

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
    if (!this.textScaleBounceContainerRef?.nativeElement) return;

    const fiEyesUIContainer = this.textScaleBounceContainerRef.nativeElement;
    
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
    if (!this.textScaleBounceContainerRef?.nativeElement) return;
    
    const fiEyesUIContentElement = this.textScaleBounceContainerRef.nativeElement.querySelector('.fiEyesUI-textScaleBounce-content');
    if (fiEyesUIContentElement) {
      fiEyesUIContentElement.classList.add('fiEyesUI-textScaleBounce-animate');
      
      setTimeout(() => {
        fiEyesUIContentElement.classList.remove('fiEyesUI-textScaleBounce-animate');
        this.complete.emit();
      }, this.animationDuration);
    }
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-textScaleBounce-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-textScaleBounce-container {
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
      
      .fiEyesUI-textScaleBounce-content {
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
        font-weight: bolder;
        color: #ffffff;
        text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
        display: inline;
        margin: auto;
      }
      
      .fiEyesUI-textScaleBounce-animate {
        animation: fiEyesUI-textScaleBounce-rotate ${this.animationDuration}ms linear forwards;
      }
      
      @keyframes fiEyesUI-textScaleBounce-rotate {
        0% {
          transform: scale(0);
        }
        10% {
          font-size: ${this.fontSize};
          transform: scale(2);
        }
        20% {
          transform: scale(0.5);
        }
        40% {
          transform: scale(1.5);
        }
        60% {
          transform: scale(0.8);
        }
        80% {
          transform: scale(1.2);
        }
        100% {
          font-size: ${this.fontSize};
          transform: scale(1);
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
