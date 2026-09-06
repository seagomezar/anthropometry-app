import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { AdminContext, ShowContextProvider } from "react-admin";
import { describe, it, expect, beforeEach } from "vitest";

import { MeasurementShowLayout } from "./MeasurementShow";
import { setFeatureEnabled, resetFeatures } from "../../config/features";
import { i18nProvider } from "../../Providers/i18nProvider";

const mockMeasurement = {
  id: 101,
  user_id: 1,
  nutritionist_id: 1,
  referenced_somatotype_id: 1,
  control: 3,
  height: 182,
  weight: 78,
  wingspan: 185,
  training_period: "Fase Competitiva",
  notes: "Estado óptimo",
  triceps: 8.5,
  subscapular: 9.0,
  biceps: 4.2,
  iliac_crest: 12.0,
  supraspinale: 7.5,
  abdominal: 14.0,
  front_thigh: 11.5,
  medial_calf: 6.8,
  arm_relaxed: 32.5,
  arm_flexed: 35.0,
  waist: 79.0,
  hip: 96.0,
  humerus: 7.1,
  femur: 9.8,
  created_at: "2023-05-10",
};

const mockDataProvider = {
  getOne: (resource) => {
    if (resource === "user") {
      return Promise.resolve({
        data: { id: 1, firstname: "Lucas", lastname: "Mora", gender: "Masculino" },
      });
    }
    if (resource === "nutritionist") {
      return Promise.resolve({
        data: { id: 1, firstname: "Dr. Roberto", lastname: "Vega" },
      });
    }
    if (resource === "referenced_somatotype") {
      return Promise.resolve({
        data: { id: 1, sport: "Natación", x: -2.1, y: 3.8 },
      });
    }
    if (resource === "measurement") {
      return Promise.resolve({ data: mockMeasurement });
    }
    return Promise.resolve({ data: {} });
  },
};

const renderShow = () => {
  return render(
    <BrowserRouter>
      <AdminContext dataProvider={mockDataProvider} i18nProvider={i18nProvider}>
        <ThemeProvider theme={createTheme()}>
          <ShowContextProvider
            value={{
              record: mockMeasurement,
              isLoading: false,
              isFetching: false,
              resource: "measurement",
            }}
          >
            <MeasurementShowLayout />
          </ShowContextProvider>
        </ThemeProvider>
      </AdminContext>
    </BrowserRouter>
  );
};

describe("MeasurementShowLayout Component", () => {
  beforeEach(() => {
    resetFeatures();
  });

  it("renders header banner and categorized ISAK ledger sections", async () => {
    renderShow();

    expect(
      screen.getByText("Ficha de Evaluación Antropométrica")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Sección A: Datos Básicos & Evaluación")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Sección B: Pliegues Cutáneos (mm)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Sección C: Perímetros Corporales (cm)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Sección D: Diámetros Óseos & Somatotipo (cm)")
    ).toBeInTheDocument();

    expect(screen.getByText("Fase Competitiva")).toBeInTheDocument();
    expect(screen.getByText("Estado óptimo")).toBeInTheDocument();
  });

  it("respects results_analytics feature preference", () => {
    setFeatureEnabled("results_analytics", false);
    const { unmount } = renderShow();

    expect(
      screen.queryByText("Ver Somatocarta & Gráficos")
    ).not.toBeInTheDocument();

    unmount();
    setFeatureEnabled("results_analytics", true);
    renderShow();
    expect(screen.getByText("Ver Somatocarta & Gráficos")).toBeInTheDocument();
  });
});
