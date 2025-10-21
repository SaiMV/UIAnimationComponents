import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUIFlyInOutConfig {
  text?: string;
  fontSize?: string;
  color?: string;
  animationDuration?: number;
  animationSpeed?: number;
}

@Component({
  selector: 'fiEyesUI-flyInOut',
  template: `
    <div 
      #flyInOutContainer
      class="fiEyesUI-flyInOut-container"
      [class]="className"
      [style]="style"
    >
      <div class="fiEyesUI-flyInOut-content">
        <p 
          #flyInOutTyper
          class="fiEyesUI-flyInOut-typer"
          [style.font-size]="fontSize"
          [style.color]="color"
        >
          {{ text }}
        </p>
      </div>
    </div>
  `,
  styles: [`
    .fiEyesUI-flyInOut-container {
      font-family: 'Orbitron', sans-serif;
      margin: 0 auto;
      position: relative;
      z-index: 2;
      display: table;
      width: 100%;
      background-color: #000000;
      color: #ffffff;
      padding: 20px;
      min-height: 120px;
    }

    .fiEyesUI-flyInOut-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .fiEyesUI-flyInOut-typer {
      display: table;
      text-align: center;
      vertical-align: middle;
      margin: 0 auto;
      padding: 15% 0;
      line-height: 3em;
      letter-spacing: 0.5em;
      text-transform: uppercase;
    }

    .fiEyesUI-flyInOut-typer i {
      display: inline-block;
      font-style: normal;
      padding: 0 0.25em;
      transform: scale(0);
      transition: all 1s ease;
    }

    .fiEyesUI-flyInOut-typer i.fiEyesUIFlyInOut {
      animation: fiEyesUIFlyInOut 4s infinite ease-in-out;
    }

    @keyframes fiEyesUIFlyInOut {
      0% {
        transform: scaleY(-3) translate3d(0, -300%, 0);
      }
      15%, 45% {
        color: rgba(255, 255, 255, 0.8);
        transform: scaleZ(1) translate3d(0, 10%, 0);
      }
      100% {
        color: rgba(236, 243, 186, 0.2);
        transform: scale3d(9);
      }
    }
  `]
})
export class FiEyesUIFlyInOutComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = 'Welcome To Finches Eyes UI Components';
  @Input() fontSize: string = '3em';
  @Input() color: string = '#ffffff';
  @Input() animationDuration: number = 4;
  @Input() animationSpeed: number = 100;
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() complete = new EventEmitter<void>();

  @ViewChild('flyInOutContainer') flyInOutContainerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('flyInOutTyper') flyInOutTyperRef!: ElementRef<HTMLParagraphElement>;

  private fiEyesUIAnimationTimeout?: number;

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
    if (!this.flyInOutTyperRef?.nativeElement) return;

    const fiEyesUIParagraph = this.flyInOutTyperRef.nativeElement;
    const fiEyesUIText = this.text;
    const fiEyesUICharacters = fiEyesUIText.length;
    let fiEyesUINewText = '';

    // Wrap each character in <i> tags
    for (let i = 0; i < fiEyesUICharacters; i += 1) {
      fiEyesUINewText += '<i>' + fiEyesUIText.charAt(i) + '</i>';
    }

    fiEyesUIParagraph.innerHTML = fiEyesUINewText;

    const fiEyesUIWrappedChars = fiEyesUIParagraph.getElementsByTagName('i');
    const fiEyesUIWrappedCharsLen = fiEyesUIWrappedChars.length;
    let j = 0;

    const fiEyesUIAddEffect = () => {
      this.fiEyesUIAnimationTimeout = window.setTimeout(() => {
        fiEyesUIWrappedChars[j].className = 'fiEyesUIFlyInOut';
        j += 1;
        if (j < fiEyesUIWrappedCharsLen) {
          fiEyesUIAddEffect();
        } else {
          // Animation completed
          setTimeout(() => {
            this.complete.emit();
          }, this.animationDuration * 1000);
        }
      }, this.animationSpeed);
    };

    fiEyesUIAddEffect();
  }

  private fiEyesUICleanup() {
    if (this.fiEyesUIAnimationTimeout) {
      clearTimeout(this.fiEyesUIAnimationTimeout);
    }
  }
}
