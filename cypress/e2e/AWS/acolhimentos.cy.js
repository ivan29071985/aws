/// <reference types="cypress" />

/// >>>>>>>>>>>>>>>>>>>>>>>>>>    EM CONSTRUÇÃO  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<</

describe('Módulo - Acolhimentos', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Acolhimentos - Cadastrar dados do acolhimento', () => {

        it('Validar retorno 201 - /api/v1/acolhimentos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/acolhimentos',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {/*
                    atendimentoId: 129003,
                    agendamentoId: 151586,
                    peso: 70,
                    altura: 171,
                    imc: 23.94,
                    perimetroCefalico: 100,
                    circunferenciaAbdominal: 90,
                    posicaoPa: "Deitado",
                    paSistolica: 118,
                    paDiastolica: 120,
                    freqCardiaca: 123,
                    freqRespiratoria: 123,
                    temperaturaAux: 36,
                    glicemiaCapilar: 13,
                    oximetria: 29,
                    time: "00:01:40",
                    anamnese: "testeAPI"*/
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)
            })
        })
    })
})