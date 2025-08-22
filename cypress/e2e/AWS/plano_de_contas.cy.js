/// <reference types= "cypress" /> 

describe('Módulo - Plano de Contas', () => {

    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    });
    
    describe('Plano de Contas - Retorna todos os planos de contas', () => {

        it('Validar retorno 200 - /api/v1/plano-de-contas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/plano-de-contas',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                // Verifica se o status é 200
                expect(response.status).to.eq(200);

                // Valida que a resposta é um array
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);

                // Valida o primeiro item da lista
                const item = response.body[0];

                expect(item).to.have.property('id', 1);
                expect(item).to.have.property('tipo', null);
                expect(item).to.have.property('categoria', null);

                expect(item).to.have.property('subPrimaria').that.deep.equals({
                    codigo: '3101005',
                    nome: 'PRESTAÇÃO DE SERVIÇOS'
                });

                expect(item).to.have.property('tipoOperacao').that.deep.equals({
                    nome: 'Receitas'
                });
            });
        })

        it('Validar retorno 404 - /api/v1/plano-de-contas', () => {
            const token = Cypress.env('access_toke');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/plano-de-contas',
                headers: {
                    'Authorization': `Bearer ${token}`
                }, failOnStatusCode: false
            }).then((response) => {
                // Verifica se o status é 200
                expect(response.status).to.eq(404);


            });
        })

    })

    describe('Plano de Contas - Tipo Procedimento - Retorna os planos de contas para tipos de procedimentos', () => {

        it('Validar retorno 200 - /api/v1/plano-de-contas/tipo-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/plano-de-contas/tipo-procedimento',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                // Verifica se o status é 200
                expect(response.status).to.eq(200);

               // Valida que a resposta é um array
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);

                // Valida o primeiro item da lista
                const item = response.body[0];

                expect(item).to.have.property('id', 1);
                expect(item).to.have.property('tipo', null);
                expect(item).to.have.property('categoria', null);

                expect(item).to.have.property('subPrimaria').that.deep.equals({
                    codigo: '3101005',
                    nome: 'PRESTAÇÃO DE SERVIÇOS'
                });

                expect(item).to.have.property('subSecundaria', null);
                expect(item).to.have.property('classificacao').that.deep.equals({
                    codigo: '3101005001001',
                    nome: 'Prestação de Consultas Médicas'
                });
            });
        })

        it('Validar retorno 404 - /api/v1/plano-de-contas/tipo-procedimento', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/plano-de-contas/tipo-procedimento',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                failOnStatusCode: false
            }).then((response) => {
                // Verifica se o status é 404
                expect(response.status).to.eq(404);
            })
        })
    })

    describe('Plano de Contas - Receitas - Retorna os planos de contas de tipo operação receita', () => {

        it('Validar retorno 200 - /api/v1/plano-de-contas/receitas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/plano-de-contas/receitas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                // Verifica se o status é 200
                expect(response.status).to.eq(200);

                // Valida que a resposta é um array
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);

                // Valida o primeiro item da lista
                const item = response.body[0];

                expect(item).to.have.property('id', 1);
                expect(item).to.have.property('planoDeContas', 'PRESTAÇÃO DE SERVIÇOS - Pres. de Cons. Médi.');
                expect(item).to.have.property('planoDeContasCompleto', 'PRESTAÇÃO DE SERVIÇOS - Prestação de Consultas Médicas');
            });
        })

        it('Validar retorno 404 - /api/v1/plano-de-contas/receitas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/plano-de-contas/tipo-procedimento',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                failOnStatusCode: false
            }).then((response) => {
                // Verifica se o status é 404
                expect(response.status).to.eq(404);
            })
        })
    })

    describe('Plano de Contas - Despesas - Retorna os planos de contas de tipo operação despesa', () => {
        it('Validar retorno 200 - /api/v1/plano-de-contas/despesas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/plano-de-contas/despesas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                // Verifica se o status é 200
                expect(response.status).to.eq(200);

               // Valida que a resposta é um array
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);

                // Valida o primeiro item da lista
                const item = response.body[0];

                expect(item).to.have.property('id', 10);
                expect(item).to.have.property('categoriaDespesa', 'IMPO. INCI. SOBR. VEND. - MUNICIPAIS - ISSQN');
                expect(item).to.have.property('categoriaDespesaCompleto', 'IMPOSTOS INCIDENTES SOBRE VENDAS - MUNICIPAIS - ISSQN');
            })
        })

        it('Validar retorno 404 - /api/v1/plano-de-contas/despesas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/plano-de-contas/despesas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                failOnStatusCode: false
            }).then((response) => {
                // Verifica se o status é 404
                expect(response.status).to.eq(404);
            })
        })
    })
})



