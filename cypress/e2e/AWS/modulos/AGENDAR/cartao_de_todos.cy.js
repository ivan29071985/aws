/// <reference types="cypress" />

describe('Módulo - Cartão de Todos', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Cartão de Todos - Retorna lista dos usuários cadastrados', () => {

        it('Validar retorno 200 - /api/v1/cartao-todos/matricula-ativa', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/cartao-todos/matricula-ativa?matriculaoucpf=12168515654',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                expect(response.body).to.have.property('ativo');
                expect(response.body).to.have.property('matricula');
            })
        })

        it('Validar retorno 400 - /api/v1/cartao-todos/matricula-ativa', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/cartao-todos/matricula-ativa?matriculaoucpf=', // Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/cartao-todos/matricula-ativa', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/cartao-todos/matricula-ativa?matriculaoucpf=12168515654',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Cartão de Todos - Retorna lista dos usuários cadastrados no sistema Cartão de Todos', () => {

        it('Validar retorno 200 - /api/v1/cartao-todos/cashback', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/cartao-todos/cashback?matriculaoucpf=12168515654',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('balanceAvailable');
            })
        })

        it('Validar retorno 400 - /api/v1/cartao-todos/cashback', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/cartao-todos/cashback?matriculaoucpf=', // Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/cartao-todos/cashback', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/cartao-todos/cashback?matriculaoucpf=12168515654',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })
})