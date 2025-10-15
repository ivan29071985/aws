/// <reference types="cypress"/>

describe('Módulo - Parâmetros', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Parametros - Listar Parâmetros', () => {

        it('Validar retorno 200 - /api/v1/parameters', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parameters',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                expect(response.body).to.be.an('array')
                response.body.forEach((body) => {
                    expect(body).to.have.property('variable');
                    expect(body).to.have.property('value');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/parameters', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parameters',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/parameters', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/parameters',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    describe('Módulo - Parametros - Alterar Parâmetros', () => {

        it('Validar retorno 200 - /api/v1/parameters', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/parameters',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "royalt": "10.00",
                    "sellerId": "string"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.have.property('codigo');
                expect(body).to.have.property('flagDeError');
                expect(body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/parameters', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/parameters',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    // Sem parâmetro no body
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/parameters', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/parameters',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "royalt": "10.00",
                    "sellerId": "string"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 403 - /api/v1/parameters', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET', // método divergente
                url: '/api/v1/parameters',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "royalt": "10.00",
                    "sellerId": "string"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(403)
            })
        })

        it('Validar retorno 404 - /api/v1/parameters', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // método divergente
                url: '/api/v1/parameters',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "royalt": "10.00",
                    "sellerId": "string"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    describe('Módulo - Parametros - Listar Logs de Parâmetros', () => {

        it('Validar retorno 200 - /api/v1/parameters/logs', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parameters/logs',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array')
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('userId');
                    expect(item).to.have.property('user');
                    expect(item).to.have.property('oldValue');
                    expect(item).to.have.property('newValue');
                    expect(item).to.have.property('ipClient');
                    expect(item).to.have.property('description');
                    expect(item).to.have.property('action');
                    expect(item).to.have.property('data');
                })
                expect(body).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/parameters/logs', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/parameters/logs',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/parameters/logs', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/parameters/logs',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })
})
