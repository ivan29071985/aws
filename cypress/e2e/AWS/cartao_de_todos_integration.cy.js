/// <reference types="cypress" />

describe('Módulo - Cartão de Todo Integration', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Cartão de Todo Integration - Lista as unidades que foram migradas', () => {

        it('Validar retorno 200 - /api/v1/cartao-de-todos/unidades-migradas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/cartao-de-todos/unidades-migradas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 401 - /api/v1/cartao-de-todos/unidades-migradas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/cartao-de-todos/unidades-migradas',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/cartao-de-todos/unidades-migradas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', // Método Divergente
                url: '/api/v1/cartao-de-todos/unidades-migradas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    describe('Módulo - Cartão de Todo Integration - Retorna a unidade migrada caso seja encontrada', () => {

        it('Validar retorno 200 - /api/v1/cartao-de-todos/unidades-migradas/{id}', () => {
            const token = Cypress.env('access_token');
            const idUnidade = 483;

            cy.request({
                method: 'GET',
                url: `/api/v1/cartao-de-todos/unidades-migradas/${idUnidade}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const items = response.body;

                expect(items).to.have.property('id');
                expect(items).to.have.property('descricao');
                expect(items).to.have.property('endereco');
                expect(items).to.have.property('razaoSocial');
                expect(items).to.have.property('cnpj');
                expect(items).to.have.property('telefonePrincipal');
                expect(items).to.have.property('telefoneSecundario');
                expect(items).to.have.property('emailPrincipal');
                expect(items).to.have.property('emailSecundario');
                expect(items).to.have.property('cep');
                expect(items).to.have.property('numero');
                expect(items).to.have.property('complemento');
                expect(items).to.have.property('bairro');
                expect(items).to.have.property('latitude');
                expect(items).to.have.property('longitude');
                expect(items).to.have.property('cidade');
                expect(items).to.have.property('estado');
                expect(items).to.have.property('regiao');
            })
        })

        it('Validar retorno 401 - /api/v1/cartao-de-todos/unidades-migradas/{id}', () => {
            const token = Cypress.env('access_token');
            const idUnidade = 483;

            cy.request({
                method: 'GET',
                url: `/api/v1/cartao-de-todos/unidades-migradas/${idUnidade}`,
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/cartao-de-todos/unidades-migradas/{id}', () => {
            const token = Cypress.env('access_token');
            const idUnidade = 483;

            cy.request({
                method: 'DELETE', // Método divergente
                url: `/api/v1/cartao-de-todos/unidades-migradas/${idUnidade}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })
})