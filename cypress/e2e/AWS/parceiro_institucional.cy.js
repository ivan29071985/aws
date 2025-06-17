/// <reference types= "cypress" /> 

describe('Módulo - Parceiro Institucional', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Parceiro Institucional', () => {

    it('Validar retorno 200', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'GET',
        url: '/api/v1/parceiroInstitucional',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {

        // Validar status code 200
        expect(response.status).to.eq(200);

        // Validar que o body existe
        expect(response.body).to.exist;

        // Validar que retorna um array
        expect(response.body).to.be.an('array');

        // Validar o total de parceiros
        const totalParceiros = response.body.length;
        expect(totalParceiros).to.be.a('number');
        expect(totalParceiros).to.be.at.least(0);

        // Log e validação do total
        cy.log('Total de parceiros institucionais encontrados:', totalParceiros);
        if (totalParceiros > 0) {
          cy.log('✅ API possui parceiros institucionais');
          expect(totalParceiros).to.be.greaterThan(0);
        } else {
          cy.log('⚠️ API sem parceiros (array vazio)');
          expect(totalParceiros).to.equal(0);
        }

        // Validar e log da estrutura do response
        expect(response.body).to.satisfy((body) => {
          const isValidArray = Array.isArray(body);
          cy.log(`Array válido: ${isValidArray}`);
          return isValidArray;
        });

        // Log estruturado do response
        cy.log('Response body estruturado:', JSON.stringify(response.body, null, 2));

        // Validar cada item se existir
        if (totalParceiros > 0) {
          response.body.forEach((item, index) => {
            expect(item).to.be.an('object');
            cy.log(`Item ${index + 1} é objeto válido: ✅`);
          });
        }
      });
    });

    it('Validar retorno 404', () => {
      const token = Cypress.env('access_token');

      cy.request({
        method: 'PUT',
        url: '/api/v1/parceiroInstitucional',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        failOnStatusCode: false
      }).then((response) => {

        // Validar status code 200
        expect(response.status).to.eq(404);
      });
    });

  })
})
