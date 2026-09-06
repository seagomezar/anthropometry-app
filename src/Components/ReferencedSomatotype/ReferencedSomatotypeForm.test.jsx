import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdminContext, RecordContextProvider, ResourceContextProvider } from 'react-admin';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReferencedSomatotypeForm } from './ReferencedSomatotypeForm';
import { ReferencedSomatotypeEdit } from './ReferencedSomatotypeEdit';
import { ReferencedSomatotypeCreate } from './ReferencedSomatotypeCreate';
import { i18nProvider } from '../../Providers/i18nProvider';

const mockRecord = {
  id: 17,
  sport: 'ATLET fondo',
  gender: true,
  endomorph: 1.9,
  mesomorph: 3.8,
  ectomorph: 3.6,
  x: 1.7,
  y: 2.1,
};

const renderWithContext = (ui) => {
  return render(
    <AdminContext dataProvider={{ getOne: () => Promise.resolve({ data: mockRecord }) }} i18nProvider={i18nProvider}>
      <ThemeProvider theme={createTheme()}>
        <ResourceContextProvider value="referenced_somatotype">
          <RecordContextProvider value={mockRecord}>
            {ui}
          </RecordContextProvider>
        </ResourceContextProvider>
      </ThemeProvider>
    </AdminContext>
  );
};

describe('ReferencedSomatotypeForm & Edit/Create', () => {
  test('renders form fields, labels, sections, and live preview', async () => {
    renderWithContext(<ReferencedSomatotypeEdit id={17} />);

    expect(await screen.findByText(/Registro de Datos/i)).toBeInTheDocument();
    expect(await screen.findByText(/COMPONENTES DEL SOMATOTIPO/i)).toBeInTheDocument();
    expect(await screen.findByText(/COORDENADAS CARTESIANAS/i)).toBeInTheDocument();
    expect(await screen.findByText(/Previsualización del Gráfico Somatotipo/i)).toBeInTheDocument();
    expect(await screen.findByText(/Análisis de Perfil/i)).toBeInTheDocument();
  });

  test('renders ReferencedSomatotypeCreate component cleanly', async () => {
    renderWithContext(<ReferencedSomatotypeCreate />);

    expect(await screen.findByText(/Datos Fisiológicos/i)).toBeInTheDocument();
    expect(await screen.findByText(/NUEVA ENTRADA/i)).toBeInTheDocument();
  });
});
