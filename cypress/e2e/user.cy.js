/// <reference types="cypress" />

let hasDeleteBeingReach = false;

describe('User', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://nutrition-app.hasura.app/v1/graphql', (req) => {
      console.log(req.body.operationName, req);
      if (req.body.operationName === 'user') {
        console.log({hasDeleteBeingReach})
        req.reply({
          data: {
            items: (!hasDeleteBeingReach) ? [
              {
                address: 'cll 28c#3823',
                birthday: '2002-03-02',
                created_at: '2023-04-19T00:00:00',
                email: 'ejemplo@ejemplo.com',
                firstname: 'Cypress',
                gender: 'F',
                id: 1,
                image: null,
                lastname: 'User',
                nutritionist_id: 1,
                password: 'hashed_password',
                phone: '311232234',
                updated_at: '2023-04-19T00:00:00',
                __typename: 'user',
              },
            ] : [],
            total: {
              aggregate: {
                count: (!hasDeleteBeingReach) ? 1 : 0,
                __typename: 'user_aggregate_fields',
              },
              __typename: 'user_aggregate',
            },
          },
        });
      } else if (req.body.operationName === 'delete_user') {
        hasDeleteBeingReach = true;
        req.reply({
          data: {
            data: {
              returning: [
                {
                  address: 'cll 28c#3823',
                  birthday: '2002-03-02',
                  created_at: '2023-04-19T00:00:00',
                  email: 'ejemplo@ejemplo.com',
                  firstname: 'Cypress',
                  gender: 'F',
                  id: 312,
                  image: null,
                  lastname: 'User',
                  nutritionist_id: 1,
                  password: 'hashed_password',
                  phone: '311232234',
                  updated_at: '2023-04-19T00:00:00',
                  __typename: 'user',
                },
              ],
              __typename: 'user_mutation_response',
            },
          },
        });
      } else if (req.body.operationName === 'nutritionist') {
        req.reply({
          data: {
            items: [
              {
                address: 'cll 28c#3823',
                created_at: '2023-04-19T00:00:00',
                email: 'nutritionist@example.com',
                firstname: 'John',
                id: 1,
                lastname: 'Doe',
                password: 'hashed_password',
                phone: '311232234',
                updated_at: '2023-04-19T00:00:00',
                __typename: 'nutritionist',
              },
            ],
            total: {
              aggregate: {
                count: 1,
                __typename: 'nutritionist_aggregate_fields',
              },
              __typename: 'nutritionist_aggregate',
            },
          },
        });
      } else if (req.body.operationName === 'insert_user') {
        req.reply({
          data: {
            data: {
              returning: [
                {
                  address: 'cll 28c#3823',
                  birthday: '2002-03-02',
                  created_at: '2023-04-19T00:00:00',
                  email: 'ejemplo@ejemplo.com',
                  firstname: 'Cypress',
                  gender: 'F',
                  id: 1000,
                  image: null,
                  lastname: 'User',
                  nutritionist_id: 1,
                  password: 'hashed_password',
                  phone: '311232234',
                  updated_at: '2023-04-19T00:00:00',
                  __typename: 'user',
                },
              ],
              __typename: 'user_mutation_response',
            },
          },
        });
      }
    });
    cy.visit('http://localhost:3000/nutrition-app#/user')
  })

  it('User On Desktop', () => {
    cy.viewport('macbook-13');
    cy.get("#main-content > div > div > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.css-vunk5k-MuiToolbar-root-RaListToolbar-root > div > a").click();
    cy.get("#firstname").type("Cypress");
    cy.get("#lastname").type("User");
    cy.get("#nutritionist_id").click();
    cy.get("#nutritionist_id-option-0").click();
    cy.get("#gender").click();
    cy.get("#menu-gender > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiPaper-root.MuiMenu-paper.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPopover-paper.css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper > ul > li:nth-child(2)").click();
    cy.get("#email").type("ejemplo@ejemplo.com");
    cy.get("#birthday").click();
    cy.get("#birthday").type("2002-03-02");
    cy.get("#address").type("cll 28c#3823");
    cy.get("#phone").type("311232234");
    cy.get("#main-content > div > div > div > form > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.RaToolbar-desktopToolbar.css-qmvuda-MuiToolbar-root-RaToolbar-root > div > button").click();
    cy.get("#root > div > div > div > div > main > div.MuiDrawer-root.MuiDrawer-docked.RaSidebar-docked.css-9lo51-MuiDrawer-docked-RaSidebar-root > div > div > ul > a.MuiButtonBase-root.MuiMenuItem-root.MuiMenuItem-gutters.MuiMenuItem-root.MuiMenuItem-gutters.RaMenuItemLink-active.css-krc73u-MuiButtonBase-root-MuiMenuItem-root-RaMenuItemLink-root").click();
    cy.get("#" + Cypress.$.escapeSelector("firstname@_like")).click();
    cy.get("#" + Cypress.$.escapeSelector("firstname@_like")).type("Cypress");
    cy.get("tr").should('have.length', 2);
    cy.get("#main-content > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.RaList-content.css-bhp9pd-MuiPaper-root-MuiCard-root > div > div.RaDatagrid-tableWrapper > table > tbody > tr:nth-child(1) > td:nth-child(14) > button").click();
    cy.get("tr").should('have.length', 0);
  });

  it('User On Mobile', () => {
    cy.viewport('iphone-6');
    cy.get("body > div.MuiDrawer-root.MuiDrawer-modal.RaSidebar-modal.MuiModal-root.css-44ws7n-MuiModal-root-MuiDrawer-root-RaSidebar-root > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation16.MuiDrawer-paper.RaSidebar-paper.MuiDrawer-paperAnchorLeft.RaSidebar-paperAnchorLeft.css-4t3x6l-MuiPaper-root-MuiDrawer-paper > ul > a.MuiButtonBase-root.MuiMenuItem-root.MuiMenuItem-gutters.MuiMenuItem-root.MuiMenuItem-gutters.RaMenuItemLink-active.css-krc73u-MuiButtonBase-root-MuiMenuItem-root-RaMenuItemLink-root").click();
    cy.get("#main-content > div > div > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.css-vunk5k-MuiToolbar-root-RaListToolbar-root > div > a").click();
    cy.get("#firstname").type("Cypress");
    cy.get("#lastname").type("User");
    cy.get("#nutritionist_id").click();
    cy.get("#nutritionist_id-option-0").click();
    cy.get("#gender").click();
    cy.get("#menu-gender > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiPaper-root.MuiMenu-paper.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPopover-paper.css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper > ul > li:nth-child(2)").click();
    cy.get("#email").type("ejemplo@ejemplo.com");
    cy.get("#birthday").click();
    cy.get("#birthday").type("2002-03-02");
    cy.get("#address").type("cll 28c#3823");
    cy.get("#phone").type("311232234");
    cy.get("#main-content > div > div > div > form > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.RaToolbar-mobileToolbar.css-qmvuda-MuiToolbar-root-RaToolbar-root > div > button").click();
    //cy.get("#root > div > div > div > div > main > div.MuiDrawer-root.MuiDrawer-docked.RaSidebar-docked.css-9lo51-MuiDrawer-docked-RaSidebar-root > div > div > ul > a.MuiButtonBase-root.MuiMenuItem-root.MuiMenuItem-gutters.MuiMenuItem-root.MuiMenuItem-gutters.RaMenuItemLink-active.css-krc73u-MuiButtonBase-root-MuiMenuItem-root-RaMenuItemLink-root").click();
    cy.get("#" + Cypress.$.escapeSelector("firstname@_like")).click();
    cy.get("#" + Cypress.$.escapeSelector("firstname@_like")).type("Cypress");
    cy.get("#main-content > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.RaList-content.css-bhp9pd-MuiPaper-root-MuiCard-root > ul > li > a > div").should('have.length', 1);
    cy.get("#main-content > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.RaList-content.css-bhp9pd-MuiPaper-root-MuiCard-root > ul > li > a > div").click();
    cy.get("#main-content > div > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.css-1q2ae6k-MuiToolbar-root-RaTopToolbar-root > a").click();
    cy.get("#main-content > div > div.RaEdit-main > div > form > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.RaToolbar-mobileToolbar.css-qmvuda-MuiToolbar-root-RaToolbar-root > div > button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorPrimary.MuiIconButton-sizeLarge.ra-delete-button.css-tt06me-MuiButtonBase-root-MuiIconButton-root-RaDeleteWithUndoButton-root").click();
    cy.get("#main-content > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.RaList-content.css-bhp9pd-MuiPaper-root-MuiCard-root > ul > li > a > div").should('have.length', 0);
  });

})
