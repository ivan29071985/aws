/// <reference types="cypress" />

describe('Módulo - Restrições', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Restrições - Cria uma restrição', () => {

        it('Validar retorno 200 - /api/v1/restricoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/restricoes/',
                headers: {
                    'Authorization': `Bearer ${token}`, //Token inválido
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: {
                    id: 1,
                    descricao: 'Idade',
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                // Validar estrutura do body
                expect(response.body).to.have.property('items').that.is.an('array').with.length(1);

                expect(response.body.items[0]).to.deep.include({
                    id: 1,
                    descricao: 'Idade',
                    flgAtivo: '1',
                    lastUser: null,
                    ipClient: null
                });

                expect(response.body).to.have.property('meta');
                expect(response.body.meta).to.deep.equal({
                    itemCount: 1,
                    totalItems: 3,
                    itemsPerPage: 1,
                    currentPage: 1,
                    totalPages: 3
                })
            })
        })

        it('Validar retorno 400 - /api/v1/restricoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/restricoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro correto no body
                    id: 1,
                    descricao: 'Restrição 1'

                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/restricoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/restricoes/',
                headers: {
                    // 'Authorization': `Bearer ${token}`, //Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    id: 1,
                    descricao: 'Restrição 1'

                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 403 - /api/v1/restricoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET', // Método divergente
                url: '/api/v1/restricoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    id: 1,
                    descricao: 'Restrição 1'

                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403)
            })
        })

        it('Validar retorno 404 - /api/v1/restricoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/restricoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    id: 1,
                    descricao: 'Restrição 1'

                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    describe('Módulo - Restrições - Retorna uma lista de restrição', () => {

        it('Validar retorno 200 - /api/v1/restricoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/restricoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/restricoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/restricoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 404 - /api/v1/restricoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', // Método Divergente
                url: '/api/v1/restricoes',
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