import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserList } from "./UserList";
import { AdminContext, ListContextProvider, ResourceContextProvider } from "react-admin";
import mediaQuery from 'css-mediaquery';

function createMatchMedia(width) {
  return query => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => { },
    removeListener: () => { },
  });
}

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
    lastname: "Perez",
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
  return render(
    <AdminContext dataProvider={{
      getList: () => {
        return Promise.resolve({ data: mockUsers, total: mockUsers.length })
      },
      getMany: () => {
        return Promise.resolve({ data: mockUsers, total: mockUsers.length })
      }
    }}>
      <ThemeProvider theme={createTheme({ breakpoints: { values: { sm: isSmall ? 10000 : 0 } } })}>
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
      </ThemeProvider>
    </AdminContext>
  );
};

describe("UserList", () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });
  test("renders table with user information on large screens", async () => {
    renderWithTheme(<UserList />, false);

    // Wait for the user information to be visible and verify user 1 data
    await screen.findByText("1");
    await screen.findByText("John");
    await screen.findByText("Doe");
    await screen.findByText("john@example.com");
    await screen.findByText("123-456-7890");
    await screen.findByText("123 Main St");
    await screen.findByText("1990-01-01");
    await screen.findByText("male");

    // Wait for the user information to be visible and verify user 2 data
    await screen.findByText("2");
    await screen.findByText("Jane");
    await screen.findByText("Perez");
    await screen.findByText("jane@example.com");
    await screen.findByText("987-654-3210");
    await screen.findByText("456 Elm St");
    await screen.findByText("1995-02-01");
    await screen.findByText("female");
  });

  test("renders cards with user information on small screens", async () => {
    renderWithTheme(<UserList />, true);
    // Wait for the user cards to be visible
    await screen.findByText("John Doe");
    await screen.findByText("Jane Perez");
    await screen.findByText("jane@example.com");
    await screen.findByText("john@example.com");
  });
});

