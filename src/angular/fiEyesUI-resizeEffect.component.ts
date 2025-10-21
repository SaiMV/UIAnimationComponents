import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUIResizeEffectConfig {
  text?: string;
  minFontSize?: string;
  maxFontSize?: string;
  minFontWeight?: number;
  maxFontWeight?: number;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-resizeEffect',
  template: `
    <div 
      #resizeEffectContainer
      class="fiEyesUI-resizeEffect-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-resizeEffect-content">
        <h1>{{ text }}</h1>
      </div>
    </div>
  `,
  styles: [`
    .fiEyesUI-resizeEffect-container {
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
export class FiEyesUIResizeEffectComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = 'Welcome To Finches Eyes UI Components';
  @Input() minFontSize: string = '20px';
  @Input() maxFontSize: string = '50px';
  @Input() minFontWeight: number = 100;
  @Input() maxFontWeight: number = 900;
  @Input() animationDuration: number = 5000;
  @Input() autoPlay: boolean = true;
  @Input() repeatInterval: number = 6000;
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('resizeEffectContainer') resizeEffectContainerRef!: ElementRef<HTMLDivElement>;

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
    if (!this.resizeEffectContainerRef?.nativeElement) return;

    const fiEyesUIContainer = this.resizeEffectContainerRef.nativeElement;
    
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
    if (!this.resizeEffectContainerRef?.nativeElement) return;
    
    // Calculate total animation time
    setTimeout(() => {
      this.complete.emit();
    }, this.animationDuration);
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-resizeEffect-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-resizeEffect-container {
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
      
      .fiEyesUI-resizeEffect-content {
        font-size: ${this.minFontSize};
        font-weight: ${this.minFontWeight};
        font-family: 'Orbitron', sans-serif;
        animation: fiEyesUI-resize-anime ${this.animationDuration}ms infinite forwards;
        animation-direction: alternate;
        color: #ffffff;
      }
      
      @keyframes fiEyesUI-resize-anime {
        from {
          font-size: ${this.minFontSize};
          font-weight: ${this.minFontWeight};
          opacity: 0;
        } 
        to {
          font-size: ${this.maxFontSize};
          font-weight: ${this.maxFontWeight};
          text-shadow: 0px 0px 5px #ffffff;
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
