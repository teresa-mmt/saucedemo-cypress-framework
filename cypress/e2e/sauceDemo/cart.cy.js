describe('Cart Function Sauce Demo', () => {

    beforeEach(() => {
        cy.visit('/')

        cy.loginSauce('standardUser')
    })


    // ************************* Phase 1 - Core Critical Flow
    describe('Phase 1 - Core Critical Flow', () => {


        it('verify cart page opens successfully', () => {

    
            cy.checkInventoryPage()

            cy.addSingleItemToCart()


            // open cart page
            cy.openCartPage()

            cy.url()
                .should('contain', '/cart.html')

            cy.get('[data-test="title"]')
                .should('have.text', 'Your Cart')


        })


        it('verify selected product (first item) appears in cart', () => {
          

            cy.checkInventoryPage()

            cy.addSingleItemToCart() //first item to be added
                .then((itemName) => {

                    // open cart page
                    cy.openCartPage()
                    cy.url()
                        .should('contain', '/cart.html')

                    //cart item row is visible
                    cy.get('[data-test="inventory-item"]')
                        .should('be.visible')

                    //selected product exists inside cart
                    cy.get('[data-test="inventory-item"]')
                        .first()
                        .find('[data-test="inventory-item-name"]')
                        .should('contain', itemName)

                })

        })




        it('verify correct product name (first item) is shown', () => {

            cy.checkInventoryPage()

            cy.addSingleItemToCart()  //first item to be added
                .then((itemName) => {

                    // open cart page
                    cy.openCartPage()
                    cy.url()
                        .should('contain', '/cart.html')

                    // product name matches expected item
                    cy.get('[data-test="inventory-item"]')
                        .first()
                        .find('[data-test="inventory-item-name"]')
                        .invoke('text')
                        .should('equal', itemName)

                })
        })

    })
    // ************************* END Phase 1 - Core Critical Flow





    // ************************* Phase 2 — Supporting Validation
    describe('Phase 2 — Supporting Validation', () => {

        it('verify remove product from cart works', () => {


            cy.checkInventoryPage()

            cy.addSingleItemToCart()

            cy.openCartPage()

            cy.removeSingleItemFromCartPage()

            //removed item no longer exists
            cy.get('[data-test="inventory-item"]')
                .should('not.exist')

            //cart state updates correctly
            cy.get('[data-test="shopping-cart-badge"]')
                .should('not.exist')


        })





        it('verify checkout button opens checkout page', () => {

            cy.checkInventoryPage()

            cy.addSingleItemToCart()

            cy.openCartPage()

            //checkout page loads
            cy.openCheckOutPage()

            cy.url()
                .should('contain', '/checkout-step-one.html')

            //checkout form fields are visible
            cy.get('.checkout_info_wrapper')
                .find('form')
                .should('be.visible')

        })


        it('verify continue shopping returns user to inventory', () => {

            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
            cy.get('[data-test="shopping-cart-link"]').click()

            cy.get('[data-test="continue-shopping"]').click()

            cy.url().should('include', '/inventory.html')
            cy.get('[data-test="inventory-list"]').should('be.visible')
        })


    })
    // ************************* END Phase 2 — Supporting Validation




    // ************************* Phase 3 — Resilience / Extended Coverage
    describe('Phase 3 — Resilience / Extended Coverage', () => {

        it('verify multiple cart items display correctly', () => {
    
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
            cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
            cy.get('[data-test="shopping-cart-link"]').click()

            cy.get('[data-test="inventory-item"]').should('have.length', 2)

            cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
                .should('be.visible')

            cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bike Light')
                .should('be.visible')
        })




        it('verify removing one of several cart items updates cart correctly', () => {

            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
            cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
            cy.get('[data-test="shopping-cart-link"]').click()

            cy.get('[data-test="remove-sauce-labs-backpack"]').click()

            cy.get('[data-test="inventory-item"]').should('have.length', 1)

            cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
                .should('not.exist')

            cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Bike Light')
                .should('be.visible')
        })



        it('verify cart remains accurate after navigation loops', () => {

            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
            cy.get('[data-test="shopping-cart-link"]').click()

            cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
                .should('be.visible')

            cy.get('[data-test="continue-shopping"]').click()
            cy.url().should('include', '/inventory.html')

            cy.get('[data-test="shopping-cart-link"]').click()

            cy.get('[data-test="inventory-item"]').should('have.length', 1)

            cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
                .should('be.visible')
        })

    })
    // ************************* END Phase 3 — Resilience / Extended Coverage















})