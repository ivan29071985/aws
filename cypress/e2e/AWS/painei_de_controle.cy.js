/// <reference types="cypress" />

describe('Módulo - Painel de Controle', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Modulo - Painel de Controle - Desactivar Tef', () => {

        it('Validar retorno 201 - /api/v1/control-panel/deactivate-tef', () => {
            const token = Cypress.env('access_token')

            const requestBody = {
                reason: "reason",
                username: "username",
                clinicId: 1
            }

            cy.request({
                method: 'POST',
                url: '/api/v1/control-panel/deactivate-tef',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: requestBody
            }).then((response) => {
                // Verificar se o status é 201
                expect(response.status).to.eq(201);

                // Valida a estrutura dos dados de resposta
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.include('TEF desativado com sucesso');
            })
        })

        it('Validar retorno 400 - /api/v1/control-panel/deactivate-tef', () => {
            const token = Cypress.env('access_token')

            const requestBody = {
                reason: "reason",
                username: "username",
                ads: 1
            }

            cy.request({
                method: 'POST',
                url: '/api/v1/control-panel/deactivate-tef',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, failOnStatusCode: false,
                body: requestBody
            }).then((response) => {
                // Verificar se o status é 201
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/control-panel/deactivate-tef', () => {
            const token = Cypress.env('access_tokenm')

            const requestBody = {
                reason: "reason",
                username: "username",
                clinicId: 1
            }

            cy.request({
                method: 'POST',
                url: '/api/v1/control-panel/deactivate-tef',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, failOnStatusCode: false,
                body: requestBody
            }).then((response) => {
                // Verificar se o status é 201
                expect(response.status).to.eq(401);

            })
        })

        it('Validar retorno 404 - /api/v1/control-panel/deactivate-tef', () => {
            const token = Cypress.env('access_token')

            const requestBody = {
                reason: "reason",
                username: "username",
                clinicId: 1
            }

            cy.request({
                method: 'DELETE',
                url: '/api/v1/control-panel/deactivate-tef',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, failOnStatusCode: false,
                body: requestBody
            }).then((response) => {
                // Verificar se o status é 201
                expect(response.status).to.eq(404);

                // Valida a estrutura dos dados de resposta
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.be.a('string');
            })
        })
    });

    describe('Modulo - Painel de Controle - Activate TEF', () => {

        it('Validar retorno 201 - /api/v1/control-panel/activate-tef', () => {
            const token = Cypress.env('access_token')

            const requestBody = {
                username: "username",
                clinicId: 1
            }

            cy.request({
                method: 'POST',
                url: '/api/v1/control-panel/activate-tef',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: requestBody
            }).then((response) => {
                // Verificar se o status é 201
                expect(response.status).to.eq(201);

                // Valida a estrutura dos dados de resposta
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.be.a('string');
                expect(response.body.message).to.include('TEF ativado com sucesso');
                expect(response.body.message).to.include('username');
            })
        })

        it('Validar retorno 400 - /api/v1/control-panel/activate-tef', () => {
            const token = Cypress.env('access_token')

            const requestBody = {
                username: "username",
                as: 1
            }

            cy.request({
                method: 'POST',
                url: '/api/v1/control-panel/activate-tef',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, failOnStatusCode: false,
                body: requestBody
            }).then((response) => {
                // Verificar se o status é 201
                expect(response.status).to.eq(400);

                // Valida a estrutura dos dados de resposta
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.be.a('string');
            })
        })

        it('Validar retorno 401 - /api/v1/control-panel/activate-tef', () => {
            const token = Cypress.env('access_tokenss')

            const requestBody = {
                username: "username",
                clinicId: 1
            }

            cy.request({
                method: 'POST',
                url: '/api/v1/control-panel/activate-tef',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, failOnStatusCode: false,
                body: requestBody
            }).then((response) => {
                // Verificar se o status é 201
                expect(response.status).to.eq(401);

                // Valida a estrutura dos dados de resposta
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.be.a('string');
            })
        })

        it('Validar retorno 404 - /api/v1/control-panel/activate-tef', () => {
            const token = Cypress.env('access_token')

            const requestBody = {
                s: "username",
                s: 1
            }

            cy.request({
                method: 'DELETE',
                url: '/api/v1/control-panel/activate-tef',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, failOnStatusCode: false,
                body: requestBody
            }).then((response) => {
                // Verificar se o status é 201
                expect(response.status).to.eq(404);

                // Valida a estrutura dos dados de resposta
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.be.a('string');

            })
        })

    })

    //describe('Modulo - Painel de Controle - Status', () => {

        it('Validar retorno 200 - /api/v1/control-panel/status-tef/{clinicId}', () => {
            const token = Cypress.env('access_token')
            const clinicId = 483 // ID da clínica para consultar o status

            cy.request({
                method: 'GET',
                url: `/api/v1/control-panel/status-tef/${clinicId}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }).then((response) => {
                // Verificar se o status é 200
                expect(response.status).to.eq(200);

                // Valida a estrutura dos dados de resposta
                expect(response.body).to.have.property('tefStatus');
                expect(response.body.tefStatus).to.be.a('string');

                // Valida que o status retornado é um valor válido
                expect(response.body.tefStatus).to.be.oneOf(['active', 'inactive']);
            })
        })

        it('Validar retorno 401 - /api/v1/control-panel/status-tef/{clinicId}', () => {
            const token = Cypress.env('access_tokend')
            const clinicId = 483 // ID da clínica para consultar o status

            cy.request({
                method: 'GET',
                url: `/api/v1/control-panel/status-tef/${clinicId}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }, failOnStatusCode: false,
            }).then((response) => {
                // Verificar se o status é 200
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/control-panel/status-tef/{clinicId}', () => {
            const token = Cypress.env('access_token')
            const clinicId = 483 // ID da clínica para consultar o status

            cy.request({
                method: 'DELETE',
                url: `/api/v1/control-panel/status-tef/${clinicId}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },failOnStatusCode: false,
            }).then((response) => {
                // Verificar se o status é 404
                expect(response.status).to.eq(404);
            })
        })
    //})

})