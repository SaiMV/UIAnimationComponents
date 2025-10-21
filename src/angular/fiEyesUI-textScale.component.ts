import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUITextScaleConfig {
  text?: string;
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  animationDelay?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-textScale',
  template: `
    <div 
      #textScaleContainer
      class="fiEyesUI-textScale-container"
      [style.font-size]="fontSize"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-textScale-appendText"></div>
    </div>
  `,
  styles: [`
    .fiEyesUI-textScale-container {
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
export class FiEyesUITextScaleComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = 'Welcome To Finches Eyes UI Components';
  @Input() fontSize: string = '80px';
  @Input() color: string = '#ffffff';
  @Input() animationDuration: number = 1500;
  @Input() animationDelay: number = 0;
  @Input() autoPlay: boolean = true;
  @Input() repeatInterval: number = 3000;
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('textScaleContainer') textScaleContainerRef!: ElementRef<HTMLDivElement>;

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
    if (!this.textScaleContainerRef?.nativeElement) return;

    const fiEyesUIContainer = this.textScaleContainerRef.nativeElement;
    
    // Create styles dynamically
    this.fiEyesUICreateStyles();
    
    // Split text into characters
    this.fiEyesUISplitText();
    
    if (this.autoPlay) {
      this.fiEyesUIAnimateText();
      
      // Set up interval for auto-repeat
      this.intervalId = window.setInterval(() => {
        this.fiEyesUIAnimateText();
      }, this.repeatInterval) as unknown as number;
    }
  }

  private fiEyesUISplitText() {
    if (!this.textScaleContainerRef?.nativeElement) return;
    
    const fiEyesUIContainer = this.textScaleContainerRef.nativeElement;
    const fiEyesUIText = this.text;
    const fiEyesUILengthOfText = fiEyesUIText.length;
    const fiEyesUICharList = new Array(fiEyesUILengthOfText);
    
    for (let i = 0; i < fiEyesUILengthOfText; i++) {
      fiEyesUICharList[i] = fiEyesUIText.charAt(i);
    }
    
    const fiEyesUITargetDiv = fiEyesUIContainer.querySelector('.fiEyesUI-textScale-appendText');
    if (!fiEyesUITargetDiv) return;
    
    fiEyesUITargetDiv.innerHTML = '';
    
    for (let i = 0; i < fiEyesUILengthOfText; i++) {
      const fiEyesUIDiv = document.createElement('div');
      fiEyesUIDiv.classList.add(`fiEyesUI-ch-${i}`);
      fiEyesUIDiv.classList.add('fiEyesUI-textScale-character');
      fiEyesUIDiv.textContent = fiEyesUICharList[i];
      fiEyesUITargetDiv.appendChild(fiEyesUIDiv);
    }
  }

  private fiEyesUIAnimateText() {
    if (!this.textScaleContainerRef?.nativeElement) return;
    
    const fiEyesUIContainer = this.textScaleContainerRef.nativeElement;
    this.fiEyesUISplitText();
    
    setTimeout(() => {
      const fiEyesUIItems = fiEyesUIContainer.querySelectorAll('.fiEyesUI-textScale-character');
      fiEyesUIItems.forEach((fiEyesUIItem) => {
        fiEyesUIItem.classList.add('fiEyesUI-animate');
      });
      
      setTimeout(() => {
        this.complete.emit();
      }, this.animationDuration);
    }, this.animationDelay);
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-textScale-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-textScale-container {
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
      
      .fiEyesUI-textScale-appendText {
        text-align: center;
        padding: 34px;
        display: block;
        color: ${this.color};
        width: 100%;
      }
      
      .fiEyesUI-textScale-character {
        display: inline;
        font-weight: bolder;
        font-size: ${this.fontSize};
        margin: auto;
        text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
      }
      
      .fiEyesUI-textScale-character.fiEyesUI-animate {
        animation: fiEyesUI-rotate ${this.animationDuration}ms linear forwards;
      }
      
      @keyframes fiEyesUI-rotate {
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
