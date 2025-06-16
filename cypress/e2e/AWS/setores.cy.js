/// <reference types= "cypress" /> 

describe('Módulo - Setores - Retorna setores gerais ativos', () => {

  beforeEach(() => {
    cy.login()
    cy.refreshToken()
  });

  describe('Módulo - Setores', () => {

    it('Validar retorno 200', () => {

      const token = Cypress.env('access_token')
      cy.request({
        method: 'GET',
        url: '/api/v1/setores', // URL do seu endpoint
        headers: {
          'Authorization': `Bearer ${token}`
        },
        failOnStatusCode: false // Não fazer falhar o teste automaticamente em status 4xx ou 5xx
      }).then((response) => {
        // Verificar se o status é 200
        expect(response.status).to.eq(200);

        // Verificar se a resposta é um array
        expect(response.body).to.be.an('array');

        // Iterar sobre os setores e verificar o campo "setor" para cada um
        response.body.forEach((setor) => {
          // Verificar se o campo "setor" existe e não é vazio
          expect(setor).to.have.property('setor').that.is.a('string').and.is.not.empty;

          // Opcionalmente, você pode verificar se o setor tem valores específicos
          // Exemplo: Verificar se a lista contém "Call Center"
          expect(setor.setor).to.be.oneOf([
            'Call Center',
            'Financeiro',
            'Administrativo',
            'Recepção',
            'Triagem',
            'Medicina',
            'Pós Consulta',
            'Área Médica'
          ]);
        });
      });
    });

    it('Validar retorno 401', () => {
      cy.request({
        method: 'GET',
        url: '/api/v1/setores', // URL do seu endpoint
        headers: {
          'Content-Type': 'application/json',
          // Não adicionar token de autenticação ou um token inválido
        },
        failOnStatusCode: false // Não fazer falhar o teste automaticamente em status 4xx ou 5xx
      }).then((response) => {
        // Verificar se o status é 401
        expect(response.status).to.eq(401);
      });
    });

  });
});


