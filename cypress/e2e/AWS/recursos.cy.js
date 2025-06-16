/// <reference types= "cypress" /> 

describe('Módulo - Recursos - Retorna uma lista de todos os recursos de um perfil', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Recursos', () => {

    it('Validar retorno 200', () => {

      const token = Cypress.env('access_token')
      cy.request({
        method: 'GET',
        url: '/api/v1/recursos', // URL do seu endpoint
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then((response) => {
        // Verificar se o status é 200
        expect(response.status).to.eq(200);

        // Verificar se o corpo da resposta é do tipo JSON
        expect(response.headers['content-type']).to.include('application/json');
      });
    });

    it('Validar retorno 401', () => {
      cy.request({
        method: 'GET',
        url: '/api/v1/recursos', // URL do seu endpoint
        headers: {
          'Content-Type': 'application/json',
          // Não adicione um token de autenticação ou remova-o para forçar um 401
        },
        failOnStatusCode: false // Não fazer falhar o teste automaticamente em status 4xx ou 5xx
      }).then((response) => {
        // Verificar se o status é 401
        expect(response.status).to.eq(401);
      });
    });

  });
});


