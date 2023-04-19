/// <reference types="cypress" />

let hasDeleteBeingReach = false;

describe('ReferencedSomatotype', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://nutrition-app.hasura.app/v1/graphql', (req) => {
      console.log(req.body.operationName, req);
      if (req.body.operationName === 'referenced_somatotype') {
        req.reply({
          data: {
            items: [
              {
                created_at: '2023-04-19T00:00:00',
                ectomorph: 1,
                endomorph: 1,
                gender: 'F',
                id: 1,
                mesomorph: 1,
                sport: 'Basketball',
                updated_at: '2023-04-19T00:00:00',
                x: 10,
                y: 20,
                __typename: 'referenced_somatotype',
              },
            ],
            total: {
              aggregate: {
                count: (!hasDeleteBeingReach) ? 1 : 0,
                __typename: 'referenced_somatotype_aggregate_fields',
              },
              __typename: 'referenced_somatotype_aggregate',
            },
          },
        });
      } else if (req.body.operationName === 'insert_referenced_somatotype') {
        req.reply({
          data: {
            data: {
              returning: [
                {
                  created_at: '2023-04-19T00:00:00',
                  ectomorph: 31,
                  endomorph: 26,
                  gender: true,
                  id: 1,
                  mesomorph: 23,
                  sport: 'EjemploDeporte',
                  updated_at: '2023-04-19T00:00:00',
                  x: 21,
                  y: 2,
                  __typename: 'referenced_somatotype',
                },
              ],
              __typename: 'referenced_somatotype_mutation_response',
            },
          },
        });
      } else if (req.body.operationName === 'delete_referenced_somatotype') {
        hasDeleteBeingReach = true;
        req.reply({
          data: {
            data: {
              returning: [
                {
                  created_at: '2023-04-19T00:00:00',
                  ectomorph: 30,
                  endomorph: 25,
                  gender: true,
                  id: 1,
                  mesomorph: 22,
                  sport: 'EjemploDeporteBorrado',
                  updated_at: '2023-04-19T00:00:00',
                  x: 20,
                  y: 1,
                  __typename: 'referenced_somatotype',
                },
              ],
              __typename: 'referenced_somatotype_mutation_response',
            },
          },
        });
      }
    });
    cy.visit('http://localhost:3000/nutrition-app#/referenced_somatotype');
  })

  it('ReferencedSomatotype On Desktop', () => {
    cy.viewport('macbook-13');
    cy.get("#root > div > div > div > div > main > div.MuiDrawer-root.MuiDrawer-docked.RaSidebar-docked.css-9lo51-MuiDrawer-docked-RaSidebar-root > div > div > ul > a.MuiButtonBase-root.MuiMenuItem-root.MuiMenuItem-gutters.MuiMenuItem-root.MuiMenuItem-gutters.RaMenuItemLink-active.css-krc73u-MuiButtonBase-root-MuiMenuItem-root-RaMenuItemLink-root").click();
    cy.get("#main-content > div > div > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.css-vunk5k-MuiToolbar-root-RaListToolbar-root > div > a").click();
    cy.get("#sport").type("EjemploDeporte");
    cy.get("#gender").click();
    cy.get("#menu-gender > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiPaper-root.MuiMenu-paper.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPopover-paper.css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper > ul > li:nth-child(2)").click();
    cy.get("#endomorph").type("26");
    cy.get("#mesomorph").type("23");
    cy.get("#ectomorph").type("31");
    cy.get("#x").type("21");
    cy.get("#y").type("2");
    cy.get("#main-content > div > div > div > form > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.RaToolbar-desktopToolbar.css-qmvuda-MuiToolbar-root-RaToolbar-root > div > button").click();
    cy.get("#root > div > div > div > div > main > div.MuiDrawer-root.MuiDrawer-docked.RaSidebar-docked.css-9lo51-MuiDrawer-docked-RaSidebar-root > div > div > ul > a.MuiButtonBase-root.MuiMenuItem-root.MuiMenuItem-gutters.MuiMenuItem-root.MuiMenuItem-gutters.RaMenuItemLink-active.css-krc73u-MuiButtonBase-root-MuiMenuItem-root-RaMenuItemLink-root").click();
    cy.get("#" + Cypress.$.escapeSelector("sport@_like")).click();
    cy.get("#" + Cypress.$.escapeSelector("sport@_like")).type("EjemploDeporte");
    cy.get("tr").should('have.length', 2);
    cy.get("#main-content > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.RaList-content.css-bhp9pd-MuiPaper-root-MuiCard-root > div > div.RaDatagrid-tableWrapper > table > tbody > tr > td:nth-child(13) > button").click();
    cy.get("tr").should('have.length', 0);
  });

})