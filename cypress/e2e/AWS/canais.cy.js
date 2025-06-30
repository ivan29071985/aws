/// <reference types="cypress" />

describe('Módulo - Canais', () => {
    beforeEach(() => {
        cy.login()
    cy.refreshToken()
    })

    describe('Módulo - Canais - Retorna uma lista de Canais', () => {

        it('Validar retorno 200 - /api/v1/canais', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/canais',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const items = response.body;
                items.forEach((item) => {
                expect(item).to.have.property('id');
                expect(item).to.have.property('nome')
                })
            })
        })

        it('Validar retorno 401 - /api/v1/canais', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/canais',
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/canais', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // Método divergente
                url: '/api/v1/canais',
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

    describe('Módulo - Canais - Retorna uma lista de Canais de confirmações', () => {

        it('Validar retorno 200 - /api/v1/canais/confirmacoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/canais/confirmacoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('id')
                    expect(item).to.have.property('nome')
                })
            })
        })

        it('Validar retorno 401 - /api/v1/canais/confirmacoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/canais/confirmacoes',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/canais/confirmacoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/canais/confirmacoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404);
            })
        })
    })

    describe('Módulo - Canais - Retorna uma lista de Canais de Origem', () => {

        it('Validar retorno 200 - /api/v1/canais/origens', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/canais/origens',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('id')
                    expect(item).to.have.property('nome')
                })
            })
        })

        it('Validar retorno 401 - /api/v1/canais/origens', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/canais/origens',
                headers: {
                    //'Authorization': `Bearer ${token}`,  // Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/canais/origens', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',// Método divergente
                url: '/api/v1/canais/origens',
                headers: {
                    'Authorization': `Bearer ${token}`,  
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404);
            })
        })
    })
})
