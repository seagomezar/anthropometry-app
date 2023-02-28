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

describe('Nutricionistas', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:3000/nutrition-app#/nutritionist')
    })

    it('Crear nutricionista', () => {
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
       cy.get("tr").should('have.length', 2); 
       cy.get("#main-content > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.RaList-content.css-bhp9pd-MuiPaper-root-MuiCard-root > div > div.RaDatagrid-tableWrapper > table > tbody > tr > td:nth-child(11) > button").click();
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