// Demo Application for FinchesEye Animation Library
class AnimationDemo {
    constructor() {
        this.currentFramework = 'react';
        this.currentCategory = 'all';
        
        // Responsive text sizing configuration
        this.textSizingConfig = {
            minFontSize: 0.8,      // Minimum font size in rem
            maxFontSize: 4,        // Maximum font size in rem
            baseFontSize: 1.5,     // Base font size in rem
            minContainerSize: 120,  // Minimum container size in pixels
            maxContainerSize: 600,  // Maximum container size in pixels
            scalingFactor: 0.8     // How much font size scales with container size
        };
        
        this.animations = [
            {
                name: 'fadeIn',
                title: 'Fade In',
                description: 'Smoothly fades in an element from transparent to opaque',
                duration: 500,
                easing: 'ease-out',
                category: 'other',
                category: 'other'
            },
            {
                name: 'fadeOut',
                title: 'Fade Out',
                description: 'Smoothly fades out an element from opaque to transparent',
                duration: 500,
                easing: 'ease-in',
                category: 'other'
            },
            {
                name: 'slideInUp',
                title: 'Slide In Up',
                description: 'Slides an element in from the bottom',
                duration: 600,
                easing: 'ease-out',
                category: 'other'
            },
            {
                name: 'slideInDown',
                title: 'Slide In Down',
                description: 'Slides an element in from the top',
                duration: 600,
                easing: 'ease-out',
                category: 'other'
            },
            {
                name: 'slideInLeft',
                title: 'Slide In Left',
                description: 'Slides an element in from the left side',
                duration: 600,
                easing: 'ease-out',
                category: 'other'
            },
            {
                name: 'slideInRight',
                title: 'Slide In Right',
                description: 'Slides an element in from the right side',
                duration: 600,
                easing: 'ease-out',
                category: 'other'
            },
            {
                name: 'zoomIn',
                title: 'Zoom In',
                description: 'Scales an element from 0 to 1 with fade effect',
                duration: 500,
                easing: 'ease-out',
                category: 'other'
            },
            {
                name: 'zoomOut',
                title: 'Zoom Out',
                description: 'Scales an element from 1 to 0 with fade effect',
                duration: 500,
                easing: 'ease-in',
                category: 'other'
            },
            {
                name: 'bounce',
                title: 'Bounce',
                description: 'Creates a bouncing effect with multiple bounces',
                duration: 1000,
                easing: 'ease-out',
                category: 'other'
            },
            {
                name: 'shake',
                title: 'Shake',
                description: 'Creates a shaking effect for attention',
                duration: 500,
                easing: 'ease-in-out'
            },
            {
                name: 'pulse',
                title: 'Pulse',
                description: 'Continuously pulses the element (infinite)',
                duration: 1000,
                easing: 'ease-in-out',
                infinite: true
            },
            {
                name: 'rotate',
                title: 'Rotate',
                description: 'Continuously rotates the element (infinite)',
                duration: 1000,
                easing: 'linear',
                category: 'other',
                infinite: true
            },
            {
                name: 'textDrop',
                title: 'Text Drop',
                description: 'Letters drop down with 3D rotation effect',
                duration: 1200,
                easing: 'ease',
                type: 'text',
                category: 'text'
            },
            {
                name: 'flyInOut',
                title: 'Fly In Out',
                description: 'Letters fly in and out with 3D rotation effect',
                duration: 4000,
                easing: 'ease-in-out',
                type: 'text',
                category: 'text'
            },
            {
                name: 'blurReveal',
                title: 'Blur Reveal',
                description: 'Letters reveal with blur effect and auto-repeat',
                duration: 550,
                easing: 'ease',
                type: 'text',
                category: 'text'
            },
            {
                name: 'letterBounce',
                title: 'Letter Bounce',
                description: 'Letters bounce in with scale effect and alternating direction',
                duration: 800,
                easing: 'easeInBounce',
                type: 'text',
                category: 'text'
            },
            {
                name: 'textScale',
                title: 'Text Scale',
                description: 'Text characters scale up and down with bouncing effect',
                duration: 1500,
                easing: 'linear',
                category: 'other',
                type: 'text',
                category: 'text'
            },
            {
                name: 'rotatingText',
                title: 'Rotating Text',
                description: 'Words rotate up and fade in with staggered timing',
                duration: 1500,
                easing: 'ease',
                type: 'text',
                category: 'text'
            },
            {
                name: 'characterFlyIn',
                title: 'Character Fly In',
                description: 'Characters fly in from different positions with smooth transitions',
                duration: 2800,
                easing: 'cubic-bezier',
                type: 'text',
                category: 'text'
            },
            {
                name: 'textReveal',
                title: 'Text Reveal',
                description: 'Text reveals with expanding letter spacing and color transition',
                duration: 2500,
                easing: 'ease',
                type: 'text',
                category: 'text'
            },
            {
                name: 'characterGlow',
                title: 'Character Glow',
                description: 'Characters glow with neon effect and staggered timing',
                duration: 2250,
                easing: 'linear',
                category: 'other',
                type: 'text',
                category: 'text'
            },
            {
                name: 'textStroke',
                title: 'Text Stroke',
                description: 'Liquid-like text effect with stroke and clipping animation',
                duration: 4000,
                easing: 'ease-in-out',
                type: 'text',
                category: 'text'
            },
            {
                name: 'typewriter',
                title: 'Typewriter',
                description: 'Classic typewriter effect with blinking cursor',
                duration: 5000,
                easing: 'steps',
                type: 'text',
                category: 'text'
            },
            {
                name: 'fadeIn',
                title: 'Fade In',
                description: 'Simple fade-in effect for text appearance',
                duration: 7000,
                easing: 'ease',
                type: 'text',
                category: 'text'
            },
            {
                name: 'gradientText',
                title: 'Gradient Text',
                description: 'Colorful gradient text with animated background position',
                duration: 2000,
                easing: 'linear',
                category: 'other',
                type: 'text',
                category: 'text'
            },
            {
                name: 'resizeEffect',
                title: 'Resize Effect',
                description: 'Text that resizes with font weight and opacity changes',
                duration: 5000,
                easing: 'alternate',
                type: 'text',
                category: 'text'
            },
            {
                name: 'textScaleBounce',
                title: 'Text Scale Bounce',
                description: 'Text that scales with bouncing effects and font size changes',
                duration: 1500,
                easing: 'linear',
                category: 'other',
                type: 'text',
                category: 'text'
            },
            {
                name: 'textSwipe',
                title: 'Text Swipe',
                description: 'Text with individual letters that swipe with opacity changes',
                duration: 1000,
                easing: 'linear',
                category: 'other',
                type: 'text',
                category: 'text'
            },
            {
                name: 'hoverFill',
                title: 'Hover Fill',
                description: 'Interactive text with hover fill effect',
                duration: 300,
                easing: 'ease',
                type: 'text',
                category: 'text'
            },
            {
                name: 'titleReveal',
                title: 'Title Reveal',
                description: 'Title and subtitle with staggered letter reveal animation',
                duration: 500,
                easing: 'ease-in-quad',
                type: 'text',
                category: 'text'
            },
            {
                name: 'wavyText',
                title: 'Wavy Text',
                description: 'Text with wavy bouncing animation effect',
                duration: 1500,
                easing: 'ease-in-out',
                type: 'text',
                category: 'text'
            },
            {
                name: 'slideLeft',
                title: 'Slide Left',
                description: 'Text slides in from the right with staggered letter animation',
                duration: 1500,
                easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
                type: 'text',
                category: 'text'
            },
            {
                name: 'slideReveal',
                title: 'Slide Reveal',
                description: 'Text slides in with masking reveal effect',
                duration: 1100,
                easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.10)',
                type: 'text',
                category: 'text'
            },
            {
                name: 'textEffect1',
                title: 'Text Effect 1',
                description: 'Scale and shadow animation effect',
                duration: 2000,
                easing: 'linear',
                category: 'other',
                type: 'text',
                category: 'text'
            },
            {
                name: 'textEffect2',
                title: 'Text Effect 2',
                description: '3D rotation hover effect',
                duration: 1000,
                easing: 'linear',
                category: 'other',
                type: 'text',
                category: 'text'
            },
            {
                name: 'textEffect3',
                title: 'Text Effect 3',
                description: 'Scroll-triggered gradient reveal effect',
                duration: 1000,
                easing: 'linear',
                category: 'other',
                type: 'text',
                category: 'text'
            },
            {
                name: 'textEffect4',
                title: 'Text Effect 4',
                description: 'Blur and translate hover effect',
                duration: 1000,
                easing: 'linear',
                category: 'other',
                type: 'text',
                category: 'text'
            },
            {
                name: 'textEffect5',
                title: 'Text Effect 5',
                description: 'Click-to-disintegrate effect',
                duration: 1000,
                easing: 'linear',
                category: 'other',
                type: 'text',
                category: 'text'
            },
            {
                name: 'textEffect6',
                title: 'Text Effect 6',
                description: 'Scroll and hover font weight effect',
                duration: 1000,
                easing: 'ease',
                type: 'text',
                category: 'text'
            },
            {
                name: 'textEffect7',
                title: 'Text Effect 7',
                description: 'Glowing text shadow effect',
                duration: 1000,
                easing: 'ease',
                type: 'text',
                category: 'text'
            },
            {
                name: 'iconSpin',
                title: 'Icon Spin',
                description: 'Icon rotates continuously with smooth animation',
                duration: 2000,
                easing: 'linear',
                infinite: true,
                category: 'icon'
            },
            {
                name: 'iconBounce',
                title: 'Icon Bounce',
                description: 'Icon bounces up and down with elastic effect',
                duration: 1000,
                easing: 'ease-in-out',
                infinite: true,
                category: 'icon'
            },
            {
                name: 'iconPulse',
                title: 'Icon Pulse',
                description: 'Icon pulses with scale animation',
                duration: 1500,
                easing: 'ease-in-out',
                infinite: true,
                category: 'icon'
            },
            {
                name: 'iconWiggle',
                title: 'Icon Wiggle',
                description: 'Icon wiggles left and right with rotation',
                duration: 500,
                easing: 'ease-in-out',
                infinite: true,
                category: 'icon'
            },
            {
                name: 'iconShake',
                title: 'Icon Shake',
                description: 'Icon shakes horizontally with quick movements',
                duration: 600,
                easing: 'ease-in-out',
                infinite: true,
                category: 'icon'
            }
        ];

