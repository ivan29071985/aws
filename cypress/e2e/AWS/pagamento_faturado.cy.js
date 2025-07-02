/// <reference types= "cypress" /> 

describe.only('Módulo - Pagamento Faturado', () => {

    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    });

    describe('Pagamento Faturado - Retorna uma lista de pagamentos faturados', () => {

        it('Validar retorno 200 - /api/v1/pagamento-faturado', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pagamento-faturado?page=1&limit=15&partnerId=1&statusId=1&startDate=20241130&endDate=20241230',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);

                const body = response.body;
                expect(body).to.deep.equals({
                    items: [],
                    information: {
                        totalInvoiced: 0
                    },
                    meta: {
                        itemCount: 0,
                        totalItems: 0,
                        itemsPerPage: 15,
                        currentPage: 1,
                        totalPages: 0
                    }
                })
            })
        })

        it('Validar retorno 400 - /api/v1/pagamento-faturado', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pagamento-faturado',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            })
        })

        it('Validar retorno 401 - /api/v1/pagamento-faturado', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/pagamento-faturado',
                headers: {
                    //'Authorization': `Bearer ${token}`, //Token Inválido
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            })
        })

        it('Validar retorno 404 - /api/v1/pagamento-faturado', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST', // Método Divergente
                url: '/api/v1/pagamento-faturado',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404);
            })
        })

    })
})



