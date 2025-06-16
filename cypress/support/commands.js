// Comando de login - gera o token inicial
Cypress.Commands.add('login', () => {
  return cy.request({
    method: 'POST',
    url: '/api/v1/security/login',
    body: {
      email: 'ivan.santos+1@amorsaude.com',
      password: 'Iv@n198529'
    }
  }).then((response) => {
    // Salva o token inicial globalmente
    Cypress.env('access_token', response.body.access_token)
    return response
  })
})

// Comando de refresh token - atualiza o token
Cypress.Commands.add('refreshToken', () => {
  const token = Cypress.env('access_token')
  
  return cy.request({
    method: 'POST',
    url: '/api/v1/security/refresh-token?clinicId=483',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: {
      automated_test: 'automated_test'
    }
  }).then((response) => {
    // Atualiza o token com o novo token do refresh
    Cypress.env('access_token', response.body.access_token)
    return response
  })
})