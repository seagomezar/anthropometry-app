import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import { AdminContext } from "react-admin";
import { describe, it, expect, beforeEach } from "vitest";

import { Results } from "./Results";
import { resetFeatures } from "../../config/features";
import { i18nProvider } from "../../Providers/i18nProvider";

const mockMeasurement = {
  id: 10,
  user_id: 1,
  referenced_somatotype_id: 1,
  control: 2,
  height: 175,
  weight: 70,
  triceps: 10,
  subscapular: 12,
  supraspinale: 8,
  medial_calf: 9,
  humerus: 6.8,
  femur: 9.4,
  arm_flexed: 33,
  calf: 36,
};

const mockUser = {
  id: 1,
  firstname: "Mateo",
  lastname: "Silva",
  gender: "Masculino",
};

const mockSomatotype = {
  id: 1,
  sport: "Fútbol",
  gender: true,
  x: -1.2,
  y: 4.1,
};

const mockDataProvider = {
  getOne: (resource, params) => {
    if (resource === "measurement") {
      return Promise.resolve({ data: mockMeasurement });
    }
    if (resource === "user") {
      return Promise.resolve({ data: mockUser });
    }
    if (resource === "referenced_somatotype") {
      return Promise.resolve({ data: mockSomatotype });
    }
    return Promise.resolve({ data: {} });
  },
};

const renderResults = () => {
  return render(
    <MemoryRouter initialEntries={["/results/10"]}>
      <AdminContext dataProvider={mockDataProvider} i18nProvider={i18nProvider}>
        <ThemeProvider theme={createTheme()}>
          <Routes>
            <Route path="/results/:measurementId" element={<Results />} />
          </Routes>
        </ThemeProvider>
      </AdminContext>
    </MemoryRouter>
  );
};

describe("Results Component", () => {
  beforeEach(() => {
    resetFeatures();
  });

  it("handles loading state gracefully without runtime TypeErrors", () => {
    // Initial render when data is not yet resolved
    renderResults();
    expect(
      screen.getByText("Cargando informe biométrico y morfológico...")
    ).toBeInTheDocument();
  });

  it("renders diagnosis title, control number, and patient metrics when data loads", async () => {
    renderResults();

    expect(
      await screen.findByText("Informe Biométrico & Diagnóstico Morfológico")
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/CONTROL #2/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Paciente: Mateo Silva/i)
    ).toBeInTheDocument();
  });
});
