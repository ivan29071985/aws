/// <reference types="cypress" />

describe('Módulo - Classificação-medica', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Classificação-medica', () => {

        it('Validar retorno 200 - /api/v1/attendance/medical-classifications', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/medical-classifications',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {
                    typeMedicalClassification: 3,
                    medicalClassification: 'Risco 1',
                    limit: 5
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('classificacaoMedica');
                    expect(item).to.have.property('cor');
                    expect(item).to.have.property('grupoClassificacaoMedica');
                    expect(item).to.have.property('grupoClassificacaoMedicaId');
                    expect(item).to.have.property('tipoClassificacaoMedica');
                    expect(item).to.have.property('tipoClassificacaoMedicaId');

                    // Validação dos tipos
                    expect(item.id).to.be.a('number');
                    expect(item.classificacaoMedica).to.be.a('string');
                    expect(item.cor).to.be.a('string');
                    expect(item.grupoClassificacaoMedica).to.be.a('string');
                    expect(item.grupoClassificacaoMedicaId).to.be.a('number');
                    expect(item.tipoClassificacaoMedica).to.be.a('string');
                    expect(item.tipoClassificacaoMedicaId).to.be.a('number');
                });
            });
        })
        
        it('Validar retorno 401 - /api/v1/attendance/medical-classifications', () => {
            const token = Cypress.env('access_tokegn');

            cy.request({
                method: 'GET',
                url: '/api/v1/attendance/medical-classifications',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                qs: {
                    typeMedicalClassification: 3,
                    medicalClassification: 'Risco 1',
                    limit: 5
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);

            });
        })
    })
})
