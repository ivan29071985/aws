/// <reference types="cypress"/>

describe('Módulo - Fechar Cadeado', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Fechar Cadeado - Buscar logs de fechamento de cadeados', () => {

        it('Validar retorno 200 - /api/v1/close-padlock/logs', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/close-padlock/logs?page=1&limit=10',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((resposne) => {
                expect(resposne.status).to.eq(200)

                const body = resposne.body;
                expect(body).to.have.property('items').to.be.an('array');
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('date');
                    expect(item).to.have.property('hour');
                    expect(item).to.have.property('userName');
                    expect(item).to.have.property('daysStay');
                    expect(item).to.have.property('reopeningDays');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/close-padlock/logs', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/close-padlock/logs', // Sem parâmetro na url
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((resposne) => {
                expect(resposne.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/close-padlock/logs', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/close-padlock/logs?page=1&limit=10',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((resposne) => {
                expect(resposne.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Fechar Cadeado - Buscar dias selecionados para fechamento/reabertura de cadeado', () => {

        it('Validar retorno 200 - /api/v1/close-padlock/selected-days', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/close-padlock/selected-days',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((resposne) => {
                expect(resposne.status).to.eq(200);

                expect(resposne.body).to.have.property('daysStay');
                expect(resposne.body).to.have.property('reopeningDays');
            })
        })

        it('Validar retorno 401 - /api/v1/close-padlock/selected-days', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/close-padlock/selected-days',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((resposne) => {
                expect(resposne.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Fechar Cadeado - Atualizar dias selecionados para fechamento/abertura de cadeado', () => {
        
        it('Validar retorno 200 - /api/v1/close-padlock/update-selected-days', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/close-padlock/update-selected-days',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    daysStay: 10,
                    reopeningDays: 10
                },
                failOnStatusCode: false,
            }).then((resposne) => {
                expect(resposne.status).to.eq(200);

                expect(resposne.body).to.have.property('daysStay');
                expect(resposne.body).to.have.property('reopeningDays');
            })
        })

        it('Validar retorno 401 - /api/v1/close-padlock/update-selected-days', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/close-padlock/update-selected-days',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    daysStay: 10,
                    reopeningDays: 10
                },
                failOnStatusCode: false,
            }).then((resposne) => {
                expect(resposne.status).to.eq(401);
            })
        })
    })
})
