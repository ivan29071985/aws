/// <reference types="cypress"/>

describe('Módulo - Tabela Padrão', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Tabela Padrão - Cria uma tabela padrão', () => {

        it('Validar retorno 200 - /api/v1/tabela-padrao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    dataInicio: "20250101",
                    dataFim: "20250130",
                    nomeTabelaPreco: "Teste QA"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-padrao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
            
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })
    })
})