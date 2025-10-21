import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUITitleRevealConfig {
  title?: string;
  subtitle?: string;
  titleFontSize?: string;
  subtitleFontSize?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-titleReveal',
  template: `
    <div 
      #titleRevealContainer
      class="fiEyesUI-titleReveal-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-titleReveal-content">
        <h1>
          <span class="fiEyesUI-titleReveal-title">
            <!-- Letters will be dynamically inserted here -->
          </span>
          <br />
          <span class="fiEyesUI-titleReveal-subtitle">
            <!-- Subtitle will be dynamically inserted here -->
          </span>
        </h1>
      </div>
    </div>
  `,
  styles: [`
    .fiEyesUI-titleReveal-container {
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
export class FiEyesUITitleRevealComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() title: string = 'Welcome To Finches Eyes UI Components';
  @Input() subtitle: string = 'Elegance is an attitude';
  @Input() titleFontSize: string = 'calc(6vw + 1rem)';
  @Input() subtitleFontSize: string = 'calc(0.4vw + 0.5rem)';
  @Input() animationDuration: number = 500;
  @Input() autoPlay: boolean = true;
  @Input() repeatInterval: number = 4000;
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('titleRevealContainer') titleRevealContainerRef!: ElementRef<HTMLDivElement>;

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
    if (!this.titleRevealContainerRef?.nativeElement) return;

    const fiEyesUIContainer = this.titleRevealContainerRef.nativeElement;
    
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
    if (!this.titleRevealContainerRef?.nativeElement) return;
    
    const titleElement = this.titleRevealContainerRef.nativeElement.querySelector('.fiEyesUI-titleReveal-title');
    const subtitleElement = this.titleRevealContainerRef.nativeElement.querySelector('.fiEyesUI-titleReveal-subtitle');
    
    if (titleElement) {
      titleElement.innerHTML = '';
      const letters = this.title.split('');
      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.className = 'fiEyesUI-titleReveal-letter';
        span.id = `fiEyesUI-title-letter-${index}`;
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        titleElement.appendChild(span);
      });
    }
    
    if (subtitleElement) {
      subtitleElement.textContent = this.subtitle;
    }
  }

  private fiEyesUIStartAnimation() {
    if (!this.titleRevealContainerRef?.nativeElement) return;
    
    const letters = this.titleRevealContainerRef.nativeElement.querySelectorAll('.fiEyesUI-titleReveal-letter');
    const subtitleElement = this.titleRevealContainerRef.nativeElement.querySelector('.fiEyesUI-titleReveal-subtitle');
    
    // Reset all elements
    letters.forEach(letter => {
      letter.classList.remove('fiEyesUI-titleReveal-letter-animate', 'fiEyesUI-titleReveal-letter-fade');
    });
    if (subtitleElement) {
      subtitleElement.classList.remove('fiEyesUI-titleReveal-subtitle-animate');
    }
    
    // Animate letters
    setTimeout(() => {
      letters.forEach((letter: Element, index: number) => {
        setTimeout(() => {
          letter.classList.add('fiEyesUI-titleReveal-letter-animate');
        }, 50 * index);
        
        setTimeout(() => {
          letter.classList.add('fiEyesUI-titleReveal-letter-fade');
          
          if (index === letters.length - 1) {
            setTimeout(() => {
              if (subtitleElement) {
                subtitleElement.classList.add('fiEyesUI-titleReveal-subtitle-animate');
              }
              this.complete.emit();
            }, 60 * index + 100);
          }
        }, 60 * index);
      });
    }, 500);
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-titleReveal-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-titleReveal-container {
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
      
      .fiEyesUI-titleReveal-content {
        position: relative;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        margin: 0;
      }
      
      .fiEyesUI-titleReveal-title {
        font-weight: 700;
        display: inline-flex;
        margin: -5px;
        padding: 5px;
      }
      
      .fiEyesUI-titleReveal-letter {
        font-size: ${this.titleFontSize};
        margin-left: -2px;
        opacity: 0;
      }
      
      .fiEyesUI-titleReveal-subtitle {
        font-weight: 400;
        font-size: ${this.subtitleFontSize};
        letter-spacing: calc(0.3vw + 0.5rem);
        text-transform: uppercase;
        position: relative;
        top: -5px;
        opacity: 0;
      }
      
      .fiEyesUI-titleReveal-letter-animate {
        animation: fiEyesUI-titleReveal-slide ${this.animationDuration}ms ease-in-quad forwards;
      }
      
      .fiEyesUI-titleReveal-letter-fade {
        animation: fiEyesUI-titleReveal-fade ${this.animationDuration}ms ease-in-quad forwards;
      }
      
      .fiEyesUI-titleReveal-subtitle-animate {
        animation: fiEyesUI-titleReveal-subtitle-fade 300ms ease-in-quad forwards;
      }
      
      @keyframes fiEyesUI-titleReveal-slide {
        from {
          transform: translateX(5px);
        }
        to {
          transform: translateX(0);
        }
      }
      
      @keyframes fiEyesUI-titleReveal-fade {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes fiEyesUI-titleReveal-subtitle-fade {
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
