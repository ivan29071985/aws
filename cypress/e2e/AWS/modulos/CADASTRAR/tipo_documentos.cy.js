/// <reference types="cypress" />

describe('Módulo - Tipo documentos', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Tipo documentos', () => {
    
    it('Validar retorno 200 - /api/v1/document-types', () => {

      const token = Cypress.env('access_token')

      cy.request({
        method: 'GET',
        url: '/api/v1/document-types',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200)
        cy.log('✅ 200 OK - Lista de tipos de documentos retornada')
        cy.log('Response body:', JSON.stringify(response.body))

        // Verifica se retornou uma lista
        expect(response.body).to.be.an('array')

      })
    })

    it('Validar retorno 401 - /api/v1/document-types', () => {
      cy.request({
        method: 'GET',
        url: '/api/v1/document-types',
        // SEM headers de Authorization
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
        cy.log('✅ 401 Unauthorized - Acesso negado sem token')
        cy.log('Response body:', JSON.stringify(response.body))
      })
    })

  })
})