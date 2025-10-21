import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUITextRevealConfig {
  text1?: string;
  text2?: string;
  fontSize1?: string;
  fontSize2?: string;
  color1?: string;
  color2?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-textReveal',
  template: `
    <div 
      #textRevealContainer
      class="fiEyesUI-textReveal-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-textReveal-content">
        <span class="fiEyesUI-textReveal-span fiEyesUI-textReveal-text1">{{ text1 }}</span>
        <span class="fiEyesUI-textReveal-span fiEyesUI-textReveal-text2">{{ text2 }}</span>
      </div>
    </div>
  `,
  styles: [`
    .fiEyesUI-textReveal-container {
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
export class FiEyesUITextRevealComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text1: string = 'Welcome To';
  @Input() text2: string = 'Finches Eyes UI Components';
  @Input() fontSize1: string = '60px';
  @Input() fontSize2: string = '30px';
  @Input() color1: string = '#ffffff';
  @Input() color2: string = '#ffffff';
  @Input() animationDuration: number = 2500;
  @Input() autoPlay: boolean = true;
  @Input() repeatInterval: number = 4000;
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('textRevealContainer') textRevealContainerRef!: ElementRef<HTMLDivElement>;

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
    if (!this.textRevealContainerRef?.nativeElement) return;

    const fiEyesUIContainer = this.textRevealContainerRef.nativeElement;
    
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
    if (!this.textRevealContainerRef?.nativeElement) return;
    
    // Calculate total animation time
    setTimeout(() => {
      this.complete.emit();
    }, this.animationDuration);
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-textReveal-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-textReveal-container {
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
      
      .fiEyesUI-textReveal-content {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
      }
      
      .fiEyesUI-textReveal-span {
        text-transform: uppercase;
        display: block;
      }
      
      .fiEyesUI-textReveal-text1 {
        color: ${this.color1};
        font-size: ${this.fontSize1};
        font-weight: 700;
        letter-spacing: 8px;
        margin-bottom: 20px;
        background: #000000;
        position: relative;
        animation: fiEyesUI-text-reveal ${this.animationDuration}ms 1;
      }
      
      .fiEyesUI-textReveal-text2 {
        font-size: ${this.fontSize2};
        color: ${this.color2};
      }
      
      @keyframes fiEyesUI-text-reveal {
        0% {
          color: #000000;
          margin-bottom: -40px;
        }
        30% {
          letter-spacing: 25px;
          margin-bottom: -40px;
        }
        100% {
          color: ${this.color1};
          letter-spacing: 8px;
          margin-bottom: 20px;
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
