import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, variants, whileHover, whileTap, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, variants, whileHover, whileTap, ...rest } = props;
      return <span {...rest}>{children}</span>;
    },
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, variants, whileHover, whileTap, ...rest } = props;
      return <button {...rest}>{children}</button>;
    },
    form: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, variants, whileHover, whileTap, ...rest } = props;
      return <form {...rest}>{children}</form>;
    },
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, variants, whileHover, whileTap, ...rest } = props;
      return <p {...rest}>{children}</p>;
    },
    a: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, variants, whileHover, whileTap, ...rest } = props;
      return <a {...rest}>{children}</a>;
    },
    ul: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, variants, whileHover, whileTap, ...rest } = props;
      return <ul {...rest}>{children}</ul>;
    },
    li: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, variants, whileHover, whileTap, ...rest } = props;
      return <li {...rest}>{children}</li>;
    },
    header: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, variants, whileHover, whileTap, ...rest } = props;
      return <header {...rest}>{children}</header>;
    },
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, variants, whileHover, whileTap, ...rest } = props;
      return <section {...rest}>{children}</section>;
    },
    article: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, variants, whileHover, whileTap, ...rest } = props;
      return <article {...rest}>{children}</article>;
    },
    nav: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, variants, whileHover, whileTap, ...rest } = props;
      return <nav {...rest}>{children}</nav>;
    },
    svg: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial, animate, exit, variants, whileHover, whileTap, ...rest } = props;
      return <svg {...rest}>{children}</svg>;
    },
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: { current: 0 } }),
  useTransform: () => 0,
  useSpring: () => ({ current: 0 }),
  useInView: () => true,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
  }),
}));

// Only setup DOM-related mocks in jsdom environment
if (typeof window !== 'undefined') {
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Mock IntersectionObserver
  class MockIntersectionObserver {
    observe = jest.fn();
    disconnect = jest.fn();
    unobserve = jest.fn();
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });

  // Mock ResizeObserver
  class MockResizeObserver {
    observe = jest.fn();
    disconnect = jest.fn();
    unobserve = jest.fn();
  }

  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: MockResizeObserver,
  });
}

// Suppress console errors during tests (optional)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
