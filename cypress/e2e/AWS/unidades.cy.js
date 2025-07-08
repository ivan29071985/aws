/// <reference types= "cypress" /> 

describe('Módulo - Unidades', () => {

    beforeEach(() => {
        cy.login()
        cy.refreshToken()
    });

    /*describe('Módulo - Unidades - Criar uma unidade ', () => { // Falta criar

        it('Validar retorno 200 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'POST',
                url: '/api/v1/unidades',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) =>{
                expect(response.status).to.eq(200);


            })
        })
    })*/

    describe('Módulo - Unidades - Retorna a lista de unidades', () => {

        it('Validar retorno 200 - /api/v1/unidades', () => {
            const token = Cypress.env('access_token');

            cy.request({
                method: 'GET',
                url: '/api/v1/unidades?hasAssistedAppointment=false',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
cy.log('Response body:', JSON.stringify(response.body))
                /*const items = response.body;
                items.forEach((item) => {
                expect(item).to.have.property('id');
                expect(item).to.have.property('descricao');
                expect(item).to.have.property('razaoSocial');
                expect(item).to.have.property('cnpj');
                expect(item).to.have.property('consultor');
                expect(item).to.have.property('telefonePrincipal');
                expect(item).to.have.property('bairro');
                expect(item).to.have.property('dataInauguracao');

                expect(item).that
                })*/
            })
        })  
    })
})

