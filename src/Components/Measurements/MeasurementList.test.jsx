import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MeasurementList } from "./MeasurementList";
import { AdminContext, ResourceContextProvider } from "react-admin";
import { describe, it, expect } from "vitest";

const mockMeasurements = [
  {
    id: 1,
    user_id: 1,
    nutritionist_id: 1,
    referenced_somatotype_id: 1,
    control: 1,
    height: 180,
    weight: 75,
    evaluation_date: "2023-01-01",
    notes: "Baseline test",
    training_period: "Preseason",
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
  },
];

const renderComponent = () => {
  return render(
    <AdminContext
      dataProvider={{
        getList: () => Promise.resolve({ data: mockMeasurements, total: 1 }),
        getMany: () => Promise.resolve({ data: [{ id: 1, firstname: "Athlete", lastname: "One" }], total: 1 }),
      }}
    >
      <ThemeProvider theme={createTheme()}>
        <ResourceContextProvider value="measurement">
          <MeasurementList />
        </ResourceContextProvider>
      </ThemeProvider>
    </AdminContext>
  );
};

describe("MeasurementList component", () => {
  it("renders the measurement list table with headers and data", async () => {
    renderComponent();

    expect(await screen.findByText("Baseline test")).toBeInTheDocument();
    expect(await screen.findByText("Preseason")).toBeInTheDocument();
  });
});
