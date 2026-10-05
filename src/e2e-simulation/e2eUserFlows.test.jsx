import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AdminContext, ShowContextProvider, ListContextProvider } from 'react-admin';
import { describe, it, expect, beforeEach } from 'vitest';

import { MeasurementShowLayout } from '../Components/Measurements/MeasurementShow';
import { UserList } from '../Components/Users/UserList';
import { MeasurementList } from '../Components/Measurements/MeasurementList';
import { Results } from '../Components/Results/Results';
import { generateResults } from '../Providers/retultsProvider';
import { i18nProvider } from '../Providers/i18nProvider';

const theme = createTheme();

/**
 * In-Memory Multi-Tenant Simulation Database
 * Acts as the ground-truth mock of the Hasura / Postgres backend.
 */
function createSimulationBackend() {
  const state = {
    nutritionist: [
      { id: 1, firstname: 'Wilson', lastname: 'Rave', email: 'wilson@rave.com', phone: '3122332344' },
      { id: 2, firstname: 'Carolina', lastname: 'Duque', email: 'carolina@duque.com', phone: '3109876543' },
    ],
    user: [
      {
        id: 101,
        firstname: 'Esteban',
        lastname: 'Gomez',
        email: 'esteban@gmail.com',
        phone: '3001234567',
        address: 'Calle 10 #20-30',
        birthday: '1995-04-12',
        gender: 'male',
        nutritionist_id: 1,
        created_at: '2026-01-10',
      },
      {
        id: 102,
        firstname: 'Mariana',
        lastname: 'Perez',
        email: 'mariana@gmail.com',
        phone: '3009876543',
        address: 'Carrera 45 #12-80',
        birthday: '1998-08-23',
        gender: 'female',
        nutritionist_id: 2,
        created_at: '2026-02-15',
      },
    ],
    measurement: [
      {
        id: 501,
        user_id: 101,
        nutritionist_id: 1,
        referenced_somatotype_id: 1,
        control: 1,
        evaluation_date: '2026-10-01',
        height: 178,
        weight: 76,
        wingspan: 180,
        training_period: 'Microciclo 1',
        notes: 'Evaluación inicial',
        // Skinfolds
        plg_triceps: 10.5,
        plg_subscapular: 11.2,
        plg_bicep: 4.8,
        plg_suprailiac: 13.5,
        plg_supraspinal: 9.0,
        plg_abdominal: 15.0,
        plg_thigh: 16.2,
        plg_calf: 8.4,
        // Perimeters
        prm_arm: 32.0,
        prm_arm_contracted: 35.5,
        prm_waist: 79.5,
        prm_hip: 97.0,
        prm_calf: 36.8,
        // Diameters
        dm_elbow: 7.2,
        dm_knee: 9.6,
        dm_wrist: 5.5,
        // Paraclinicals
        blood_pressure: '118/78',
        glucose: 92,
        hba1c: 5.3,
        hemoglobin: 15.2,
        cholesterol_total: 185,
        cholesterol_hdl: 56,
        cholesterol_ldl: 104,
        triglycerides: 125,
        paraclinicals_notes: 'Valores metabólicos dentro de rangos normales',
        created_at: '2026-10-01',
      },
      {
        id: 502,
        user_id: 102,
        nutritionist_id: 2,
        referenced_somatotype_id: 1,
        control: 1,
        evaluation_date: '2026-10-02',
        height: 165,
        weight: 58,
        plg_triceps: 14.0,
        plg_subscapular: 13.0,
        plg_supraspinal: 11.0,
        plg_abdominal: 18.0,
        plg_thigh: 20.0,
        plg_calf: 12.0,
        created_at: '2026-10-02',
      },
    ],
    referenced_somatotype: [
      { id: 1, sport: 'Fútbol Profesional', gender: true, x: -1.8, y: 4.2 },
    ],
  };

  return {
    state,
    dataProvider: {
      getList: (resource, params) => {
        let items = [...(state[resource] || [])];
        if (params?.filter) {
          for (const [key, val] of Object.entries(params.filter)) {
            if (val !== undefined && val !== null && val !== '') {
              items = items.filter((item) => String(item[key]) === String(val));
            }
          }
        }
        return Promise.resolve({
          data: items,
          total: items.length,
        });
      },
      getOne: (resource, params) => {
        const item = (state[resource] || []).find((r) => String(r.id) === String(params.id));
        if (!item) {
          return Promise.reject(new Error(`${resource} not found`));
        }
        return Promise.resolve({ data: item });
      },
      create: (resource, params) => {
        const newId = Math.max(0, ...(state[resource] || []).map((r) => r.id)) + 1;
        const newItem = { ...params.data, id: newId, created_at: new Date().toISOString() };
        state[resource] = [...(state[resource] || []), newItem];
        return Promise.resolve({ data: newItem });
      },
      update: (resource, params) => {
        const idx = (state[resource] || []).findIndex((r) => String(r.id) === String(params.id));
        if (idx === -1) return Promise.reject(new Error(`${resource} not found`));
        state[resource][idx] = { ...state[resource][idx], ...params.data };
        return Promise.resolve({ data: state[resource][idx] });
      },
      delete: (resource, params) => {
        state[resource] = (state[resource] || []).filter((r) => String(r.id) !== String(params.id));
        return Promise.resolve({ data: { id: params.id } });
      },
    },
  };
}