        this.init();
    }

    // Responsive text sizing utility function
    calculateResponsiveFontSize(container, userFontSize = null) {
        // If user provided a fixed font size, use that
        if (userFontSize) {
            return userFontSize;
        }

        // Get container dimensions
        const rect = container.getBoundingClientRect();
        const containerWidth = rect.width;
        const containerHeight = rect.height;
        
        // Use the smaller dimension to ensure text fits
        const containerSize = Math.min(containerWidth, containerHeight);
        
        // Calculate responsive font size based on container size
        const { minFontSize, maxFontSize, baseFontSize, minContainerSize, maxContainerSize, scalingFactor } = this.textSizingConfig;
        
        // Normalize container size between 0 and 1
        const normalizedSize = Math.max(0, Math.min(1, 
            (containerSize - minContainerSize) / (maxContainerSize - minContainerSize)
        ));
        
        // Calculate font size with scaling factor
        const calculatedSize = baseFontSize + (normalizedSize * scalingFactor * (maxFontSize - baseFontSize));
        
        // Clamp between min and max
        const finalSize = Math.max(minFontSize, Math.min(maxFontSize, calculatedSize));
        
        return `${finalSize}rem`;
    }

    // Apply responsive font size to text elements
    applyResponsiveFontSize(container, textSelector, userFontSize = null) {
        const textElements = container.querySelectorAll(textSelector);
        const fontSize = this.calculateResponsiveFontSize(container, userFontSize);
        
        textElements.forEach(element => {
            element.style.fontSize = fontSize;
        });
        
        // Set up resize observer for dynamic resizing
        if (!container.hasAttribute('data-resize-observer')) {
            container.setAttribute('data-resize-observer', 'true');
            const resizeObserver = new ResizeObserver(() => {
                const newFontSize = this.calculateResponsiveFontSize(container, userFontSize);
                textElements.forEach(element => {
                    element.style.fontSize = newFontSize;
                });
            });
            resizeObserver.observe(container);
        }
        
        return fontSize;
    }

    init() {
        this.setupEventListeners();
        this.renderAnimationGrid();
        this.setupModal();
        this.setupDemoArea();
        this.fiEyesUICreateTextDropStyles();
        this.fiEyesUICreateFlyInOutStyles();
        this.fiEyesUICreateBlurRevealStyles();
        this.fiEyesUICreateLetterBounceStyles();
        this.fiEyesUICreateTextScaleStyles();
        this.fiEyesUICreateRotatingTextStyles();
        this.fiEyesUICreateCharacterFlyInStyles();
        this.fiEyesUICreateTextRevealStyles();
        this.fiEyesUICreateCharacterGlowStyles();
        this.fiEyesUICreateTextStrokeStyles();
        this.fiEyesUICreateTypewriterStyles();
        this.fiEyesUICreateFadeInStyles();
        this.fiEyesUICreateGradientTextStyles();
        this.fiEyesUICreateResizeEffectStyles();
        this.fiEyesUICreateTextScaleBounceStyles();
        this.fiEyesUICreateTextSwipeStyles();
        this.fiEyesUICreateHoverFillStyles();
        this.fiEyesUICreateTitleRevealStyles();
        this.fiEyesUICreateWavyTextStyles();
        this.fiEyesUICreateSlideLeftStyles();
        this.fiEyesUICreateSlideRevealStyles();
        this.fiEyesUICreateTextEffect1Styles();
        this.fiEyesUICreateTextEffect2Styles();
        this.fiEyesUICreateTextEffect3Styles();
        this.fiEyesUICreateTextEffect4Styles();
        this.fiEyesUICreateTextEffect5Styles();
        this.fiEyesUICreateTextEffect6Styles();
        this.fiEyesUICreateTextEffect7Styles();
    }

    setupEventListeners() {
        // Category selector
        const categorySelect = document.getElementById('category-select');
        categorySelect.addEventListener('change', (e) => {
            this.currentCategory = e.target.value;
            this.renderAnimationGrid();
        });

        // Framework selector
        const frameworkSelect = document.getElementById('framework-select');
        frameworkSelect.addEventListener('change', (e) => {
            this.currentFramework = e.target.value;
            this.renderAnimationGrid();
        });

        // Modal close
        const closeModal = document.getElementById('close-modal');
        closeModal.addEventListener('click', () => {
            this.closeModal();
        });

        // Modal overlay click
        const modalOverlay = document.getElementById('preview-modal');
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                this.closeModal();
            }
        });

        // Tab switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Copy code button
        const copyBtn = document.getElementById('copy-code');
        copyBtn.addEventListener('click', () => {
            this.copyCode();
        });

        // Try animation button
        const tryBtn = document.getElementById('try-animation');
        tryBtn.addEventListener('click', () => {
            this.tryAnimation();
        });

        // Reset demo button
        const resetBtn = document.getElementById('reset-demo');
        resetBtn.addEventListener('click', () => {
            this.resetDemo();
        });

        // Event delegation for modal buttons (they may not exist when page loads)
        document.addEventListener('click', (e) => {
            if (e.target.id === 'play-preview') {
                this.playPreviewAnimation();
            } else if (e.target.id === 'reset-preview') {
                this.resetPreviewAnimation();
            } else if (e.target.closest('.btn') && e.target.closest('.btn').onclick) {
                // Handle preview buttons in animation cards
                const btn = e.target.closest('.btn');
                const onclickAttr = btn.getAttribute('onclick');
                if (onclickAttr && onclickAttr.includes('showPreview')) {
                    // Extract animation name from onclick
                    const match = onclickAttr.match(/showPreview\('([^']+)'\)/);
                    if (match) {
                        this.showPreview(match[1]);
                    }
                }
            }
        });
    }

    renderAnimationGrid() {
        // Clear all grids dynamically
        const allGrids = document.querySelectorAll('.animation-grid');
        allGrids.forEach(grid => {
            grid.innerHTML = '';
        });

        // Show/hide sections based on category selection
        this.showAnimationSection(this.currentCategory);

        // Render animations into their respective grids
        this.animations.forEach(animation => {
            const card = this.createAnimationCard(animation);
            const targetGrid = document.getElementById(`${animation.category}-animations-grid`);
            
            if (targetGrid) {
                targetGrid.appendChild(card);
            } else {
                // Fallback for unknown categories
                console.warn(`Unknown animation category: ${animation.category}`);
            }
        });
    }

    showAnimationSection(category) {
        // Hide all sections
        const sections = document.querySelectorAll('.animation-section');
        sections.forEach(section => section.classList.remove('active'));

        // Show the selected section
        if (category === 'all') {
            // Show all sections
            sections.forEach(section => section.classList.add('active'));
        } else {
            // Show specific section
            const targetSection = document.getElementById(`${category}-animations-section`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        }
    }

    createAnimationCard(animation) {
        const card = document.createElement('div');
        card.className = 'animation-card';
        card.dataset.animation = animation.name;

        // Special handling for text drop animation
        if (animation.name === 'textDrop') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-textDrop-demo" id="textDrop-${animation.name}">
                        <h1>Welcome To Finches Eyes UI Components</h1>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for text drop
            setTimeout(() => {
                this.fiEyesUIInitializeTextDrop(document.getElementById(`textDrop-${animation.name}`));
            }, 100);
        } else if (animation.name === 'flyInOut') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-flyInOut-demo" id="flyInOut-${animation.name}">
                        <p class="fiEyesUI-flyInOut-typer">Welcome To Finches Eyes UI Components</p>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for fly-in-out
            setTimeout(() => {
                this.fiEyesUIInitializeFlyInOut(document.getElementById(`flyInOut-${animation.name}`));
            }, 100);
        } else if (animation.name === 'blurReveal') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-blurReveal-demo" id="blurReveal-${animation.name}">
                        <h1>Welcome To Finches Eyes UI Components</h1>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for blur reveal
            setTimeout(() => {
                this.fiEyesUIInitializeBlurReveal(document.getElementById(`blurReveal-${animation.name}`));
            }, 100);
        } else if (animation.name === 'letterBounce') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-letterBounce-demo" id="letterBounce-${animation.name}">
                        <h1>Welcome To Finches Eyes UI Components</h1>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for letter bounce
            setTimeout(() => {
                this.fiEyesUIInitializeLetterBounce(document.getElementById(`letterBounce-${animation.name}`));
            }, 100);
        } else if (animation.name === 'textScale') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-textScale-demo" id="textScale-${animation.name}">
                        <h1>Welcome To Finches Eyes UI Components</h1>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for text scale
            setTimeout(() => {
                this.fiEyesUIInitializeTextScale(document.getElementById(`textScale-${animation.name}`));
            }, 100);
        } else if (animation.name === 'rotatingText') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-rotatingText-demo" id="rotatingText-${animation.name}">
                        <h1>Welcome To Finches Eyes UI Components</h1>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for rotating text
            setTimeout(() => {
                this.fiEyesUIInitializeRotatingText(document.getElementById(`rotatingText-${animation.name}`));
            }, 100);
        } else if (animation.name === 'characterFlyIn') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-characterFlyIn-demo" id="characterFlyIn-${animation.name}">
                        <ul class="fiEyesUI-characterFlyIn-list fiEyesUI-hidden"></ul>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for character fly in
            setTimeout(() => {
                this.fiEyesUIInitializeCharacterFlyIn(document.getElementById(`characterFlyIn-${animation.name}`));
            }, 100);
        } else if (animation.name === 'textReveal') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-textReveal-demo" id="textReveal-${animation.name}">
                        <div class="fiEyesUI-textReveal-content">
                            <span class="fiEyesUI-textReveal-span fiEyesUI-textReveal-text1">Welcome To</span>
                            <span class="fiEyesUI-textReveal-span fiEyesUI-textReveal-text2">Finches Eyes UI Components</span>
                        </div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for text reveal
            setTimeout(() => {
                this.fiEyesUIInitializeTextReveal(document.getElementById(`textReveal-${animation.name}`));
            }, 100);
        } else if (animation.name === 'characterGlow') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-characterGlow-demo" id="characterGlow-${animation.name}">
                        <div class="fiEyesUI-characterGlow-content"></div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for character glow
            setTimeout(() => {
                this.fiEyesUIInitializeCharacterGlow(document.getElementById(`characterGlow-${animation.name}`));
            }, 100);
        } else if (animation.name === 'textStroke') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-textStroke-demo" id="textStroke-${animation.name}">
                        <div class="fiEyesUI-textStroke-content">
                            <h2 class="fiEyesUI-textStroke-text">Welcome To Finches Eyes UI Components</h2>
                            <h2 class="fiEyesUI-textStroke-text">Welcome To Finches Eyes UI Components</h2>
                        </div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for text stroke
            setTimeout(() => {
                this.fiEyesUIInitializeTextStroke(document.getElementById(`textStroke-${animation.name}`));
            }, 100);
        } else if (animation.name === 'typewriter') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-typewriter-demo" id="typewriter-${animation.name}">
                        <div class="fiEyesUI-typewriter-content">
                            <div class="fiEyesUI-typewriter-text">Welcome To Finches Eyes UI Components</div>
                        </div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for typewriter
            setTimeout(() => {
                this.fiEyesUIInitializeTypewriter(document.getElementById(`typewriter-${animation.name}`));
            }, 100);
        } else if (animation.name === 'fadeIn') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-fadeIn-demo" id="fadeIn-${animation.name}">
                        <div class="fiEyesUI-fadeIn-content">
                            <h1>Welcome To Finches Eyes UI Components</h1>
                        </div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for fade in
            setTimeout(() => {
                this.fiEyesUIInitializeFadeIn(document.getElementById(`fadeIn-${animation.name}`));
            }, 100);
        } else if (animation.name === 'gradientText') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-gradientText-demo" id="gradientText-${animation.name}">
                        <div class="fiEyesUI-gradientText-content">
                            <h3>Welcome To Finches Eyes UI Components</h3>
                        </div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for gradient text
            setTimeout(() => {
                this.fiEyesUIInitializeGradientText(document.getElementById(`gradientText-${animation.name}`));
            }, 100);
        } else if (animation.name === 'resizeEffect') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-resizeEffect-demo" id="resizeEffect-${animation.name}">
                        <div class="fiEyesUI-resizeEffect-content">
                            <h1>Welcome To Finches Eyes UI Components</h1>
                        </div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for resize effect
            setTimeout(() => {
                this.fiEyesUIInitializeResizeEffect(document.getElementById(`resizeEffect-${animation.name}`));
            }, 100);
        } else if (animation.name === 'textScaleBounce') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-textScaleBounce-demo" id="textScaleBounce-${animation.name}">
                        <div class="fiEyesUI-textScaleBounce-content">
                            Welcome To Finches Eyes UI Components
                        </div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for text scale bounce
            setTimeout(() => {
                this.fiEyesUIInitializeTextScaleBounce(document.getElementById(`textScaleBounce-${animation.name}`));
            }, 100);
        } else if (animation.name === 'textSwipe') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-textSwipe-demo" id="textSwipe-${animation.name}">
                        <div class="fiEyesUI-textSwipe-content">
                            <!-- Letters will be dynamically inserted here -->
                        </div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for text swipe
            setTimeout(() => {
                this.fiEyesUIInitializeTextSwipe(document.getElementById(`textSwipe-${animation.name}`));
            }, 100);
        } else if (animation.name === 'hoverFill') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-hoverFill-demo" id="hoverFill-${animation.name}">
                        <a href="#" class="fiEyesUI-hoverFill-link" onclick="event.preventDefault();">
                            Welcome To Finches Eyes UI Components
                            <span class="fiEyesUI-hoverFill-link-layer" data-text="Welcome To Finches Eyes UI Components"></span>
                        </a>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for hover fill
            setTimeout(() => {
                this.fiEyesUIInitializeHoverFill(document.getElementById(`hoverFill-${animation.name}`));
            }, 100);
        } else if (animation.name === 'titleReveal') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-titleReveal-demo" id="titleReveal-${animation.name}">
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
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            // Start animation immediately for title reveal
            setTimeout(() => {
                this.fiEyesUIInitializeTitleReveal(document.getElementById(`titleReveal-${animation.name}`));
            }, 100);
        } else if (animation.name === 'wavyText') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-wavyText-demo" id="wavyText-${animation.name}">
                        <div class="fiEyesUI-wavyText-content">
                            <h1 class="fiEyesUI-wavyText-title">
                                <!-- Letters will be dynamically inserted here -->
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            setTimeout(() => {
                this.fiEyesUIInitializeWavyText(document.getElementById(`wavyText-${animation.name}`));
            }, 100);
        } else if (animation.name === 'slideLeft') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-slideLeft-demo" id="slideLeft-${animation.name}">
                        <div class="fiEyesUI-slideLeft-content">
                            <h1 class="fiEyesUI-slideLeft-title">
                                <!-- Letters will be dynamically inserted here -->
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            setTimeout(() => {
                this.fiEyesUIInitializeSlideLeft(document.getElementById(`slideLeft-${animation.name}`));
            }, 100);
        } else if (animation.name === 'slideReveal') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-slideReveal-demo" id="slideReveal-${animation.name}">
                        <div class="fiEyesUI-slideReveal-content">
                            <h1 class="fiEyesUI-slideReveal-title">
                                <div class="fiEyesUI-slideReveal-text">
                                    Welcome To Finches Eyes UI Components
                                </div>
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            setTimeout(() => {
                this.fiEyesUIInitializeSlideReveal(document.getElementById(`slideReveal-${animation.name}`));
            }, 100);
        } else if (animation.name === 'textEffect1') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-textEffect1-demo" id="textEffect1-${animation.name}">
                        <div class="fiEyesUI-textEffect1-text"></div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            setTimeout(() => {
                this.fiEyesUIInitializeTextEffect1(document.getElementById(`textEffect1-${animation.name}`));
            }, 100);
        } else if (animation.name === 'textEffect2') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-textEffect2-demo" id="textEffect2-${animation.name}">
                        <div class="fiEyesUI-textEffect2-text"></div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            setTimeout(() => {
                this.fiEyesUIInitializeTextEffect2(document.getElementById(`textEffect2-${animation.name}`));
            }, 100);
        } else if (animation.name === 'textEffect3') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-textEffect3-demo" id="textEffect3-${animation.name}">
                        <div class="fiEyesUI-textEffect3-text"></div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            setTimeout(() => {
                this.fiEyesUIInitializeTextEffect3(document.getElementById(`textEffect3-${animation.name}`));
            }, 100);
        } else if (animation.name === 'textEffect4') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-textEffect4-demo" id="textEffect4-${animation.name}">
                        <div class="fiEyesUI-textEffect4-text"></div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            setTimeout(() => {
                this.fiEyesUIInitializeTextEffect4(document.getElementById(`textEffect4-${animation.name}`));
            }, 100);
        } else if (animation.name === 'textEffect5') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-textEffect5-demo" id="textEffect5-${animation.name}">
                        <div class="fiEyesUI-textEffect5-text"></div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            setTimeout(() => {
                this.fiEyesUIInitializeTextEffect5(document.getElementById(`textEffect5-${animation.name}`));
            }, 100);
        } else if (animation.name === 'textEffect6') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-textEffect6-demo" id="textEffect6-${animation.name}">
                        <div class="fiEyesUI-textEffect6-text"></div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            setTimeout(() => {
                this.fiEyesUIInitializeTextEffect6(document.getElementById(`textEffect6-${animation.name}`));
            }, 100);
        } else if (animation.name === 'textEffect7') {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="fiEyesUI-textEffect7-demo" id="textEffect7-${animation.name}">
                        <div class="fiEyesUI-textEffect7-text"></div>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showPreview('${animation.name}')">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            
            setTimeout(() => {
                this.fiEyesUIInitializeTextEffect7(document.getElementById(`textEffect7-${animation.name}`));
            }, 100);
        } else {
            card.innerHTML = `
                <div class="animation-preview">
                    <div class="demo-box animate-${animation.name}">
                        <i class="fas fa-star"></i>
                    </div>
                </div>
                <div class="animation-info">
                    <h3>${animation.title}</h3>
                    <p>${animation.description}</p>
                </div>
                <div class="animation-actions">
                    <button class="btn btn-primary" onclick="demo.showCode('${animation.name}')">
                        <i class="fas fa-code"></i> View Code
                    </button>
                    <button class="btn btn-secondary" onclick="demo.previewAnimation('${animation.name}')">
                        <i class="fas fa-play"></i> Preview
                    </button>
                </div>
            `;
        }

        return card;
    }

    showPreview(animationName) {
        const animation = this.animations.find(a => a.name === animationName);
        if (!animation) return;

        const modal = document.getElementById('preview-modal');
        const title = document.getElementById('modal-title');
        const usageCode = document.getElementById('usage-code');
        const installationCode = document.getElementById('installation-code');
        const configCode = document.getElementById('config-code');
        const previewAnimation = document.getElementById('preview-animation');

        title.textContent = `${animation.title} - ${this.currentFramework.charAt(0).toUpperCase() + this.currentFramework.slice(1)}`;

        // Generate code examples based on framework
        const codeExamples = this.generateCodeExamples(animation, this.currentFramework);
        
        usageCode.textContent = codeExamples.usage;
        installationCode.textContent = codeExamples.installation;
        configCode.textContent = codeExamples.configuration;

        // Render animation preview
        this.renderAnimationPreview(animation, previewAnimation);

        // Highlight syntax
        if (window.Prism) {
            Prism.highlightAll();
        }

        modal.classList.add('active');
        this.currentAnimation = animation;
    }

    ensureAnimationStyles(animName) {
        // Ensure styles are created for the animation
        switch(animName) {
            case 'textDrop': this.fiEyesUICreateTextDropStyles(); break;
            case 'flyInOut': this.fiEyesUICreateFlyInOutStyles(); break;
            case 'blurReveal': this.fiEyesUICreateBlurRevealStyles(); break;
            case 'letterBounce': this.fiEyesUICreateLetterBounceStyles(); break;
            case 'textScale': this.fiEyesUICreateTextScaleStyles(); break;
            case 'rotatingText': this.fiEyesUICreateRotatingTextStyles(); break;
            case 'characterFlyIn': this.fiEyesUICreateCharacterFlyInStyles(); break;
            case 'textReveal': this.fiEyesUICreateTextRevealStyles(); break;
            case 'characterGlow': this.fiEyesUICreateCharacterGlowStyles(); break;
            case 'textStroke': this.fiEyesUICreateTextStrokeStyles(); break;
            case 'typewriter': this.fiEyesUICreateTypewriterStyles(); break;
            case 'fadeIn': this.fiEyesUICreateFadeInStyles(); break;
            case 'gradientText': this.fiEyesUICreateGradientTextStyles(); break;
            case 'resizeEffect': this.fiEyesUICreateResizeEffectStyles(); break;
            case 'textScaleBounce': this.fiEyesUICreateTextScaleBounceStyles(); break;
            case 'textSwipe': this.fiEyesUICreateTextSwipeStyles(); break;
            case 'hoverFill': this.fiEyesUICreateHoverFillStyles(); break;
            case 'titleReveal': this.fiEyesUICreateTitleRevealStyles(); break;
            case 'wavyText': this.fiEyesUICreateWavyTextStyles(); break;
            case 'slideLeft': this.fiEyesUICreateSlideLeftStyles(); break;
            case 'slideReveal': this.fiEyesUICreateSlideRevealStyles(); break;
            case 'textEffect1': this.fiEyesUICreateTextEffect1Styles(); break;
            case 'textEffect2': this.fiEyesUICreateTextEffect2Styles(); break;
            case 'textEffect3': this.fiEyesUICreateTextEffect3Styles(); break;
            case 'textEffect4': this.fiEyesUICreateTextEffect4Styles(); break;
            case 'textEffect5': this.fiEyesUICreateTextEffect5Styles(); break;
            case 'textEffect6': this.fiEyesUICreateTextEffect6Styles(); break;
            case 'textEffect7': this.fiEyesUICreateTextEffect7Styles(); break;
        }
    }

    renderAnimationPreview(animation, container) {
        // Clear previous animation
        container.innerHTML = '';

        // Ensure styles are created
        this.ensureAnimationStyles(animation.name);

        // Render the appropriate animation based on name
        const animName = animation.name;
        
        if (animName === 'textDrop') {
            container.innerHTML = '<div class="fiEyesUI-textDrop-demo" id="modal-textDrop"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeTextDrop(document.getElementById('modal-textDrop')), 100);
        } else if (animName === 'flyInOut') {
            container.innerHTML = '<div class="fiEyesUI-flyInOut-demo" id="modal-flyInOut"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeFlyInOut(document.getElementById('modal-flyInOut')), 100);
        } else if (animName === 'blurReveal') {
            container.innerHTML = '<div class="fiEyesUI-blurReveal-demo" id="modal-blurReveal"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeBlurReveal(document.getElementById('modal-blurReveal')), 100);
        } else if (animName === 'letterBounce') {
            container.innerHTML = '<div class="fiEyesUI-letterBounce-demo" id="modal-letterBounce"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeLetterBounce(document.getElementById('modal-letterBounce')), 100);
        } else if (animName === 'textScale') {
            container.innerHTML = '<div class="fiEyesUI-textScale-demo" id="modal-textScale"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeTextScale(document.getElementById('modal-textScale')), 100);
        } else if (animName === 'rotatingText') {
            container.innerHTML = '<div class="fiEyesUI-rotatingText-demo" id="modal-rotatingText"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeRotatingText(document.getElementById('modal-rotatingText')), 100);
        } else if (animName === 'characterFlyIn') {
            container.innerHTML = '<div class="fiEyesUI-characterFlyIn-demo" id="modal-characterFlyIn"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeCharacterFlyIn(document.getElementById('modal-characterFlyIn')), 100);
        } else if (animName === 'textReveal') {
            container.innerHTML = '<div class="fiEyesUI-textReveal-demo" id="modal-textReveal"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeTextReveal(document.getElementById('modal-textReveal')), 100);
        } else if (animName === 'characterGlow') {
            container.innerHTML = '<div class="fiEyesUI-characterGlow-demo" id="modal-characterGlow"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeCharacterGlow(document.getElementById('modal-characterGlow')), 100);
        } else if (animName === 'textStroke') {
            container.innerHTML = '<div class="fiEyesUI-textStroke-demo" id="modal-textStroke"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeTextStroke(document.getElementById('modal-textStroke')), 100);
        } else if (animName === 'typewriter') {
            container.innerHTML = '<div class="fiEyesUI-typewriter-demo" id="modal-typewriter"><div class="fiEyesUI-typewriter-text">Welcome To Finches Eyes UI Components</div></div>';
            setTimeout(() => this.fiEyesUIInitializeTypewriter(document.getElementById('modal-typewriter')), 100);
        } else if (animName === 'fadeIn') {
            container.innerHTML = '<div class="fiEyesUI-fadeIn-demo" id="modal-fadeIn"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeFadeIn(document.getElementById('modal-fadeIn')), 100);
        } else if (animName === 'gradientText') {
            container.innerHTML = '<div class="fiEyesUI-gradientText-demo" id="modal-gradientText"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeGradientText(document.getElementById('modal-gradientText')), 100);
        } else if (animName === 'resizeEffect') {
            container.innerHTML = '<div class="fiEyesUI-resizeEffect-demo" id="modal-resizeEffect"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeResizeEffect(document.getElementById('modal-resizeEffect')), 100);
        } else if (animName === 'textScaleBounce') {
            container.innerHTML = '<div class="fiEyesUI-textScaleBounce-demo" id="modal-textScaleBounce"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeTextScaleBounce(document.getElementById('modal-textScaleBounce')), 100);
        } else if (animName === 'textSwipe') {
            container.innerHTML = '<div class="fiEyesUI-textSwipe-demo" id="modal-textSwipe"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeTextSwipe(document.getElementById('modal-textSwipe')), 100);
        } else if (animName === 'hoverFill') {
            container.innerHTML = '<div class="fiEyesUI-hoverFill-demo" id="modal-hoverFill"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeHoverFill(document.getElementById('modal-hoverFill')), 100);
        } else if (animName === 'titleReveal') {
            container.innerHTML = '<div class="fiEyesUI-titleReveal-demo" id="modal-titleReveal"><div class="fiEyesUI-titleReveal-title"></div><div class="fiEyesUI-titleReveal-subtitle"></div></div>';
            setTimeout(() => this.fiEyesUIInitializeTitleReveal(document.getElementById('modal-titleReveal')), 100);
        } else if (animName === 'wavyText') {
            container.innerHTML = '<div class="fiEyesUI-wavyText-demo" id="modal-wavyText"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeWavyText(document.getElementById('modal-wavyText')), 100);
        } else if (animName === 'slideLeft') {
            container.innerHTML = '<div class="fiEyesUI-slideLeft-demo" id="modal-slideLeft"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeSlideLeft(document.getElementById('modal-slideLeft')), 100);
        } else if (animName === 'slideReveal') {
            container.innerHTML = '<div class="fiEyesUI-slideReveal-demo" id="modal-slideReveal"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeSlideReveal(document.getElementById('modal-slideReveal')), 100);
        } else if (animName === 'textEffect1') {
            container.innerHTML = '<div class="fiEyesUI-textEffect1-demo" id="modal-textEffect1"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeTextEffect1(document.getElementById('modal-textEffect1')), 100);
        } else if (animName === 'textEffect2') {
            container.innerHTML = '<div class="fiEyesUI-textEffect2-demo" id="modal-textEffect2"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeTextEffect2(document.getElementById('modal-textEffect2')), 100);
        } else if (animName === 'textEffect3') {
            container.innerHTML = '<div class="fiEyesUI-textEffect3-demo" id="modal-textEffect3"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeTextEffect3(document.getElementById('modal-textEffect3')), 100);
        } else if (animName === 'textEffect4') {
            container.innerHTML = '<div class="fiEyesUI-textEffect4-demo" id="modal-textEffect4"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeTextEffect4(document.getElementById('modal-textEffect4')), 100);
        } else if (animName === 'textEffect5') {
            container.innerHTML = '<div class="fiEyesUI-textEffect5-demo" id="modal-textEffect5"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeTextEffect5(document.getElementById('modal-textEffect5')), 100);
        } else if (animName === 'textEffect6') {
            container.innerHTML = '<div class="fiEyesUI-textEffect6-demo" id="modal-textEffect6"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeTextEffect6(document.getElementById('modal-textEffect6')), 100);
        } else if (animName === 'textEffect7') {
            container.innerHTML = '<div class="fiEyesUI-textEffect7-demo" id="modal-textEffect7"><h1>Welcome To Finches Eyes UI Components</h1></div>';
            setTimeout(() => this.fiEyesUIInitializeTextEffect7(document.getElementById('modal-textEffect7')), 100);
        }
    }

    generateCodeExamples(animation, framework) {
        // Special handling for text animations
        if (animation.name === 'textDrop') {
            return this.generateTextDropCodeExamples(framework);
        } else if (animation.name === 'flyInOut') {
            return this.generateFlyInOutCodeExamples(framework);
        } else if (animation.name === 'blurReveal') {
            return this.generateBlurRevealCodeExamples(framework);
        } else if (animation.name === 'letterBounce') {
            return this.generateLetterBounceCodeExamples(framework);
        } else if (animation.name === 'textScale') {
            return this.generateTextScaleCodeExamples(framework);
        } else if (animation.name === 'rotatingText') {
            return this.generateRotatingTextCodeExamples(framework);
        } else if (animation.name === 'characterFlyIn') {
            return this.generateCharacterFlyInCodeExamples(framework);
        } else if (animation.name === 'textReveal') {
            return this.generateTextRevealCodeExamples(framework);
        } else if (animation.name === 'characterGlow') {
            return this.generateCharacterGlowCodeExamples(framework);
        } else if (animation.name === 'textStroke') {
            return this.generateTextStrokeCodeExamples(framework);
        } else if (animation.name === 'typewriter') {
            return this.generateTypewriterCodeExamples(framework);
        } else if (animation.name === 'fadeIn') {
            return this.generateFadeInCodeExamples(framework);
        } else if (animation.name === 'gradientText') {
            return this.generateGradientTextCodeExamples(framework);
        } else if (animation.name === 'resizeEffect') {
            return this.generateResizeEffectCodeExamples(framework);
        } else if (animation.name === 'textScaleBounce') {
            return this.generateTextScaleBounceCodeExamples(framework);
        } else if (animation.name === 'textSwipe') {
            return this.generateTextSwipeCodeExamples(framework);
        } else if (animation.name === 'hoverFill') {
            return this.generateHoverFillCodeExamples(framework);
        } else if (animation.name === 'titleReveal') {
            return this.generateTitleRevealCodeExamples(framework);
        } else if (animation.name === 'wavyText') {
            return this.generateWavyTextCodeExamples(framework);
        } else if (animation.name === 'slideLeft') {
            return this.generateSlideLeftCodeExamples(framework);
        } else if (animation.name === 'slideReveal') {
            return this.generateSlideRevealCodeExamples(framework);
        } else if (animation.name === 'textEffect1') {
            return this.generateTextEffect1CodeExamples(framework);
        } else if (animation.name === 'textEffect2') {
            return this.generateTextEffect2CodeExamples(framework);
        } else if (animation.name === 'textEffect3') {
            return this.generateTextEffect3CodeExamples(framework);
        } else if (animation.name === 'textEffect4') {
            return this.generateTextEffect4CodeExamples(framework);
        } else if (animation.name === 'textEffect5') {
            return this.generateTextEffect5CodeExamples(framework);
        } else if (animation.name === 'textEffect6') {
            return this.generateTextEffect6CodeExamples(framework);
        } else if (animation.name === 'textEffect7') {
            return this.generateTextEffect7CodeExamples(framework);
        }

        const config = {
            duration: animation.duration,
            easing: animation.easing,
            iterations: animation.infinite ? 'infinite' : 1
        };

        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react react-dom`,
                    usage: `import React from 'react';
import { useFiEyesUIAnimation, FiEyesUIAnimatedComponent } from 'fincheseye-ui-animation-library';

// Using the hook
function MyComponent() {
  const animation = useFiEyesUIAnimation({
    preset: '${animation.name}',
    config: {
      duration: ${config.duration},
      easing: '${config.easing}',
      ${animation.infinite ? `iterations: 'infinite'` : ''}
    },
    autoPlay: true
  });

  return (
    <div ref={animation.ref}>
      <h1>Hello World!</h1>
    </div>
  );
}

// Using the component
function MyAnimatedComponent() {
  return (
    <FiEyesUIAnimatedComponent
      preset="${animation.name}"
      config={{
        duration: ${config.duration},
        easing: '${config.easing}',
        ${animation.infinite ? `iterations: 'infinite'` : ''}
      }}
      autoPlay
    >
      <div>Animated content</div>
    </FiEyesUIAnimatedComponent>
  );
}`,
                    configuration: `// Animation Configuration Options
interface AnimationConfig {
  duration: number;              // Animation duration in ms
  delay?: number;                // Delay before starting
  easing?: EasingFunction;       // Easing function
  iterations?: number | 'infinite'; // Number of iterations
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

// Available easing functions
import { easingFunctions } from 'fincheseye-ui-animation-library';

const config = {
  duration: ${config.duration},
  easing: easingFunctions.easeInOutCubic,
  ${animation.infinite ? `iterations: 'infinite'` : ''}
};`
                };

            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core`,
                    usage: `// app.module.ts
import { NgModule } from '@angular/core';
import { FiEyesUIAnimationService, FiEyesUIAnimationDirective } from 'fincheseye-ui-animation-library';

@NgModule({
  declarations: [FiEyesUIAnimationDirective],
  providers: [FiEyesUIAnimationService]
})
export class AppModule {}

// component.html
<div 
  fiEyesUIAnimate 
  fiEyesUIPreset="${animation.name}" 
  [fiEyesUIConfig]="{
    duration: ${config.duration},
    easing: '${config.easing}',
    ${animation.infinite ? `iterations: 'infinite'` : ''}
  }"
  fiEyesUIAutoPlay="true"
>
  <h1>Hello World!</h1>
</div>

// component.ts (using service)
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationService } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: '<div #animatedElement><h1>Hello World!</h1></div>'
})
export class MyComponent {
  @ViewChild('animatedElement') element!: ElementRef;

  constructor(private animationService: FiEyesUIAnimationService) {}

  ngAfterViewInit() {
    const animation = this.animationService.createAnimation(
      this.element,
      {
        preset: '${animation.name}',
        config: {
          duration: ${config.duration},
          easing: '${config.easing}',
          ${animation.infinite ? `iterations: 'infinite'` : ''}
        }
      }
    );
    animation.play();
  }
}`,
                    configuration: `// Animation Configuration Options
interface AnimationConfig {
  duration: number;              // Animation duration in ms
  delay?: number;                // Delay before starting
  easing?: EasingFunction;       // Easing function
  iterations?: number | 'infinite'; // Number of iterations
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

// Available easing functions
import { easingFunctions } from 'fincheseye-ui-animation-library';

const config = {
  duration: ${config.duration},
  easing: easingFunctions.easeInOutCubic,
  ${animation.infinite ? `iterations: 'infinite'` : ''}
};`
                };

            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `<!-- Using the composable -->
<template>
  <div ref="elementRef">
    <h1>Hello World!</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useFiEyesUIVueAnimation } from 'fincheseye-ui-animation-library';

const animation = useFiEyesUIVueAnimation({
  preset: '${animation.name}',
  config: {
    duration: ${config.duration},
    easing: '${config.easing}',
    ${animation.infinite ? `iterations: 'infinite'` : ''}
  },
  autoPlay: true
});

const elementRef = animation.elementRef;
</script>

<!-- Using the component -->
<template>
  <FiEyesUIAnimatedComponent
    preset="${animation.name}"
    :config="{
      duration: ${config.duration},
      easing: '${config.easing}',
      ${animation.infinite ? `iterations: 'infinite'` : ''}
    }"
    autoPlay
  >
    <div>Animated content</div>
  </FiEyesUIAnimatedComponent>
</template>

<script setup lang="ts">
import { FiEyesUIAnimatedComponent } from 'fincheseye-ui-animation-library';
</script>`,
                    configuration: `// Animation Configuration Options
interface AnimationConfig {
  duration: number;              // Animation duration in ms
  delay?: number;                // Delay before starting
  easing?: EasingFunction;       // Easing function
  iterations?: number | 'infinite'; // Number of iterations
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

// Available easing functions
import { easingFunctions } from 'fincheseye-ui-animation-library';

const config = {
  duration: ${config.duration},
  easing: easingFunctions.easeInOutCubic,
  ${animation.infinite ? `iterations: 'infinite'` : ''}
};`
                };

            default:
                return {
                    installation: 'npm install greenfinches-ui-animation-library',
                    usage: '// Code examples not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    previewAnimation(animationName) {
        // Find the animation element in the grid
        const animationCard = document.querySelector(`[data-animation="${animationName}"]`);
        if (!animationCard) return;
        
        const demoElement = animationCard.querySelector('.demo-box');
        if (!demoElement) return;
        
        // Reset any existing animations
        demoElement.className = 'demo-box';
        
        // Add the animation class
        setTimeout(() => {
            demoElement.classList.add(`animate-${animationName}`);
        }, 10);

        // Remove animation class after completion
        const animation = this.animations.find(a => a.name === animationName);
        const duration = animation ? animation.duration : 1000;
        
        setTimeout(() => {
            demoElement.classList.remove(`animate-${animationName}`);
        }, duration + 100);
    }

    previewFlyInOut(animationName) {
        const container = document.getElementById(`flyInOut-${animationName}`);
        if (!container) return;

        // Clear container
        container.innerHTML = '<p class="fiEyesUI-flyInOut-typer">Welcome To Finches Eyes UI Components</p>';
        
        // Create styles first
        this.fiEyesUICreateFlyInOutStyles();
        
        // Initialize fly-in-out animation
        this.fiEyesUIInitializeFlyInOut(container);
    }

    fiEyesUIInitializeFlyInOut(container) {
        console.log('Initializing fly-in-out animation', container);
        const fiEyesUITyperElement = container.querySelector('.fiEyesUI-flyInOut-typer');
        if (!fiEyesUITyperElement) {
            console.log('Typer element not found');
            return;
        }

        const fiEyesUIText = fiEyesUITyperElement.textContent || fiEyesUITyperElement.innerText;
        console.log('Text to animate:', fiEyesUIText);
        const fiEyesUICharacters = fiEyesUIText.length;
        let fiEyesUINewText = '';

        // Wrap each character in <i> tags
        for (let i = 0; i < fiEyesUICharacters; i += 1) {
            fiEyesUINewText += '<i>' + fiEyesUIText.charAt(i) + '</i>';
        }

        fiEyesUITyperElement.innerHTML = fiEyesUINewText;

        // Apply responsive font sizing
        this.applyResponsiveFontSize(container, '.fiEyesUI-flyInOut-typer');

        const fiEyesUIWrappedChars = fiEyesUITyperElement.getElementsByTagName('i');
        const fiEyesUIWrappedCharsLen = fiEyesUIWrappedChars.length;
        let j = 0;

        const fiEyesUIAddEffect = () => {
            setTimeout(() => {
                fiEyesUIWrappedChars[j].className = 'fiEyesUIFlyInOut';
                j += 1;
                if (j < fiEyesUIWrappedCharsLen) {
                    fiEyesUIAddEffect();
                }
            }, 100);
        };

        fiEyesUIAddEffect();
    }

    fiEyesUICreateFlyInOutStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-flyInOut-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-flyInOut-demo {
                font-family: 'Orbitron', sans-serif;
                margin: 0 auto;
                position: relative;
                z-index: 2;
                width: 100%;
                height: 100%;
                padding: 20px;
                min-height: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #000000;
                color: #ffffff;
                box-sizing: border-box;
            }
            
            .fiEyesUI-flyInOut-typer {
                text-align: center;
                margin: 0 auto;
                padding: 15% 0;
                line-height: 1.2;
                letter-spacing: 0.5em;
                text-transform: uppercase;
                color: rgba(255,255,255,0.9);
            }
            
            .fiEyesUI-flyInOut-typer i {
                display: inline-block;
                font-style: normal;
                padding: 0 0.25em;
                transform: scale(0);
                transition: all 1s ease;
            }
            
            .fiEyesUI-flyInOut-typer i.fiEyesUIFlyInOut {
                color: rgba(255,255,255,0.9);
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
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    previewTextDrop(animationName) {
        const container = document.getElementById(`textDrop-${animationName}`);
        if (!container) return;

        // Clear container
        container.innerHTML = '<h1>Welcome To Finches Eyes UI Components</h1>';
        
        // Create styles first
        this.fiEyesUICreateTextDropStyles();
        
        // Initialize text drop animation
        this.fiEyesUIInitializeTextDrop(container);
    }

    fiEyesUIInitializeTextDrop(container) {
        const fiEyesUIText = container.textContent || container.innerText;
        const fiEyesUICharacters = fiEyesUIText.split('');
        
        // Clear container
        container.innerHTML = '';
        
        // Create styles dynamically
        this.fiEyesUICreateTextDropStyles();
        
        // Create random delay function
        const fiEyesUIRandomDelay = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        
        const fiEyesUIDelayRange = { min: 1, max: 9 };
        
        fiEyesUICharacters.forEach((fiEyesUIChar, fiEyesUIIndex) => {
            const fiEyesUIDelay = fiEyesUIRandomDelay(fiEyesUIDelayRange.min, fiEyesUIDelayRange.max);
            const fiEyesUISpan = document.createElement('span');
            
            fiEyesUISpan.className = `fiEyesUI-letterDrop fiEyesUI-ld${fiEyesUIDelay}`;
            fiEyesUISpan.style.color = '#ffffff';
            
            // Add secondary color to even characters
            if (fiEyesUIIndex % 2 === 1) {
                fiEyesUISpan.classList.add('fiEyesUI-secondary');
            }
            
            fiEyesUISpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
            container.appendChild(fiEyesUISpan);
        });
        
        // Apply responsive font sizing
        this.applyResponsiveFontSize(container, '.fiEyesUI-letterDrop');
    }

    fiEyesUICreateTextDropStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-textDrop-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-textDrop-demo {
                font-family: 'Orbitron', sans-serif;
                font-weight: 400;
                text-align: center;
                margin: 0;
                padding: 20px;
                min-height: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #000000;
                color: #ffffff;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }
            
            .fiEyesUI-letterDrop {
                position: relative;
                top: 0;
                display: inline-block;
                text-transform: uppercase;
                letter-spacing: 0.5em;
                opacity: 0.8;
                transform: rotateX(-90deg);
                animation: fiEyesUILetterDrop 1.2s ease 1 normal forwards;
            }
            
            .fiEyesUI-letterDrop.fiEyesUI-secondary {
                color: #ffffff;
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
        for (let i = 1; i <= 9; i++) {
            fiEyesUIStyle.textContent += `
                .fiEyesUI-ld${i} { 
                    animation-delay: 1.${i}s; 
                }
            `;
        }
        
        document.head.appendChild(fiEyesUIStyle);
    }

    previewBlurReveal(animationName) {
        const container = document.getElementById(`blurReveal-${animationName}`);
        if (!container) return;

        // Clear container and add h1
        container.innerHTML = '<h1>Welcome To Finches Eyes UI Components</h1>';
        
        // Create styles first
        this.fiEyesUICreateBlurRevealStyles();
        
        // Initialize blur reveal animation
        this.fiEyesUIInitializeBlurReveal(container);
    }

    fiEyesUIInitializeBlurReveal(container) {
        console.log('Initializing blur reveal animation on:', container);
        
        // Get text from h1 element or container
        const fiEyesUIH1 = container.querySelector('h1');
        const fiEyesUIText = fiEyesUIH1 ? fiEyesUIH1.textContent || fiEyesUIH1.innerText : (container.textContent || container.innerText);
        const fiEyesUICharacters = fiEyesUIText.split('');
        
        console.log('Text to animate:', fiEyesUIText);
        console.log('Characters:', fiEyesUICharacters);
        
        // Clear container
        container.innerHTML = '';
        
        // Create styles dynamically
        this.fiEyesUICreateBlurRevealStyles();
        
        // Create spans for each character
        fiEyesUICharacters.forEach((fiEyesUIChar) => {
            const fiEyesUISpan = document.createElement('span');
            fiEyesUISpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
            container.appendChild(fiEyesUISpan);
        });
        
        console.log('Added spans, starting animation...');
        
        // Start animation
        container.classList.add('animate');
        
        console.log('Animation class added, container classes:', container.className);
    }

    fiEyesUICreateBlurRevealStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-blurReveal-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-blurReveal-demo {
                font-family: 'Orbitron', sans-serif;
                font-weight: 600;
                text-align: center;
                margin: 0;
                padding: 20px;
                font-size: 32px;
                min-height: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #000000;
                color: #ffffff;
            }
            
            .fiEyesUI-blurReveal-demo span {
                opacity: 0;
                transition: all 550ms ease;
                filter: blur(25px);
                transform: translateZ(0);
                display: inline-block;
            }
            
            .fiEyesUI-blurReveal-demo.animate span {
                opacity: 1;
                filter: blur(0px);
            }
        `;
        
        // Add delay classes for each character
        const fiEyesUIText = "Welcome To Finches Eyes UI Components";
        const fiEyesUICharacters = fiEyesUIText.split('');
        fiEyesUICharacters.forEach((_, index) => {
            const delay = 35 * (index + 1);
            fiEyesUIStyle.textContent += `
                .fiEyesUI-blurReveal-demo span:nth-child(${index + 1}) {
                    transition-delay: ${delay}ms;
                }
            `;
        });
        
        document.head.appendChild(fiEyesUIStyle);
    }

    previewLetterBounce(animationName) {
        const container = document.getElementById(`letterBounce-${animationName}`);
        if (!container) return;

        // Clear container and add h1
        container.innerHTML = '<h1>Welcome To Finches Eyes UI Components</h1>';
        
        // Create styles first
        this.fiEyesUICreateLetterBounceStyles();
        
        // Initialize letter bounce animation
        this.fiEyesUIInitializeLetterBounce(container);
    }

    fiEyesUIInitializeLetterBounce(container) {
        // Get text from h1 element or container
        const fiEyesUIH1 = container.querySelector('h1');
        const fiEyesUIText = fiEyesUIH1 ? fiEyesUIH1.textContent || fiEyesUIH1.innerText : (container.textContent || container.innerText);
        const fiEyesUICharacters = fiEyesUIText.split('');
        
        // Clear container
        container.innerHTML = '';
        
        // Create styles dynamically
        this.fiEyesUICreateLetterBounceStyles();
        
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
        
        container.appendChild(fiEyesUINameDiv);
        
        // Start animation
        this.fiEyesUIStartLetterBounceAnimation(container);
    }

    fiEyesUIStartLetterBounceAnimation(container) {
        const fiEyesUILetters = container.querySelectorAll('.fiEyesUI-letterBounce-letter');
        const letterDelay = 80;
        const animationDuration = 800;
        const easing = 'easeInBounce';
        
        // Animate each letter with delay
        fiEyesUILetters.forEach((fiEyesUILetter, fiEyesUIIndex) => {
            setTimeout(() => {
                fiEyesUILetter.style.opacity = '1';
                fiEyesUILetter.style.transform = 'scale(1)';
                fiEyesUILetter.style.transition = `all ${animationDuration}ms ${easing}`;
            }, fiEyesUIIndex * letterDelay);
        });
        
        // Calculate total animation time
        const totalTime = (fiEyesUILetters.length * letterDelay) + animationDuration;
        
        setTimeout(() => {
            // If loop is enabled, restart animation
            setTimeout(() => {
                this.fiEyesUIResetAndRestartLetterBounce(container);
            }, 1000);
        }, totalTime);
    }

    fiEyesUIResetAndRestartLetterBounce(container) {
        const fiEyesUILetters = container.querySelectorAll('.fiEyesUI-letterBounce-letter');
        
        fiEyesUILetters.forEach((fiEyesUILetter) => {
            fiEyesUILetter.style.opacity = '0';
            fiEyesUILetter.style.transform = 'scale(0.9)';
        });
        
        setTimeout(() => {
            this.fiEyesUIStartLetterBounceAnimation(container);
        }, 100);
    }

    fiEyesUICreateLetterBounceStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-letterBounce-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-letterBounce-demo {
                font-family: 'Orbitron', sans-serif;
                font-weight: 600;
                text-align: center;
                margin: 0;
                padding: 20px;
                font-size: 4rem;
                min-height: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #000000;
                color: #ffffff;
                position: relative;
            }
            
            .fiEyesUI-letterBounce-demo:before {
                content: '';
                width: 100%;
                background: #ffffff;
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
                color: #ffffff;
                font-size: 4rem;
                font-family: 'Orbitron', sans-serif;
                font-weight: 600;
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    previewTextScale(animationName) {
        const container = document.getElementById(`textScale-${animationName}`);
        if (!container) return;

        // Clear container and add h1
        container.innerHTML = '<h1>Welcome To Finches Eyes UI Components</h1>';
        
        // Create styles first
        this.fiEyesUICreateTextScaleStyles();
        
        // Initialize text scale animation
        this.fiEyesUIInitializeTextScale(container);
    }

    fiEyesUIInitializeTextScale(container) {
        // Get text from h1 element or container
        const fiEyesUIH1 = container.querySelector('h1');
        const fiEyesUIText = fiEyesUIH1 ? fiEyesUIH1.textContent || fiEyesUIH1.innerText : (container.textContent || container.innerText);
        const fiEyesUICharacters = fiEyesUIText.split('');
        
        // Clear container
        container.innerHTML = '';
        
        // Create styles dynamically
        this.fiEyesUICreateTextScaleStyles();
        
        // Create appendText container
        const fiEyesUIAppendTextDiv = document.createElement('div');
        fiEyesUIAppendTextDiv.className = 'fiEyesUI-textScale-appendText';
        
        // Create character divs for each character
        fiEyesUICharacters.forEach((fiEyesUIChar, fiEyesUIIndex) => {
            const fiEyesUICharacterDiv = document.createElement('div');
            fiEyesUICharacterDiv.classList.add(`fiEyesUI-ch-${fiEyesUIIndex}`);
            fiEyesUICharacterDiv.classList.add('fiEyesUI-textScale-character');
            fiEyesUICharacterDiv.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
            fiEyesUIAppendTextDiv.appendChild(fiEyesUICharacterDiv);
        });
        
        container.appendChild(fiEyesUIAppendTextDiv);
        
        // Start animation
        this.fiEyesUIStartTextScaleAnimation(container);
    }

    fiEyesUIStartTextScaleAnimation(container) {
        const fiEyesUICharacters = container.querySelectorAll('.fiEyesUI-textScale-character');
        const animationDuration = 1500;
        const animationDelay = 0;
        
        // Animate each character
        fiEyesUICharacters.forEach((fiEyesUICharacter) => {
            fiEyesUICharacter.classList.add('fiEyesUI-animate');
        });
        
        // Calculate total animation time
        const totalTime = animationDelay + animationDuration;
        
        setTimeout(() => {
            // If loop is enabled, restart animation
            setTimeout(() => {
                this.fiEyesUIResetAndRestartTextScale(container);
            }, 1000);
        }, totalTime);
    }

    fiEyesUIResetAndRestartTextScale(container) {
        const fiEyesUICharacters = container.querySelectorAll('.fiEyesUI-textScale-character');
        
        fiEyesUICharacters.forEach((fiEyesUICharacter) => {
            fiEyesUICharacter.classList.remove('fiEyesUI-animate');
        });
        
        setTimeout(() => {
            this.fiEyesUIStartTextScaleAnimation(container);
        }, 100);
    }

    fiEyesUICreateTextScaleStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-textScale-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-textScale-demo {
                font-family: 'Orbitron', sans-serif;
                font-weight: 600;
                text-align: center;
                margin: 0;
                padding: 20px;
                font-size: 80px;
                min-height: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #000000;
                color: #ffffff;
                position: relative;
            }
            
            .fiEyesUI-textScale-appendText {
                text-align: center;
                padding: 34px;
                display: block;
                color: #ffffff;
                width: 100%;
            }
            
            .fiEyesUI-textScale-character {
                display: inline;
                font-weight: bolder;
                font-size: 80px;
                margin: auto;
                text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
            }
            
            .fiEyesUI-textScale-character.fiEyesUI-animate {
                animation: fiEyesUI-rotate 1500ms linear forwards;
            }
            
            @keyframes fiEyesUI-rotate {
                0% {
                    transform: scale(0);
                }
                10% {
                    font-size: 80px;
                    transform: scale(2);
                }
                20% {
                    transform: scale(0.5);
                }
                40% {
                    transform: scale(1.5);
                }
                60% {
                    transform: scale(0.8);
                }
                80% {
                    transform: scale(1.2);
                }
                100% {
                    font-size: 80px;
                    transform: scale(1);
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    previewRotatingText(animationName) {
        const container = document.getElementById(`rotatingText-${animationName}`);
        if (!container) return;

        // Clear container and add h1
        container.innerHTML = '<h1>Welcome To Finches Eyes UI Components</h1>';
        
        // Create styles first
        this.fiEyesUICreateRotatingTextStyles();
        
        // Initialize rotating text animation
        this.fiEyesUIInitializeRotatingText(container);
    }

    fiEyesUIInitializeRotatingText(container) {
        // Get text from h1 element or container
        const fiEyesUIH1 = container.querySelector('h1');
        const fiEyesUIText = fiEyesUIH1 ? fiEyesUIH1.textContent || fiEyesUIH1.innerText : (container.textContent || container.innerText);
        const fiEyesUIWords = fiEyesUIText.split(' ');
        
        // Clear container
        container.innerHTML = '';
        
        // Create styles dynamically
        this.fiEyesUICreateRotatingTextStyles();
        
        // Create content container
        const fiEyesUIContentDiv = document.createElement('div');
        fiEyesUIContentDiv.className = 'fiEyesUI-rotatingText-content';
        
        // Create word elements for each word
        fiEyesUIWords.forEach((fiEyesUIWord, fiEyesUIIndex) => {
            const fiEyesUIWordDiv = document.createElement('h2');
            fiEyesUIWordDiv.className = 'fiEyesUI-rotatingText-word';
            fiEyesUIWordDiv.textContent = fiEyesUIWord;
            fiEyesUIContentDiv.appendChild(fiEyesUIWordDiv);
        });
        
        container.appendChild(fiEyesUIContentDiv);
        
        // Start animation
        this.fiEyesUIStartRotatingTextAnimation(container);
    }

    fiEyesUIStartRotatingTextAnimation(container) {
        const fiEyesUIWords = container.querySelectorAll('.fiEyesUI-rotatingText-word');
        const animationDuration = 1500;
        const wordDelay = 1250;
        
        // Calculate total animation time
        const totalTime = (fiEyesUIWords.length * wordDelay) + animationDuration;
        
        setTimeout(() => {
            // If loop is enabled, restart animation
            setTimeout(() => {
                this.fiEyesUIResetAndRestartRotatingText(container);
            }, 1000);
        }, totalTime);
    }

    fiEyesUIResetAndRestartRotatingText(container) {
        // Restart the animation
        this.fiEyesUIStartRotatingTextAnimation(container);
    }

    fiEyesUICreateRotatingTextStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-rotatingText-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-rotatingText-demo {
                font-family: 'Orbitron', sans-serif;
                font-weight: 600;
                text-align: center;
                margin: 0;
                padding: 20px;
                font-size: 40px;
                min-height: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #000000;
                color: #ffffff;
                position: relative;
            }
            
            .fiEyesUI-rotatingText-content {
                position: relative;
                width: 100%;
            }
            
            .fiEyesUI-rotatingText-word {
                font-family: 'Orbitron', sans-serif;
                font-size: 40px;
                left: 0;
                margin-bottom: 0;
                margin-top: 30px;
                opacity: 0;
                position: absolute;
                right: 0;
                text-align: center;
                text-transform: uppercase;
                top: 0;
                color: #ffffff;
            }
            
            .fiEyesUI-rotatingText-word:nth-of-type(1) {
                animation: fiEyesUI-rotate-text-up 1500ms 1250ms;
            }
            
            .fiEyesUI-rotatingText-word:nth-of-type(2) {
                animation: fiEyesUI-rotate-text-up 1500ms 2500ms;
            }
            
            .fiEyesUI-rotatingText-word:nth-of-type(3) {
                animation: fiEyesUI-fade-text-in 1500ms 3750ms forwards;
            }
            
            .fiEyesUI-rotatingText-word:nth-of-type(4) {
                animation: fiEyesUI-rotate-text-up 1500ms 5000ms;
            }
            
            .fiEyesUI-rotatingText-word:nth-of-type(5) {
                animation: fiEyesUI-rotate-text-up 1500ms 6250ms;
            }
            
            .fiEyesUI-rotatingText-word:nth-of-type(6) {
                animation: fiEyesUI-fade-text-in 1500ms 7500ms forwards;
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
        
        document.head.appendChild(fiEyesUIStyle);
    }

    generateTextDropCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react react-dom`,
                    usage: `import React from 'react';
import { FiEyesUITextDrop } from 'fincheseye-ui-animation-library';

function MyComponent() {
  return (
    <FiEyesUITextDrop
      text="Welcome To Finches Eyes UI Components"
      fontSize="3em"
      color="#ffffff"
      secondaryColor="#ffffff"
      animationDuration={1.2}
      delayRange={{ min: 1, max: 9 }}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}`,
                    configuration: `// Text Drop Configuration Options
interface FiEyesUITextDropProps {
  text?: string;                    // Text to animate
  fontSize?: string;                // CSS font size
  color?: string;                   // Primary color (default: #ffffff)
  secondaryColor?: string;          // Secondary color for even characters (default: #ffffff)
  animationDuration?: number;       // Animation duration in seconds
  delayRange?: { min: number; max: number }; // Random delay range
  className?: string;               // Additional CSS classes
  style?: React.CSSProperties;     // Inline styles
  onComplete?: () => void;         // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core @angular/common`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUITextDropComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-textDrop
      text="Welcome To Finches Eyes UI Components"
      fontSize="3em"
      color="#ffffff"
      secondaryColor="#ffffff"
      [animationDuration]="1.2"
      [delayRange]="{ min: 1, max: 9 }"
      (complete)="onAnimationComplete()">
    </fiEyesUI-textDrop>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Text Drop Configuration Options
@Component({
  inputs: [
    'text',           // Text to animate
    'fontSize',       // CSS font size
    'color',          // Primary color
    'secondaryColor', // Secondary color for even characters
    'animationDuration', // Animation duration in seconds
    'delayRange',     // Random delay range
    'className',      // Additional CSS classes
    'style'           // Inline styles
  ],
  outputs: ['complete'] // Completion event
})`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUITextDrop } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUITextDrop
  },
  template: \`
    <FiEyesUITextDrop
      text="Welcome To Finches Eyes UI Components"
      fontSize="3em"
      color="#ffffff"
      secondaryColor="#ffffff"
      :animationDuration="1.2"
      :delayRange="{ min: 1, max: 9 }"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Text Drop Configuration Options
interface FiEyesUITextDropProps {
  text?: string;                    // Text to animate
  fontSize?: string;                // CSS font size
  color?: string;                   // Primary color (default: #ffffff)
  secondaryColor?: string;          // Secondary color for even characters (default: #ffffff)
  animationDuration?: number;       // Animation duration in seconds
  delayRange?: { min: number; max: number }; // Random delay range
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateFlyInOutCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react react-dom`,
                    usage: `import React from 'react';
import { FiEyesUIFlyInOut } from 'fincheseye-ui-animation-library';

function MyComponent() {
  return (
    <FiEyesUIFlyInOut
      text="Welcome To Finches Eyes UI Components"
      fontSize="3em"
      color="rgba(255,255,255,0.9)"
      animationDuration={4}
      animationSpeed={100}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}`,
                    configuration: `// Fly In Out Configuration Options
interface FiEyesUIFlyInOutProps {
  text?: string;                    // Text to animate
  fontSize?: string;                // CSS font size
  color?: string;                   // Text color
  animationDuration?: number;        // Animation duration in seconds
  animationSpeed?: number;           // Speed between character animations
  className?: string;                // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  onComplete?: () => void;         // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core @angular/common`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUIFlyInOutComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-flyInOut
      text="Welcome To Finches Eyes UI Components"
      fontSize="3em"
      color="rgba(255,255,255,0.9)"
      [animationDuration]="4"
      [animationSpeed]="100"
      (complete)="onAnimationComplete()">
    </fiEyesUI-flyInOut>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Fly In Out Configuration Options
@Component({
  inputs: [
    'text',           // Text to animate
    'fontSize',       // CSS font size
    'color',          // Text color
    'animationDuration', // Animation duration in seconds
    'animationSpeed', // Speed between character animations
    'className',      // Additional CSS classes
    'style'           // Inline styles
  ],
  outputs: ['complete'] // Completion event
})`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUIFlyInOut } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUIFlyInOut
  },
  template: \`
    <FiEyesUIFlyInOut
      text="Welcome To Finches Eyes UI Components"
      fontSize="3em"
      color="rgba(255,255,255,0.9)"
      :animationDuration="4"
      :animationSpeed="100"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Fly In Out Configuration Options
interface FiEyesUIFlyInOutProps {
  text?: string;                    // Text to animate
  fontSize?: string;                // CSS font size
  color?: string;                   // Text color
  animationDuration?: number;       // Animation duration in seconds
  animationSpeed?: number;           // Speed between character animations
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;      // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateBlurRevealCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react react-dom`,
                    usage: `import React from 'react';
import { FiEyesUIBlurReveal } from 'fincheseye-ui-animation-library';

function MyComponent() {
  return (
    <FiEyesUIBlurReveal
      text="Welcome To Finches Eyes UI Components"
      fontSize="32px"
      color="#ffffff"
      animationDuration={550}
      letterDelay={35}
      autoRepeat={true}
      repeatInterval={2000}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}`,
                    configuration: `// Blur Reveal Configuration Options
interface FiEyesUIBlurRevealProps {
  text?: string;                    // Text to animate
  fontSize?: string;                // CSS font size
  color?: string;                   // Text color (default: #ffffff)
  animationDuration?: number;       // Animation duration in milliseconds
  letterDelay?: number;             // Delay between letters in milliseconds
  autoRepeat?: boolean;             // Auto repeat animation
  repeatInterval?: number;          // Repeat interval in milliseconds
  className?: string;               // Additional CSS classes
  style?: React.CSSProperties;     // Inline styles
  onComplete?: () => void;         // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core @angular/common`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUIBlurRevealComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-blurReveal
      text="Welcome To Finches Eyes UI Components"
      fontSize="32px"
      color="#ffffff"
      [animationDuration]="550"
      [letterDelay]="35"
      [autoRepeat]="true"
      [repeatInterval]="2000"
      (complete)="onAnimationComplete()">
    </fiEyesUI-blurReveal>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Blur Reveal Configuration Options
@Component({
  inputs: [
    'text',           // Text to animate
    'fontSize',       // CSS font size
    'color',          // Text color
    'animationDuration', // Animation duration in milliseconds
    'letterDelay',    // Delay between letters in milliseconds
    'autoRepeat',     // Auto repeat animation
    'repeatInterval', // Repeat interval in milliseconds
    'className',      // Additional CSS classes
    'style'           // Inline styles
  ],
  outputs: ['complete'] // Completion event
})`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUIBlurReveal } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUIBlurReveal
  },
  template: \`
    <FiEyesUIBlurReveal
      text="Welcome To Finches Eyes UI Components"
      fontSize="32px"
      color="#ffffff"
      :animationDuration="550"
      :letterDelay="35"
      :autoRepeat="true"
      :repeatInterval="2000"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Blur Reveal Configuration Options
interface FiEyesUIBlurRevealProps {
  text?: string;                    // Text to animate
  fontSize?: string;                // CSS font size
  color?: string;                   // Text color (default: #ffffff)
  animationDuration?: number;       // Animation duration in milliseconds
  letterDelay?: number;             // Delay between letters in milliseconds
  autoRepeat?: boolean;             // Auto repeat animation
  repeatInterval?: number;          // Repeat interval in milliseconds
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateLetterBounceCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react react-dom`,
                    usage: `import React from 'react';
import { FiEyesUILetterBounce } from 'fincheseye-ui-animation-library';

function MyComponent() {
  return (
    <FiEyesUILetterBounce
      text="Welcome To Finches Eyes UI Components"
      fontSize="4rem"
      color="#ffffff"
      animationDuration={800}
      letterDelay={80}
      loop={true}
      direction="alternate"
      easing="easeInBounce"
      onComplete={() => console.log('Animation completed!')}
    />
  );
}`,
                    configuration: `// Letter Bounce Configuration Options
interface FiEyesUILetterBounceProps {
  text?: string;                    // Text to animate
  fontSize?: string;                // CSS font size (default: "4rem")
  color?: string;                   // Text color (default: "#ffffff")
  animationDuration?: number;       // Animation duration in milliseconds (default: 800)
  letterDelay?: number;             // Delay between letters in milliseconds (default: 80)
  loop?: boolean;                   // Auto loop animation (default: true)
  direction?: 'normal' | 'reverse' | 'alternate'; // Animation direction (default: 'alternate')
  easing?: string;                  // CSS easing function (default: 'easeInBounce')
  className?: string;               // Additional CSS classes
  style?: React.CSSProperties;     // Inline styles
  onComplete?: () => void;         // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core @angular/common`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUILetterBounceComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-letterBounce
      text="Welcome To Finches Eyes UI Components"
      fontSize="4rem"
      color="#ffffff"
      [animationDuration]="800"
      [letterDelay]="80"
      [loop]="true"
      direction="alternate"
      easing="easeInBounce"
      (complete)="onAnimationComplete()">
    </fiEyesUI-letterBounce>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Letter Bounce Configuration Options
@Component({
  inputs: [
    'text',           // Text to animate
    'fontSize',       // CSS font size
    'color',          // Text color
    'animationDuration', // Animation duration in milliseconds
    'letterDelay',    // Delay between letters in milliseconds
    'loop',           // Auto loop animation
    'direction',      // Animation direction
    'easing',         // CSS easing function
    'className',      // Additional CSS classes
    'style'           // Inline styles
  ],
  outputs: ['complete'] // Completion event
})`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUILetterBounce } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUILetterBounce
  },
  template: \`
    <FiEyesUILetterBounce
      text="Welcome To Finches Eyes UI Components"
      fontSize="4rem"
      color="#ffffff"
      :animationDuration="800"
      :letterDelay="80"
      :loop="true"
      direction="alternate"
      easing="easeInBounce"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Letter Bounce Configuration Options
interface FiEyesUILetterBounceProps {
  text?: string;                    // Text to animate
  fontSize?: string;                // CSS font size (default: "4rem")
  color?: string;                   // Text color (default: "#ffffff")
  animationDuration?: number;       // Animation duration in milliseconds (default: 800)
  letterDelay?: number;             // Delay between letters in milliseconds (default: 80)
  loop?: boolean;                   // Auto loop animation (default: true)
  direction?: 'normal' | 'reverse' | 'alternate'; // Animation direction (default: 'alternate')
  easing?: string;                  // CSS easing function (default: 'easeInBounce')
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateTextScaleCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react react-dom`,
                    usage: `import React from 'react';
import { FiEyesUITextScale } from 'fincheseye-ui-animation-library';

function MyComponent() {
  return (
    <FiEyesUITextScale
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      color="#ffffff"
      animationDuration={1500}
      animationDelay={0}
      autoPlay={true}
      repeatInterval={3000}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}`,
                    configuration: `// Text Scale Configuration Options
interface FiEyesUITextScaleProps {
  text?: string;                    // Text to animate
  fontSize?: string;                // CSS font size (default: "80px")
  color?: string;                   // Text color (default: "#ffffff")
  animationDuration?: number;       // Animation duration in milliseconds (default: 1500)
  animationDelay?: number;          // Delay before starting animation (default: 0)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 3000)
  className?: string;               // Additional CSS classes
  style?: React.CSSProperties;     // Inline styles
  onComplete?: () => void;         // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core @angular/common`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUITextScaleComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-textScale
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      color="#ffffff"
      [animationDuration]="1500"
      [animationDelay]="0"
      [autoPlay]="true"
      [repeatInterval]="3000"
      (complete)="onAnimationComplete()">
    </fiEyesUI-textScale>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Text Scale Configuration Options
@Component({
  inputs: [
    'text',           // Text to animate
    'fontSize',       // CSS font size
    'color',          // Text color
    'animationDuration', // Animation duration in milliseconds
    'animationDelay', // Delay before starting animation
    'autoPlay',       // Auto play animation
    'repeatInterval', // Repeat interval in milliseconds
    'className',      // Additional CSS classes
    'style'           // Inline styles
  ],
  outputs: ['complete'] // Completion event
})`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUITextScale } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUITextScale
  },
  template: \`
    <FiEyesUITextScale
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      color="#ffffff"
      :animationDuration="1500"
      :animationDelay="0"
      :autoPlay="true"
      :repeatInterval="3000"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Text Scale Configuration Options
interface FiEyesUITextScaleProps {
  text?: string;                    // Text to animate
  fontSize?: string;                // CSS font size (default: "80px")
  color?: string;                   // Text color (default: "#ffffff")
  animationDuration?: number;       // Animation duration in milliseconds (default: 1500)
  animationDelay?: number;          // Delay before starting animation (default: 0)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 3000)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateRotatingTextCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react react-dom`,
                    usage: `import React from 'react';
import { FiEyesUIRotatingText } from 'fincheseye-ui-animation-library';

function MyComponent() {
  return (
    <FiEyesUIRotatingText
      words={["beautiful", "maintainable", "perfect"]}
      fontSize="40px"
      color="#ffffff"
      animationDuration={1500}
      wordDelay={1250}
      autoPlay={true}
      repeatInterval={5000}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}`,
                    configuration: `// Rotating Text Configuration Options
interface FiEyesUIRotatingTextProps {
  words?: string[];                 // Array of words to animate
  fontSize?: string;                // CSS font size (default: "40px")
  color?: string;                   // Text color (default: "#ffffff")
  animationDuration?: number;       // Animation duration in milliseconds (default: 1500)
  wordDelay?: number;               // Delay between words in milliseconds (default: 1250)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 5000)
  className?: string;               // Additional CSS classes
  style?: React.CSSProperties;     // Inline styles
  onComplete?: () => void;         // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core @angular/common`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUIRotatingTextComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-rotatingText
      [words]="['beautiful', 'maintainable', 'perfect']"
      fontSize="40px"
      color="#ffffff"
      [animationDuration]="1500"
      [wordDelay]="1250"
      [autoPlay]="true"
      [repeatInterval]="5000"
      (complete)="onAnimationComplete()">
    </fiEyesUI-rotatingText>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Rotating Text Configuration Options
@Component({
  inputs: [
    'words',           // Array of words to animate
    'fontSize',        // CSS font size
    'color',           // Text color
    'animationDuration', // Animation duration in milliseconds
    'wordDelay',       // Delay between words in milliseconds
    'autoPlay',        // Auto play animation
    'repeatInterval',  // Repeat interval in milliseconds
    'className',       // Additional CSS classes
    'style'            // Inline styles
  ],
  outputs: ['complete'] // Completion event
})`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUIRotatingText } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUIRotatingText
  },
  template: \`
    <FiEyesUIRotatingText
      :words="['beautiful', 'maintainable', 'perfect']"
      fontSize="40px"
      color="#ffffff"
      :animationDuration="1500"
      :wordDelay="1250"
      :autoPlay="true"
      :repeatInterval="5000"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Rotating Text Configuration Options
interface FiEyesUIRotatingTextProps {
  words?: string[];                 // Array of words to animate
  fontSize?: string;                // CSS font size (default: "40px")
  color?: string;                   // Text color (default: "#ffffff")
  animationDuration?: number;       // Animation duration in milliseconds (default: 1500)
  wordDelay?: number;               // Delay between words in milliseconds (default: 1250)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 5000)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateCharacterFlyInCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react`,
                    usage: `import React from 'react';
import { FiEyesUICharacterFlyIn } from 'fincheseye-ui-animation-library';

function App() {
  return (
    <FiEyesUICharacterFlyIn
      text="Welcome To Finches Eyes UI Components"
      fontSize="32px"
      color="#ffffff"
      animationDuration={2800}
      startDelay={700}
      autoPlay={true}
      repeatInterval={5000}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}

export default App;`,
                    configuration: `// Character Fly In Configuration Options
interface FiEyesUICharacterFlyInProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "32px")
  color?: string;                   // Text color (default: "#ffffff")
  animationDuration?: number;       // Animation duration in milliseconds (default: 2800)
  startDelay?: number;              // Start delay in milliseconds (default: 700)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 5000)
  className?: string;                // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  onComplete?: () => void;          // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUICharacterFlyInComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-root',
  template: \`
    <fiEyesUI-characterFlyIn
      text="Welcome To Finches Eyes UI Components"
      fontSize="32px"
      color="#ffffff"
      [animationDuration]="2800"
      [startDelay]="700"
      [autoPlay]="true"
      [repeatInterval]="5000"
      (complete)="onAnimationComplete()"
    ></fiEyesUI-characterFlyIn>
  \`,
  standalone: true,
  imports: [FiEyesUICharacterFlyInComponent]
})
export class AppComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Character Fly In Configuration Options
interface FiEyesUICharacterFlyInConfig {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "32px")
  color?: string;                   // Text color (default: "#ffffff")
  animationDuration?: number;       // Animation duration in milliseconds (default: 2800)
  startDelay?: number;              // Start delay in milliseconds (default: 700)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 5000)
}

// Events
@Output() complete = new EventEmitter<void>();`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUICharacterFlyIn } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUICharacterFlyIn
  },
  template: \`
    <FiEyesUICharacterFlyIn
      text="Welcome To Finches Eyes UI Components"
      fontSize="32px"
      color="#ffffff"
      :animationDuration="2800"
      :startDelay="700"
      :autoPlay="true"
      :repeatInterval="5000"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Character Fly In Configuration Options
interface FiEyesUICharacterFlyInProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "32px")
  color?: string;                   // Text color (default: "#ffffff")
  animationDuration?: number;       // Animation duration in milliseconds (default: 2800)
  startDelay?: number;              // Start delay in milliseconds (default: 700)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 5000)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateTextRevealCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react`,
                    usage: `import React from 'react';
import { FiEyesUITextReveal } from 'fincheseye-ui-animation-library';

function App() {
  return (
    <FiEyesUITextReveal
      text1="Welcome To"
      text2="Finches Eyes UI Components"
      fontSize1="60px"
      fontSize2="30px"
      color1="#ffffff"
      color2="#ffffff"
      animationDuration={2500}
      autoPlay={true}
      repeatInterval={4000}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}

export default App;`,
                    configuration: `// Text Reveal Configuration Options
interface FiEyesUITextRevealProps {
  text1?: string;                   // First line text (default: "Welcome To")
  text2?: string;                   // Second line text (default: "Finches Eyes UI Components")
  fontSize1?: string;               // First line font size (default: "60px")
  fontSize2?: string;               // Second line font size (default: "30px")
  color1?: string;                  // First line color (default: "#ffffff")
  color2?: string;                  // Second line color (default: "#ffffff")
  animationDuration?: number;       // Animation duration in milliseconds (default: 2500)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 4000)
  className?: string;                // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  onComplete?: () => void;          // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUITextRevealComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-root',
  template: \`
    <fiEyesUI-textReveal
      text1="Welcome To"
      text2="Finches Eyes UI Components"
      fontSize1="60px"
      fontSize2="30px"
      color1="#ffffff"
      color2="#ffffff"
      [animationDuration]="2500"
      [autoPlay]="true"
      [repeatInterval]="4000"
      (complete)="onAnimationComplete()"
    ></fiEyesUI-textReveal>
  \`,
  standalone: true,
  imports: [FiEyesUITextRevealComponent]
})
export class AppComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Text Reveal Configuration Options
interface FiEyesUITextRevealConfig {
  text1?: string;                   // First line text (default: "Welcome To")
  text2?: string;                   // Second line text (default: "Finches Eyes UI Components")
  fontSize1?: string;               // First line font size (default: "60px")
  fontSize2?: string;               // Second line font size (default: "30px")
  color1?: string;                  // First line color (default: "#ffffff")
  color2?: string;                  // Second line color (default: "#ffffff")
  animationDuration?: number;       // Animation duration in milliseconds (default: 2500)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 4000)
}

// Events
@Output() complete = new EventEmitter<void>();`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUITextReveal } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUITextReveal
  },
  template: \`
    <FiEyesUITextReveal
      text1="Welcome To"
      text2="Finches Eyes UI Components"
      fontSize1="60px"
      fontSize2="30px"
      color1="#ffffff"
      color2="#ffffff"
      :animationDuration="2500"
      :autoPlay="true"
      :repeatInterval="4000"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Text Reveal Configuration Options
interface FiEyesUITextRevealProps {
  text1?: string;                   // First line text (default: "Welcome To")
  text2?: string;                   // Second line text (default: "Finches Eyes UI Components")
  fontSize1?: string;               // First line font size (default: "60px")
  fontSize2?: string;               // Second line font size (default: "30px")
  color1?: string;                  // First line color (default: "#ffffff")
  color2?: string;                  // Second line color (default: "#ffffff")
  animationDuration?: number;       // Animation duration in milliseconds (default: 2500)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 4000)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateCharacterGlowCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react`,
                    usage: `import React from 'react';
import { FiEyesUICharacterGlow } from 'fincheseye-ui-animation-library';

function App() {
  return (
    <FiEyesUICharacterGlow
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      color="#ffffff"
      glowColor="#00bbff"
      animationDuration={2250}
      autoPlay={true}
      repeatInterval={3000}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}

export default App;`,
                    configuration: `// Character Glow Configuration Options
interface FiEyesUICharacterGlowProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  color?: string;                   // Text color (default: "#ffffff")
  glowColor?: string;               // Glow color (default: "#00bbff")
  animationDuration?: number;       // Animation duration in milliseconds (default: 2250)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 3000)
  className?: string;                // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  onComplete?: () => void;          // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUICharacterGlowComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-root',
  template: \`
    <fiEyesUI-characterGlow
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      color="#ffffff"
      glowColor="#00bbff"
      [animationDuration]="2250"
      [autoPlay]="true"
      [repeatInterval]="3000"
      (complete)="onAnimationComplete()"
    ></fiEyesUI-characterGlow>
  \`,
  standalone: true,
  imports: [FiEyesUICharacterGlowComponent]
})
export class AppComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Character Glow Configuration Options
interface FiEyesUICharacterGlowConfig {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  color?: string;                   // Text color (default: "#ffffff")
  glowColor?: string;               // Glow color (default: "#00bbff")
  animationDuration?: number;       // Animation duration in milliseconds (default: 2250)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 3000)
}

// Events
@Output() complete = new EventEmitter<void>();`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUICharacterGlow } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUICharacterGlow
  },
  template: \`
    <FiEyesUICharacterGlow
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      color="#ffffff"
      glowColor="#00bbff"
      :animationDuration="2250"
      :autoPlay="true"
      :repeatInterval="3000"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Character Glow Configuration Options
interface FiEyesUICharacterGlowProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  color?: string;                   // Text color (default: "#ffffff")
  glowColor?: string;               // Glow color (default: "#00bbff")
  animationDuration?: number;      // Animation duration in milliseconds (default: 2250)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 3000)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    tryAnimation() {
        if (!this.currentAnimation) return;
        
        // Ensure styles are created before rendering
        this.ensureAnimationStyles(this.currentAnimation.name);
        
        // Show the demo area
        const demoArea = document.getElementById('demo-area');
        demoArea.classList.add('visible');
        
        // Render the animation in the demo area
        const demoElement = document.getElementById('demo-element');
        if (demoElement) {
            this.renderAnimationPreview(this.currentAnimation, demoElement);
        }
        
        this.closeModal();
    }

    resetDemo() {
        const demoElement = document.getElementById('demo-element');
        if (demoElement) {
            demoElement.innerHTML = '';
        }
        
        // Hide the demo area
        const demoArea = document.getElementById('demo-area');
        demoArea.classList.remove('visible');
    }

    switchTab(tabName) {
        // Remove active class from all tabs and panels
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

        // Add active class to selected tab and panel
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    copyCode() {
        const activePanel = document.querySelector('.tab-panel.active');
        const code = activePanel.querySelector('code').textContent;
        
        navigator.clipboard.writeText(code).then(() => {
            const copyBtn = document.getElementById('copy-code');
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.style.background = '#28a745';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
            }, 2000);
        });
    }

    closeModal() {
        const modal = document.getElementById('preview-modal');
        modal.classList.remove('active');
        this.currentAnimation = null;
    }

    playPreviewAnimation() {
        const previewContainer = document.getElementById('preview-animation');
        if (!previewContainer || !this.currentAnimation) return;

        // Ensure styles are created before re-rendering
        this.ensureAnimationStyles(this.currentAnimation.name);

        // Re-render the animation to restart it
        this.renderAnimationPreview(this.currentAnimation, previewContainer);
    }

    resetPreviewAnimation() {
        const previewContainer = document.getElementById('preview-animation');
        if (!previewContainer || !this.currentAnimation) return;

        // Ensure styles are created before re-rendering
        this.ensureAnimationStyles(this.currentAnimation.name);

        // Clear the animation
        previewContainer.innerHTML = '';
        
        // Re-render the animation
        setTimeout(() => {
            this.renderAnimationPreview(this.currentAnimation, previewContainer);
        }, 100);
    }

    setupModal() {
        // Modal is already set up in HTML and event listeners are attached
    }

    setupDemoArea() {
        // Demo area is already set up in HTML
    }

    // Character Fly In Animation Methods
    previewCharacterFlyIn(animationName) {
        const element = document.getElementById(`characterFlyIn-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeCharacterFlyIn(element);
        }
    }

    fiEyesUIInitializeCharacterFlyIn(container) {
        if (!container) return;
        
        const fiEyesUIListDiv = container.querySelector('.fiEyesUI-characterFlyIn-list');
        if (!fiEyesUIListDiv) return;
        
        fiEyesUIListDiv.innerHTML = '';
        
        const fiEyesUIText = 'Welcome To Finches Eyes UI Components';
        const fiEyesUICharacters = fiEyesUIText.split('');
        fiEyesUICharacters.forEach((fiEyesUIChar) => {
            const fiEyesUICharacterDiv = document.createElement('li');
            fiEyesUICharacterDiv.className = 'fiEyesUI-characterFlyIn-character';
            fiEyesUICharacterDiv.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
            fiEyesUIListDiv.appendChild(fiEyesUICharacterDiv);
        });
        
        // Add hidden class initially
        fiEyesUIListDiv.classList.add('fiEyesUI-hidden');
        
        // Remove hidden class after delay to start animation
        setTimeout(() => {
            fiEyesUIListDiv.classList.remove('fiEyesUI-hidden');
        }, 700);
    }

    fiEyesUICreateCharacterFlyInStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-characterFlyIn-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-characterFlyIn-demo {
                font-family: 'Orbitron', sans-serif;
                font-weight: 600;
                text-align: center;
                margin: 0;
                padding: 20px;
                font-size: 32px;
                min-height: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #000000;
                color: #ffffff;
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
                font-size: 32px;
                color: #ffffff;
                opacity: 1;
                transition: all 2800ms cubic-bezier(0.6, -.005, 0.32, 1.75);
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
        
        document.head.appendChild(fiEyesUIStyle);
    }

    // Text Reveal Animation Methods
    previewTextReveal(animationName) {
        const element = document.getElementById(`textReveal-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeTextReveal(element);
        }
    }

    fiEyesUIInitializeTextReveal(container) {
        if (!container) return;
        
        // Animation is handled by CSS, just trigger it
        const fiEyesUIText1 = container.querySelector('.fiEyesUI-textReveal-text1');
        if (fiEyesUIText1) {
            // Reset animation by removing and re-adding the class
            fiEyesUIText1.style.animation = 'none';
            setTimeout(() => {
                fiEyesUIText1.style.animation = 'fiEyesUI-text-reveal 2500ms 1';
            }, 10);
        }
    }

    fiEyesUICreateTextRevealStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-textReveal-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-textReveal-demo {
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
            
            .fiEyesUI-textReveal-content {
                text-align: center;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
            }
            
            .fiEyesUI-textReveal-span {
                text-transform: uppercase;
                display: block;
            }
            
            .fiEyesUI-textReveal-text1 {
                color: #ffffff;
                font-size: 60px;
                font-weight: 700;
                letter-spacing: 8px;
                margin-bottom: 20px;
                background: #000000;
                position: relative;
                animation: fiEyesUI-text-reveal 2500ms 1;
            }
            
            .fiEyesUI-textReveal-text2 {
                font-size: 30px;
                color: #ffffff;
            }
            
            @keyframes fiEyesUI-text-reveal {
                0% {
                    color: #000000;
                    margin-bottom: -40px;
                }
                30% {
                    letter-spacing: 25px;
                    margin-bottom: -40px;
                }
                100% {
                    color: #ffffff;
                    letter-spacing: 8px;
                    margin-bottom: 20px;
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    // Character Glow Animation Methods
    previewCharacterGlow(animationName) {
        const element = document.getElementById(`characterGlow-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeCharacterGlow(element);
        }
    }

    fiEyesUIInitializeCharacterGlow(container) {
        if (!container) return;
        
        const fiEyesUIContentDiv = container.querySelector('.fiEyesUI-characterGlow-content');
        if (!fiEyesUIContentDiv) return;
        
        fiEyesUIContentDiv.innerHTML = '';
        
        const fiEyesUIText = 'Welcome To Finches Eyes UI Components';
        const fiEyesUICharacters = fiEyesUIText.split('');
        fiEyesUICharacters.forEach((fiEyesUIChar) => {
            const fiEyesUICharacterSpan = document.createElement('span');
            fiEyesUICharacterSpan.className = 'fiEyesUI-characterGlow-character';
            fiEyesUICharacterSpan.textContent = fiEyesUIChar === ' ' ? '\u00A0' : fiEyesUIChar;
            fiEyesUIContentDiv.appendChild(fiEyesUICharacterSpan);
        });
    }

    fiEyesUICreateCharacterGlowStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-characterGlow-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-characterGlow-demo {
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
                font-size: 80px;
                font-family: 'Orbitron', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .fiEyesUI-characterGlow-character {
                display: block;
                float: left;
                animation: fiEyesUI-character-glow 2250ms linear infinite;
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
                    color: #ffffff;
                    filter: blur(2px);
                    text-shadow: 0 0 10px #00bbff,
                      0 0 20px #00bbff,
                      0 0 40px #00bbff,
                      0 0 80px #00bbff,
                      0 0 120px #00bbff,
                      0 0 200px #00bbff,
                      0 0 300px #00bbff,
                      0 0 400px #00bbff;
                }
                5%, 95% {
                    color: #111;
                    filter: blur(0px);
                    text-shadow: none;
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    // Text Stroke Animation Methods
    previewTextStroke(animationName) {
        const element = document.getElementById(`textStroke-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeTextStroke(element);
        }
    }

    fiEyesUIInitializeTextStroke(container) {
        if (!container) return;
        
        // Animation is handled by CSS, just trigger it
        const fiEyesUIText2 = container.querySelector('.fiEyesUI-textStroke-text:nth-child(2)');
        if (fiEyesUIText2) {
            // Reset animation by removing and re-adding the class
            fiEyesUIText2.style.animation = 'none';
            setTimeout(() => {
                fiEyesUIText2.style.animation = 'fiEyesUI-text-stroke-animate 4000ms ease-in-out infinite';
            }, 10);
        }
    }

    fiEyesUICreateTextStrokeStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-textStroke-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-textStroke-demo {
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
            
            .fiEyesUI-textStroke-content {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .fiEyesUI-textStroke-text {
                color: #ffffff;
                font-size: 80px;
                font-family: 'Orbitron', sans-serif;
                position: absolute;
                transform: translate(-50%, -50%);
                left: 50%;
                top: 50%;
                margin: 0;
                padding: 0;
            }
            
            .fiEyesUI-textStroke-text:nth-child(1) {
                color: transparent;
                -webkit-text-stroke: 2px #8338ec;
                text-stroke: 2px #8338ec;
            }
            
            .fiEyesUI-textStroke-text:nth-child(2) {
                color: #c19bf5;
                animation: fiEyesUI-text-stroke-animate 4000ms ease-in-out infinite;
            }
            
            @keyframes fiEyesUI-text-stroke-animate {
                0%, 100% {
                    clip-path: polygon(
                        0% 45%,
                        16% 44%,
                        33% 50%,
                        54% 60%,
                        70% 61%,
                        84% 59%,
                        100% 52%,
                        100% 100%,
                        0% 100%
                    );
                }
                50% {
                    clip-path: polygon(
                        0% 60%,
                        15% 65%,
                        34% 66%,
                        51% 62%,
                        67% 50%,
                        84% 45%,
                        100% 46%,
                        100% 100%,
                        0% 100%
                    );
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    generateTextStrokeCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react`,
                    usage: `import React from 'react';
import { FiEyesUITextStroke } from 'fincheseye-ui-animation-library';

function App() {
  return (
    <FiEyesUITextStroke
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      strokeColor="#8338ec"
      fillColor="#c19bf5"
      strokeWidth="2px"
      animationDuration={4000}
      autoPlay={true}
      repeatInterval={5000}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}

export default App;`,
                    configuration: `// Text Stroke Configuration Options
interface FiEyesUITextStrokeProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  strokeColor?: string;             // Stroke color (default: "#8338ec")
  fillColor?: string;               // Fill color (default: "#c19bf5")
  strokeWidth?: string;             // Stroke width (default: "2px")
  animationDuration?: number;       // Animation duration in milliseconds (default: 4000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 5000)
  className?: string;                // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  onComplete?: () => void;          // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUITextStrokeComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-root',
  template: \`
    <fiEyesUI-textStroke
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      strokeColor="#8338ec"
      fillColor="#c19bf5"
      strokeWidth="2px"
      [animationDuration]="4000"
      [autoPlay]="true"
      [repeatInterval]="5000"
      (complete)="onAnimationComplete()"
    ></fiEyesUI-textStroke>
  \`,
  standalone: true,
  imports: [FiEyesUITextStrokeComponent]
})
export class AppComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Text Stroke Configuration Options
interface FiEyesUITextStrokeConfig {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  strokeColor?: string;             // Stroke color (default: "#8338ec")
  fillColor?: string;               // Fill color (default: "#c19bf5")
  strokeWidth?: string;             // Stroke width (default: "2px")
  animationDuration?: number;       // Animation duration in milliseconds (default: 4000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 5000)
}

// Events
@Output() complete = new EventEmitter<void>();`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUITextStroke } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUITextStroke
  },
  template: \`
    <FiEyesUITextStroke
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      strokeColor="#8338ec"
      fillColor="#c19bf5"
      strokeWidth="2px"
      :animationDuration="4000"
      :autoPlay="true"
      :repeatInterval="5000"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Text Stroke Configuration Options
interface FiEyesUITextStrokeProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  strokeColor?: string;             // Stroke color (default: "#8338ec")
  fillColor?: string;               // Fill color (default: "#c19bf5")
  strokeWidth?: string;             // Stroke width (default: "2px")
  animationDuration?: number;       // Animation duration in milliseconds (default: 4000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 5000)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    // Typewriter Animation Methods
    previewTypewriter(animationName) {
        const element = document.getElementById(`typewriter-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeTypewriter(element);
        }
    }

    fiEyesUIInitializeTypewriter(container) {
        if (!container) return;
        
        // Animation is handled by CSS, just trigger it
        const fiEyesUITextElement = container.querySelector('.fiEyesUI-typewriter-text');
        if (fiEyesUITextElement) {
            // Reset animation by removing and re-adding the class
            fiEyesUITextElement.style.animation = 'none';
            setTimeout(() => {
                fiEyesUITextElement.style.animation = 'fiEyesUI-cursor 1000ms step-start infinite, fiEyesUI-typewriter-text 5000ms steps(35) alternate infinite';
            }, 10);
        }
    }

    fiEyesUICreateTypewriterStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-typewriter-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-typewriter-demo {
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
            
            .fiEyesUI-typewriter-content {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 80px;
                font-family: 'Orbitron', sans-serif;
                font-weight: bold;
            }
            
            .fiEyesUI-typewriter-text {
                white-space: nowrap;
                overflow: hidden;
                border-right: 4px solid #ffffff;
                animation: fiEyesUI-cursor 1000ms step-start infinite, 
                           fiEyesUI-typewriter-text 5000ms steps(35) alternate infinite;
            }
            
            @keyframes fiEyesUI-cursor {
                0%, 100% { 
                    border-color: #ffffff; 
                }
            }
            
            @keyframes fiEyesUI-typewriter-text {
                0% { 
                    width: 0; 
                }
                100% { 
                    width: 35ch; 
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    generateTypewriterCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react`,
                    usage: `import React from 'react';
import { FiEyesUITypewriter } from 'fincheseye-ui-animation-library';

function App() {
  return (
    <FiEyesUITypewriter
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      cursorColor="#ffffff"
      cursorWidth="4px"
      animationDuration={5000}
      cursorBlinkSpeed={1000}
      autoPlay={true}
      repeatInterval={6000}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}

export default App;`,
                    configuration: `// Typewriter Configuration Options
interface FiEyesUITypewriterProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  cursorColor?: string;             // Cursor color (default: "#ffffff")
  cursorWidth?: string;             // Cursor width (default: "4px")
  animationDuration?: number;       // Animation duration in milliseconds (default: 5000)
  cursorBlinkSpeed?: number;        // Cursor blink speed in milliseconds (default: 1000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 6000)
  className?: string;                // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  onComplete?: () => void;          // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUITypewriterComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-root',
  template: \`
    <fiEyesUI-typewriter
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      cursorColor="#ffffff"
      cursorWidth="4px"
      [animationDuration]="5000"
      [cursorBlinkSpeed]="1000"
      [autoPlay]="true"
      [repeatInterval]="6000"
      (complete)="onAnimationComplete()"
    ></fiEyesUI-typewriter>
  \`,
  standalone: true,
  imports: [FiEyesUITypewriterComponent]
})
export class AppComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Typewriter Configuration Options
interface FiEyesUITypewriterConfig {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  cursorColor?: string;             // Cursor color (default: "#ffffff")
  cursorWidth?: string;             // Cursor width (default: "4px")
  animationDuration?: number;       // Animation duration in milliseconds (default: 5000)
  cursorBlinkSpeed?: number;        // Cursor blink speed in milliseconds (default: 1000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 6000)
}

// Events
@Output() complete = new EventEmitter<void>();`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUITypewriter } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUITypewriter
  },
  template: \`
    <FiEyesUITypewriter
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      cursorColor="#ffffff"
      cursorWidth="4px"
      :animationDuration="5000"
      :cursorBlinkSpeed="1000"
      :autoPlay="true"
      :repeatInterval="6000"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Typewriter Configuration Options
interface FiEyesUITypewriterProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  cursorColor?: string;             // Cursor color (default: "#ffffff")
  cursorWidth?: string;             // Cursor width (default: "4px")
  animationDuration?: number;       // Animation duration in milliseconds (default: 5000)
  cursorBlinkSpeed?: number;        // Cursor blink speed in milliseconds (default: 1000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 6000)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    // Fade In Animation Methods
    previewFadeIn(animationName) {
        const element = document.getElementById(`fadeIn-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeFadeIn(element);
        }
    }

    fiEyesUIInitializeFadeIn(container) {
        if (!container) return;
        
        // Animation is handled by CSS, just trigger it
        const fiEyesUIContentElement = container.querySelector('.fiEyesUI-fadeIn-content');
        if (fiEyesUIContentElement) {
            // Reset animation by removing and re-adding the class
            fiEyesUIContentElement.style.animation = 'none';
            setTimeout(() => {
                fiEyesUIContentElement.style.animation = 'fiEyesUI-fade-in 7000ms ease both';
            }, 10);
        }
    }

    fiEyesUICreateFadeInStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-fadeIn-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-fadeIn-demo {
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
            
            .fiEyesUI-fadeIn-content {
                font-size: 80px;
                font-family: 'Orbitron', sans-serif;
                font-weight: 900;
                color: #ffffff;
                padding: 1rem;
                text-align: center;
                animation-name: fiEyesUI-fade-in;
                animation-duration: 7000ms;
                animation-fill-mode: both;
            }
            
            @keyframes fiEyesUI-fade-in {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    generateFadeInCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react`,
                    usage: `import React from 'react';
import { FiEyesUIFadeIn } from 'fincheseye-ui-animation-library';

function App() {
  return (
    <FiEyesUIFadeIn
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      animationDuration={7000}
      autoPlay={true}
      repeatInterval={8000}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}

export default App;`,
                    configuration: `// Fade In Configuration Options
interface FiEyesUIFadeInProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  animationDuration?: number;       // Animation duration in milliseconds (default: 7000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 8000)
  className?: string;                // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  onComplete?: () => void;          // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUIFadeInComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-root',
  template: \`
    <fiEyesUI-fadeIn
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      [animationDuration]="7000"
      [autoPlay]="true"
      [repeatInterval]="8000"
      (complete)="onAnimationComplete()"
    ></fiEyesUI-fadeIn>
  \`,
  standalone: true,
  imports: [FiEyesUIFadeInComponent]
})
export class AppComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Fade In Configuration Options
interface FiEyesUIFadeInConfig {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  animationDuration?: number;       // Animation duration in milliseconds (default: 7000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 8000)
}

// Events
@Output() complete = new EventEmitter<void>();`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUIFadeIn } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUIFadeIn
  },
  template: \`
    <FiEyesUIFadeIn
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      :animationDuration="7000"
      :autoPlay="true"
      :repeatInterval="8000"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Fade In Configuration Options
interface FiEyesUIFadeInProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  animationDuration?: number;       // Animation duration in milliseconds (default: 7000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 8000)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    // Gradient Text Animation Methods
    previewGradientText(animationName) {
        const element = document.getElementById(`gradientText-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeGradientText(element);
        }
    }

    fiEyesUIInitializeGradientText(container) {
        if (!container) return;
        
        // Animation is handled by CSS, just trigger it
        const fiEyesUIContentElement = container.querySelector('.fiEyesUI-gradientText-content');
        if (fiEyesUIContentElement) {
            // Reset animation by removing and re-adding the class
            fiEyesUIContentElement.style.animation = 'none';
            setTimeout(() => {
                fiEyesUIContentElement.style.animation = 'fiEyesUI-textclip 2000ms linear infinite';
            }, 10);
        }
    }

    fiEyesUICreateGradientTextStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-gradientText-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-gradientText-demo {
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
            
            .fiEyesUI-gradientText-content {
                text-transform: uppercase;
                background-image: linear-gradient(
                    -225deg,
                    #231557 0%,
                    #44107a 29%,
                    #ff1361 67%,
                    #fff800 100%
                );
                background-size: auto auto;
                background-clip: border-box;
                background-size: 200% auto;
                color: #fff;
                background-clip: text;
                text-fill-color: transparent;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: fiEyesUI-textclip 2000ms linear infinite;
                display: inline-block;
                font-size: 80px;
                font-family: 'Orbitron', sans-serif;
            }
            
            @keyframes fiEyesUI-textclip {
                to {
                    background-position: 200% center;
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    generateGradientTextCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react`,
                    usage: `import React from 'react';
import { FiEyesUIGradientText } from 'fincheseye-ui-animation-library';

function App() {
  return (
    <FiEyesUIGradientText
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      gradientColors={['#231557', '#44107a', '#ff1361', '#fff800']}
      animationDuration={2000}
      autoPlay={true}
      repeatInterval={3000}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}

export default App;`,
                    configuration: `// Gradient Text Configuration Options
interface FiEyesUIGradientTextProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  gradientColors?: string[];        // Array of gradient colors (default: ['#231557', '#44107a', '#ff1361', '#fff800'])
  animationDuration?: number;       // Animation duration in milliseconds (default: 2000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 3000)
  className?: string;                // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  onComplete?: () => void;          // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUIGradientTextComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-root',
  template: \`
    <fiEyesUI-gradientText
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      [gradientColors]="['#231557', '#44107a', '#ff1361', '#fff800']"
      [animationDuration]="2000"
      [autoPlay]="true"
      [repeatInterval]="3000"
      (complete)="onAnimationComplete()"
    ></fiEyesUI-gradientText>
  \`,
  standalone: true,
  imports: [FiEyesUIGradientTextComponent]
})
export class AppComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Gradient Text Configuration Options
interface FiEyesUIGradientTextConfig {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  gradientColors?: string[];        // Array of gradient colors (default: ['#231557', '#44107a', '#ff1361', '#fff800'])
  animationDuration?: number;       // Animation duration in milliseconds (default: 2000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 3000)
}

// Events
@Output() complete = new EventEmitter<void>();`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUIGradientText } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUIGradientText
  },
  template: \`
    <FiEyesUIGradientText
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      :gradientColors="['#231557', '#44107a', '#ff1361', '#fff800']"
      :animationDuration="2000"
      :autoPlay="true"
      :repeatInterval="3000"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Gradient Text Configuration Options
interface FiEyesUIGradientTextProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  gradientColors?: string[];        // Array of gradient colors (default: ['#231557', '#44107a', '#ff1361', '#fff800'])
  animationDuration?: number;       // Animation duration in milliseconds (default: 2000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 3000)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    // Resize Effect Animation Methods
    previewResizeEffect(animationName) {
        const element = document.getElementById(`resizeEffect-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeResizeEffect(element);
        }
    }

    fiEyesUIInitializeResizeEffect(container) {
        if (!container) return;
        
        // Animation is handled by CSS, just trigger it
        const fiEyesUIContentElement = container.querySelector('.fiEyesUI-resizeEffect-content');
        if (fiEyesUIContentElement) {
            // Reset animation by removing and re-adding the class
            fiEyesUIContentElement.style.animation = 'none';
            setTimeout(() => {
                fiEyesUIContentElement.style.animation = 'fiEyesUI-resize-anime 5000ms infinite forwards';
                fiEyesUIContentElement.style.animationDirection = 'alternate';
            }, 10);
        }
    }

    fiEyesUICreateResizeEffectStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-resizeEffect-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-resizeEffect-demo {
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
            
            .fiEyesUI-resizeEffect-content {
                font-size: 20px;
                font-weight: 100;
                font-family: 'Orbitron', sans-serif;
                animation: fiEyesUI-resize-anime 5000ms infinite forwards;
                animation-direction: alternate;
                color: #ffffff;
            }
            
            @keyframes fiEyesUI-resize-anime {
                from {
                    font-size: 20px;
                    font-weight: 100;
                    opacity: 0;
                } 
                to {
                    font-size: 50px;
                    font-weight: 900;
                    text-shadow: 0px 0px 5px #ffffff;
                    opacity: 1;
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    generateResizeEffectCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react`,
                    usage: `import React from 'react';
import { FiEyesUIResizeEffect } from 'fincheseye-ui-animation-library';

function App() {
  return (
    <FiEyesUIResizeEffect
      text="Welcome To Finches Eyes UI Components"
      minFontSize="20px"
      maxFontSize="50px"
      minFontWeight={100}
      maxFontWeight={900}
      animationDuration={5000}
      autoPlay={true}
      repeatInterval={6000}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}

export default App;`,
                    configuration: `// Resize Effect Configuration Options
interface FiEyesUIResizeEffectProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  minFontSize?: string;             // Minimum font size (default: "20px")
  maxFontSize?: string;             // Maximum font size (default: "50px")
  minFontWeight?: number;           // Minimum font weight (default: 100)
  maxFontWeight?: number;           // Maximum font weight (default: 900)
  animationDuration?: number;       // Animation duration in milliseconds (default: 5000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 6000)
  className?: string;               // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  onComplete?: () => void;          // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUIResizeEffectComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-root',
  template: \`
    <fiEyesUI-resizeEffect
      text="Welcome To Finches Eyes UI Components"
      minFontSize="20px"
      maxFontSize="50px"
      [minFontWeight]="100"
      [maxFontWeight]="900"
      [animationDuration]="5000"
      [autoPlay]="true"
      [repeatInterval]="6000"
      (complete)="onAnimationComplete()"
    ></fiEyesUI-resizeEffect>
  \`,
  standalone: true,
  imports: [FiEyesUIResizeEffectComponent]
})
export class AppComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Resize Effect Configuration Options
interface FiEyesUIResizeEffectConfig {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  minFontSize?: string;             // Minimum font size (default: "20px")
  maxFontSize?: string;             // Maximum font size (default: "50px")
  minFontWeight?: number;           // Minimum font weight (default: 100)
  maxFontWeight?: number;           // Maximum font weight (default: 900)
  animationDuration?: number;       // Animation duration in milliseconds (default: 5000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 6000)
}

// Events
@Output() complete = new EventEmitter<void>();`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUIResizeEffect } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUIResizeEffect
  },
  template: \`
    <FiEyesUIResizeEffect
      text="Welcome To Finches Eyes UI Components"
      minFontSize="20px"
      maxFontSize="50px"
      :minFontWeight="100"
      :maxFontWeight="900"
      :animationDuration="5000"
      :autoPlay="true"
      :repeatInterval="6000"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Resize Effect Configuration Options
interface FiEyesUIResizeEffectProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  minFontSize?: string;             // Minimum font size (default: "20px")
  maxFontSize?: string;             // Maximum font size (default: "50px")
  minFontWeight?: number;           // Minimum font weight (default: 100)
  maxFontWeight?: number;           // Maximum font weight (default: 900)
  animationDuration?: number;       // Animation duration in milliseconds (default: 5000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 6000)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    // Text Scale Bounce Animation Methods
    previewTextScaleBounce(animationName) {
        const element = document.getElementById(`textScaleBounce-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeTextScaleBounce(element);
        }
    }

    fiEyesUIInitializeTextScaleBounce(container) {
        if (!container) return;
        
        const fiEyesUIContentElement = container.querySelector('.fiEyesUI-textScaleBounce-content');
        if (fiEyesUIContentElement) {
            fiEyesUIContentElement.classList.add('fiEyesUI-textScaleBounce-animate');
            
            setTimeout(() => {
                fiEyesUIContentElement.classList.remove('fiEyesUI-textScaleBounce-animate');
            }, 1500);
        }
    }

    fiEyesUICreateTextScaleBounceStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-textScaleBounce-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-textScaleBounce-demo {
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
            
            .fiEyesUI-textScaleBounce-content {
                font-size: 80px;
                font-family: 'Orbitron', sans-serif;
                font-weight: bolder;
                color: #ffffff;
                text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
                display: inline;
                margin: auto;
            }
            
            .fiEyesUI-textScaleBounce-animate {
                animation: fiEyesUI-textScaleBounce-rotate 1500ms linear forwards;
            }
            
            @keyframes fiEyesUI-textScaleBounce-rotate {
                0% {
                    transform: scale(0);
                }
                10% {
                    font-size: 80px;
                    transform: scale(2);
                }
                20% {
                    transform: scale(0.5);
                }
                40% {
                    transform: scale(1.5);
                }
                60% {
                    transform: scale(0.8);
                }
                80% {
                    transform: scale(1.2);
                }
                100% {
                    font-size: 80px;
                    transform: scale(1);
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    generateTextScaleBounceCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react`,
                    usage: `import React from 'react';
import { FiEyesUITextScaleBounce } from 'fincheseye-ui-animation-library';

function App() {
  return (
    <FiEyesUITextScaleBounce
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      animationDuration={1500}
      autoPlay={true}
      repeatInterval={3000}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}

export default App;`,
                    configuration: `// Text Scale Bounce Configuration Options
interface FiEyesUITextScaleBounceProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  animationDuration?: number;       // Animation duration in milliseconds (default: 1500)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 3000)
  className?: string;               // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  onComplete?: () => void;          // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUITextScaleBounceComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-root',
  template: \`
    <fiEyesUI-textScaleBounce
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      [animationDuration]="1500"
      [autoPlay]="true"
      [repeatInterval]="3000"
      (complete)="onAnimationComplete()"
    ></fiEyesUI-textScaleBounce>
  \`,
  standalone: true,
  imports: [FiEyesUITextScaleBounceComponent]
})
export class AppComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Text Scale Bounce Configuration Options
interface FiEyesUITextScaleBounceConfig {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  animationDuration?: number;       // Animation duration in milliseconds (default: 1500)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 3000)
}

// Events
@Output() complete = new EventEmitter<void>();`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUITextScaleBounce } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUITextScaleBounce
  },
  template: \`
    <FiEyesUITextScaleBounce
      text="Welcome To Finches Eyes UI Components"
      fontSize="80px"
      :animationDuration="1500"
      :autoPlay="true"
      :repeatInterval="3000"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Text Scale Bounce Configuration Options
interface FiEyesUITextScaleBounceProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "80px")
  animationDuration?: number;       // Animation duration in milliseconds (default: 1500)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 3000)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    // Text Swipe Animation Methods
    previewTextSwipe(animationName) {
        const element = document.getElementById(`textSwipe-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeTextSwipe(element);
        }
    }

    fiEyesUIInitializeTextSwipe(container) {
        if (!container) return;
        
        const fiEyesUIContentElement = container.querySelector('.fiEyesUI-textSwipe-content');
        if (fiEyesUIContentElement) {
            fiEyesUIContentElement.innerHTML = '';
            
            const text = 'Welcome To Finches Eyes UI Components';
            const letters = text.split('');
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.className = 'fiEyesUI-textSwipe-letter';
                span.id = `fiEyesUI-letter-${index}`;
                span.textContent = letter;
                fiEyesUIContentElement.appendChild(span);
            });
            
            // Start animation
            const letterElements = fiEyesUIContentElement.querySelectorAll('.fiEyesUI-textSwipe-letter');
            const textLength = letterElements.length - 1;
            
            letterElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.toggle('fiEyesUI-textSwipe-opaque');
                }, (index + (textLength / 2)) * 10 * (100 / textLength));
            });
        }
    }

    fiEyesUICreateTextSwipeStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-textSwipe-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-textSwipe-demo {
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
                font-size: 48px;
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
                animation: fiEyesUI-textSwipe-opacity 1000ms linear;
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
        
        document.head.appendChild(fiEyesUIStyle);
    }

    generateTextSwipeCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react`,
                    usage: `import React from 'react';
