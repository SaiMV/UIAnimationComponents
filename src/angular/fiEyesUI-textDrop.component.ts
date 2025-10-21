import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUITextDropConfig {
  text?: string;
  fontSize?: string;
  color?: string;
  secondaryColor?: string;
  animationDuration?: number;
  delayRange?: { min: number; max: number };
}

@Component({
  selector: 'fiEyesUI-textDrop',
  template: `
    <div 
      #textDropContainer
      class="fiEyesUI-textDrop-container"
      [style.font-size]="fontSize"
      [class]="className"
      [style]="style"
    ></div>
  `,
  styles: [`
    .fiEyesUI-textDrop-container {
      font-family: 'Orbitron', sans-serif;
      font-weight: 400;
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
export class FiEyesUITextDropComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = 'Welcome To Finches Eyes UI Components';
  @Input() fontSize: string = '3em';
  @Input() color: string = '#ffffff';
  @Input() secondaryColor: string = '#ffffff';
  @Input() animationDuration: number = 1.2;
  @Input() delayRange: { min: number; max: number } = { min: 1, max: 9 };
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('textDropContainer') textDropContainerRef!: ElementRef<HTMLDivElement>;

  private fiEyesUIStyleElement?: HTMLStyleElement;

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
    if (!this.textDropContainerRef?.nativeElement) return;

    const fiEyesUIContainer = this.textDropContainerRef.nativeElement;
    const fiEyesUIText = this.text;
    const fiEyesUICharacters = fiEyesUIText.split('');
    
    // Clear container
    fiEyesUIContainer.innerHTML = '';
    
    // Create styles dynamically
    this.fiEyesUICreateStyles();
    
    // Create random delay function
    const fiEyesUIRandomDelay = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    let fiEyesUICharacterIndex = 0;
    const fiEyesUIMaxDelay = Math.max(...Array.from({length: fiEyesUICharacters.length}, (_, i) => 
      fiEyesUIRandomDelay(this.delayRange.min, this.delayRange.max)
    ));
    
    fiEyesUICharacters.forEach((fiEyesUIChar, fiEyesUIIndex) => {
      const fiEyesUIDelay = fiEyesUIRandomDelay(this.delayRange.min, this.delayRange.max);
      const fiEyesUISpan = document.createElement('span');
      
      fiEyesUISpan.className = `fiEyesUI-letterDrop fiEyesUI-ld${fiEyesUIDelay}`;
      fiEyesUISpan.style.color = this.color;
      
      // Add secondary color to even characters
      if (fiEyesUIIndex % 2 === 1) {
        fiEyesUISpan.classList.add('fiEyesUI-secondary');
      }
      
      fiEyesUISpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
      fiEyesUIContainer.appendChild(fiEyesUISpan);
      
      // Track completion
      fiEyesUICharacterIndex++;
      if (fiEyesUICharacterIndex === fiEyesUICharacters.length) {
        const fiEyesUIMaxAnimationTime = (fiEyesUIMaxDelay / 10) * 1000 + (this.animationDuration * 1000);
        setTimeout(() => {
          this.complete.emit();
        }, fiEyesUIMaxAnimationTime);
      }
    });
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-textDrop-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-letterDrop {
        position: relative;
        top: 0;
        display: inline-block;
        text-transform: uppercase;
        letter-spacing: 0.5em;
        opacity: 0.8;
        transform: rotateX(-90deg);
        animation: fiEyesUILetterDrop ${this.animationDuration}s ease 1 normal forwards;
      }
      
      .fiEyesUI-letterDrop.fiEyesUI-secondary {
        color: ${this.secondaryColor};
      }
      
      @keyframes fiEyesUILetterDrop {
        10% {
          opacity: 0.5;
        }
        20% {
          opacity: 0.8;
          top: 3.75em;
          transform: rotateX(-360deg);
        }
        100% {
          opacity: 1;
          top: 4.50em;
          transform: rotateX(360deg);
        }
      }
    `;
    
    // Add delay classes
    for (let i = this.delayRange.min; i <= this.delayRange.max; i++) {
      this.fiEyesUIStyleElement.textContent += `
        .fiEyesUI-ld${i} { 
          animation-delay: 1.${i}s; 
        }
      `;
    }
    
    document.head.appendChild(this.fiEyesUIStyleElement);
  }

  private fiEyesUICleanup() {
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
  }
}
