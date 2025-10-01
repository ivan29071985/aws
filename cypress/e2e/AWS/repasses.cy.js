/// <reference types="cypress"/>

/// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> EM CONSTRUÇÃO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
describe('Módulo - Repasses', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Repasses - Retorna lista de repasses', () => {

        it('Validar retorno 200 - /api/v1/repasses/novo-repasse', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/repasses/novo-repasse?page=1&limit=10',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array');
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('dataExecucao');
                    expect(item).to.have.property('dataPagamento');
                    expect(item).to.have.property('valorRepasse');
                    expect(item).to.have.property('pacienteName');
                    expect(item).to.have.property('profissionalName');
                    expect(item).to.have.property('fornecedorName');
                    expect(item).to.have.property('procedimentoName');
                    expect(item).to.have.property('dataConciliacao');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('total_count');
                    expect(item).to.have.property('paciente');
                    expect(item).to.have.property('fornecedor');
                    expect(item).to.have.property('procedimento');
                    expect(item).to.have.property('profissional');
                    expect(item).to.have.property('statusPagamento');
                })

                expect(body).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/repasses/novo-repasse', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/repasses/novo-repasse',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/repasses/novo-repasse', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/repasses/novo-repasse?page=1&limit=10',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    describe.only('Módulo - Repasses - Retorna uma lista de Executante', () => {

        it('Validar retorno 200 - /api/v1/repasses/executante', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/repasses/executante',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.be.an('array');
                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('unidade');
                    expect(item).to.have.property('unidadeId');
                    expect(item).to.have.property('idFornecedor');
                    expect(item).to.have.property('fornecedor');
                    expect(item).to.have.property('nomeFantasia');
                    expect(item).to.have.property('tipoFornecedor');
                    expect(item).to.have.property('flgExecutante');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/repasses/executante', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/repasses/executante',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/repasses/executante', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/repasses/executante',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    describe('Módulo - Repasses - Consolidar', () => {
      
        it('Validar retorno 201 - /api/v1/repasses/novo-consolidar', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/repasses/novo-consolidar',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        })
    })
})