/// <reference types= "cypress" />

describe('Login', () => {

  it('Validar retorno 200 - /api/v1/security/login', () => {
    cy.request({
      method: 'POST',
      url: '/api/v1/security/login',
      body: {
        email: 'ivan.santos+1@amorsaude.com',
        password: 'Iv@n198529'
      },
      failOnStatusCode: false // normalmente esse cod refere-se a uma api pra nao dar erro de false
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('access_token')

      cy.log('ID:', response.body.id)
      cy.log('Email:', response.body.email)
      cy.log('Name:', response.body.name)
      cy.log('access_token:', response.body.access_token)
    })
  })

  it('Validar retorno 400 - /api/v1/security/login', () => {
    cy.request({
      method: 'POST',
      url: '/api/v1/security/login',
      body: {
        email: 'ivan.santos+drbarros@amorsaude.com',
        password: 'Iv@xxxxxx'
      },
      failOnStatusCode: false // normalmente esse cod refere-se a uma api pra nao dar erro de false
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('Validar retorno 401 - /api/v1/security/login', () => {
    cy.request({
      method: 'POST',
      url: '/api/v1/security/login',
      body: {
        email: 'ivan.santos+5454541@amorsaude.com',
        password: 'Iv@n198529'
      },
      failOnStatusCode: false // normalmente esse cod refere-se a uma api pra nao dar erro de false
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

  it('Validar retorno 403 - /api/v1/security/login', () => {
    cy.request({
      method: 'GET',
      url: '/api/v1/security/login',
      body: {
        email: 'ivan.santos+1@amorsaude.com',
        password: ''
      },
      failOnStatusCode: false // normalmente esse cod refere-se a uma api pra nao dar erro de false
    }).then((response) => {
      expect(response.status).to.eq(403)
    })
  })

  it('Validar retorno 404 - /api/v1/security/login', () => {
    cy.request({
      method: 'PATCH',
      url: '/api/v1/security/login',
      body: {
        email: 'ivan.santos+1@amorsaude.com',
        password: 'Iv@n198529'
      },
      failOnStatusCode: false // normalmente esse cod refere-se a uma api pra nao dar erro de false
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })

});