import { FiEyesUITextSwipe } from 'fincheseye-ui-animation-library';

function App() {
  return (
    <FiEyesUITextSwipe
      text="Welcome To Finches Eyes UI Components"
      fontSize="48px"
      animationDuration={1000}
      autoPlay={true}
      repeatInterval={2000}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}

export default App;`,
                    configuration: `// Text Swipe Configuration Options
interface FiEyesUITextSwipeProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "48px")
  animationDuration?: number;      // Animation duration in milliseconds (default: 1000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 2000)
  className?: string;               // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  onComplete?: () => void;          // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUITextSwipeComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-root',
  template: \`
    <fiEyesUI-textSwipe
      text="Welcome To Finches Eyes UI Components"
      fontSize="48px"
      [animationDuration]="1000"
      [autoPlay]="true"
      [repeatInterval]="2000"
      (complete)="onAnimationComplete()"
    ></fiEyesUI-textSwipe>
  \`,
  standalone: true,
  imports: [FiEyesUITextSwipeComponent]
})
export class AppComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Text Swipe Configuration Options
interface FiEyesUITextSwipeConfig {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "48px")
  animationDuration?: number;      // Animation duration in milliseconds (default: 1000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 2000)
}

// Events
@Output() complete = new EventEmitter<void>();`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUITextSwipe } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUITextSwipe
  },
  template: \`
    <FiEyesUITextSwipe
      text="Welcome To Finches Eyes UI Components"
      fontSize="48px"
      :animationDuration="1000"
      :autoPlay="true"
      :repeatInterval="2000"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Text Swipe Configuration Options
interface FiEyesUITextSwipeProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "48px")
  animationDuration?: number;      // Animation duration in milliseconds (default: 1000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 2000)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    // Hover Fill Animation Methods
    previewHoverFill(animationName) {
        const element = document.getElementById(`hoverFill-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeHoverFill(element);
        }
    }

    fiEyesUIInitializeHoverFill(container) {
        if (!container) return;
        
        // Animation is handled by CSS hover states
        // No additional initialization needed
    }

    fiEyesUICreateHoverFillStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-hoverFill-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-hoverFill-demo {
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
                color: #ffffff;
                position: relative;
                display: inline-block;
                text-decoration: none;
                font-size: 24px;
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
                color: #ffffff;
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
        
        document.head.appendChild(fiEyesUIStyle);
    }

    generateHoverFillCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react`,
                    usage: `import React from 'react';
