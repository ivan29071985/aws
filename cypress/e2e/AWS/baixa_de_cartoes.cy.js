/// <reference types="cypress"/>

/// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>EM CONSTRUÇÃO<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
describe('Módulo - Baixa de Cartões', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe('Módulo - Baixa de Cartões - Retorna lista de lançamentos financeiros com cartão', () => {

        it('Validar retorno 200 - /api/v1/baixa-cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/baixa-cartao?page=1&limit=10&dataInicial=20250102&dataFinal=20251230',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.have.property('items').to.be.an('array')
                body.items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('pagador');
                    expect(item).to.have.property('pagadorId');
                    expect(item).to.have.property('titularCartao');
                    expect(item).to.have.property('transacao');
                    expect(item).to.have.property('autorizacao');
                    expect(item).to.have.property('dataCompra');
                    expect(item).to.have.property('bandeira');
                    expect(item).to.have.property('valorCompra');
                    expect(item).to.have.property('valorCredito');
                    expect(item).to.have.property('valorCreditoMovingPay');
                    expect(item).to.have.property('dataCredito');
                    expect(item).to.have.property('recibo');
                    expect(item).to.have.property('parcela');
                    expect(item).to.have.property('conciliado');
                    expect(item).to.have.property('conciliadoEm');
                    expect(item).to.have.property('cancelado');
                    expect(item).to.have.property('splits');
                    expect(item).to.have.property('dataVencimento');
                    expect(item).to.have.property('diasCreditoConta');
                    expect(item).to.have.property('numeroParcelas');
                    expect(item).to.have.property('quantidadeParcelas');
                    expect(item).to.have.property('valorMovingPay');
                    expect(item).to.have.property('taxaCartao');
                })
                expect(body).to.have.property('meta').to.include.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/baixa-cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/baixa-cartao', // sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/baixa-cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/baixa-cartao?page=1&limit=10&dataInicial=20250102&dataFinal=20251230',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/baixa-cartao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/baixa-cartao?page=1&limit=10&dataInicial=20250102&dataFinal=20251230',
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

    describe('Módulo - Baixa de Cartões - Retorna lista de splits de um lançamento financeiro', () => {
        
        it('Validar retorno 200 - /api/v1/baixa-cartao/{id}/splits', () => {
             const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/baixa-cartao/0/splits',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
            })
        })

        it('Validar retorno 400 - /api/v1/baixa-cartao/{id}/splits', () => {
             const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/baixa-cartao/{id}/splits', // sem parâmetro
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/baixa-cartao/{id}/splits', () => {
             const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/baixa-cartao/0/splits',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/baixa-cartao/{id}/splits', () => {
             const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/baixa-cartao/0/splits',
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

    describe('Módulo - Baixa de Cartões - Concializa/faz a baixa dos pagamentos selecionados ou unico', () => {
        
    });
})