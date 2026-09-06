import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { NutritionistList } from "./NutritionistList";
import { AdminContext, ResourceContextProvider } from "react-admin";
import { describe, it, expect } from "vitest";

const mockNutritionists = [
  {
    id: 1,
    firstname: "Laura",
    lastname: "Gómez",
    email: "laura.gomez@laboratorio.com",
    phone: "+57 310 9988776",
    address: "Calle 100 #15-20",
    created_at: "2023-01-15",
    updated_at: "2023-01-15",
  },
];

const renderComponent = () => {
  return render(
    <AdminContext
      dataProvider={{
        getList: () => Promise.resolve({ data: mockNutritionists, total: 1 }),
      }}
    >
      <ThemeProvider theme={createTheme()}>
        <ResourceContextProvider value="nutritionist">
          <NutritionistList />
        </ResourceContextProvider>
      </ThemeProvider>
    </AdminContext>
  );
};

describe("NutritionistList component", () => {
  it("renders the nutritionist list with names and contact details", async () => {
    renderComponent();

    expect(await screen.findByText("Laura")).toBeInTheDocument();
    expect(await screen.findByText("Gómez")).toBeInTheDocument();
    expect(await screen.findByText("laura.gomez@laboratorio.com")).toBeInTheDocument();
  });
});
