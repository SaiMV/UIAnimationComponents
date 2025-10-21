// Jest setup file
import '@testing-library/jest-dom';

// Mock Web Animations API
Object.defineProperty(Element.prototype, 'animate', {
  value: jest.fn(() => ({
    play: jest.fn(),
    pause: jest.fn(),
    reverse: jest.fn(),
    finish: jest.fn(),
    cancel: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })),
  writable: true,
});

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
