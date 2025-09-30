/// <reference types="cypress" />

describe('Módulo - Report', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken()
    })

    describe('Módulo - Report - Lista views disponíveis para criação de relatórios', () => {

        it('Validar retorno 200 - /api/v1/report/multidimensional/views', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/views',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const item = response.body;
                item.forEach((data) => {
                    expect(data).to.have.property('id');
                    expect(data).to.have.property('descricao');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/report/multidimensional/views', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/views',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/report/multidimensional/views', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/report/multidimensional/views',
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

    describe('Módulo - Report - Apaga um relatório e sua definições', () => {

        it('Validar retorno 200 - /api/v1/report/multidimensional/{id}', () => {
            const token = Cypress.env('access_token');
            const idRelatorio = 901;

            cy.request({
                method: 'DELETE',
                url: `/api/v1/report/multidimensional/${idRelatorio}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
                expect(response.body).to.have.property('id');
            })
        })

        it('Validar retorno 401 - /api/v1/report/multidimensional/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/report/multidimensional/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/report/multidimensional/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/report/multidimensional/{id}',
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

    describe('Módulo - Report - Obtém parametros de um relatório', () => {

        it('Validar retorno 200 - /api/v1/report/multidimensional/{id}', () => {
            const token = Cypress.env('access_token');
            const idRelatorio = 381;

            cy.request({
                method: 'GET',
                url: `/api/v1/report/multidimensional/${idRelatorio}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('nome');
                expect(response.body).to.have.property('unidadeId');
                expect(response.body).to.have.property('unidade');

                expect(response.body).to.have.property('grupos').to.be.an('array');
                response.body.grupos.forEach((item) => {
                    expect(item).to.have.property('grupoId');
                    expect(item).to.have.property('grupo');
                })

                expect(response.body).to.have.property('viewId');
                expect(response.body).to.have.property('view');
                expect(response.body).to.have.property('flagAtivo');

                const items = response.body;
                expect(items).to.have.property('campos').to.be.an('array');
                items.campos.forEach((item) => {
                    expect(item).to.have.property('nome');
                    expect(item).to.have.property('apelido');
                    expect(item).to.have.property('tipoId');
                    expect(item).to.have.property('tipoDescricao');
                    expect(item).to.have.property('tipoFormato');
                })

                expect(response.body).to.have.property('tipoId');
                expect(response.body).to.have.property('tipo');
            })
        })

        it('Validar retorno 401 - /api/v1/report/multidimensional/{id}', () => {
            const token = Cypress.env('access_token');
            const idRelatorio = 922;

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/report/multidimensional/{id}', () => {
            const token = Cypress.env('access_token');
            const idRelatorio = 381;

            cy.request({
                method: 'POST',
                url: `/api/v1/report/multidimensional/${idRelatorio}`,
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

    describe('Módulo - Report - Cria novo relatório multidimensional', () => {

        it('Validar retorno 201 - /api/v1/report/multidimensional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/report/multidimensional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    unidadeId: 483,
                    nome: "teste",
                    grupos: [1],
                    tipoId: 1,
                    viewId: 6,
                    flagAtivo: true,
                    campos: [
                        {
                            "nome": "CELULAR",
                            "apelido": "/lkhk",
                            "tipoId": 1
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                const idReport = response.body.tipoId;

                // Valida que as propriedades existem
                expect(response.body).to.have.property('unidadeId');
                expect(response.body).to.have.property('nome');
                expect(response.body).to.have.property('grupos').to.be.an('array');

                // Valida que os itens em grupos são números
                response.body.grupos.forEach((item) => {
                    expect(item).to.be.a('number');
                })

                // Valida que as propriedades existem
                expect(response.body).to.have.property('viewId');
                expect(response.body).to.have.property('flagAtivo');
                expect(response.body).to.have.property('campos').to.be.an('array');

                /* Valida que os itens em campos é uma string
                response.body.campos.forEach((item) => {
                    expect(item).to.be.a('string');
                })*/

                expect(response.body).to.have.property('tipoId');

                //Salva o ID para uso posterior
                Cypress.env('idReport', idReport)
                cy.log('ID salvo:', idReport);
            })
        })

        it('Validar retorno 400 - /api/v1/report/multidimensional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/report/multidimensional',
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

        it('Validar retorno 401 - /api/v1/report/multidimensional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/report/multidimensional',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "nome": "Relatório Teste QA",
                    "unidadeId": 183,
                    "grupos": [1, 4, 6],
                    "viewId": 6,
                    "flagAtivo": true,
                    "campos": ["string"],
                    "tipoId": 1
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 403 - /api/v1/report/multidimensional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "nome": "Relatório Teste QA",
                    "unidadeId": 183,
                    "grupos": [1, 4, 6],
                    "viewId": 6,
                    "flagAtivo": true,
                    "campos": ["string"],
                    "tipoId": 1
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403);
            })
        })
    })

    describe('Módulo - Report - Atualiza relatório multidimensional existente', () => {

        it('Validar retorno 200 - /api/v1/report/multidimensional', () => {
            const token = Cypress.env('access_token');
            const idReport = Cypress.env('idReport')

            cy.request({
                method: 'PUT',
                url: '/api/v1/report/multidimensional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    id: idReport,
                    unidadeId: 483,
                    nome: "teste",
                    grupos: [1],
                    tipoId: 1,
                    viewId: 6,
                    flagAtivo: true,
                    campos: [
                        {
                            nome: "CELULAR",
                            apelido: "/lkhk",
                            tipoId: 1
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const items = response.body;
                expect(items).to.have.property('id');
                expect(items).to.have.property('nome');
                expect(items).to.have.property('unidadeId');
                expect(items).to.have.property('grupos').to.be.an('array');

                expect(items).to.have.property('tipoId');
                expect(items).to.have.property('viewId');
                expect(items).to.have.property('flagAtivo');
                expect(items).to.have.property('campos').to.be.an('array');
            })
        })

        it('Validar retorno 400 - /api/v1/report/multidimensional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/report/multidimensional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { //Sem parâmetro no body
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/report/multidimensional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/report/multidimensional',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "id": 1,
                    "nome": "Relatório administrativo",
                    "unidadeId": 183,
                    "grupos": [1, 2, 3],
                    "tipoId": 1,
                    "viewId": 1,
                    "flagAtivo": true,
                    "campos": [1, 2, 3]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 403 - /api/v1/report/multidimensional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "id": 1,
                    "nome": "Relatório administrativo",
                    "unidadeId": 183,
                    "grupos": [1, 2, 3],
                    "tipoId": 1,
                    "viewId": 1,
                    "flagAtivo": true,
                    "campos": [1, 2, 3]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403);
            })
        })
    })

    describe('Módulo - Report - Filtra relatórios', () => {

        it('Validar retorno 200 - /api/v1/report/multidimensional/filter', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/filter?unitId=183&groupId=3&typeId=1&name=Financeiro&active=true&page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const data = response.body;
                expect(data).to.have.property('items').to.be.an('array')
                expect(data).to.have.property('meta').to.have.all.keys(
                    'itemCount',
                    'totalItems',
                    'itemsPerPage',
                    'currentPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/report/multidimensional/filter', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/filter?unitId=183&groupId=3&typeId=1&name=Financeiro&active=true&page=1&limit=1',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/report/multidimensional/filter', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // método divergente
                url: '/api/v1/report/multidimensional/filter/lklk', // ParÂmetro incorreto na url
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

    describe('Módulo - Report - Obtém perfis disponíveis', () => {

        it('Validar retorno 200 - /api/v1/report/multidimensional/profiles', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/profiles',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const data = response.body;
                data.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/report/multidimensional/profiles', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/profiles',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/report/multidimensional/profiles', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/report/multidimensional/profiles',
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

    describe('Módulo - Report - Lista tipos de relatórios', () => {

        it('Validar retorno 200 - /api/v1/report/multidimensional/types', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/types',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const data = response.body;
                data.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/report/multidimensional/types', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/types',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/report/multidimensional/types', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // Método divergente
                url: '/api/v1/report/multidimensional/types',
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

    describe('Módulo - Report - Lista tipos de campos', () => {

        it('Validar retorno 200 - /api/v1/report/multidimensional/fields/types', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/fields/types',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const data = response.body;
                data.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('formato');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/report/multidimensional/fields/types', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/fields/types',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/report/multidimensional/fields/types', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // Método divergente
                url: '/api/v1/report/multidimensional/fields/types',
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

    describe('Módulo - Report - Lista colunas de uma view cadastrada', () => {

        it('Validar retorno 200 - /api/v1/report/multidimensional/views/{id}/fields', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/views/{id}/fields',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 401 - /api/v1/report/multidimensional/views/{id}/fields', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/views/{id}/fields',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/report/multidimensional/views/{id}/fields', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/report/multidimensional/views/{id}/fields',
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

    describe('Módulo - Report - Obtém definições e dados de um relatório', () => {

        it('Validar retorno 200 - /api/v1/report/multidimensional/data/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/data/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/report/multidimensional/data/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/data/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/report/multidimensional/data/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/report/multidimensional/data/{id}',
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

    describe('Módulo - Report - Salva definições de um relatório', () => {

        it('Validar retorno 201 - /api/v1/report/multidimensional/settings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/report/multidimensional/settings',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)

                const data = response.body;
                expect(data).to.have.property('flagDeError');
                expect(data).to.have.property('mensagem');
                expect(data.mensagem).to.have.property('query');

                expect(data.mensagem).to.have.property('parameters').that.is.a('array');
                expect(data.mensagem).to.have.property('driverError');
                expect(data.mensagem.driverError).to.have.property('errorNum');
                expect(data.mensagem.driverError).to.have.property('offset');
            })
        })

        it('Validar retorno 401 - /api/v1/report/multidimensional/settings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/report/multidimensional/settings',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 403 - /api/v1/report/multidimensional/settings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/settings',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403)
            })
        })
    })

    describe('Módulo - Report - Atualiza definições de um relatório', () => {

        it('Validar retorno 200 - /api/v1/report/multidimensional/settings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/report/multidimensional/settings',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/report/multidimensional/settings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/report/multidimensional/settings',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 403 - /api/v1/report/multidimensional/settings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/settings',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403)
            })
        })
    })

    describe('Módulo - Report - Atualiza definições de usuários de um relatório', () => {

        it('Validar retorno 200 - /api/v1/report/multidimensional/user-settings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/report/multidimensional/user-settings',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/report/multidimensional/user-settings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PUT',
                url: '/api/v1/report/multidimensional/user-settings',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 403 - /api/v1/report/multidimensional/user-settings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/user-settings',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403);
            })
        })
    })

    describe('Módulo - Report - Salva definições de usuários em um relatório', () => {

        it('Validar retorno 201 - /api/v1/report/multidimensional/user-settings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/report/multidimensional/user-settings',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/report/multidimensional/user-settings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/report/multidimensional/user-settings',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 403 - /api/v1/report/multidimensional/user-settings', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/report/multidimensional/user-settings',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {},
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403);
            })
        })
    })

    describe('Módulo - Report - license/wijmo', () => {

        it('Validar retorno 200 - api/v1/report/license/wijmo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: 'api/v1/report/license/wijmo',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('vaultValue')
            })
        })

        it('Validar retorno 401 - api/v1/report/license/wijmo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: 'api/v1/report/license/wijmo',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - api/v1/report/license/wijmo', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // Método divergente
                url: 'api/v1/report/license/wijmo',
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
})