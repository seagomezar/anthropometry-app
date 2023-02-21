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

describe('Notes', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:3000/nutrition-app#/notes')
    })
  
    it('Si creo tres notas, tienen que aparecer tres notas', () => {
        
        cy.get("#main-content > button").click();
        cy.get("#modal > div > form > textarea").type("Hola checho 1");
        cy.get("#modal > div > form > div > button.NotasForm-button.NotasForm-button--add").click();

        cy.get("#main-content > button").click();
        cy.get("#modal > div > form > textarea").type("Hola checho 1");
        cy.get("#modal > div > form > div > button.NotasForm-button.NotasForm-button--add").click();

        cy.get("#main-content > button").click();
        cy.get("#modal > div > form > textarea").type("Hola checho 1");
        cy.get("#modal > div > form > div > button.NotasForm-button.NotasForm-button--add").click();


        cy.get("#main-content > section > li > p").should('have.length', 3);
        
    });


    it('Si creo tres notas y las completo deben aparecer subrayadas', ()=>{
      cy.get("#main-content > button").click();
        cy.get("#modal > div > form > textarea").type("Hola checho 1");
        cy.get("#modal > div > form > div > button.NotasForm-button.NotasForm-button--add").click();

        cy.get("#main-content > button").click();
        cy.get("#modal > div > form > textarea").type("Hola checho 1");
        cy.get("#modal > div > form > div > button.NotasForm-button.NotasForm-button--add").click();

        cy.get("#main-content > button").click();
        cy.get("#modal > div > form > textarea").type("Hola checho 1");
        cy.get("#modal > div > form > div > button.NotasForm-button.NotasForm-button--add").click();

        cy.wait(1500)
        cy.get("#main-content > section > li:nth-child(1) > span.Icon.Icon-check.false").click();
        
        cy.get("#main-content > section > li:nth-child(2) > span.Icon.Icon-check.false").click();
        cy.get("#main-content > section > li:nth-child(3) > span.Icon.Icon-check.false").click();

        cy.get("p.NotasItem-p--completed").should('have.length', 3);
      })

  })
  