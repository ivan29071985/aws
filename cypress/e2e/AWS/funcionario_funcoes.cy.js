/// <reference types= "cypress" /> 

describe('Módulo - Funções de Funcionários - Retorna funções de funcionários', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Funções de Funcionários', () => {

    it('Validar retorno 200 - /api/v1/funcionarios-funcoes', () => {

      const token = Cypress.env('access_token')

      cy.request({
        method: 'GET',
        url: '/api/v1/funcionarios-funcoes',
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
          expect(item).to.have.property('funcao');
        })
      })
    })

    it('Validar retorno 401 - /api/v1/funcionarios-funcoes', () => {

      const token = Cypress.env('acccess_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/funcionarios-funcoes',
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

    it('Validar retorno 404 - /api/v1/funcionarios-funcoes', () => {

      const token = Cypress.env('acccess_token');

      cy.request({
        method: 'POST',
        url: '/api/v1/funcionarios-funcoes',
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


