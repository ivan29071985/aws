/// <reference types="cypress" />

describe('Módulo - Venda de Campanha', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Venda de Campanha - campanhas - Retorna uma lista de campanhas', () => {

    it('Validar retorno 200 - /api/v1/venda-de-campanha/campanhas', () => {
      const token = Cypress.env('access_token');
      expect(token).to.exist;

      cy.request({
        method: 'GET',
        url: '/api/v1/venda-de-campanha/campanhas',
        headers: { Authorization: `Bearer ${token}` },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.within(200, 299); // aceita qualquer status 2xx
      });
    });

    it('Validar retorno 401 - /api/v1/venda-de-campanha/campanhas', () => {
      cy.request({
        method: 'GET',
        url: '/api/v1/venda-de-campanha/campanhas',
        headers: {
          'Authorization': 'Bearer token_invalido'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })

  describe('Módulo - Venda de Campanha - voucher - Retorna uma lista de vouchers de campanhas', () => {

    it('Validar retorno 200 - /api/v1/venda-de-campanha/voucher', () => {
      const token = Cypress.env('access_token')
      cy.request({
        method: 'GET',
        url: '/api/v1/venda-de-campanha/voucher/',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': '*/*'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.within(200, 299); // aceita qualquer status 2xx
      })
    })

    it('Validar retorno 401 - /api/v1/venda-de-campanha/voucher', () => {
      cy.request({
        method: 'GET',
        url: '/api/v1/venda-de-campanha/voucher',
        headers: {
          'Authorization': 'Bearer token_invalido'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })

})