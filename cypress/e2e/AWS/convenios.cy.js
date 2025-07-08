/// <reference types= "cypress" /> 

describe.only('Módulo - Convênios', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })

    describe.only('Módulo - Convênios - Cria um convênio', () => {

        it.only('Validar retorno 201 - /api/v1/convenios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/convenios',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "items": [
                        {
                            nome: null,
                            razaoSocial: null,
                            cnpj: null,
                            parceria: null,
                            registroAns: null,
                            retornoConsulta: null,
                            diasRecebimento: null,
                            numGuiaAtual: null,
                            cep: null,
                            endereco: null,
                            numero: null,
                            complemento: null,
                            bairro: null,
                            cidade: null,
                            estado: null,
                            telefone: null,
                            email: null,
                            percentual2Procedimento: null,
                            percentual3Procedimento: null,
                            percentual4Procedimento: null,
                            unidCalculo: null,
                            valorCh: null,
                            valorUco: null,
                            valorM2Filme: null,
                            observacoes: null,
                            ativo: false
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)

                // Verifica se o ID existe e é um número
                expect(response.body.data.created.id).to.be.a('number');
                cy.writeFile('cypress/fixtures/idConvenios.json', { id: response.body.data.created.id })

                const created = response.body.data.created;
                const item = created.items[0];

                // Valida estrutura do primeiro item
                expect(item).to.include.all.keys(
                    'nome',
                    'razaoSocial',
                    'cnpj',
                    'parceria',
                    'registroAns',
                    'retornoConsulta',
                    'diasRecebimento',
                    'numGuiaAtual',
                    'cep',
                    'endereco',
                    'numero',
                    'complemento',
                    'bairro',
                    'cidade',
                    'estado',
                    'telefone',
                    'email',
                    'percentual2Procedimento',
                    'percentual3Procedimento',
                    'percentual4Procedimento',
                    'unidCalculo',
                    'valorCh',
                    'valorUco',
                    'valorM2Filme',
                    'observacoes',
                    'ativo'
                )

                // Valida estrutura do objeto principal
                expect(created).to.include.all.keys(
                    'nome',
                    'razaoSocial',
                    'cnpj',
                    'parceria',
                    'registroAns',
                    'retornoConsulta',
                    'diasRecebimento',
                    'numGuiaAtual',
                    'cep',
                    'endereco',
                    'numero',
                    'complemento',
                    'bairro',
                    'cidade',
                    'estado',
                    'telefone',
                    'email',
                    'percentual2Procedimento',
                    'percentual3Procedimento',
                    'percentual4Procedimento',
                    'unidCalculo',
                    'valorCh',
                    'valorUco',
                    'valorM2Filme',
                    'observacoes',
                    'id',
                    'ativo',
                    'items'
                );
            })
        })

        it('Validar retorno 400 - /api/v1/convenios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/convenios',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro
                    "nome": "Convenio",
                    "razaoSocial": "razaoSocial",
                    "cnpj": "cnpj",
                    "parceria": true,
                    "registroAns": "registroAns",
                    "retornoConsulta": "retornoConsulta",
                    "diasRecebimento": "diasRecebimento",
                    "numGuiaAtual": "numGuiaAtual",
                    "cep": "cep",
                    "endereco": "endereco",
                    "numero": 123456,
                    "complemento": "complemento",
                    "bairro": "bairro",
                    "cidade": "cidade",
                    "estado": "estado",
                    "telefone": "telefone",
                    "email": "email",
                    "percentual2Procedimento": "percentual2Procedimento",
                    "percentual3Procedimento": "percentual3Procedimento",
                    "percentual4Procedimento": "percentual4Procedimento",
                    "unidCalculo": "unidCalculo",
                    "valorCh": "valorCh",
                    "valorUco": "valorUco",
                    "valorM2Filme": "valorM2Filme",
                    "observacoes": "observacoes",
                    "ativo": true,
                    "materiais": 1,
                    "medicamentos": 1,
                    "taxas": 1,
                    "filmes": 1,
                    "procedimentos": 1,
                    "versaoTissId": 1,
                    "cbhpmId": 1,
                    "porteId": 1,
                    "planos": [
                        {
                            "valorCh": "valorCh",
                            "valorFilme": "valorFilme",
                            "valorPortes": "valorPortes",
                            "valorUco": "valorUco"
                        }
                    ],
                    "contratos": [
                        {
                            "codigoOperadora": "codigoOperadora",
                            "unidadeId": 1,
                            "contaBancariaId": 1
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/convenios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/convenios',
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "items": [
                        {
                            nome: null,
                            razaoSocial: null,
                            cnpj: null,
                            parceria: null,
                            registroAns: null,
                            retornoConsulta: null,
                            diasRecebimento: null,
                            numGuiaAtual: null,
                            cep: null,
                            endereco: null,
                            numero: null,
                            complemento: null,
                            bairro: null,
                            cidade: null,
                            estado: null,
                            telefone: null,
                            email: null,
                            percentual2Procedimento: null,
                            percentual3Procedimento: null,
                            percentual4Procedimento: null,
                            unidCalculo: null,
                            valorCh: null,
                            valorUco: null,
                            valorM2Filme: null,
                            observacoes: null,
                            ativo: false
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
                cy.log('Retorno completo do body:', JSON.stringify(response.body));


            })
        })

        it('Validar retorno 403 - /api/v1/convenios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET', //Método divergente
                url: '/api/v1/convenios',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "items": [
                        {
                            nome: null,
                            razaoSocial: null,
                            cnpj: null,
                            parceria: null,
                            registroAns: null,
                            retornoConsulta: null,
                            diasRecebimento: null,
                            numGuiaAtual: null,
                            cep: null,
                            endereco: null,
                            numero: null,
                            complemento: null,
                            bairro: null,
                            cidade: null,
                            estado: null,
                            telefone: null,
                            email: null,
                            percentual2Procedimento: null,
                            percentual3Procedimento: null,
                            percentual4Procedimento: null,
                            unidCalculo: null,
                            valorCh: null,
                            valorUco: null,
                            valorM2Filme: null,
                            observacoes: null,
                            ativo: false
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403)
            })
        })

        it('Validar retorno 404 - /api/v1/convenios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', //Método divergente
                url: '/api/v1/convenios',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "items": [
                        {
                            nome: null,
                            razaoSocial: null,
                            cnpj: null,
                            parceria: null,
                            registroAns: null,
                            retornoConsulta: null,
                            diasRecebimento: null,
                            numGuiaAtual: null,
                            cep: null,
                            endereco: null,
                            numero: null,
                            complemento: null,
                            bairro: null,
                            cidade: null,
                            estado: null,
                            telefone: null,
                            email: null,
                            percentual2Procedimento: null,
                            percentual3Procedimento: null,
                            percentual4Procedimento: null,
                            unidCalculo: null,
                            valorCh: null,
                            valorUco: null,
                            valorM2Filme: null,
                            observacoes: null,
                            ativo: false
                        }
                    ]
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    describe.skip('Módulo - Convênios - Retorna um lista de convênios com paginação', () => {

        it('Validar retorno 200 - /api/v1/convenios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/convenios',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                body.items.forEach((item) => {
                    expect(item).to.include.keys({
                        id: null,
                        nome: null,
                        razaoSocial: null,
                        cnpj: null,
                        parceria: null,
                        registroAns: null,
                        retornoConsulta: null,
                        diasRecebimento: null,
                        numGuiaAtual: null,
                        cep: null,
                        endereco: null,
                        numero: null,
                        complemento: null,
                        bairro: null,
                        cidade: null,
                        estado: null,
                        telefone: null,
                        email: null,
                        percentual2Procedimento: null,
                        percentual3Procedimento: null,
                        percentual4Procedimento: null,
                        unidCalculo: null,
                        valorCh: null,
                        valorUco: null,
                        valorM2Filme: null,
                        observacoes: null,
                        ativo: false
                    })
                })
            })
        })

        it('Validar retorno 400 - /api/v1/convenios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/convenios/ffff', // Url inválida
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/convenios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/convenios',
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/convenios', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', // Método divergente
                url: '/api/v1/convenios',
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

    describe.skip('Módulo - Convênios - Retorna um lista de convênios', () => {

        it('Validar retorno 200 - /api/v1/convenios/all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/convenios/all',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const data = response.body.data;

                // Verifica se items existem dentro do objeto
                data.forEach((item) => {
                    expect(item).to.have.all.keys({
                        id: null,
                        nome: null,
                        razaoSocial: null,
                        cnpj: null,
                        parceria: null,
                        registroAns: null,
                        retornoConsulta: null,
                        diasRecebimento: null,
                        numGuiaAtual: null,
                        cep: null,
                        endereco: null,
                        numero: null,
                        complemento: null,
                        bairro: null,
                        cidade: null,
                        estado: null,
                        telefone: null,
                        email: null,
                        percentual2Procedimento: null,
                        percentual3Procedimento: null,
                        percentual4Procedimento: null,
                        unidCalculo: null,
                        valorCh: null,
                        valorUco: null,
                        valorM2Filme: null,
                        observacoes: null,
                        ativo: null,
                        contratos: []
                    })
                })
            })
        })

        it('Validar retorno 400 - /api/v1/convenios/all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', // Método divergente
                url: '/api/v1/convenios/all',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/convenios/all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/convenios/all',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/convenios/all', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/convenios/all/lololo', // url inválida
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

    describe('Módulo - Convênios - Retorna um convênio buscando por id', () => {

        it('Validar retorno 200 - /api/v1/convenios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: `/api/v1/convenios/${1}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                // Verifica se items existem dentro do objeto
                expect(response.body).to.have.all.keys(
                    'id', 'nome', 'razaoSocial', 'cnpj', 'parceria', 'registroAns',
                    'retornoConsulta', 'diasRecebimento', 'numGuiaAtual', 'cep',
                    'endereco', 'numero', 'complemento', 'bairro', 'cidade', 'estado',
                    'telefone', 'email', 'percentual2Procedimento', 'percentual3Procedimento',
                    'percentual4Procedimento', 'unidCalculo', 'valorCh', 'valorUco',
                    'valorM2Filme', 'observacoes', 'ativo', 'contratos'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/convenios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/convenios/{id}', // url inválido
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/convenios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: `/api/v1/convenios/${1}`,
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/convenios/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: `/api/v1/convenios/${1}`,
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

    describe.only('Módulo - Convênios - Atualiza um convênio por id', () => {

        it.only('Validar retorno 200 - /api/v1/convenios/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o ID salvo do arquivo
            cy.readFile('cypress/fixtures/idConvenios.json').then((data) => {
                const idConvenios = data.id


                cy.request({
                    method: 'PATCH',
                    url: `/api/v1/convenios/${idConvenios}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application'
                    },
                    body: {
                        "nome": "Teste",
                        "cnpj": null,
                        "parceria": null,
                        "registroAns": null,
                        "retornoConsulta": null,
                        "diasRecebimento": null,
                        "numGuiaAtual": null,
                        "cep": null,
                        "endereco": null,
                        "numero": null,
                        "complemento": null,
                        "bairro": null,
                        "cidade": null,
                        "estado": null,
                        "telefone": null,
                        "email": null,
                        "percentual2Procedimento": null,
                        "percentual3Procedimento": null,
                        "percentual4Procedimento": null,
                        "unidCalculo": null,
                        "valorCh": null,
                        "valorUco": null,
                        "valorM2Filme": null,
                        "observacoes": null,
                        "ativo": true,
                        "materiais": null,
                        "medicamentos": null,
                        "taxas": null,
                        "filmes": null,
                        "procedimentos": null,
                        "versaoTissId": null,
                        "cbhpmId": null,
                        "porteId": null,
                        "planos": [
                            {
                                "valorCh": null,
                                "valorFilme": null,
                                "valorPortes": null,
                                "valorUco": null
                            }
                        ],
                        "contratos": [
                            {
                                "codigoOperadora": null,
                                "unidadeId": null,
                                "contaBancariaId": null
                            }
                        ]
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(200);

                    // Verifica se o body tem os campos esperados
                    expect(response.body).to.include.all.keys('data', 'id');

                    // Verifica se o campo 'data' contém a chave 'message'
                    expect(response.body.data).to.include.all.keys('message');

                    cy.log(`Convenio com ID ${idConvenios} alterado com sucesso.`);
                })
            })
        })

    })

    describe.only('Módulo - Convênios - Exclui um convênio por id', () => {

        it.only('Validar retorno 200 - /api/v1/convenios/{id}', () => {
            const token = Cypress.env('access_token');

            // Lê o ID salvo do arquivo
            cy.readFile('cypress/fixtures/idConvenios.json').then((data) => {
                const idConvenios = data.id


                cy.request({
                    method: 'DELETE',
                    url: `/api/v1/convenios/${idConvenios}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application'
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(200);

                    // Verifica se o body tem os campos esperados
                    expect(response.body).to.include.all.keys('data', 'id');

                    // Verifica se o campo 'data' contém a chave 'message'
                    expect(response.body.data).to.include.all.keys('message');

                    cy.log(`Convenio com ID ${idConvenios} excluído com sucesso.`);

                })
            })
        })
    })
})
