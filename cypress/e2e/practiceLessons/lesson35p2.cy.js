describe('Sauce Demo Login using CSV test data', () => {
  it('logs in with multiple users from CSV', () => {
    cy.fixture('users.csv').then((csvText) => {
      const lines = csvText.trim().split('\n')

      const users = lines.slice(1).map((line) => {
        const values = line
          .split(',')
          .map((value) => value.replace('\r', '').trim())

        return {
          username: values[0],
          password: values[1],
          expectedUrl: values[2]
        }
      })

      users.forEach((user) => {
        cy.visit('https://www.saucedemo.com/')

        cy.get('[data-test="username"]').type(user.username)
        cy.get('[data-test="password"]').type(user.password)
        cy.get('[data-test="login-button"]').click()

        cy.url().should('include', user.expectedUrl)
      })
    })
  })
})