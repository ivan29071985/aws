/// <reference types="cypress" />

describe('Módulo - Funções', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Funções - Cria uma função', () => {

        it('Validar retorno 201 - /api/v1/funcoes', () => {
            const token = Cypress.env('access_token');
            const nomeDescricao = `Teste QA ${Date.now()}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/funcoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: nomeDescricao
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.include.all.keys(
                    'codigo',
                    'flagDeError',
                    'mensagem'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/funcoes', () => {
            const token = Cypress.env('access_token');
            const nomeDescricao = `Teste QA ${Date.now()}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/funcoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro no body
        
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/funcoes', () => {
            const token = Cypress.env('access_token');
            const nomeDescricao = `Teste QA ${Date.now()}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/funcoes',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: nomeDescricao
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Funções - Retorna uma lista de funções', () => {
        
        it('Validar retorno 200 - /api/v1/funcoes', () => {
            const token = Cypress.env('access_token');
            
            cy.request({
                method: 'GET',
                url: '/api/v1/funcoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/funcoes', () => {
            const token = Cypress.env('access_token');
            
            cy.request({
                method: 'GET',
                url: '/api/v1/funcoes',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })
})
