// Core exports
export { fiEyesUIAnimationEngine } from './core/AnimationEngine';
export { fiEyesUIPresetAnimations, getFiEyesUIPresetAnimation } from './core/PresetAnimations';
export { fiEyesUIEasingFunctions } from './utils/easing';

// Type exports
export type {
  AnimationConfig,
  EasingFunction,
  Keyframe,
  AnimationOptions,
  AnimationInstance,
  PresetAnimation,
  AnimationEvent,
} from './types';

// React exports
export { useFiEyesUIAnimation, FiEyesUIAnimatedComponent, FiEyesUITextDrop, FiEyesUIFlyInOut, FiEyesUIBlurReveal, FiEyesUILetterBounce, FiEyesUITextScale, FiEyesUIRotatingText, FiEyesUICharacterFlyIn, FiEyesUITextReveal, FiEyesUICharacterGlow, FiEyesUITextStroke, FiEyesUITypewriter, FiEyesUIFadeIn, FiEyesUIGradientText, FiEyesUIResizeEffect, FiEyesUITextScaleBounce, FiEyesUITextSwipe, FiEyesUIHoverFill, FiEyesUITitleReveal, FiEyesUIWavyText, FiEyesUISlideLeft, FiEyesUISlideReveal, FiEyesUITextEffect1, FiEyesUITextEffect2, FiEyesUITextEffect3, FiEyesUITextEffect4, FiEyesUITextEffect5, FiEyesUITextEffect6, FiEyesUITextEffect7 } from './react';
export type { FiEyesUIUseAnimationOptions, FiEyesUIUseAnimationReturn, FiEyesUIAnimatedComponentProps, FiEyesUIAnimatedComponentRef, FiEyesUITextDropProps, FiEyesUIFlyInOutProps, FiEyesUIBlurRevealProps, FiEyesUILetterBounceProps, FiEyesUITextScaleProps, FiEyesUIRotatingTextProps, FiEyesUICharacterFlyInProps, FiEyesUITextRevealProps, FiEyesUICharacterGlowProps, FiEyesUITextStrokeProps, FiEyesUITypewriterProps, FiEyesUIFadeInProps, FiEyesUIGradientTextProps, FiEyesUIResizeEffectProps, FiEyesUITextScaleBounceProps, FiEyesUITextSwipeProps, FiEyesUIHoverFillProps, FiEyesUITitleRevealProps, FiEyesUIWavyTextProps, FiEyesUISlideLeftProps, FiEyesUISlideRevealProps, FiEyesUITextEffect1Props, FiEyesUITextEffect2Props, FiEyesUITextEffect3Props, FiEyesUITextEffect4Props, FiEyesUITextEffect5Props, FiEyesUITextEffect6Props, FiEyesUITextEffect7Props } from './react';

// Angular exports
export { FiEyesUIAnimationService, FiEyesUIAnimationDirective, FiEyesUITextDropComponent, FiEyesUIFlyInOutComponent, FiEyesUIBlurRevealComponent, FiEyesUILetterBounceComponent, FiEyesUITextScaleComponent, FiEyesUIRotatingTextComponent, FiEyesUICharacterFlyInComponent, FiEyesUITextRevealComponent, FiEyesUICharacterGlowComponent, FiEyesUITextStrokeComponent, FiEyesUITypewriterComponent, FiEyesUIFadeInComponent, FiEyesUIGradientTextComponent, FiEyesUIResizeEffectComponent, FiEyesUITextScaleBounceComponent, FiEyesUITextSwipeComponent, FiEyesUIHoverFillComponent, FiEyesUITitleRevealComponent, FiEyesUIWavyTextComponent, FiEyesUISlideLeftComponent, FiEyesUISlideRevealComponent, FiEyesUITextEffect1Component, FiEyesUITextEffect2Component, FiEyesUITextEffect3Component, FiEyesUITextEffect4Component, FiEyesUITextEffect5Component, FiEyesUITextEffect6Component, FiEyesUITextEffect7Component } from './angular';
export type { FiEyesUITextDropConfig, FiEyesUIFlyInOutConfig, FiEyesUIBlurRevealConfig, FiEyesUILetterBounceConfig, FiEyesUITextScaleConfig, FiEyesUIRotatingTextConfig, FiEyesUICharacterFlyInConfig, FiEyesUITextRevealConfig, FiEyesUICharacterGlowConfig, FiEyesUITextStrokeConfig, FiEyesUITypewriterConfig, FiEyesUIFadeInConfig, FiEyesUIGradientTextConfig, FiEyesUIResizeEffectConfig, FiEyesUITextScaleBounceConfig, FiEyesUITextSwipeConfig, FiEyesUIHoverFillConfig, FiEyesUITitleRevealConfig, FiEyesUIWavyTextConfig, FiEyesUISlideLeftConfig, FiEyesUISlideRevealConfig, FiEyesUITextEffect1Config, FiEyesUITextEffect2Config, FiEyesUITextEffect3Config, FiEyesUITextEffect4Config, FiEyesUITextEffect5Config, FiEyesUITextEffect6Config, FiEyesUITextEffect7Config } from './angular';

// Vue exports
export { useFiEyesUIVueAnimation as useVueAnimation } from './vue';
export type { FiEyesUIVueAnimationOptions, FiEyesUIVueAnimationReturn, FiEyesUITextDropProps, FiEyesUIFlyInOutProps, FiEyesUIBlurRevealProps, FiEyesUILetterBounceProps, FiEyesUITextScaleProps, FiEyesUIRotatingTextProps, FiEyesUICharacterFlyInProps, FiEyesUITextRevealProps, FiEyesUICharacterGlowProps, FiEyesUITextStrokeProps, FiEyesUITypewriterProps, FiEyesUIFadeInProps, FiEyesUIGradientTextProps, FiEyesUIResizeEffectProps, FiEyesUITextScaleBounceProps, FiEyesUITextSwipeProps, FiEyesUIHoverFillProps, FiEyesUITitleRevealProps, FiEyesUIWavyTextProps, FiEyesUISlideLeftProps, FiEyesUISlideRevealProps, FiEyesUITextEffect1Props, FiEyesUITextEffect2Props, FiEyesUITextEffect3Props, FiEyesUITextEffect4Props, FiEyesUITextEffect5Props, FiEyesUITextEffect6Props, FiEyesUITextEffect7Props } from './vue';