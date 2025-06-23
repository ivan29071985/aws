/// <reference types= "cypress" /> 

describe('Módulo - Regiões - Criar Nova Região', () => {

    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    });

    describe('Módulo - Regiões', () => {

        it('Validar retorno 200 ou 201 - /api/v1/regioes', () => {
            const token = Cypress.env('access_token');  // Obter o token de acesso do Cypress.env()

            // Verifique se o token está disponível
            if (!token) {
                throw new Error('Token de acesso não encontrado!');
            }

            // Função para gerar um nome aleatório para a região
            const generateRandomRegionName = () => {
                const randomName = Math.random().toString(36).substring(7);  // Gera uma string aleatória
                return `Região ${randomName}`;
            };

            const regionName = generateRandomRegionName();  // Nome da região gerado aleatoriamente

            cy.request({
                method: 'POST',  // O método do endpoint é POST
                url: '/api/v1/regioes', // URL do seu endpoint
                headers: {
                    'Authorization': `Bearer ${token}`,  // Cabeçalho de autenticação com o token
                    'Content-Type': 'application/json'  // Certificando-se de que a requisição é JSON
                },
                failOnStatusCode: false, // Não fazer falhar o teste automaticamente em status 4xx ou 5xx
                body: {
                    "nome": regionName  // Nome da região gerado aleatoriamente
                }
            }).then((response) => {
                // Verificar se o status é 200 ou 201 (criado com sucesso ou sucesso na requisição)
                expect([200, 201]).to.include(response.status);

                // Verificar se o campo 'codigo' existe e tem o valor 201
                expect(response.body).to.have.property('codigo', 201);

                // Verificar se 'flagDeError' é false
                expect(response.body).to.have.property('flagDeError', false);

                // Verificar se a mensagem é "Regional cadastrada com sucesso"
                expect(response.body).to.have.property('mensagem', 'Regional cadastrada com sucesso');
            });
        });

        it('Validar retorno 401 - /api/v1/regioes', () => {
            // Não fornecendo o token ou utilizando um token inválido
            const token = '';  // Aqui, estamos intencionalmente deixando o token vazio para gerar o erro 401

            // Função para gerar um nome aleatório para a região
            const generateRandomRegionName = () => {
                const randomName = Math.random().toString(36).substring(7);  // Gera uma string aleatória
                return `Região ${randomName}`;
            };

            const regionName = generateRandomRegionName();  // Nome da região gerado aleatoriamente

            cy.request({
                method: 'POST',  // O método do endpoint é POST
                url: '/api/v1/regioes', // URL do seu endpoint
                headers: {
                    'Authorization': `Bearer ${token}`,  // Sem token ou com um token inválido
                    'Content-Type': 'application/json'  // Certificando-se de que a requisição é JSON
                },
                failOnStatusCode: false, // Não fazer falhar o teste automaticamente em status 4xx ou 5xx
                body: {
                    "nome": regionName  // Nome da região gerado aleatoriamente
                }
            }).then((response) => {
                // Verificar se o status é 401 (não autorizado)
                expect(response.status).to.eq(401);
            });
        });

    });

    describe('Múdulo - Regiões - Retorna uma lista de regiões', () => {

        // Teste para retorno 200 OK com parâmetros válidos
        it('Validar retorno 200 - /api/v1/regioes', () => {
            const token = Cypress.env('access_token');  // Obter o token de acesso do Cypress.env()

            // Verifique se o token está disponível
            if (!token) {
                throw new Error('Token de acesso não encontrado!');
            }

            cy.request({
                method: 'GET',
                url: '/api/v1/regioes',  // URL do seu endpoint
                headers: {
                    'Authorization': `Bearer ${token}`,  // Cabeçalho de autenticação com o token
                },
                qs: {  // Parâmetros de consulta
                    name: 'Região Norte',   // Nome da região
                    page: 1,                // Página
                    limit: 10               // Limite de items por página
                }
            }).then((response) => {
                // Verificar se o status é 200 (requisição bem-sucedida)
                expect(response.status).to.eq(200);

                // Verificar se o corpo da resposta contém os dados esperados
                expect(response.body).to.be.an('array');

            });
        });

        // Teste para retorno 401 Unauthorized (quando não for fornecido um token ou token inválido)
        it('Validar retorno 401 - /api/v1/regioes', () => {
            const token = '';  // Deixando o token vazio para simular a falta de autenticação ou token inválido

            cy.request({
                method: 'GET',
                url: '/api/v1/regioes',  // URL do seu endpoint
                headers: {
                    'Authorization': `Bearer ${token}`,  // Sem token ou com um token inválido
                },
                qs: {  // Parâmetros de consulta
                    name: 'Região Norte',   // Nome da região
                    page: 1,                // Página
                    limit: 10               // Limite de items por página
                },
                failOnStatusCode: false // Não fazer falhar o teste automaticamente em status 4xx ou 5xx
            }).then((response) => {
                // Verificar se o status é 401 (não autorizado)
                expect(response.status).to.eq(401);


            });
        });

    });

    describe('Módulo - Regiões - Filtrar regiões', () => {

        // Teste para retorno 200 OK com filtro válido
        it('Validar retorno 200 - /api/v1/regioes/filter', () => {
            const token = Cypress.env('access_token');  // Obter o token de acesso do Cypress.env()

            // Verifique se o token está disponível
            if (!token) {
                throw new Error('Token de acesso não encontrado!');
            }

            cy.request({
                method: 'GET',
                url: '/api/v1/regioes/filter',  // URL do endpoint para filtrar regiões
                headers: {
                    'Authorization': `Bearer ${token}`,  // Cabeçalho de autenticação com o token
                    'Content-Type': 'application/json'   // Tipo de conteúdo JSON
                },
                qs: {  // Parâmetros de consulta
                    name: 'Região Norte',  // Nome da região
                    page: 1,                // Página
                    limit: 10               // Limite de items por página
                },
                failOnStatusCode: false  // Não falhar automaticamente em status 4xx ou 5xx
            }).then((response) => {
                // Verificar se o status é 200 (requisição bem-sucedida)
                expect(response.status).to.eq(200);
                // Verificar se o objeto 'meta' contém os dados esperados
            });
        });

        it('Validar retorno 404 - /api/v1/regioes/filter', () => {
            const token = '';  // Deixando o token vazio para simular a falta de autenticação ou token inválido

            cy.request({
                method: 'POST',  // Verifique se o método POST está correto para esse endpoint
                url: '/api/v1/regioes/filter',  // URL do seu endpoint
                headers: {
                    'Authorization': `Bearer ${token}`,  // Sem token ou com um token inválido
                    'Content-Type': 'application/json'   // Tipo de conteúdo JSON
                },
                body: {
                    "items": [
                        {
                            "id": 33,
                            "nome": "Região Norte",
                            "flgAtivo": "1",
                            "pais": {
                                "id": 1,
                                "pais": "Brasil"
                            }
                        }
                    ],
                    "meta": {
                        "totalItems": 1,
                        "currentPage": 1,
                        "itemCount": 1,
                        "itemsPerPage": 1,
                        "totalPages": 1
                    }
                },
                failOnStatusCode: false, // Não fazer falhar o teste automaticamente em status 4xx ou 5xx
            }).then((response) => {
                // Verificar se o status é 404 (não encontrado)
                expect(response.status).to.eq(404);
            });
        });

    });

    describe('Módulo - Regiões - Acessar uma região específica', () => {

        it('Validar retorno 200 - /api/v1/regioes/${id}', () => {
            const token = Cypress.env('access_token');  // Obter o token de acesso do Cypress.env()

            // Verifique se o token está disponível
            if (!token) {
                throw new Error('Token de acesso não encontrado!');
            }

            const id = 170

                ; // ID da região que queremos acessar

            cy.request({
                method: 'GET',
                url: `/api/v1/regioes/${id}`,  // URL do endpoint para acessar uma região específica
                headers: {
                    'Authorization': `Bearer ${token}`,  // Cabeçalho de autenticação com o token
                    'Content-Type': 'application/json'   // Tipo de conteúdo JSON
                },
                failOnStatusCode: false  // Não falhar automaticamente em status 4xx ou 5xx
            }).then((response) => {
                // Verificar se o status é 200 (requisição bem-sucedida)
                expect(response.status).to.eq(200);

                // Verificar se o corpo da resposta contém os dados esperados


                expect(response.body).to.have.property('flgAtivo', '1');
                expect(response.body).to.have.property('unidadesClinicas').that.is.an('array').and.has.lengthOf(0);

            });
        });

        it('Validar retorno 401 - /api/v1/regioes/${id}', () => {
            const token = '';  // Deixando o token vazio para simular a falta de autenticação ou token inválido

            const id = 33; // ID da região que queremos acessar

            cy.request({
                method: 'GET',
                url: `/api/v1/regioes/${id}`,  // URL do endpoint para acessar uma região específica
                headers: {
                    'Authorization': `Bearer ${token}`,  // Sem token ou com um token inválido
                    'Content-Type': 'application/json'   // Tipo de conteúdo JSON
                },
                failOnStatusCode: false  // Não falhar automaticamente em status 4xx ou 5xx
            }).then((response) => {
                // Verificar se o status é 401 (não autorizado)
                expect(response.status).to.eq(401);
            });
        });

    });

    describe('Módulo - Regiões - Atualizar região', () => {

        it('Validar retorno 200 - PUT /api/v1/regioes/${id}', () => {
            const token = Cypress.env('access_token');  // Obter o token de acesso do Cypress.env()

            // Verifique se o token está disponível
            if (!token) {
                throw new Error('Token de acesso não encontrado!');
            }

            const id = 33; // ID da região que queremos atualizar

            // Gerar nome randômico para a região
            const randomSuffix = Math.floor(Math.random() * 999999) + 1; // Número aleatório de 1 a 999999
            const randomRegionName = `Região ${randomSuffix}`;

            cy.log(`Nome da região gerado: ${randomRegionName}`);

            cy.request({
                method: 'PUT',  // Método para atualizar os dados
                url: `/api/v1/regioes/${id}`,  // URL do endpoint para acessar uma região específica
                headers: {
                    'Authorization': `Bearer ${token}`,  // Cabeçalho de autenticação com o token
                    'Content-Type': 'application/json'   // Tipo de conteúdo JSON
                },
                body: {
                    "nome": randomRegionName  // Nome randômico da região
                },
                failOnStatusCode: false  // Não falhar automaticamente em status 4xx ou 5xx
            }).then((response) => {
                // Debug para ver o que está retornando
                cy.log(`Status: ${response.status}`);
                cy.log(`Body: ${JSON.stringify(response.body)}`);

                // Verificar se o status é 200 (requisição bem-sucedida)
                expect(response.status).to.eq(200);

                // Verificar se o corpo da resposta contém os dados esperados
                expect(response.body).to.have.property('flagDeError', false);
                expect(response.body).to.have.property('codigo', 200);
                expect(response.body).to.have.property('mensagem', 'Regional alterada com sucesso.');

                cy.log(`Região atualizada com sucesso: ${randomRegionName}`);
            });
        });
        it('Validar retorno 401 - /api/v1/regioes/${id}', () => {
            const token = '';  // Deixando o token vazio para simular a falta de autenticação ou token inválido

            const id = 33; // ID da região que queremos acessar

            cy.request({
                method: 'PUT',  // Método para atualizar os dados
                url: `/api/v1/regioes/${id}`,  // URL do endpoint para acessar uma região específica
                headers: {
                    'Authorization': `Bearer ${token}`,  // Sem token ou com um token inválido
                    'Content-Type': 'application/json'   // Tipo de conteúdo JSON
                },
                body: {
                    "nome": "Região Norte"  // Novo nome da região
                },
                failOnStatusCode: false  // Não falhar automaticamente em status 4xx ou 5xx
            }).then((response) => {
                // Verificar se o status é 401 (não autorizado)
                expect(response.status).to.eq(401);
            });
        });

    });

    describe('Módulo - Regiões - Excluir região', () => {

        // Teste para retorno 200 OK com exclusão de uma região
        it('Validar retorno 200 - /api/v1/regioes/${id}', () => {
            const token = Cypress.env('access_token');  // Obter o token de acesso do Cypress.env()

            // Verifique se o token está disponível
            if (!token) {
                throw new Error('Token de acesso não encontrado!');
            }

            const id = 33; // ID da região que queremos excluir

            cy.request({
                method: 'DELETE',  // Método DELETE para excluir a região
                url: `/api/v1/regioes/${id}`,  // URL do endpoint para excluir uma região específica
                headers: {
                    'Authorization': `Bearer ${token}`,  // Cabeçalho de autenticação com o token
                    'Content-Type': 'application/json'   // Tipo de conteúdo JSON
                },
                failOnStatusCode: false  // Não falhar automaticamente em status 4xx ou 5xx
            }).then((response) => {
                // Verificar se o status é 200 (requisição bem-sucedida)
                expect(response.status).to.eq(200);
            });
        });

        // Teste para retorno 401 Unauthorized (quando não for fornecido um token ou token inválido)
        it('Validar retorno 401 - /api/v1/regioes/${id}', () => {
            const token = '';  // Deixando o token vazio para simular a falta de autenticação ou token inválido

            const id = 33; // ID da região que queremos excluir

            cy.request({
                method: 'DELETE',  // Método DELETE para excluir a região
                url: `/api/v1/regioes/${id}`,  // URL do endpoint para excluir uma região específica
                headers: {
                    'Authorization': `Bearer ${token}`,  // Sem token ou com um token inválido
                    'Content-Type': 'application/json'   // Tipo de conteúdo JSON
                },
                failOnStatusCode: false  // Não falhar automaticamente em status 4xx ou 5xx
            }).then((response) => {
                // Verificar se o status é 401 (não autorizado)
                expect(response.status).to.eq(401);
            });
        });

    });

    describe('Módulo - Regiões - Download CSV', () => {

        it('Validar retorno 200 - /api/v1/regioes/csv/download', () => {
            const token = Cypress.env('access_token');  // Obter o token de acesso do Cypress.env()

            // Verifique se o token está disponível
            if (!token) {
                throw new Error('Token de acesso não encontrado!');
            }

            cy.request({
                method: 'GET',
                url: '/api/v1/regioes/csv/download',  // URL do endpoint para download do arquivo CSV
                headers: {
                    'Authorization': `Bearer ${token}`,  // Cabeçalho de autenticação com o token
                    'Content-Type': 'application/json'   // Tipo de conteúdo JSON (pode variar conforme a API)
                },
                failOnStatusCode: false,  // Não falhar automaticamente em status 4xx ou 5xx
                encoding: 'binary'  // A resposta é provavelmente um arquivo binário (CSV)
            }).then((response) => {
                // Verificar se o status é 200 (requisição bem-sucedida)
                expect(response.status).to.eq(200);

                // Verificar se o tipo de conteúdo é 'application/zip' ou 'text/csv'
                // Ajuste conforme o tipo de arquivo que a API retorna
                expect(response.headers['content-type']).to.match(/csv/);

                // Verificar se o arquivo não está vazio (tamanho do conteúdo)
                expect(response.body.length).to.be.greaterThan(0);
            });
        });

        it('Validar retorno 401 - /api/v1/regioes/csv/download', () => {
            const token = '';  // Deixando o token vazio para simular a falta de autenticação ou token inválido

            cy.request({
                method: 'GET',
                url: '/api/v1/regioes/csv/download',  // URL do endpoint para download do arquivo CSV
                headers: {
                    'Authorization': `Bearer ${token}`,  // Sem token ou com um token inválido
                    'Content-Type': 'application/json'   // Tipo de conteúdo JSON
                },
                failOnStatusCode: false,  // Não falhar automaticamente em status 4xx ou 5xx
            }).then((response) => {
                // Verificar se o status é 401 (não autorizado)
                expect(response.status).to.eq(401);
            });
        });

    });

    describe('Módulo - Regiões - Buscar região', () => {


        it('Validar retorno 200 - /api/v1/regioes/lists/search', () => {
            const token = Cypress.env('access_token');  // Obter o token de acesso do Cypress.env()

            // Verifique se o token está disponível
            if (!token) {
                throw new Error('Token de acesso não encontrado!');
            }

            cy.request({
                method: 'GET',
                url: '/api/v1/regioes/lists/search',  // URL do endpoint para buscar a região
                headers: {
                    'Authorization': `Bearer ${token}`,  // Cabeçalho de autenticação com o token
                    'Content-Type': 'application/json'   // Tipo de conteúdo JSON
                },
                qs: {  // Parâmetros de consulta
                    name: 'Região Norte',  // Nome da região
                    page: 1,                // Página
                    limit: 10               // Limite de items por página
                },
                failOnStatusCode: false  // Não falhar automaticamente em status 4xx ou 5xx
            }).then((response) => {
                // Verificar se o status é 200 (requisição bem-sucedida)
                expect(response.status).to.eq(200);
            });
        });

        it('Validar retorno 401 - /api/v1/regioes/lists/search', () => {
            const token = '';  // Deixando o token vazio para simular a falta de autenticação ou token inválido

            cy.request({
                method: 'GET',
                url: '/api/v1/regioes/lists/search',  // URL do endpoint para buscar a região
                headers: {
                    'Authorization': `Bearer ${token}`,  // Sem token ou com um token inválido
                    'Content-Type': 'application/json'   // Tipo de conteúdo JSON
                },
                qs: {  // Parâmetros de consulta
                    name: 'Região Norte',  // Nome da região
                    page: 1,                // Página
                    limit: 10               // Limite de items por página
                },
                failOnStatusCode: false  // Não falhar automaticamente em status 4xx ou 5xx
            }).then((response) => {
                // Verificar se o status é 401 (não autorizado)
                expect(response.status).to.eq(401);
            });
        });

    });

    describe('Módulo - Regiões - Buscar todas as regiões', () => {

        // Teste para retorno 200 OK com busca de uma região
        it('Validar retorno 200 - /api/v1/regioes-all', () => {
            const token = Cypress.env('access_token');  // Obter o token de acesso do Cypress.env()

            // Verifique se o token está disponível
            if (!token) {
                throw new Error('Token de acesso não encontrado!');
            }

            cy.request({
                method: 'GET',
                url: '/api/v1/regioes-all',  // URL do endpoint para buscar todas as regiões
                headers: {
                    'Authorization': `Bearer ${token}`,  // Cabeçalho de autenticação com o token
                    'Content-Type': 'application/json'   // Tipo de conteúdo JSON
                },
                qs: {  // Parâmetros de consulta
                    name: 'Região Norte'  // Nome da região
                },
                failOnStatusCode: false  // Não falhar automaticamente em status 4xx ou 5xx
            }).then((response) => {
                // Verificar se o status é 200 (requisição bem-sucedida)
                expect(response.status).to.eq(200);

                // Verificar se o corpo da resposta contém os dados esperados
                expect(response.body).to.be.an('array');  // Espera-se que a resposta seja um array
            });
        });

        it('Validar retorno 404 - /api/v1/regioes-all', () => {
            const token = Cypress.env('access_token');  // Obter o token de acesso do Cypress.env()

            // Verifique se o token está disponível
            if (!token) {
                throw new Error('Token de acesso não encontrado!');
            }

            cy.request({
                method: 'PUT',
                url: '/api/v1/regioes-all',  // URL do endpoint para buscar todas as regiões
                headers: {
                    'Authorization': `Bearer ${token}`,  // Cabeçalho de autenticação com o token
                    'Content-Type': 'application/json'   // Tipo de conteúdo JSON
                },
                qs: {  // Parâmetros de consulta
                    name: 'Região Norte'  // Nome da região
                },
                failOnStatusCode: false  // Não falhar automaticamente em status 4xx ou 5xx
            }).then((response) => {
                // Verificar se o status é 200 (requisição bem-sucedida)
                expect(response.status).to.eq(404);

            });
        });
    });
});

