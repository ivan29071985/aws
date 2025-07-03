/// <reference types="cypress" />

describe('Módulo - Grupo de Regras Acesso', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('API Municípios/Estados', () => {
        const token = Cypress.env('access_token')

        beforeEach(() => {
            // Configurações que podem ser necessárias antes de cada teste
            cy.intercept('GET', '/api/v1/municipios*').as('getMunicipios')
        })

        it('Validar retorno 200 - api/v1/municipios', () => {

            const token = Cypress.env('access_token')
            cy.request({
                method: 'GET',
                url: '/api/v1/municipios',
                headers: {
                    'Authorization': `Bearer ${token}`
                }, failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')

                if (response.body.length > 0) {
                    const municipio = response.body[0]

                    // Verifica se tem os 4 campos obrigatórios
                    expect(municipio).to.have.property('id')
                    expect(municipio).to.have.property('municipio')
                    expect(municipio).to.have.property('estadoId')
                    expect(municipio).to.have.property('estado')
                }
            })
        })

        it('Validar retorno 401 - api/v1/municipios', () => {

            cy.request({
                method: 'GET',
                url: '/api/v1/municipios',
                headers: {
                    'Authorization': `Bearer ${token}`
                }, failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - api/v1/municipios', () => {

            const token = Cypress.env('access_token')
            cy.request({
                method: 'POST',
                url: '/api/v1/municipios',
                headers: {
                    'Authorization': `Bearer ${token}`
                }, failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)

            })
        })
    })

    describe('API Estados', () => {
        const token = Cypress.env('access_token')

        beforeEach(() => {
            // Configurações que podem ser necessárias antes de cada teste
            cy.intercept('GET', '/api/v1/estados*').as('getEstados')
        })

        it('Validar retorno 200 - api/v1/estados', () => {
            const token = Cypress.env('access_token')
            cy.request({
                method: 'GET',
                url: '/api/v1/estados',
                headers: {
                    'Authorization': `Bearer ${token}`
                }, failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')

                if (response.body.length > 0) {
                    const estado = response.body[0]

                    // Verifica se tem os campos obrigatórios
                    expect(estado).to.have.property('id')
                    expect(estado).to.have.property('uf')
                }
            })
        })

        it('Validar retorno 401 - api/v1/estados', () => {
            cy.request({
                method: 'GET',
                url: '/api/v1/estados',
                headers: {
                    'Authorization': `Bearer token_invalido`
                }, failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - api/v1/estados', () => {
            const token = Cypress.env('access_token')
            cy.request({
                method: 'POST',
                url: '/api/v1/estados',
                headers: {
                    'Authorization': `Bearer ${token}`
                }, failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })
})