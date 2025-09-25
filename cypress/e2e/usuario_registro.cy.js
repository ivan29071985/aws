/// <reference types="cypress"/>

describe('Módulo - Usuario Registro', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Usuario Registro - Após um usuário logado no sistema, permite criar um novo usuário completo', () => {

        it('Validar retorno 201 - /api/v1/user/create-complete', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/user/create-complete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    id: 0,
                    email: "usuario@email.com",
                    password: "@Password",
                    firstName: "João",
                    lastName: "da Silva",
                    fullName: "João da Silva",
                    cpf: "12312312300",
                    isAdmin: false,
                    tratamento: "tratamento x",
                    sexo: "masculino",
                    data_nascimento: "19801219",
                    celular: "+5511911112222",
                    funcao: "Profissional de saúde - nível superior",
                    profissao: "Médico",
                    crm: "1123456",
                    uf: "SP",
                    cidade: "São Paulo",
                    role: "user",
                    isActive: true,
                    createAd: "20220531",
                    updateAd: "20220531"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)
            })
        })
    })
})