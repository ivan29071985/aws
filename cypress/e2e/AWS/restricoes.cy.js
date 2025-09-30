/// <reference types="cypress" />

describe('Módulo - Restrições', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Restrições - Cria uma restrição', () => {

        it.only('Validar retorno 201 - /api/v1/restricoes', () => {
            const token = Cypress.env('access_token');
            const restricao = `Teste API ${Date.now()}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/restricoes/',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: {
                    //id: 10,
                    descricao: restricao,
                    flgAtivo: "1"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)
                // Validar estrutura do body
                expect(response.body).to.include.all.keys(
                    'codigo',
                    'flagDeError',
                    'mensagem'
                )
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

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array')
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('flgAtivo');
                    expect(item).to.have.property('createBy');
                    expect(item).to.have.property('createAt');
                    expect(item).to.have.property('updateAt');
                    expect(item).to.have.property('lastUser');
                    expect(item).to.have.property('ipClient');
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