import { FiEyesUIHoverFill } from 'fincheseye-ui-animation-library';

function App() {
  return (
    <FiEyesUIHoverFill
      text="Welcome To Finches Eyes UI Components"
      fontSize="24px"
      color="#ffffff"
      hoverColor="#ffffff"
      onClick={() => console.log('Link clicked!')}
    />
  );
}

export default App;`,
                    configuration: `// Hover Fill Configuration Options
interface FiEyesUIHoverFillProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "24px")
  color?: string;                   // Text color (default: "#ffffff")
  hoverColor?: string;              // Hover color (default: "#ffffff")
  className?: string;               // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  onClick?: () => void;             // Click callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUIHoverFillComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-root',
  template: \`
    <fiEyesUI-hoverFill
      text="Welcome To Finches Eyes UI Components"
      fontSize="24px"
      color="#ffffff"
      hoverColor="#ffffff"
      (click)="onClick()"
    ></fiEyesUI-hoverFill>
  \`,
  standalone: true,
  imports: [FiEyesUIHoverFillComponent]
})
export class AppComponent {
  onClick() {
    console.log('Link clicked!');
  }
}`,
                    configuration: `// Hover Fill Configuration Options
interface FiEyesUIHoverFillConfig {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "24px")
  color?: string;                   // Text color (default: "#ffffff")
  hoverColor?: string;              // Hover color (default: "#ffffff")
}

// Events
@Output() click = new EventEmitter<void>();`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUIHoverFill } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUIHoverFill
  },
  template: \`
    <FiEyesUIHoverFill
      text="Welcome To Finches Eyes UI Components"
      fontSize="24px"
      color="#ffffff"
      hoverColor="#ffffff"
      @click="onClick"
    />
  \`,
  methods: {
    onClick() {
      console.log('Link clicked!');
    }
  }
});`,
                    configuration: `// Hover Fill Configuration Options
interface FiEyesUIHoverFillProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // CSS font size (default: "24px")
  color?: string;                   // Text color (default: "#ffffff")
  hoverColor?: string;              // Hover color (default: "#ffffff")
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@click: () => void                 // Click callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    // Title Reveal Animation Methods
    previewTitleReveal(animationName) {
        const element = document.getElementById(`titleReveal-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeTitleReveal(element);
        }
    }

    previewWavyText(animationName) {
        const element = document.getElementById(`wavyText-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeWavyText(element);
        }
    }

    previewSlideLeft(animationName) {
        const element = document.getElementById(`slideLeft-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeSlideLeft(element);
        }
    }

    previewSlideReveal(animationName) {
        const element = document.getElementById(`slideReveal-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeSlideReveal(element);
        }
    }

    previewTextEffect1(animationName) {
        const element = document.getElementById(`textEffect1-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeTextEffect1(element);
        }
    }

    previewTextEffect2(animationName) {
        const element = document.getElementById(`textEffect2-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeTextEffect2(element);
        }
    }

    previewTextEffect3(animationName) {
        const element = document.getElementById(`textEffect3-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeTextEffect3(element);
        }
    }

    previewTextEffect4(animationName) {
        const element = document.getElementById(`textEffect4-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeTextEffect4(element);
        }
    }

    previewTextEffect5(animationName) {
        const element = document.getElementById(`textEffect5-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeTextEffect5(element);
        }
    }

    previewTextEffect6(animationName) {
        const element = document.getElementById(`textEffect6-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeTextEffect6(element);
        }
    }

    previewTextEffect7(animationName) {
        const element = document.getElementById(`textEffect7-${animationName}`);
        if (element) {
            this.fiEyesUIInitializeTextEffect7(element);
        }
    }

    fiEyesUIInitializeTitleReveal(container) {
        if (!container) return;
        
        const titleElement = container.querySelector('.fiEyesUI-titleReveal-title');
        const subtitleElement = container.querySelector('.fiEyesUI-titleReveal-subtitle');
        
        if (titleElement) {
            titleElement.innerHTML = '';
            const title = 'Welcome To Finches Eyes UI Components';
            const letters = title.split('');
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.className = 'fiEyesUI-titleReveal-letter';
                span.id = `fiEyesUI-title-letter-${index}`;
                span.textContent = letter === ' ' ? '\u00A0' : letter;
                titleElement.appendChild(span);
            });
        }
        
        if (subtitleElement) {
            subtitleElement.textContent = 'Elegance is an attitude';
        }
        
        // Start animation
        const letterElements = container.querySelectorAll('.fiEyesUI-titleReveal-letter');
        
        // Reset all elements
        letterElements.forEach(letter => {
            letter.classList.remove('fiEyesUI-titleReveal-letter-animate', 'fiEyesUI-titleReveal-letter-fade');
        });
        if (subtitleElement) {
            subtitleElement.classList.remove('fiEyesUI-titleReveal-subtitle-animate');
        }
        
        // Animate letters
        setTimeout(() => {
            letterElements.forEach((letter, index) => {
                setTimeout(() => {
                    letter.classList.add('fiEyesUI-titleReveal-letter-animate');
                }, 50 * index);
                
                setTimeout(() => {
                    letter.classList.add('fiEyesUI-titleReveal-letter-fade');
                    
                    if (index === letterElements.length - 1) {
                        setTimeout(() => {
                            if (subtitleElement) {
                                subtitleElement.classList.add('fiEyesUI-titleReveal-subtitle-animate');
                            }
                        }, 60 * index + 100);
                    }
                }, 60 * index);
            });
        }, 500);
    }

    fiEyesUICreateTitleRevealStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-titleReveal-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-titleReveal-demo {
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
                font-size: calc(6vw + 1rem);
                margin-left: -2px;
                opacity: 0;
            }
            
            .fiEyesUI-titleReveal-subtitle {
                font-weight: 400;
                font-size: calc(0.4vw + 0.5rem);
                letter-spacing: calc(0.3vw + 0.5rem);
                text-transform: uppercase;
                position: relative;
                top: -5px;
                opacity: 0;
            }
            
            .fiEyesUI-titleReveal-letter-animate {
                animation: fiEyesUI-titleReveal-slide 500ms ease-in-quad forwards;
            }
            
            .fiEyesUI-titleReveal-letter-fade {
                animation: fiEyesUI-titleReveal-fade 500ms ease-in-quad forwards;
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
        
        document.head.appendChild(fiEyesUIStyle);
    }

    // Wavy Text Animation Methods
    fiEyesUIInitializeWavyText(container) {
        if (!container) return;
        
        const titleElement = container.querySelector('.fiEyesUI-wavyText-title');
        
        if (titleElement) {
            titleElement.innerHTML = '';
            const title = 'Welcome To Finches Eyes UI Components';
            const letters = title.split('');
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.className = 'fiEyesUI-wavyText-span';
                span.style.setProperty('--i', index.toString());
                span.style.animationDelay = `${0.1 * index}s`;
                span.style.animationDuration = '1.5s';
                span.textContent = letter === ' ' ? '\u00A0' : letter;
                titleElement.appendChild(span);
            });
        }
    }

    fiEyesUICreateWavyTextStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-wavyText-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-wavyText-demo {
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
            
            .fiEyesUI-wavyText-content {
                position: relative;
                transform: translate(-50%, -50%);
                left: 50%;
                top: 50%;
                margin: 0;
            }
            
            .fiEyesUI-wavyText-title {
                font-weight: 700;
                display: inline-flex;
                margin: -5px;
                padding: 5px;
                font-size: 2em;
                text-transform: uppercase;
                letter-spacing: 0.1em;
            }
            
            .fiEyesUI-wavyText-span {
                position: relative;
                display: inline-block;
                color: #ffffff;
                animation: fiEyesUI-wavy-animate 1.5s ease-in-out infinite;
                animation-delay: calc(0.1s * var(--i));
            }
            
            @keyframes fiEyesUI-wavy-animate {
                0%, 100% {
                    transform: translateY(0px);
                }
                20% {
                    transform: translateY(-20px);
                }
                40% {
                    transform: translateY(0px);
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    // Slide Left Animation Methods
    fiEyesUIInitializeSlideLeft(container) {
        if (!container) return;
        
        const titleElement = container.querySelector('.fiEyesUI-slideLeft-title');
        
        if (titleElement) {
            titleElement.innerHTML = '';
            const title = 'Welcome To Finches Eyes UI Components';
            const letters = title.split('');
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.className = 'fiEyesUI-slideLeft-span';
                span.style.animationDelay = `${0.1 * index}s`;
                span.style.animationDuration = '1.5s';
                span.textContent = letter === ' ' ? '\u00A0' : letter;
                titleElement.appendChild(span);
            });
        }
    }

    fiEyesUICreateSlideLeftStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-slideLeft-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-slideLeft-demo {
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
            
            .fiEyesUI-slideLeft-content {
                position: relative;
                transform: translate(-50%, -50%);
                left: 50%;
                top: 50%;
                margin: 0;
            }
            
            .fiEyesUI-slideLeft-title {
                text-align: center;
                text-transform: uppercase;
                font-family: 'Orbitron', sans-serif;
                font-size: 2em;
                letter-spacing: 1px;
                color: #ffffff;
                margin: 0;
                padding: 0;
            }
            
            .fiEyesUI-slideLeft-span {
                display: inline-block;
                animation: fiEyesUI-slideLeft 1.5s forwards;
                opacity: 0;
                transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
            }
            
            @keyframes fiEyesUI-slideLeft {
                from {
                    opacity: 0;
                    transform: translateX(200px);
                } 
                to {
                    opacity: 1;
                    transform: translateX(0%);
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    // Slide Reveal Animation Methods
    fiEyesUIInitializeSlideReveal(container) {
        if (!container) return;
        
        const textElement = container.querySelector('.fiEyesUI-slideReveal-text');
        
        if (textElement) {
            // Reset animation
            textElement.classList.remove('fiEyesUI-slideReveal-animate');
            
            // Trigger animation
            setTimeout(() => {
                textElement.classList.add('fiEyesUI-slideReveal-animate');
            }, 10);
        }
    }

    fiEyesUICreateSlideRevealStyles() {
        const fiEyesUIStyleId = 'fiEyesUI-slideReveal-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-slideReveal-demo {
                font-family: 'Orbitron', sans-serif;
                font-weight: 300;
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
            
            .fiEyesUI-slideReveal-content {
                position: relative;
                transform: translate(-50%, -50%);
                left: 50%;
                top: 50%;
                margin: 0;
            }
            
            .fiEyesUI-slideReveal-title {
                position: relative;
                letter-spacing: 3px;
                font-weight: 300;
                text-transform: uppercase;
                padding-right: 30px;
                overflow: hidden;
            }
            
            .fiEyesUI-slideReveal-text {
                margin: 0 auto;
                white-space: nowrap;
                transform: translateX(calc(100% + 30px));
                animation: fiEyesUI-leftSlide 1.1s cubic-bezier(0.68, -0.55, 0.265, 1.10) forwards;
            }
            
            .fiEyesUI-slideReveal-title::before {
                content: "";
                position: absolute;
                right: 0;
                height: 100%;
                background: #000000;
                animation: fiEyesUI-hiddingSlide 1.1s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
                z-index: 10;
            }
            
            .fiEyesUI-slideReveal-title::after {
                content: "";
                position: absolute;
                background: #ffffff;
                width: 75px;
                margin: auto 0;
                top: 5px;
                bottom: 0;
                height: 70%;
                animation: fiEyesUI-rightSlide 1.1s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
            }
            
            @keyframes fiEyesUI-leftSlide {
                0% {
                    transform: translateX(calc(100% + 30px));
                }
                100% {
                    transform: translateX(0%);
                }
            }
            
            @keyframes fiEyesUI-rightSlide {
                0% {
                    right: 100%;
                    width: 70px;
                }
                100% {
                    opacity: 1;
                    right: 0%;
                    width: 24px;
                }
            }
            
            @keyframes fiEyesUI-hiddingSlide {
                0% {
                    width: 100%;
                }
                100% {
                    width: 0%;
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    fiEyesUIInitializeTextEffect1(container) {
        if (!container) return;
        
        const textElement = container.querySelector('.fiEyesUI-textEffect1-text');
        
        if (textElement) {
            textElement.innerHTML = '';
            const letters = 'Welcome To Finches Eyes UI Components'.split('');
            
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter === ' ' ? '\u00A0' : letter;
                span.style.setProperty('--delay', `${index * 0.1}s`);
                span.style.setProperty('--duration', '2s');
                textElement.appendChild(span);
            });
            
            // Apply responsive font sizing
            this.applyResponsiveFontSize(container, '.fiEyesUI-textEffect1-text');
        }
    }

    fiEyesUICreateTextEffect1Styles() {
        const fiEyesUIStyleId = 'fiEyesUI-textEffect1-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-textEffect1-demo {
                font-family: 'Orbitron', sans-serif;
                background-color: #000000;
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding: 10px;
                box-sizing: border-box;
            }
            
            .fiEyesUI-textEffect1-text {
                font-weight: bold;
                text-transform: uppercase;
                text-align: center;
                line-height: 1.2;
            }
            
            .fiEyesUI-textEffect1-text span {
                display: inline-block;
                transform-style: preserve-3d;
                transform-origin: bottom;
                animation: fiEyesUI-anim1 var(--duration) linear infinite alternate;
                animation-delay: var(--delay);
                font-weight: bold;
                color: #000000;
                text-shadow: 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000;
            }
            
            @keyframes fiEyesUI-anim1 {
                0% {
                    text-shadow: 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000, 0px 0px 2px #000000;
                    scale: 1 0;
                }
                100% {
                    text-shadow: 0px 0px 2px #ffffff, 0px 0px 2px #ffffff, 0px 0px 2px #ffffff, 0px 0px 2px #ffffff;
                    scale: 1 1;
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    fiEyesUIInitializeTextEffect2(container) {
        if (!container) return;
        
        const textElement = container.querySelector('.fiEyesUI-textEffect2-text');
        
        if (textElement) {
            textElement.innerHTML = '';
            const letters = 'Welcome To Finches Eyes UI Components'.split('');
            
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter === ' ' ? '\u00A0' : letter;
                span.style.setProperty('--delay', `${index * 0.1}s`);
                textElement.appendChild(span);
            });
            
            // Apply responsive font sizing
            this.applyResponsiveFontSize(container, '.fiEyesUI-textEffect2-text');
        }
    }

    fiEyesUICreateTextEffect2Styles() {
        const fiEyesUIStyleId = 'fiEyesUI-textEffect2-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-textEffect2-demo {
                font-family: 'Orbitron', sans-serif;
                background-color: #000000;
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding: 10px;
                box-sizing: border-box;
            }
            
            .fiEyesUI-textEffect2-text {
                height: 2rem;
                overflow: hidden;
                perspective: 5000px;
                font-weight: bold;
                text-transform: uppercase;
                text-align: center;
                line-height: 1.2;
            }
            
            .fiEyesUI-textEffect2-text span {
                color: #ffffff;
                display: inline-block;
                transition: all 0.5s ease;
                position: relative;
            }
            
            .fiEyesUI-textEffect2-demo:hover .fiEyesUI-textEffect2-text span {
                transform-style: preserve-3d;
                transform-origin: center;
                animation: fiEyesUI-anim2 1s linear;
                animation-delay: calc(var(--delay) * 0.2);
            }
            
            @keyframes fiEyesUI-anim2 {
                0% {
                    transform: rotatex(0deg);
                }
                100% {
                    transform: rotatex(360deg);
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    fiEyesUIInitializeTextEffect3(container) {
        if (!container) return;
        
        const textElement = container.querySelector('.fiEyesUI-textEffect3-text');
        
        if (textElement) {
            textElement.innerHTML = '';
            const letters = 'Welcome To Finches Eyes UI Components'.split('');
            
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter === ' ' ? '\u00A0' : letter;
                textElement.appendChild(span);
            });
            
            // Apply responsive font sizing
            this.applyResponsiveFontSize(container, '.fiEyesUI-textEffect3-text');
        }
    }

    fiEyesUICreateTextEffect3Styles() {
        const fiEyesUIStyleId = 'fiEyesUI-textEffect3-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-textEffect3-demo {
                font-family: 'Orbitron', sans-serif;
                background-color: #000000;
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding: 10px;
                box-sizing: border-box;
            }
            
            .fiEyesUI-textEffect3-text {
                font-weight: bold;
                text-transform: uppercase;
                text-align: center;
                line-height: 1.2;
            }
            
            .fiEyesUI-textEffect3-text span {
                background: linear-gradient(90deg, rgba(249,249,249,1) 50%, rgba(2,0,36,0) 50%);
                background-size: 250%;
                animation: fiEyesUI-anim3 linear both;
                animation-timeline: view();
                animation-range: entry 50% cover 50%;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-weight: bold;
                color: #000000;
            }
            
            @keyframes fiEyesUI-anim3 {
                0% {
                    background-position: 100%;
                }
                100% {
                    background-position: 0%;
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    fiEyesUIInitializeTextEffect4(container) {
        if (!container) return;
        
        const textElement = container.querySelector('.fiEyesUI-textEffect4-text');
        
        if (textElement) {
            textElement.innerHTML = '';
            const letters = 'Welcome To Finches Eyes UI Components'.split('');
            
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter === ' ' ? '\u00A0' : letter;
                span.setAttribute('char', letter === ' ' ? '\u00A0' : letter);
                span.style.setProperty('--delay', `${index * 0.1}s`);
                textElement.appendChild(span);
            });
            
            // Apply responsive font sizing
            this.applyResponsiveFontSize(container, '.fiEyesUI-textEffect4-text');
        }
    }

    fiEyesUICreateTextEffect4Styles() {
        const fiEyesUIStyleId = 'fiEyesUI-textEffect4-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-textEffect4-demo {
                font-family: 'Orbitron', sans-serif;
                background-color: #000000;
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding: 10px;
                box-sizing: border-box;
            }
            
            .fiEyesUI-textEffect4-text {
                overflow: hidden;
                font-weight: bold;
                text-transform: uppercase;
                text-align: center;
                line-height: 1.2;
            }
            
            .fiEyesUI-textEffect4-text span {
                position: relative;
                font-weight: bold;
                color: #ffffff;
                display: inline-block;
            }
            
            .fiEyesUI-textEffect4-text span::after {
                position: absolute;
                left: 0;
                top: 100%;
                content: attr(char);
                color: #000000;
                text-shadow: 0px 0px 1px #fff, 0px 0px 1px #fff, 0px 0px 1px #fff, 0px 0px 1px #fff;
            }
            
            .fiEyesUI-textEffect4-demo:hover .fiEyesUI-textEffect4-text span {
                animation: fiEyesUI-anim4 1s linear infinite;
                animation-delay: calc(var(--delay) * 0.5);
            }
            
            @keyframes fiEyesUI-anim4 {
                0% {
                    filter: blur(0px);
                    translate: 0 0;
                }
                100% {
                    filter: blur(10px);
                    translate: 0 -100%;
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    fiEyesUIInitializeTextEffect5(container) {
        if (!container) return;
        
        const textElement = container.querySelector('.fiEyesUI-textEffect5-text');
        
        if (textElement) {
            textElement.innerHTML = '';
            const letters = 'Welcome To Finches Eyes UI Components'.split('');
            
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter === ' ' ? '\u00A0' : letter;
                span.style.setProperty('--delay', `${index * 0.1}s`);
                textElement.appendChild(span);
            });
            
            // Apply responsive font sizing
            this.applyResponsiveFontSize(container, '.fiEyesUI-textEffect5-text');
        }
    }

    fiEyesUICreateTextEffect5Styles() {
        const fiEyesUIStyleId = 'fiEyesUI-textEffect5-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-textEffect5-demo {
                font-family: 'Orbitron', sans-serif;
                background-color: #000000;
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding: 10px;
                box-sizing: border-box;
                cursor: pointer;
            }
            
            .fiEyesUI-textEffect5-text {
                font-weight: bold;
                text-transform: uppercase;
                text-align: center;
                line-height: 1.2;
            }
            
            .fiEyesUI-textEffect5-text span {
                position: relative;
                color: #ffffff;
                pointer-events: none;
            }
            
            .fiEyesUI-disintegrate {
                animation: fiEyesUI-anim5 var(--duration, 1s) linear forwards;
                animation-delay: calc(var(--delay, 0) * 1s);
            }
            
            @keyframes fiEyesUI-anim5 {
                0% {
                    filter: blur(0px);
                }
                10% {
                    filter: blur(0px);
                }
                100% {
                    filter: blur(500px);
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    fiEyesUIInitializeTextEffect6(container) {
        if (!container) return;
        
        const textElement = container.querySelector('.fiEyesUI-textEffect6-text');
        
        if (textElement) {
            textElement.innerHTML = '';
            const letters = 'Welcome To Finches Eyes UI Components'.split('');
            
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter === ' ' ? '\u00A0' : letter;
                span.style.setProperty('--delay', `${index * 0.1}s`);
                span.style.setProperty('--index', index.toString());
                span.style.setProperty('--totalChars', letters.length.toString());
                textElement.appendChild(span);
            });
            
            // Apply responsive font sizing
            this.applyResponsiveFontSize(container, '.fiEyesUI-textEffect6-text');
        }
    }

    fiEyesUICreateTextEffect6Styles() {
        const fiEyesUIStyleId = 'fiEyesUI-textEffect6-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-textEffect6-demo {
                font-family: 'Orbitron', sans-serif;
                background-color: #000000;
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding: 10px;
                box-sizing: border-box;
            }
            
            .fiEyesUI-textEffect6-text {
                font-weight: bold;
                text-transform: uppercase;
                text-align: center;
                line-height: 1.2;
            }
            
            .fiEyesUI-textEffect6-text span {
                position: relative;
                color: #ffffff;
                pointer-events: none;
                animation: fiEyesUI-anim6 linear both;
                animation-timeline: scroll();
                animation-range: entry calc((var(--index) * (100/var(--totalChars))) * 1%) cover 100%;
            }
            
            .fiEyesUI-textEffect6-demo:hover .fiEyesUI-textEffect6-text span {
                animation: fiEyesUI-anim6 1s ease alternate infinite;
                animation-delay: calc(var(--delay) * 0.5);
            }
            
            @keyframes fiEyesUI-anim6 {
                0% {
                    font-weight: 100;
                }
                20% {
                    font-weight: 900;
                }
                100% {
                    font-weight: 900;
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    fiEyesUIInitializeTextEffect7(container) {
        if (!container) return;
        
        const textElement = container.querySelector('.fiEyesUI-textEffect7-text');
        
        if (textElement) {
            textElement.innerHTML = '';
            const letters = 'Welcome To Finches Eyes UI Components'.split('');
            
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter === ' ' ? '\u00A0' : letter;
                span.style.setProperty('--delay', `${index * 0.1}s`);
                textElement.appendChild(span);
            });
            
            // Apply responsive font sizing
            this.applyResponsiveFontSize(container, '.fiEyesUI-textEffect7-text');
        }
    }

    fiEyesUICreateTextEffect7Styles() {
        const fiEyesUIStyleId = 'fiEyesUI-textEffect7-styles';
        let fiEyesUIExistingStyle = document.getElementById(fiEyesUIStyleId);
        
        if (fiEyesUIExistingStyle) {
            fiEyesUIExistingStyle.remove();
        }
        
        const fiEyesUIStyle = document.createElement('style');
        fiEyesUIStyle.id = fiEyesUIStyleId;
        fiEyesUIStyle.textContent = `
            .fiEyesUI-textEffect7-demo {
                font-family: 'Orbitron', sans-serif;
                background-color: #000000;
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                padding: 10px;
                box-sizing: border-box;
            }
            
            .fiEyesUI-textEffect7-text {
                font-weight: bold;
                text-transform: uppercase;
                text-align: center;
                line-height: 1.2;
            }
            
            .fiEyesUI-textEffect7-text span {
                position: relative;
                color: #ffffff;
                pointer-events: none;
                animation: fiEyesUI-anim7 1s ease alternate infinite;
                animation-delay: calc(var(--delay) * 0.5);
            }
            
            @keyframes fiEyesUI-anim7 {
                0% {
                    text-shadow: 0px 0px 0px #fff;
                }
                20% {
                    text-shadow: 0px 0px 0px #fff;
                }
                100% {
                    text-shadow: 0px 0px 50px #fff, 0px 0px 50px #fff, 0px 0px 50px #fff;
                }
            }
        `;
        
        document.head.appendChild(fiEyesUIStyle);
    }

    generateTitleRevealCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react`,
                    usage: `import React from 'react';
import { FiEyesUITitleReveal } from 'fincheseye-ui-animation-library';

function App() {
  return (
    <FiEyesUITitleReveal
      title="Welcome To Finches Eyes UI Components"
      subtitle="Elegance is an attitude"
      titleFontSize="calc(6vw + 1rem)"
      subtitleFontSize="calc(0.4vw + 0.5rem)"
      animationDuration={500}
      autoPlay={true}
      repeatInterval={4000}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}

export default App;`,
                    configuration: `// Title Reveal Configuration Options
interface FiEyesUITitleRevealProps {
  title?: string;                   // Main title text (default: "Welcome To Finches Eyes UI Components")
  subtitle?: string;                // Subtitle text (default: "Elegance is an attitude")
  titleFontSize?: string;           // Title font size (default: "calc(6vw + 1rem)")
  subtitleFontSize?: string;        // Subtitle font size (default: "calc(0.4vw + 0.5rem)")
  animationDuration?: number;       // Animation duration in milliseconds (default: 500)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 4000)
  className?: string;               // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  onComplete?: () => void;          // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUITitleRevealComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-root',
  template: \`
    <fiEyesUI-titleReveal
      title="Welcome To Finches Eyes UI Components"
      subtitle="Elegance is an attitude"
      titleFontSize="calc(6vw + 1rem)"
      subtitleFontSize="calc(0.4vw + 0.5rem)"
      [animationDuration]="500"
      [autoPlay]="true"
      [repeatInterval]="4000"
      (complete)="onAnimationComplete()"
    ></fiEyesUI-titleReveal>
  \`,
  standalone: true,
  imports: [FiEyesUITitleRevealComponent]
})
export class AppComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Title Reveal Configuration Options
interface FiEyesUITitleRevealConfig {
  title?: string;                   // Main title text (default: "Welcome To Finches Eyes UI Components")
  subtitle?: string;                // Subtitle text (default: "Elegance is an attitude")
  titleFontSize?: string;           // Title font size (default: "calc(6vw + 1rem)")
  subtitleFontSize?: string;        // Subtitle font size (default: "calc(0.4vw + 0.5rem)")
  animationDuration?: number;       // Animation duration in milliseconds (default: 500)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 4000)
}

// Events
@Output() complete = new EventEmitter<void>();`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUITitleReveal } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUITitleReveal
  },
  template: \`
    <FiEyesUITitleReveal
      title="Welcome To Finches Eyes UI Components"
      subtitle="Elegance is an attitude"
      titleFontSize="calc(6vw + 1rem)"
      subtitleFontSize="calc(0.4vw + 0.5rem)"
      :animationDuration="500"
      :autoPlay="true"
      :repeatInterval="4000"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Title Reveal Configuration Options
interface FiEyesUITitleRevealProps {
  title?: string;                   // Main title text (default: "Welcome To Finches Eyes UI Components")
  subtitle?: string;                // Subtitle text (default: "Elegance is an attitude")
  titleFontSize?: string;           // Title font size (default: "calc(6vw + 1rem)")
  subtitleFontSize?: string;        // Subtitle font size (default: "calc(0.4vw + 0.5rem)")
  animationDuration?: number;       // Animation duration in milliseconds (default: 500)
  autoPlay?: boolean;               // Auto play animation (default: true)
  repeatInterval?: number;          // Repeat interval in milliseconds (default: 4000)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateTextEffect1CodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react`,
                    usage: `import React from 'react';
import { FiEyesUITextEffect1 } from 'fincheseye-ui-animation-library';

function App() {
  return (
    <FiEyesUITextEffect1
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      animationDuration={2000}
      autoPlay={true}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}

export default App;`,
                    configuration: `// Text Effect 1 Configuration Options
interface FiEyesUITextEffect1Props {
  text?: string;                   // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  animationDuration?: number;       // Animation duration in milliseconds (default: 2000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  onComplete?: () => void;          // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUITextEffect1Component } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-textEffect1
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      [animationDuration]="2000"
      [autoPlay]="true"
      (complete)="onAnimationComplete()">
    </fiEyesUI-textEffect1>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Text Effect 1 Configuration Options
@Component({
  inputs: [
    'text',           // Text to animate
    'fontSize',       // Font size
    'animationDuration', // Animation duration in milliseconds
    'autoPlay',       // Auto play animation
    'className',      // Additional CSS classes
    'style'           // Inline styles
  ],
  outputs: ['complete'] // Completion event
})`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUITextEffect1 } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUITextEffect1
  },
  template: \`
    <FiEyesUITextEffect1
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      :animationDuration="2000"
      :autoPlay="true"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Text Effect 1 Configuration Options
interface FiEyesUITextEffect1Props {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  animationDuration?: number;       // Animation duration in milliseconds (default: 2000)
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateTextEffect2CodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react`,
                    usage: `import React from 'react';
import { FiEyesUITextEffect2 } from 'fincheseye-ui-animation-library';

function App() {
  return (
    <FiEyesUITextEffect2
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      autoPlay={true}
      onComplete={() => console.log('Animation completed!')}
    />
  );
}

export default App;`,
                    configuration: `// Text Effect 2 Configuration Options
interface FiEyesUITextEffect2Props {
  text?: string;                   // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: React.CSSProperties;      // Inline styles
  onComplete?: () => void;          // Completion callback
}`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUITextEffect2Component } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-textEffect2
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      [autoPlay]="true"
      (complete)="onAnimationComplete()">
    </fiEyesUI-textEffect2>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Text Effect 2 Configuration Options