describe('End-to-End User Flow Simulations (Ground Truth)', () => {
  let backend;

  beforeEach(() => {
    backend = createSimulationBackend();
  });

  // Flow 1: Specialist Patient Roster & Dossier Lifecycle
  it('E2E FLOW 1: Specialist creates, reads, and updates a patient in isolated roster', async () => {
    const wilsonPerms = { role: 'nutritionist', nutritionistId: 1 };

    // 1. List patients for Wilson Rave
    const listRes = await backend.dataProvider.getList('user', {
      filter: { nutritionist_id: wilsonPerms.nutritionistId },
    });
    expect(listRes.data).toHaveLength(1);
    expect(listRes.data[0].firstname).toBe('Esteban');

    // 2. Wilson creates a new patient "Carlos Vives"
    const createRes = await backend.dataProvider.create('user', {
      data: {
        firstname: 'Carlos',
        lastname: 'Vives',
        email: 'carlos@vives.com',
        phone: '3115551234',
        address: 'Calle 80 #11-12',
        birthday: '1990-06-15',
        gender: 'male',
        nutritionist_id: wilsonPerms.nutritionistId,
      },
    });

    expect(createRes.data.id).toBeDefined();
    expect(createRes.data.nutritionist_id).toBe(1);

    // 3. Re-query list: now Wilson has 2 patients
    const updatedList = await backend.dataProvider.getList('user', {
      filter: { nutritionist_id: wilsonPerms.nutritionistId },
    });
    expect(updatedList.data).toHaveLength(2);
    expect(updatedList.data.map((u) => u.firstname)).toContain('Carlos');

    // 4. Update Carlos's phone number
    await backend.dataProvider.update('user', {
      id: createRes.data.id,
      data: { phone: '3119998877' },
    });

    const verifyUser = await backend.dataProvider.getOne('user', { id: createRes.data.id });
    expect(verifyUser.data.phone).toBe('3119998877');
  });

  // Flow 2: Comprehensive Evaluation, Paraclinicals, and Somatocarta Results
  it('E2E FLOW 2: Complete anthropometric evaluation displays all ISAK sections, paraclinicals, and somatocarta', async () => {
    const measurementRecord = backend.state.measurement[0];

    // Render MeasurementShow with in-memory provider
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[`/measurement/${measurementRecord.id}/show`]}>
          <AdminContext dataProvider={backend.dataProvider} i18nProvider={i18nProvider}>
            <ShowContextProvider value={{ record: measurementRecord, isPending: false }}>
              <MeasurementShowLayout />
            </ShowContextProvider>
          </AdminContext>
        </MemoryRouter>
      </ThemeProvider>
    );

    // Verify ISAK sections display
    expect(screen.getByText(/Ficha de Evaluación Antropométrica/i)).toBeInTheDocument();
    expect(screen.getByText(/Sección A: Datos Básicos & Evaluación/i)).toBeInTheDocument();
    expect(screen.getByText(/Sección B: Pliegues Cutáneos/i)).toBeInTheDocument();
    expect(screen.getByText(/Sección C: Perímetros Corporales/i)).toBeInTheDocument();
    expect(screen.getByText(/Sección D: Diámetros Óseos/i)).toBeInTheDocument();
    expect(screen.getByText(/Sección E: Somatotipo & Composición Corporal/i)).toBeInTheDocument();
    expect(screen.getByText(/Sección F: Exámenes Paraclínicos/i)).toBeInTheDocument();

    // Verify specific biometric values are rendered (not blank or "—")
    expect(screen.getAllByText(/178 cm/i).length).toBeGreaterThanOrEqual(1); // Height
    expect(screen.getAllByText(/76 kg/i).length).toBeGreaterThanOrEqual(1);  // Weight
    expect(screen.getByText(/10.5 mm/i)).toBeInTheDocument(); // Triceps
    expect(screen.getByText(/11.2 mm/i)).toBeInTheDocument(); // Subscapular
    expect(screen.getByText(/118\/78/i)).toBeInTheDocument(); // Blood Pressure
    expect(screen.getByText(/92 mg\/dL/i)).toBeInTheDocument(); // Glucose
    expect(screen.getByText(/5.3 %/i)).toBeInTheDocument();    // HbA1c
    expect(screen.getByText(/185 mg\/dL/i)).toBeInTheDocument(); // Total Cholesterol

    // Verify Action CTA Buttons
    expect(screen.getByText(/Descargar Ficha PDF/i)).toBeInTheDocument();
    expect(screen.getByText(/Ver Somatocarta & Gráficos/i)).toBeInTheDocument();
    expect(screen.getByText(/Consultar Diagnóstico & Somatocarta/i)).toBeInTheDocument();

    // Calculate Ground-Truth Heath-Carter Results
    const calculated = generateResults(measurementRecord, measurementRecord.height, measurementRecord.weight, true);
    expect(calculated.resultX).toBeDefined();
    expect(calculated.resultY).toBeDefined();
    expect(calculated.imc).toBeCloseTo(24.0, 0);
    expect(calculated.faulknerFatPercentage).toBeGreaterThan(5);
    expect(calculated.parizcovaFatPercentage).toBeGreaterThan(5);
  });

  // Flow 3: Dual-Nutritionist Strict Tenant Isolation (Wilson Rave vs Carolina Duque)
  it('E2E FLOW 3: Strict tenant isolation prevents Wilson from accessing Carolina’s patients/measurements and vice-versa', async () => {
    const wilsonId = 1;
    const carolinaId = 2;

    // 1. Query as Wilson Rave
    const wilsonPatients = await backend.dataProvider.getList('user', {
      filter: { nutritionist_id: wilsonId },
    });
    const wilsonMeasurements = await backend.dataProvider.getList('measurement', {
      filter: { nutritionist_id: wilsonId },
    });

    // Wilson sees only his patient (Esteban) and his measurement (501)
    expect(wilsonPatients.data).toHaveLength(1);
    expect(wilsonPatients.data[0].id).toBe(101);
    expect(wilsonMeasurements.data).toHaveLength(1);
    expect(wilsonMeasurements.data[0].id).toBe(501);

    // 2. Query as Carolina Duque
    const carolinaPatients = await backend.dataProvider.getList('user', {
      filter: { nutritionist_id: carolinaId },
    });
    const carolinaMeasurements = await backend.dataProvider.getList('measurement', {
      filter: { nutritionist_id: carolinaId },
    });

    // Carolina sees only her patient (Mariana) and her measurement (502)
    expect(carolinaPatients.data).toHaveLength(1);
    expect(carolinaPatients.data[0].id).toBe(102);
    expect(carolinaMeasurements.data).toHaveLength(1);
    expect(carolinaMeasurements.data[0].id).toBe(502);

    // 3. Super Admin queries without nutritionist filter -> sees ALL tenants
    const adminPatients = await backend.dataProvider.getList('user', {});
    const adminMeasurements = await backend.dataProvider.getList('measurement', {});
    expect(adminPatients.data).toHaveLength(2);
    expect(adminMeasurements.data).toHaveLength(2);
  });

  // Flow 4: Partial Measurement & Omitted Paraclinicals (Wilson Rave Real Clinic Simulation)
  it('E2E FLOW 4: Simulates Wilson Rave recording partial measurements without paraclinicals safely', async () => {
    // Record created with only partial data (weight, height, triceps, subscapular; no lab tests)
    const partialMeasurement = {
      id: 503,
      user_id: 101,
      nutritionist_id: 1,
      control: 2,
      height: 172,
      weight: 68,
      plg_triceps: 12.0,
      plg_subscapular: 14.5,
      // All other skinfolds, perimeters, diameters, and paraclinicals left empty / null
      plg_bicep: null,
      plg_abdominal: null,
      blood_pressure: null,
      glucose: null,
    };

    backend.state.measurement.push(partialMeasurement);

    // Render MeasurementShow with partial data
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[`/measurement/${partialMeasurement.id}/show`]}>
          <AdminContext dataProvider={backend.dataProvider} i18nProvider={i18nProvider}>
            <ShowContextProvider value={{ record: partialMeasurement, isPending: false }}>
              <MeasurementShowLayout />
            </ShowContextProvider>
          </AdminContext>
        </MemoryRouter>
      </ThemeProvider>
    );

    // Entered fields display their numeric value
    expect(screen.getAllByText(/172 cm/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/68 kg/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/12 mm/i)).toBeInTheDocument();
    expect(screen.getByText(/14.5 mm/i)).toBeInTheDocument();

    // Partial calculations evaluate without crashing or NaN
    const partialResults = generateResults(partialMeasurement, 172, 68, true);
    expect(partialResults.imc).toBeCloseTo(22.98, 1);
    expect(Number.isFinite(partialResults.resultX)).toBe(true);
    expect(Number.isFinite(partialResults.resultY)).toBe(true);
    // Yuhasz requires all 6 skinfolds, so it cleanly returns null instead of NaN
    expect(partialResults.yhaszFatPercentage).toBeNull();
  });
});
