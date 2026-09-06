import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdminContext, ShowContextProvider } from "react-admin";
import { describe, it, expect } from "vitest";

import { NutritionistShowLayout } from "./NutritionistShow";

const mockNutritionist = {
  id: 1,
  firstname: "Carlos",
  lastname: "Mendoza",
  email: "carlos.mendoza@laboratorio.com",
  phone: "+57 312 4567890",
  address: "Carrera 7 #72-41",
  created_at: "2023-02-10",
  updated_at: "2023-02-10",
};

const renderShow = () => {
  return render(
    <AdminContext dataProvider={{ getOne: () => Promise.resolve({ data: mockNutritionist }) }}>
      <ThemeProvider theme={createTheme()}>
        <ShowContextProvider
          value={{
            record: mockNutritionist,
            isLoading: false,
            resource: "nutritionist",
          }}
        >
          <NutritionistShowLayout />
        </ShowContextProvider>
      </ThemeProvider>
    </AdminContext>
  );
};

describe("NutritionistShow Component", () => {
  it("renders the nutritionist dossier card and contact details", () => {
    renderShow();

    expect(screen.getAllByText("Carlos Mendoza").length).toBeGreaterThan(0);
    expect(screen.getAllByText("carlos.mendoza@laboratorio.com").length).toBeGreaterThan(0);
    expect(screen.getAllByText("+57 312 4567890").length).toBeGreaterThan(0);
    expect(screen.getByText("Carrera 7 #72-41")).toBeInTheDocument();
  });
});
