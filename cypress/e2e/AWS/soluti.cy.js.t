/// <reference types="cypress" />

describe('Módulo - Soluti', () => {

    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    });

    describe('Módulo - Soluti - Assinar documento', () => {
        //criar teste
        it('Validar retorno 200 - /api/v1/soluti/sign-doc', () => {

        });

        it('Validar retorno 400 - /api/v1/soluti/sign-doc', () => {
            const token = Cypress.env('access_token')

            cy.request({
                method: 'POST',
                url: '/api/v1/soluti/sign-doc',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "attendanceId": 1,
                    "patientId": 1,
                    "pdf64Base": "data:application/pdf;base64,",
                    "wasUnauthorized": 1,
                    "cpf": "94883911039",
                    "pass": "1",
                    "type": "Atestado",
                    "typeId": 256,
                    "attendanceDate": "1",
                    "token": "Bearer as789187szdx"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
                cy.log('Status:', response.status)
                cy.log('Response body:', JSON.stringify(response.body))
            })
        });

        it('Validar retorno 401 - /api/v1/soluti/sign-doc', () => {

            cy.request({
                method: 'POST',
                url: '/api/v1/soluti/sign-doc',
                headers: {
                    'Content-Type': 'application/json'
                    // SEM Authorization header
                },
                body: {
                    "attendanceId": 1,
                    "patientId": 1,
                    "pdf64Base": "data:application/pdf;base64,",
                    "wasUnauthorized": 1,
                    "cpf": "94883911039",
                    "pass": "1",
                    "type": "Atestado",
                    "typeId": 256,
                    "attendanceDate": "1",
                    "token": "Bearer as789187szdx"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
                cy.log('✅ 401 sem token:', response.status)
                cy.log('Response body:', JSON.stringify(response.body))
            })
        });

    });

    describe('Módulo - Sluti - Autenticação no soluti', () => {
        //criar teste
        it('Validar retorno 200 - /api/v1/soluti/auth', () => {

        });

        it('Validar retorno 400 - /api/v1/soluti/auth', () => {

        });

        it('Validar retorno 401 - /api/v1/soluti/auth', () => {

        });

    });

});