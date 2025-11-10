/// <reference types="cypress" />

describe('Módulo - Status Agendamento', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Status Agendamento - Retorna uma lista com as informações básicas dos procedimentos', () => {

        it('Validar retorno 200 - /api/v1/status_appointments/all-status-agendamento-basicinfo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/status_appointments/all-status-agendamento-basicinfo',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array')
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('flgPreConsulta');
                    expect(item).to.have.property('flgPreConsultaDefault');
                    expect(item).to.have.property('flgAtendimentoPresencial');
                    expect(item).to.have.property('flgAtendimentoPresencialDefault');
                    expect(item).to.have.property('flgAtendimentoTelemedicina');
                    expect(item).to.have.property('flgAtendimentoTelemedicinaDefault');
                    expect(item).to.have.property('flgPosConsulta');
                    expect(item).to.have.property('flgPosConsultaDefault');
                    expect(item).to.have.property('flgPacienteAgendamento');
                    expect(item).to.have.property('flgPortalMinhasConsultas');
                    expect(item).to.have.property('flgPortalPodeCancelar');
                    expect(item).to.have.property('flgPortalPodeRemarcar');
                    expect(item).to.have.property('flgAgendamento');
                    expect(item).to.have.property('flgSchedulerExpirar');
                    expect(item).to.have.property('flgCanUpdateStatus');
                })
                expect(body).to.have.property('etag');
            })
        })

        it('Validar retorno 401 - /api/v1/status_appointments/all-status-agendamento-basicinfo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/status_appointments/all-status-agendamento-basicinfo',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Módulo - Status Agendamento - Listar todos os status de agendamento', () => {

        it('Validar retorno 200 - /api/v1/status_appointments', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/status_appointments',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                body.forEach((item) => {
                    expect(item).to.have.property('value');
                    expect(item).to.have.property('title');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/status_appointments', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/status_appointments',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })
})