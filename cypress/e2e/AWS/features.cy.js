/// <reference types= "cypress" /> 

describe('Módulo - Features', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe.only('Módulo - Features - Cria uma nova Feature', () => {

    let constFeatureName = null;
    it.only('Validar retorno 200 - /api/v1/features', () => {

      const token = Cypress.env('access_token')
      const featureName = `QA-${Date.now()}`;

      cy.request({
        method: 'POST',
        url: '/api/v1/features',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          feature: featureName,
          isActive: 1,
          defaultValueForNewUnits: 1
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(201);

        constFeatureName = featureName;
        cy.log(featureName)
      })
    })

    it('Validar retorno 400 - /api/v1/features', () => {

      const token = Cypress.env('access_token')

      cy.request({
        method: 'POST',
        url: '/api/v1/features',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: { //sem parametro no body

        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      })
    })

    it('Validar retorno 403 - /api/v1/features', () => {

      const token = Cypress.env('access_token')
      const featureName = `feature-${Date.now()}`;

      cy.request({
        method: 'GET', // Método divergente
        url: '/api/v1/features',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          feature: featureName,
          isActive: 1,
          defaultValueForNewUnits: 1
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(403);
      })
    })

    it('Validar retorno 404 - /api/v1/features', () => {

      const token = Cypress.env('access_token')
      const featureName = `feature-${Date.now()}`;

      cy.request({
        method: 'DELETE', // Método divergente
        url: '/api/v1/features',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          feature: featureName,
          isActive: 1,
          defaultValueForNewUnits: 1
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      })
    })
  })

  describe('Módulo - Features - Retorna uma lista de features de uma unidade', () => {

    it('Validar retorno 200 - /api/v1/features', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/features',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200)
        const items = response.body;

        items.forEach((item) => {
          expect(item).to.have.property('id');
          expect(item).to.have.property('feature');
          expect(item).to.have.property('isActive');
          expect(item).to.have.property('defaultValueForNewUnits');
        })

      })
    })

    it('Validar retorno 400 - /api/v1/features', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'POST', // Método divergente
        url: '/api/v1/features',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })

    it('Validar retorno 401 - /api/v1/features', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/features',
        headers: {
          //'Authorization': `Bearer ${token}`, // Token inválido
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })

    it('Validar retorno 404 - /api/v1/features', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'DELETE', // Método divergente
        url: '/api/v1/features',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404)
      })
    })
  })

  describe('Módulo - Features - Retorna uma lista de features', () => {

    it('Validar retorno 200 - /api/v1/features/all', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/features/all',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200)
        const items = response.body;

        items.forEach((item) => {
          expect(item).to.have.property('id');
          expect(item).to.have.property('feature');
          expect(item).to.have.property('isActive');
          expect(item).to.have.property('defaultValueForNewUnits');
        })
      })
    })

    it('Validar retorno 401 - /api/v1/features/all', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/features/all',
        headers: {
          //'Authorization': `Bearer ${token}`, // Token Inválido
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })

    it('Validar retorno 404 - /api/v1/features/all', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'POST', // Método divergente
        url: '/api/v1/features/all',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404)
      })
    })

    it('Validar retorno 500 - /api/v1/features/all', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'DELETE',
        url: '/api/v1/features/all',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(500)
      })
    })
  })

  describe('Módulo - Features - Atualiza uma Feature', () => {

    it('Validar retorno 200 - /api/v1/features/{id}', () => {

      const token = Cypress.env('access_token')
      const idFeature = 932;

      cy.request({
        method: 'PATCH',
        url: `/api/v1/features/${idFeature}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          feature: 'QA-1750860022218',
          isActive: 1,
          defaultValueForNewUnits: 1
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
      })
    })

    it('Validar retorno 400 - /api/v1/features/{id}', () => {

      const token = Cypress.env('access_token')
      const idFeature = 932;

      cy.request({
        method: 'PATCH',
        url: '/api/v1/features/{id}', // Sem o parametro ID
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          feature: 'QA-1750860022218',
          isActive: 1,
          defaultValueForNewUnits: 1
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      })
    })

    it('Validar retorno 401 - /api/v1/features/{id}', () => {

      const token = Cypress.env('access_token')
      const idFeature = 932;

      cy.request({
        method: 'PATCH',
        url: `/api/v1/features/${idFeature}`,
        headers: {
          //'Authorization': `Bearer ${token}`, // Token Inválido
          'Content-Type': 'application/json'
        },
        body: {
          feature: 'QA-1750860022218',
          isActive: 1,
          defaultValueForNewUnits: 1
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
      })
    })

    it('Validar retorno 403 - /api/v1/features/{id}', () => {

      const token = Cypress.env('access_token')
      const idFeature = 932;

      cy.request({
        method: 'GET',
        url: `/api/v1/features/${idFeature}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          feature: 'QA-1750860022218',
          isActive: 1,
          defaultValueForNewUnits: 1
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(403);
      })
    })
  })

  describe.only('Módulo - Features - Remove uma Feature', () => {

    it.only('Validar retorno 200 - /api/v1/features/{id}', () => {

      const token = Cypress.env('access_token');

      cy.request({
        method: 'DELETE',
        url: `/api/v1/features/${constFeatureName}`, // Id da Feature recém criada no método POST
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('Validar retorno 401 - /api/v1/features/{id}', () => {

      const token = Cypress.env('access_token');
      let idDelete = 830;

      cy.request({
        method: 'DELETE',
        url: `/api/v1/features/${idDelete}`,
        headers: {
          //'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })

    it('Validar retorno 404 - /api/v1/features/{id}', () => {

      const token = Cypress.env('access_token');
      let idDelete = 830;

      cy.request({
        method: 'DELETE',
        url: `/api/v1/features/${idDelete}`, // Sem ID
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404)
      })
    })
  })
})

