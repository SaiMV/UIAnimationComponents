import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUILetterBounceConfig {
  text?: string;
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  letterDelay?: number;
  loop?: boolean;
  direction?: 'normal' | 'reverse' | 'alternate';
  easing?: string;
}

@Component({
  selector: 'fiEyesUI-letterBounce',
  template: `
    <div 
      #letterBounceContainer
      class="fiEyesUI-letterBounce-container"
      [style.font-size]="fontSize"
      [class]="className"
      [style]="style"
    ></div>
  `,
  styles: [`
    .fiEyesUI-letterBounce-container {
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
export class FiEyesUILetterBounceComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = 'Welcome To Finches Eyes UI Components';
  @Input() fontSize: string = '4rem';
  @Input() color: string = '#ffffff';
  @Input() animationDuration: number = 800;
  @Input() letterDelay: number = 80;
  @Input() loop: boolean = true;
  @Input() direction: 'normal' | 'reverse' | 'alternate' = 'alternate';
  @Input() easing: string = 'easeInBounce';
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('letterBounceContainer') letterBounceContainerRef!: ElementRef<HTMLDivElement>;

  private fiEyesUIStyleElement?: HTMLStyleElement;
  private animationTimeout?: NodeJS.Timeout;

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
    if (!this.letterBounceContainerRef?.nativeElement) return;

    const fiEyesUIContainer = this.letterBounceContainerRef.nativeElement;
    const fiEyesUIText = this.text;
    const fiEyesUICharacters = fiEyesUIText.split('');
    
    // Clear container
    fiEyesUIContainer.innerHTML = '';
    
    // Create styles dynamically
    this.fiEyesUICreateStyles();
    
    // Create name container
    const fiEyesUINameDiv = document.createElement('div');
    fiEyesUINameDiv.className = 'fiEyesUI-letterBounce-name';
    
    // Create letter divs for each character
    fiEyesUICharacters.forEach((fiEyesUIChar) => {
      const fiEyesUILetterDiv = document.createElement('div');
      fiEyesUILetterDiv.className = 'fiEyesUI-letterBounce-letter';
      fiEyesUILetterDiv.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
      fiEyesUINameDiv.appendChild(fiEyesUILetterDiv);
    });
    
    fiEyesUIContainer.appendChild(fiEyesUINameDiv);
    
    // Start animation
    this.fiEyesUIStartAnimation();
  }

  private fiEyesUIStartAnimation() {
    if (!this.letterBounceContainerRef?.nativeElement) return;
    
    const fiEyesUIContainer = this.letterBounceContainerRef.nativeElement;
    const fiEyesUILetters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-letterBounce-letter');
    
    // Animate each letter with delay
    fiEyesUILetters.forEach((fiEyesUILetter, fiEyesUIIndex) => {
      setTimeout(() => {
        (fiEyesUILetter as HTMLElement).style.opacity = '1';
        (fiEyesUILetter as HTMLElement).style.transform = 'scale(1)';
        (fiEyesUILetter as HTMLElement).style.transition = `all ${this.animationDuration}ms ${this.easing}`;
      }, fiEyesUIIndex * this.letterDelay);
    });
    
    // Calculate total animation time
    const totalTime = (this.text.length * this.letterDelay) + this.animationDuration;
    
    this.animationTimeout = setTimeout(() => {
      this.complete.emit();
      
      // If loop is enabled, restart animation
      if (this.loop) {
        setTimeout(() => {
          this.fiEyesUIResetAndRestart();
        }, 1000);
      }
    }, totalTime);
  }

  private fiEyesUIResetAndRestart() {
    if (!this.letterBounceContainerRef?.nativeElement) return;
    
    const fiEyesUIContainer = this.letterBounceContainerRef.nativeElement;
    const fiEyesUILetters = fiEyesUIContainer.querySelectorAll('.fiEyesUI-letterBounce-letter');
    
    fiEyesUILetters.forEach((fiEyesUILetter) => {
      (fiEyesUILetter as HTMLElement).style.opacity = '0';
      (fiEyesUILetter as HTMLElement).style.transform = 'scale(0.9)';
    });
    
    setTimeout(() => {
      this.fiEyesUIStartAnimation();
    }, 100);
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-letterBounce-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-letterBounce-container {
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
      
      .fiEyesUI-letterBounce-container:before {
        content: '';
        width: 100%;
        background: ${this.color};
        opacity: 0.3;
        bottom: 0;
        height: 1px;
        left: 0;
        position: absolute;
      }
      
      .fiEyesUI-letterBounce-name {
        display: flex;
        margin: auto;
        padding: 0 1rem 1rem;
        position: relative;
      }
      
      .fiEyesUI-letterBounce-letter {
        display: inline-block;
        opacity: 0;
        transform: scale(0.9);
        color: ${this.color};
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
        font-weight: 600;
      }
    `;
    
    document.head.appendChild(this.fiEyesUIStyleElement);
  }

  private fiEyesUICleanup() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
  }
}
