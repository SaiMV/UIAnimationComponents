import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUITypewriterConfig {
  text?: string;
  fontSize?: string;
  cursorColor?: string;
  cursorWidth?: string;
  animationDuration?: number;
  cursorBlinkSpeed?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-typewriter',
  template: `
    <div 
      #typewriterContainer
      class="fiEyesUI-typewriter-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-typewriter-content">
        <div class="fiEyesUI-typewriter-text">{{ text }}</div>
      </div>
    </div>
  `,
  styles: [`
    .fiEyesUI-typewriter-container {
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
export class FiEyesUITypewriterComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = 'Welcome To Finches Eyes UI Components';
  @Input() fontSize: string = '80px';
  @Input() cursorColor: string = '#ffffff';
  @Input() cursorWidth: string = '4px';
  @Input() animationDuration: number = 5000;
  @Input() cursorBlinkSpeed: number = 1000;
  @Input() autoPlay: boolean = true;
  @Input() repeatInterval: number = 6000;
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('typewriterContainer') typewriterContainerRef!: ElementRef<HTMLDivElement>;

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
    if (!this.typewriterContainerRef?.nativeElement) return;

    const fiEyesUIContainer = this.typewriterContainerRef.nativeElement;
    
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
    if (!this.typewriterContainerRef?.nativeElement) return;
    
    // Calculate total animation time
    setTimeout(() => {
      this.complete.emit();
    }, this.animationDuration);
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-typewriter-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-typewriter-container {
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
      
      .fiEyesUI-typewriter-content {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
        font-weight: bold;
      }
      
      .fiEyesUI-typewriter-text {
        white-space: nowrap;
        overflow: hidden;
        border-right: ${this.cursorWidth} solid ${this.cursorColor};
        animation: fiEyesUI-cursor ${this.cursorBlinkSpeed}ms step-start infinite, 
                   fiEyesUI-typewriter-text ${this.animationDuration}ms steps(${this.text.length}) alternate infinite;
      }
      
      @keyframes fiEyesUI-cursor {
        0%, 100% { 
          border-color: ${this.cursorColor}; 
        }
      }
      
      @keyframes fiEyesUI-typewriter-text {
        0% { 
          width: 0; 
        }
        100% { 
          width: ${this.text.length}ch; 
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
