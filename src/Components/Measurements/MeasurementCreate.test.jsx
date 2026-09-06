import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AdminContext, RecordContextProvider, ResourceContextProvider } from 'react-admin';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { describe, it, expect } from 'vitest';
import { MeasurementCreate } from './MeasurementCreate';
import { MeasurementEdit } from './MeasurementEdit';
import { i18nProvider } from '../../Providers/i18nProvider';

const mockMeasurement = {
  id: 1,
  user_id: 1,
  referenced_somatotype_id: 1,
  nutritionist_id: 1,
  control: 101,
  height: 182,
  weight: 78,
  training_period: 'Precompetencia',
  evaluation_date: '2023-05-12',
  notes: 'Evaluación periódica de control',
  plg_triceps: 8,
  plg_bicep: 4,
  prm_arm: 32,
  dm_elbow: 6.8,
  x: 1.2,
  y: 3.4,
};

const renderWithContext = (ui) => {
  return render(
    <AdminContext
      dataProvider={{
        getOne: () => Promise.resolve({ data: mockMeasurement }),
        getList: () => Promise.resolve({ data: [], total: 0 }),
        getMany: () => Promise.resolve({ data: [], total: 0 }),
      }}
      i18nProvider={i18nProvider}
    >
      <ThemeProvider theme={createTheme()}>
        <ResourceContextProvider value="measurement">
          <RecordContextProvider value={mockMeasurement}>
            {ui}
          </RecordContextProvider>
        </ResourceContextProvider>
      </ThemeProvider>
    </AdminContext>
  );
};

describe('MeasurementCreate and MeasurementEdit components', () => {
  it('renders MeasurementCreate with archival header and categorized sections', async () => {
    renderWithContext(<MeasurementCreate />);

    expect(
      await screen.findByText('Nuevo Protocolo de Evaluación ISAK')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Sección A: Datos Administrativos & Generales')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Sección B: Pliegues Cutáneos Caliper (mm)')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Sección C: Perímetros Corporales (cm)')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Sección D: Diámetros Óseos (cm)')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Sección E: Marcadores Bioquímicos & Coordenadas')
    ).toBeInTheDocument();
  });

  it('renders MeasurementEdit with edit header and form fields', async () => {
    renderWithContext(<MeasurementEdit id={1} />);

    expect(
      await screen.findByText('Edición de Evaluación Antropométrica')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Sección A: Datos Administrativos & Generales')
    ).toBeInTheDocument();
  });
});
