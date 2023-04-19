/// <reference types="cypress" />

let hasDeleteBeingReach = false;

describe('Nutritionist', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://nutrition-app.hasura.app/v1/graphql', (req) => {
      console.log(req.body.operationName, req);
      if (req.body.operationName === 'insert_nutritionist') {
        req.reply({
          data: {
            data: {
              returning: [
                {
                  address: 'calle26',
                  created_at: '2023-04-19T00:00:00',
                  email: 'ejemplo@gmail.com',
                  firstname: 'andres',
                  id: 1000,
                  lastname: 'perez',
                  password: null,
                  phone: '3122332344',
                  updated_at: '2023-04-19T00:00:00',
                  __typename: 'nutritionist',
                },
              ],
              __typename: 'nutritionist_mutation_response',
            },
          },
        });
      } else if (req.body.operationName === 'nutritionist') {
        req.reply({
          data: {
            items: (!hasDeleteBeingReach) ? [
              {
                address: 'calle26',
                created_at: '2023-04-19T00:00:00',
                email: 'ejemplo@gmail.com',
                firstname: 'andres',
                id: 1000,
                lastname: 'perez',
                password: null,
                phone: '3122332344',
                updated_at: '2023-04-19T00:00:00',
                __typename: 'nutritionist',
              },
            ] : [],
            total: {
              aggregate: {
                count: (!hasDeleteBeingReach) ? 1 : 0,
                __typename: 'nutritionist_aggregate_fields',
              },
              __typename: 'nutritionist_aggregate',
            },
          },
        });
      } else if (req.body.operationName === 'delete_nutritionist') {
        hasDeleteBeingReach = true;
        req.reply({
          data: {
            data: {
              returning: [
                {
                  address: 'calle26',
                  created_at: '2023-04-19T00:00:00',
                  email: 'ejemplo@gmail.com',
                  firstname: 'andres',
                  id: 36,
                  lastname: 'perez',
                  password: null,
                  phone: '3122332344',
                  updated_at: '2023-04-19T00:00:00',
                  __typename: 'nutritionist',
                },
              ],
              __typename: 'nutritionist_mutation_response',
            },
          },
        });
      }
    });
    cy.visit('http://localhost:3000/nutrition-app#/nutritionist')
  })

  it('Nutritionist On Desktop', () => {
    cy.viewport('macbook-13');
    cy.get("#root > div > div > div > div > main > div.MuiDrawer-root.MuiDrawer-docked.RaSidebar-docked.css-9lo51-MuiDrawer-docked-RaSidebar-root > div > div > ul > a.MuiButtonBase-root.MuiMenuItem-root.MuiMenuItem-gutters.MuiMenuItem-root.MuiMenuItem-gutters.RaMenuItemLink-active.css-krc73u-MuiButtonBase-root-MuiMenuItem-root-RaMenuItemLink-root").click();
    cy.get("#main-content > div > div > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.css-vunk5k-MuiToolbar-root-RaListToolbar-root > div > a").click();
    cy.get("#firstname").type("andres");
    cy.get("#lastname").type("perez");
    cy.get("#address").type("calle26");
    cy.get("#email").type("ejemplo@gmail.com");
    cy.get("#phone").type("3122332344");
    cy.get("#main-content > div > div > div > form > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.RaToolbar-desktopToolbar.css-qmvuda-MuiToolbar-root-RaToolbar-root > div > button").click();
    cy.get("#root > div > div > div > div > main > div.MuiDrawer-root.MuiDrawer-docked.RaSidebar-docked.css-9lo51-MuiDrawer-docked-RaSidebar-root > div > div > ul > a.MuiButtonBase-root.MuiMenuItem-root.MuiMenuItem-gutters.MuiMenuItem-root.MuiMenuItem-gutters.RaMenuItemLink-active.css-krc73u-MuiButtonBase-root-MuiMenuItem-root-RaMenuItemLink-root ").click();
    cy.get("#" + Cypress.$.escapeSelector("firstname@_like")).click();
    cy.get("#" + Cypress.$.escapeSelector("firstname@_like")).type("andres");
    cy.get("#main-content > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.RaList-content.css-bhp9pd-MuiPaper-root-MuiCard-root > ul > li > a > div").should('have.length', 1);
    cy.get("#main-content > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.RaList-content.css-bhp9pd-MuiPaper-root-MuiCard-root > ul > li > a > div").click();
    cy.get("#main-content > div > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.css-1q2ae6k-MuiToolbar-root-RaTopToolbar-root > a").click();
    cy.get("#main-content > div > div.RaEdit-main > div > form > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.RaToolbar-mobileToolbar.css-qmvuda-MuiToolbar-root-RaToolbar-root > div > button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorPrimary.MuiIconButton-sizeLarge.ra-delete-button.css-tt06me-MuiButtonBase-root-MuiIconButton-root-RaDeleteWithUndoButton-root").click();
    cy.get("#main-content > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.RaList-content.css-bhp9pd-MuiPaper-root-MuiCard-root > ul > li > a > div").should('have.length', 0);
  });

})