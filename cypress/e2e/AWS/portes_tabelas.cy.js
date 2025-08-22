/// <reference types="cypress"/>

describe('Módulo - Portes Tabelas', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Portes Tabelas - Cria uma tabela', () => {

        it('Validar retorno 201 - /api/v1/portes-tabelas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/portes-tabelas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: "Médio",
                    codigo: "100",
                    uco: "NA",
                    portesTabelaConvenio: [
                        {
                            porte: "porte",
                            valor: "valor"
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)

                expect(response.body).to.have.property('erro');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/portes-tabelas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/portes-tabelas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },// Sem parâmetro no body
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)
            })
        })

        it('Validar retorno 401 - /api/v1/portes-tabelas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/portes-tabelas',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: "Médio",
                    codigo: "100",
                    uco: "NA",
                    portesTabelaConvenio: [
                        {
                            porte: "porte",
                            valor: "valor"
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 403 - /api/v1/portes-tabelas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/portes-tabelas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: "Médio",
                    codigo: "100",
                    uco: "NA",
                    portesTabelaConvenio: [
                        {
                            porte: "porte",
                            valor: "valor"
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403);
            })
        })

        it('Validar retorno 404 - /api/v1/portes-tabelas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/portes-tabelas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: "Médio",
                    codigo: "100",
                    uco: "NA",
                    portesTabelaConvenio: [
                        {
                            porte: "porte",
                            valor: "valor"
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404);
            })
        })
    })

    describe('Módulo - Portes Tabelas - Retorna uma tabela buscando por id', () => {

        it('Validar retorno 200 - /api/v1/portes-tabelas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/portes-tabelas/1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                expect(response.body).to.have.property('erro');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 401 - /api/v1/portes-tabelas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/portes-tabelas/1',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/portes-tabelas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/portes-tabelas/1',
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

    describe('Módulo - Portes Tabelas - Atualiza uma tabela por id', () => {

        it('Validar retono 201 - /api/v1/portes-tabelas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/portes-tabelas/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: "Médio",
                    codigo: "100",
                    uco: "NA",
                    portesTabelaConvenio: [
                        {
                            porte: "porte",
                            valor: "valor"
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                expect(response.body).to.have.property('erro');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retono 401 - /api/v1/portes-tabelas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/portes-tabelas/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: "Médio",
                    codigo: "100",
                    uco: "NA",
                    portesTabelaConvenio: [
                        {
                            porte: "porte",
                            valor: "valor"
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retono 404 - /api/v1/portes-tabelas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/portes-tabelas/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    descricao: "Médio",
                    codigo: "100",
                    uco: "NA",
                    portesTabelaConvenio: [
                        {
                            porte: "porte",
                            valor: "valor"
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    describe('Módulo - Portes Tabelas - Exclui uma tabela por id', () => {

        it('Validar retorno 200 - /api/v1/portes-tabelas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/portes-tabelas/0',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                expect(response.body).to.have.property('erro');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
            
        })

        it('Validar retorno 401 - /api/v1/portes-tabelas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/portes-tabelas/0',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/portes-tabelas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/portes-tabelas/0',
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
})