import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUIFadeInConfig {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-fadeIn',
  template: `
    <div 
      #fadeInContainer
      class="fiEyesUI-fadeIn-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-fadeIn-content">
        <h1>{{ text }}</h1>
      </div>
    </div>
  `,
  styles: [`
    .fiEyesUI-fadeIn-container {
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
export class FiEyesUIFadeInComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = 'Welcome To Finches Eyes UI Components';
  @Input() fontSize: string = '80px';
  @Input() animationDuration: number = 7000;
  @Input() autoPlay: boolean = true;
  @Input() repeatInterval: number = 8000;
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('fadeInContainer') fadeInContainerRef!: ElementRef<HTMLDivElement>;

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
    if (!this.fadeInContainerRef?.nativeElement) return;

    const fiEyesUIContainer = this.fadeInContainerRef.nativeElement;
    
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
    if (!this.fadeInContainerRef?.nativeElement) return;
    
    // Calculate total animation time
    setTimeout(() => {
      this.complete.emit();
    }, this.animationDuration);
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-fadeIn-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-fadeIn-container {
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
      
      .fiEyesUI-fadeIn-content {
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
        font-weight: 900;
        color: #ffffff;
        padding: 1rem;
        text-align: center;
        animation-name: fiEyesUI-fade-in;
        animation-duration: ${this.animationDuration}ms;
        animation-fill-mode: both;
      }
      
      @keyframes fiEyesUI-fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
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
