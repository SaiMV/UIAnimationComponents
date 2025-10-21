import { presetAnimations, getPresetAnimation } from '../core/PresetAnimations';

describe('PresetAnimations', () => {
  describe('presetAnimations', () => {
    it('should contain expected preset animations', () => {
      const expectedPresets = [
        'fadeIn',
        'fadeOut',
        'slideInUp',
        'slideInDown',
        'slideInLeft',
        'slideInRight',
        'zoomIn',
        'zoomOut',
        'bounce',
        'shake',
        'pulse',
        'rotate'
      ];

      const actualPresets = presetAnimations.map(animation => animation.name);
      
      expectedPresets.forEach(preset => {
        expect(actualPresets).toContain(preset);
      });
    });

    it('should have valid keyframes for each preset', () => {
      presetAnimations.forEach(animation => {
        expect(animation.keyframes).toBeDefined();
        expect(Array.isArray(animation.keyframes)).toBe(true);
        expect(animation.keyframes.length).toBeGreaterThan(0);
      });
    });

    it('should have valid default config for each preset', () => {
      presetAnimations.forEach(animation => {
        expect(animation.defaultConfig).toBeDefined();
        expect(animation.defaultConfig.duration).toBeGreaterThan(0);
        expect(animation.defaultConfig.easing).toBeDefined();
      });
    });
  });

  describe('getPresetAnimation', () => {
    it('should return correct preset animation by name', () => {
      const fadeIn = getPresetAnimation('fadeIn');
      expect(fadeIn).toBeDefined();
      expect(fadeIn?.name).toBe('fadeIn');
      expect(fadeIn?.keyframes).toEqual([
        { opacity: 0 },
        { opacity: 1 }
      ]);
    });

    it('should return undefined for non-existent preset', () => {
      const nonExistent = getPresetAnimation('nonExistent');
      expect(nonExistent).toBeUndefined();
    });

    it('should be case sensitive', () => {
      const fadeIn = getPresetAnimation('FadeIn');
      expect(fadeIn).toBeUndefined();
    });
  });

  describe('specific preset validations', () => {
    it('should have correct fadeIn keyframes', () => {
      const fadeIn = getPresetAnimation('fadeIn');
      expect(fadeIn?.keyframes).toEqual([
        { opacity: 0 },
        { opacity: 1 }
      ]);
    });

    it('should have correct slideInUp keyframes', () => {
      const slideInUp = getPresetAnimation('slideInUp');
      expect(slideInUp?.keyframes).toEqual([
        { transform: 'translateY(100%)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 }
      ]);
    });

    it('should have correct bounce keyframes', () => {
      const bounce = getPresetAnimation('bounce');
      expect(bounce?.keyframes).toHaveLength(7);
      expect(bounce?.keyframes[0]).toEqual({ transform: 'translateY(0)' });
      expect(bounce?.keyframes[6]).toEqual({ transform: 'translateY(0)' });
    });

    it('should have correct pulse config', () => {
      const pulse = getPresetAnimation('pulse');
      expect(pulse?.defaultConfig.iterations).toBe('infinite');
      expect(pulse?.defaultConfig.duration).toBe(1000);
    });
  });
});
