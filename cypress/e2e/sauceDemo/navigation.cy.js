describe('Navigation & State Management Sauce Demo', () => {

    beforeEach(() => {

        cy.visit('/')

        cy.loginSauce('standardUser')

    })


    // ************************** Phase 1 — Core Critical Flow
    describe('Phase 1 — Core Critical Flow', () => {

        it('Verify burger menu opens successfully', () => {

            //open sidebar
            cy.openSideBarMenu()

            // sidebar becomes visible
            cy.get('.bm-menu-wrap')
                .should('have.attr', 'aria-hidden', 'false')

            cy.get('.bm-item-list')
                .children('a')
                .should('not.have.attr', 'tabindex')

        })


        it('Verify user can log out successfully', () => {

            //open sidebar
            cy.openSideBarMenu()

            //logout option is visible
            cy.get('[data-test="logout-sidebar-link"]')
                .should('be.visible')

            // user logs out
            cy.userLogout()


        })

    })
    // ************************** END Phase 1 — Core Critical Flow






    // ************************** Phase 2 — Supporting Validation
    describe('Phase 2 — Supporting Validation', () => {

        it('Verify sidebar options are visible after opening menu', () => {

            //open sidebar
            cy.openSideBarMenu()

            //All Items is visible
            cy.get('[data-test="inventory-sidebar-link"]')
                .should('be.visible')
                .and('have.text', 'All Items')

            //About is visible
            cy.get('[data-test="about-sidebar-link"]')
                .should('be.visible')
                .and('have.text', 'About')

            //Logout is visible
            cy.get('[data-test="logout-sidebar-link"]')
                .should('be.visible')
                .and('have.text', 'Logout')

            //Reset App State is visible
            cy.get('[data-test="reset-sidebar-link"]')
                .should('be.visible')
                .and('have.text', 'Reset App State')

        })


        it('Verify user remains out of authenticated page after logout', () => {

            //open sidebar
            cy.openSideBarMenu()

            // user logs out
            cy.userLogout()

            //inventory page content is absent
            cy.get('[data-test="inventory-container"]')
                .should('not.exist')

        })



        it('Verify logout works after prior inventory interaction', () => {

            cy.addSingleItemToCart()

            //open sidebar
            cy.openSideBarMenu()

            // user logs out
            cy.userLogout()

            //inventory page content is absent
            cy.get('[data-test="inventory-container"]')
                .should('not.exist')

        })

    })
    // ************************** END Phase 2 — Supporting Validation





    // ************************** Phase 3 — Resilience / Extended Coverage
    describe('Phase 3 — Resilience / Extended Coverage', () => {

        it('Verify repeated menu open behavior remains stable', () => {

            const clickCountSidebar = 3

            for (let i = 1; i <= clickCountSidebar; i++) {

                //open sidebar
                cy.openSideBarMenu()

                //All Items is visible
                cy.get('[data-test="inventory-sidebar-link"]')
                    .should('be.visible')
                    .and('have.text', 'All Items')

                //About is visible
                cy.get('[data-test="about-sidebar-link"]')
                    .should('be.visible')
                    .and('have.text', 'About')

                //Logout is visible
                cy.get('[data-test="logout-sidebar-link"]')
                    .should('be.visible')
                    .and('have.text', 'Logout')

                //Reset App State is visible
                cy.get('[data-test="reset-sidebar-link"]')
                    .should('be.visible')
                    .and('have.text', 'Reset App State')

                // close sidebar menu
                cy.get('#react-burger-cross-btn')
                    .click()

            }
        })




        it('Verify reset app state option is visible and accessible', () => {

            //add item to cart
            cy.addSingleItemToCart()

            //open sidebar
            cy.openSideBarMenu()

            //Reset App State is visible
            cy.get('[data-test="reset-sidebar-link"]')
                .should('be.visible')
                .and('have.text', 'Reset App State')


            cy.get('[data-test="shopping-cart-badge"]')
                .should('be.visible')
                .and('have.text', String(1))


            // reset button is interactable
            cy.get('[data-test="reset-sidebar-link"]')
                .click()

            // reset the count cart badge to none
            cy.get('[data-test="shopping-cart-badge"]')
                .should('not.exist')

        })


        it('Verify logout from Navigation Page without item in cart', () => {

            cy.checkInventoryPage()
            cy.openSideBarMenu()
            cy.userLogout()

        })



        it('verify logout from Navigation Page with single item in cart', () => {
            // logout from Navigation Page with single item in cart
            cy.checkInventoryPage()
            cy.addSingleItemToCart()
            cy.openSideBarMenu()
            cy.userLogout()
        })



        it('verify logout from Cart Page without single item in cart', () => {
            cy.openCartPage()
            cy.openSideBarMenu()
            cy.userLogout()
        })



        it('verify logout from Cart Page with single item in cart', () => {
            cy.addSingleItemToCart()
            cy.openCartPage()
            cy.openSideBarMenu()
            cy.userLogout()
        })


        it('verify logout from Checkout Info Page without item and without entering customer info', () => {
            cy.openCartPage()
            cy.openCheckOutPage()
            cy.openSideBarMenu()
            cy.userLogout()
        })


        it('verify logout from Checkout Info Page with item and with entering valid customer info', () => {
            cy.addSingleItemToCart()
            cy.openCartPage()
            cy.openCheckOutPage()
            cy.enterCheckOutInfo('validCustomer')
            cy.openSideBarMenu()
            cy.userLogout()
        })


        it.only('verify logout from Checkout Info Page with item and with entering error customer info', () => {
            cy.addSingleItemToCart()
            cy.openCartPage()
            cy.openCheckOutPage()
            cy.enterCheckOutInfo('noFirstNameCustomer')
            cy.openSideBarMenu()
            cy.userLogout()

        })


        it('logout from Checkout Overview Page with item and with entering valid customer info', () => {
            cy.addSingleItemToCart()
            cy.openCartPage()
            cy.openCheckOutPage()
            cy.reachCheckoutOverview()
            cy.openSideBarMenu()
            cy.userLogout()

        })

    })
    // ************************** END Phase 3 — Resilience / Extended Coverage



})