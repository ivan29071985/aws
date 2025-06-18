/// <reference types= "cypress" /> 

describe('Módulo - Profissões', () => {

    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Profissões - Cria uma profissão', () => {

        it('Validar retorno 200 - /api/v1/profissoes', () => { //Eseprando Correção
            const token = Cypress.env('access_token');
            const descricaoUnica = `Profissional ${Date.now()}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/profissoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, failOnStatusCode: false,
                body: {
                    descricao: descricaoUnica
                }
            }).then((response) => {
                expect(response.status).to.eq(200);

                const item = response.body.data;
                expect(item).to.have.property('descricao', descricaoUnica);
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
                    descricao: "descricao" //body undefined ou já existe
                }
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/profissoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissoes',
                headers: {
                    //'Authorization' passando token inválido
                    'Content-Type': 'application/json'
                }, failOnStatusCode: false,
                body: {
                    descricao: "Médico"
                }
            }).then((response) => {
                expect(response.status).to.eq(401);

                const item = response.body;
                expect(item).to.have.property('message', 'Acesso não autorizado.');
                expect(item).to.have.property('error', 'Unauthorized');
                expect(item).to.have.property('statusCode', 401);
            })
        })

        it('Validar retorno 403 - /api/v1/profissoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET', // passando método GET no lugar de POST
                url: '/api/v1/profissoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, failOnStatusCode: false,
                body: {
                    descricao: "descrição"
                }
            }).then((response) => {
                expect(response.status).to.eq(403);
            })
        })

        it('Validar retorno 404 - /api/v1/profissoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', // passando método DELETE no lugar de POST
                url: '/api/v1/profissoes',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }, failOnStatusCode: false,
                body: {
                    descricao: "descrição"
                }
            }).then((response) => {
                expect(response.status).to.eq(404);
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

        it('Valida retorno 404 - /api/v1/profissoes', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/profissoes',
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

        it('Validar retorno 404 - /api/v1/profissoes/search-name', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissoes/search-name',
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

    describe('Profissões - {id} - Retorna dados de função, profissão e conselho por id', () => {

        it('Validar retorno 200 - /api/v1/profissoes/{id}', () => { // Esperando correção

            const token = Cypress.env('access_token');
            const id = 51;

            cy.request({
                method: 'GET',
                url: `/api/v1/profissoes/${id}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const item = response.body;
                expect(item).to.have.property('id', 51);
                expect(item).to.have.property('descricao', 'Técnico em análises clínicas');
                expect(item).to.have.property('profissao', 'Técnico em análises clínicas');
                expect(item).to.have.property('funcao', 'Profissional nível técnico');
                expect(item).to.have.property('conselho', 'CRF');
            })
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

        it('Validar retorno 404 - /api/v1/profissoes/{id}', () => {

            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/profissoes/{id}',
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

    describe('Profissões - Conselho - {name} - Retorna dados de conselho buscando por sigla, ex: CRM', () => {

        it('Validar retorno 200 - /api/v1/profissoes/conselho/{name}', () => { // Esperando correção

            const token = Cypress.env('access_token');
            const name = 'CRM';

            cy.request({
                method: 'GET',
                url: `/api/v1/profissoes/conselho/${name}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const item = response.body;
                expect(item).to.have.property('id', 6);
                expect(item).to.have.property('sigla', 'CRM');
                expect(item).to.have.property('descricao', 'Conselho Regional de Medicina');
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

        it('Validar retorno 404 - /api/v1/profissoes/conselho/{name}', () => {

            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/profissoes/conselho/{name}',
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
})
