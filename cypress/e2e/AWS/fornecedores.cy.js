/// <reference types="cypress"/>

/// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>EM CONSTRUÇÃO<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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

    /* POST /// >>>>>>>>>>>>>>>>>>>>>>>>>>EM CONSTRUÇãO<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
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
    })

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

    describe('Módulo - Fornecedores - Desvincular um fornecedor a uma unidade', () => {
    });*/

    // GET
    describe('Módulo - Fornecedores - Retorna uma lista de unidades vinculadas ao fornecedor', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/unidades-vinculadas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/unidades-vinculadas/454',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                body.forEach((items) => {
                    expect(items).to.have.property('id');
                    expect(items).to.have.property('unidadeId');
                    expect(items).to.have.property('fornecedorId');
                    expect(items).to.have.property('tipoFornecedor');
                    expect(items).to.have.property('unidade');
                    expect(items).to.have.property('regiaoId');
                    expect(items).to.have.property('regiao');
                    expect(items).to.have.property('statusIntegracao');
                    expect(items).to.have.property('flgPagamentoParcial');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/unidades-vinculadas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/unidades-vinculadas/{id}', // Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/unidades-vinculadas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/unidades-vinculadas/454',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/fornecedores/unidades-vinculadas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/unidades-vinculadas/454',
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

    // POST /// >>>>>>>>>>>>>>>>>>>>>>>>>>EM CONSTRUÇãO<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    describe('Módulo - Fornecedores - Cria um fornecedor', () => {
    })

    //GET
    describe('Módulo - Fornecedores - Retorna uma lista de fornecedores', () => {

        it('Validar retorno 200 - /api/v1/fornecedores', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array');
                body.items.forEach((item) => {
                    expect(item).to.have.property('razaoSocial');
                    expect(item).to.have.property('nomeFantasia');
                    expect(item).to.have.property('cnpj');
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('inscricaoEstadual');
                    expect(item).to.have.property('inscricaoMunicipal');
                    expect(item).to.have.property('cep');
                    expect(item).to.have.property('endereco');
                    expect(item).to.have.property('numero');
                    expect(item).to.have.property('complemento');
                    expect(item).to.have.property('bairro');
                    expect(item).to.have.property('municipioId');
                    expect(item).to.have.property('municipio');
                    expect(item).to.have.property('uf');
                    expect(item).to.have.property('email');
                    expect(item).to.have.property('emailAlternativo');
                    expect(item).to.have.property('telefone');
                    expect(item).to.have.property('celular');
                    expect(item).to.have.property('flagRecebeParcial');
                    expect(item).to.have.property('observacao');
                    expect(item).to.have.property('ativo');
                    expect(item).to.have.property('tipoPrestadorId');
                    expect(item).to.have.property('tipoPrestador');
                    expect(item).to.have.property('criadoEm');
                    expect(item).to.have.property('integracaoId');
                })

                expect(body).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages',
                    'currentPage'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // Método divergente
                url: '/api/v1/fornecedores',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/fornecedores', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', // Método divergente
                url: '/api/v1/fornecedores',
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

    //GET
    describe('Módulo - Fornecedores - Retorna uma lista de fornecedores sem pagina ate com referencia a procedimentos', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/laboratorio', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/laboratorio',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                body.forEach((item) => {
                    expect(item).to.have.property('razaoSocial');
                    expect(item).to.have.property('nomeFantasia');
                    expect(item).to.have.property('cnpj');
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('inscricaoEstadual');
                    expect(item).to.have.property('inscricaoMunicipal');
                    expect(item).to.have.property('cep');
                    expect(item).to.have.property('endereco');
                    expect(item).to.have.property('numero');
                    expect(item).to.have.property('complemento');
                    expect(item).to.have.property('bairro');
                    expect(item).to.have.property('municipioId');
                    expect(item).to.have.property('municipio');
                    expect(item).to.have.property('uf');
                    expect(item).to.have.property('email');
                    expect(item).to.have.property('emailAlternativo');
                    expect(item).to.have.property('telefone');
                    expect(item).to.have.property('celular');
                    expect(item).to.have.property('flagRecebeParcial');
                    expect(item).to.have.property('observacao');
                    expect(item).to.have.property('ativo');
                    expect(item).to.have.property('tipoPrestadorId');
                    expect(item).to.have.property('tipoPrestador');
                    expect(item).to.have.property('criadoEm');
                    expect(item).to.have.property('integracaoId');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/laboratorio', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', //Método divergente
                url: '/api/v1/fornecedores/laboratorio',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/laboratorio', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/laboratorio',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/fornecedores/laboratorio', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', //Método divergente
                url: '/api/v1/fornecedores/laboratorio',
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

    //GET /// >>>>>>>>>>>>>>>>>>>>>>>>>>EM CONSTRUÇãO<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    describe('Módulo - Fornecedores - Retorna uma lista de fornecedores e pelo id dos procedimentos', () => {

        //"message": "Cannot read properties of undefined (reading 'fornecedorId')""statusCode": 400
        it('Validar retorno 200 - /api/v1/fornecedores/list-dados-laboratorio-exame', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list-dados-laboratorio-exame?fornecedorId=292',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/list-dados-laboratorio-exame', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list-dados-laboratorio-exame', // Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/list-dados-laboratorio-exame', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list-dados-laboratorio-exame',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/fornecedores/list-dados-laboratorio-exame', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/list-dados-laboratorio-exame',
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

    //GET
    describe('Módulo - Fornecedores - Retorna uma lista de fornecedores por id do procedimento', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/by-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/by-procedimento?procedimentoId=20715&pricingId=3',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                cy.log('Response Body da API', JSON.stringify(response.body))
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/by-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/by-procedimento',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/fornecedores/by-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/by-procedimento?procedimentoId=20715&pricingId=3',
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

    //GET
    describe('Módulo - Fornecedores - Retorna um fornecedor com base no CNPJ buscado', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/search/{cnpj}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/search/30661945000115',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                const item = response.body;
                expect(item).to.have.property('razaoSocial');
                expect(item).to.have.property('nomeFantasia');
                expect(item).to.have.property('cnpj');
                expect(item).to.have.property('id');
                expect(item).to.have.property('inscricaoEstadual');
                expect(item).to.have.property('inscricaoMunicipal');
                expect(item).to.have.property('cep');
                expect(item).to.have.property('endereco');
                expect(item).to.have.property('numero');
                expect(item).to.have.property('complemento');
                expect(item).to.have.property('bairro');
                expect(item).to.have.property('municipioId');
                expect(item).to.have.property('municipio');
                expect(item).to.have.property('uf');
                expect(item).to.have.property('email');
                expect(item).to.have.property('emailAlternativo');
                expect(item).to.have.property('telefone');
                expect(item).to.have.property('celular');
                expect(item).to.have.property('flagRecebeParcial');
                expect(item).to.have.property('observacao');
                expect(item).to.have.property('ativo');
                expect(item).to.have.property('tipoPrestadorId');
                expect(item).to.have.property('tipoPrestador');
                expect(item).to.have.property('criadoEm');
                expect(item).to.have.property('integracaoId');
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/search/{cnpj}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/search/{cnpj}',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/fornecedores/search/{cnpj}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/search/{cnpj}',
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

    //PUT
    describe('Módulo - Fornecedores - Atuaiza um fornecedor', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/fornecedores/296',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "ativo": 1,
                    "cnpj": "04517780309",
                    "inscricaoEstadual": "",
                    "inscricaoMunicipal": "",
                    "nomeFantasia": "Ágata Stanisci",
                    "razaoSocial": "Ágata Stanisci",
                    "tipoPrestadorId": 1,
                    "integracaoId": null,
                    "observacao": "",
                    "bairro": "Boa Vista",
                    "complemento": "",
                    "numero": 1111,
                    "endereco": "Avenida João de Barros",
                    "municipio": "Recife",
                    "uf": "PE",
                    "cep": "50050-902",
                    "email": "agathastanisci@gmail.com",
                    "emailAlternativo": "",
                    "celular": "",
                    "telefone": "(81) 98286-4202",
                    "municipioId": 0
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const item = response.body;
                expect(item).to.have.property('razaoSocial');
                expect(item).to.have.property('nomeFantasia');
                expect(item).to.have.property('cnpj');
                expect(item).to.have.property('id');
                expect(item).to.have.property('inscricaoEstadual');
                expect(item).to.have.property('inscricaoMunicipal');
                expect(item).to.have.property('cep');
                expect(item).to.have.property('endereco');
                expect(item).to.have.property('numero');
                expect(item).to.have.property('complemento');
                expect(item).to.have.property('bairro');
                expect(item).to.have.property('municipioId');
                expect(item).to.have.property('municipio');
                expect(item).to.have.property('uf');
                expect(item).to.have.property('email');
                expect(item).to.have.property('emailAlternativo');
                expect(item).to.have.property('telefone');
                expect(item).to.have.property('celular');
                expect(item).to.have.property('flagRecebeParcial');
                expect(item).to.have.property('observacao');
                expect(item).to.have.property('ativo');
                expect(item).to.have.property('tipoPrestadorId');
                expect(item).to.have.property('tipoPrestador');
                expect(item).to.have.property('criadoEm');
                expect(item).to.have.property('integracaoId');
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/fornecedores/296',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/fornecedores/296',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "ativo": 1,
                    "cnpj": "04517780309",
                    "inscricaoEstadual": "",
                    "inscricaoMunicipal": "",
                    "nomeFantasia": "Ágata Stanisci",
                    "razaoSocial": "Ágata Stanisci",
                    "tipoPrestadorId": 1,
                    "integracaoId": null,
                    "observacao": "",
                    "bairro": "Boa Vista",
                    "complemento": "",
                    "numero": 1111,
                    "endereco": "Avenida João de Barros",
                    "municipio": "Recife",
                    "uf": "PE",
                    "cep": "50050-902",
                    "email": "agathastanisci@gmail.com",
                    "emailAlternativo": "",
                    "celular": "",
                    "telefone": "(81) 98286-4202",
                    "municipioId": 0
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 403 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET', // Método divergente
                url: '/api/v1/fornecedores/296',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "ativo": 1,
                    "cnpj": "04517780309",
                    "inscricaoEstadual": "",
                    "inscricaoMunicipal": "",
                    "nomeFantasia": "Ágata Stanisci",
                    "razaoSocial": "Ágata Stanisci",
                    "tipoPrestadorId": 1,
                    "integracaoId": null,
                    "observacao": "",
                    "bairro": "Boa Vista",
                    "complemento": "",
                    "numero": 1111,
                    "endereco": "Avenida João de Barros",
                    "municipio": "Recife",
                    "uf": "PE",
                    "cep": "50050-902",
                    "email": "agathastanisci@gmail.com",
                    "emailAlternativo": "",
                    "celular": "",
                    "telefone": "(81) 98286-4202",
                    "municipioId": 0
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403);
            })
        })

        it('Validar retorno 404 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // Método divergente
                url: '/api/v1/fornecedores/296',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "ativo": 1,
                    "cnpj": "04517780309",
                    "inscricaoEstadual": "",
                    "inscricaoMunicipal": "",
                    "nomeFantasia": "Ágata Stanisci",
                    "razaoSocial": "Ágata Stanisci",
                    "tipoPrestadorId": 1,
                    "integracaoId": null,
                    "observacao": "",
                    "bairro": "Boa Vista",
                    "complemento": "",
                    "numero": 1111,
                    "endereco": "Avenida João de Barros",
                    "municipio": "Recife",
                    "uf": "PE",
                    "cep": "50050-902",
                    "email": "agathastanisci@gmail.com",
                    "emailAlternativo": "",
                    "celular": "",
                    "telefone": "(81) 98286-4202",
                    "municipioId": 0
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404);
            })
        })
    })

    //DELETE /// >>>>>>>>>>>>>>>>>>>>>>>>>>EM CONSTRUÇãO<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    describe('Módulo - Fornecedores - Exclui um fornecedor', () => {
    })

    //GET
    describe('Módulo - Fornecedores - Retorna um fornecedor por id', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/296',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const item = response.body;
                expect(item).to.have.property('razaoSocial');
                expect(item).to.have.property('nomeFantasia');
                expect(item).to.have.property('cnpj');
                expect(item).to.have.property('id');
                expect(item).to.have.property('inscricaoEstadual');
                expect(item).to.have.property('inscricaoMunicipal');
                expect(item).to.have.property('cep');
                expect(item).to.have.property('endereco');
                expect(item).to.have.property('numero');
                expect(item).to.have.property('complemento');
                expect(item).to.have.property('bairro');
                expect(item).to.have.property('municipioId');
                expect(item).to.have.property('municipio');
                expect(item).to.have.property('uf');
                expect(item).to.have.property('email');
                expect(item).to.have.property('emailAlternativo');
                expect(item).to.have.property('telefone');
                expect(item).to.have.property('celular');
                expect(item).to.have.property('flagRecebeParcial');
                expect(item).to.have.property('observacao');
                expect(item).to.have.property('ativo');
                expect(item).to.have.property('tipoPrestadorId');
                expect(item).to.have.property('tipoPrestador');
                expect(item).to.have.property('criadoEm');
                expect(item).to.have.property('integracaoId');
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/296',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/fornecedores/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/296',
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

    //GET
    describe('Módulo - Fornecedores - Retorna uma lista de fornecedores e procedimentos com preços vinculados', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/list/fornecedor-price/procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list/fornecedor-price/procedimento?page=1&perPage=10&idFornecedor=296&nameProcedimento=Consulta%20Cl%C3%ADnica%20M%C3%A9dica',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('meta').to.include.all.keys(
                    'page',
                    'perPage',
                    'total'
                )
                expect(response.body).to.have.property('data').to.be.an('array')
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/list/fornecedor-price/procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list/fornecedor-price/procedimento', //sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/list/fornecedor-price/procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list/fornecedor-price/procedimento?page=1&perPage=10&idFornecedor=296&nameProcedimento=Consulta%20Cl%C3%ADnica%20M%C3%A9dica',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/fornecedores/list/fornecedor-price/procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/list/fornecedor-price/procedimento?page=1&perPage=10&idFornecedor=296&nameProcedimento=Consulta%20Cl%C3%ADnica%20M%C3%A9dica',
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

    //GET
    describe('Módulo - Fornecedores - Retorna uma lista de fornecedores e pelo id dos procedimentos', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/list/fornecedor-by-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list/fornecedor-by-procedimento?page=1&limit=10&procedimentoId=20356&procedimentoId=20357&fornecedorId=296',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array')
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('valorCusto');
                    expect(item).to.have.property('valorVenda');
                    expect(item).to.have.property('fornecedor');
                    expect(item.fornecedor).to.have.property('id');
                    expect(item.fornecedor).to.have.property('nomeFantasia');
                    expect(item).to.have.property('procedimento');
                    expect(item.procedimento).to.have.property('id');
                    expect(item.procedimento).to.have.property('nome');
                    expect(item.procedimento).to.have.property('sinonimos');
                })
                expect(response.body).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/fornecedores/list/fornecedor-by-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list/fornecedor-by-procedimento', // sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/list/fornecedor-by-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/list/fornecedor-by-procedimento?page=1&limit=10&procedimentoId=20356&procedimentoId=20357&fornecedorId=296',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/fornecedores/list/fornecedor-by-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/list/fornecedor-by-procedimento?page=1&limit=10&procedimentoId=20356&procedimentoId=20357&fornecedorId=296',
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

    //POST
    describe('Módulo - Fornecedores - Cria um fornecedor e procedimento com preço', () => {
    })

    //PUT
    describe('Módulo - Fornecedores - Atualiza um fornecedor e procedimento com preço', () => {
    })

    //GET
    describe.only('Módulo - Fornecedores - Retorna os fornecedores que tem seller id', () => {

        it('Validar retorno 200 - /api/v1/fornecedores/split', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/split',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                const body = response.body;

                expect(body).to.be.an('array')
                body.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('fkMunicipio');
                    expect(item).to.have.property('razaoSocial');
                    expect(item).to.have.property('nomeFantasia');
                    expect(item).to.have.property('cnpj');
                    expect(item).to.have.property('inscricaoEstadual');
                    expect(item).to.have.property('cep');
                    expect(item).to.have.property('endereco');
                    expect(item).to.have.property('numero');
                    expect(item).to.have.property('complemento');
                    expect(item).to.have.property('bairro');
                    expect(item).to.have.property('email');
                    expect(item).to.have.property('telefone');
                    expect(item).to.have.property('inscricaoMunicipal');
                    expect(item).to.have.property('celular');
                    expect(item).to.have.property('ipClient');
                    expect(item).to.have.property('createdAt');
                    expect(item).to.have.property('updatedAt');
                    expect(item).to.have.property('flagAtivo');
                    expect(item).to.have.property('flagStatus');
                    expect(item).to.have.property('codigoInterno');
                    expect(item).to.have.property('emailAlternativo');
                    expect(item).to.have.property('sellerId');
                    expect(item).to.have.property('flgSplit');
                    expect(item).to.have.property('integracaoId');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/fornecedores/split', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/fornecedores/split',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/fornecedores/split', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/fornecedores/split',
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

    //GET    /// PAREI AQUI <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    describe('Módulo - Fornecedores - Retorna os dados de split de um fornecedor', () => {
    })

    //PUT
    describe('Módulo - Fornecedores - Atualiza os dados de split de um fornecedor', () => {
    })

    //DELETE
    describe('Módulo - Fornecedores - Delete o procedimento do fornecedor por id', () => {
    })

    //GET
    describe('Módulo - Fornecedores - Retorna os procedimentos do fornecedor cadastrado', () => {
    })

    //POST
    describe('Módulo - Fornecedores - Cadastra os procedimentos do fornecedor', () => {
    })

    //GET
    describe('Módulo - Fornecedores - Retorna os procedimentos do fornecedor, com paginação, buscando por parceiro E/OU nome E/OU grupo E/OU Tipo de procedimentos', () => {
    })

    //PUT
    describe('Módulo - Fornecedores - Atualiza os dados do procedimento do fornecedor', () => {
    })

    //DELETE
    describe('Módulo - Fornecedores - Inativa o procedimento do fornecedor', () => {
    })

    //PUT
    describe('Módulo - Fornecedores - Atualiza o vinculo da unidade com o fornecedor', () => {
    })
})

