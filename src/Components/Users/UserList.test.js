import React from "react";
import { render, screen, act } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserList } from "./UserList";
import { ListContextProvider, ResourceContextProvider  } from "react-admin";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

// Seguir desde aqui: https://marmelab.com/react-admin/UnitTesting.html

const mockUsers = [
    {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        address: "123 Main St",
        birthday: "1990-01-01",
        gender: "male",
        nutritionist_id: 1,
        created_at: "2023-01-01",
        updated_at: "2023-01-01",
    },
    {
        id: 2,
        firstname: "Jane",
        lastname: "Doe",
        email: "jane@example.com",
        phone: "987-654-3210",
        address: "456 Elm St",
        birthday: "1995-02-01",
        gender: "female",
        nutritionist_id: 1,
        created_at: "2023-01-01",
        updated_at: "2023-01-01",
    },
];

const renderWithTheme = (component, isSmall = false) => {
    const queryClient = new QueryClient();
    return render(
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={createTheme({ breakpoints: { values: { sm: isSmall ? 10000 : 0 } } })}>
            <Router>
              <ResourceContextProvider value="users">
                <ListContextProvider
                  value={{
                    basePath: "/users",
                    data: mockUsers.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}),
                    ids: mockUsers.map((user) => user.id),
                    loaded: true,
                  }}
                >
                  {component}
                </ListContextProvider>
              </ResourceContextProvider>
            </Router>
          </ThemeProvider>
        </QueryClientProvider>
      );
};

describe("UserList", () => {
    test("renders table with user information on large screens", async () => {
      const { container } = renderWithTheme(<UserList />, false);
  
      await act(async () => {
        // Wait for the user information to be visible
        await screen.findByText("1");
        await screen.findByText("John");
        await screen.findByText("Doe");
      });
  
      // Perform your assertions here
    });
  
    test("renders cards with user information on small screens", async () => {
      const { container } = renderWithTheme(<UserList />, true);
  
      await act(async () => {
        // Wait for the user cards to be visible
        await screen.findByText("John Doe");
        await screen.findByText("Jane Doe");
      });
  
      // Perform your assertions here
    });
  });
  
