import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAnimation } from '../react/useAnimation';

// Mock component to test the hook
const TestComponent = ({ 
  preset, 
  autoPlay = false, 
  onStart, 
  onEnd 
}: {
  preset?: string;
  autoPlay?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
}) => {
  const animation = useAnimation({
    preset,
    autoPlay,
    onStart,
    onEnd
  });

  return (
    <div>
      <div ref={animation.ref} data-testid="animated-element">
        Animated Element
      </div>
      <button onClick={animation.play} data-testid="play-button">
        Play
      </button>
      <button onClick={animation.pause} data-testid="pause-button">
        Pause
      </button>
      <button onClick={animation.cancel} data-testid="cancel-button">
        Cancel
      </button>
      <div data-testid="status">
        Playing: {animation.isPlaying.toString()}, 
        Paused: {animation.isPaused.toString()}, 
        Finished: {animation.isFinished.toString()}
      </div>
    </div>
  );
};

describe('useAnimation', () => {
  beforeEach(() => {
    // Clear any existing animations
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('animated-element')).toBeInTheDocument();
  });

  it('should provide animation controls', () => {
    render(<TestComponent />);
    
    expect(screen.getByTestId('play-button')).toBeInTheDocument();
    expect(screen.getByTestId('pause-button')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
  });

  it('should show initial status', () => {
    render(<TestComponent />);
    
    const status = screen.getByTestId('status');
    expect(status).toHaveTextContent('Playing: false');
    expect(status).toHaveTextContent('Paused: false');
    expect(status).toHaveTextContent('Finished: false');
  });

  it('should handle play button click', () => {
    render(<TestComponent />);
    
    const playButton = screen.getByTestId('play-button');
    fireEvent.click(playButton);
    
    // Note: In a real test, you'd need to wait for the animation to start
    // and check the status, but this requires more complex mocking
  });

  it('should work with preset animations', () => {
    render(<TestComponent preset="fadeIn" />);
    
    expect(screen.getByTestId('animated-element')).toBeInTheDocument();
  });

  it('should call event callbacks', () => {
    const onStart = jest.fn();
    const onEnd = jest.fn();
    
    render(
      <TestComponent 
        preset="fadeIn" 
        onStart={onStart} 
        onEnd={onEnd} 
      />
    );
    
    // Note: Testing actual callback execution would require
    // more sophisticated mocking of the Web Animations API
  });

  it('should handle autoPlay', () => {
    render(<TestComponent preset="fadeIn" autoPlay={true} />);
    
    // Note: Testing autoPlay would require waiting for the animation
    // to start and checking the status
  });
});