@Component({
  inputs: [
    'text',           // Text to animate
    'fontSize',       // Font size
    'autoPlay',       // Auto play animation
    'className',      // Additional CSS classes
    'style'           // Inline styles
  ],
  outputs: ['complete'] // Completion event
})`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { defineComponent } from 'vue';
import { FiEyesUITextEffect2 } from 'fincheseye-ui-animation-library';

export default defineComponent({
  components: {
    FiEyesUITextEffect2
  },
  template: \`
    <FiEyesUITextEffect2
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      :autoPlay="true"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Text Effect 2 Configuration Options
interface FiEyesUITextEffect2Props {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateSlideLeftCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react react-dom`,
                    usage: `import React from 'react';
import { FiEyesUISlideLeft } from 'fincheseye-ui-animation-library';

function MyComponent() {
  return (
    <FiEyesUISlideLeft
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      autoPlay={true}
      className="my-slide-left"
      style={{ width: '100%', height: '200px' }}
    />
  );
}`,
                    configuration: `// Slide Left Configuration Options
interface FiEyesUISlideLeftProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core @angular/common`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUISlideLeftComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-slideLeft
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      [autoPlay]="true"
      className="my-slide-left"
      [style]="{ width: '100%', height: '200px' }"
      (complete)="onAnimationComplete()">
    </fiEyesUI-slideLeft>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Slide Left Configuration Options
