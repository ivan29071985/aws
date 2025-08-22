/// <reference types="cypress" />

/// >>>>>>>>>>>>>>>>>>>>>>>> EM CONSTRUÇÃO <<<<<<<<<<<<<<<<<<<<<<<<<
describe('Módulo - Lista Espera', () => {

    describe.skip('Módulo - Lista Espera - Cria uma lista de espera', () => {

        it('Validar retorno 201 - /api/v1/lista-espera', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/lista-espera',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    pacienteId: 245352,
                    clinicaId: 483,
                    procedimentoId: 20715,
                    especialidadeId: 611,
                    convenioId: 5,
                    profissionalId: 4121,
                    parceriaId: 20486,
                    observacoes: "observacoes",
                    tabela: "convenio",
                    cpf: "43657772898"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)

                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/lista-espera', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/lista-espera',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { //Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/lista-espera', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/lista-espera',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "pacienteId": 245352,
                    "clinicaId": 483,
                    "procedimentoId": 20715,
                    "especialidadeId": 611,
                    "convenioId": 5,
                    "profissionalId": 4121,
                    "parceriaId": 20486,
                    "observacoes": "observacoes",
                    "tabela": "convenio",
                    "cpf": "43657772898"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 403 - /api/v1/lista-espera', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET', // Método divergente
                url: '/api/v1/lista-espera',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    pacienteId: 245352,
                    clinicaId: 483,
                    procedimentoId: 20715,
                    especialidadeId: 611,
                    convenioId: 5,
                    profissionalId: 4121,
                    parceriaId: 20486,
                    observacoes: "observacoes",
                    tabela: "convenio",
                    cpf: "43657772898"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403)
            })
        })

        it('Validar retorno 404 - /api/v1/lista-espera', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', //Método divergente 
                url: '/api/v1/lista-espera',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    pacienteId: 245352,
                    clinicaId: 483,
                    procedimentoId: 20715,
                    especialidadeId: 611,
                    convenioId: 5,
                    profissionalId: 4121,
                    parceriaId: 20486,
                    observacoes: "observacoes",
                    tabela: "convenio",
                    cpf: "43657772898"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    describe.only('Módulo - Lista Espera - Lista de Espera', () => {

        it('Validar retorno 200 - /api/v1/lista-espera', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: 'api/v1/lista-espera?especialidadeId=611&withoutProfessional=true&page=1&limit=10&search=43657772898&blockedGrid=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const date = response.body;
                expect(date).to.have.property('items').to.be.an('array')


            })
        })
    })
})


