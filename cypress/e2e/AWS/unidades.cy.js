/// <reference types= "cypress" /> 

describe('Módulo - Unidades', () => {

    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    });

    describe.skip('Módulo - Unidades - Criar uma unidade ', () => {

        it('Validar retorno 201 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');
            const random = Math.floor(Math.random() * 100000); // número aleatório

            cy.GeradorCnpj().then((cnpjValido) => {
                cy.log('CNPJ usado:', cnpjValido);

                cy.request({
                    method: 'POST',
                    url: '/api/v1/unidades',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        name: `Teste unidade API ${random}`,
                        razaoSocial: "Empresa Teste Ltda",
                        nomeFantasia: "Teste API Modulo Unidades",
                        bairro: "Centro",
                        country: "BR",
                        cnpj: cnpjValido,
                        cnes: "1234567",
                        consultorResponsavel: "João da Silva",
                        telefonePrincipal: "11987654321",
                        telefoneSecundario: "11912345678",
                        emailPrincipal: "contato@empresa.com",
                        emailSecundario: "suporte@empresa.com",
                        cep: "01001000",
                        endereco: "Avenida Paulista",
                        numero: "1000",
                        complemento: "Conjunto 101",
                        observacao: "Unidade de testes para homologação.",
                        sigla: "TEST",
                        fusoHorarioId: 1,
                        tipoUnidadeId: 2,
                        unidadeMatrizId: null,
                        exibirAgendamentosOnline: true,
                        exibirAgendamentoAssistido: false,
                        regionId: 3,
                        sellerId: "SELL1234",
                        ativarIntegracaoTef: true,
                        ativarSplit: false,
                        regimeTributarioId: 1,
                        unidadeStatusId: 2,
                        responsavelTecnicoId: null,
                        cidadeId: 1001,
                        regiaoZona: "Zona Sul",
                        parceiroInstitucionalId: null,
                        dataInauguracao: "20240101",
                        tipoSegmentoId: 4,
                        ativo: "A",
                        mcc: "8099",
                        flgAmorCirurgias: 0
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(201);

                    const item = response.body;
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('endereco');
                    expect(item).to.have.property('flgCentral');
                    expect(item).to.have.property('feegowClinicId');
                    expect(item).to.have.property('flgTelemedicina');
                    expect(item).to.have.property('flgAmorCirurgias');
                    expect(item).to.have.property('regiaoId');
                    expect(item).to.have.property('flgAtivo');
                    expect(item).to.have.property('flgAtivarTef');
                    expect(item).to.have.property('razaoSocial');
                    expect(item).to.have.property('cnpj');
                    expect(item).to.have.property('cnes');
                    expect(item).to.have.property('fkRegimeTributario');
                    expect(item).to.have.property('fkUnidadeStatus');
                    expect(item).to.have.property('consultor');
                    expect(item).to.have.property('telefonePrincipal');
                    expect(item).to.have.property('telefoneSecundario');
                    expect(item).to.have.property('emailPrincipal');
                    expect(item).to.have.property('emailSecundario');
                    expect(item).to.have.property('cep');
                    expect(item).to.have.property('numero');
                    expect(item).to.have.property('complemento');
                    expect(item).to.have.property('bairro');
                    expect(item).to.have.property('regiaoZona');
                    expect(item).to.have.property('observacao');
                    expect(item).to.have.property('sigla');
                    expect(item).to.have.property('fkFusoHorario');
                    expect(item).to.have.property('fkTipoUnidade');
                    expect(item).to.have.property('flgAgendaOnline');
                    expect(item).to.have.property('sellerId');
                    expect(item).to.have.property('flgAtivarSplit');
                    expect(item).to.have.property('fkParceiroInstitucional');
                    expect(item).to.have.property('dataInauguracao');
                    expect(item).to.have.property('fkTipoSegmento');
                    expect(item).to.have.property('status');
                    expect(item).to.have.property('mcc');
                    expect(item).to.have.property('latitude');
                    expect(item).to.have.property('longitude');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');
            const random = Math.floor(Math.random() * 100000); // número aleatório

            cy.GeradorCnpj().then((cnpjValido) => {
                cy.log('CNPJ usado:', cnpjValido);

                cy.request({
                    method: 'POST',
                    url: '/api/v1/unidades',
                    headers: {
                        //'Authorization': `Bearer ${token}`, // Token inválido
                        'Content-Type': 'application/json'
                    },
                    body: {
                        name: `Teste unidade API ${random}`,
                        razaoSocial: "Empresa Teste Ltda",
                        nomeFantasia: "Teste API Modulo Unidades",
                        bairro: "Centro",
                        country: "BR",
                        cnpj: cnpjValido,
                        cnes: "1234567",
                        consultorResponsavel: "João da Silva",
                        telefonePrincipal: "11987654321",
                        telefoneSecundario: "11912345678",
                        emailPrincipal: "contato@empresa.com",
                        emailSecundario: "suporte@empresa.com",
                        cep: "01001000",
                        endereco: "Avenida Paulista",
                        numero: "1000",
                        complemento: "Conjunto 101",
                        observacao: "Unidade de testes para homologação.",
                        sigla: "TEST",
                        fusoHorarioId: 1,
                        tipoUnidadeId: 2,
                        unidadeMatrizId: null,
                        exibirAgendamentosOnline: true,
                        exibirAgendamentoAssistido: false,
                        regionId: 3,
                        sellerId: "SELL1234",
                        ativarIntegracaoTef: true,
                        ativarSplit: false,
                        regimeTributarioId: 1,
                        unidadeStatusId: 2,
                        responsavelTecnicoId: null,
                        cidadeId: 1001,
                        regiaoZona: "Zona Sul",
                        parceiroInstitucionalId: null,
                        dataInauguracao: "20240101",
                        tipoSegmentoId: 4,
                        ativo: "A",
                        mcc: "8099",
                        flgAmorCirurgias: 0
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(401);
                })
            })
        })

        it('Validar retorno 403 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');
            const random = Math.floor(Math.random() * 100000); // número aleatório

            cy.GeradorCnpj().then((cnpjValido) => {
                cy.log('CNPJ usado:', cnpjValido);

                cy.request({
                    method: 'GET',
                    url: '/api/v1/unidades',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        name: `Teste unidade API ${random}`,
                        razaoSocial: "Empresa Teste Ltda",
                        nomeFantasia: "Teste API Modulo Unidades",
                        bairro: "Centro",
                        country: "BR",
                        cnpj: cnpjValido,
                        cnes: "1234567",
                        consultorResponsavel: "João da Silva",
                        telefonePrincipal: "11987654321",
                        telefoneSecundario: "11912345678",
                        emailPrincipal: "contato@empresa.com",
                        emailSecundario: "suporte@empresa.com",
                        cep: "01001000",
                        endereco: "Avenida Paulista",
                        numero: "1000",
                        complemento: "Conjunto 101",
                        observacao: "Unidade de testes para homologação.",
                        sigla: "TEST",
                        fusoHorarioId: 1,
                        tipoUnidadeId: 2,
                        unidadeMatrizId: null,
                        exibirAgendamentosOnline: true,
                        exibirAgendamentoAssistido: false,
                        regionId: 3,
                        sellerId: "SELL1234",
                        ativarIntegracaoTef: true,
                        ativarSplit: false,
                        regimeTributarioId: 1,
                        unidadeStatusId: 2,
                        responsavelTecnicoId: null,
                        cidadeId: 1001,
                        regiaoZona: "Zona Sul",
                        parceiroInstitucionalId: null,
                        dataInauguracao: "20240101",
                        tipoSegmentoId: 4,
                        ativo: "A",
                        mcc: "8099",
                        flgAmorCirurgias: 0
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(403);
                })
            })
        })

        it('Validar retorno 404 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');
            const random = Math.floor(Math.random() * 100000); // número aleatório

            cy.GeradorCnpj().then((cnpjValido) => {
                cy.log('CNPJ usado:', cnpjValido);

                cy.request({
                    method: 'DELETE',
                    url: '/api/v1/unidades',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        name: `Teste unidade API ${random}`,
                        razaoSocial: "Empresa Teste Ltda",
                        nomeFantasia: "Teste API Modulo Unidades",
                        bairro: "Centro",
                        country: "BR",
                        cnpj: cnpjValido,
                        cnes: "1234567",
                        consultorResponsavel: "João da Silva",
                        telefonePrincipal: "11987654321",
                        telefoneSecundario: "11912345678",
                        emailPrincipal: "contato@empresa.com",
                        emailSecundario: "suporte@empresa.com",
                        cep: "01001000",
                        endereco: "Avenida Paulista",
                        numero: "1000",
                        complemento: "Conjunto 101",
                        observacao: "Unidade de testes para homologação.",
                        sigla: "TEST",
                        fusoHorarioId: 1,
                        tipoUnidadeId: 2,
                        unidadeMatrizId: null,
                        exibirAgendamentosOnline: true,
                        exibirAgendamentoAssistido: false,
                        regionId: 3,
                        sellerId: "SELL1234",
                        ativarIntegracaoTef: true,
                        ativarSplit: false,
                        regimeTributarioId: 1,
                        unidadeStatusId: 2,
                        responsavelTecnicoId: null,
                        cidadeId: 1001,
                        regiaoZona: "Zona Sul",
                        parceiroInstitucionalId: null,
                        dataInauguracao: "20240101",
                        tipoSegmentoId: 4,
                        ativo: "A",
                        mcc: "8099",
                        flgAmorCirurgias: 0
                    },
                    failOnStatusCode: false,
                }).then((response) => {
                    expect(response.status).to.eq(404);
                })
            })
        })
    })

    describe.skip('Módulo - Unidades - Retorna a lista de unidades', () => {

        it('Validar retorno 200 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades?hasAssistedAppointment=false',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('descricao');
                    expect(item).to.have.property('razaoSocial');
                    expect(item).to.have.property('cnpj');
                    expect(item).to.have.property('consultor');
                    expect(item).to.have.property('telefonePrincipal');
                    expect(item).to.have.property('bairro');
                    expect(item).to.have.property('dataInauguracao');

                    expect(item).to.have.property('fkRegiao');
                    expect(item.fkRegiao).to.have.property('id');
                    expect(item.fkRegiao).to.have.property('nome');
                    expect(item.fkRegiao).to.have.property('flgAtivo');
                    expect(item.fkRegiao).to.have.property('pais');
                    expect(item.fkRegiao.pais).to.have.property('id');
                    expect(item.fkRegiao.pais).to.have.property('pais');

                    expect(item).to.have.property('fkResponsavelTecnico');
                    expect(item).to.have.property('fkTipoUnidadeMatriz');

                    expect(item).to.have.property('localDeAtendimento').and.to.be.an('array');
                    item.localDeAtendimento.forEach((local) => {
                        expect(local).to.have.property('id');
                        expect(local).to.have.property('fkUnidade');
                        expect(local).to.have.property('descricao');
                        expect(local).to.have.property('flagAtivo');
                        expect(local).to.have.property('flagCaixa');
                        expect(local).to.have.property('createdAt');
                        expect(local).to.have.property('updatedAt');
                        expect(local).to.have.property('lastUserId');
                        expect(local).to.have.property('ipClient');
                        expect(local).to.have.property('flgRegistroFiserv');
                        expect(local).to.have.property('tokenTerminalFiserv');
                        expect(local).to.have.property('fkContaCorrente');
                    })

                    expect(item).to.have.property('fkMunicipio');
                    expect(item.fkMunicipio).to.have.property('municipio');
                    expect(item.fkMunicipio).to.have.property('fkEstado');
                    expect(item.fkMunicipio.fkEstado).to.have.property('uf');
                })
            })
        })

        it('Validar retorno 400 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // Método divergente
                url: '/api/v1/unidades',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades',
                headers: {
                    //'Authorization': `Bearer ${token}`, //Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', // Método diergente
                url: '/api/v1/unidades',
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

    describe.skip('Módulo - Unidade - Retorna informações estáticas de uma unidade', () => {

        it('Validar retorno 200 - /api/v1/unidades/static-info/{id}', () => {
            const token = Cypress.env('access_token');
            const idClinica = 335;

            cy.request({
                method: 'GET',
                url: `/api/v1/unidades/static-info/${idClinica}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const item = response.body;

                expect(item).to.have.property('id');
                expect(item).to.have.property('descricao');
                expect(item).to.have.property('endereco');
                expect(item).to.have.property('flgCentral');
                expect(item).to.have.property('flgTelemedicina');
                expect(item).to.have.property('feegowClinicId');
                expect(item).to.have.property('flgAgendaOnline');
                expect(item).to.have.property('flgAtivarSplit');
                expect(item).to.have.property('flgAtivarTef');
                expect(item).to.have.property('flgAtivo');
                expect(item).to.have.property('status');
                expect(item).to.have.property('status');

                expect(item).to.have.property('profissionais').and.to.be.an('array');
                item.profissionais.forEach((prof) => {
                    expect(prof).to.have.property('id');
                    expect(prof).to.have.property('nome');
                    expect(prof).to.have.property('sobrenome');
                    expect(prof).to.have.property('tratamento');
                    expect(prof).to.have.property('ativo');

                    expect(prof).to.have.property('especialidadesIds').and.to.be.an('array');
                    expect(prof).to.have.property('procedimentosIds').and.to.be.an('array');
                })

                expect(item).to.have.property('procedimentosIds').and.to.be.an('array');
                expect(item).to.have.property('profissionaisETag');
                expect(item).to.have.property('localDeAtendimento').and.to.be.an('array');
                expect(item).to.have.property('localDeAtendimentoEtag');
                expect(item).to.have.property('etag');
            })
        })

        it('Validar retorno 400 - /api/v1/unidades/static-info/{id}', () => {
            const token = Cypress.env('access_token');
            const idClinica = 335;

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/static-info/{id}', // Sem parâmetro na url
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/unidades/static-info/{id}', () => {
            const token = Cypress.env('access_token');
            const idClinica = 335;

            cy.request({
                method: 'GET',
                url: `/api/v1/unidades/static-info/${idClinica}`,
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/unidades/static-info/{id}', () => {
            const token = Cypress.env('access_token');
            const idClinica = 335;

            cy.request({
                method: 'POST',
                url: `/api/v1/unidades/static-info/${idClinica}`,
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

    describe('Módulo - Unidades - Atualiza informações estáticas de uma unidade. Deve ser usado apenas para atualizações forçadas.', () => {
        
        it('Validar retorno 201 - /api/v1/unidades/static-info', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/static-info',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    unidadeIds: []
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201)
            })
        })

        it('Validar retorno 400 - /api/v1/unidades/static-info', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE',
                url: '/api/v1/unidades/static-info/',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    unidadeIds: []
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

        it('Validar retorno 401 - /api/v1/unidades/static-info', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/static-info',
                headers: {
                    //'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    unidadeIds: []
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 403 - /api/v1/unidades/static-info', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/static-info/',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    unidadeIds: []
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403)
            })
        })

        it('Validar retorno 404 - /api/v1/unidades/static-info', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/static-info/frfrf', // Url inválida
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    unidadeIds: []
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    describe('Módulo - Unidades - Vincula uma unidade a um profissional', () => {
        
        it('Validar retorno 201 - /api/v1/unidades/link-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/link-clinic-professional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "idProfissional": 3901
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);

                const item = response.body;
                expect(item).to.have.property('codigo');
                expect(item).to.have.property('flagDeError');
                expect(item).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/unidades/link-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/link-clinic-professional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/unidades/link-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/link-clinic-professional',
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "idProfissional": 3901
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 403 - /api/v1/unidades/link-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET', // Método divergente
                url: '/api/v1/unidades/link-clinic-professional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "idProfissional": 3901
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403);
            })
        })

         it('Validar retorno 404 - /api/v1/unidades/link-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH', // Método divergente
                url: '/api/v1/unidades/link-clinic-professional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "idProfissional": 3901
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404);
            })
        })
    })

    describe('Módulo - Unidades - Desvincular uma unidade de um profissional', () => {
        
        it('Validar retorno 201 - /api/v1/unidades/unlink-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/unlink-clinic-professional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "idProfissional": 3901
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(201);

                const item = response.body;
                expect(item).to.have.property('codigo');
                expect(item).to.have.property('flagDeError');
                expect(item).to.have.property('mensagem');
            })
        })

        it('Validar retorno 400 - /api/v1/unidades/unlink-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/unlink-clinic-professional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: { // Sem parâmetro no body
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/unidades/unlink-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades/unlink-clinic-professional',
                headers: {
                    //'Authorization': `Bearer ${token}`, // Token inválido
                    'Content-Type': 'application/json'
                },
                body: {
                    "idProfissional": 3901
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 403 - /api/v1/unidades/unlink-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET', // Método divergente
                url: '/api/v1/unidades/unlink-clinic-professional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "idProfissional": 3901
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(403);
            })
        })

        it('Validar retorno 404 - /api/v1/unidades/unlink-clinic-professional', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'PATCH',
                url: '/api/v1/unidades/unlink-clinic-professional',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: {
                    "idProfissional": 3901
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(404);
            })
        })
    })

    describe('Módulo - Unidades - Consultar agendamento do profissional por id', () => {
    //Em construção
        it('Validar retorno 200 - /api/v1/unidades/appointments/professional{id}', () => {
            const token = Cypress.env('access_token');
            const idProfissional = 3901;

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades/appointments/professional{id}',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type':  'application/json'
                },
            }).then((response) => {
                expect(response.status).to.eq(200);

                const items = response.body;
                items.forEach((item) => {
                    expect(item).to.have.property('id');
                    expect(item).to.have.property('lembrete24h');
                    expect(item).to.have.property('lembrete1h');
                    expect(item).to.have.property('lembrete15min');
                    expect(item).to.have.property('flagConfirmAppointment');
                    expect(item).to.have.property('flgLinkExpirado');
                    expect(item).to.have.property('clinica');
                    expect(item).to.have.property('fkPaciente');
                    expect(item).to.have.property('profissional_id');
                    expect(item).to.have.property('especialidade_id');
                    expect(item).to.have.property('statusAgendamento');
                    expect(item).to.have.property('data');
                    expect(item).to.have.property('horaInicio');
                    expect(item).to.have.property('horaTermino');
                    expect(item).to.have.property('encaixe');
                    expect(item).to.have.property('retorno');
                    expect(item).to.have.property('lastUser');
                    expect(item).to.have.property('updatedAt');
                    expect(item).to.have.property('ipClient');
                    expect(item).to.have.property('enviarSms');
                    expect(item).to.have.property('enviarEmail');
                    expect(item).to.have.property('valorTotal');
                    expect(item).to.have.property('repeticao');
                    expect(item).to.have.property('repeticaoPeriodicidade');
                    expect(item).to.have.property('repeticaoQuantidade');
                    expect(item).to.have.property('repeticaoDataTermino');
                    expect(item).to.have.property('observacao');
                    expect(item).to.have.property('precificacaoId');
                    expect(item).to.have.property('reschedulingCounter');
                    expect(item).to.have.property('flgRescheduling');
                    expect(item).to.have.property('createAt');
                    expect(item).to.have.property('createdBy');
                    expect(item).to.have.property('dataLimiteRetorno');
                    expect(item).to.have.property('profissional_clinica_id');
                    expect(item).to.have.property('flgConsultaAssistida');
                    expect(item).to.have.property('agendamentoOrigemId');
                    expect(item).to.have.property('checkIn');
                    expect(item).to.have.property('retornoOrigemAgendamentoId');
                    expect(item).to.have.property('oldStatus');
                    expect(item).to.have.property('lastAttendance');
                    expect(item).to.have.property('paymentSettled');
                    expect(item).to.have.property('updateDateStatusPortal');
                    expect(item).to.have.property('parceiro');
                    expect(item).to.have.property('paidByProposal');
                    expect(item).to.have.property('flagPrimeiraConsulta');
                    expect(item).to.have.property('scheduleId');
                    expect(item).to.have.property('scheduleGeneratedId');
                    expect(item).to.have.property('flgNaoCompareceu');
                    expect(item).to.have.property('flgOverbooking');
                    expect(item).to.have.property('paymentIdFiserv');
                    expect(item).to.have.property('optinJson');

                    expect(item).to.have.property('profissionalId');
                    expect(item.profissionalId).to.have.property('');
                })
            })
        })
    })
})

