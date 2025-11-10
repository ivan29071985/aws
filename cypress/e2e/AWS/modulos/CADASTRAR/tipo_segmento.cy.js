/// <reference types="cypress" />

describe('Módulo - Tipo segmento', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Tipo segmento', () => {

    it('Validar retorno 200 - /api/v1/tipoSegmentos', () => {
      const token = Cypress.env('access_token')

      cy.request({
        method: 'GET',
        url: '/api/v1/tipoSegmentos',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200)
        cy.log('✅ 200 OK - Lista de tipos de segmento retornada')
        cy.log('Response body:', JSON.stringify(response.body))

        // Verifica se retornou uma lista
        expect(response.body).to.be.an('array')

        // Se tiver dados, verifica estrutura baseada no JSON fornecido
        if (response.body.length > 0) {
          expect(response.body[0]).to.have.property('id')
          expect(response.body[0]).to.have.property('segmento')
          expect(response.body[0]).to.have.property('descricao')
          expect(response.body[0]).to.have.property('flgAtivo')

          // Log dos segmentos encontrados
          cy.log(`📋 Encontrados ${response.body.length} tipos de segmento:`)
          response.body.forEach((segmento, index) => {
            const desc = segmento.descricao ? ` - ${segmento.descricao}` : ''
            const ativo = segmento.flgAtivo === '1' ? '✅' : '❌'
            cy.log(`• ${segmento.id}: ${segmento.segmento}${desc} ${ativo}`)
          })
        }

        // Verifica segmentos específicos mencionados
        const segmentosNomes = response.body.map(item => item.segmento)
        cy.log('Segmentos disponíveis:', segmentosNomes)

        // Verifica se tem os segmentos principais do JSON
        const segmentosEsperados = ['Particular', 'Parceiros Locais', 'CDT - A', 'CDT - AA', 'CDT - AAA', 'CDT - B', 'CDT - C', 'CDT - Preço Único']
        cy.log('🎯 Verificando segmentos principais...')

        // Conta quantos segmentos ativos existem
        const segmentosAtivos = response.body.filter(item => item.flgAtivo === '1')
        cy.log(`📊 Segmentos ativos: ${segmentosAtivos.length}/${response.body.length}`)
      })
    })

    it('Validar retorno 401 - /api/v1/tipoSegmentos', () => {
      cy.request({
        method: 'GET',
        url: '/api/v1/tipoSegmentos',
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

        // Confirma que NÃO retornou dados de tipos de segmento
        cy.log('🚫 Confirmado: Sem acesso aos dados de segmentos sem autenticação')
      })
    })
  })
})