describe('Login using env (full flow)', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('logs in using selected environment', () => {

        // STEP 1: JS variable (just a selector, NOT data)
        const environment = 'dev'

        // STEP 2: Cypress fetches from config using the key
        cy.env([environment]).then((envData) => {

            // envData now contains:
            // {
            //   dev: {
            //     username: 'standard_user',
            //     password: 'secret_sauce'
            //   }
            // }

            // STEP 3: Extract using the variable as key
            const creds = envData[environment]

            // creds now becomes:
            // {
            //   username: 'standard_user',
            //   password: 'secret_sauce'
            // }

            // STEP 4: Use the extracted data
            cy.get('#user-name').type(creds.username)
            cy.get('#password').type(creds.password)

        })

        // STEP 5: Action
        cy.get('#login-button').click()

        // STEP 6: Validation
        cy.url().should('include', 'inventory')

    })

})