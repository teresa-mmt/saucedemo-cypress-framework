// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })




//Project One - Sauce Demo

//**
// custom command - login for sauce demo
// userType - String parameter refers to users.json 
// standardUser, lockedUser or invalidUser*/
Cypress.Commands.add('loginSauce', (userType) => {
    cy.fixture("sauceDemo/users")
        .then((userData) => {

            //If username exists → type it
            //If username is empty → skip typing
            // avoid the error since Cypress does not allow typing an empty string for type()
            if (userData[userType].username) {
                cy.get('[data-test="username"]')
                    .clear()
                    .type(userData[userType].username)
            }

            if (userData[userType].password) {
                cy.get('[data-test="password"]')
                    .clear()
                    .type(userData[userType].password)
            }

            cy.get('[data-test="login-button"]').click()
        })
})


// **********************************************
// custom command - INVENTORY page/
//
Cypress.Commands.add('checkInventoryPage', () => {
    cy.url()
        .should('contain', '/inventory.html')

    cy.get('[data-test="title"]')
        .should('contain', 'Products')

    cy.get('[data-test="inventory-item"]')
        .should('be.visible')
        .and('have.length.greaterThan', 0)
})





// **/
// add single item to cart (1st item)
Cypress.Commands.add('addSingleItemToCart', () => {

    let itemName = ''

    cy.get('[data-test="inventory-item"]')
        .first()
        .find('[data-test="inventory-item-name"]')
        .then(($el) => {
            itemName = $el.text()
            // console.log(itemName)
        })


    cy.get('[data-test="inventory-item"]')
        .first()
        .find('[data-test="inventory-item-description"]')
        .contains('button', 'Add to cart')
        .click()

    cy.then(() => {
        return cy.wrap(itemName)
    })

})



// **/
// remove single item to cart Inventory Page
Cypress.Commands.add('removeSingleItemFromInventoryPage', () => {
    cy.get('[data-test="inventory-item"]')
        .first()
        .find('[data-test="inventory-item-description"]')
        .children('.pricebar')
        .contains('button', 'Remove')
        .click()
})




//**
// add multiple products from inventory page to the cart
// count - number parameter starting  from 1*/
Cypress.Commands.add('addMultipleItemsToCart', (count) => {

    const itemNames = []

    cy.get('[data-test="inventory-item"]')
        .each(($item, index) => {
            if (index < count) {

                cy.wrap($item)
                    .find('[data-test="inventory-item-name"]')
                    .then(($el) => {
                        const itemName = $el.text()
                        itemNames.push(itemName) // add each item name to  itemNames array
                    })


                cy.wrap($item)
                    .find('.pricebar')
                    .contains('button', 'Add to cart')
                    .click()
            }
        })


    cy.then(() => {
        return cy.wrap(itemNames)
    })

})









//**
// remove multiple products from inventory page to the cart
// count - number parameter starting  from 1*/
Cypress.Commands.add('removeMultipleItemsFromInventoryPage', (count) => {
    cy.get('[data-test="inventory-item"]')
        .each(($item, index) => {
            if (index < count) {
                cy.wrap($item)
                    .find('.pricebar')
                    .contains('button', 'Remove')
                    .click()
            }

        })

})




// **********************************************************************
// custom command - CART page/
//
Cypress.Commands.add('openCartPage', () => {
    cy.get('[data-test="shopping-cart-link"]')
        .click()
})

// **/
// remove single item to cart Cart Page
Cypress.Commands.add('removeSingleItemFromCartPage', () => {
    cy.get('[data-test="inventory-item"]')
        .first()
        .find('.item_pricebar')
        .contains('button', 'Remove')
        .click()
})









// **********************************************************************
// custom command - CHECKOUT page/
//
// open check out page
Cypress.Commands.add('openCheckOutPage', () => {
    cy.get('[data-test="checkout"]')
        .click()
})


// enter check out information 
// customerType - String parameter refers to checkout.json 
Cypress.Commands.add('enterCheckOutInfo', (customerType) => {

    cy.fixture("sauceDemo/checkout")
        .then((customerData) => {

            //If first name exists → type it
            //If first name  is empty → skip typing
            // avoid the error since Cypress does not allow typing an empty string for type()

            if (customerData[customerType].firstName) {
                //first name field
                cy.get('.checkout_info')
                    .find('[data-test="firstName"]')
                    .type(customerData[customerType].firstName)
            }


            if (customerData[customerType].lastName) {
                //last name field 
                cy.get('.checkout_info')
                    .find('[data-test="lastName"]')
                    .type(customerData[customerType].lastName)
            }

            if (customerData[customerType].postalCode) {
                //postal code field 
                cy.get('.checkout_info')
                    .find('[data-test="postalCode"]')
                    .type(customerData[customerType].postalCode)
            }

        })

})



// continue check out going to step two
// customerType - String parameter refers to checkout.json 
Cypress.Commands.add('continueCheckout', () => {
    // click continue and redirect to step two
    cy.get('[data-test="continue"]')
        .click()
})



// reaches checkout overview page using valid customer information
// ensures user successfully passes checkout step one
// and lands on Checkout: Overview page
Cypress.Commands.add('reachCheckoutOverview', () => {

    cy.enterCheckOutInfo('validCustomer')

    cy.continueCheckout()

})











// **********************************************************************
// custom command - NAVIGATION and SESSION/
//

//open burger/sidebar menu
Cypress.Commands.add('openSideBarMenu', () => {

    cy.get('#react-burger-menu-btn')
        .should('be.visible')
        .click()

    cy.get('.bm-menu-wrap')
        .should('be.visible')
        .and('have.attr', 'aria-hidden', 'false')

    cy.get('[data-test="logout-sidebar-link"]')
        .should('be.visible')
})

//logout
Cypress.Commands.add('userLogout', () => {

    cy.get('.bm-menu-wrap')
        .should('be.visible')
        .and('have.attr', 'aria-hidden', 'false')

    cy.get('[data-test="logout-sidebar-link"]')
        .should('be.visible')
        .click()

    cy.url()
        .should('eq', 'https://www.saucedemo.com/')

    cy.get('[data-test="login-container"]')
        .should('be.visible')
})