/// <reference types="cypress" />

describe('Módulo - Propostas', () => {
    beforeEach(() => {
        cy.login();
        cy.refreshToken()
    })

    describe('Módulo - Propostas - Retorna lista de propostas', () => {

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
})

/// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> EM CONSTRUÇÃO <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<