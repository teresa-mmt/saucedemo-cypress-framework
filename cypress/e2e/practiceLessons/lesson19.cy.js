describe('Practice cypress env', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    ////////////////// Valid Login Test
    it.only('logs in using env with valid crendetials', () => {

        //check if it can login
        cy.env(['username', 'password']).then((data) => {
            cy.get('#user-name')
                .type(data.username)

            cy.get('#password')
                .type(data.password)

        })
        cy.get('#login-button').click()

        //check the page after logging in if the url has 'inventory' text
        cy.url()
            .should('include', 'inventory')


        //check the page after logging in if it has inventory list visible in page
        cy.get('.inventory_list')
            .should('be.visible')
    })




    //////////////////Inalid Login Test - Incorrect Password
    it('logs using env with invalid password', () => {

        cy.env(['username', 'password']).then((data) => {
            cy.get('#user-name').type(data.username)
            cy.get('#password').type('wala')
        })

        cy.get('#login-button').click()

        //check if error message has shown
        cy.get('.error-message-container')
        .should('be.visible')

    })

})