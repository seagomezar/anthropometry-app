import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { RecordContextProvider } from 'react-admin';
import { TimeField } from './TimeField';

describe('TimeField component', () => {
  test('renders the formatted time correctly', () => {
    const testDate = new Date(2023, 3, 18, 12, 30); // April 18, 2023 12:30 PM
    const record = { testTime: testDate };

    render(
      <RecordContextProvider value={record}>
        <TimeField source="testTime" />
      </RecordContextProvider>
    );

    const timeElement = screen.getByLabelText('12:30 PM');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement.tagName).toBe('TIME');
    expect(timeElement).toHaveAttribute('dateTime', testDate.toISOString());
    expect(timeElement).toHaveTextContent('12:30 PM');
  });

  test('renders the placeholder when no record is present', () => {
    render(
      <RecordContextProvider value={null}>
        <TimeField source="testTime" />
      </RecordContextProvider>
    );

    const placeholderElement = screen.getByLabelText('No time available');
    expect(placeholderElement).toBeInTheDocument();
    expect(placeholderElement).toHaveClass('placeholder');
  });
});
