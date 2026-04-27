describe('Inventory Function Sauce Demo', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.loginSauce('standardUser')
    })



    // ************************* Phase 1 — Core Critical Flow
    describe('Phase 1 — Core Critical Flow', () => {


        it('verify inventory page loads', () => {

            cy.checkInventoryPage()

        })



        it('verify add one product updates cart badge', () => {

            cy.checkInventoryPage()


            // Add one product and display 1 count
            cy.addSingleItemToCart()

            cy.get('[data-test="shopping-cart-badge"]')
                .should('be.visible')
                .and('have.text', String(1))

        })



        it('verify product button changes to Remove after adding', () => {


            cy.checkInventoryPage()

            // Add one product (first  item) and display 1 count
            cy.addSingleItemToCart()


            cy.get('[data-test="inventory-item-description"]')
                .first()
                .find('.pricebar')
                .children('.btn_inventory')
                .should('be.visible')
                .and('contain', 'Remove')


        })



        it('verify remove one product', () => {


            cy.checkInventoryPage()

            // Add one product and display 1 count
            cy.addSingleItemToCart()

            cy.get('[data-test="shopping-cart-badge"]')
                .should('be.visible')
                .and('have.text', String(1))


            //remove product
            cy.removeSingleItemFromInventoryPage()


            //after removing, the button goes back to Add to cart and no cart count
            cy.get('[data-test="inventory-list"]')
                .find('[data-test="inventory-item-description"]')
                .children('.pricebar')
                .contains('button', 'Add to cart')
                .should('be.visible')

            cy.get('[data-test="shopping-cart-badge"]')
                .should('not.exist')

        })

    })
    // ************************* END Phase 1 — Core Critical Flow








    // ************************* Phase 2 — Supporting Validation
    describe('Phase 2 — Supporting Validation', () => {


        it('Verify all inventory products are displayed', () => {

            cy.checkInventoryPage()

            cy.fixture("sauceDemo/products")
                .then((productData) => {

                    const countProductJSON = productData.inventoryProducts.length

                    //get the inventory-item in html
                    cy.get('[data-test="inventory-item"]')
                        .each(($product, index) => {

                            // verify the product name
                            cy.wrap($product)
                                .find('[data-test="inventory-item-name"]')
                                .then(($el) => {
                                    const productName = $el.text()

                                })

                        })


                    // expected product count is correct (count the element and count the product length of json)
                    cy.get('[data-test="inventory-item"]')
                        .should('have.length', countProductJSON)

                })


        })





        it('Verify product card details display correctly', () => {

            cy.checkInventoryPage()


            //get the inventory-item in html
            cy.get('[data-test="inventory-item"]')
                .each(($product, index) => {

                    // verify the product name
                    cy.wrap($product)
                        .find('[data-test="inventory-item-name"]')
                        .should('be.visible')

                    // verify the product description
                    cy.wrap($product)
                        .find('[data-test="inventory-item-desc"]')
                        .should('be.visible')

                    // verify the product price
                    cy.wrap($product)
                        .find('[data-test="inventory-item-price"]')
                        .should('be.visible')

                    // verify the product price
                    cy.wrap($product)
                        .find('.btn_inventory ')
                        .should('be.visible')

                })

        })




        // MULTIPLE ITEMS IN CART ADD and REMOVE
        const countItem = 5 //global value

        it('verify add multiple products', () => {

            cy.checkInventoryPage()

            //add multiple  items
            cy.addMultipleItemsToCart(countItem)

            cy.get('[data-test="shopping-cart-badge"]')
                .should('be.visible')
                .and('have.text', String(countItem))
        })




        it('Verify removing one of multiple selected products updates badge correctly', () => {

            cy.checkInventoryPage()

            //add multiple  items
            cy.addMultipleItemsToCart(countItem)


            //remove single item
            cy.removeSingleItemFromInventoryPage()

            cy.get('[data-test="shopping-cart-badge"]')
                .should('be.visible')
                .and('have.text', String(countItem - 1))

        })



        it('Verify sorting by Name (A to Z) works correctly', () => {

            cy.get('.product_sort_container')
                .select('az')

            cy.get('.inventory_item_name')
                .then(($items) => {

                    const actualNames = [...$items].map(item =>
                        item.innerText.trim()
                    )

                    console.log(actualNames)

                    const sortedNames = [...actualNames].sort()

                    console.log(sortedNames)

                    expect(actualNames).to.deep.equal(sortedNames)

                })

        })




        it('Verify sorting by Name (Z to A) works correctly', () => {
            cy.get('.product_sort_container')
                .select('za')

            cy.get('.inventory_item_name')
                .then(($items) => {
                    const actualNames = [...$items].map(item =>
                        item.innerText.trim()
                    )

                    const sortedNames = [...actualNames].sort().reverse()

                    expect(actualNames).to.deep.equal(sortedNames)
                })
        })





        it('Verify sorting by Price (low to high) works correctly', () => {

            cy.get('.product_sort_container')
                .select('lohi')

            cy.get('.inventory_item_price')
                .then(($prices) => {

                    console.log($prices)

                    const actualPrices = [...$prices].map(price =>
                        Number(price.innerText.replace('$', '').trim())
                    )

                    console.log(actualPrices)

                    const sortedPrices = [...actualPrices].sort((a, b) => a - b)



                    console.log(sortedPrices)

                    expect(actualPrices).to.deep.equal(sortedPrices)

                })

        })


        it('Verify sorting by Price (high to low) works correctly', () => {
            cy.get('.product_sort_container')
                .select('hilo')

            cy.get('.inventory_item_price')
                .then(($prices) => {
                    const actualPrices = [...$prices].map(price =>
                        Number(price.innerText.replace('$', '').trim())
                    )

                    const sortedPrices = [...actualPrices].sort((a, b) => b - a)

                    expect(actualPrices).to.deep.equal(sortedPrices)
                })
        })






    })
    // ************************* END Phase 2 — Supporting Validation








    // ************************* Phase 3 — Resilience / Extended Coverage
    describe('Phase 3 — Resilience / Extended Coverage', () => {

         const countItem = 5 //global value

        it('verify remove multiple products', () => {


            cy.checkInventoryPage()

            //add multiple  items
            cy.addMultipleItemsToCart(countItem)

            //remove multiple  items
            cy.removeMultipleItemsFromInventoryPage(countItem)

            cy.get('[data-test="shopping-cart-badge"]')
                .should('not.exist')
        })
        // END MULTIPLE ITEMS IN CART ADD and REMOVE






        it('Verify selected inventory state remains correct after page refresh', () => {
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
            cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

            cy.get('.shopping_cart_badge')
                .should('be.visible')
                .and('have.text', '2')

            cy.reload()

            cy.get('[data-test="remove-sauce-labs-backpack"]')
                .should('be.visible')
                .and('have.text', 'Remove')

            cy.get('[data-test="remove-sauce-labs-bike-light"]')
                .should('be.visible')
                .and('have.text', 'Remove')

            cy.get('.shopping_cart_badge')
                .should('be.visible')
                .and('have.text', '2')
        })




        it('Verify selected inventory state remains correct after navigation loop', () => {
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
            cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

            cy.get('.shopping_cart_badge')
                .should('be.visible')
                .and('have.text', '2')

            cy.get('.shopping_cart_link').click()

            cy.url().should('include', '/cart.html')

            cy.get('[data-test="continue-shopping"]').click()

            cy.url().should('include', '/inventory.html')

            cy.get('[data-test="remove-sauce-labs-backpack"]')
                .should('be.visible')
                .and('have.text', 'Remove')

            cy.get('[data-test="remove-sauce-labs-bike-light"]')
                .should('be.visible')
                .and('have.text', 'Remove')

            cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
                .should('be.visible')
                .and('have.text', 'Add to cart')

            cy.get('.shopping_cart_badge')
                .should('be.visible')
                .and('have.text', '2')
        })




        it('Verify repeated add/remove on the same product remains stable', () => {
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
                .should('be.visible')
                .and('have.text', 'Add to cart')
                .click()

            cy.get('[data-test="remove-sauce-labs-backpack"]')
                .should('be.visible')
                .and('have.text', 'Remove')

            cy.get('.shopping_cart_badge')
                .should('be.visible')
                .and('have.text', '1')

            cy.get('[data-test="remove-sauce-labs-backpack"]').click()

            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
                .should('be.visible')
                .and('have.text', 'Add to cart')

            cy.get('.shopping_cart_badge')
                .should('not.exist')

            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

            cy.get('[data-test="remove-sauce-labs-backpack"]')
                .should('be.visible')
                .and('have.text', 'Remove')

            cy.get('.shopping_cart_badge')
                .should('be.visible')
                .and('have.text', '1')
        })
    })
    // ************************* END Phase 3 — Resilience / Extended Coverage



















})