interface FiEyesUISlideLeftConfig {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
(complete): () => void              // Completion callback`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { createApp } from 'vue';
import { FiEyesUISlideLeft } from 'fincheseye-ui-animation-library';

const app = createApp({
  template: \`
    <FiEyesUISlideLeft
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      :autoPlay="true"
      className="my-slide-left"
      :style="{ width: '100%', height: '200px' }"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Slide Left Configuration Options
interface FiEyesUISlideLeftProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateSlideRevealCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react react-dom`,
                    usage: `import React from 'react';
import { FiEyesUISlideReveal } from 'fincheseye-ui-animation-library';

function MyComponent() {
  return (
    <FiEyesUISlideReveal
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      autoPlay={true}
      className="my-slide-reveal"
      style={{ width: '100%', height: '200px' }}
    />
  );
}`,
                    configuration: `// Slide Reveal Configuration Options
interface FiEyesUISlideRevealProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core @angular/common`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUISlideRevealComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-slideReveal
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      [autoPlay]="true"
      className="my-slide-reveal"
      [style]="{ width: '100%', height: '200px' }"
      (complete)="onAnimationComplete()">
    </fiEyesUI-slideReveal>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Slide Reveal Configuration Options
interface FiEyesUISlideRevealConfig {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
(complete): () => void              // Completion callback`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { createApp } from 'vue';
import { FiEyesUISlideReveal } from 'fincheseye-ui-animation-library';

const app = createApp({
  template: \`
    <FiEyesUISlideReveal
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      :autoPlay="true"
      className="my-slide-reveal"
      :style="{ width: '100%', height: '200px' }"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Slide Reveal Configuration Options
interface FiEyesUISlideRevealProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateTextEffect3CodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react react-dom`,
                    usage: `import React from 'react';
import { FiEyesUITextEffect3 } from 'fincheseye-ui-animation-library';

function MyComponent() {
  return (
    <FiEyesUITextEffect3
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      autoPlay={true}
      className="my-text-effect3"
      style={{ width: '100%', height: '200px' }}
    />
  );
}`,
                    configuration: `// Text Effect 3 Configuration Options
interface FiEyesUITextEffect3Props {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core @angular/common`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUITextEffect3Component } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-textEffect3
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      [autoPlay]="true"
      className="my-text-effect3"
      [style]="{ width: '100%', height: '200px' }"
      (complete)="onAnimationComplete()">
    </fiEyesUI-textEffect3>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Text Effect 3 Configuration Options
interface FiEyesUITextEffect3Config {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
(complete): () => void              // Completion callback`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { createApp } from 'vue';
import { FiEyesUITextEffect3 } from 'fincheseye-ui-animation-library';

const app = createApp({
  template: \`
    <FiEyesUITextEffect3
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      :autoPlay="true"
      className="my-text-effect3"
      :style="{ width: '100%', height: '200px' }"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Text Effect 3 Configuration Options
interface FiEyesUITextEffect3Props {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateTextEffect4CodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react react-dom`,
                    usage: `import React from 'react';
import { FiEyesUITextEffect4 } from 'fincheseye-ui-animation-library';

function MyComponent() {
  return (
    <FiEyesUITextEffect4
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      autoPlay={true}
      className="my-text-effect4"
      style={{ width: '100%', height: '200px' }}
    />
  );
}`,
                    configuration: `// Text Effect 4 Configuration Options
interface FiEyesUITextEffect4Props {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core @angular/common`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUITextEffect4Component } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-textEffect4
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      [autoPlay]="true"
      className="my-text-effect4"
      [style]="{ width: '100%', height: '200px' }"
      (complete)="onAnimationComplete()">
    </fiEyesUI-textEffect4>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Text Effect 4 Configuration Options
interface FiEyesUITextEffect4Config {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
(complete): () => void              // Completion callback`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { createApp } from 'vue';
import { FiEyesUITextEffect4 } from 'fincheseye-ui-animation-library';

const app = createApp({
  template: \`
    <FiEyesUITextEffect4
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      :autoPlay="true"
      className="my-text-effect4"
      :style="{ width: '100%', height: '200px' }"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Text Effect 4 Configuration Options
interface FiEyesUITextEffect4Props {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateTextEffect5CodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react react-dom`,
                    usage: `import React from 'react';
import { FiEyesUITextEffect5 } from 'fincheseye-ui-animation-library';

function MyComponent() {
  return (
    <FiEyesUITextEffect5
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      autoPlay={true}
      className="my-text-effect5"
      style={{ width: '100%', height: '200px' }}
    />
  );
}`,
                    configuration: `// Text Effect 5 Configuration Options
interface FiEyesUITextEffect5Props {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core @angular/common`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUITextEffect5Component } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-textEffect5
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      [autoPlay]="true"
      className="my-text-effect5"
      [style]="{ width: '100%', height: '200px' }"
      (complete)="onAnimationComplete()">
    </fiEyesUI-textEffect5>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Text Effect 5 Configuration Options
interface FiEyesUITextEffect5Config {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
(complete): () => void              // Completion callback`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { createApp } from 'vue';
import { FiEyesUITextEffect5 } from 'fincheseye-ui-animation-library';

const app = createApp({
  template: \`
    <FiEyesUITextEffect5
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      :autoPlay="true"
      className="my-text-effect5"
      :style="{ width: '100%', height: '200px' }"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Text Effect 5 Configuration Options
interface FiEyesUITextEffect5Props {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateTextEffect6CodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react react-dom`,
                    usage: `import React from 'react';
import { FiEyesUITextEffect6 } from 'fincheseye-ui-animation-library';

function MyComponent() {
  return (
    <FiEyesUITextEffect6
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      autoPlay={true}
      className="my-text-effect6"
      style={{ width: '100%', height: '200px' }}
    />
  );
}`,
                    configuration: `// Text Effect 6 Configuration Options
interface FiEyesUITextEffect6Props {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core @angular/common`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUITextEffect6Component } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-textEffect6
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      [autoPlay]="true"
      className="my-text-effect6"
      [style]="{ width: '100%', height: '200px' }"
      (complete)="onAnimationComplete()">
    </fiEyesUI-textEffect6>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Text Effect 6 Configuration Options
interface FiEyesUITextEffect6Config {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
(complete): () => void              // Completion callback`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { createApp } from 'vue';
import { FiEyesUITextEffect6 } from 'fincheseye-ui-animation-library';

const app = createApp({
  template: \`
    <FiEyesUITextEffect6
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      :autoPlay="true"
      className="my-text-effect6"
      :style="{ width: '100%', height: '200px' }"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Text Effect 6 Configuration Options
interface FiEyesUITextEffect6Props {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateTextEffect7CodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react react-dom`,
                    usage: `import React from 'react';
import { FiEyesUITextEffect7 } from 'fincheseye-ui-animation-library';

function MyComponent() {
  return (
    <FiEyesUITextEffect7
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      autoPlay={true}
      className="my-text-effect7"
      style={{ width: '100%', height: '200px' }}
    />
  );
}`,
                    configuration: `// Text Effect 7 Configuration Options
interface FiEyesUITextEffect7Props {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core @angular/common`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUITextEffect7Component } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-textEffect7
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      [autoPlay]="true"
      className="my-text-effect7"
      [style]="{ width: '100%', height: '200px' }"
      (complete)="onAnimationComplete()">
    </fiEyesUI-textEffect7>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Text Effect 7 Configuration Options
interface FiEyesUITextEffect7Config {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
(complete): () => void              // Completion callback`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { createApp } from 'vue';
import { FiEyesUITextEffect7 } from 'fincheseye-ui-animation-library';

const app = createApp({
  template: \`
    <FiEyesUITextEffect7
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      :autoPlay="true"
      className="my-text-effect7"
      :style="{ width: '100%', height: '200px' }"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Text Effect 7 Configuration Options
interface FiEyesUITextEffect7Props {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    generateWavyTextCodeExamples(framework) {
        switch (framework) {
            case 'react':
                return {
                    installation: `npm install fincheseye-ui-animation-library react react-dom`,
                    usage: `import React from 'react';
import { FiEyesUIWavyText } from 'fincheseye-ui-animation-library';

function MyComponent() {
  return (
    <FiEyesUIWavyText
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      autoPlay={true}
      className="my-wavy-text"
      style={{ width: '100%', height: '200px' }}
    />
  );
}`,
                    configuration: `// Wavy Text Configuration Options
interface FiEyesUIWavyTextProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            case 'angular':
                return {
                    installation: `npm install fincheseye-ui-animation-library @angular/core @angular/common`,
                    usage: `import { Component } from '@angular/core';
import { FiEyesUIWavyTextComponent } from 'fincheseye-ui-animation-library';

@Component({
  selector: 'app-my-component',
  template: \`
    <fiEyesUI-wavyText
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      [autoPlay]="true"
      className="my-wavy-text"
      [style]="{ width: '100%', height: '200px' }"
      (complete)="onAnimationComplete()">
    </fiEyesUI-wavyText>
  \`
})
export class MyComponent {
  onAnimationComplete() {
    console.log('Animation completed!');
  }
}`,
                    configuration: `// Wavy Text Configuration Options
interface FiEyesUIWavyTextConfig {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
(complete): () => void              // Completion callback`
                };
            case 'vue':
                return {
                    installation: `npm install fincheseye-ui-animation-library vue`,
                    usage: `import { createApp } from 'vue';
import { FiEyesUIWavyText } from 'fincheseye-ui-animation-library';

const app = createApp({
  template: \`
    <FiEyesUIWavyText
      text="Welcome To Finches Eyes UI Components"
      fontSize="1.5rem"
      :autoPlay="true"
      className="my-wavy-text"
      :style="{ width: '100%', height: '200px' }"
      @complete="onAnimationComplete"
    />
  \`,
  methods: {
    onAnimationComplete() {
      console.log('Animation completed!');
    }
  }
});`,
                    configuration: `// Wavy Text Configuration Options
interface FiEyesUIWavyTextProps {
  text?: string;                    // Text to animate (default: "Welcome To Finches Eyes UI Components")
  fontSize?: string;                // Font size (default: "1.5rem")
  autoPlay?: boolean;               // Auto play animation (default: true)
  className?: string;               // Additional CSS classes
  style?: Record<string, any>;     // Inline styles
}

// Events
@complete: () => void              // Completion callback`
                };
            default:
                return {
                    installation: '// Installation not available for this framework',
                    usage: '// Usage not available for this framework',
                    configuration: '// Configuration not available for this framework'
                };
        }
    }

    // Method to add new animation categories
    addAnimationCategory(categoryName, categoryLabel) {
        const categorySelect = document.getElementById('category-select');
        const option = document.createElement('option');
        option.value = categoryName;
        option.textContent = categoryLabel;
        categorySelect.appendChild(option);
    }

    // Method to add new animations to existing categories
    addAnimation(animation) {
        this.animations.push(animation);
        this.renderAnimationGrid();
    }

    // Method to add new animation category with section
    addAnimationCategoryWithSection(categoryName, categoryLabel) {
        // Add to dropdown
        this.addAnimationCategory(categoryName, categoryLabel);
        
        // Create new section in HTML
        const mainContent = document.querySelector('.main-content .container');
        const newSection = document.createElement('section');
        newSection.id = `${categoryName}-animations-section`;
        newSection.className = 'animation-section';
        
        newSection.innerHTML = `
            <div class="gallery-header">
                <h2>${categoryLabel}</h2>
                <p>Click on any animation to see the code and try it out!</p>
            </div>
            <div id="${categoryName}-animations-grid" class="animation-grid">
                <!-- ${categoryLabel} animation cards will be dynamically generated here -->
            </div>
        `;
        
        mainContent.appendChild(newSection);
        
        // Update renderAnimationGrid to handle new category
        this.updateRenderMethodForNewCategory(categoryName);
    }

    // Helper method to update renderAnimationGrid for new categories
    updateRenderMethodForNewCategory(categoryName) {
        // This would require updating the switch statement in renderAnimationGrid
        // For now, we'll handle it dynamically
        console.log(`New category ${categoryName} added. Update renderAnimationGrid method to handle it.`);
    }
}

// Initialize the demo when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.demo = new AnimationDemo();
});

// Make demo globally available for onclick handlers
window.demo = null;
