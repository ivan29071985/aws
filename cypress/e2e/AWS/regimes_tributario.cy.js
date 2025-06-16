/// <reference types= "cypress" /> 

describe('Módulo - Regime Tributário - Retorna uma lista ', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Recursos', () => {

    it('Validar retorno 200', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/regimeTributario',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        // Verifica se o status é 200
        expect(response.status).to.eq(200);

        // Verifica a estrutura dos dados
        response.body.forEach((regime) => {
          expect(regime).to.have.property('id');


        });
      });
    });

    it('Validar retorno 404', () => {
      const token = Cypress.env('access_toke');

      cy.request({
        method: 'PUT',
        url: '/api/v1/regimeTributario',
        headers: {
          'Authorization': `Bearer ${token}`
        }, failOnStatusCode: false
      }).then((response) => {
        // Verifica se o status é 200
        expect(response.status).to.eq(404);


      });
    });

  });
  
});


