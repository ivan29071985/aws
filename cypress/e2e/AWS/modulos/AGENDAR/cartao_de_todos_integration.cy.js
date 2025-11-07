/// <reference types="cypress" />

describe('Módulo - Cartão de Todo Integration', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Cartão de Todo Integration - Lista as unidades que foram migradas', () => {

        it('Validar retorno 200 - /api/v1/cartao-de-todos/unidades-migradas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/cartao-de-todos/unidades-migradas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Validar retorno 401 - /api/v1/cartao-de-todos/unidades-migradas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/cartao-de-todos/unidades-migradas',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Cartão de Todo Integration - Retorna a unidade migrada caso seja encontrada', () => {

        it('Validar retorno 200 - /api/v1/cartao-de-todos/unidades-migradas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/cartao-de-todos/unidades-migradas/',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                //Estrutura principal do JSON
                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array')

                //Validação dos campos em cada item
                body.items.forEach((item) => {
                    expect(item).to.have.property('id').to.be.a('number');
                    expect(item).to.have.property('descricao').to.be.a('string');
                    expect(item).to.have.property('endereco').to.be.a('string');
                    expect(item).to.have.property('razaoSocial').to.be.a('string');
                    expect(item).to.have.property('cnpj').to.be.a('string');
                    expect(item).to.have.property('telefonePrincipal').to.be.a('string');
                    expect(item).to.have.property('telefoneSecundario');
                    expect(item).to.have.property('emailPrincipal').to.be.a('string');
                    expect(item).to.have.property('emailSecundario');
                    expect(item).to.have.property('cep').to.be.a('string');
                    expect(item).to.have.property('numero').to.be.a('string');
                    expect(item).to.have.property('complemento');
                    expect(item).to.have.property('bairro').to.be.a('string');
                    expect(item).to.have.property('latitude');
                    expect(item).to.have.property('longitude');
                    expect(item).to.have.property('cidade').to.be.a('string');
                    expect(item).to.have.property('estado').to.be.a('string');
                    expect(item).to.have.property('regiao').to.be.a('string');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/cartao-de-todos/unidades-migradas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/cartao-de-todos/unidades-migradas',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })
})