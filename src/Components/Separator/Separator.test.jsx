import React from 'react';
import { render, screen } from '@testing-library/react';
import { Separator } from './Separator';

describe('Separator', () => {
  test('renders correctly', () => {
    render(<Separator />);

    const separator = screen.getByTestId('separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('aria-hidden', 'true');
    expect(separator).toHaveStyle('padding-top: 1em');
  });
});
