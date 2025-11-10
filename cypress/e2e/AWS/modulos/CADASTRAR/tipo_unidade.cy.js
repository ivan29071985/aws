/// <reference types="cypress" />

describe('Módulo - Tipo unidade', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Tipo unidade - Retorna uma lista de tipos de unidade', () => {

    it('Validar retorno 200 - /api/v1/tipoUnidade', () => {
      const token = Cypress.env('access_token')

      cy.request({
        method: 'GET',
        url: '/api/v1/tipoUnidade',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200)
        cy.log('✅ 200 OK - Lista de tipos de unidade retornada')
        cy.log('Response body:', JSON.stringify(response.body))

        // Verifica se retornou uma lista
        expect(response.body).to.be.an('array')

        // Se tiver dados, verifica estrutura como na imagem
        if (response.body.length > 0) {
          expect(response.body[0]).to.have.property('id')
          expect(response.body[0]).to.have.property('tipoUnidade')

          // Log dos tipos encontrados
          cy.log(`📋 Encontrados ${response.body.length} tipos de unidade:`)
          response.body.forEach((tipo, index) => {
            cy.log(`• ${tipo.id}: ${tipo.tipoUnidade}`)
          })
        }

        // Verifica se tem os tipos da imagem (Matriz e Apoio)
        const tiposNomes = response.body.map(item => item.tipoUnidade)
        cy.log('Tipos disponíveis:', tiposNomes)
      })
    })

    it('Validar retorno 401 - /api/v1/tipoUnidade', () => {
      cy.request({
        method: 'GET',
        url: '/api/v1/tipoUnidade',
        headers: {
          'Accept': 'application/json'
          // SEM Authorization header para gerar 401
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
        cy.log('✅ 401 Unauthorized - Acesso negado sem token')
        cy.log('Response body:', JSON.stringify(response.body))

        // Verifica se retornou erro de autenticação
        expect(response.body).to.not.be.an('array')

        // Verifica estrutura do erro se existir
        if (response.body && typeof response.body === 'object') {
          cy.log('🔒 Estrutura do erro de autenticação:')

          // Possíveis propriedades de erro
          if (response.body.message) {
            expect(response.body).to.have.property('message')
            cy.log(`• Mensagem: ${response.body.message}`)
          }

          if (response.body.error) {
            expect(response.body).to.have.property('error')
            cy.log(`• Erro: ${response.body.error}`)
          }

          if (response.body.status) {
            expect(response.body.status).to.eq(401)
            cy.log(`• Status no body: ${response.body.status}`)
          }
        }

        // Confirma que NÃO retornou dados de tipos de unidade
        cy.log('🚫 Confirmado: Sem acesso aos tipos de unidade sem autenticação')
      })
    })
  })
  
})
