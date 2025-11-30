import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { CookieConsent } from '../CookieConsent';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock gtag
const mockGtag = jest.fn();
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true,
});

describe('CookieConsent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('does not render initially when consent was accepted', () => {
    localStorageMock.getItem.mockReturnValue('accepted');
    render(<CookieConsent />);

    expect(screen.queryByText(/usamos cookies/i)).not.toBeInTheDocument();
  });

  it('does not render when consent was rejected', () => {
    localStorageMock.getItem.mockReturnValue('rejected');
    render(<CookieConsent />);

    expect(screen.queryByText(/usamos cookies/i)).not.toBeInTheDocument();
  });

  it('renders banner after delay when no consent stored', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<CookieConsent />);

    // Initially not visible
    expect(screen.queryByText(/usamos cookies/i)).not.toBeInTheDocument();

    // Fast-forward timer wrapped in act
    await act(async () => {
      jest.advanceTimersByTime(2100);
    });

    await waitFor(() => {
      expect(screen.getByText(/usamos cookies/i)).toBeInTheDocument();
    });
  });

  it('has accept and reject buttons', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<CookieConsent />);

    await act(async () => {
      jest.advanceTimersByTime(2100);
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /aceptar cookies/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /rechazar/i })).toBeInTheDocument();
    });
  });

  it('saves accepted consent and calls gtag', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<CookieConsent />);

    await act(async () => {
      jest.advanceTimersByTime(2100);
    });

    await waitFor(() => {
      expect(screen.getByText(/usamos cookies/i)).toBeInTheDocument();
    });

    const acceptButton = screen.getByRole('button', { name: /aceptar cookies/i });
    fireEvent.click(acceptButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('cookie-consent', 'accepted');
    expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'granted',
    });
  });

  it('saves rejected consent and calls gtag', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<CookieConsent />);

    await act(async () => {
      jest.advanceTimersByTime(2100);
    });

    await waitFor(() => {
      expect(screen.getByText(/usamos cookies/i)).toBeInTheDocument();
    });

    const rejectButton = screen.getByRole('button', { name: /rechazar/i });
    fireEvent.click(rejectButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('cookie-consent', 'rejected');
    expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'denied',
    });
  });

  it('contains link to privacy policy', async () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<CookieConsent />);

    await act(async () => {
      jest.advanceTimersByTime(2100);
    });

    await waitFor(() => {
      expect(screen.getByText(/usamos cookies/i)).toBeInTheDocument();
    });

    const link = screen.getByRole('link', { name: /más información/i });
    expect(link).toHaveAttribute('href', '/privacy');
  });
});
