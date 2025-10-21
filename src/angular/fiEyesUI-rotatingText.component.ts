import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUIRotatingTextConfig {
  words?: string[];
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  wordDelay?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-rotatingText',
  template: `
    <div 
      #rotatingTextContainer
      class="fiEyesUI-rotatingText-container"
      [style.font-size]="fontSize"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-rotatingText-content"></div>
    </div>
  `,
  styles: [`
    .fiEyesUI-rotatingText-container {
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
export class FiEyesUIRotatingTextComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() words: string[] = ['beautiful', 'maintainable', 'perfect'];
  @Input() fontSize: string = '40px';
  @Input() color: string = '#ffffff';
  @Input() animationDuration: number = 1500;
  @Input() wordDelay: number = 1250;
  @Input() autoPlay: boolean = true;
  @Input() repeatInterval: number = 5000;
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('rotatingTextContainer') rotatingTextContainerRef!: ElementRef<HTMLDivElement>;

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
    if (!this.rotatingTextContainerRef?.nativeElement) return;

    const fiEyesUIContainer = this.rotatingTextContainerRef.nativeElement;
    
    // Create styles dynamically
    this.fiEyesUICreateStyles();
    
    // Create word elements
    this.fiEyesUICreateWords();
    
    if (this.autoPlay) {
      this.fiEyesUIStartAnimation();
      
      // Set up interval for auto-repeat
      this.intervalId = window.setInterval(() => {
        this.fiEyesUIStartAnimation();
      }, this.repeatInterval) as unknown as number;
    }
  }

  private fiEyesUICreateWords() {
    if (!this.rotatingTextContainerRef?.nativeElement) return;
    
    const fiEyesUIContainer = this.rotatingTextContainerRef.nativeElement;
    const fiEyesUIContentDiv = fiEyesUIContainer.querySelector('.fiEyesUI-rotatingText-content');
    if (!fiEyesUIContentDiv) return;
    
    fiEyesUIContentDiv.innerHTML = '';
    
    this.words.forEach((fiEyesUIWord, fiEyesUIIndex) => {
      const fiEyesUIWordDiv = document.createElement('h2');
      fiEyesUIWordDiv.className = 'fiEyesUI-rotatingText-word';
      fiEyesUIWordDiv.textContent = fiEyesUIWord;
      fiEyesUIContentDiv.appendChild(fiEyesUIWordDiv);
    });
  }

  private fiEyesUIStartAnimation() {
    if (!this.rotatingTextContainerRef?.nativeElement) return;
    
    const fiEyesUIContainer = this.rotatingTextContainerRef.nativeElement;
    this.fiEyesUICreateWords();
    
    // Calculate total animation time
    const totalTime = (this.words.length * this.wordDelay) + this.animationDuration;
    
    setTimeout(() => {
      this.complete.emit();
    }, totalTime);
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-rotatingText-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-rotatingText-container {
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
      
      .fiEyesUI-rotatingText-content {
        position: relative;
        width: 100%;
      }
      
      .fiEyesUI-rotatingText-word {
        font-family: 'Orbitron', sans-serif;
        font-size: ${this.fontSize};
        left: 0;
        margin-bottom: 0;
        margin-top: 30px;
        opacity: 0;
        position: absolute;
        right: 0;
        text-align: center;
        text-transform: uppercase;
        top: 0;
        color: ${this.color};
      }
      
      .fiEyesUI-rotatingText-word:nth-of-type(1) {
        animation: fiEyesUI-rotate-text-up ${this.animationDuration}ms ${this.wordDelay}ms;
      }
      
      .fiEyesUI-rotatingText-word:nth-of-type(2) {
        animation: fiEyesUI-rotate-text-up ${this.animationDuration}ms ${this.wordDelay * 2}ms;
      }
      
      .fiEyesUI-rotatingText-word:nth-of-type(3) {
        animation: fiEyesUI-fade-text-in ${this.animationDuration}ms ${this.wordDelay * 3}ms forwards;
      }
      
      .fiEyesUI-rotatingText-word:nth-of-type(4) {
        animation: fiEyesUI-rotate-text-up ${this.animationDuration}ms ${this.wordDelay * 4}ms;
      }
      
      .fiEyesUI-rotatingText-word:nth-of-type(5) {
        animation: fiEyesUI-rotate-text-up ${this.animationDuration}ms ${this.wordDelay * 5}ms;
      }
      
      .fiEyesUI-rotatingText-word:nth-of-type(6) {
        animation: fiEyesUI-fade-text-in ${this.animationDuration}ms ${this.wordDelay * 6}ms forwards;
      }
      
      @keyframes fiEyesUI-rotate-text-up {
        0% {
          transform: translate3d(0, 80px, 0);
          opacity: 0;
        }
        20%, 80% {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
        100% {
          transform: translate3d(0, -40px, 0);
          opacity: 0;
        }
      }
      
      @keyframes fiEyesUI-fade-text-in {
        0% {
          opacity: 0;
          transform: translate3d(0, 80px, 0);
        }
        50%, 100% {
          opacity: 1;
          transform: translate3d(0, 0, 0);
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
