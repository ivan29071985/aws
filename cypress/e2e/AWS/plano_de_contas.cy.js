/// <reference types= "cypress" /> 

describe('Módulo - Plano de Contas', () => {

    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    });
    
    describe('Plano de Contas - Retorna todos os planos de contas', () => {

        it('Validar retorno 200 - /api/v1/plano-de-contas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/plano-de-contas',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                // Verifica se o status é 200
                expect(response.status).to.eq(200);

                // Valida que a resposta é um array
                expect(response.body).to.be.an('array');

                // Valida o primeiro item da lista
                const item = response.body[0];

            });
        })

        it('Validar retorno 404 - /api/v1/plano-de-contas', () => {
            const token = Cypress.env('access_toke');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/plano-de-contas',
                headers: {
                    'Authorization': `Bearer ${token}`
                }, failOnStatusCode: false
            }).then((response) => {
                // Verifica se o status é 200
                expect(response.status).to.eq(404);


            });
        })

    })

    describe('Plano de Contas - Tipo Procedimento - Retorna os planos de contas para tipos de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/plano-de-contas/tipo-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/plano-de-contas/tipo-procedimento',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                // Verifica se o status é 200
                expect(response.status).to.eq(200);

               // Valida que a resposta é um array
                expect(response.body).to.be.an('array');

                // Valida o primeiro item da lista
                const item = response.body[0];

            });
        })

        it('Validar retorno 404 - /api/v1/plano-de-contas/tipo-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/plano-de-contas/tipo-procedimento',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                failOnStatusCode: false
            }).then((response) => {
                // Verifica se o status é 404
                expect(response.status).to.eq(404);
            })
        })
    })

    describe('Plano de Contas - Receitas - Retorna os planos de contas de tipo operação receita', () => {

        it('Validar retorno 200 - /api/v1/plano-de-contas/receitas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/plano-de-contas/receitas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                // Verifica se o status é 200
                expect(response.status).to.eq(200);

                // Valida que a resposta é um array
                expect(response.body).to.be.an('array');

                // Valida o primeiro item da lista
                const item = response.body[0];

            });
        })

        it('Validar retorno 404 - /api/v1/plano-de-contas/receitas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/plano-de-contas/tipo-procedimento',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                failOnStatusCode: false
            }).then((response) => {
                // Verifica se o status é 404
                expect(response.status).to.eq(404);
            })
        })
    })

    describe('Plano de Contas - Despesas - Retorna os planos de contas de tipo operação despesa', () => {
        it('Validar retorno 200 - /api/v1/plano-de-contas/despesas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/plano-de-contas/despesas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                // Verifica se o status é 200
                expect(response.status).to.eq(200);

               // Valida que a resposta é um array
                expect(response.body).to.be.an('array');

                // Valida o primeiro item da lista
                const item = response.body[0];

            })
        })

        it('Validar retorno 404 - /api/v1/plano-de-contas/despesas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/plano-de-contas/despesas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                failOnStatusCode: false
            }).then((response) => {
                // Verifica se o status é 404
                expect(response.status).to.eq(404);
            })
        })
    })
})



