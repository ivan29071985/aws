/// <reference types="cypress"/>

describe('Módulo - Royalties', () => {
    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    })
    
    describe('Módulo - Royalties - Informações de royalties', () => {
        
        it('Validar retorno 200 - /api/v1/royalties', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/royalties',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.have.property('grouped').to.be.an('array')
                expect(body).to.have.property('items').to.be.an('array')
            })
        })

        it('Validar retorno 401 - /api/v1/royalties', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/royalties',
                headers: {
                    //'Authorization': `Bearer ${token}`, Token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/royalties', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/royalties',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    describe('Módulo - Royalties - Retorna informações financeiras', () => {
        
        it('Validar retorno 200 - /api/v1/royalties/infos-financials', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/royalties/infos-financials?unidadeIds=483&dataInicio=20250202&dataFinal=20250202',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)

                const body = response.body;
                expect(body).to.have.property('totalPix')
                expect(body).to.have.property('totalMoney')
                expect(body).to.have.property('totalTef')
                expect(body).to.have.property('totalNotTef')
            })
        })

        it('Validar retorno 400 - /api/v1/royalties/infos-financials', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/royalties/infos-financials', // sem parâmetros
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400)
            })
        })

         it('Validar retorno 401 - /api/v1/royalties/infos-financials', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/royalties/infos-financials?unidadeIds=483&dataInicio=20250202&dataFinal=20250202',
                headers: {
                    //'Authorization': `Bearer ${token}`, token inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401)
            })
        })

        it('Validar retorno 404 - /api/v1/royalties/infos-financials', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/royalties/infos-financials?unidadeIds=483&dataInicio=20250202&dataFinal=20250202',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })
})