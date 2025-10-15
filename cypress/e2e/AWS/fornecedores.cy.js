/// <reference types="cypress"/>

/// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>EM CONSTRUÇÃO<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
describe('Módulo - Fornecedores', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Fornecedores - Retorna os executantes (fornecedores e profissionais relacionados)', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/executantes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/executantes?parceiroId=42&procedimentoId=20715&unidadeId=483',
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
                    expect(item).to.have.property('nomeFantasia');

                    expect(item).to.have.property('fornecedorUnidades').to.be.an('array');
                    item.fornecedorUnidades.forEach((unidade) => {
                        expect(unidade).to.have.property('flgPagamentoParcial')
                    })

                    expect(item).to.have.property('fornecedorProcedimentos').to.be.an('array');
                    item.fornecedorProcedimentos.forEach((procedimento) => {
                        expect(procedimento).to.have.property('procedimentoId');
                        expect(procedimento).to.have.property('fornecedorUnidadeId');
                        expect(procedimento).to.have.property('valorCusto');
                        expect(procedimento).to.have.property('valorVenda');
                    })
                })
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/executantes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/executantes', // Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/executantes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/executantes?parceiroId=42&procedimentoId=20715&unidadeId=483',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/fornecedores/executantes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/executantes?parceiroId=42&procedimentoId=20715&unidadeId=483',
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

    describe('Módulo - Fornecedores - Retorna os executantes (fornecedores e profissionais relacionados)', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/procedures-executants', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/procedures-executants?partnerId=42&proceduresIds=20715&proceduresIds=20715&unitId=483',
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
                    expect(item).to.have.property('nome');

                    expect(item).to.have.property('fornecedor').to.be.an('array');
                    item.fornecedor.forEach((fornecedor) => {
                        expect(fornecedor).to.have.property('id');
                        expect(fornecedor).to.have.property('nomeFantasia');

                        // Valida fornecedorUnidades dentro do fornecedor
                        expect(fornecedor).to.have.property('fornecedorUnidades').to.be.an('array');
                        fornecedor.fornecedorUnidades.forEach((unidades) => {
                            expect(unidades).to.have.property('flgPagamentoParcial')
                        })

                        expect(fornecedor).to.have.property('fornecedorProcedimentos').to.be.an('array');
                        fornecedor.fornecedorProcedimentos.forEach((procedimento) => {
                            expect(procedimento).to.have.property('fornecedorUnidadeId');
                            expect(procedimento).to.have.property('procedimentoId');
                            expect(procedimento).to.have.property('valorCusto');
                            expect(procedimento).to.have.property('valorVenda');
                        })
                    })
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

        it('Validar retorno 400 - /api/v1/fornecedores/procedures-executants', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/procedures-executants', // Sem parâmetros
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/procedures-executants', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/procedures-executants?partnerId=42&proceduresIds=20715&proceduresIds=20715&unitId=483',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/fornecedores/procedures-executants', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/procedures-executants?partnerId=42&proceduresIds=20715&proceduresIds=20715&unitId=483',
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

    describe('Módulo - Fornecedores - Retorna uma lista de tipos de fornecedor', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/tipos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/tipos',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                expect(response.body).to.be.an('array')
                response.body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('tipoPrestador');
                })

                cy.log(JSON.stringify(response.body));
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/tipos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/tipos',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/fornecedores/tipos', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/tipos',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404);
            })
        })
    })

    describe('Módulo - Fornecedores - Retorna uma agente e senha do vinculo do laboratoio', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/agente-entidade', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/agente-entidade?regiaoId=22&unidadeId=483&fornecedorId=292',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                expect(response.body).to.be.an('array');
                response.body.forEach((item) => {
                    expect(item).to.have.property('idAgente');
                    expect(item).to.have.property('password');
                    expect(item).to.have.property('statusIntegracao');
                    expect(item).to.have.property('prazoLogistica');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/agente-entidade', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', // Método divergente
                url: '/api/v1/fornecedores/agente-entidade',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/agente-entidade', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/agente-entidade',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/fornecedores/agente-entidade', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/agente-entidade',
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
    /*
        describe.only('Módulo - Fornecedores - Vincular um fornecedor a uma cidade', () => {
    
            it('Validar retorno 201 - /api/v1/fornecedores/vincular-unidade-fornecedor', () => {
                const token = Cypress.env('access_token');
    
                cy.request({
                    method: 'POST',
                    url: '/api/v1/fornecedores/vincular-unidade-fornecedor',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        unidadeId: 1,
                        fornecedorId: 2,
                        agenteId: "login@teste",
                        endpoint: "https://desenv.diagnosticosdobrasil.com.br/mxnetd/wsrvProtocoloDBSync.dbsync.svc?singleWsdl",
                        entidade: "teste",
                        password: "12345",
                        statusIntegracao: 1,
                        id: 1,
                        flgPagamentoParcial: true,
                        providerId: 1,
                        unitiesId: [
                            483
                        ],
                        prazoLogistica: 2
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(201)
                })
            })
        })
    
        describe('Módulo - Fornecedores - update agente e senha', () => {
        })*/

    describe.only('Módulo - Fornecedores - Atualizar unidades vinculadas a um fornecedor', () => {

        it('Validar retorno 201 - /api/v1/fornecedores/atualizar-unidades-fornecedor', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/atualizar-unidades-fornecedor',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "providerId": 402,
                    "unitsToAdd": [
                        {
                            "unidadeId": 503,
                            "fornecedorId": 402,
                            "flgPagamentoParcial": 0
                        }
                    ],
                    "unitsToRemove": []
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)
            })
        });
    })
})

