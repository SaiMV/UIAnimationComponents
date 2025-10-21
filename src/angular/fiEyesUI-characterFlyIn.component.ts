import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUICharacterFlyInConfig {
  text?: string;
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  startDelay?: number;
  autoPlay?: boolean;
  repeatInterval?: number;
}

@Component({
  selector: 'fiEyesUI-characterFlyIn',
  template: `
    <div 
      #characterFlyInContainer
      class="fiEyesUI-characterFlyIn-container"
      [style.font-size]="fontSize"
      [class]="className"
      [style]="style"
    >
      <ul class="fiEyesUI-characterFlyIn-list fiEyesUI-hidden"></ul>
    </div>
  `,
  styles: [`
    .fiEyesUI-characterFlyIn-container {
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
export class FiEyesUICharacterFlyInComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = 'Welcome To Finches Eyes UI Components';
  @Input() fontSize: string = '32px';
  @Input() color: string = '#ffffff';
  @Input() animationDuration: number = 2800;
  @Input() startDelay: number = 700;
  @Input() autoPlay: boolean = true;
  @Input() repeatInterval: number = 5000;
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('characterFlyInContainer') characterFlyInContainerRef!: ElementRef<HTMLDivElement>;

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
    if (!this.characterFlyInContainerRef?.nativeElement) return;

    const fiEyesUIContainer = this.characterFlyInContainerRef.nativeElement;
    
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
    if (!this.characterFlyInContainerRef?.nativeElement) return;
    
    const fiEyesUIContainer = this.characterFlyInContainerRef.nativeElement;
    const fiEyesUIListDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterFlyIn-list');
    if (!fiEyesUIListDiv) return;
    
    fiEyesUIListDiv.innerHTML = '';
    
    const fiEyesUICharacters = this.text.split('');
    fiEyesUICharacters.forEach((fiEyesUIChar) => {
      const fiEyesUICharacterDiv = document.createElement('li');
      fiEyesUICharacterDiv.className = 'fiEyesUI-characterFlyIn-character';
      fiEyesUICharacterDiv.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
      fiEyesUIListDiv.appendChild(fiEyesUICharacterDiv);
    });
  }

  private fiEyesUIStartAnimation() {
    if (!this.characterFlyInContainerRef?.nativeElement) return;
    
    const fiEyesUIContainer = this.characterFlyInContainerRef.nativeElement;
    this.fiEyesUICreateCharacters();
    
    const fiEyesUIListDiv = fiEyesUIContainer.querySelector('.fiEyesUI-characterFlyIn-list');
    if (!fiEyesUIListDiv) return;
    
    // Add hidden class initially
    fiEyesUIListDiv.classList.add('fiEyesUI-hidden');
    
    // Remove hidden class after delay to start animation
    setTimeout(() => {
      fiEyesUIListDiv.classList.remove('fiEyesUI-hidden');
      
      // Calculate total animation time
      const totalTime = this.startDelay + this.animationDuration;
      
      setTimeout(() => {
        this.complete.emit();
      }, totalTime);
    }, this.startDelay);
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-characterFlyIn-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-characterFlyIn-container {
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
      
      .fiEyesUI-characterFlyIn-list {
        position: absolute;
        left: 50%;
        top: 50%;
        list-style: none;
        transform: translateX(-50%) translateY(-50%);
        margin: 0;
        padding: 0;
      }
      
      .fiEyesUI-characterFlyIn-character {
        display: inline-block;
        margin-right: 30px;
        font-family: 'Orbitron', sans-serif;
        font-weight: 300;
        font-size: ${this.fontSize};
        color: ${this.color};
        opacity: 1;
        transition: all ${this.animationDuration}ms cubic-bezier(0.6, -.005, 0.32, 1.75);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character {
        opacity: 0;
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(1) {
        transform: translateX(150px) translateY(-170px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(2) {
        transform: translateX(-210px) translateY(170px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(3) {
        transform: translateX(20px) translateY(-100px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(4) {
        transform: translateX(-100px) translateY(-20px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(5) {
        transform: translateX(-70px) translateY(-200px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(6) {
        transform: translateX(200px) translateY(70px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(7) {
        transform: translateX(30px) translateY(200px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(8) {
        transform: translateX(30px) translateY(-100px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(9) {
        transform: translateX(100px) translateY(-170px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(10) {
        transform: translateX(-100px) translateY(50px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(11) {
        transform: translateX(-550px) translateY(120px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(12) {
        transform: translateX(-40px) translateY(-50px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(13) {
        transform: translateX(150px) translateY(-170px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(14) {
        transform: translateX(-210px) translateY(170px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(15) {
        transform: translateX(20px) translateY(-100px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(16) {
        transform: translateX(-100px) translateY(-20px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(17) {
        transform: translateX(-70px) translateY(-200px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(18) {
        transform: translateX(200px) translateY(70px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(19) {
        transform: translateX(30px) translateY(200px);
      }
      
      .fiEyesUI-characterFlyIn-list.fiEyesUI-hidden .fiEyesUI-characterFlyIn-character:nth-child(20) {
        transform: translateX(30px) translateY(-100px);
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
