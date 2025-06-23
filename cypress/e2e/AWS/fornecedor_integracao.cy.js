/// <reference types= "cypress" /> 

describe('Módulo - Fornecedor Integracao - Retorna os tipos de integração de fornecedor', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Fornecedor Integracao', () => {

    it('Validar retorno 200 - /api/v1/fornecedor-integracao', () => {

      const token = Cypress.env('access_token')
      cy.request({
        method: 'GET',
        url: '/api/v1/fornecedor-integracao', // URL do seu endpoint
        headers: {
          'Authorization': `Bearer ${token}`,
          'Contet-Type': 'application/json'
        },
        failOnStatusCode: false,
      }).then((response) => {
        // Verificar se o status é 200
        expect(response.status).to.eq(200);

        const items = response.body;
        items.forEach((item) => {
          expect(item).to.have.property('id');
          expect(item).to.have.property('name');
        })
      })
    })

    it('Validar retorno 401 - /api/v1/fornecedor-integracao', () => {

      const token = Cypress.env('acccess_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/fornecedor-integracao',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Contet-Type': 'application/json'
        },
        failOnStatusCode: false 
      }).then((response) => {
        // Verificar se o status é 401
        expect(response.status).to.eq(401);
      })
    })

    it('Validar retorno 404 - /api/v1/fornecedor-integracao', () => {

      const token = Cypress.env('acccess_token');

      cy.request({
        method: 'POST',
        url: '/api/v1/fornecedor-integracao',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Contet-Type': 'application/json'
        },
        failOnStatusCode: false 
      }).then((response) => {
        // Verificar se o status é 404
        expect(response.status).to.eq(404);
      })
    })
  })
})


