/// <reference types="cypress" />

describe('Módulo - Usuários', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken()
    })

    describe.skip('Módulo - Usuários - Trás as informações do usuário logado', () => {

        it('Validar retorno 200 - /api/v1/user/current-user-info', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/user/current-user-info',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                // Campos Principais
                expect(response.body).to.have.all.keys(
                    'tokenMemed',
                    'professionalId',
                    'tokenInfo',
                    'userinfo',
                    'userProfilePermission'
                )
            })
        })

        it('Validar retorno 401 - /api/v1/user/current-user-info', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/user/current-user-info',
                headers: {
                    //'Authorization': `Bearer ${token}`, //Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/user/current-user-info', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', // método divergente
                url: '/api/v1/user/current-user-info/lllll', //url divergente
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

    describe('Módulo - Usuários - Cria um usuário com os dados mínimos', () => {

        it.only('Validar retorno 201 - /api/v1/user/create-first', () => {
            const token = Cypress.env('access_token');

            // Gera os valores dinâmicos e os armazena em variáveis
            const email = `usuarioTesteAPI${Date.now()}@email.com`;
            const password = `@Password${Math.floor(Math.random() * 10000)}`;

            cy.request({
                method: 'POST',
                url: '/api/v1/user/create-first',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    email: `usuarioTesteAPI${Date.now()}@email.com`,
                    password: `@Password${Math.floor(Math.random() * 10000)}`,
                    firstName: "Teste",
                    lastName: "API",
                    fullName: "Teste API"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)

                const item = response.body;
                expect(item).to.have.property('email');
                expect(item).to.have.property('firstName');
                expect(item).to.have.property('lastName');
                expect(item).to.have.property('fullName');
                expect(item).to.have.property('cpf');
                expect(item).to.have.property('isAdmin');
                expect(item).to.have.property('tratamento');
                expect(item).to.have.property('sexo');
                expect(item).to.have.property('dataNascimento');
                expect(item).to.have.property('celular');
                expect(item).to.have.property('funcao');
                expect(item).to.have.property('profissao');
                expect(item).to.have.property('crm');
                expect(item).to.have.property('uf');
                expect(item).to.have.property('cidade');
                expect(item).to.have.property('role');
                expect(item).to.have.property('isActive');
                expect(item).to.have.property('loginTimes');
                expect(item).to.have.property('passwordIsInvalidCount');
                expect(item).to.have.property('createdAt');
                expect(item).to.have.property('updatedAt');
                expect(item).to.have.property('id');
                const userId = item.id;
                cy.log('Usuário criado com Id:', userId);

                // Guarda os valores email e password
                cy.writeFile('cypress/fixtures/userData.json', {
                    email,
                    password,
                })
            })
        })

        it('Validar retorno 400 - /api/v1/user/create-first', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/user/create-first',
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

        it('Validar retorno 403 - /api/v1/user/create-first', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/user/create-first',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    email: `usuarioTesteAPI${Date.now()}@email.com`,
                    password: `@Password${Math.floor(Math.random() * 10000)}`,
                    firstName: "Teste",
                    lastName: "API",
                    fullName: "Teste API"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403)
            })
        })

        it('Validar retorno 404 - /api/v1/user/create-first', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/user/create-first',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    email: `usuarioTesteAPI${Date.now()}@email.com`,
                    password: `@Password${Math.floor(Math.random() * 10000)}`,
                    firstName: "Teste",
                    lastName: "API",
                    fullName: "Teste API"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    describe.skip('Módulo - Usuários - Cria um usuário com os dados mínimos e sem senha', () => {

        it('Validar retorno 201 - /api/v1/user/create-first-without-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/user/create-first-without-password',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    email: `usuarioTesteAPI${Date.now()}@email.com`,
                    firstName: "Teste",
                    lastName: "API",
                    fullName: "Teste API"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)

                const item = response.body;
                expect(item).to.have.property('email');
                expect(item).to.have.property('firstName');
                expect(item).to.have.property('lastName');
                expect(item).to.have.property('fullName');
                expect(item).to.have.property('cpf');
                expect(item).to.have.property('isAdmin');
                expect(item).to.have.property('tratamento');
                expect(item).to.have.property('sexo');
                expect(item).to.have.property('dataNascimento');
                expect(item).to.have.property('celular');
                expect(item).to.have.property('funcao');
                expect(item).to.have.property('profissao');
                expect(item).to.have.property('crm');
                expect(item).to.have.property('uf');
                expect(item).to.have.property('cidade');
                expect(item).to.have.property('role');
                expect(item).to.have.property('isActive');
                expect(item).to.have.property('loginTimes');
                expect(item).to.have.property('passwordIsInvalidCount');
                expect(item).to.have.property('createdAt');
                expect(item).to.have.property('updatedAt');
                expect(item).to.have.property('id');
                const userId = item.id;
                cy.log('Usuário criado com Id:', userId);
            })
        })

        it('Validar retorno 400 - /api/v1/user/create-first-without-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/user/create-first-without-password',
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

        it('Validar retorno 403 - /api/v1/user/create-first-without-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/user/create-first-without-password',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    email: `usuarioTesteAPI${Date.now()}@email.com`,
                    firstName: "Teste",
                    lastName: "API",
                    fullName: "Teste API"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403)
            })
        })

        it('Validar retorno 404 - /api/v1/user/create-first-without-password', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/user/create-first-without-password',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    email: `usuarioTesteAPI${Date.now()}@email.com`,
                    firstName: "Teste",
                    lastName: "API",
                    fullName: "Teste API"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    describe('Módulo - Usuários - Alterar a senha do usuário', () => {

        it.only('Validar retorno 200 - /api/v1/user', () => { //Em construção...............=>
            cy.readFile('cypress/fixtures/userData.json').then((user) => {
                const { email, password } = user;

                // Primeiro, autentica com o usuário criado para obter o token
                cy.request({
                    method: 'POST',
                    url: '/api/v1/security/login',
                    body: {
                        email: 'ivan.santos+1@amorsaude.com',
                        password: 'Iv@n198529'
                    },
                    failOnStatusCode: false // normalmente esse cod refere-se a uma api pra nao dar erro de false
                }).then((loginResponse) => {
                    expect(loginResponse.status).to.eq(200)

                    const token = loginResponse.body.token;

                    // Agora faz o PATCH com o token do próprio usuário
                    cy.request({
                        method: 'PATCH',
                        url: '/api/v1/user',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: {
                            email: user.email,
                            actualPassword: user.password,
                            newPassword: `@Pasword${Math.floor(Math.random() * 10000)}`
                        },
                        failOnStatusCode: false
                    }).then((response) => {
                        expect(response.status).to.eq(200)
                    })
                })
            })
        })
    })
})
