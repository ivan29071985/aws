/// <reference types="cypress" />

describe('Módulo - Versão API', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Versão API - Versioning Interface', () => {

        it('Validar retorno 200 - /api/v1/versioning-interface', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/versioning-interface',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                // Verifica se o body começa com '<!doctype html>'
                expect(response.body.toLowerCase()).to.contain('<!doctype html>');

                // Verifica se contém a tag <html> e <head>, por exemplo
                expect(response.body).to.include('<html');
                expect(response.body).to.include('<head');
            })
        })

        it('Validar retorno 404 - /api/v1/versioning-interface', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/versioning-interface/lll', // Parâmetro inválido
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

    describe('Módulo - Versão API - Observability Interface', () => {

        it('Validar retorno 200 - /api/v1/observability-interface', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/observability-interface',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                // Verifica se o body começa com '<!doctype html>'
                expect(response.body.toLowerCase()).to.contain('<!doctype html>');

                // Verifica se contém a tag <html> e <head>, por exemplo
                expect(response.body).to.include('<html');
                expect(response.body).to.include('<head');
            })
        })

        it('Validar retorno 404 - /api/v1/observability-interface', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/observability-interface/llll', // Sem parâmetro
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
/// >>>>>>>>>>>>> Em Construção <<<<<<<<<<<<<<<<<<<<<<<<<<<
    describe('Módulo - Versão API - Endpoint Versioning config', () => {

        it('Validar retorno 200 - /api/v1/endpoint-versioning-config', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/endpoint-versioning-config',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                // Verifica se o body começa com '<!doctype html>'
                expect(response.body.toLowerCase()).to.contain('<!doctype html>');

                // Verifica se contém a tag <html> e <head>, por exemplo
                expect(response.body).to.include('<html');
                expect(response.body).to.include('<head');
            })
        })
    })

    describe('Módulo - Versão API - Endpoint Versioning config', () => {

    })
/// >>>>>>>>>>>>> Em Construção <<<<<<<<<<<<<<<<<<<<<<<<<<<

    describe('Módulo - Versão API - Observability Logs', () => {

        it('Validar retorno 200 - /api/v1/observability-logs', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/observability-logs',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 401 - /api/v1/observability-logs', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/observability-logs',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/observability-logs', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/observability-logs',
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

    describe('Módulo - Versão API - Versao API', () => {
        it('Validar retorno 200 - /api/v1/versao-api', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/versao-api',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 404 - /api/v1/versao-api', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // método divergente
                url: '/api/v1/versao-api',
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

    describe('Módulo - Versão API - Crash', () => {

        it('Validar retorno 201 - /api/v1/crash', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/crash',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                expect(response.body).to.have.property('status');
            })
        })

        it('Validar retorno 404 - /api/v1/crash', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET', //método divergente
                url: '/api/v1/crash',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404);
            })
        })
    })

    describe('Módulo - Versão API - Status', () => {

        it('Validar retorno 200 - /api/v1/status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/status',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('status');
            })
        })

        it('Validar retorno 404 - /api/v1/status', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // método divergente
                url: '/api/v1/status',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404);
            })
        })
    })
})