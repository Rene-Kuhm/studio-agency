import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewsletterForm } from '../NewsletterForm';

// Mock MagneticButton to avoid animation issues
jest.mock('@/components/animations/MagneticButton', () => ({
  MagneticButton: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock fetch
global.fetch = jest.fn();

describe('NewsletterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockReset();
  });

  it('renders the form', () => {
    render(<NewsletterForm />);

    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /suscribirse/i })).toBeInTheDocument();
  });

  it('shows error for empty email submission', async () => {
    render(<NewsletterForm />);

    const submitButton = screen.getByRole('button', { name: /suscribirse/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/por favor, ingresá tu email/i)).toBeInTheDocument();
    });
  });

  it('submits email successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Suscripción exitosa' }),
    });

    render(<NewsletterForm />);

    const emailInput = screen.getByPlaceholderText('tu@email.com');
    const submitButton = screen.getByRole('button', { name: /suscribirse/i });

    await userEvent.type(emailInput, 'test@example.com');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/suscripción exitosa/i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' }),
    });
  });

  it('handles API error with error message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Email ya registrado' }),
    });

    render(<NewsletterForm />);

    const emailInput = screen.getByPlaceholderText('tu@email.com');
    const submitButton = screen.getByRole('button', { name: /suscribirse/i });

    await userEvent.type(emailInput, 'existing@example.com');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email ya registrado/i)).toBeInTheDocument();
    });
  });

  it('shows loading state while submitting', async () => {
    let resolvePromise: (value: unknown) => void;
    const responsePromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    (global.fetch as jest.Mock).mockReturnValueOnce(responsePromise);

    render(<NewsletterForm />);

    const emailInput = screen.getByPlaceholderText('tu@email.com');
    const submitButton = screen.getByRole('button', { name: /suscribirse/i });

    await userEvent.type(emailInput, 'test@example.com');
    fireEvent.click(submitButton);

    expect(screen.getByText(/enviando/i)).toBeInTheDocument();

    // Resolve the promise to complete the test
    resolvePromise!({
      ok: true,
      json: async () => ({ message: 'Success' }),
    });

    await waitFor(() => {
      expect(screen.queryByText(/enviando/i)).not.toBeInTheDocument();
    });
  });

  it('applies dark variant classes', () => {
    render(<NewsletterForm variant="dark" />);

    const input = screen.getByPlaceholderText('tu@email.com');
    expect(input).toHaveClass('bg-background/10');
  });

  it('accepts custom className', () => {
    const { container } = render(<NewsletterForm className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
