/// <reference types="cypress" />

describe('Módulo - Usuários', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken()
    })

    describe('Módulo - Usuários - Trás as informações do usuário logado', () => {

        it('Validar retorno 200 - /api/v1/user/current-user-info', () => { // Em Construção
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
                    'grPermission',
                    'role',
                    'permissions',
                    'userinfo',
                    'userProfilePermission'
                )


            })
        })
    })
})