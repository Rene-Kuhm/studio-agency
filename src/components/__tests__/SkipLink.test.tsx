import { render, screen } from '@testing-library/react';
import { SkipLink } from '../SkipLink';

describe('SkipLink', () => {
  it('renders the skip link', () => {
    render(<SkipLink />);

    const link = screen.getByText('Saltar al contenido principal');
    expect(link).toBeInTheDocument();
  });

  it('has correct href to main content', () => {
    render(<SkipLink />);

    const link = screen.getByRole('link', { name: /saltar al contenido principal/i });
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('has sr-only class for screen reader accessibility', () => {
    render(<SkipLink />);

    const link = screen.getByRole('link', { name: /saltar al contenido principal/i });
    expect(link).toHaveClass('sr-only');
  });

  it('becomes visible on focus', () => {
    render(<SkipLink />);

    const link = screen.getByRole('link', { name: /saltar al contenido principal/i });
    expect(link).toHaveClass('focus:not-sr-only');
  });
});
