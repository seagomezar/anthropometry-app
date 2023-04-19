/// <reference types="cypress" />

let hasDeleteBeingReach = false;
const measurement = {
  control: "1",
  created_at: "2023-04-19T00:00:00Z",
  creatinine: 1.2,
  dm_elbow: 10,
  dm_knee: 10,
  dm_wrist: 10,
  evaluation_date: "2023-04-19",
  fitness_level: "Principiante",
  height: 175,
  id: 224,
  notes: "test",
  nutritionist_id: 1,
  plg_abdominal: 10,
  plg_armpit: 10,
  plg_bicep: 10,
  plg_calf: 10,
  plg_chest: 10,
  plg_subscapular: 10,
  plg_suprailiac: 10,
  plg_supraspinal: 10,
  plg_thigh: 10,
  plg_triceps: 10,
  prm_arm: 30,
  prm_arm_contracted: 32,
  prm_calf: 36,
  prm_chest: 90,
  prm_hip: 100,
  prm_thigh: 60,
  prm_waist: 80,
  referenced_somatotype_id: 2,
  t3_t4: 3.5,
  training_period: "2023-06-19",
  triglycerides: 150,
  updated_at: "2023-04-19T00:00:00Z",
  uric_acid: 5.5,
  user_id: 312,
  weight: 75,
  x: 1,
  y: 1,
}

describe('Measurement', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://nutrition-app.hasura.app/v1/graphql', (req) => {
      console.log(req.body.operationName, req);
      if (req.body.operationName === 'nutritionist') {
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
      } else if (req.body.operationName === 'user') {
        console.log({ hasDeleteBeingReach })
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
      } else if (req.body.operationName === 'referenced_somatotype') {
        req.reply({
          data: {
            items: (!hasDeleteBeingReach) ? [
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
            ] : [],
            total: {
              aggregate: {
                count: (!hasDeleteBeingReach) ? 1 : 0,
                __typename: 'referenced_somatotype_aggregate_fields',
              },
              __typename: 'referenced_somatotype_aggregate',
            },
          },
        });
      } else if (req.body.operationName === 'delete_measurement') {
        hasDeleteBeingReach = true;
        req.reply({
          data: {
            data: {
              returning: [
                {
                  ...measurement,
                  __typename: 'measurement',
                },
              ],
              __typename: 'measurement_mutation_response',
            },
          },
        });
      } else if (req.body.operationName === 'insert_measurement') {
        req.reply({
          data: {
            data: {
              returning: [
                {
                  ...measurement,
                  __typename: 'measurement',
                },
              ],
              __typename: 'measurement_mutation_response',
            },
          },
        });
      } else if (req.body.operationName === 'measurement') {
        req.reply({
          data: {
            items: (!hasDeleteBeingReach) ? [
              {
                ...measurement,
                __typename: 'measurement'
              },
            ] : [],
            total: {
              aggregate: {
                count: (!hasDeleteBeingReach) ? 1 : 0,
                __typename: 'measurement_aggregate_fields',
              },
              __typename: 'measurement_aggregate',
            },
          },
        });
      }
    });
    cy.visit('http://localhost:3000/nutrition-app#/measurements')
  })

  it('Measurement On Desktop', () => {
    cy.viewport('macbook-13');
    cy.get("#root > div > div > div > div > main > div.MuiDrawer-root.MuiDrawer-docked.RaSidebar-docked.css-9lo51-MuiDrawer-docked-RaSidebar-root > div > div > ul > a:nth-child(2)").click();
    cy.get("#main-content > div > div > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.css-vunk5k-MuiToolbar-root-RaListToolbar-root > div > a").click();
    cy.get("#user_id").click();
    cy.get("#user_id-option-0").click();
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
    cy.get("#main-content > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.RaList-content.css-bhp9pd-MuiPaper-root-MuiCard-root > ul > li > a > div").should('have.length', 1);
    cy.get("#main-content > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.RaList-content.css-bhp9pd-MuiPaper-root-MuiCard-root > ul > li > a > div").click();
    cy.get("#main-content > div > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.css-1q2ae6k-MuiToolbar-root-RaTopToolbar-root > a").click();
    cy.get("#main-content > div > div.RaEdit-main > div > form > div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.RaToolbar-mobileToolbar.css-qmvuda-MuiToolbar-root-RaToolbar-root > div > button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorPrimary.MuiIconButton-sizeLarge.ra-delete-button.css-tt06me-MuiButtonBase-root-MuiIconButton-root-RaDeleteWithUndoButton-root").click();
    cy.get("#main-content > div > div > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiCard-root.RaList-content.css-bhp9pd-MuiPaper-root-MuiCard-root > ul > li > a > div").should('have.length', 0);
  });

})