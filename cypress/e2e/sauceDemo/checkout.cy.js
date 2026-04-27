describe('Checkout Information Sauce Demo', () => {

    beforeEach(() => {
        cy.visit('/')

        cy.loginSauce('standardUser')

        cy.checkInventoryPage()
    })



    // *********************** Phase 1 - Core Critical Flow **************
    describe('Phase 1 - Core Critical Flow', () => {

        it('verify Checkout page opens successfully', () => {

            cy.addSingleItemToCart()
            cy.openCartPage()
            cy.openCheckOutPage()

            cy.url()
                .should('contain', '/checkout-step-one')

            cy.get('[data-test="title"]')
                .should('be.visible')
                .and('have.text', 'Checkout: Your Information')

            cy.get('.checkout_info')
                .find('[data-test="firstName"]')
                .should('exist')
                .and('be.visible')

            cy.get('.checkout_info')
                .find('[data-test="lastName"]')
                .should('exist')
                .and('be.visible')

            cy.get('.checkout_info')
                .find('[data-test="postalCode"]')
                .should('exist')
                .and('be.visible')

            cy.get('[data-test="continue"]')
                .should('exist')
                .and('be.visible')

            cy.get('[data-test="cancel"]')
                .should('exist')
                .and('be.visible')
        })



        it('verify Valid checkout information proceeds to Overview page', () => {

            cy.addSingleItemToCart()
            cy.openCartPage()
            cy.openCheckOutPage()

            cy.reachCheckoutOverview()

            cy.url()
                .should('contain', '/checkout-step-two')

            cy.get('[data-test="title"]')
                .should('be.visible')
                .and('have.text', 'Checkout: Overview')
        })



        it('verify User can finish checkout from overview page', () => {

            cy.addSingleItemToCart()
            cy.openCartPage()
            cy.openCheckOutPage()

            cy.reachCheckoutOverview()

            cy.get('[data-test="finish"]')
                .should('be.visible')
                .click()

            cy.url()
                .should('contain', '/checkout-complete')

            cy.get('[data-test="title"]')
                .should('have.text', 'Checkout: Complete!')
        })



        it('verify Complete checkout flow end-to-end', () => {

            cy.addSingleItemToCart()
            cy.openCartPage()
            cy.openCheckOutPage()

            cy.reachCheckoutOverview()

            cy.get('[data-test="finish"]')
                .click()

            cy.url()
                .should('contain', '/checkout-complete')

            cy.get('[data-test="complete-header"]')
                .should('be.visible')
                .and('contain', 'Thank you for your order!')

            cy.get('[data-test="complete-text"]')
                .should('be.visible')
                .and('contain', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
        })

    })
    // *********************** END Phase 1 - Core Critical Flow **************





    // *********************** Phase 2 — Supporting Validation **************
    describe('Phase 2 — Supporting Validation', () => {

        it('verify Cancel button returns user to cart', () => {

            cy.addSingleItemToCart()
            cy.openCartPage()
            cy.openCheckOutPage()

            cy.get('[data-test="cancel"]')
                .should('be.visible')
                .click()

            cy.url()
                .should('contain', '/cart')

            cy.get('[data-test="title"]')
                .should('have.text', 'Your Cart')
        })



        it('verify Cancel from overview returns to inventory page correctly', () => {

            cy.addSingleItemToCart()
            cy.openCartPage()
            cy.openCheckOutPage()

            cy.reachCheckoutOverview()

            cy.get('[data-test="cancel"]')
                .should('be.visible')
                .click()

            cy.url()
                .should('contain', '/inventory')

            cy.get('[data-test="title"]')
                .should('have.text', 'Products')
        })



        it('verify Empty form shows validation error', () => {

            cy.addSingleItemToCart()
            cy.openCartPage()
            cy.openCheckOutPage()

            cy.enterCheckOutInfo('emptyCheckoutCustomer')

            cy.continueCheckout()

            cy.get('[data-test="error"]')
                .should('be.visible')
                .and('contain', 'Error: First Name is required')

            cy.url()
                .should('contain', '/checkout-step-one')
        })



        it('verify Missing first name shows validation error', () => {

            cy.addSingleItemToCart()
            cy.openCartPage()
            cy.openCheckOutPage()

            cy.enterCheckOutInfo('noFirstNameCustomer')

            cy.continueCheckout()

            cy.get('[data-test="error"]')
                .should('be.visible')
                .and('contain', 'Error: First Name is required')

            cy.url()
                .should('contain', '/checkout-step-one')
        })



        it('verify Missing last name shows validation error', () => {

            cy.addSingleItemToCart()
            cy.openCartPage()
            cy.openCheckOutPage()

            cy.enterCheckOutInfo('noLastNameCustomer')

            cy.continueCheckout()

            cy.get('[data-test="error"]')
                .should('be.visible')
                .and('contain', 'Error: Last Name is required')

            cy.url()
                .should('contain', '/checkout-step-one')
        })



        it('verify Missing postal code shows validation error', () => {

            cy.addSingleItemToCart()
            cy.openCartPage()
            cy.openCheckOutPage()

            cy.enterCheckOutInfo('noPostalCustomer')

            cy.continueCheckout()

            cy.get('[data-test="error"]')
                .should('be.visible')
                .and('contain', 'Error: Postal Code is required')

            cy.url()
                .should('contain', '/checkout-step-one')
        })

    })
    // *********************** END Phase 2 — Supporting Validation **************





    // *********************** Phase 3 — Resilience / Extended Coverage **************
    describe('Phase 3 — Resilience / Extended Coverage', () => {

        it('verify multi-item checkout flow completes successfully', () => {

            // Add 2 products for realistic checkout state
            cy.addMultipleItemsToCart(2)

            // Open cart
            cy.openCartPage()

            // Verify cart has 2 items
            cy.get('[data-test="inventory-item"]')
                .should('have.length', 2)

            // Proceed to checkout
            cy.openCheckOutPage()

            // Fill valid checkout information and continue to overview
            cy.reachCheckoutOverview()

            // Verify overview still has 2 items
            cy.get('[data-test="inventory-item"]')
                .should('have.length', 2)

            // Finish checkout
            cy.get('[data-test="finish"]')
                .should('be.visible')
                .click()

            // Verify checkout complete page
            cy.url()
                .should('contain', '/checkout-complete')

            cy.get('[data-test="complete-header"]')
                .should('contain', 'Thank you for your order!')
        })



        it('verify all selected multi-item products appear in overview', () => {

            // Add 2 products
            cy.addMultipleItemsToCart(2)

            // Open cart
            cy.openCartPage()

            // Proceed to checkout
            cy.openCheckOutPage()

            // Continue to overview
            cy.reachCheckoutOverview()

            // Verify 2 product names appear in overview
            cy.get('[data-test="inventory-item-name"]')
                .should('have.length', 2)

            // Verify overview has exactly 2 product containers
            cy.get('[data-test="inventory-item"]')
                .should('have.length', 2)
        })



        it('verify removing one item before checkout affects final order correctly', () => {

            // Add 2 products
            cy.addMultipleItemsToCart(2)

            // Open cart
            cy.openCartPage()

            // Remove 1 product
            cy.removeSingleItemFromCartPage()

            // Verify only 1 product remains in cart
            cy.get('[data-test="inventory-item"]')
                .should('have.length', 1)

            // Proceed to checkout
            cy.openCheckOutPage()

            // Continue to overview
            cy.reachCheckoutOverview()

            // Verify overview also has only 1 item
            cy.get('[data-test="inventory-item"]')
                .should('have.length', 1)

            // Finish checkout
            cy.get('[data-test="finish"]')
                .click()

            // Verify checkout completes
            cy.url()
                .should('contain', '/checkout-complete')
        })





        it('verify totals remain correct across more complex checkout state', () => {

            // Add 2 products
            cy.addMultipleItemsToCart(2)

            // Open cart
            cy.openCartPage()

            // Proceed to checkout
            cy.openCheckOutPage()

            // Continue to overview
            cy.reachCheckoutOverview()

            let itemTotal = 0
            let tax = 0
            let finalTotal = 0

            // Get item total amount
            cy.get('[data-test="subtotal-label"]')
                .should('be.visible')
                .invoke('text')
                .then((text) => {
                    itemTotal = Number(text.replace('Item total: $', ''))
                })

            // Get tax amount
            cy.get('[data-test="tax-label"]')
                .should('be.visible')
                .invoke('text')
                .then((text) => {
                    tax = Number(text.replace('Tax: $', ''))
                })

            // Get final total amount
            cy.get('[data-test="total-label"]')
                .should('be.visible')
                .invoke('text')
                .then((text) => {
                    finalTotal = Number(text.replace('Total: $', ''))
                })

            // Validate computation: item total + tax = final total
            cy.then(() => {
                expect(itemTotal + tax).to.eq(finalTotal)
            })
        })

    })
    // *********************** END Phase 3 — Resilience / Extended Coverage **************

})