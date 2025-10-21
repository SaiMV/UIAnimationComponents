import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUICharacterGlowConfig {
  text?: string;
  fontSize?: string;
  color?: string;
  glowColor?: string;
  animationDuration?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-characterGlow',
  template: `
    <div 
      #characterGlowContainer
      class="fiEyesUI-characterGlow-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-characterGlow-content"></div>
    </div>
  `,
  styles: [`
    .fiEyesUI-characterGlow-container {
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
export class FiEyesUICharacterGlowComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = 'Welcome To Finches Eyes UI Components';
  @Input() fontSize: string = '80px';
  @Input() color: string = '#ffffff';
  @Input() glowColor: string = '#00bbff';
  @Input() animationDuration: number = 2250;
  @Input() autoPlay: boolean = true;
  @Input() repeatInterval: number = 3000;
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('characterGlowContainer') characterGlowContainerRef!: ElementRef<HTMLDivElement>;

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
    if (!this.characterGlowContainerRef?.nativeElement) return;

    const fiEyesUIContainer = this.characterGlowContainerRef.nativeElement;
    
    // Create styles dynamically
    this.fiEyesUICreateStyles();
    
    // Create character elements
    this.fiEyesUICreateCharacters();
    
    if (this.autoPlay) {
      this.fiEyesUIStartAnimation();
      
      // Set up interval for auto-repeat
      this.intervalId = window.setInterval(() => {
        this.fiEyesUIStartAnimation();
      }, this.repeatInterval) as unknown as number;
    }
  }

  private fiEyesUICreateCharacters() {
    if (!this.characterGlowContainerRef?.nativeElement) return;
    
    const fiEyesUIContainer = this.characterGlowContainerRef.nativeElement;
    const fiEyesUIContentDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterGlow-content');
    if (!fiEyesUIContentDiv) return;
    
    fiEyesUIContentDiv.innerHTML = '';
    
    const fiEyesUICharacters = this.text.split('');
    fiEyesUICharacters.forEach((fiEyesUIChar) => {
      const fiEyesUICharacterSpan = document.createElement('span');
      fiEyesUICharacterSpan.className = 'fiEyesUI-characterGlow-character';
      fiEyesUICharacterSpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
      fiEyesUIContentDiv.appendChild(fiEyesUICharacterSpan);
    });
  }

  private fiEyesUIStartAnimation() {
    if (!this.characterGlowContainerRef?.nativeElement) return;
    
    this.fiEyesUICreateCharacters();
    
    // Calculate total animation time
    setTimeout(() => {
      this.complete.emit();
    }, this.animationDuration);
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-characterGlow-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-characterGlow-container {
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
      
      .fiEyesUI-characterGlow-content {
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .fiEyesUI-characterGlow-character {
        display: block;
        float: left;
        animation: fiEyesUI-character-glow ${this.animationDuration}ms linear infinite;
        margin: 0 5px;
        padding: 0;
        position: relative;
        color: #111;
      }
      
      .fiEyesUI-characterGlow-character:nth-child(1) {
        animation-delay: 0s;
      }
      .fiEyesUI-characterGlow-character:nth-child(2) {
        animation-delay: 0.25s;
      }
      .fiEyesUI-characterGlow-character:nth-child(3) {
        animation-delay: 0.5s;
      }
      .fiEyesUI-characterGlow-character:nth-child(4) {
        animation-delay: 0.75s;
      }
      .fiEyesUI-characterGlow-character:nth-child(5) {
        animation-delay: 1s;
      }
      .fiEyesUI-characterGlow-character:nth-child(6) {
        animation-delay: 1.25s;
      }
      .fiEyesUI-characterGlow-character:nth-child(7) {
        animation-delay: 1.5s;
      }
      .fiEyesUI-characterGlow-character:nth-child(8) {
        animation-delay: 1.75s;
      }
      .fiEyesUI-characterGlow-character:nth-child(9) {
        animation-delay: 2s;
      }
      .fiEyesUI-characterGlow-character:nth-child(10) {
        animation-delay: 2.25s;
      }
      .fiEyesUI-characterGlow-character:nth-child(11) {
        animation-delay: 2.5s;
      }
      .fiEyesUI-characterGlow-character:nth-child(12) {
        animation-delay: 2.75s;
      }
      .fiEyesUI-characterGlow-character:nth-child(13) {
        animation-delay: 3s;
      }
      .fiEyesUI-characterGlow-character:nth-child(14) {
        animation-delay: 3.25s;
      }
      .fiEyesUI-characterGlow-character:nth-child(15) {
        animation-delay: 3.5s;
      }
      .fiEyesUI-characterGlow-character:nth-child(16) {
        animation-delay: 3.75s;
      }
      .fiEyesUI-characterGlow-character:nth-child(17) {
        animation-delay: 4s;
      }
      .fiEyesUI-characterGlow-character:nth-child(18) {
        animation-delay: 4.25s;
      }
      .fiEyesUI-characterGlow-character:nth-child(19) {
        animation-delay: 4.5s;
      }
      .fiEyesUI-characterGlow-character:nth-child(20) {
        animation-delay: 4.75s;
      }
      
      @keyframes fiEyesUI-character-glow {
        0%, 100% {
          color: ${this.color};
          filter: blur(2px);
          text-shadow: 0 0 10px ${this.glowColor},
            0 0 20px ${this.glowColor},
            0 0 40px ${this.glowColor},
            0 0 80px ${this.glowColor},
            0 0 120px ${this.glowColor},
            0 0 200px ${this.glowColor},
            0 0 300px ${this.glowColor},
            0 0 400px ${this.glowColor};
        }
        5%, 95% {
          color: #111;
          filter: blur(0px);
          text-shadow: none;
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
