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

// Gerador de CNPJ válido
Cypress.Commands.add('GeradorCnpj', () => {
  function gerarCnpj() {
    const rand = () => Math.floor(Math.random() * 10);
    const n = [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), 0, 0, 0, 1];

    const calcDv = (base, multiplicadores) => {
      const soma = base.reduce((acc, val, i) => acc + val * multiplicadores[i], 0);
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const dv1 = calcDv(n, [5,4,3,2,9,8,7,6,5,4,3,2]);
    const dv2 = calcDv([...n, dv1], [6,5,4,3,2,9,8,7,6,5,4,3,2]);

    return n.join('') + dv1 + dv2;
  }

  return cy.wrap(gerarCnpj());
});

