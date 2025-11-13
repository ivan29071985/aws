/// <reference types="cypress"/>

///>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>EM CONSTRUÇÃO<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


describe('Módulo - Tabela Padrão', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    // Rota descotinuada, no front dentro do Amei não existe o botão cadastrar
    /*
    describe('Módulo - Tabela Padrão - Cria uma tabela padrão', () => {

        it('Validar retorno 200 - /api/v1/tabela-padrao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    dataInicio: "20250101",
                    dataFim: "20250130",
                    nomeTabelaPreco: "Tabela Padrão QA",
                    valorConsultaInicio: "40.99",
                    ipClient: "null",
                    createBy: "null"
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-padrao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    // sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })
    })
        */

    describe('Módulo - Tabela Padrão - Retorna tabela padrão', () => {

        it('Validar retorno 200 - /api/v1/tabela-padrao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                expect(body).to.have.property('tabelaPadrao').to.include.all.keys(
                    'id',
                    'dataInicio',
                    'dataFim',
                    'nomeTabelaPreco',
                    'valorConsultaInicio',
                    'flgAtivo',
                    'restauradaEm'
                )
                expect(body).to.have.property('unidades').to.be.an('array');
                body.unidades.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('unidade');
                    expect(item).to.have.property('unidadeId');
                    expect(item).to.have.property('tabelaPadraoId');
                    expect(item).to.have.property('tabelaPadrao');
                    expect(item).to.have.property('flgVinculado');
                    expect(item).to.have.property('regiao');
                    expect(item).to.have.property('regiaoId');
                })
                expect(body).to.have.property('excecoes').to.be.an('array');
                expect(body).to.have.property('procedimentos').to.be.an('array');
                body.procedimentos.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('idTabelaPadrao');
                    expect(item).to.have.property('nomeTabela');
                    expect(item).to.have.property('dataInicio');
                    expect(item).to.have.property('dataFim');
                    expect(item).to.have.property('procedimentoId');
                    expect(item).to.have.property('procedimento');
                    expect(item).to.have.property('tipoProcedimentoId');
                    expect(item).to.have.property('tipoProcedimento');
                    expect(item).to.have.property('particularVenda');
                    expect(item).to.have.property('particularCusto');
                    expect(item).to.have.property('parceiroVenda');
                    expect(item).to.have.property('parceiroCusto');
                    expect(item).to.have.property('cdtAVenda');
                    expect(item).to.have.property('cdtAAVenda');
                    expect(item).to.have.property('cdtAAAVenda');
                    expect(item).to.have.property('cdtBVenda');
                    expect(item).to.have.property('cdtCVenda');
                    expect(item).to.have.property('cdtVenda');
                    expect(item).to.have.property('cdtCusto');
                    expect(item).to.have.property('precoPrimeiraConsulta');
                })
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-padrao', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/tabela-padrao',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    // Precisa de dados reais do Amei
    describe.only('Módulo - Tabela Padrão - Vincula uma unidade a uma tabela preço', () => {

        it('Validar retorno 201 - /api/v1/tabela-padrao/link-price-clinic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/link-price-clinic',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tablePriceId": 0,
                    "clinicId": 0
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })

        it('Validar retorno 400 - /api/v1/tabela-padrao/link-price-clinic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/link-price-clinic',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/tabela-padrao/link-price-clinic', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/link-price-clinic',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tablePriceId": 0,
                    "clinicId": 0
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })
    })

    describe.only('Módulo - Tabela Padrão - Cria uma tabela padrão preço', () => {

        it('Validar retorno 201 - /api/v1/tabela-padrao/tb-padrao-preco', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/tabela-padrao/tb-padrao-preco',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tabelaPadraoId": 1,
                    "procedimentoId": 1,
                    "parceiroVenda": "119.99",
                    "parceiroCusto": "79.99",
                    "particularVenda": "129.99",
                    "particularCusto": "99.99",
                    "ipClient": "192.168.1.111",
                    "lastUserId": 1,
                    "unidadeLogadaId": 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201);
            })
        })
    })

    describe('Módulo - Tabela Padrão - ', () => {

    })

    describe('Módulo - Tabela Padrão - ', () => {

    })

    describe('Módulo - Tabela Padrão - ', () => {

    })

    describe('Módulo - Tabela Padrão - ', () => {

    })

    describe('Módulo - Tabela Padrão - ', () => {

    })

    describe('Módulo - Tabela Padrão - ', () => {

    })

    describe('Módulo - Tabela Padrão - ', () => {

    })

    describe('Módulo - Tabela Padrão - ', () => {

    })

    describe('Módulo - Tabela Padrão - ', () => {

    })

    describe('Módulo - Tabela Padrão - ', () => {

    })

    describe('Módulo - Tabela Padrão - ', () => {

    })

    describe('Módulo - Tabela Padrão - ', () => {

    })
})

/*
it('Validar retorno 200 - ', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })


// Precisa de dados reais do Amei


*/