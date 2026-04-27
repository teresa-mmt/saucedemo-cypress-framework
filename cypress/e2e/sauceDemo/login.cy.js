describe('Login Function Sauce Demo', () => {

    beforeEach(() => {
        cy.visit('/')
    })


    // ************************* Phase 1 - Core Critical Flow
    describe('Phase 1 - Core Critical Flow', () => {
        it('Verify login page loads successfully', () => {

            cy.get('[data-test="username"]')
                .should('be.visible')

            cy.get('[data-test="password"]')
                .should('be.visible')

            cy.get('[data-test="login-button"]')
                .should('be.visible')
        })


        it('verify valid login', () => {

            cy.loginSauce('standardUser') //custom command for  login

            cy.get('[data-test="title"]')
                .should('contain', 'Products')

            cy.checkInventoryPage()
        })


    })
    // ************************* END Phase 1 - Core Critical Flow






    // ************************* Phase 2 - Supporting Validation
    describe('Phase 2 - Supporting Validation', () => {

        it('verify invalid login', () => {
            cy.loginSauce('invalidUser')

            cy.url()
                .should('not.contain', '/inventory.html')

            cy.get('[data-test="error"]')
                .should('be.visible')
                .and('contain', 'do not match any user in this service')
        })



        it('verify locked user login', () => {
            cy.loginSauce('lockedUser')

            cy.url()
                .should('not.contain', '/inventory.html')

            cy.get('[data-test="error"]')
                .should('be.visible')
                .and('contain', 'locked out')
        })




        it('verify empty username login', () => {
            cy.loginSauce('emptyUsername')

            cy.url()
                .should('not.contain', '/inventory.html')

            cy.get('[data-test="error"]')
                .should('be.visible')
                .and('contain', 'Username is required')

        })


        it('verify empty password login', () => {

            cy.loginSauce('emptyPassword')

            cy.url()
                .should('not.contain', '/inventory.html')

            cy.get('[data-test="error"]')
                .should('be.visible')
                .and('contain', 'Password is required')
        })


    })
    // ************************* END Phase 2 - Supporting Validation







    // ************************* Phase 3 - Resilience / Extended Coverage
    describe('Phase 3 - Resilience / Extended Coverage', () => {

        it('Verify empty username and password submission is blocked', () => {

            cy.loginSauce('emptyLogin')

            cy.url()
                .should('not.contain', '/inventory.html')

            cy.get('[data-test="error"]')
                .should('be.visible')
                .and('contain', 'Username is required')
        })



        it('Verify retry after failed login works correctly', () => {

            // invalid login 1st try
            cy.loginSauce('invalidUser')

            cy.url()
                .should('eq', 'https://www.saucedemo.com/')

            cy.get('[data-test="error"]')
                .should('contain', 'Epic sadface')



            // valid login 2nd try
            cy.loginSauce('standardUser')

            cy.checkInventoryPage()

        })


        it('Verify error state updates correctly across repeated attempts', () => {

            // invalid login 1st try
            cy.loginSauce('invalidUser')

            cy.get('[data-test="error"]')
                .should('contain', 'Epic sadface')

            cy.url()
                .should('not.include', '/inventory.html')




            // invalid login 2nd try
            cy.loginSauce('emptyUsername')

            cy.get('[data-test="error"]')
                .should('contain', 'Epic sadface')

            cy.url()
                .should('not.include', '/inventory.html')


            // valid login 2nd try
            cy.loginSauce('standardUser')

            cy.checkInventoryPage()

        })



        it('Verify standard user can still log in after prior locked-user attempt', () => {

            // invalid login 1st try
            cy.loginSauce('lockedUser')

            cy.url()
                .should('not.include', '/inventory.html')

            cy.get('[data-test="error"]')
                .should('contain', 'Epic sadface')


            // valid login 2nd try
            cy.loginSauce('standardUser')

            cy.checkInventoryPage()

        })

    })
    // ************************* END Phase 3 - Resilience / Extended Coverage



})

