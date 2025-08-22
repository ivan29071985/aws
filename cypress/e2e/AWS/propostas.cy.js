/// <reference types="cypress" />

describe('Módulo - Propostas', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken()
    })

    describe.skip('Módulo - Propostas - Retorna lista de propostas', () => {

        it('Validar retorno 200 - /api/v1/propostas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200)

                const data = response.body.items[0];

                // Validações principais do primeiro items
                expect(data).to.have.property('id');
                expect(data).to.have.property('dataValidade');
                expect(data).to.have.property('valorTotal');
                expect(data).to.have.property('createdAt');
                expect(data).to.have.property('valorTotalClinica');

                // Validar array de itens
                expect(data.itens).to.be.an('array').and.to.have.length.greaterThan(0);
                const subItem = data.itens[0]
                expect(subItem).to.have.all.keys('id', 'procedimento');
                expect(subItem.procedimento).to.have.all.keys('id', 'nome');

                // Validar status e paciente
                expect(data.status).to.have.all.keys('id', 'descricao')
                expect(data.paciente).to.have.all.keys('id', 'nome', 'sobrenome')

                // Validar meta
                expect(response.body).to.have.property('meta')
                expect(response.body.meta).to.have.all.keys(
                    'totalItems',
                    'currentPage',
                    'itemCount',
                    'itemsPerPage',
                    'totalPages'
                )
            })
        })

        it('Validar retorno 400 - /api/v1/propostas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // método divergente
                url: '/api/v1/propostas',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(400)

            })
        })

        it('Validar retorno 401 - /api/v1/propostas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas',
                headers: {
                    // 'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(401)

            })
        })

        it('Validar retorno 404 - /api/v1/propostas', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'DELETE', // método divergente
                url: '/api/v1/propostas',
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
    /// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> EM CONSTRUÇÃO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    describe('Módulo - Propostas - Cadastrar uma proposta', () => {

        it('Validar retorno 201 - /api/v1/propostas', () => {

        })
    })
    /// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> EM CONSTRUÇÃO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    describe.only('Módulo - Propostas - Retorna uma proposta por id', () => {

        it.only('Validar retorno 200 - /api/v1/propostas/{id}', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/propostas/392',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(200);

                const objeto = response.body;

                // Verifica os campos principais da proposta
                expect(objeto).to.have.property('id');
                expect(objeto).to.have.property('cdtMatricula');
                expect(objeto).to.have.property('dataProposta');
                expect(objeto).to.have.property('dataValidade');
                expect(objeto).to.have.property('fkUnidade');
                expect(objeto).to.have.property('valorTotal');
                expect(objeto).to.have.property('quantidadeParcela');
                expect(objeto).to.have.property('tipoIntervalo');
                expect(objeto).to.have.property('quantidadeIntervalo');
                expect(objeto).to.have.property('flagAtivo');
                expect(objeto).to.have.property('ipClient');
                expect(objeto).to.have.property('createdAt');
                expect(objeto).to.have.property('updatedAt');
                expect(objeto).to.have.property('lastUser');
                expect(objeto).to.have.property('origem');
                expect(objeto).to.have.property('parceiroId');
                expect(objeto).to.have.property('origemId');
                expect(objeto).to.have.property('valorTotalClinica');
                expect(objeto).to.have.property('fkStatusProposta');
                expect(objeto).to.have.property('fkEspecialidade');
                expect(objeto).to.have.property('fkProfissional');
                expect(objeto).to.have.property('fkProfissionalExterno');
                expect(objeto).to.have.property('patientId');
                expect(objeto).to.have.property('paymentIdFiserv');

                // Verifica os campos do objeto paciente
                expect(objeto).to.have.property('paciente');
                expect(objeto.paciente).to.have.property('id');
                expect(objeto.paciente).to.have.property('obito');
                expect(objeto.paciente).to.have.property('prontuario');
                expect(objeto.paciente).to.have.property('tipoPaciente');
                expect(objeto.paciente).to.have.property('cpf');
                expect(objeto.paciente).to.have.property('docIdentificacao');
                expect(objeto.paciente).to.have.property('nome');
                expect(objeto.paciente).to.have.property('sobrenome');
                expect(objeto.paciente).to.have.property('nomeCompleto');
                expect(objeto.paciente).to.have.property('nomeSocial');
                expect(objeto.paciente).to.have.property('rg');
                expect(objeto.paciente).to.have.property('dataNascimento');
                expect(objeto.paciente).to.have.property('nomeMae');
                expect(objeto.paciente).to.have.property('naturalidade');
                expect(objeto.paciente).to.have.property('nacionalidade');
                expect(objeto.paciente).to.have.property('profissao');
                expect(objeto.paciente).to.have.property('restricoesTratamentoMedico');
                expect(objeto.paciente).to.have.property('codigoDDI');
                expect(objeto.paciente).to.have.property('telefone');
                expect(objeto.paciente).to.have.property('celular');
                expect(objeto.paciente).to.have.property('celularAlternativo');
                expect(objeto.paciente).to.have.property('email');
                expect(objeto.paciente).to.have.property('residenciaTipo');
                expect(objeto.paciente).to.have.property('cep');
                expect(objeto.paciente).to.have.property('endereco');
                expect(objeto.paciente).to.have.property('numero');
                expect(objeto.paciente).to.have.property('complemento');
                expect(objeto.paciente).to.have.property('bairro');
                expect(objeto.paciente).to.have.property('cidade');
                expect(objeto.paciente).to.have.property('estado');
                expect(objeto.paciente).to.have.property('foto');
                expect(objeto.paciente).to.have.property('observacoes');
                expect(objeto.paciente).to.have.property('cns');
                expect(objeto.paciente).to.have.property('sexoId');
                expect(objeto.paciente).to.have.property('origemId');
                expect(objeto.paciente).to.have.property('createdAt');
                expect(objeto.paciente).to.have.property('updatedAt');
                expect(objeto.paciente).to.have.property('primeiraConsulta');
                expect(objeto.paciente).to.have.property('optin');

                // Verifica os campos do objeto paciente.optin                
                expect(objeto.paciente.optin).to.have.property('personalData');
                expect(objeto.paciente.optin).to.have.property('healthData');
                expect(objeto.paciente.optin).to.have.property('appointmentData');

                // Verifica se items é um array  
                expect(objeto).to.have.property('itens').to.be.an('array')

                // Verifica os campos do objeto status
                expect(objeto).to.have.property('status');
                expect(objeto.status).to.have.property('id');
                expect(objeto.status).to.have.property('descricao');
                expect(objeto.status).to.have.property('flagAtivo');

                // Verifica os campos do objeto unidade
                expect(objeto).to.have.property('unidade');
                expect(objeto.unidade).to.have.property('id');
                expect(objeto.unidade).to.have.property('descricao');
                expect(objeto.unidade).to.have.property('endereco');
                expect(objeto.unidade).to.have.property('flgCentral');
                expect(objeto.unidade).to.have.property('feegowClinicId');
                expect(objeto.unidade).to.have.property('flgTelemedicina');
                expect(objeto.unidade).to.have.property('flgAmorCirurgias');
                expect(objeto.unidade).to.have.property('regiaoId');
                expect(objeto.unidade).to.have.property('flgAtivo');
                expect(objeto.unidade).to.have.property('flgAtivarTef');
                expect(objeto.unidade).to.have.property('razaoSocial');
                expect(objeto.unidade).to.have.property('cnpj');
                expect(objeto.unidade).to.have.property('cnes');
                expect(objeto.unidade).to.have.property('fkRegimeTributario');
                expect(objeto.unidade).to.have.property('fkUnidadeStatus');
                expect(objeto.unidade).to.have.property('consultor');
                expect(objeto.unidade).to.have.property('telefonePrincipal');
                expect(objeto.unidade).to.have.property('telefoneSecundario');
                expect(objeto.unidade).to.have.property('emailPrincipal');
                expect(objeto.unidade).to.have.property('emailSecundario');
                expect(objeto.unidade).to.have.property('cep');
                expect(objeto.unidade).to.have.property('numero');
                expect(objeto.unidade).to.have.property('complemento');
                expect(objeto.unidade).to.have.property('bairro');
                expect(objeto.unidade).to.have.property('regiaoZona');
                expect(objeto.unidade).to.have.property('observacao');
                expect(objeto.unidade).to.have.property('sigla');
                expect(objeto.unidade).to.have.property('fkFusoHorario');
                expect(objeto.unidade).to.have.property('fkTipoUnidade');
                expect(objeto.unidade).to.have.property('flgAgendaOnline');
                expect(objeto.unidade).to.have.property('sellerId');
                expect(objeto.unidade).to.have.property('flgAtivarSplit');
                expect(objeto.unidade).to.have.property('fkParceiroInstitucional');
                expect(objeto.unidade).to.have.property('dataInauguracao');
                expect(objeto.unidade).to.have.property('fkTipoSegmento');
                expect(objeto.unidade).to.have.property('status');
                expect(objeto.unidade).to.have.property('mcc');
                expect(objeto.unidade).to.have.property('latitude');
                expect(objeto.unidade).to.have.property('longitude');

                // Verifica os campos do objeto profissional
                expect(objeto).to.have.property('profissional');
                expect(objeto.profissional).to.have.property('id');
                expect(objeto.profissional).to.have.property('tratamento');
                expect(objeto.profissional).to.have.property('nome');
                expect(objeto.profissional).to.have.property('sobrenome');
                expect(objeto.profissional).to.have.property('cpf');
                expect(objeto.profissional).to.have.property('rg');
                expect(objeto.profissional).to.have.property('flagMemedPdf');
                expect(objeto.profissional).to.have.property('titulo');
                expect(objeto.profissional).to.have.property('dataNascimento');
                expect(objeto.profissional).to.have.property('email');
                expect(objeto.profissional).to.have.property('telefone1');
                expect(objeto.profissional).to.have.property('telefone2');
                expect(objeto.profissional).to.have.property('cep');
                expect(objeto.profissional).to.have.property('endereco');
                expect(objeto.profissional).to.have.property('numero');
                expect(objeto.profissional).to.have.property('complemento');
                expect(objeto.profissional).to.have.property('bairro');
                expect(objeto.profissional).to.have.property('cidade');
                expect(objeto.profissional).to.have.property('estadoEndereco');
                expect(objeto.profissional).to.have.property('observacaoPublica');
                expect(objeto.profissional).to.have.property('convenios');
                expect(objeto.profissional).to.have.property('exibirNaAgenda');
                expect(objeto.profissional).to.have.property('responsavelTecnicoClinica');
                expect(objeto.profissional).to.have.property('mensagemAgenda');
                expect(objeto.profissional).to.have.property('ativo');
                expect(objeto.profissional).to.have.property('fotografia');
                expect(objeto.profissional).to.have.property('tokenMemed');
                expect(objeto.profissional).to.have.property('criadoPor');
                expect(objeto.profissional).to.have.property('birdIdToken');
                expect(objeto.profissional).to.have.property('birdIdExpiration');
                expect(objeto.profissional).to.have.property('observacaoPrivada');
                expect(objeto.profissional).to.have.property('cnpj');
                expect(objeto.profissional).to.have.property('fkUsuario');
                expect(objeto.profissional).to.have.property('memedUpdateAt');

                // Verifica campo profissionaisExterno
                expect(objeto).to.have.property('profissionaisExterno');

                // Verifica campos do objeto especialidade
                expect(objeto).to.have.property('especialidade');
                expect(objeto.especialidade).to.have.property('id');
                expect(objeto.especialidade).to.have.property('descricao');
                expect(objeto.especialidade).to.have.property('rqe');
                expect(objeto.especialidade).to.have.property('ativo');
                expect(objeto.especialidade).to.have.property('flgTelemedicina');
                expect(objeto.especialidade).to.have.property('memedId');
                expect(objeto.especialidade).to.have.property('flgAmorCirurgias');

                // Verifica campo parceiro
                expect(objeto).to.have.property('parceiro')

                // Verifica array de parcelas
                expect(objeto).to.have.property('parcelas').to.be.an('array');
                expect(objeto.parcelas[0]).to.have.property('id');
                expect(objeto.parcelas[0]).to.have.property('fkProposta');
                expect(objeto.parcelas[0]).to.have.property('numeroParcela');
                expect(objeto.parcelas[0]).to.have.property('dataVencimento');
                expect(objeto.parcelas[0]).to.have.property('dataRecebimento');
                expect(objeto.parcelas[0]).to.have.property('observacao');
                expect(objeto.parcelas[0]).to.have.property('valor');
                expect(objeto.parcelas[0]).to.have.property('valorRecebido');
                expect(objeto.parcelas[0]).to.have.property('flagAtivo');
                expect(objeto.parcelas[0]).to.have.property('ipClient');
                expect(objeto.parcelas[0]).to.have.property('createdAt');
                expect(objeto.parcelas[0]).to.have.property('updatedAt');
                expect(objeto.parcelas[0]).to.have.property('createdBy');
                expect(objeto.parcelas[0]).to.have.property('lastUser');
                expect(objeto.parcelas[0]).to.have.property('formaLiquidacao');
                expect(objeto.parcelas[0]).to.have.property('recebimentos');

                // Verifica campos adicionais
                expect(objeto).to.have.property('createdBy');
                expect(objeto.createdBy).to.have.property('id');
                expect(objeto.createdBy).to.have.property('firstName');
                expect(objeto.createdBy).to.have.property('lastName');
                expect(objeto.createdBy).to.have.property('fullName');
                expect(objeto.createdBy).to.have.property('cpf');
                expect(objeto.createdBy).to.have.property('isAdmin');
                expect(objeto.createdBy).to.have.property('email');
                expect(objeto.createdBy).to.have.property('tratamento');
                expect(objeto.createdBy).to.have.property('sexo');
                expect(objeto.createdBy).to.have.property('dataNascimento');
                expect(objeto.createdBy).to.have.property('celular');
                expect(objeto.createdBy).to.have.property('funcao');
                expect(objeto.createdBy).to.have.property('profissao');
                expect(objeto.createdBy).to.have.property('crm');
                expect(objeto.createdBy).to.have.property('uf');
                expect(objeto.createdBy).to.have.property('cidade');
                expect(objeto.createdBy).to.have.property('password');
                expect(objeto.createdBy).to.have.property('role');
                expect(objeto.createdBy).to.have.property('isActive');
                expect(objeto.createdBy).to.have.property('loginTimes');
                expect(objeto.createdBy).to.have.property('passwordIsInvalidCount');
                expect(objeto.createdBy).to.have.property('hashNewPassword');
                expect(objeto.createdBy).to.have.property('flgMaisTodos');
                expect(objeto.createdBy).to.have.property('createdAt');
                expect(objeto.createdBy).to.have.property('updatedAt');

                expect(objeto).to.have.property('campaign');
                expect(objeto).to.have.property('recebimentoPendente');
                expect(objeto).to.have.property('hasFilaColetaExames');
            })
        })
    })
})



/// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> EM CONSTRUÇÃO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<