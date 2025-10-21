import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

export interface FiEyesUIHoverFillConfig {
  text?: string;
  fontSize?: string;
  color?: string;
  hoverColor?: string;
}

@Component({
  selector: 'fiEyesUI-hoverFill',
  template: `
    <div 
      #hoverFillContainer
      class="fiEyesUI-hoverFill-container"
      [class]="className"
      [style]="style"
    >
      <a 
        href="#" 
        class="fiEyesUI-hoverFill-link"
        (click)="onClick($event)"
      >
        {{ text }}
        <span 
          class="fiEyesUI-hoverFill-link-layer" 
          [attr.data-text]="text"
        ></span>
      </a>
    </div>
  `,
  styles: [`
    .fiEyesUI-hoverFill-container {
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
export class FiEyesUIHoverFillComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() text: string = 'Welcome To Finches Eyes UI Components';
  @Input() fontSize: string = '24px';
  @Input() color: string = '#ffffff';
  @Input() hoverColor: string = '#ffffff';
  @Input() className: string = '';
  @Input() style: any = {};

  @Output() click = new EventEmitter<void>();

  @ViewChild('hoverFillContainer') hoverFillContainerRef!: ElementRef<HTMLDivElement>;

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

  onClick(event: Event) {
    event.preventDefault();
    this.click.emit();
  }

  private fiEyesUIInitializeAnimation() {
    if (!this.hoverFillContainerRef?.nativeElement) return;

    // Create styles dynamically
    this.fiEyesUICreateStyles();
  }

  private fiEyesUICreateStyles() {
    const fiEyesUIStyleId = 'fiEyesUI-hoverFill-styles';
    this.fiEyesUIStyleElement = document.getElementById(fiEyesUIStyleId) as HTMLStyleElement;
    
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
    
    this.fiEyesUIStyleElement = document.createElement('style');
    this.fiEyesUIStyleElement.id = fiEyesUIStyleId;
    this.fiEyesUIStyleElement.textContent = `
      .fiEyesUI-hoverFill-container {
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
      
      .fiEyesUI-hoverFill-link {
        color: ${this.color};
        position: relative;
        display: inline-block;
        text-decoration: none;
        font-size: ${this.fontSize};
        font-family: 'Orbitron', sans-serif;
        transition: color 0.3s;
        overflow: hidden;
        cursor: pointer;
      }
      
      .fiEyesUI-hoverFill-link-layer {
        position: absolute;
        left: 0;
        top: 0;
        height: inherit;
        overflow: hidden;
        transform: translate3d(-100%, 0, 0);
        animation: fiEyesUI-hoverFill-out-layer 0.3s ease-out;
      }
      
      .fiEyesUI-hoverFill-link-layer:before {
        content: attr(data-text);
        transform: translate3d(100%, 0, 0);
        color: ${this.hoverColor};
        animation: fiEyesUI-hoverFill-out-text 0.3s ease-out;
        display: block;
        backface-visibility: hidden;
      }
      
      .fiEyesUI-hoverFill-link:hover .fiEyesUI-hoverFill-link-layer {
        animation: fiEyesUI-hoverFill-in-layer 0.3s ease forwards;
      }
      
      .fiEyesUI-hoverFill-link:hover .fiEyesUI-hoverFill-link-layer:before {
        animation: fiEyesUI-hoverFill-in-text 0.3s ease forwards;
      }
      
      @keyframes fiEyesUI-hoverFill-in-text {
        0% {
          transform: translate3d(100%, 0, 0);
        }
        to {
          transform: translateZ(0);
        }
      }
      
      @keyframes fiEyesUI-hoverFill-in-layer {
        0% {
          transform: translate3d(-100%, 0, 0);
        }
        to {
          transform: translateZ(0);
        }
      }
      
      @keyframes fiEyesUI-hoverFill-out-text {
        0% {
          transform: translateZ(0);
        }
        to {
          transform: translate3d(-100%, 0, 0);
        }
      }
      
      @keyframes fiEyesUI-hoverFill-out-layer {
        0% {
          transform: translateZ(0);
        }
        to {
          transform: translate3d(100%, 0, 0);
        }
      }
    `;
    
    document.head.appendChild(this.fiEyesUIStyleElement);
  }

  private fiEyesUICleanup() {
    if (this.fiEyesUIStyleElement) {
      this.fiEyesUIStyleElement.remove();
    }
  }
}
