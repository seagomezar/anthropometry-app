import "@testing-library/jest-dom";

import { vi } from 'vitest';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock('@react-pdf/renderer', () => ({
  PDFDownloadLink: ({ children }) =>
    typeof children === 'function'
      ? children({ loading: false, blob: null, url: null, error: null })
      : children,
  Document: ({ children }) => children,
  Page: ({ children }) => children,
  Text: ({ children }) => children,
  View: ({ children }) => children,
  StyleSheet: { create: (s) => s },
  Font: { register: () => {} },
}));

vi.mock('chart.js/auto', () => ({
  Chart: class {
    constructor() {}
    destroy() {}
    update() {}
  },
  default: class {
    constructor() {}
    destroy() {}
    update() {}
  },
}));

vi.mock('chart.js', () => ({
  Chart: class {
    constructor() {}
    destroy() {}
    update() {}
  },
  default: class {
    constructor() {}
    destroy() {}
    update() {}
  },
}));
