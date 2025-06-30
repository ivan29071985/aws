/// <reference types="cypress" />

describe('Módulo - Grupo de Regras Acesso', () => {
    beforeEach(() => {
        cy.login()
    cy.refreshToken()
    })

    describe('Módulo - Grupo de Regras Acesso - Retorna grupo de regras ativos', () => {

        it('Validar retorno 200 - /api/v1/grupo-regras', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/grupo-regras',
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
                    expect(item).to.have.property('grupoDescricao');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/grupo-regras', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/grupo-regras',
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/grupo-regras', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/grupo-regras',
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