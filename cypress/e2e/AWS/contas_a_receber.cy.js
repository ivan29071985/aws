/// <reference types="cypress"/>

/// >>>>>>>>>>>>>>>>>>>>>>>>>EM CONSTRUÇÃO<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

describe('Módulo - Contas a Receber', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken();
    })

    describe('Módulo - Contas a Receber - Retorna lista de recebimentos', () => {

        it('Validar retorno 200 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber?page=1&limit=10',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.all.keys('items', 'meta')

                expect(response.body.items).to.be.an('array')
                expect(response.body.items[0]).to.include.all.keys(
                    'id',
                    'notaFiscal',
                    'createdAt',
                    'valorTotal',
                    'valorTotalClinica',
                    'parcelas',
                    'tipoPagador',
                    'tipoReceita',
                    'status',
                    'itens',
                    'fornecedor',
                    'paciente',
                    'profissional',
                    'origemIdAgendamento'
                )

                expect(response.body.items[0].parcelas[0]).to.include.all.keys(
                    'id',
                    'dataVencimento',
                    'createdAt',
                    'liquidacoes'
                )

                expect(response.body.items[0].parcelas[0].liquidacoes[0]).to.include.all.keys(
                    'id',
                    'dataRecebimento'
                )

                expect(response.body.items[0].tipoPagador).to.include.all.keys(
                    'id',
                    'liquidante'
                )

                expect(response.body.items[0].tipoReceita).to.include.all.keys(
                    'id',
                    'tipoRecebimento'
                )

                expect(response.body.items[0].status).to.include.all.keys(
                    'id',
                    'status'
                )

                expect(response.body.items[0].itens[0]).to.include.all.keys(
                    'id',
                    'descricao',
                    'executado',
                    'executante',
                    'classificacaoFinanceira'
                )

                expect(response.body.items[0].itens[0].executante).to.include.all.keys(
                    'id',
                    'nomeFantasia'
                )

                expect(response.body.items[0].itens[0].classificacaoFinanceira).to.include.all.keys(
                    'id',
                    'classificacaoFinanceira'
                )

                expect(response.body.items[0].fornecedor).to.include.all.keys(
                    'nomeFantasia'
                )

                expect(response.body.items[0].paciente).to.include.all.keys(
                    'nome',
                    'sobrenome'
                )

                expect(response.body.items[0].origemIdAgendamento).to.include.all.keys(
                    'flgConsultaAssistida'
                )

                expect(response.body.meta).to.include.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber?page=1&limit=10',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/contas-receber?page=1&limit=10',
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

    describe('Módulo - Contas a Receber - Cadastro de uma conta a receber', () => {

        it('Validar retorno 201 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tipoPagadorId": 1,
                    "tipoRecebimentoId": 1,
                    "fornecedorId": null,
                    "pacienteId": 1,
                    "profissionalId": null,
                    "notaFiscal": "21345",
                    "quantidadeParcelas": 4,
                    "recorrencia": 3,
                    "tipoIntervalo": "M",
                    "observacao": "Lorem ipsum...",
                    "origemId": 1,
                    "origem": "Manual",
                    "itens": [
                        {
                            "id": 1,
                            "classificacaoFinanceiraId": 1,
                            "descricao": "Item 1",
                            "quantidade": 3,
                            "valorUnitario": 10,
                            "executanteId": 348,
                            "executado": "0"
                        }
                    ],
                    "parcelas": [
                        {
                            "dataVencimento": "20251020",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 1,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251120",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 2,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251220",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 3,
                            "valor": 10
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)
                const idRecebimento = response.body.id

                const body = response.body;
                expect(body).to.have.property('id');
                expect(body).to.have.property('tipoPagadorId');
                expect(body).to.have.property('statusId');
                expect(body).to.have.property('tipoReceitaId');
                expect(body).to.have.property('fkPaciente');
                expect(body).to.have.property('fkTipoLiquidante');
                expect(body).to.have.property('origem');
                expect(body).to.have.property('origemId');
                expect(body).to.have.property('notaFiscal');
                expect(body).to.have.property('quantidadeParcelas');
                expect(body).to.have.property('recorrencia');
                expect(body).to.have.property('tipoIntervalo');
                expect(body).to.have.property('observacao');
                expect(body).to.have.property('flagAtivo');
                expect(body).to.have.property('ipClient');
                expect(body).to.have.property('createdAt');
                expect(body).to.have.property('updatedAt');
                expect(body).to.have.property('createdBy');
                expect(body).to.have.property('lastUser');
                expect(body).to.have.property('valorTotal');
                expect(body).to.have.property('valorTotalClinica');
                expect(body).to.have.property('fkUnidade');
                expect(body).to.have.property('fkRecebimentoStatus');
                expect(body).to.have.property('fkFornecedor');
                expect(body).to.have.property('fkProfissional');
                expect(body).to.have.property('itens');
                expect(body).to.have.property('parcelas');

                // 🔐 Salva o ID para uso posterior
                Cypress.env('idRecebimento', idRecebimento);
                cy.log('ID salvo:', idRecebimento);
            })
        })

        it('Validar retorno 400 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber',
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

        it('Validar retorno 401 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/contas-receber',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "tipoPagadorId": 1,
                    "tipoRecebimentoId": 1,
                    "fornecedorId": null,
                    "pacienteId": 1,
                    "profissionalId": null,
                    "notaFiscal": "21345",
                    "quantidadeParcelas": 4,
                    "recorrencia": 3,
                    "tipoIntervalo": "M",
                    "observacao": "Lorem ipsum...",
                    "origemId": 1,
                    "origem": "Manual",
                    "itens": [
                        {
                            "id": 1,
                            "classificacaoFinanceiraId": 1,
                            "descricao": "Item 1",
                            "quantidade": 3,
                            "valorUnitario": 10,
                            "executanteId": 348,
                            "executado": "0"
                        }
                    ],
                    "parcelas": [
                        {
                            "dataVencimento": "20251020",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 1,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251120",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 2,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251220",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 3,
                            "valor": 10
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 403 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET', // Método divergente
                url: '/api/v1/contas-receber',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tipoPagadorId": 1,
                    "tipoRecebimentoId": 1,
                    "fornecedorId": null,
                    "pacienteId": 1,
                    "profissionalId": null,
                    "notaFiscal": "21345",
                    "quantidadeParcelas": 4,
                    "recorrencia": 3,
                    "tipoIntervalo": "M",
                    "observacao": "Lorem ipsum...",
                    "origemId": 1,
                    "origem": "Manual",
                    "itens": [
                        {
                            "id": 1,
                            "classificacaoFinanceiraId": 1,
                            "descricao": "Item 1",
                            "quantidade": 3,
                            "valorUnitario": 10,
                            "executanteId": 348,
                            "executado": "0"
                        }
                    ],
                    "parcelas": [
                        {
                            "dataVencimento": "20251020",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 1,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251120",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 2,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251220",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 3,
                            "valor": 10
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403)
            })
        })

        it('Validar retorno 404 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', // Método divergente
                url: '/api/v1/contas-receber',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tipoPagadorId": 1,
                    "tipoRecebimentoId": 1,
                    "fornecedorId": null,
                    "pacienteId": 1,
                    "profissionalId": null,
                    "notaFiscal": "21345",
                    "quantidadeParcelas": 4,
                    "recorrencia": 3,
                    "tipoIntervalo": "M",
                    "observacao": "Lorem ipsum...",
                    "origemId": 1,
                    "origem": "Manual",
                    "itens": [
                        {
                            "id": 1,
                            "classificacaoFinanceiraId": 1,
                            "descricao": "Item 1",
                            "quantidade": 3,
                            "valorUnitario": 10,
                            "executanteId": 348,
                            "executado": "0"
                        }
                    ],
                    "parcelas": [
                        {
                            "dataVencimento": "20251020",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 1,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251120",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 2,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251220",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 3,
                            "valor": 10
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })

    })

    describe('Módulo - Contas a Receber - Retorna um recebimento pelo id', () => {

        it('Validar retorno 200 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('idRecebimento') // Reutiliza o ID

            cy.request({
                method: 'GET',
                url: `/api/v1/contas-receber/${idRecebimento}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                const body = response.body

                // Verifica os campos principais do objeto
                expect(body).to.include.all.keys(
                    'id',
                    'origem',
                    'origemId',
                    'notaFiscal',
                    'quantidadeParcelas',
                    'recorrencia',
                    'tipoIntervalo',
                    'observacao',
                    'createdAt',
                    'valorTotalClinica',
                    'itens',
                    'parcelas',
                    'tipoPagador',
                    'voucher',
                    'status',
                    'tipoReceita',
                    'fornecedor',
                    'paciente',
                    'profissional'
                )

                // Verifica estrutura de itens
                expect(body.itens).to.be.an('array')
                if (body.itens.length > 0) {
                    expect(body.itens[0]).to.include.all.keys(
                        'id',
                        'descricao',
                        'quantidade',
                        'valorUnitario',
                        'valorTotal',
                        'valorTotalClinica',
                        'executado',
                        'classificacaoFinanceira',
                        'executante'
                    )

                    expect(body.itens[0].classificacaoFinanceira).to.include.all.keys(
                        'id',
                        'classificacaoFinanceira'
                    )

                    expect(body.itens[0].executante).to.include.all.keys(
                        'id',
                        'nomeFantasia'
                    )
                }

                // Verifica estrutura de parcelas
                expect(body.parcelas).to.be.an('array')
                if (body.parcelas.length > 0) {
                    expect(body.parcelas[0]).to.include.all.keys(
                        'id',
                        'dataVencimento',
                        'numeroParcela',
                        'valor',
                        'observacao',
                        'status',
                        'liquidacoes',
                        'valorPago',
                        'valorPagar'
                    )

                    expect(body.parcelas[0].status).to.include.all.keys(
                        'id',
                        'status'
                    )

                    expect(body.parcelas[0].liquidacoes).to.be.an('array')
                }

                // Verifica estrutura de tipoPagador
                expect(body.tipoPagador).to.include.all.keys(
                    'id',
                    'liquidante'
                )

                // Verifica estrutura de status
                expect(body.status).to.include.all.keys(
                    'id',
                    'status'
                )

                // Verifica estrutura de tipoReceita
                expect(body.tipoReceita).to.include.all.keys(
                    'id',
                    'tipoRecebimento'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/contas-receber/{id}',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })

    describe('Módulo - Contas a Receber - Atualiza um recebimento por id', () => {

        it('Validar retorno 200 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('idRecebimento') // Reutiliza o ID

            cy.request({
                method: 'PUT',
                url: `/api/v1/contas-receber/${idRecebimento}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tipoPagadorId": 1,
                    "tipoRecebimentoId": 1,
                    "fornecedorId": null,
                    "pacienteId": 1,
                    "profissionalId": null,
                    "notaFiscal": "21345",
                    "quantidadeParcelas": 4,
                    "recorrencia": 3,
                    "tipoIntervalo": "M",
                    "observacao": "Lorem ipsum...",
                    "origemId": 1,
                    "origem": "Manual",
                    "itens": [
                        {
                            "id": 1,
                            "classificacaoFinanceiraId": 1,
                            "descricao": "Item 1",
                            "quantidade": 3,
                            "valorUnitario": 10,
                            "valorTotal": 30,
                            "executanteId": 348,
                            "executado": "0"
                        }
                    ],
                    "parcelas": [
                        {
                            "dataVencimento": "20251020",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 1,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251120",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 2,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251220",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 3,
                            "valor": 10
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('idRecebimento') // Reutiliza o ID

            cy.request({
                method: 'PUT',
                url: `/api/v1/contas-receber/${idRecebimento}`,
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

        it('Validar retorno 401 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('idRecebimento') // Reutiliza o ID

            cy.request({
                method: 'PUT',
                url: `/api/v1/contas-receber/${idRecebimento}`,
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                body: { 
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 403 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('idRecebimento') // Reutiliza o ID

            cy.request({
                method: 'GET', // Método divergente 
                url: `/api/v1/contas-receber/${idRecebimento}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tipoPagadorId": 1,
                    "tipoRecebimentoId": 1,
                    "fornecedorId": null,
                    "pacienteId": 1,
                    "profissionalId": null,
                    "notaFiscal": "21345",
                    "quantidadeParcelas": 4,
                    "recorrencia": 3,
                    "tipoIntervalo": "M",
                    "observacao": "Lorem ipsum...",
                    "origemId": 1,
                    "origem": "Manual",
                    "itens": [
                        {
                            "id": 1,
                            "classificacaoFinanceiraId": 1,
                            "descricao": "Item 1",
                            "quantidade": 3,
                            "valorUnitario": 10,
                            "valorTotal": 30,
                            "executanteId": 348,
                            "executado": "0"
                        }
                    ],
                    "parcelas": [
                        {
                            "dataVencimento": "20251020",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 1,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251120",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 2,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251220",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 3,
                            "valor": 10
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403)
            })
        })

        it('Validar retorno 404 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('idRecebimento') // Reutiliza o ID

            cy.request({
                method: 'POST', // Método divergente 
                url: `/api/v1/contas-receber/${idRecebimento}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "tipoPagadorId": 1,
                    "tipoRecebimentoId": 1,
                    "fornecedorId": null,
                    "pacienteId": 1,
                    "profissionalId": null,
                    "notaFiscal": "21345",
                    "quantidadeParcelas": 4,
                    "recorrencia": 3,
                    "tipoIntervalo": "M",
                    "observacao": "Lorem ipsum...",
                    "origemId": 1,
                    "origem": "Manual",
                    "itens": [
                        {
                            "id": 1,
                            "classificacaoFinanceiraId": 1,
                            "descricao": "Item 1",
                            "quantidade": 3,
                            "valorUnitario": 10,
                            "valorTotal": 30,
                            "executanteId": 348,
                            "executado": "0"
                        }
                    ],
                    "parcelas": [
                        {
                            "dataVencimento": "20251020",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 1,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251120",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 2,
                            "valor": 10
                        },
                        {
                            "dataVencimento": "20251220",
                            "observacao": "Lorem ipsum...",
                            "numeroParcela": 3,
                            "valor": 10
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    describe.only('Módulo - Contas a Receber - Exclui um recebimento por id', () => {
        
        it('Validar retorno 200 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('idRecebimento') // Reutiliza o ID

            cy.request({
                method: 'DELETE',
                url: `/api/v1/contas-receber/${idRecebimento}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('codigo');
                expect(response.body).to.have.property('flagDeError');
                expect(response.body).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('idRecebimento') // Reutiliza o ID

            cy.request({
                method: 'DELETE',
                url: '/api/v1/contas-receber/${id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/contas-receber/{id}', () => {
            const token = Cypress.env('access_token');
            const idRecebimento = Cypress.env('idRecebimento') // Reutiliza o ID

            cy.request({
                method: 'DELETE',
                url: `/api/v1/contas-receber/${idRecebimento}`,
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })
    })
})


//const idRecebimento = Cypress.env('idRecebimento') // Reutiliza o ID






/**
 * it('Validar retorno 200 - /api/v1/contas-receber', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: '',
                url: '',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    })
 */