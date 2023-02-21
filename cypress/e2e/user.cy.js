/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('User', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:3000/nutrition-app#/user')
    })
  
    it('Crear Usuario', () => {
      cy.get("#main-content > div > div > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.css-vunk5k-MuiToolbar-root-RaListToolbar-root > div > a").click();
      cy.get("#firstname").type("Cypress");
      cy.get("#lastname").type("User");
      cy.get("#nutritionist_id").click();
      cy.get("#nutritionist_id-option-0").click();
      cy.get("#email").type("ejemplo@ejemplo.com");
      cy.get("#birthday").click();
      cy.get("#birthday").type("2002-03-02");
      cy.get("#address").type("cll 28c#3823");
      cy.get("#phone").type("311232234");
      cy.get("#password").type("3112");
      cy.get("#confirm_password").type("3112");
      cy.get("#main-content > div > div > div > form > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.RaToolbar-desktopToolbar.css-qmvuda-MuiToolbar-root-RaToolbar-root > div > button").click();
      cy.get("#root > div > div > div > div > main > div.MuiDrawer-root.MuiDrawer-docked.RaSidebar-docked.css-9lo51-MuiDrawer-docked-RaSidebar-root > div > div > ul > a.MuiButtonBase-root.MuiMenuItem-root.MuiMenuItem-gutters.MuiMenuItem-root.MuiMenuItem-gutters.RaMenuItemLink-active.css-krc73u-MuiButtonBase-root-MuiMenuItem-root-RaMenuItemLink-root").click();
      cy.get("#" + Cypress.$.escapeSelector("firstname@_like")).click();
      cy.get("#" + Cypress.$.escapeSelector("firstname@_like")).type("Cypress");
      cy.get("tr").should('have.length', 2);
      cy.get("#main-content > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.RaList-content.css-bhp9pd-MuiPaper-root-MuiCard-root > div > div.RaDatagrid-tableWrapper > table > tbody > tr:nth-child(1) > td:nth-child(14) > button").click();
      cy.get("tr").should('have.length', 0);
    });

    /*
    it('Buscar Usuario', ()=>{
    });


    it('Editar Usuario', ()=>{
    });

    it('Borrar Usuario', ()=>{

    });
    */

  })
  