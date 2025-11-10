/// <reference types= "cypress" /> 

describe('Módulo - Profissões', () => {

    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Profissões - Cria uma profissão', () => {

        it('Validar retorno 201 - /api/v1/profissoes', () => {
            const token = Cypress.env('access_token');

            // Array de IDs
            const numeroProfissao = Array.from({ length: 110 }, (_, i) => i + 1);

            // Seleciona um ID aleatório do array
            const idAleatorio = numeroProfissao[
                Math.floor(Math.random() * numeroProfissao.length)
            ];

            const nomeDoTeste = `teste${idAleatorio}`;

            console.log(`Rodando ${nomeDoTeste} com ID ${idAleatorio}`);

            cy.request({
                method: 'POST',
                url: '/api/v1/profissoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: nomeDoTeste
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);

                expect(response.body).to.have.property('descricao');
                expect(response.body).to.have.property('profissao');
                expect(response.body).to.have.property('funcao');
                expect(response.body).to.have.property('conselho');
                expect(response.body).to.have.property('id');
            })
        })

        it('Validar retorno 400 - /api/v1/profissoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, failOnStatusCode: false,
                body: {
                    //sem parametro no body 
                }
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissoes', () => {
            const token = Cypress.env('access_token');

            // Array de IDs
            const numeroProfissao = Array.from({ length: 110 }, (_, i) => i + 1);

            // Seleciona um ID aleatório do array
            const idAleatorio = numeroProfissao[
                Math.floor(Math.random() * numeroProfissao.length)
            ];

            const nomeDoTeste = `teste${idAleatorio}`;

            console.log(`Rodando ${nomeDoTeste} com ID ${idAleatorio}`);

            cy.request({
                method: 'POST',
                url: '/api/v1/profissoes',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: nomeDoTeste
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Profissões - Retorna uma lista de profissões', () => {

        it('Valida retorno 200 - /api/v1/profissoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const item = response.body;

                item.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('profissao');
                    expect(item).to.have.property('funcao');
                    expect(item).to.have.property('conselho');
                })
            })
        })

        it('Valida retorno 400 - /api/v1/profissoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Valida retorno 401 - /api/v1/profissoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissoes',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Profissões - Search-Name - Retorna dados de função, profissão e conselho por nome', () => {

        it('Validar retorno 200 - /api/v1/profissoes/search-name', () => {

            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissoes/search-name',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.deep.equal([null, []])
            })
        })

        it('Validar retorno 401 - /api/v1/profissoes/search-name', () => {

            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissoes/search-name',
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

    describe('Profissões - {id} - Retorna dados de função, profissão e conselho por id', () => {

        it('Validar retorno 200 - GET /api/v1/profissoes/57', () => {
            const token = Cypress.env('access_token');


            cy.request({
                method: 'GET',
                url: '/api/v1/profissoes/{id}?id=57',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                failOnStatusCode: false
            }).then((response) => {
                // Debug para ver o que está retornando
                cy.log(`Status: ${response.status}`);
                cy.log(`Body: ${JSON.stringify(response.body)}`);

                // Validar status code 200 (sucesso)
                expect(response.status).to.eq(200);

                const item = response.body;

                // Validar estrutura do objeto retornado baseado na resposta da API
                expect(item).to.have.property('id', 57);
                expect(item).to.have.property('descricao', 'Biólogo');
                expect(item).to.have.property('profissao', 'Biólogo');
                expect(item).to.have.property('funcao', 'Profissional nível superior');
                expect(item).to.have.property('conselho', 'CRBIO');

                cy.log(`Profissão encontrada: ${item.descricao}`);
            });
        })

        it('Validar retorno 400 - /api/v1/profissoes/{id}', () => {

            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissoes/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - GET /api/v1/profissoes/57', () => {
            const token = Cypress.env('access_token');


            cy.request({
                method: 'GET',
                url: '/api/v1/profissoes/{id}?id=57',
                headers: {
                    //'Authorization': `Bearer ${token}` token inválido
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe('Profissões - Conselho - {name} - Retorna dados de conselho buscando por sigla, ex: CRM', () => {

        it('Validar retorno 200 - /api/v1/profissoes/conselho/{name}', () => { // Esperando correção

            const token = Cypress.env('access_token');
            const name = 'CRBM';

            cy.request({
                method: 'GET',
                url: '/api/v1/profissoes/conselho/{name}?nome=CRBM',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const item = response.body;
                expect(item).to.have.property('sigla', 'CRBM');
            })
        })

        it('Validar retorno 400 - /api/v1/profissoes/conselho/{name}', () => {

            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/profissoes/conselho/{name}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissoes/conselho/{name}', () => { // Esperando correção

            const token = Cypress.env('access_token');
            const name = 'CRBM';

            cy.request({
                method: 'GET',
                url: '/api/v1/profissoes/conselho/{name}?nome=CRBM',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })
})
