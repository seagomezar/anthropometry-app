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

describe('Measurements', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:3000/nutrition-app#/measurements')
    })

    it('Crear Measurements', () => {
       cy.get("#root > div > div > div > div > main > div.MuiDrawer-root.MuiDrawer-docked.RaSidebar-docked.css-9lo51-MuiDrawer-docked-RaSidebar-root > div > div > ul > a:nth-child(3)").click();
       cy.get("#main-content > div > div > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.css-vunk5k-MuiToolbar-root-RaListToolbar-root > div > a").click();
       cy.get("#user_id").click();
       cy.get("#user_id-option-1").click();
       cy.get("#referenced_somatotype_id").click();
       cy.get("#referenced_somatotype_id-option-0").click();
       cy.get("#control").type("1");
       cy.get("#nutritionist_id").click();
       cy.get("#nutritionist_id-option-0").click();
       cy.get("#training_period").type("AUMENTO DE M.M");
       cy.get("#evaluation_date").type("2022-11-10");
       cy.get("#notes").type("test"); 
       cy.get("#weight").type("79.6");
       cy.get("#height").type("181.3");
       cy.get("#plg_triceps").type("7.8");
       cy.get("#plg_bicep").type("4.3");
       cy.get("#plg_subscapular").type("10.8");
       cy.get("#plg_suprailiac").type("13.4");
       cy.get("#plg_supraspinal").type("7.8");
       cy.get("#plg_abdominal").type("13");
       cy.get("#plg_thigh").type("7.4");
       cy.get("#plg_calf").type("6.4");
       cy.get("#plg_chest").type("0");
       cy.get("#plg_armpit").type("0");
       cy.get("#prm_arm").type("36.5");
       cy.get("#prm_arm_contracted").type("39");
       cy.get("#prm_wrist").type("0");
       cy.get("#prm_waist").type("80");
       cy.get("#prm_hip").type("99");
       cy.get("#prm_calf").type("37");
       cy.get("#prm_chest").type("0");
       cy.get("#prm_thigh").type("0");
       cy.get("#dm_elbow").type("7.5");
       cy.get("#dm_knee").type("10.5");
       cy.get("#dm_wrist").type("6.5");
       cy.get("#x").type("-0.2");
       cy.get("#y").type("8.3");
       cy.get("#creatinine").type("0");
       cy.get("#fitness_level").type("0");
       cy.get("#t3_t4").type("0");
       cy.get("#triglycerides").type("0");
       cy.get("#uric_acid").type("0");
       cy.get("#main-content > div > div > div > form > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.RaToolbar-desktopToolbar.css-qmvuda-MuiToolbar-root-RaToolbar-root > div > button").click(); 
       cy.get("#root > div > div > div > div > main > div.MuiDrawer-root.MuiDrawer-docked.RaSidebar-docked.css-9lo51-MuiDrawer-docked-RaSidebar-root > div > div > ul > a.MuiButtonBase-root.MuiMenuItem-root.MuiMenuItem-gutters.MuiMenuItem-root.MuiMenuItem-gutters.RaMenuItemLink-active.css-krc73u-MuiButtonBase-root-MuiMenuItem-root-RaMenuItemLink-root").click();
       cy.get("#" + Cypress.$.escapeSelector("notes@_like")).click();
       cy.get("#" + Cypress.$.escapeSelector("notes@_like")).type("test");
       cy.get("tr").should('have.length', 2);
       cy.get(".delete-button").click();
       cy.get("tr").should('have.length', 0);
    });

    /*
    it('editar Measurements', () => {
      cy.get("#root > div > div > div > div > main > div.MuiDrawer-root.MuiDrawer-docked.RaSidebar-docked.css-9lo51-MuiDrawer-docked-RaSidebar-root > div > div > ul > a:nth-child(3)").click();
      cy.get("#main-content > div > div > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.css-vunk5k-MuiToolbar-root-RaListToolbar-root > div > a").click();
      cy.get("#user_id").click();
      cy.get("#user_id-option-1").click();
      cy.get("#referenced_somatotype_id").click();
      cy.get("#referenced_somatotype_id-option-0").click();
      cy.get("#control").type("1");
      cy.get("#nutritionist_id").click();
      cy.get("#nutritionist_id-option-0").click();
      cy.get("#training_period").type("AUMENTO DE M.M");
      cy.get("#evaluation_date").type("2022-11-10");
      cy.get("#notes").type("test"); 
      cy.get("#weight").type("79.6");
      cy.get("#height").type("181.3");
      cy.get("#plg_triceps").type("7.8");
      cy.get("#plg_bicep").type("4.3");
      cy.get("#plg_subscapular").type("10.8");
      cy.get("#plg_suprailiac").type("13.4");
      cy.get("#plg_supraspinal").type("7.8");
      cy.get("#plg_abdominal").type("13");
      cy.get("#plg_thigh").type("7.4");
      cy.get("#plg_calf").type("6.4");
      cy.get("#plg_chest").type("0");
      cy.get("#plg_armpit").type("0");
      cy.get("#prm_arm").type("36.5");
      cy.get("#prm_arm_contracted").type("39");
      cy.get("#prm_wrist").type("0");
      cy.get("#prm_waist").type("80");
      cy.get("#prm_hip").type("99");
      cy.get("#prm_calf").type("37");
      cy.get("#prm_chest").type("0");
      cy.get("#prm_thigh").type("0");
      cy.get("#dm_elbow").type("7.5");
      cy.get("#dm_knee").type("10.5");
      cy.get("#dm_wrist").type("6.5");
      cy.get("#x").type("-0.2");
      cy.get("#y").type("8.3");
      cy.get("#creatinine").type("0");
      cy.get("#fitness_level").type("0");
      cy.get("#t3_t4").type("0");
      cy.get("#triglycerides").type("0");
      cy.get("#uric_acid").type("0");
      cy.get("#main-content > div > div > div > form > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.RaToolbar-desktopToolbar.css-qmvuda-MuiToolbar-root-RaToolbar-root > div > button").click(); 
      cy.get("#root > div > div > div > div > main > div.MuiDrawer-root.MuiDrawer-docked.RaSidebar-docked.css-9lo51-MuiDrawer-docked-RaSidebar-root > div > div > ul > a.MuiButtonBase-root.MuiMenuItem-root.MuiMenuItem-gutters.MuiMenuItem-root.MuiMenuItem-gutters.RaMenuItemLink-active.css-krc73u-MuiButtonBase-root-MuiMenuItem-root-RaMenuItemLink-root").click();
      cy.get("#" + Cypress.$.escapeSelector("notes@_like")).click();
      cy.get("#" + Cypress.$.escapeSelector("notes@_like")).type("test");
      cy.get("tr").should('have.length', 3);
      cy.get("#main-content > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.RaList-content.css-bhp9pd-MuiPaper-root-MuiCard-root > div > div.RaDatagrid-tableWrapper > table > tbody > tr > td:nth-child(14) > a").click();
      cy.get("#control").type("15");
      cy.get("#main-content > div > div.RaEdit-main > div > form > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.RaToolbar-desktopToolbar.css-qmvuda-MuiToolbar-root-RaToolbar-root > div > button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.css-t039ty-MuiButtonBase-root-MuiButton-root-RaSaveButton-root").click();
      cy.contains("115");
      cy.get("tr").should('have.length', 3);
       cy.get(".delete-button").click();
       cy.get("tr").should('have.length', 0);
       cy.wait(2000);
    })
    /*
    it('Buscar Usuario', ()=>{
    });


    it('Editar Usuario', ()=>{
    });

    it('Borrar Usuario', ()=>{

    });
    */

  })