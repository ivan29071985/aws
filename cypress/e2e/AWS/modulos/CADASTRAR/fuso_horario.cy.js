/// <reference types= "cypress" /> 

describe('Módulo - Fuso Horário - Retorna uma lista de regime tributários', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Fuso Horário', () => {

    it('Validar retorno 200 - /api/v1/fusohorario', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/fusohorario',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {

        // Validar status 200
        expect(response.status).to.eq(200);

        // Validar resposta exata esperada
        const expectedResponse = [
          {
            "id": 1,
            "fusohorario": "Horário do Acre (UTC-5)"
          },
          {
            "id": 2,
            "fusohorario": "Horário da Amazônia (UTC-4)"
          },
          {
            "id": 3,
            "fusohorario": "Horário de Brasília (UTC-3)"
          },
          {
            "id": 4,
            "fusohorario": "Horário de Fernando de Noronha (UTC-2)"
          }
        ];


        // Validar cada item individualmente
        response.body.forEach((item, index) => {
          expect(item).to.have.property('id');
          expect(item.id).to.be.a('number');

          cy.log(`Item ${index + 1}:`, JSON.stringify(item));
        });
      });
    })

    it('Validar retorno 401 - /api/v1/fusohorario', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/fusohorario',
        headers: {
          //'Authorization': `Bearer ${token}` Token inválido
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401);
      })
    })
  })
})



