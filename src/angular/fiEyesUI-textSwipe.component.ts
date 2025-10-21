import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUITextSwipeConfig {
  text?: string;
  fontSize?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-textSwipe',
  template: `
    <div 
      #textSwipeContainer
      class="fiEyesUI-textSwipe-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-textSwipe-content">
        <!-- Letters will be dynamically inserted here -->
      </div>
    </div>
  `,
  styles: [`
    .fiEyesUI-textSwipe-container {
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
export class FiEyesUITextSwipeComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = 'Welcome To Finches Eyes UI Components';
  @Input() fontSize: string = '48px';
  @Input() animationDuration: number = 1000;
  @Input() autoPlay: boolean = true;
  @Input() repeatInterval: number = 2000;
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('textSwipeContainer') textSwipeContainerRef!: ElementRef<HTMLDivElement>;

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
    if (!this.textSwipeContainerRef?.nativeElement) return;

    const fiEyesUIContainer = this.textSwipeContainerRef.nativeElement;
    
    // Create styles dynamically
    this.fiEyesUICreateStyles();
    
    // Initialize text with individual letters
    this.fiEyesUIInitializeText();
    
    if (this.autoPlay) {
      this.fiEyesUIStartAnimation();
      
      // Set up interval for auto-repeat
      this.intervalId = window.setInterval(() => {
        this.fiEyesUIStartAnimation();
      }, this.repeatInterval) as unknown as number;
    }
  }

  private fiEyesUIInitializeText() {
    if (!this.textSwipeContainerRef?.nativeElement) return;
    
    const fiEyesUIContentElement = this.textSwipeContainerRef.nativeElement.querySelector('.fiEyesUI-textSwipe-content');
    if (fiEyesUIContentElement) {
      fiEyesUIContentElement.innerHTML = '';
      
      const letters = this.text.split('');
      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.className = 'fiEyesUI-textSwipe-letter';
        span.id = `fiEyesUI-letter-${index}`;
        span.textContent = letter;
        fiEyesUIContentElement.appendChild(span);
      });
    }
  }

  private fiEyesUIStartAnimation() {
    if (!this.textSwipeContainerRef?.nativeElement) return;
    
    const letters = this.textSwipeContainerRef.nativeElement.querySelectorAll('.fiEyesUI-textSwipe-letter');
    const textLength = letters.length - 1;
    
    letters.forEach((element: Element, index: number) => {
      setTimeout(() => {
        element.classList.toggle('fiEyesUI-textSwipe-opaque');
        
        if (index === textLength) {
          setTimeout(() => {
            this.complete.emit();
          }, this.animationDuration);
        }
      }, (index + (textLength / 2)) * 10 * (100 / textLength));
    });
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-textSwipe-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-textSwipe-container {
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
      
      .fiEyesUI-textSwipe-content {
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
        color: rgba(255, 255, 255, 0.2);
        margin: auto;
      }
      
      .fiEyesUI-textSwipe-letter {
        display: inline-block;
        position: relative;
        transform-origin: 50% 50%;
        transition: all 0.5s ease;
      }
      
      .fiEyesUI-textSwipe-opaque {
        animation: fiEyesUI-textSwipe-opacity ${this.animationDuration}ms linear;
      }
      
      @keyframes fiEyesUI-textSwipe-opacity {
        0% {
          color: rgba(255, 255, 255, 0.2);
        }
        50% {
          color: rgba(255, 255, 255, 1);
        }
        100% {
          color: rgba(255, 255, 255, 0.2);
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
