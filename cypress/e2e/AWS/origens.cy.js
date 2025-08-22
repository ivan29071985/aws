/// <reference types="cypress" />


describe('Módulo - Origens', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken()
    })

    describe('Módulo - Origens - Criar uma origem', () => {

        it('Validar retorno 201 - /api/v1/origins', () => {
            const token = Cypress.env('access_token');

            // Armazena valor "Teste API" na variável origemGerada
            const origemGerada = "Teste API";
            cy.log('Origem criada:', origemGerada)

            cy.request({
                method: 'POST',
                url: '/api/v1/origins',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: `${origemGerada}`
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)

                const item = response.body;
                expect(item).to.have.property('codigo');
                expect(item).to.have.property('flagDeError');
                expect(item).to.have.property('mensagem');

                // Salva a descrição em um arquivo temporário
                cy.writeFile('cypress/fixtures/origem-criada.json', { descricao: origemGerada });
            })
        })

        it('Validar retorno 400 - /api/v1/origins', () => {
            const token = Cypress.env('access_token');

            // Armazena valor "Teste API" na variável origemGerada
            const origemGerada = "Teste API";
            cy.log('Origem criada:', origemGerada)

            cy.request({
                method: 'POST',
                url: '/api/v1/origins',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { //Sem parâmeto no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/origins', () => {
            const token = Cypress.env('access_token');

            // Armazena valor "Teste API" na variável origemGerada
            const origemGerada = "Teste API";
            cy.log('Origem criada:', origemGerada)

            cy.request({
                method: 'POST',
                url: '/api/v1/origins',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: `${origemGerada}`
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 403 - /api/v1/origins', () => {
            const token = Cypress.env('access_token');

            // Armazena valor "Teste API" na variável origemGerada
            const origemGerada = "Teste API";
            cy.log('Origem criada:', origemGerada)

            cy.request({
                method: 'GET', // Método divergente
                url: '/api/v1/origins',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: `${origemGerada}`
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403)
            })
        })

        it('Validar retorno 404 - /api/v1/origins', () => {
            const token = Cypress.env('access_token');

            // Armazena valor "Teste API" na variável origemGerada
            const origemGerada = "Teste API";
            cy.log('Origem criada:', origemGerada)

            cy.request({
                method: 'DELETE', // Método divergente
                url: '/api/v1/origins',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: `${origemGerada}`
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    describe('Módulo - Origens - Listar Origens', () => {

        it('Validar retorno 200 - /api/v1/origins', () => {
            const token = Cypress.env('access_token');

            cy.readFile('cypress/fixtures/origem-criada.json').then((data) => {
                const descricao = data.descricao.trim().toLowerCase();

                cy.request({
                    method: 'GET',
                    url: '/api/v1/origins?limit=100', // ← aumenta limite se necessário
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(200)

                    // Valida array de items
                    const data = response.body.items[0];
                    expect(data).to.have.property('id');
                    expect(data).to.have.property('descricao');
                    expect(data).to.have.property('flgAtivo');
                    expect(data).to.have.property('createAt');
                    expect(data).to.have.property('updateAt');
                    expect(data).to.have.property('ipClient');
                    expect(data).to.have.property('createdBy');
                    expect(data).to.have.property('lastUser');

                    // Valida objeto meta
                    expect(response.body).to.have.property('meta');
                    expect(response.body.meta).to.have.property('totalItems');
                    expect(response.body.meta).to.have.property('currentPage');
                    expect(response.body.meta).to.have.property('itemCount');
                    expect(response.body.meta).to.have.property('itemsPerPage');
                    expect(response.body.meta).to.have.property('totalPages');

                    // Log para debug
                    cy.log('Buscando por descrição:', descricao);
                    cy.log('Lista completa:', JSON.stringify(response.body.items));

                    // Busca a origem na lista
                    const origemEncontrada = response.body.items.find(item =>
                        item.descricao?.trim().toLowerCase() === descricao);

                    expect(origemEncontrada, 'Origem encontrada').to.not.be.undefined;

                    // Salva o ID no mesmo arquivo
                    cy.writeFile('cypress/fixtures/origem-criada.json', {
                        descricao: origemEncontrada.descricao,
                        id: origemEncontrada.id
                    })
                })
            })
        })

        it('Validar retorno 400 - /api/v1/origins', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // Método divergente
                url: '/api/v1/origins',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/origins', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/origins',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/origins', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', // Método divergente
                url: '/api/v1/origins',
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

    describe('Módulo - Origens - Alterar uma origem', () => {

        it('Validar retorno 200 - /api/v1/origins/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o arquivo salvo no teste anterior
            cy.readFile('cypress/fixtures/origem-criada.json').then((data) => {
                const nomeDescricao = data.descricao
                const id = data.id;
                expect(id, 'ID da origem').to.exist;

                cy.request({
                    method: 'PUT',
                    url: `/api/v1/origins/${id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        descricao: `${nomeDescricao}`,
                        flgAtivo: true
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    const item = response.body;
                    expect(item).to.have.property('codigo');
                    expect(item).to.have.property('flagDeError');
                    expect(item).to.have.property('mensagem');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/origins/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o arquivo salvo no teste anterior
            cy.readFile('cypress/fixtures/origem-criada.json').then((data) => {
                const nomeDescricao = data.descricao
                const id = data.id;
                expect(id, 'ID da origem').to.exist;

                cy.request({
                    method: 'PUT',
                    url: `/api/v1/origins/${id}`,
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
        })

        it('Validar retorno 401 - /api/v1/origins/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o arquivo salvo no teste anterior
            cy.readFile('cypress/fixtures/origem-criada.json').then((data) => {
                const nomeDescricao = data.descricao
                const id = data.id;
                expect(id, 'ID da origem').to.exist;

                cy.request({
                    method: 'PUT',
                    url: `/api/v1/origins/${id}`,
                    headers: {
                        //'Authorization': `Bearer ${token}`, token inválido
                        'Content-Type': 'application/json'
                    },
                    body: {
                        descricao: `${nomeDescricao}`,
                        flgAtivo: true
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(401)
                })
            })
        })

        it('Validar retorno 403 - /api/v1/origins/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o arquivo salvo no teste anterior
            cy.readFile('cypress/fixtures/origem-criada.json').then((data) => {
                const nomeDescricao = data.descricao
                const id = data.id;
                expect(id, 'ID da origem').to.exist;

                cy.request({
                    method: 'GET',
                    url: `/api/v1/origins/${id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        descricao: `${nomeDescricao}`,
                        flgAtivo: true
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(403)
                })
            })
        })

        it('Validar retorno 404 - /api/v1/origins/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o arquivo salvo no teste anterior
            cy.readFile('cypress/fixtures/origem-criada.json').then((data) => {
                const nomeDescricao = data.descricao
                const id = data.id;
                expect(id, 'ID da origem').to.exist;

                cy.request({
                    method: 'POST', // Método divergente
                    url: `/api/v1/origins/${id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        descricao: `${nomeDescricao}`,
                        flgAtivo: true
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(404)
                })
            })
        })
    })

    describe('Módulo - Origens - Apagar uma origem', () => {

        it('Validar retorno 200 - /api/v1/origins/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o arquivo salvo no teste anterior
            cy.readFile('cypress/fixtures/origem-criada.json').then((data) => {
                const id = data.id;
                expect(id, 'ID da origem').to.exist;

                cy.request({
                    method: 'DELETE',
                    url: `/api/v1/origins/${id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(200)

                    const item = response.body;
                    expect(item).to.have.property('codigo');
                    expect(item).to.have.property('flagDeError');
                    expect(item).to.have.property('mensagem');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/origins/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o arquivo salvo no teste anterior
            cy.readFile('cypress/fixtures/origem-criada.json').then((data) => {
                const id = data.id;
                expect(id, 'ID da origem').to.exist;

                cy.request({
                    method: 'DELETE',
                    url: `/api/v1/origins/{id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(400)
                })
            })
        })

        it('Validar retorno 401 - /api/v1/origins/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o arquivo salvo no teste anterior
            cy.readFile('cypress/fixtures/origem-criada.json').then((data) => {
                const id = data.id;
                expect(id, 'ID da origem').to.exist;

                cy.request({
                    method: 'DELETE',
                    url: `/api/v1/origins/${id}`,
                    headers: {
                        //'Authorization': `Bearer ${token}`, Token inválido
                        'Content-Type': 'application/json'
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(401)
                })
            })
        })

        it('Validar retorno 404 - /api/v1/origins/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o arquivo salvo no teste anterior
            cy.readFile('cypress/fixtures/origem-criada.json').then((data) => {
                const id = data.id;
                expect(id, 'ID da origem').to.exist;

                cy.request({
                    method: 'POST',
                    url: `/api/v1/origins/${id}`,
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
})
