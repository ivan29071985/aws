/// <reference types= "cypress" /> 

describe('Módulo - Cadeado', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })
//
    describe ('Módulo - Cadeado - Retorna lista de cadeados das unidades', () => {

        it('Validar retorno 200 - /api/v1/padlock', () => {

            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/padlock?page=1&limit=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.include.keys({
                    items: [
                        {
                            caixaId: null,
                            data: null,
                            entradas: null,
                            saidas: null,
                            saldo: null,
                            saldoInicial: null,
                            status: null,
                            unidade: null,
                            unidadeId: null,
                            cadeadoId: null,
                            parametros: null
                        }
                    ],
                    meta: {
                        totalItems: null,
                        currentPage: null,
                        itemCount: null,
                        itemsPerPage: null,
                        totalPages: null
                    }
                })
            })
        })

        it('Validar retorno 400 - /api/v1/padlock', () => {

            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/padlock', // Sem parâmetro na url
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/padlock', () => {

            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/padlock?page=1&limit=1',
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/padlock', () => {

            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // Método divergente
                url: '/api/v1/padlock?page=1&limit=1',
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

    describe('Módulo - Cadeado - Fecha um ou uma lista de cadeados de unidades para tal data', () => {

        it('Validar retorno 201 - /api/v1/padlock/close', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/padlock/close',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    padlocks: [
                        {
                            unityId: 483,
                            date: "20230314"
                        },
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/padlock/close', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/padlock/close',
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

        it('Validar retorno 401 - /api/v1/padlock/close', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/padlock/close',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    padlocks: [
                        {
                            unityId: 483,
                            date: "20230314"
                        },
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 403 - /api/v1/padlock/close', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/padlock/close',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    padlocks: [
                        {
                            unityId: 483,
                            date: "20230314"
                        },
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403);
            })
        })

        it('Validar retorno 404 - /api/v1/padlock/close', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/padlock/close',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    padlocks: [
                        {
                            unityId: 483,
                            date: "20230314"
                        },
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404);
            })
        })
    })

    describe('Módulo - Cadeado - Retorna um cadeado', () => {

        it('Validade retorno 200 - /api/v1/padlock/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: `/api/v1/padlock/${1}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Retorno completo do body:', JSON.stringify(response.body));

                expect(response.body).to.eq('');
            })
        })

        it('Validade retorno 400 - /api/v1/padlock/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/padlock/{id}', // Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validade retorno 401 - /api/v1/padlock/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: `/api/v1/padlock/${1}`,
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validade retorno 404 - /api/v1/padlock/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // Método divergente
                url: `/api/v1/padlock/${1}`,
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

    describe('Módulo - Cadeado - Retorna lista de modulos de um cadeado', () => {

        it('Validar retorno 200 - /api/v1/padlock/{cadeadoId}/modules', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: `/api/v1/padlock/${1}/modules`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Retorno completo do body:', JSON.stringify(response.body));
                const body = response.body
                expect(body).that.deep.equal([]);
            })
        })

        it('Validar retorno 400 - /api/v1/padlock/{cadeadoId}/modules', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/padlock/{cadeadoId}/modules', // Sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/padlock/{cadeadoId}/modules', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: `/api/v1/padlock/${1}/modules`,
                headers: {
                    //'Authorization': `Bearer ${token}`, //Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/padlock/{cadeadoId}/modules', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: `/api/v1/padlock/${1}/modules`,
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

    describe('Módulo - Cadeado - Reabrir modulos de um cadeado. (Enviar o id de cada modulo e reabrir)', () => {

        it('Validar retorno 201 - /api/v1/padlock/modules/reopen', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/padlock/modules/reopen',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "padlockModuleIdsToOpen": [
                        16,
                        2
                    ],
                    "padlockModuleIdsToClose": [
                        16,
                        2
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)

                const items = response.body
                expect(items).to.have.property('flagDeError', false);
                expect(items).to.have.property('codigo', 201);
                expect(items).to.have.property('mensagem', 'Modulos do cadeado abertos com sucesso.');

                items.data.forEach((item) => {
                    expect(item).to.have.property('id', 2);
                    expect(item).to.have.property('cadeadoId', 42);
                    expect(item).to.have.property('flagReaberto', 'F');
                    expect(item).to.have.property('modulo', 'AGENDAMENTO');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/padlock/modules/reopen', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/padlock/modules/reopen',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/padlock/modules/reopen', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/padlock/modules/reopen',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "padlockModuleIdsToOpen": [
                        16,
                        2
                    ],
                    "padlockModuleIdsToClose": [
                        16,
                        2
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 403 - /api/v1/padlock/modules/reopen', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/padlock/modules/reopen',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "padlockModuleIdsToOpen": [
                        16,
                        2
                    ],
                    "padlockModuleIdsToClose": [
                        16,
                        2
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403)
            })
        })

        it('Validar retorno 404 - /api/v1/padlock/modules/reopen', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/padlock/modules/reopen',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "padlockModuleIdsToOpen": [
                        16,
                        2
                    ],
                    "padlockModuleIdsToClose": [
                        16,
                        2
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })
})



// TESTE
