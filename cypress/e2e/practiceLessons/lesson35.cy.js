describe('Sauce Demo Login using JSON test data', () => {
  it('logs in with multiple users from JSON', () => {
    cy.fixture('users.json').then((users) => {
      users.forEach((user) => {
        cy.visit('https://www.saucedemo.com/')

        cy.get('[data-test="username"]').type(user.username)
        cy.get('[data-test="password"]').type(user.password)
        cy.get('[data-test="login-button"]').click()

        cy.url().should('include', user.expectedUrl)

        cy.visit('https://www.saucedemo.com/')
      })
    })
  })
})