/// <reference types= "cypress" /> 

describe('Módulo - Perfis - Retorna uma lista de parceiros institucional', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Perfis', () => {

    it('Validar retorno 200', () => {

      const token = Cypress.env('access_token')
      cy.request({
        method: 'GET',
        url: '/api/v1/perfis', // URL do seu endpoint
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then((response) => {
        // Verificar se o status é 200
        expect(response.status).to.eq(200);

        //Valida a estrutura dos dados
        const data = response.body.data;

        data.forEach((item, index) => {
          expect(item).to.have.property('id');

        })
      })
    })

    it('Validar retorno 404', () => {

      const token = Cypress.env('access_token')
      cy.request({
        method: 'POST',
        url: '/api/v1/perfis', // URL do seu endpoint
        headers: {
          'Authorization': `Bearer ${token}`
        }, failOnStatusCode: false
      }).then((response) => {
        // Verificar se o status é 404
        expect(response.status).to.eq(404);

      });
    })
  })

  describe('Módulo - Perfis - recursos', () => {

    it('Validar retorno 200', () => {
      const token = Cypress.env('access_token');
      const perfilId = 2;

      cy.request({
        method: 'GET',
        url: `/api/v1/perfis/${perfilId}/recursos`,
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

        // Validar o total de recursos
        const totalRecursos = response.body.length;
        expect(totalRecursos).to.be.a('number');
        expect(totalRecursos).to.be.at.least(0);

        // Log e validação do total
        cy.log('Total de recursos encontrados:', totalRecursos);
        if (totalRecursos > 0) {
          cy.log('✅ Perfil possui recursos');
          expect(totalRecursos).to.be.greaterThan(0);
        } else {
          cy.log('⚠️ Perfil sem recursos (array vazio)');
          expect(totalRecursos).to.equal(0);
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
        if (totalRecursos > 0) {
          response.body.forEach((item, index) => {
            expect(item).to.be.an('object');
            cy.log(`Item ${index + 1} é objeto válido: ✅`);
          });
        }
      });
    });

    it('Validar retorno 404', () => {
      const token = Cypress.env('access_token');
      const perfilId = 2;

      cy.request({
        method: 'PUT',
        url: `/api/v1/perfis/${perfilId}/recursos`,
        headers: {
          'Authorization': `Bearer ${token}`
        }, failOnStatusCode: false
      }).then((response) => {

        // Validar status code 200
        expect(response.status).to.eq(404);
        // Validar e log da estrutura do response
        

        // Log estruturado do response
        cy.log('Response body estruturado:', JSON.stringify(response.body, null, 2));  
       
      });
    });

  })
})