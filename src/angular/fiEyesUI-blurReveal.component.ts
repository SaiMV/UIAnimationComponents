import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUIBlurRevealConfig {
  text?: string;
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  letterDelay?: number;
  autoRepeat?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-blurReveal',
  template: `
    <div 
      #blurRevealContainer
      class="fiEyesUI-blurReveal-container"
      [style.font-size]="fontSize"
      [class]="className"
      [style]="style"
    ></div>
  `,
  styles: [`
    .fiEyesUI-blurReveal-container {
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
    }
  `]
})
export class FiEyesUIBlurRevealComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = 'Welcome To Finches Eyes UI Components';
  @Input() fontSize: string = '32px';
  @Input() color: string = '#ffffff';
  @Input() animationDuration: number = 550;
  @Input() letterDelay: number = 35;
  @Input() autoRepeat: boolean = true;
  @Input() repeatInterval: number = 2000;
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('blurRevealContainer') blurRevealContainerRef!: ElementRef<HTMLDivElement>;

  private fiEyesUIStyleElement?: HTMLStyleElement;
  private intervalRef?: NodeJS.Timeout;

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
    if (!this.blurRevealContainerRef?.nativeElement) return;

    const fiEyesUIContainer = this.blurRevealContainerRef.nativeElement;
    const fiEyesUIText = this.text;
    const fiEyesUICharacters = fiEyesUIText.split('');
    
    // Clear container
    fiEyesUIContainer.innerHTML = '';
    
    // Create styles dynamically
    this.fiEyesUICreateStyles();
    
    // Create spans for each character
    fiEyesUICharacters.forEach((fiEyesUIChar) => {
      const fiEyesUISpan = document.createElement('span');
      fiEyesUISpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
      fiEyesUIContainer.appendChild(fiEyesUISpan);
    });
    
    // Start animation
    this.fiEyesUIStartAnimation();
    
    // Start auto repeat if enabled
    if (this.autoRepeat) {
      this.fiEyesUIStartAutoRepeat();
    }
  }

  private fiEyesUIStartAnimation() {
    if (!this.blurRevealContainerRef?.nativeElement) return;
    
    const fiEyesUIContainer = this.blurRevealContainerRef.nativeElement;
    fiEyesUIContainer.classList.add('animate');
    
    // Calculate total animation time
    const totalTime = (this.text.length * this.letterDelay) + this.animationDuration;
    
    setTimeout(() => {
      this.complete.emit();
    }, totalTime);
  }

  private fiEyesUIStartAutoRepeat() {
    this.intervalRef = setInterval(() => {
      if (this.blurRevealContainerRef?.nativeElement) {
        this.blurRevealContainerRef.nativeElement.classList.remove('animate');
        setTimeout(() => {
          this.fiEyesUIStartAnimation();
        }, 100);
      }
    }, this.repeatInterval);
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-blurReveal-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-blurReveal-container {
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
      }
      
      .fiEyesUI-blurReveal-text {
        color: ${this.color};
        font-size: ${this.fontSize};
        text-align: center;
        font-family: 'Orbitron', sans-serif;
        font-weight: 600;
      }
      
      .fiEyesUI-blurReveal-text span {
        opacity: 0;
        transition: all ${this.animationDuration}ms ease;
        filter: blur(25px);
        transform: translateZ(0);
        display: inline-block;
      }
      
      .fiEyesUI-blurReveal-text.animate span {
        opacity: 1;
        filter: blur(0px);
      }
    `;
    
    // Add delay classes for each character
    const fiEyesUICharacters = this.text.split('');
    fiEyesUICharacters.forEach((_, index) => {
      const delay = this.letterDelay * (index + 1);
      this.fiEyesUIStyleElement!.textContent += `
        .fiEyesUI-blurReveal-text span:nth-child(${index + 1}) {
          transition-delay: ${delay}ms;
        }
      `;
    });
    
    document.head.appendChild(this.fiEyesUIStyleElement);
  }

  private fiEyesUICleanup() {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
  }
}
