import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../ThemeToggle';

// Mock the useTheme hook
const mockSetTheme = jest.fn();
let mockTheme = 'light';
let mockResolvedTheme = 'light';

jest.mock('@/providers/ThemeProvider', () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
    resolvedTheme: mockResolvedTheme,
  }),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTheme = 'light';
    mockResolvedTheme = 'light';
  });

  it('renders the toggle button', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /cambiar tema/i });
    expect(button).toBeInTheDocument();
  });

  it('shows correct aria-label for light theme', () => {
    mockTheme = 'light';
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute(
      'aria-label',
      expect.stringContaining('claro')
    );
  });

  it('shows correct aria-label for dark theme', () => {
    mockTheme = 'dark';
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute(
      'aria-label',
      expect.stringContaining('oscuro')
    );
  });

  it('shows correct aria-label for system theme', () => {
    mockTheme = 'system';
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute(
      'aria-label',
      expect.stringContaining('automático')
    );
  });

  it('cycles theme on click', () => {
    mockTheme = 'light';
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Should cycle from light -> dark
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('cycles from dark to system', () => {
    mockTheme = 'dark';
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('system');
  });

  it('cycles from system to light', () => {
    mockTheme = 'system';
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
});
