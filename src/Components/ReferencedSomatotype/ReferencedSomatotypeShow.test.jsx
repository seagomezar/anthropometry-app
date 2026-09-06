import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdminContext, RecordContextProvider, ResourceContextProvider } from 'react-admin';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReferencedSomatotypeShow } from './ReferencedSomatotypeShow';
import { i18nProvider } from '../../Providers/i18nProvider';

const mockSomatotype = {
  id: 17,
  sport: 'Subacuáticas',
  gender: 'male',
  endomorph: 4.33,
  mesomorph: 5.08,
  ectomortph: 2.15,
  x: -0.85,
  y: 2.93,
};

const renderWithContext = (component) => {
  return render(
    <AdminContext dataProvider={{ getOne: () => Promise.resolve({ data: mockSomatotype }) }} i18nProvider={i18nProvider}>
      <ThemeProvider theme={createTheme()}>
        <ResourceContextProvider value="referenced_somatotype">
          <RecordContextProvider value={mockSomatotype}>
            {component}
          </RecordContextProvider>
        </ResourceContextProvider>
      </ThemeProvider>
    </AdminContext>
  );
};

describe('ReferencedSomatotypeShow', () => {
  test('renders somatotype header, metric cards, and analysis sections', async () => {
    renderWithContext(<ReferencedSomatotypeShow id={17} />);

    expect(await screen.findByText(/Act\. SUBACUÁTICAS/i)).toBeInTheDocument();
    expect(await screen.findByText(/MASCULINO/i)).toBeInTheDocument();
    expect(await screen.findByText(/GRÁFICO DE SOMATOCARTA/i)).toBeInTheDocument();
    expect(await screen.findByText(/4.33/)).toBeInTheDocument();
    expect(await screen.findByText(/5.08/)).toBeInTheDocument();
    expect(await screen.findByText(/2.15/)).toBeInTheDocument();
    expect(await screen.findByText(/Análisis Morfológico/i)).toBeInTheDocument();
    expect(await screen.findByText(/Centro de Alto Rendimiento/i)).toBeInTheDocument();
  });
});
